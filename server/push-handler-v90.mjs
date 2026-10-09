import {ECDH} from 'node:crypto';
import {validatePushPreferences90} from './push-planner-v90.mjs';
const hosts=new Set(['fcm.googleapis.com','updates.push.services.mozilla.com','web.push.apple.com']);
export function validateSubscription90(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||typeof raw.endpoint!=='string'||raw.endpoint.length>4096)throw Error('invalid_subscription');
 const url=new URL(raw.endpoint);
 if(url.protocol!=='https:'||url.username||url.password||url.port||url.hash||!hosts.has(url.hostname))throw Error('invalid_endpoint');
 const decode=(value,length)=>{if(typeof value!=='string'||! /^[A-Za-z0-9_-]+$/.test(value))throw Error('invalid_keys');const buffer=Buffer.from(value,'base64url');if(buffer.length!==length||buffer.toString('base64url')!==value)throw Error('invalid_keys');return buffer};
 const point=decode(raw.keys?.p256dh,65);if(point[0]!==4)throw Error('invalid_keys');try{ECDH.convertKey(point,'prime256v1',undefined,undefined,'compressed')}catch{throw Error('invalid_keys')};decode(raw.keys?.auth,16);
 return {endpoint:url.href,keys:{p256dh:raw.keys.p256dh,auth:raw.keys.auth}};
}
async function boundedJSON(request){const reader=request.body?.getReader();if(!reader)throw Error('invalid_body');let size=0,chunks=[];try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16384){await reader.cancel();throw Error('too_large')}chunks.push(value)}return JSON.parse(Buffer.concat(chunks).toString('utf8'))}finally{reader.releaseLock()}}
export function createPushHandler90({allowedOrigin,verifyUser,consumeQuota,store}){
 return async request=>{
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'},reply=(status,code)=>new Response(JSON.stringify({success:status<300,code}),{status,headers});
 if(!allowedOrigin||request.headers.get('Origin')!==allowedOrigin)return reply(403,'denied');
 Object.assign(headers,{'Access-Control-Allow-Origin':allowedOrigin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'});
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='POST')return reply(405,'method');
 if(typeof verifyUser!=='function'||typeof consumeQuota!=='function'||!store)return reply(503,'unavailable');
 const auth=request.headers.get('Authorization')||'';if(!/^Bearer \S{1,8192}$/.test(auth))return reply(401,'sign_in');
 try{
 const user=await verifyUser(auth.slice(7));if(!user||! /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)||user.is_anonymous||!user.email_confirmed_at)return reply(401,'sign_in');
 if(!await consumeQuota(user.id))return reply(429,'limit');
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply(415,'json_required');
 const body=await boundedJSON(request);if(!body||typeof body!=='object'||Array.isArray(body)||Object.hasOwn(body,'userId')||Object.hasOwn(body,'user_id'))return reply(400,'invalid');
 if(body.action==='subscribe'){if(body.consent!==true)return reply(400,'consent_required');const sub=validateSubscription90(body.subscription),prefs=validatePushPreferences90(body.preferences);if(!prefs.enabled)return reply(400,'consent_required');await store.subscribe(user.id,sub,prefs);return reply(201,'subscribed')}
 if(body.action==='preferences'){await store.preferences(user.id,validatePushPreferences90(body.preferences));return reply(200,'saved')}
 if(body.action==='unsubscribe'){const sub=validateSubscription90(body.subscription);await store.unsubscribe(user.id,sub.endpoint);return reply(200,'unsubscribed')}
 return reply(400,'invalid');
 }catch(error){if(error.code==='endpoint_owner_conflict')return reply(409,'device_in_use');if(error.message==='too_large')return reply(413,'too_large');if(/invalid_|Unexpected|JSON|URL|Point/.test(error.message||''))return reply(400,'invalid');return reply(503,'unavailable')}
 };
}
