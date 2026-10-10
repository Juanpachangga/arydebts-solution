(()=>{
'use strict';
const CLOUD='.ary125cloud';
let userAuto=false,internalToggle=false,manualSession=false;
const status=()=>{try{return window.aryFullGuideStatus125?.()||null}catch{return null}};
const rawToggle=window.aryFullGuideToggleAuto125;

function pauseAuto(){
 const st=status();
 if(!st?.active||!st.automatic||typeof rawToggle!=='function')return false;
 internalToggle=true;
 try{rawToggle()}finally{internalToggle=false}
 return true;
}

if(typeof rawToggle==='function'&&!rawToggle._ary180){
 const wrapped=function(){
  const out=rawToggle.apply(this,arguments);
  if(!internalToggle)userAuto=!!status()?.automatic;
  return out;
 };
 wrapped._ary180=true;wrapped._ary180raw=rawToggle;window.aryFullGuideToggleAuto125=wrapped;
}

// Explicit replays are deliberate, but still begin paused so the guide never
// races ahead before the person has read the first card.
const rawStart=window.aryStartFullGuide125;
if(typeof rawStart==='function'&&!rawStart._ary180){
 const wrapped=function(){
  userAuto=false;manualSession=true;
  const out=rawStart.apply(this,arguments);
  requestAnimationFrame(()=>{if(!userAuto)pauseAuto()});
  return out;
 };
 wrapped._ary180=true;wrapped._ary180raw=rawStart;window.aryStartFullGuide125=wrapped;
}

function guideControl(target){return target?.closest?.('.ary125cloud,.ary140cancelTop,.ary139confirm')}
function userInteraction(event){
 const st=status();
 if(!st?.active||guideControl(event?.target))return;
 // Real app interaction always wins. The guide remains exactly where it is,
 // but automatic advancement stops until the person explicitly enables it.
 if(st.automatic){userAuto=false;pauseAuto()}
}
for(const ev of ['pointerdown','touchstart','focusin','input'])document.addEventListener(ev,userInteraction,{capture:true,passive:ev!=='input'&&ev!=='focusin'});
window.addEventListener('wheel',userInteraction,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&status()?.active&&status()?.automatic){userAuto=false;pauseAuto()}});

// WebKit can coalesce rapid fill/input work around modal enhancement. Keep the
// live debt/expense icon tied directly to the current field value as a fallback.
document.addEventListener('input',event=>{
 const input=event.target;
 if(input?.id!=='n'||!document.getElementById('recordIcon96')||typeof window.aryPreviewIcon96!=='function')return;
 const debt=!!document.querySelector('#modal:not(.hidden) button[onclick*="saveDebt"]');
 window.aryPreviewIcon96(input,debt?'deuda':undefined);
},{capture:true});

// Only watch direct body additions. Newly mounted guide cards are paused once;
// there is no navigation interception, retry loop, or overlay cleanup race.
const observer=new MutationObserver(records=>{
 const st=status();
 if(!st?.active){manualSession=false;userAuto=false;return}
 let added=false;
 for(const record of records)for(const node of record.addedNodes){if(node?.nodeType===1&&(node.matches?.(CLOUD)||node.querySelector?.(CLOUD))){added=true;break}}
 if(added&&st.automatic&&!userAuto)pauseAuto();
});
if(document.body)observer.observe(document.body,{childList:true});
if(status()?.active&&document.querySelector(CLOUD)&&status()?.automatic)pauseAuto();
window.aryGuideInteractionSafety180={status:()=>({...status(),userAuto,manualSession}),pause:()=>{userAuto=false;return pauseAuto()}};
})();
