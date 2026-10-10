(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const understood=()=>lang()==='en'?'Got it':lang()==='pt'?'Entendi':'Entendido';
function relabel(){
 const st=window.aryFullGuideStatus125?.();
 if(!st?.active)return;
 const button=document.querySelector('.ary125cloud:not(.ary125final) .ary125actions .primary');
 if(!button)return;
 const text=understood();
 if(String(button.textContent||'').trim()!==text+' ›')button.textContent=text+' ›';
 button.setAttribute('aria-label',text);
}
window.aryGuideUnderstood135=()=>{
 const st=window.aryFullGuideStatus125?.();
 if(!st?.active||document.querySelector('.ary125final'))return false;
 window.aryFullGuideNext125?.();
 return true;
};
window.aryGuideRelabel135=relabel;
requestAnimationFrame(relabel);
})();

// V136 — continuity must preserve the user's pause/step choice; it never advances on its own.
(()=>{
 if(document.getElementById('aryGuideContinuityLoader136'))return;
 const script=document.createElement('script');
 script.id='aryGuideContinuityLoader136';
 script.src='guide-continuity-v136.js?v=136.3';
 script.async=false;
 document.body.appendChild(script);
})();