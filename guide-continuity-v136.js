(()=>{
'use strict';
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const ACTIVE_MS=()=>mobile()?1400:900,IDLE_MS=5000,HIDDEN_MS=5000,RETRY_AFTER=1800,ADVANCE_AFTER=4200;
let timer=0,lastIndex=-1,missingSince=0,retries=0;
function status(){try{return window.aryFullGuideStatus125?.()||null}catch{return null}}
function visible(){return document.visibilityState!=='hidden'}
function extraActive(){return !!document.querySelector('.ary126node.ary125cloud')}
function hasGuideUi(){return !!document.querySelector('.ary125cloud,.ary125final')}
function hasTransition(){return !!document.querySelector('.ary131transition')}
function nudgeRender(){try{window.dispatchEvent(new Event('resize'))}catch{}}
function keepAuto(st){
 if(extraActive())return;
 if(st?.active&&!st.automatic&&typeof window.aryFullGuideToggleAuto125==='function'){
   try{window.aryFullGuideToggleAuto125()}catch{}
 }
}
function schedule(ms){clearTimeout(timer);timer=setTimeout(tick,ms)}
function tick(){
 clearTimeout(timer);
 const st=status();
 if(!st?.active){missingSince=0;retries=0;lastIndex=st?.index??-1;schedule(IDLE_MS);return}
 if(!visible()){missingSince=0;retries=0;lastIndex=st.index??-1;schedule(HIDDEN_MS);return}
 if(st.index!==lastIndex){lastIndex=st.index;missingSince=0;retries=0}
 keepAuto(st);
 if(hasGuideUi()||hasTransition()){missingSince=0;retries=0;schedule(ACTIVE_MS());return}
 const now=Date.now();if(!missingSince)missingSince=now;
 const age=now-missingSince;
 if(age>=RETRY_AFTER&&retries<1){retries++;nudgeRender()}
 if(age>=ADVANCE_AFTER){missingSince=0;retries=0;try{window.aryFullGuideNext125?.()}catch{}}
 schedule(ACTIVE_MS());
}
const prior=window.aryGuideUnderstood135;
if(typeof prior==='function'&&!prior._aryContinuity136){
 const wrapped=function(){const out=prior.apply(this,arguments);setTimeout(()=>keepAuto(status()),120);return out};
 wrapped._aryContinuity136=true;window.aryGuideUnderstood135=wrapped;
}
function wake(){const st=status();if(st?.active){keepAuto(st);nudgeRender();schedule(ACTIVE_MS())}else schedule(IDLE_MS)}
document.addEventListener('visibilitychange',()=>{if(visible())setTimeout(wake,140)});
window.addEventListener('pageshow',()=>setTimeout(wake,140));
window.aryGuideContinuity136={check:()=>{const st=status();return{active:!!st?.active,index:st?.index??-1,automatic:!!st?.automatic,extra:extraActive(),ui:hasGuideUi(),transition:hasTransition(),interval:st?.active?ACTIVE_MS():IDLE_MS}}};
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
