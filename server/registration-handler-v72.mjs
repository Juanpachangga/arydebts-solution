// Connect createAccount to real account/session storage before deployment.
// Secrets stay server-side. A local browser profile is not server authentication.
export function createRegistrationHandler72({secret,allowedOrigin,hostname,consumeQuota,createAccount,fetchImpl=fetch}){
 return async request=>{
  const origin=request.headers.get('Origin'),headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
  const answer=(status,body,extra={})=>new Response(JSON.stringify(body),{status,headers:{...headers,...extra}});
  if(!allowedOrigin||origin!==allowedOrigin)return answer(403,{success:false});
  Object.assign(headers,{'Access-Control-Allow-Origin':allowedOrigin,'Access-Control-Allow-Credentials':'true','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.method!=='POST')return answer(405,{success:false});
  if(!secret||!hostname||typeof createAccount!=='function'||typeof consumeQuota!=='function')return answer(503,{success:false});
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return answer(415,{success:false});
  try{
   if(!await consumeQuota(request))return answer(429,{success:false});
   const raw=await request.text();if(raw.length>8192)return answer(413,{success:false});const body=JSON.parse(raw);
   const name=typeof body.name==='string'?body.name.trim():'';const email=typeof body.email==='string'?body.email.trim():'';const password=typeof body.password==='string'?body.password:'';const token=typeof body.token==='string'?body.token:'';
   if(!name||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||password.length<8||password.length>256||!token||token.length>2048)return answer(400,{success:false});
   const response=await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,response:token}),signal:AbortSignal.timeout(10000)});
   if(!response.ok)return answer(502,{success:false});const validation=await response.json();
   if(validation.success!==true||validation.hostname!==hostname||validation.action!=='signup')return answer(403,{success:false});
   // Only a validated single-use token may reach account creation. Store hashed passwords.
   const result=await createAccount({name,email,password});if(!result?.success)return answer(400,{success:false});
   return answer(201,{success:true},result.cookie?{'Set-Cookie':result.cookie}:{});
  }catch(e){return answer(503,{success:false})}
 };
}
