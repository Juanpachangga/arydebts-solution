import {readRequestJSON,RequestBodyError} from './request-json.mjs';
export const PREMIUM214=Object.freeze({amount:999,currency:'USD',interval:'month'});
export function premiumOwner214(user){const raw=String(user?.email||user?.id||'').trim().toLowerCase();let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}return raw?(h>>>0).toString(36):''}
export function premiumActive214(record,userId,now=Date.now()){return record?.userId===userId&&['active','trialing'].includes(record.status)&&record.amount===999&&record.currency==='USD'&&record.interval==='month'&&Number.isFinite(Date.parse(record.validUntil))&&Date.parse(record.validUntil)>now}
// The injected billing provider reads Stripe server-side. No browser flag grants access.
export function createPremiumHandler214({verifySession,consumeQuota,readSubscription,createCheckout,createPortal,readMonthlyReport,prices={USD:999},origin='https://juanpachangga.github.io'}={}){
 const reply=(status,body,cors={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin',...cors}});
 const safeURL=(raw,portal)=>{try{const u=new URL(raw);return u.protocol==='https:'&&!u.username&&!u.password&&u.hostname===(portal?'billing.stripe.com':'checkout.stripe.com')?u.href:null}catch{return null}};
 return async request=>{
  if(request.headers.get('Origin')!==origin)return reply(403,{error:'Origin denied'});
  const cors={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Credentials':'true'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET, POST','Access-Control-Allow-Headers':'Content-Type'}});
  const url=new URL(request.url),action=url.pathname.split('/').filter(Boolean).at(-1);
  if(url.search||!['status','checkout','manage','report'].includes(action))return reply(400,{error:'Invalid request'},cors);
  if(request.method!==(action==='status'||action==='report'?'GET':'POST'))return reply(405,{error:'Method not allowed'},cors);
  if(!verifySession||!consumeQuota||!readSubscription)return reply(503,{mode:'not_configured'},cors);
  try{
   const user=await verifySession(request);if(!user?.id)return reply(401,{error:'Sign in required'},cors);
   if(!await consumeQuota(user.id))return reply(429,{error:'Request limit reached'},cors);
   let selection={intent:'now',currency:'USD'};if(request.method==='POST'){const body=await readRequestJSON(request,1024);if(action!=='checkout'&&Object.keys(body).length||action==='checkout'&&(Object.keys(body).some(k=>!['intent','currency'].includes(k))||body.intent!==undefined&&!['trial','now'].includes(body.intent)||body.currency!==undefined&&!Object.hasOwn(prices,body.currency)))return reply(400,{error:'Invalid checkout selection'},cors);if(action==='checkout')selection={intent:body.intent||'now',currency:body.currency||'USD'}}
   const record=await readSubscription(user.id);if(record&&record.userId!==user.id)return reply(403,{error:'Account ownership mismatch'},cors);
   const paid=record?.userId===user.id&&['active','trialing'].includes(record.status)&&record.interval==='month'&&Object.hasOwn(prices,record.currency)&&record.amount===prices[record.currency]&&Date.parse(record.validUntil)>Date.now();
   if(action==='status')return reply(200,{prices,owner:premiumOwner214(user),plan:paid?'premium':'free',status:paid?record.status:'inactive',...(paid?{amount:record.amount,currency:record.currency,interval:'month'}:PREMIUM214),validUntil:paid?record.validUntil:null},cors);
   if(action==='report'){
    if(!paid)return reply(403,{error:'Premium subscription required'},cors);
    if(!readMonthlyReport)return reply(503,{error:'Report service not configured'},cors);
    const report=await readMonthlyReport(user.id);if(!report||report.userId!==user.id||typeof report.csv!=='string'||report.csv.length>2000000)return reply(503,{error:'Report unavailable'},cors);
    return new Response(report.csv,{headers:{...cors,'Content-Type':'text/csv;charset=utf-8','Cache-Control':'no-store','Vary':'Origin','Content-Disposition':'attachment; filename="arydebts-monthly-report.csv"'}});
   }
   if(action==='checkout'&&paid)return reply(409,{error:'Subscription already active'},cors);
   const fn=action==='manage'?createPortal:createCheckout;if(!fn)return reply(503,{mode:'not_configured'},cors);
   const result=await fn(user.id,action==='manage'?PREMIUM214:{amount:prices[selection.currency],currency:selection.currency,interval:'month',intent:selection.intent}),redirect=safeURL(result?.url,action==='manage');if(!redirect)return reply(503,{error:'Invalid billing response'},cors);
   return reply(200,{url:redirect},cors);
  }catch(error){return reply(error instanceof RequestBodyError?error.status:503,{error:'Subscription service unavailable'},cors)}
 };
}

