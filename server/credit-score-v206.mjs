// Read-only foundation: hosting must supply verified sessions, quotas and owned,
// current consent/report readers. No bureau credentials or report pulls in the browser.
export function createCreditScore206({verifySession,consumeQuota,readOwnedConsent,readOwnedReport,origin='https://juanpachangga.github.io',now=()=>new Date()}={}){
 const reply=(status,body,cors={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin',...cors}});
 return async request=>{
  if(request.headers.get('Origin')!==origin)return reply(403,{error:'origin_denied'});
  const cors={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Credentials':'true'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET','Access-Control-Allow-Headers':'Content-Type,Authorization'}});
  if(request.method!=='GET')return reply(405,{error:'read_only'},cors);
  if(new URL(request.url).search)return reply(400,{error:'no_client_account_selection'},cors);
  if(!verifySession||!consumeQuota)return reply(503,{status:'not_configured'},cors);
  try{
   const user=await verifySession(request);if(!user?.id)return reply(401,{error:'sign_in_required'},cors);
   if(!await consumeQuota(user.id))return reply(429,{error:'rate_limit'},cors);
   if(!readOwnedConsent||!readOwnedReport)return reply(200,{status:'not_connected'},cors);
   const consent=await readOwnedConsent(user.id);
   if(!consent)return reply(200,{status:'consent_required'},cors);
   if(consent.userId!==user.id)return reply(403,{error:'ownership_mismatch'},cors);
   if(consent.country!=='US')return reply(200,{status:'unavailable_country'},cors);
   if(consent.authorized!==true||!Number.isFinite(Date.parse(consent.expiresAt))||Date.parse(consent.expiresAt)<=now().getTime())return reply(200,{status:'consent_required'},cors);
   const report=await readOwnedReport(user.id);
   if(!report)return reply(200,{status:'pending'},cors);
   if(report.userId!==user.id)return reply(403,{error:'ownership_mismatch'},cors);
   const model=String(report.model||''),provider=String(report.provider||''),asOf=String(report.asOf||'');
   const models=new Set(['VantageScore 3.0','VantageScore 4.0','FICO Score 8','FICO Score 9']);
   if(!models.has(model)||!Number.isInteger(report.score)||report.score<300||report.score>850||!provider||provider.length>80||!Number.isFinite(Date.parse(asOf))||Date.parse(asOf)>now().getTime()||!Array.isArray(report.factors)||report.factors.length>20)throw Error('invalid_report');
   const factors=report.factors.map(f=>{if(!f||!['positive','negative'].includes(f.type)||typeof f.code!=='string'||f.code.length>32)throw Error('invalid_factor');const descriptions={};for(const language of ['es','en','pt']){const text=f.descriptions?.[language];if(typeof text!=='string'||!text.trim()||text.length>500)throw Error('missing_factor_translation');descriptions[language]=text}return{type:f.type,code:f.code,descriptions}});
   return reply(200,{status:'ready',report:{score:report.score,minimum:300,maximum:850,model,provider,asOf,factors}},cors);
  }catch{return reply(503,{status:'unavailable'},cors)}
 };
}
