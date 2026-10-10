(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const understood=()=>lang()==='en'?'Got it':lang()==='pt'?'Entendi':'Entendido';
const labels=/^(entendido|entendi|got it|understood|ok|okay|listo|compreendi|compreendido)$/i;
function guideActive(){
 try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary125cloud,.aryGuide116,.ary126node.ary125cloud')}
 catch{return !!document.querySelector('.ary125cloud,.aryGuide116,.ary126node.ary125cloud')}
}
function isFinal(){return !!document.querySelector('.ary125final')}
function keepMainAuto(){
 try{
  const st=window.aryFullGuideStatus125?.();
  if(st?.active&&!st.automatic&&typeof window.aryFullGuideToggleAuto125==='function')window.aryFullGuideToggleAuto125();
 }catch{}
}
function mainNext(){
 if(!guideActive()||isFinal())return false;
 keepMainAuto();
 setTimeout(()=>window.aryFullGuideNext125?.(),20);
 return true;
}
function extraNext(button){
 if(!button||isFinal())return false;
 const handler=button.onclick;
 if(typeof handler!=='function')return false;
 setTimeout(()=>{try{handler.call(button)}catch{}},20);
 return true;
}
function relabel(){
 if(!guideActive()||isFinal())return;
 const text=understood();
 document.querySelectorAll('.ary125cloud:not(.ary125final)').forEach(cloud=>{
  const b=cloud.classList.contains('ary126node')?cloud.querySelector('#ary126next'):cloud.querySelector('.ary125actions .primary');
  if(!b)return;
  b.dataset.aryUnderstood135='1';
  b.textContent=text+' ›';
  b.setAttribute('aria-label',text);
 });
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('button,[role="button"]');
 if(!b||!guideActive()||isFinal())return;
 const text=String(b.textContent||'').trim().replace(/[›→✓✔︎☑️]/g,'').trim();
 if(!labels.test(text))return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();
 const extra=!!b.closest('.ary126node.ary125cloud');
 if(extra)extraNext(b);else mainNext();
},{capture:true});
const observer=new MutationObserver(()=>requestAnimationFrame(relabel));
observer.observe(document.documentElement,{subtree:true,childList:true});
window.aryGuideUnderstood135=mainNext;
window.aryGuideRelabel135=relabel;
relabel();
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
