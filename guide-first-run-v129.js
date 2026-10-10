(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const REPAIR_PREFIX='arydebts-guide-repair-v166:';
const LAUNCH_DELAY=320;
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
function repairGuideOnce(){
 const api=lifecycle(),id=api?.currentUser?.();
 if(!id||typeof s!=='object'||!s?.onboarded)return false;
 const key=REPAIR_PREFIX+id;
 if(read(key)==='done')return false;
 try{
   if(api.completed?.()&&typeof api.resetCurrent==='function')api.resetCurrent();
   else remove(GLOBAL);
 }catch{remove(GLOBAL)}
 write(key,'done');
 return true;
}
function scheduleFirstLaunch(){
 clearTimeout(launchTimer);
 if(!currentNeedsGuide())return;
 // Temporarily suppress V125's immediate auto-start while the first app frame settles.
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
   if(shouldLaunch)setTimeout(scheduleFirstLaunch,50);
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
     if(typeof s==='object'&&s?.onboarded){repairGuideOnce();if(currentNeedsGuide())scheduleFirstLaunch()}
   },70);
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
 // V166 repair: replay the corrected guide exactly once per existing account.
 repairGuideOnce();
 if(typeof s==='object'&&s?.onboarded&&currentNeedsGuide())scheduleFirstLaunch();
}
window.aryGuideFirstRun129={needsGuide:currentNeedsGuide,schedule:scheduleFirstLaunch,repair:repairGuideOnce};
init();
})();
