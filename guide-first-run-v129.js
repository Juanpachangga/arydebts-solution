(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const REPAIR_PREFIX='arydebts-guide-repair-v166:';
const LAUNCH_DELAY=260,READY_DELAY=120,READY_TRIES=18;
let launchTimer=0,paintTimer=0,readyTimer=0,hiddenPaused=false;
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const remove=k=>{try{localStorage.removeItem(k)}catch{}};
const lifecycle=()=>window.aryGuideLifecycle128;
const status=()=>window.aryFullGuideStatus125?.();
const onHome=()=>typeof screen!=='string'||screen==='home';
function currentNeedsGuide(){
 const api=lifecycle(),id=api?.currentUser?.();
 if(!id||typeof s!=='object'||!s?.onboarded)return false;
 return !api.completed?.();
}
function ready(){
 const api=lifecycle();
 return !!(api?.currentUser?.()&&typeof s==='object'&&s?.onboarded&&typeof window.aryStartFullGuide125==='function');
}
function repairGuideOnce(){
 const api=lifecycle(),id=api?.currentUser?.();
 if(!id||typeof s!=='object'||!s?.onboarded)return false;
 const key=REPAIR_PREFIX+id;
 if(read(key)==='done')return false;
 // Existing accounts that completed an older/broken tour receive the corrected
 // tour once. New/incomplete accounts simply get marked as already on the repaired
 // generation so they are never replayed unnecessarily after completing it.
 const wasCompleted=!!api.completed?.()||read(GLOBAL)==='done';
 if(wasCompleted){
  try{api.resetCurrent?.()}catch{remove(GLOBAL)}
 }else remove(GLOBAL);
 write(key,'done');
 return wasCompleted;
}
function ensureVisiblePaint(){
 clearTimeout(paintTimer);
 paintTimer=setTimeout(()=>{
  const st=status();
  if(!st?.active||document.hidden||document.querySelector('.ary125cloud'))return;
  try{if(typeof window.render==='function')window.render()}catch{}
 },180);
}
function scheduleFirstLaunch(delay=LAUNCH_DELAY){
 clearTimeout(launchTimer);launchTimer=0;
 if(!currentNeedsGuide()||document.hidden||!onHome())return false;
 launchTimer=setTimeout(()=>{
  launchTimer=0;
  if(!currentNeedsGuide()||document.hidden||!onHome())return;
  const st=status();
  if(st?.active){ensureVisiblePaint();return}
  const start=window.aryStartFullGuide125;
  if(typeof start!=='function')return;
  start();
  ensureVisiblePaint();
 },delay);
 return true;
}
function settle(attempt=0){
 clearTimeout(readyTimer);readyTimer=0;
 if(!ready()){
  // Script/bootstrap order can briefly expose V129 before profile/lifecycle are
  // fully hydrated on reload. Retry only for a short bounded window.
  if(attempt<READY_TRIES)readyTimer=setTimeout(()=>settle(attempt+1),READY_DELAY);
  return;
 }
 repairGuideOnce();
 if(currentNeedsGuide())scheduleFirstLaunch();
}
function wrapFinishOnboarding(){
 const fn=window.finishOnboarding;
 if(typeof fn!=='function'||fn._aryFirstRun129)return;
 const wrapped=function(){
  const out=fn.apply(this,arguments);
  setTimeout(()=>settle(0),50);
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
  setTimeout(()=>settle(0),70);
  return out;
 };
 wrapped._aryFirstRun129=true;
 window.localAuth=wrapped;
}
function visibility(){
 document.addEventListener('visibilitychange',()=>{
  const st=status();
  if(document.hidden){
   clearTimeout(launchTimer);launchTimer=0;
   clearTimeout(paintTimer);paintTimer=0;
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
   ensureVisiblePaint();
  }else settle(0);
 });
}
function init(){
 wrapFinishOnboarding();wrapAuth();visibility();settle(0);
}
window.aryGuideFirstRun129={needsGuide:currentNeedsGuide,schedule:scheduleFirstLaunch,repair:repairGuideOnce,ensurePaint:ensureVisiblePaint,settle};
init();
})();
