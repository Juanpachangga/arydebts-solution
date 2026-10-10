(()=>{
'use strict';
const STYLE='aryPerformanceStabilityStyle147';
const root=document.documentElement;
const mqCoarse=window.matchMedia?.('(pointer:coarse)');
const mqSmall=window.matchMedia?.('(max-width:820px)');
const mqReduced=window.matchMedia?.('(prefers-reduced-motion:reduce)');

function profile(){
 const cores=Number(navigator.hardwareConcurrency)||8;
 const memory=Number(navigator.deviceMemory)||8;
 const mobile=!!(mqCoarse?.matches||mqSmall?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||''));
 const reduced=!!mqReduced?.matches;
 const constrained=reduced||memory<=4||cores<=4||(mobile&&cores<=6);
 return {mobile,reduced,constrained,cores,memory};
}
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
html.aryPerfBalanced147 .ary125shade,html.aryPerfBalanced147 .ary125cloud{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
html.aryPerfLite147 .waves65::before,html.aryPerfLite147 .waves65::after,html.aryPerfLite147 .signoutWave65::before,
html.aryPerfLite147 .seasonBackdrop71 *,html.aryPerfLite147 .aurora{animation:none!important}
html.aryPerfLite147 .seasonArt71{filter:none!important}
html.aryPerfLite147 #app .card,html.aryPerfLite147 #nav,html.aryPerfLite147 #modal .sheet{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
html.aryPerfLite147 #app *,html.aryPerfLite147 #nav *,html.aryPerfLite147 #modal *{scroll-behavior:auto!important}
html.aryPerfLite147 .ary125focus{animation:none!important;box-shadow:0 0 0 3px rgba(98,221,255,.16)!important}
html.aryPerfPaused147 *{animation-play-state:paused!important}
@media(prefers-reduced-motion:reduce){html *{scroll-behavior:auto!important}}
`;
 document.head.appendChild(st);
}
function apply(){
 ensureStyle();
 const p=profile();
 root.classList.toggle('aryPerfBalanced147',p.mobile);
 root.classList.toggle('aryPerfLite147',p.constrained);
 root.classList.toggle('aryPerfPaused147',document.visibilityState==='hidden');
 root.dataset.aryPerf147=p.constrained?'lite':p.mobile?'balanced':'full';
 return p;
}
function idle(fn){
 if('requestIdleCallback'in window)return requestIdleCallback(fn,{timeout:1200});
 return setTimeout(fn,160);
}
let raf=0;
function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(apply)}
for(const m of [mqCoarse,mqSmall,mqReduced])m?.addEventListener?.('change',schedule);
window.addEventListener('resize',schedule,{passive:true});
document.addEventListener('visibilitychange',()=>{apply();if(document.visibilityState==='visible')idle(()=>window.aryMobilePerformance144?.sync?.())});
window.addEventListener('pageshow',schedule,{passive:true});
apply();
window.aryPerformance147={profile,apply};
})();

// V148 — while the guide is active on mobile, use an ultra-light rendering path.
(()=>{
 if(document.getElementById('aryGuideUltraLoader148'))return;
 const script=document.createElement('script');
 script.id='aryGuideUltraLoader148';
 script.src='guide-ultralite-v148.js?v=148.1';
 script.async=false;
 document.body.appendChild(script);
})();
