// Optional authenticated server adapter. Public configuration contains no billing keys.
(()=>{
'use strict';
const cfg=window.aryPremiumConfig214;
if(!cfg?.endpoint||window.aryPremiumService214)return;
let base;try{base=new URL(cfg.endpoint);if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw Error();base.pathname=base.pathname.replace(/\/$/,'')+'/'}catch{return}
async function request(action,post=false,csv=false){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),7500);try{const response=await fetch(new URL(action,base),{method:post?'POST':'GET',credentials:'include',cache:'no-store',headers:post?{'Content-Type':'application/json'}:{},...(post?{body:'{}'}:{}),signal:controller.signal});if(!response.ok)throw Error('Subscription service unavailable');return csv?await response.text():await response.json()}finally{clearTimeout(timer)}}
window.aryPremiumService214={ready:true,readStatus:()=>request('status'),checkout:()=>request('checkout',true),manage:()=>request('manage',true),report:()=>request('report',false,true)};
})();
