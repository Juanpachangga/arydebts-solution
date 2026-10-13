// Inject a server-only Stripe client and an owned customer mapping from your database.
import {PREMIUM214} from './premium-handler-v214.mjs';
export function createStripeProvider214({stripe,priceId,getOwnedCustomer,getOrCreateOwnedCustomer,successURL,cancelURL,returnURL}={}){
 const safeReturn=raw=>{const url=new URL(raw);if(url.protocol!=='https:'||url.username||url.password||url.origin!=='https://juanpachangga.github.io')throw Error('Invalid return URL');return url.href};
 const success=safeReturn(successURL),cancel=safeReturn(cancelURL),back=safeReturn(returnURL);
 async function price(){const p=await stripe.prices.retrieve(priceId);if(!p.active||p.currency!=='usd'||p.unit_amount!==999||p.recurring?.interval!=='month'||p.recurring.interval_count!==1)throw Error('Expected active USD 9.99 monthly price');return p}
 async function customer(userId,create=false){const row=await (create&&getOrCreateOwnedCustomer?getOrCreateOwnedCustomer(userId):getOwnedCustomer(userId));if(!row||row.userId!==userId||typeof row.customerId!=='string'||!/^cus_[A-Za-z0-9]+$/.test(row.customerId))throw Error('Owned billing customer required');return row.customerId}
 async function subscriptions(id){const list=await stripe.subscriptions.list({customer:id,status:'all',limit:100});if(list.has_more)throw Error('Subscription list requires pagination');return list.data.filter(x=>x.customer===id&&x.items?.data?.some(i=>i.price?.id===priceId))}
 return{
  async readSubscription(userId){await price();const row=await getOwnedCustomer(userId);if(!row)return null;if(row.userId!==userId)throw Error('Ownership mismatch');const id=await customer(userId),items=await subscriptions(id),active=items.find(x=>x.status==='active'&&x.items.data.some(i=>i.price.id===priceId&&(i.current_period_end||x.current_period_end)*1000>Date.now()));if(!active)return null;const item=active.items.data.find(i=>i.price.id===priceId);return{userId,status:'active',...PREMIUM214,validUntil:new Date((item.current_period_end||active.current_period_end)*1000).toISOString()}},
  async createCheckout(userId){await price();const id=await customer(userId,true);if((await subscriptions(id)).some(x=>['active','trialing','incomplete','past_due','unpaid','paused'].includes(x.status)))throw Error('Manage existing subscription');return stripe.checkout.sessions.create({mode:'subscription',customer:id,line_items:[{price:priceId,quantity:1}],success_url:success,cancel_url:cancel,client_reference_id:userId,subscription_data:{metadata:{aryUserId:userId}}},{idempotencyKey:'ary-premium-'+userId+'-'+Math.floor(Date.now()/600000)})},
  async createPortal(userId){const id=await customer(userId);return stripe.billingPortal.sessions.create({customer:id,return_url:back})}
 };
}
