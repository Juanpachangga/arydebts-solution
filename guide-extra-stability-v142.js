(()=>{
'use strict';
function extraCloud(){return document.querySelector('.ary126node.ary125cloud')}
function extraActive(){return !!extraCloud()}

// V126 intentionally pauses the V125 automatic engine while its extra steps run.
// Later continuity layers must not turn that underlying engine back on until V126 finishes.
const toggle=window.aryFullGuideToggleAuto125;
if(typeof toggle==='function'&&!toggle._aryExtraStable142){
 const wrapped=function(){
   if(extraActive())return false;
   return toggle.apply(this,arguments);
 };
 wrapped._aryExtraStable142=true;
 window.aryFullGuideToggleAuto125=wrapped;
}

// Keep keyboard navigation inside the extra-step flow. This runs during capture so
// the older V127 window listener cannot also advance the main V125 tour.
document.addEventListener('keydown',e=>{
 if(!extraActive())return;
 if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 if(e.key==='ArrowRight'){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();
   document.getElementById('ary126next')?.click();
 }else if(e.key==='ArrowLeft'){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();
   const back=document.getElementById('ary126back');
   if(back&&!back.disabled)back.click();
 }else if(e.code==='Space'){
   // Extra steps already advance automatically on their own timer. Do not let
   // Space toggle the paused V125 engine underneath them.
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();
 }
},true);

// Make the premium hint truthful while the extra flow is active.
function syncHint(){
 const cloud=extraCloud();if(!cloud)return;
 const hint=cloud.querySelector('.ary127hint');
 if(hint)hint.textContent=s?.locale==='en-US'?'← → navigate · automatic tour':s?.locale==='pt-BR'?'← → navegar · tour automático':'← → navegar · recorrido automático';
}
const obs=new MutationObserver(()=>requestAnimationFrame(syncHint));
obs.observe(document.documentElement,{subtree:true,childList:true});
syncHint();
window.aryGuideExtraStability142={active:extraActive};
})();

// V143 — make the final guide state truly adaptive and exit cleanly to Home.
(()=>{
 if(document.getElementById('aryGuideCompletionPolishLoader143'))return;
 const script=document.createElement('script');
 script.id='aryGuideCompletionPolishLoader143';
 script.src='guide-completion-polish-v143.js?v=143.1';
 script.async=false;
 document.body.appendChild(script);
})();
