(()=>{
'use strict';
const STYLE='aryGuideSafeLayoutStyle140';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const labels={es:'Cancelar',en:'Cancel',pt:'Cancelar'};
let raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function viewport(){const v=window.visualViewport;return{top:v?.offsetTop||0,left:v?.offsetLeft||0,width:v?.width||innerWidth,height:v?.height||innerHeight}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{contain:layout paint;}
.ary140cancelTop{position:absolute;right:12px;top:10px;z-index:8;display:inline-flex;align-items:center;gap:5px;min-height:30px;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(8,16,35,.72);color:#bed0e6;font-size:10px;font-weight:850;backdrop-filter:blur(7px);cursor:pointer}.ary140cancelTop:hover{color:#fff;background:rgba(24,38,69,.9)}.ary-light .ary140cancelTop{background:rgba(255,255,255,.88);color:#61758c;border-color:#d9e5ef}.ary-light .ary140cancelTop:hover{color:#17304b}
.ary125cloud .ary125actions{z-index:9!important}
@media(max-width:560px){.ary140cancelTop{right:9px;top:8px;min-height:32px;padding:5px 8px}.ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - max(18px,env(safe-area-inset-top)) - max(18px,env(safe-area-inset-bottom)))!important}}
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
   if(center>v.height*.54||topSpace>=h+12) top=v.top+margin;
   else if(bottomSpace>=h+12) top=v.top+v.height-h-margin;
   else top=v.top+margin;
 }
 cloud.style.left=Math.max(v.left+margin,Math.min(v.left+v.width-w-margin,left))+'px';
 cloud.style.top=Math.max(v.top+margin,Math.min(v.top+v.height-h-margin,top))+'px';
 cloud.scrollTop=Math.min(cloud.scrollTop,Math.max(0,cloud.scrollHeight-cloud.clientHeight));
}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;document.querySelectorAll('.ary125cloud').forEach(c=>{addTopCancel(c);place(c)})})}
const obs=new MutationObserver(sync);obs.observe(document.documentElement,{subtree:true,childList:true});
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
window.visualViewport?.addEventListener('scroll',sync,{passive:true});
document.addEventListener('scroll',()=>{if(active())sync()},true);
window.aryGuideSafeLayout140={sync};
ensureStyle();sync();
})();
