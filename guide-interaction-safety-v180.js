(()=>{
'use strict';
const CLOUD='.ary125cloud',GLOBAL='arydebts-guide-v125';
let userAuto=false,internalToggle=false,explicitStart=false,manualSession=false,autoSession=false,abortStale=false,abortRaf=0;
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
 try{localStorage.removeItem(GLOBAL)}catch{}
}
function softenAutoOverlay(){
 // Automatic first-use guidance must never trap an already-open form.
 document.getElementById('aryGuideBlock127')?.style.setProperty('pointer-events','none','important');
}
function abortPendingGuide(){
 cancelAnimationFrame(abortRaf);abortRaf=0;
 if(!autoSession&&!abortStale)return false;
 if(!status()?.active){autoSession=false;abortStale=false;userAuto=false;return false}
 const skip=document.querySelector('.ary125skip');
 if(skip){
  autoSession=false;abortStale=false;userAuto=false;
  skip.click();
  keepGuidePending();
  return true;
 }
 // If V127 mounted its blocker before V125 finished painting the hidden skip,
 // stop it from swallowing the user's current gesture while cleanup catches up.
 softenAutoOverlay();
 document.querySelectorAll(CLOUD).forEach(node=>node.style.setProperty('pointer-events','none','important'));
 abortRaf=requestAnimationFrame(()=>abortPendingGuide());
 return false;
}
function modalOpen(){const modal=document.getElementById('modal');return !!modal&&!modal.classList.contains('hidden')&&getComputedStyle(modal).display!=='none'}

if(typeof rawToggle==='function'&&!rawToggle._ary180){
 const wrapped=function(){
  const out=rawToggle.apply(this,arguments);
  if(!internalToggle)userAuto=!!status()?.automatic;
  return out;
 };
 wrapped._ary180=true;wrapped._ary180raw=rawToggle;window.aryFullGuideToggleAuto125=wrapped;
}

// A delayed first-use start may fire after the person already left Home.
const rawGo=window.go;
if(typeof rawGo==='function'&&!rawGo._ary182){
 const wrapped=function(destination){
  const st=status(),current=routeNow();
  if(!explicitStart&&!manualSession&&destination==='home'&&current&&current!=='home'&&st?.active&&st.index===0){
   autoSession=true;abortStale=true;pauseAuto();abortPendingGuide();return false;
  }
  return rawGo.apply(this,arguments);
 };
 wrapped._ary182=true;wrapped._ary182raw=rawGo;window.go=wrapped;
}

// Calls through the public API are deliberate replays. Internal V125 first-use
// starts do not pass through this wrapper, so they can be classified separately.
const rawStart=window.aryStartFullGuide125;
if(typeof rawStart==='function'&&!rawStart._ary182){
 const wrapped=function(){
  userAuto=false;autoSession=false;abortStale=false;manualSession=true;explicitStart=true;
  let out;
  try{out=rawStart.apply(this,arguments)}finally{explicitStart=false}
  requestAnimationFrame(()=>{if(!userAuto)pauseAuto()});
  return out;
 };
 wrapped._ary182=true;wrapped._ary182raw=rawStart;window.aryStartFullGuide125=wrapped;
}

function guideControl(target){return target?.closest?.('.ary125cloud,.ary140cancelTop,.ary139confirm')}
function userInteraction(event){
 const st=status();
 if(!st?.active)return;
 if(guideControl(event?.target))return;
 // A person working in the app has priority over unsolicited first-use guidance.
 if(autoSession){abortPendingGuide();return}
 // Deliberately opened guide: keep it, just stop automatic advancement.
 if(st.automatic){userAuto=false;pauseAuto()}
}
for(const ev of ['pointerdown','touchstart','focusin','input'])document.addEventListener(ev,userInteraction,{capture:true,passive:ev!=='input'&&ev!=='focusin'});
window.addEventListener('wheel',userInteraction,{capture:true,passive:true});
window.addEventListener('scroll',event=>userInteraction(event),{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&status()?.active){if(autoSession)abortPendingGuide();else if(status()?.automatic){userAuto=false;pauseAuto()}}});

// WebKit can coalesce rapid fill/input work around modal enhancement. Keep the
// live debt/expense icon tied directly to the current field value as a fallback.
document.addEventListener('input',event=>{
 const input=event.target;
 if(input?.id!=='n'||!document.getElementById('recordIcon96')||typeof window.aryPreviewIcon96!=='function')return;
 const debt=!!document.querySelector('#modal:not(.hidden) button[onclick*="saveDebt"]');
 window.aryPreviewIcon96(input,debt?'deuda':undefined);
},{capture:true});

// Classify each newly mounted V125 card. Direct body observation is intentionally
// narrow: no application subtree scanning and no render loop.
const observer=new MutationObserver(records=>{
 const st=status();
 if(!st?.active){manualSession=false;autoSession=false;abortStale=false;return}
 let added=false;
 for(const record of records)for(const node of record.addedNodes){if(node?.nodeType===1&&(node.matches?.(CLOUD)||node.querySelector?.(CLOUD))){added=true;break}}
 if(!added)return;
 if(abortStale){autoSession=true;pauseAuto();abortPendingGuide();return}
 if(!manualSession){autoSession=true;pauseAuto();softenAutoOverlay();if(modalOpen())abortPendingGuide()}
});
if(document.body)observer.observe(document.body,{childList:true});

// Modal visibility is the strongest signal that real work has begun. If an
// automatic guide races in while a form is open, retire it immediately.
const modal=document.getElementById('modal');
if(modal)new MutationObserver(()=>{if(autoSession&&modalOpen())abortPendingGuide()}).observe(modal,{attributes:true,attributeFilter:['class','style','aria-hidden']});

if(status()?.active&&document.querySelector(CLOUD)){autoSession=true;pauseAuto();softenAutoOverlay();if(modalOpen())abortPendingGuide()}
window.aryGuideInteractionSafety180={status:()=>({...status(),userAuto,manualSession,autoSession,abortStale}),pause:()=>{userAuto=false;return pauseAuto()},yield:abortPendingGuide};
})();
