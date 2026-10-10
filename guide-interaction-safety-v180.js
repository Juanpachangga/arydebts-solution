(()=>{
'use strict';
const CLOUD='.ary125cloud';
let userAuto=false,internalToggle=false;
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
 wrapped._ary180=true;
 wrapped._ary180raw=rawToggle;
 window.aryFullGuideToggleAuto125=wrapped;
}

const rawStart=window.aryStartFullGuide125;
if(typeof rawStart==='function'&&!rawStart._ary180){
 const wrapped=function(){
  userAuto=false;
  const out=rawStart.apply(this,arguments);
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

// V125 can start itself from a delayed first-use hook. Watching only direct body children
// lets us catch that one guide card without observing the application subtree.
const observer=new MutationObserver(records=>{
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
window.aryGuideInteractionSafety180={status:()=>({...status(),userAuto}),pause:()=>{userAuto=false;return pauseAuto()}};
})();
