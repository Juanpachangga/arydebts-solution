(()=>{
'use strict';
function guideActive(){
 try{return !!window.aryFullGuideStatus125?.()?.active}catch{return !!document.querySelector('.ary125cloud,.ary125final,.ary126node')}
}
function modalOpen(){
 const m=document.getElementById('modal');
 return !!m&&!m.classList.contains('hidden')&&m.offsetParent!==null;
}
const baseGo=window.go;
if(typeof baseGo==='function'&&!baseGo._aryFastNav137){
 const wrapped=function(route){
   if(guideActive())return baseGo.apply(this,arguments);
   const dest=typeof route==='string'?route:'';
   if(dest&&typeof screen==='string'&&dest===screen&&!modalOpen())return false;
   return baseGo.apply(this,arguments);
 };
 wrapped._aryFastNav137=true;
 window.go=wrapped;
}
// V164: do not intercept click events in capture phase. Native button taps are more reliable,
// especially on iOS/Safari, and the same-screen guard above already prevents redundant navigation.
window.aryFastNavigation137={active:true,captureGuard:false};
})();

// V138 — preserve recurrence/date/source metadata in late atomic expense saves.
(()=>{
 if(document.getElementById('aryExpenseRecurrenceIntegrityLoader138'))return;
 const script=document.createElement('script');
 script.id='aryExpenseRecurrenceIntegrityLoader138';
 script.src='expense-recurrence-integrity-v138.js?v=138.1';
 script.async=false;
 document.body.appendChild(script);
})();
