(()=>{
'use strict';
function extraCloud(){return document.querySelector('.ary126node.ary125cloud')}
function extraActive(){return !!extraCloud()}
const toggle=window.aryFullGuideToggleAuto125;
if(typeof toggle==='function'&&!toggle._aryExtraStable142){
 const wrapped=function(){if(extraActive())return false;return toggle.apply(this,arguments)};
 wrapped._aryExtraStable142=true;window.aryFullGuideToggleAuto125=wrapped;
}
document.addEventListener('keydown',e=>{
 if(!extraActive())return;
 if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 if(e.key==='ArrowRight'){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();document.getElementById('ary126next')?.click();
 }else if(e.key==='ArrowLeft'){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();const back=document.getElementById('ary126back');if(back&&!back.disabled)back.click();
 }else if(e.code==='Space'){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();
 }
},true);
function syncHint(){
 const cloud=extraCloud();if(!cloud)return;
 const hint=cloud.querySelector('.ary127hint');
 if(hint)hint.textContent=s?.locale==='en-US'?'← → navigate · automatic tour':s?.locale==='pt-BR'?'← → navegar · tour automático':'← → navegar · recorrido automático';
}
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary126node,.ary125cloud')||n.querySelector?.('.ary126node,.ary125cloud')))))requestAnimationFrame(syncHint)});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
syncHint();
window.aryGuideExtraStability142={active:extraActive};
})();

// V143 — make the final guide state truly adaptive and exit cleanly to Home.
(()=>{
 if(document.getElementById('aryGuideCompletionPolishLoader143'))return;
 const script=document.createElement('script');
 script.id='aryGuideCompletionPolishLoader143';
 script.src='guide-completion-polish-v143.js?v=143.2';
 script.async=false;
 document.body.appendChild(script);
})();
