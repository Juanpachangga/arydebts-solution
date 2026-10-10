(()=>{
'use strict';
const MOBILE=()=>window.matchMedia?.('(max-width: 820px), (pointer: coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const STYLE='aryMobilePerformanceStyle144';
let progressTimer=0,progressVisit=0,lastScreen=typeof screen==='string'?screen:'';

function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
body #app .progressHeading110>b{font-size:clamp(24px,5.7vw,34px)!important;line-height:1.12!important;font-weight:850!important;letter-spacing:-.02em}
body #app .progressTips110.ary144hide{opacity:0!important;transform:scale(.96)!important;pointer-events:none!important;visibility:hidden!important}
body #app .progressTips110{transition:opacity .18s ease,transform .18s ease!important}
@media(max-width:820px),(pointer:coarse){
 html.aryGuideLite144 .ary125shade{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important;background:rgba(2,6,18,.66)!important}
 html.aryGuideLite144 .ary125focus{animation:none!important;transition:none!important;box-shadow:0 0 0 3px rgba(98,221,255,.16)!important;border-width:2px!important}
 html.aryGuideLite144 .ary125cloud,html.aryGuideLite144 .ary126node.ary125cloud{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important;box-shadow:0 12px 34px rgba(0,0,0,.34)!important;background:#172541!important;color:#f2f8ff!important}
 html.aryGuideLite144 .ary125cloud p{color:#bdd0e8!important}
 html.aryGuideLite144 .ary127section{background:#203858!important;color:#bfefff!important;box-shadow:none!important}
 html.aryGuideLite144.ary-light .ary125cloud,html.aryGuideLite144 .ary-light .ary125cloud{background:linear-gradient(145deg,#fff,#f1f6ff)!important;color:#172641!important;border-color:#81cfdf!important;box-shadow:0 12px 30px rgba(39,62,103,.22)!important}
 html.aryGuideLite144.ary-light .ary125cloud p,html.aryGuideLite144 .ary-light .ary125cloud p{color:#60738c!important}
 html.aryGuideLite144.ary-light .ary127section,html.aryGuideLite144 .ary-light .ary127section{background:#e8f8ff!important;color:#235b74!important;border-color:#b9e7f1!important}
 html.aryGuideLite144 .ary127countdown,html.aryGuideLite144 .ary130link,html.aryGuideLite144 .ary131transition{display:none!important}
 html.aryGuideLite144 #aryGuideBlock127{touch-action:none!important}
 html.aryGuideLite144 .ary140cancelTop{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideLite144 .ary125cloud .ary125actions{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideLite144 .aryGuide94{display:none!important}
 html.aryGuideLite144 *{scroll-behavior:auto!important}
}
`;
 document.head.appendChild(st);
}

function guideActive(){try{return !!window.aryFullGuideStatus125?.()?.active}catch{return false}}
function syncLite(){
 const root=document.documentElement;
 if(MOBILE()&&guideActive())root.classList.add('aryGuideLite144');
 else root.classList.remove('aryGuideLite144');
}

function progressCopy(){
 const l=s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
 return l==='en'?'Your progress':l==='pt'?'Seu progresso':'Tu avance';
}
function polishProgress(){
 if(typeof screen!=='string'||screen!=='progress')return;
 const heading=document.querySelector('#app .progressHeading110>b');
 if(heading)heading.textContent=progressCopy();
 const tips=document.querySelector('#app .progressTips110');
 if(tips&&tips.dataset.ary144!=='1'){
   tips.dataset.ary144='1';
   tips.classList.remove('ary144hide');
   const token=progressVisit;
   clearTimeout(progressTimer);
   progressTimer=setTimeout(()=>{if(token===progressVisit&&typeof screen==='string'&&screen==='progress')document.querySelector('#app .progressTips110')?.classList.add('ary144hide')},3000);
 }
}
function onScreenChange(){
 const current=typeof screen==='string'?screen:'';
 if(current!==lastScreen){
   if(current==='progress'){progressVisit++;clearTimeout(progressTimer)}
   else clearTimeout(progressTimer);
   lastScreen=current;
 }
 syncLite();
 requestAnimationFrame(polishProgress);
}

function hook(name){
 const fn=window[name];if(typeof fn!=='function'||fn._ary144)return;
 const wrapped=function(){const out=fn.apply(this,arguments);requestAnimationFrame(onScreenChange);return out};
 wrapped._ary144=true;window[name]=wrapped;
}
ensureStyle();
hook('render');hook('go');
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,()=>requestAnimationFrame(syncLite),{passive:true});
const guideStart=window.aryStartFullGuide125;
if(typeof guideStart==='function'&&!guideStart._ary144){const w=function(){const out=guideStart.apply(this,arguments);requestAnimationFrame(syncLite);return out};w._ary144=true;window.aryStartFullGuide125=w}
const guideFinish=window.aryFullGuideFinish125;
if(typeof guideFinish==='function'&&!guideFinish._ary144){const w=function(){const out=guideFinish.apply(this,arguments);requestAnimationFrame(syncLite);return out};w._ary144=true;window.aryFullGuideFinish125=w}
if(typeof screen==='string'&&screen==='progress')progressVisit++;
onScreenChange();
window.aryMobilePerformance144={mobile:MOBILE,sync:()=>{syncLite();polishProgress()}};
})();

// V147 — adaptive performance profile for the whole application.
(()=>{
 if(document.getElementById('aryPerformanceStabilityLoader147'))return;
 const script=document.createElement('script');
 script.id='aryPerformanceStabilityLoader147';
 script.src='performance-stability-v147.js?v=147.1';
 script.async=false;
 document.body.appendChild(script);
})();
