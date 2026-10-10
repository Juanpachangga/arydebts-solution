(()=>{
'use strict';
const STYLE='aryGuideSafeLayoutStyle140';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const labels={es:'Cancelar guía',en:'Cancel guide',pt:'Cancelar guia'};
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
let raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function viewport(){const v=window.visualViewport;return{top:v?.offsetTop||0,left:v?.offsetLeft||0,width:v?.width||innerWidth,height:v?.height||innerHeight}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{contain:layout paint}
.ary140cancelTop{position:absolute;right:12px;top:10px;z-index:8;display:inline-flex;align-items:center;gap:5px;min-height:30px;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(8,16,35,.9);color:#bed0e6;font-size:10px;font-weight:850;cursor:pointer}.ary140cancelTop:hover{color:#fff;background:rgba(24,38,69,.96)}.ary-light .ary140cancelTop{background:#fff;color:#61758c;border-color:#d9e5ef}.ary-light .ary140cancelTop:hover{color:#17304b}
.ary125cloud .ary125actions{z-index:9!important}
@media(max-width:820px),(pointer:coarse){
 .ary140cancelTop{right:9px;top:8px;min-height:32px;padding:5px 8px;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 .ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - max(18px,env(safe-area-inset-top)) - max(18px,env(safe-area-inset-bottom)))!important}
}
`;
document.head.appendChild(st)}
function addTopCancel(cloud){if(!cloud||cloud.classList.contains('ary125final')||cloud.querySelector('.ary140cancelTop'))return;const b=document.createElement('button');b.type='button';b.className='ary140cancelTop';b.innerHTML='✕ <span>'+labels[lang()]+'</span>';b.onclick=e=>{e.preventDefault();e.stopPropagation();window.aryGuideCancel139?.()};cloud.appendChild(b)}
function place(cloud){
 if(!cloud||!active())return;
 const v=viewport(),margin=10,focus=document.querySelector('.ary125focus');
 cloud.style.maxHeight=Math.max(180,v.height-margin*2)+'px';
 const w=Math.min(cloud.offsetWidth,v.width-margin*2),h=Math.min(cloud.offsetHeight,v.height-margin*2);
 let left=v.left+Math.max(margin,(v.width-w)/2),top=v.top+Math.max(margin,(v.height-h)/2);
 if(focus){
   const f=focus.getBoundingClientRect(),center=f.top+f.height/2-v.top;
   const topSpace=Math.max(0,f.top-v.top-margin),bottomSpace=Math.max(0,v.top+v.height-f.bottom-margin);
   if(center>v.height*.54||topSpace>=h+12)top=v.top+margin;
   else if(bottomSpace>=h+12)top=v.top+v.height-h-margin;
   else top=v.top+margin;
 }
 cloud.style.left=Math.max(v.left+margin,Math.min(v.left+v.width-w-margin,left))+'px';
 cloud.style.top=Math.max(v.top+margin,Math.min(v.top+v.height-h-margin,top))+'px';
 cloud.scrollTop=Math.min(cloud.scrollTop,Math.max(0,cloud.scrollHeight-cloud.clientHeight));
}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;document.querySelectorAll('.ary125cloud').forEach(c=>{addTopCancel(c);place(c)})})}
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary125focus,.ary126node')||n.querySelector?.('.ary125cloud,.ary125focus,.ary126node')))))sync()});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
/* Desktop may need live placement during scroll; mobile intentionally does not recalc on finger movement. */
if(!mobile())window.visualViewport?.addEventListener('scroll',sync,{passive:true});
if(!mobile())document.addEventListener('scroll',()=>{if(active())sync()},true);
window.aryGuideSafeLayout140={sync};
ensureStyle();sync();
})();

// V141 — reset deep scroll between guide sections and prevent pointer/control overlap.
(()=>{
 if(document.getElementById('aryGuideScrollStabilityLoader141'))return;
 const script=document.createElement('script');
 script.id='aryGuideScrollStabilityLoader141';
 script.src='guide-scroll-stability-v141.js?v=141.3';
 script.async=false;
 document.body.appendChild(script);
})();
