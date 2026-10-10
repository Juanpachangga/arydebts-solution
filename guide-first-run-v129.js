(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const LAUNCH_DELAY=900;
let launchTimer=0,hiddenPaused=false;
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const remove=k=>{try{localStorage.removeItem(k)}catch{}};
const lifecycle=()=>window.aryGuideLifecycle128;
const status=()=>window.aryFullGuideStatus125?.();
function currentNeedsGuide(){
 const api=lifecycle();
 if(!api?.currentUser?.())return false;
 return !api.completed?.();
}
function scheduleFirstLaunch(){
 clearTimeout(launchTimer);
 if(!currentNeedsGuide())return;
 // Temporarily suppress V125's immediate auto-start while Home settles after onboarding.
 write(GLOBAL,'done');
 launchTimer=setTimeout(()=>{
   if(!currentNeedsGuide()||document.hidden)return;
   remove(GLOBAL);
   const st=status();
   if(!st?.active&&typeof window.aryStartFullGuide125==='function')window.aryStartFullGuide125();
 },LAUNCH_DELAY);
}
function wrapFinishOnboarding(){
 const fn=window.finishOnboarding;
 if(typeof fn!=='function'||fn._aryFirstRun129)return;
 const wrapped=function(){
   const shouldLaunch=currentNeedsGuide();
   if(shouldLaunch)write(GLOBAL,'done');
   const out=fn.apply(this,arguments);
   if(shouldLaunch)setTimeout(scheduleFirstLaunch,80);
   return out;
 };
 wrapped._aryFirstRun129=true;
 window.finishOnboarding=wrapped;
}
function wrapAuth(){
 const fn=window.localAuth;
 if(typeof fn!=='function'||fn._aryFirstRun129)return;
 const wrapped=function(){
   const out=fn.apply(this,arguments);
   setTimeout(()=>{
     if(typeof s==='object'&&s?.onboarded&&currentNeedsGuide())scheduleFirstLaunch();
   },120);
   return out;
 };
 wrapped._aryFirstRun129=true;
 window.localAuth=wrapped;
}
function visibility(){
 document.addEventListener('visibilitychange',()=>{
   const st=status();
   if(document.hidden){
     clearTimeout(launchTimer);
     if(st?.active&&st.automatic&&typeof window.aryFullGuideToggleAuto125==='function'){
       hiddenPaused=true;
       window.aryFullGuideToggleAuto125();
     }
     return;
   }
   if(hiddenPaused){
     hiddenPaused=false;
     const now=status();
     if(now?.active&&!now.automatic&&typeof window.aryFullGuideToggleAuto125==='function')window.aryFullGuideToggleAuto125();
   }else if(typeof s==='object'&&s?.onboarded&&currentNeedsGuide()&&!status()?.active){
     scheduleFirstLaunch();
   }
 });
}
function init(){
 wrapFinishOnboarding();
 wrapAuth();
 visibility();
 // Existing first-use session that loaded directly on Home: give the UI time to settle.
 if(typeof s==='object'&&s?.onboarded&&typeof screen==='string'&&screen==='home'&&currentNeedsGuide())scheduleFirstLaunch();
}
window.aryGuideFirstRun129={needsGuide:currentNeedsGuide,schedule:scheduleFirstLaunch};
init();
})();
