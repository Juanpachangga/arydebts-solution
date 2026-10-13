// Deployment injects Stripe and a durable, per-user billing customer mapping.
export function monthTrialEnd215(now=new Date()){
 const end=new Date(now);const day=end.getUTCDate();end.setUTCDate(1);end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(Math.min(day,new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()+1,0)).getUTCDate()));return Math.floor(end.getTime()/1000);
}
export function createStripeProvider215({stripe,prices={USD:{priceId:'',amount:999}},getOwnedCustomer,getOrCreateOwnedCustomer,withBillingLock,successURL,cancelURL,returnURL}={}){
 const validURL=raw=>{const u=new URL(raw);if(u.protocol!=='https:'||u.username||u.password||u.origin!=='https://juanpachangga.github.io')throw Error('Invalid return URL');return u.href};
 const success=validURL(successURL),cancel=validURL(cancelURL),back=validURL(returnURL);
 const catalog=Object.entries(prices).map(([currency,p])=>({currency,...p,interval:'month'}));
 if(catalog.some(p=>!/^price_[A-Za-z0-9]+$/.test(p.priceId)||!Number.isInteger(p.amount)||p.amount<=0||!/^[A-Z]{3}$/.test(p.currency)||p.currency==='USD'&&p.amount!==999))throw Error('Invalid server price catalog');
 async function price(code){const configured=catalog.find(p=>p.currency===code);if(!configured)throw Error('Currency not configured');const actual=await stripe.prices.retrieve(configured.priceId);if(!actual.active||actual.currency!==code.toLowerCase()||actual.unit_amount!==configured.amount||actual.recurring?.interval!=='month'||actual.recurring.interval_count!==1)throw Error('Price mismatch');return configured}
 async function customer(userId,create=false){const row=await(create?getOrCreateOwnedCustomer(userId):getOwnedCustomer(userId));if(!row||row.userId!==userId||!/^cus_[A-Za-z0-9]+$/.test(row.customerId))throw Error('Owned customer required');return row.customerId}
 async function subscriptions(id){const list=await stripe.subscriptions.list({customer:id,status:'all',limit:100});if(list.has_more)throw Error('Subscription history requires pagination');return list.data.filter(x=>x.customer===id&&x.items?.data?.some(i=>catalog.some(p=>p.priceId===i.price.id)))}
 async function status(userId){const row=await getOwnedCustomer(userId);if(!row)return null;const id=await customer(userId),list=await subscriptions(id);for(const sub of list){if(!['trialing','active'].includes(sub.status))continue;const item=sub.items.data.find(i=>catalog.some(p=>p.priceId===i.price.id)),p=catalog.find(p=>p.priceId===item.price.id),until=sub.status==='trialing'?sub.trial_end:item.current_period_end||sub.current_period_end;if(!Number.isFinite(until)||until*1000<=Date.now())continue;await price(p.currency);return{userId,status:sub.status,amount:p.amount,currency:p.currency,interval:'month',validUntil:new Date(until*1000).toISOString()}}return null}
 return{
  readSubscription:status,
  async createCheckout(userId,{currency='USD',intent='trial'}={}){
   if(!['trial','now'].includes(intent))throw Error('Invalid checkout intent');if(typeof withBillingLock!=='function')throw Error('Durable billing lock is required');
   return withBillingLock(userId,async()=>{const p=await price(currency),id=await customer(userId,true),list=await subscriptions(id);if(list.some(s=>['active','trialing','incomplete','past_due','unpaid','paused'].includes(s.status)))throw Error('Manage existing subscription');if(intent==='trial'&&list.some(s=>s.trial_start||s.trial_end))throw Error('Trial already used');
    const existing=await stripe.checkout.sessions.list({customer:id,status:'open',limit:100});if(existing.has_more)throw Error('Checkout history requires pagination');if(existing.data.length)throw Error('Complete or expire the existing checkout');
    const trial=intent==='trial'?{trial_end:monthTrialEnd215(),trial_settings:{end_behavior:{missing_payment_method:'cancel'}}}:{};
    return stripe.checkout.sessions.create({mode:'subscription',customer:id,line_items:[{price:p.priceId,quantity:1}],payment_method_collection:'always',success_url:success,cancel_url:cancel,client_reference_id:userId,subscription_data:{...trial,metadata:{aryUserId:userId,aryIntent:intent}},metadata:{aryUserId:userId,aryIntent:intent}},{idempotencyKey:'ary215-'+userId+'-'+intent+'-'+currency+'-'+Math.floor(Date.now()/600000)});
   });
  },
  async createPortal(userId){const id=await customer(userId);return stripe.billingPortal.sessions.create({customer:id,return_url:back})}
 };
}
