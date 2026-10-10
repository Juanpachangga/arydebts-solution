(()=>{
'use strict';
const CLOUD='.ary125cloud';
let userAuto=false,internalToggle=false,explicitStart=false,abortStale=false,abortRaf=0;
const status=()=>{try{return window.aryFullGuideStatus125?.()||null}catch{return null}};
const routeNow=()=>{try{return typeof screen==='string'?screen:null}catch{return null}};
const rawToggle=window.aryFullGuideToggleAuto125;

function pauseAuto(){
 const st=status();
 if(!st?.active||!st.automatic||typeof rawToggle!=='function')return false;
 internalToggle=true;
 try{rawToggle()}finally{internalToggle=false}
 return true;
}
function keepGuidePending(){
 try{window.aryGuideLifecycle128?.resetCurrent?.()}catch{}
 try{localStorage.removeItem('arydebts-guide-v125')}catch{}
}
function cancelStale(){
 cancelAnimationFrame(abortRaf);abortRaf=0;
 if(!abortStale)return false;
 const skip=document.querySelector('.ary125skip');
 if(skip){
  abortStale=false;
  skip.click();
  // V125 treats Skip as completion. This abort is different: the person never
  // saw the guide, so restore pending state for the next legitimate Home visit.
  keepGuidePending();
  return true;
 }
 abortRaf=requestAnimationFrame(()=>{
  abortRaf=0;
  const late=document.querySelector('.ary125skip');
  if(late){abortStale=false;late.click();keepGuidePending()}
 });
 return false;
}

if(typeof rawToggle==='function'&&!rawToggle._ary180){
 const wrapped=function(){
  const out=rawToggle.apply(this,arguments);
  if(!internalToggle)userAuto=!!status()?.automatic;
  return out;
 };
 wrapped._ary180=true;
 wrapped._ary180raw=rawToggle;
 window.aryFullGuideToggleAuto125=wrapped;
}

// A first-use timer can become stale if the person leaves Home before it fires.
// Do not let that old timer steal the current screen. Manual guide starts still work.
const rawGo=window.go;
if(typeof rawGo==='function'&&!rawGo._ary181){
 const wrapped=function(destination){
  const st=status(),current=routeNow();
  if(!explicitStart&&!userAuto&&destination==='home'&&current&&current!=='home'&&st?.active&&st.index===0){
   abortStale=true;
   pauseAuto();
   cancelStale();
   return false;
  }
  return rawGo.apply(this,arguments);
 };
 wrapped._ary181=true;wrapped._ary181raw=rawGo;window.go=wrapped;
}

const rawStart=window.aryStartFullGuide125;
if(typeof rawStart==='function'&&!rawStart._ary180){
 const wrapped=function(){
  userAuto=false;abortStale=false;explicitStart=true;
  let out;
  try{out=rawStart.apply(this,arguments)}finally{explicitStart=false}
  requestAnimationFrame(()=>{if(!userAuto)pauseAuto()});
  return out;
 };
 wrapped._ary180=true;
 window.aryStartFullGuide125=wrapped;
}

function guideControl(target){return target?.closest?.('.ary125cloud,.ary140cancelTop,.ary139confirm')}
function userInteraction(event){
 const st=status();
 if(!userAuto||!st?.active||!st.automatic)return;
 if(guideControl(event?.target))return;
 userAuto=false;
 pauseAuto();
}
for(const ev of ['pointerdown','touchstart','focusin','input'])document.addEventListener(ev,userInteraction,{capture:true,passive:ev!=='input'&&ev!=='focusin'});
window.addEventListener('wheel',userInteraction,{capture:true,passive:true});
window.addEventListener('scroll',()=>{if(userAuto){userAuto=false;pauseAuto()}},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&status()?.automatic){userAuto=false;pauseAuto()}});

// WebKit can coalesce rapid fill/input work around modal enhancement. Keep the
// live debt/expense icon tied directly to the current field value as a fallback.
document.addEventListener('input',event=>{
 const input=event.target;
 if(input?.id!=='n'||!document.getElementById('recordIcon96')||typeof window.aryPreviewIcon96!=='function')return;
 const debt=!!document.querySelector('#modal:not(.hidden) button[onclick*="saveDebt"]');
 window.aryPreviewIcon96(input,debt?'deuda':undefined);
},{capture:true});

// V125 can start itself from a delayed first-use hook. Watching only direct body children
// lets us catch that one guide card without observing the application subtree.
const observer=new MutationObserver(records=>{
 if(abortStale){cancelStale();return}
 if(userAuto)return;
 const st=status();
 if(!st?.active||!st.automatic)return;
 for(const record of records){
  for(const node of record.addedNodes){
   if(node?.nodeType===1&&(node.matches?.(CLOUD)||node.querySelector?.(CLOUD))){pauseAuto();return}
  }
 }
});
if(document.body)observer.observe(document.body,{childList:true});

// If V180 loads while a first-use guide is already visible, normalize it immediately.
pauseAuto();
window.aryGuideInteractionSafety180={status:()=>({...status(),userAuto,abortStale}),pause:()=>{userAuto=false;return pauseAuto()}};
})();
