(()=>{
'use strict';
const STYLE='aryPerformancePaintStyle151';
const root=document.documentElement;
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const guideActive=()=>{try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}};
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
@media(max-width:820px),(pointer:coarse){
 html.aryPaint151:not(.aryPaintGuide151) #app>.card,
 html.aryPaint151:not(.aryPaintGuide151) #app>.full,
 html.aryPaint151:not(.aryPaintGuide151) #app>.grid>.card,
 html.aryPaint151:not(.aryPaintGuide151) #app .list>.card{
   content-visibility:auto;
   contain-intrinsic-size:auto 180px;
 }
 html.aryPerfLite147:not(.aryPaintGuide151) #app .card{
   box-shadow:none!important;
 }
 html.aryPerfLite147:not(.aryPaintGuide151) #app .tap45,
 html.aryPerfLite147:not(.aryPaintGuide151) #app .btn{
   transition:none!important;
 }
}
html.aryPerfPaused147 #app,html.aryPerfPaused147 #nav,html.aryPerfPaused147 #modal{content-visibility:auto}
`;
 document.head.appendChild(st);
}
function sync(){
 ensureStyle();
 const p=window.aryPerformance147?.profile?.();
 const use=mobile()||!!p?.constrained;
 root.classList.toggle('aryPaint151',use);
 root.classList.toggle('aryPaintGuide151',guideActive());
}
function wrap(name){const fn=window[name];if(typeof fn!=='function'||fn._ary151)return;const w=function(){const out=fn.apply(this,arguments);requestAnimationFrame(sync);return out};w._ary151=true;window[name]=w}
for(const name of ['render','go','aryStartFullGuide125','aryFullGuideNext125','aryFullGuideBack125','aryFullGuideFinish125'])wrap(name);
for(const ev of ['resize','orientationchange','pageshow'])window.addEventListener(ev,()=>requestAnimationFrame(sync),{passive:true});
document.addEventListener('visibilitychange',sync);
sync();
window.aryPerformancePaint151={sync};
})();
