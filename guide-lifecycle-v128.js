(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const OWNER='arydebts-guide-owner-v128';
const PREFIX='arydebts-guide-user-v128:';
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
 // One-time migration: the pre-V128 global completion belongs to the account already using this browser.
 if(!owner&&globalDone){write(OWNER,id);write(key,'done');return true}
 if(!owner)write(OWNER,id);
 if(userDone){write(GLOBAL,'done');return true}
 // A different/new account on the same browser must receive its own first-use guide.
 remove(GLOBAL);
 return false;
}
function persistCompletion(){
 const id=identity()||lastUser;
 if(!id||read(GLOBAL)!=='done')return;
 write(scoped(id),'done');
 if(!read(OWNER))write(OWNER,id);
}
function monitor(){
 clearInterval(watcher);
 watcher=setInterval(()=>{
   const status=window.aryFullGuideStatus125?.();
   if(status?.active)wasActive=true;
   if(wasActive&&!status?.active&&read(GLOBAL)==='done'){
     persistCompletion();wasActive=false;
   }
 },250);
}
function wrapStart(){
 const start=window.aryStartFullGuide125;
 if(typeof start!=='function'||start._aryLifecycle128)return;
 const wrapped=function(){
   const id=identity();
   if(id){remove(scoped(id));remove(GLOBAL);lastUser=id}
   wasActive=true;
   return start.apply(this,arguments);
 };
 wrapped._aryLifecycle128=true;
 window.aryStartFullGuide125=wrapped;
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
 wrapStart();
 wrapLogoutAndAuth();
 monitor();
}
window.aryGuideLifecycle128={
 currentUser:()=>identity(),
 completed:()=>{const id=identity();return !!id&&read(scoped(id))==='done'},
 resetCurrent:()=>{const id=identity();if(id)remove(scoped(id));remove(GLOBAL);return !!id},
 sync:syncForCurrentUser
};
init();
})();
