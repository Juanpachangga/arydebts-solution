(()=>{
'use strict';
const labels=/^(entendido|entendi|got it|understood|ok|okay|listo|compreendi|compreendido)$/i;
function guideActive(){return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary125cloud,.aryGuide116')}
function isFinal(){return !!document.querySelector('.ary125final')}
function next(){
 if(!guideActive()||isFinal())return false;
 try{
   const st=window.aryFullGuideStatus125?.();
   if(st&&!st.automatic&&typeof window.aryFullGuideToggleAuto125==='function')window.aryFullGuideToggleAuto125();
 }catch{}
 setTimeout(()=>window.aryFullGuideNext125?.(),20);
 return true;
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('button,[role="button"]');
 if(!b||!guideActive()||isFinal())return;
 const text=String(b.textContent||'').trim().replace(/[›→✓✔︎☑️]/g,'').trim();
 if(!labels.test(text))return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();next();
},{capture:true});
window.aryGuideUnderstood135=next;
})();

// V136 — keep the automatic guide moving through slow or interrupted page transitions.
(()=>{
 if(document.getElementById('aryGuideContinuityLoader136'))return;
 const script=document.createElement('script');
 script.id='aryGuideContinuityLoader136';
 script.src='guide-continuity-v136.js?v=136.1';
 script.async=false;
 document.body.appendChild(script);
})();
