(()=>{
'use strict';
const STYLE='aryGuideScrollStabilityStyle141';
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||false;
let lastScreen=typeof screen==='string'?screen:'',lastIndex=-1,raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud{scroll-behavior:smooth}
@media(max-width:560px){.ary125cloud{scroll-behavior:auto}}
`;document.head.appendChild(st)}
function overlap(a,b,pad=8){return !(a.right+pad<b.left||b.right+pad<a.left||a.bottom+pad<b.top||b.bottom+pad<a.top)}
function cleanArrow(){
 if(mobile())return;
 const cloud=document.querySelector('.ary125cloud'),focus=document.querySelector('.ary125focus'),line=document.querySelector('.ary130link');
 if(!line)return;
 if(!cloud||!focus){line.remove();return}
 const a=cloud.getBoundingClientRect(),b=focus.getBoundingClientRect();
 if(overlap(a,b,14)||innerWidth<620)line.style.display='none';else line.style.display='block';
}
function keepControlsVisible(){
 const cloud=document.querySelector('.ary125cloud');if(!cloud)return;
 const actions=cloud.querySelector('.ary125actions');if(!actions)return;
 const cr=cloud.getBoundingClientRect(),ar=actions.getBoundingClientRect();
 if(ar.bottom>cr.bottom+1)cloud.scrollTop+=ar.bottom-cr.bottom+10;
}
function resetOnSectionChange(){
 if(!active())return;
 const current=typeof screen==='string'?screen:'';
 const st=window.aryFullGuideStatus125?.();
 if(current&&lastScreen&&current!==lastScreen){
   try{window.scrollTo({top:0,left:0,behavior:'auto'})}catch{window.scrollTo(0,0)}
   document.scrollingElement&&(document.scrollingElement.scrollTop=0);
 }
 lastScreen=current||lastScreen;
 if(st&&st.index!==lastIndex){lastIndex=st.index;const cloud=document.querySelector('.ary125cloud');if(cloud)cloud.scrollTop=0}
}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;resetOnSectionChange();cleanArrow();keepControlsVisible()})}
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary125focus,.ary126node')||n.querySelector?.('.ary125cloud,.ary125focus,.ary126node')))))sync()});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
if(!mobile())document.addEventListener('scroll',()=>{if(active())sync()},true);
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
window.aryGuideScrollStability141={sync};
ensureStyle();sync();
})();

// V142 — keep V126 extra guide steps isolated from the main V125 auto/keyboard engine.
(()=>{
 if(document.getElementById('aryGuideExtraStabilityLoader142'))return;
 const script=document.createElement('script');
 script.id='aryGuideExtraStabilityLoader142';
 script.src='guide-extra-stability-v142.js?v=142.2';
 script.async=false;
 document.body.appendChild(script);
})();
