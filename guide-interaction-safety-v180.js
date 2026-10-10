(()=>{
'use strict';
let userAuto=false,internalToggle=false;
const status=()=>{try{return window.aryFullGuideStatus125?.()||null}catch{return null}};
const rawToggle=window.aryFullGuideToggleAuto125;

function pauseAuto(){
 const st=status();
 if(!st?.active||!st.automatic||typeof rawToggle!=='function')return false;
 internalToggle=true;
 try{rawToggle()}finally{internalToggle=false}
 userAuto=false;
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

function clearPreviousGuideVisual(){
 document.querySelectorAll('.ary125shade,.ary125focus,.ary125navShield,.ary125cloud,.ary125skip,.ary126node').forEach(n=>n.remove());
}
function wrapStep(name){
 const fn=window[name];
 if(typeof fn!=='function'||fn._ary184transition)return;
 const wrapped=function(){
  const before=status(),beforeIndex=before?.index;
  const out=fn.apply(this,arguments);
  const after=status();
  // V125 updates its index before the route-specific card is ready. Remove the
  // previous card immediately so an old explanation can never remain visible
  // while the new step/route is already active. V125 alone paints the next card.
  if(before?.active&&after?.active&&after.index!==beforeIndex)clearPreviousGuideVisual();
  return out;
 };
 wrapped._ary184transition=true;
 wrapped._ary184raw=fn;
 window[name]=wrapped;
}
wrapStep('aryFullGuideNext125');
wrapStep('aryFullGuideBack125');

function guideControl(target){return target?.closest?.('.ary125cloud,.ary140cancelTop,.ary139confirm')}
function userInteraction(event){
 const st=status();
 if(!st?.active||!st.automatic||guideControl(event?.target))return;
 // Only genuine interaction with the application pauses automatic progression.
 // Guide rendering, route painting and programmatic scrolling must never pause it.
 pauseAuto();
}

for(const ev of ['pointerdown','touchstart','input']){
 document.addEventListener(ev,userInteraction,{capture:true,passive:ev!=='input'});
}
window.addEventListener('wheel',userInteraction,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden&&status()?.active&&status()?.automatic)pauseAuto();
});

// WebKit can coalesce rapid fill/input work around modal enhancement. Keep the
// live debt/expense icon tied directly to the current field value as a fallback.
document.addEventListener('input',event=>{
 const input=event.target;
 if(input?.id!=='n'||!document.getElementById('recordIcon96')||typeof window.aryPreviewIcon96!=='function')return;
 const debt=!!document.querySelector('#modal:not(.hidden) button[onclick*="saveDebt"]');
 window.aryPreviewIcon96(input,debt?'deuda':undefined);
},{capture:true});

// V125 owns guide start, route changes, rendering and automatic scheduling.
// This layer only pauses for genuine application interaction and clears a stale
// visual between step changes; it never changes guide index, route or completion.
window.aryGuideInteractionSafety180={
 status:()=>({...status(),userAuto}),
 pause:()=>pauseAuto()
};
})();
