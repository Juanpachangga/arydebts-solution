(()=>{
'use strict';
const STYLE='aryGuideUltraStyle148';
const root=document.documentElement;
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
@media(max-width:820px),(pointer:coarse){
 html.aryGuideUltra148 .waves65,html.aryGuideUltra148 .seasonBackdrop71,html.aryGuideUltra148 .aurora{display:none!important}
 html.aryGuideUltra148 .ary125shade{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important;background:rgba(2,6,18,.72)!important}
 html.aryGuideUltra148 .ary125focus{animation:none!important;transition:none!important;box-shadow:0 0 0 2px rgba(98,221,255,.28)!important;border:2px solid #62ddff!important}
 html.aryGuideUltra148 .ary125cloud,html.aryGuideUltra148 .ary126node.ary125cloud{animation:none!important;transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:0 10px 24px rgba(0,0,0,.28)!important;background:#172541!important;border-radius:18px!important}
 html.aryGuideUltra148 .ary125cloud *,html.aryGuideUltra148 .ary126node.ary125cloud *{animation:none!important;transition:none!important;filter:none!important}
 html.aryGuideUltra148 .ary127countdown,html.aryGuideUltra148 .ary127hint,html.aryGuideUltra148 .ary130link,html.aryGuideUltra148 .ary131transition{display:none!important}
 html.aryGuideUltra148 .ary127section{box-shadow:none!important;background:#203858!important}
 html.aryGuideUltra148 .ary140cancelTop{box-shadow:none!important;background:#0f1b31!important}
 html.aryGuideUltra148 .ary125cloud .ary125actions{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideUltra148 *,html.aryGuideUltra148 *::before,html.aryGuideUltra148 *::after{scroll-behavior:auto!important}
}
`;
 document.head.appendChild(st);
}
function sync(){ensureStyle();root.classList.toggle('aryGuideUltra148',mobile()&&active())}
function wrap(name){
 const fn=window[name];if(typeof fn!=='function'||fn._ary148)return;
 const wrapped=function(){const out=fn.apply(this,arguments);requestAnimationFrame(sync);return out};
 wrapped._ary148=true;window[name]=wrapped;
}
/* The base tour explicitly asks for smooth scroll. On mobile, turn only guide-time smooth scrolls into immediate nearest positioning. */
const nativeScroll=Element.prototype.scrollIntoView;
if(nativeScroll&&!nativeScroll._ary148){
 const wrapped=function(options){
   if(mobile()&&active()&&options&&typeof options==='object'&&options.behavior==='smooth'){
     return nativeScroll.call(this,{...options,behavior:'auto',block:'nearest',inline:'nearest'});
   }
   return nativeScroll.call(this,options);
 };
 wrapped._ary148=true;wrapped._ary148native=nativeScroll;Element.prototype.scrollIntoView=wrapped;
}
for(const name of ['aryStartFullGuide125','aryFullGuideNext125','aryFullGuideBack125','aryFullGuideFinish125'])wrap(name);
for(const ev of ['resize','orientationchange','pageshow'])window.addEventListener(ev,()=>requestAnimationFrame(sync),{passive:true});
document.addEventListener('visibilitychange',sync);
sync();
window.aryGuideUltra148={sync,mobile,active};
})();

// V151 — skip painting offscreen cards on constrained/mobile devices outside the guide.
(()=>{
 if(document.getElementById('aryPerformancePaintLoader151'))return;
 const script=document.createElement('script');
 script.id='aryPerformancePaintLoader151';
 script.src='performance-paint-v151.js?v=151.1';
 script.async=false;
 document.body.appendChild(script);
})();
