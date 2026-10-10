(()=>{
'use strict';
let lastRoute='',lastAt=0;
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
   const now=Date.now();
   if(dest&&typeof screen==='string'&&dest===screen&&!modalOpen())return false;
   if(dest&&dest===lastRoute&&now-lastAt<220)return false;
   lastRoute=dest;lastAt=now;
   return baseGo.apply(this,arguments);
 };
 wrapped._aryFastNav137=true;
 window.go=wrapped;
}
let lastNavTap=0,lastNavTarget='';
document.addEventListener('click',e=>{
 if(guideActive())return;
 const el=e.target?.closest?.('#nav button,#nav [role="button"],nav button,nav [role="button"]');
 if(!el)return;
 const key=String(el.getAttribute('onclick')||el.dataset?.route||el.textContent||'').trim();
 const now=Date.now();
 if(key&&key===lastNavTarget&&now-lastNavTap<220){e.preventDefault();e.stopPropagation();return}
 lastNavTarget=key;lastNavTap=now;
},{capture:true});
window.aryFastNavigation137={active:true};
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
