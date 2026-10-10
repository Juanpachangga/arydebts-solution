(()=>{
'use strict';
const STYLE='aryGuideSafeLayoutStyle140';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const labels={es:'Cancelar guía',en:'Cancel guide',pt:'Cancelar guia'};
let raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{contain:layout paint}
.ary140cancelTop{position:absolute;right:12px;top:10px;z-index:8;display:inline-flex;align-items:center;gap:5px;min-height:30px;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(8,16,35,.9);color:#bed0e6;font-size:10px;font-weight:850;cursor:pointer}.ary140cancelTop:hover{color:#fff;background:rgba(24,38,69,.96)}.ary-light .ary140cancelTop{background:#fff;color:#61758c;border-color:#d9e5ef}.ary-light .ary140cancelTop:hover{color:#17304b}
.ary125cloud .ary125actions{z-index:9!important}
@media(max-width:820px),(pointer:coarse){
 .ary140cancelTop{right:9px;top:8px;min-height:32px;padding:5px 8px;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 .ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - max(18px,env(safe-area-inset-top)) - max(18px,env(safe-area-inset-bottom)))!important}
}
`;document.head.appendChild(st)}
function addTopCancel(cloud){if(!cloud||cloud.classList.contains('ary125final')||cloud.querySelector('.ary140cancelTop'))return;const b=document.createElement('button');b.type='button';b.className='ary140cancelTop';b.innerHTML='✕ <span>'+labels[lang()]+'</span>';b.onclick=e=>{e.preventDefault();e.stopPropagation();window.aryGuideCancel139?.()};cloud.appendChild(b)}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;document.querySelectorAll('.ary125cloud').forEach(addTopCancel)})}
/* V164: V125 owns cloud placement. This layer must never reposition the guide over its target. */
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary126node')||n.querySelector?.('.ary125cloud,.ary126node')))))sync()});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
window.aryGuideSafeLayout140={sync,placementOwner:'v125'};
ensureStyle();sync();
})();

// V141 — keep guide controls visible without moving the page away from the highlighted target.
(()=>{
 if(document.getElementById('aryGuideScrollStabilityLoader141'))return;
 const script=document.createElement('script');
 script.id='aryGuideScrollStabilityLoader141';
 script.src='guide-scroll-stability-v141.js?v=141.4';
 script.async=false;
 document.body.appendChild(script);
})();
