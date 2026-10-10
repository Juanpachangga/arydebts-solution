(()=>{
'use strict';
const STYLE='aryGuideMobileControlsStyle139';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const text={
 es:{cancel:'Cancelar guía',title:'¿Cancelar la guía?',body:'Puedes cerrar el recorrido y usar Arydebts normalmente. La guía no volverá a aparecer automáticamente.',yes:'Sí, cancelar',no:'Seguir con la guía'},
 en:{cancel:'Cancel guide',title:'Cancel the guide?',body:'You can close the tour and use Arydebts normally. The guide will not appear automatically again.',yes:'Yes, cancel',no:'Keep the guide'},
 pt:{cancel:'Cancelar guia',title:'Cancelar o guia?',body:'Você pode fechar o tour e usar o Arydebts normalmente. O guia não aparecerá automaticamente novamente.',yes:'Sim, cancelar',no:'Continuar guia'}
};
const t=()=>text[lang()]||text.es;
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - 24px)!important;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain!important;scrollbar-gutter:stable;box-sizing:border-box}
.ary125cloud .ary125actions{position:sticky;bottom:-1px;z-index:4;margin-top:10px;padding:10px 0 2px;background:linear-gradient(180deg,rgba(20,29,61,0),rgba(20,29,61,.96) 26%,rgba(20,29,61,.99));backdrop-filter:blur(5px)}
.ary-light .ary125cloud .ary125actions{background:linear-gradient(180deg,rgba(255,255,255,0),rgba(248,252,255,.96) 26%,rgba(248,252,255,.99))}
.ary139cancel{width:100%;margin-top:8px;min-height:38px;border:0;background:transparent;color:#91a9c7;font-size:11px;font-weight:800;text-decoration:underline;text-underline-offset:3px;cursor:pointer}.ary139cancel:hover{color:#d8e9ff}.ary-light .ary139cancel{color:#647b95}.ary-light .ary139cancel:hover{color:#29465f}
.ary139confirm{position:fixed;inset:0;z-index:10040;display:grid;place-items:center;padding:18px;background:rgba(2,7,20,.78);backdrop-filter:blur(7px)}.ary139confirmCard{width:min(370px,calc(100vw - 30px));padding:20px;border-radius:24px;border:1px solid rgba(105,218,255,.35);background:linear-gradient(145deg,#111e3c,#281d4e);color:#f4f9ff;box-shadow:0 25px 80px rgba(0,0,0,.55);text-align:center}.ary139confirmCard h3{margin:0 0 8px}.ary139confirmCard p{margin:0 0 16px;color:#b8cae1;font-size:13px;line-height:1.45}.ary139confirmActions{display:grid;gap:8px}.ary139confirmActions button{min-height:44px;border-radius:14px;font-weight:850}.ary139yes{border:1px solid rgba(255,129,150,.4);background:rgba(255,86,119,.15);color:#ffd8df}.ary139no{border:0;background:linear-gradient(135deg,#39d7c2,#54c7ff,#8068ff);color:#071223}.ary-light .ary139confirm{background:rgba(236,244,252,.82)}.ary-light .ary139confirmCard{background:#fff;color:#19334e;border-color:#bfe4ed}.ary-light .ary139confirmCard p{color:#657d94}
@media(max-width:560px){.ary125cloud,.ary126node.ary125cloud{width:calc(100vw - 16px)!important;max-height:calc(100dvh - 16px)!important;border-radius:20px!important}.ary125cloud .ary125actions{padding-bottom:max(4px,env(safe-area-inset-bottom))}.ary139cancel{min-height:42px}}
`;
 document.head.appendChild(st);
}
function viewport(){const v=window.visualViewport;return{top:v?.offsetTop||0,left:v?.offsetLeft||0,width:v?.width||innerWidth,height:v?.height||innerHeight}}
function clampCloud(cloud){
 if(!cloud)return;
 const v=viewport(),margin=8;
 const r=cloud.getBoundingClientRect();
 const maxH=Math.max(160,v.height-margin*2);
 cloud.style.maxHeight=maxH+'px';
 let top=parseFloat(cloud.style.top)||r.top;
 let left=parseFloat(cloud.style.left)||r.left;
 const h=Math.min(cloud.offsetHeight,maxH),w=cloud.offsetWidth;
 const minTop=v.top+margin,maxTop=v.top+v.height-h-margin;
 const minLeft=v.left+margin,maxLeft=v.left+v.width-w-margin;
 top=Math.max(minTop,Math.min(Math.max(minTop,maxTop),top));
 left=Math.max(minLeft,Math.min(Math.max(minLeft,maxLeft),left));
 cloud.style.top=top+'px';cloud.style.left=left+'px';
}
function closeConfirm(){document.querySelector('.ary139confirm')?.remove()}
function cancelConfirmed(){
 closeConfirm();
 const skip=document.querySelector('.ary125skip');
 if(skip){skip.click();return}
 try{localStorage.setItem('arydebts-guide-v125','done')}catch{}
 const lifecycle=window.aryGuideLifecycle128;
 try{const id=lifecycle?.currentUser?.();if(id)localStorage.setItem('arydebts-guide-user-v128:'+id,'done')}catch{}
 document.querySelectorAll('.ary125shade,.ary125focus,.ary125cloud,.ary125skip,.ary131transition,#aryGuideBlock127').forEach(n=>n.remove());
}
function askCancel(){
 if(document.querySelector('.ary139confirm'))return;
 const c=t(),node=document.createElement('div');node.className='ary139confirm';node.innerHTML=`<div class="ary139confirmCard" role="dialog" aria-modal="true"><h3>${c.title}</h3><p>${c.body}</p><div class="ary139confirmActions"><button type="button" class="ary139no">${c.no}</button><button type="button" class="ary139yes">${c.yes}</button></div></div>`;
 node.querySelector('.ary139no').onclick=closeConfirm;node.querySelector('.ary139yes').onclick=cancelConfirmed;document.body.appendChild(node);
}
function enrich(cloud){
 if(!cloud)return;
 if(!cloud.querySelector('.ary139cancel')&&!cloud.classList.contains('ary125final')){const b=document.createElement('button');b.type='button';b.className='ary139cancel';b.textContent=t().cancel;b.onclick=askCancel;cloud.appendChild(b)}
 requestAnimationFrame(()=>clampCloud(cloud));
}
function sync(){ensureStyle();document.querySelectorAll('.ary125cloud').forEach(enrich)}
const obs=new MutationObserver(()=>requestAnimationFrame(sync));obs.observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('resize',()=>requestAnimationFrame(sync));
window.visualViewport?.addEventListener('resize',()=>requestAnimationFrame(sync));
window.visualViewport?.addEventListener('scroll',()=>requestAnimationFrame(sync));
document.addEventListener('scroll',()=>requestAnimationFrame(sync),true);
window.aryGuideCancel139=askCancel;
ensureStyle();sync();
})();

// V140 — keep long-screen guide targets and controls in a safe viewport layout.
(()=>{
 if(document.getElementById('aryGuideSafeLayoutLoader140'))return;
 const script=document.createElement('script');
 script.id='aryGuideSafeLayoutLoader140';
 script.src='guide-safe-layout-v140.js?v=140.1';
 script.async=false;
 document.body.appendChild(script);
})();
