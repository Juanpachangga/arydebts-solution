// Read-only server foundation. Orders and fund transfers are deliberately not exposed.
export function createInvestmentReadiness200({verifySession,consumeQuota,readOwnedBrokerAccount,origin='https://juanpachangga.github.io'}={}){
 const reply=(status,body,cors={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin',...cors}});
 return async request=>{
  if(request.headers.get('Origin')!==origin)return reply(403,{error:'Origin denied'});
  const cors={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Credentials':'true'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET','Access-Control-Allow-Headers':'Content-Type'}});
  if(request.method!=='GET')return reply(405,{error:'Read-only endpoint'},cors);
  if(!verifySession||!consumeQuota)return reply(503,{mode:'not_configured',canTrade:false,canWithdraw:false},cors);
  try{
   const user=await verifySession(request);if(!user?.id)return reply(401,{error:'Sign in required'},cors);
   if(!await consumeQuota(user.id))return reply(429,{error:'Request limit reached'},cors);
   if(new URL(request.url).search)return reply(400,{error:'Account selection belongs to the server'},cors);
   if(!readOwnedBrokerAccount)return reply(200,{mode:'not_connected',canTrade:false,canWithdraw:false},cors);
   const account=await readOwnedBrokerAccount(user.id);
   if(!account)return reply(200,{mode:'not_connected',canTrade:false,canWithdraw:false},cors);
   if(account.userId!==user.id)return reply(403,{error:'Account ownership mismatch'},cors);
   return reply(200,{mode:'read_only',accountStatus:String(account.status||'pending'),canTrade:false,canWithdraw:false},cors);
  }catch{return reply(503,{error:'Investment service unavailable'},cors)}
 };
}
