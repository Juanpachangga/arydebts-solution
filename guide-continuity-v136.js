(()=>{
'use strict';
const CHECK_MS=700,RETRY_AFTER=1400,ADVANCE_AFTER=3600;
let timer=0,lastIndex=-1,missingSince=0,retries=0;
function status(){try{return window.aryFullGuideStatus125?.()||null}catch{return null}}
function visible(){return document.visibilityState!=='hidden'}
function hasGuideUi(){return !!document.querySelector('.ary125cloud,.ary125final')}
function hasTransition(){return !!document.querySelector('.ary131transition')}
function nudgeRender(){
 try{window.dispatchEvent(new Event('resize'))}catch{}
}
function keepAuto(st){
 if(st?.active&&!st.automatic&&typeof window.aryFullGuideToggleAuto125==='function'){
   try{window.aryFullGuideToggleAuto125()}catch{}
 }
}
function tick(){
 clearTimeout(timer);
 const st=status();
 if(!st?.active||!visible()){
   missingSince=0;retries=0;lastIndex=st?.index??-1;
   timer=setTimeout(tick,CHECK_MS);return;
 }
 if(st.index!==lastIndex){lastIndex=st.index;missingSince=0;retries=0}
 keepAuto(st);
 if(hasGuideUi()||hasTransition()){
   missingSince=0;retries=0;
   timer=setTimeout(tick,CHECK_MS);return;
 }
 const now=Date.now();if(!missingSince)missingSince=now;
 const age=now-missingSince;
 if(age>=RETRY_AFTER&&retries<2){retries++;nudgeRender();}
 if(age>=ADVANCE_AFTER){
   missingSince=0;retries=0;
   try{window.aryFullGuideNext125?.()}catch{}
 }
 timer=setTimeout(tick,CHECK_MS);
}
const prior=window.aryGuideUnderstood135;
if(typeof prior==='function'&&!prior._aryContinuity136){
 const wrapped=function(){const out=prior.apply(this,arguments);setTimeout(()=>keepAuto(status()),80);return out};
 wrapped._aryContinuity136=true;window.aryGuideUnderstood135=wrapped;
}
document.addEventListener('visibilitychange',()=>{if(visible())setTimeout(()=>{const st=status();if(st?.active){keepAuto(st);nudgeRender()}},120)});
window.addEventListener('pageshow',()=>setTimeout(()=>{const st=status();if(st?.active){keepAuto(st);nudgeRender()}},120));
window.aryGuideContinuity136={check:()=>{const st=status();return{active:!!st?.active,index:st?.index??-1,automatic:!!st?.automatic,ui:hasGuideUi(),transition:hasTransition()}}};
tick();
})();

// V137 — avoid redundant renders and accidental double-navigation during normal daily use.
(()=>{
 if(document.getElementById('aryFastNavigationLoader137'))return;
 const script=document.createElement('script');
 script.id='aryFastNavigationLoader137';
 script.src='fast-navigation-v137.js?v=137.1';
 script.async=false;
 document.body.appendChild(script);
})();
