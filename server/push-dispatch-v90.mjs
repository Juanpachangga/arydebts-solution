import {planPush90} from './push-planner-v90.mjs';
export function createPushDispatcher90({store,sendPush,now=()=>new Date()}){
 return async(limit=25)=>{
 if(!store||typeof sendPush!=='function')throw Error('push_not_configured');
 let processed=0;for(const job of await store.claim(Math.max(1,Math.min(100,limit)))){
 try{
 const current=await store.current(job);
 const eligible=current&&new Date(job.expires_at)>now()&&planPush90(current.state,current.preferences,now()).some(x=>x.key===job.idempotency_key);
 if(!eligible){await store.finish(job,'cancelled');continue}
 const payload=planPush90(current.state,current.preferences,now()).find(x=>x.key===job.idempotency_key).payload;
 // Generic receiver payload: no names, payment amounts, balances or endpoints.
 await sendPush(current.subscription,JSON.stringify(payload),{TTL:Math.max(1,Math.min(600,Math.floor((new Date(job.expires_at)-now())/1000))),urgency:'normal',timeout:10000});
 await store.finish(job,'accepted');processed++;
 }catch(error){const status=Number(error.statusCode);if(status===404||status===410){await store.revoke(job);await store.finish(job,'expired_subscription')}else if(job.attempts>=5||(status>=400&&status<500&&status!==408&&status!==429))await store.finish(job,'failed');else await store.retry(job,new Date(now().getTime()+Math.min(600,30*2**(job.attempts-1))*1000))}
 }
 return {processed};
 };
}
