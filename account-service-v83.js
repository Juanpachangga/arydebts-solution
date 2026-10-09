/* Supabase SDK v2 adapter. No credentials and no automatic connection. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryAccounts83=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const failure=code=>Object.assign(new Error(code),{code});
const email=v=>{const e=String(v||'').trim();if(e.length>254||!/^\S+@\S+\.\S+$/.test(e))throw failure('invalid_email');return e};
const password=v=>{if(typeof v!=='string'||v.length<12||v.length>128)throw failure('invalid_password');return v};
function payload(value){
 if(!value||typeof value!=='object'||Array.isArray(value))throw failure('invalid_data');
 let json;try{json=JSON.stringify(value)}catch(e){throw failure('invalid_data')}
 if(new TextEncoder().encode(json).length>262144)throw failure('data_too_large');
 const data=JSON.parse(json);
 if(!data.state||typeof data.state!=='object'||Array.isArray(data.state)||!data.profile||typeof data.profile!=='object'||Array.isArray(data.profile))throw failure('invalid_data');
 for(const name of ['debts','expenses','payments','calendarEvents'])if(!Array.isArray(data.state[name]))throw failure('invalid_data');
 // Never store authentication material in financial records.
 const deny=(v,depth=0)=>{if(depth>30)throw failure('invalid_data');if(v&&typeof v==='object')for(const [key,item]of Object.entries(v)){if(/^(password|access_token|refresh_token|service_role|secret_key|__proto__|constructor|prototype)$/i.test(key))throw failure('sensitive_data');deny(item,depth+1)}};
 deny(data);return data;
}
function create(client,{redirectTo}={}){
 if(!client?.auth||typeof client.from!=='function')throw failure('missing_client');
 let redirect;try{const u=new URL(redirectTo);if(u.protocol!=='https:'||u.username||u.password||u.hash)throw 0;redirect=u.href}catch(e){throw failure('invalid_redirect')}
 const check=r=>{if(r?.error)throw failure('service_error');return r?.data};
 async function verified(){const d=check(await client.auth.getUser()),u=d?.user;if(!u||!uuid.test(u.id)||!u.email_confirmed_at||u.is_anonymous===true)throw failure('verified_account_required');return u}
 const current=async id=>{const u=await verified();if(u.id!==id)throw failure('account_changed');return u};
 return Object.freeze({
  async signup({name,email:address,password:secret,captchaToken}){name=String(name||'').trim();if(!name||name.length>120)throw failure('invalid_name');const d=check(await client.auth.signUp({email:email(address),password:password(secret),options:{emailRedirectTo:redirect,data:{name},...(captchaToken?{captchaToken:String(captchaToken)}:{})}}));return {confirmationRequired:!d?.session};},
  async login({email:address,password:secret,captchaToken}){if(typeof secret!=='string'||!secret)throw failure('invalid_password');check(await client.auth.signInWithPassword({email:email(address),password:secret,...(captchaToken?{options:{captchaToken:String(captchaToken)}}:{})}));const u=await verified();return {id:u.id,email:u.email,name:String(u.user_metadata?.name||'')};},
  async recover(address){check(await client.auth.resetPasswordForEmail(email(address),{redirectTo:redirect}));return {requested:true};},
  async changePassword(secret){await verified();check(await client.auth.updateUser({password:password(secret)}));return {updated:true};},
  async logout(){check(await client.auth.signOut({scope:'local'}));return {signedOut:true};},
  async identity(){const u=await verified();return {id:u.id,email:u.email,name:String(u.user_metadata?.name||'')};},
  async read(){const u=await verified();const row=check(await client.from('ary_account_data').select('user_id,payload,revision').eq('user_id',u.id).maybeSingle());await current(u.id);if(!row)return {accountId:u.id,payload:null,revision:null};if(row.user_id!==u.id||!Number.isSafeInteger(row.revision)||row.revision<1)throw failure('invalid_response');return {accountId:u.id,payload:payload(row.payload),revision:row.revision};},
  async write(value,{accountId,revision}={}){
   if(!uuid.test(String(accountId||''))||!(revision===null||Number.isSafeInteger(revision)&&revision>=1&&revision<Number.MAX_SAFE_INTEGER))throw failure('invalid_version');
   const data=payload(value);await current(accountId);
   const table=client.from('ary_account_data');let query;
   if(revision===null)query=table.insert({user_id:accountId,payload:data,revision:1});
   else query=table.update({payload:data,revision:revision+1}).eq('user_id',accountId).eq('revision',revision);
   const result=await query.select('user_id,revision').maybeSingle();
   if(result?.error?.code==='23505')throw failure('write_conflict');
   const row=check(result);if(!row)throw failure('write_conflict');await current(accountId);
   if(row.user_id!==accountId||row.revision!==(revision===null?1:revision+1))throw failure('invalid_response');
   return {accountId,revision:row.revision};
  },
  // Deletes the financial row only; deleting Auth identity requires a server operation.
  async deleteData(accountId){await current(accountId);check(await client.from('ary_account_data').delete().eq('user_id',accountId));await current(accountId);return {deleted:true};}
 });
}
return Object.freeze({create,validatePayload:payload});
});
