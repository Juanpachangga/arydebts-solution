(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const OWNER='arydebts-guide-owner-v128';
const PREFIX='arydebts-guide-user-v128:';
const ACTIVE_MS=1000,IDLE_MS=6000,HIDDEN_MS=8000;
let wasActive=false,watcher=0,lastUser='';
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const remove=k=>{try{localStorage.removeItem(k)}catch{}};
function identity(){
 const p=typeof profile==='object'&&profile?profile:null;
 const raw=String(p?.email||p?.id||p?.name||'').trim().toLowerCase();
 if(!raw)return '';
 let h=2166136261;
 for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(36);
}
const scoped=id=>id?PREFIX+id:'';
function syncForCurrentUser(){
 const id=identity();
 if(!id)return false;
 lastUser=id;
 const key=scoped(id),owner=read(OWNER),globalDone=read(GLOBAL)==='done',userDone=read(key)==='done';
 if(!owner&&globalDone){write(OWNER,id);write(key,'done');return true}
 if(!owner)write(OWNER,id);
 if(userDone){write(GLOBAL,'done');return true}
 remove(GLOBAL);
 return false;
}
function persistCompletion(){
 const id=identity()||lastUser;
 if(!id||read(GLOBAL)!=='done')return;
 write(scoped(id),'done');
 if(!read(OWNER))write(OWNER,id);
}
function schedule(ms){clearTimeout(watcher);watcher=setTimeout(check,ms)}
function check(){
 const status=window.aryFullGuideStatus125?.();
 if(status?.active)wasActive=true;
 if(wasActive&&!status?.active&&read(GLOBAL)==='done'){
   persistCompletion();wasActive=false;
 }
 if(document.hidden)schedule(HIDDEN_MS);
 else schedule(status?.active?ACTIVE_MS:IDLE_MS);
}
function monitor(){schedule(0)}
function wrapStart(){
 const start=window.aryStartFullGuide125;
 if(typeof start!=='function'||start._aryLifecycle128)return;
 const wrapped=function(){
   const id=identity();
   if(id){remove(scoped(id));remove(GLOBAL);lastUser=id}
   wasActive=true;
   const out=start.apply(this,arguments);
   schedule(ACTIVE_MS);
   return out;
 };
 wrapped._aryLifecycle128=true;
 window.aryStartFullGuide125=wrapped;
}
function wrapFinish(){
 const finish=window.aryFullGuideFinish125;
 if(typeof finish!=='function'||finish._aryLifecycle128)return;
 const wrapped=function(){
   const out=finish.apply(this,arguments);
   setTimeout(()=>{persistCompletion();wasActive=false;schedule(IDLE_MS)},0);
   return out;
 };
 wrapped._aryLifecycle128=true;
 window.aryFullGuideFinish125=wrapped;
}
function wrapLogoutAndAuth(){
 for(const name of ['localAuth','logout']){
   const fn=window[name];
   if(typeof fn!=='function'||fn._aryLifecycle128)continue;
   const wrapped=function(){
     const out=fn.apply(this,arguments);
     setTimeout(()=>{syncForCurrentUser();monitor()},0);
     return out;
   };
   wrapped._aryLifecycle128=true;
   window[name]=wrapped;
 }
}
function init(){
 syncForCurrentUser();
 wrapStart();wrapFinish();wrapLogoutAndAuth();monitor();
 document.addEventListener('visibilitychange',()=>schedule(document.hidden?HIDDEN_MS:0));
}
window.aryGuideLifecycle128={
 currentUser:()=>identity(),
 completed:()=>{const id=identity();return !!id&&read(scoped(id))==='done'},
 resetCurrent:()=>{const id=identity();if(id)remove(scoped(id));remove(GLOBAL);return !!id},
 sync:syncForCurrentUser
};
init();
})();
