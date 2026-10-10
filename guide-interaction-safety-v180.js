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
// This layer intentionally has no guide-card observer and no generic scroll
// listener: both used to mistake the guide's own work for user interaction.
window.aryGuideInteractionSafety180={
 status:()=>({...status(),userAuto}),
 pause:()=>pauseAuto()
};
})();
