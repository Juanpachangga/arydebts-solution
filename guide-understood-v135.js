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
// Expose a safe handler for any future guide component that wants an explicit "understood" action.
window.aryGuideUnderstood135=next;
})();
