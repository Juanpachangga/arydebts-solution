(()=>{
'use strict';
const STYLE='aryGuideMobileControlsStyle139';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const text={
 es:{title:'¿Cancelar la guía?',body:'Puedes cerrar el recorrido y usar Arydebts normalmente. La guía no volverá a aparecer automáticamente.',yes:'Sí, cancelar',no:'Seguir con la guía'},
 en:{title:'Cancel the guide?',body:'You can close the tour and use Arydebts normally. The guide will not appear automatically again.',yes:'Yes, cancel',no:'Keep the guide'},
 pt:{title:'Cancelar o guia?',body:'Você pode fechar o tour e usar o Arydebts normalmente. O guia não aparecerá automaticamente novamente.',yes:'Sim, cancelar',no:'Continuar guia'}
};
const t=()=>text[lang()]||text.es;
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - 24px)!important;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain!important;box-sizing:border-box}
.ary125cloud .ary125actions{position:sticky;bottom:-1px;z-index:4;margin-top:10px;padding:10px 0 2px;background:linear-gradient(180deg,rgba(20,29,61,0),rgba(20,29,61,.97) 28%,rgba(20,29,61,.99))}
.ary-light .ary125cloud .ary125actions{background:linear-gradient(180deg,rgba(255,255,255,0),rgba(248,252,255,.97) 28%,rgba(248,252,255,.99))}
/* One exit only: V140 supplies the visible top Cancel button. Keep V125 skip in the DOM for its safe finish(false) handler, but never show it. */
.ary125skip{display:none!important}
.ary139confirm{position:fixed;inset:0;z-index:10040;display:grid;place-items:center;padding:18px;background:rgba(2,7,20,.82)}
.ary139confirmCard{width:min(370px,calc(100vw - 30px));padding:20px;border-radius:22px;border:1px solid rgba(105,218,255,.35);background:#172541;color:#f4f9ff;box-shadow:0 18px 52px rgba(0,0,0,.45);text-align:center}
.ary139confirmCard h3{margin:0 0 8px}.ary139confirmCard p{margin:0 0 16px;color:#b8cae1;font-size:13px;line-height:1.45}.ary139confirmActions{display:grid;gap:8px}.ary139confirmActions button{min-height:44px;border-radius:14px;font-weight:850}.ary139yes{border:1px solid rgba(255,129,150,.4);background:rgba(255,86,119,.15);color:#ffd8df}.ary139no{border:0;background:#58d6df;color:#071223}.ary-light .ary139confirm{background:rgba(236,244,252,.9)}.ary-light .ary139confirmCard{background:#fff;color:#19334e;border-color:#bfe4ed}.ary-light .ary139confirmCard p{color:#657d94}
@media(max-width:820px),(pointer:coarse){.ary125cloud,.ary126node.ary125cloud{width:calc(100vw - 16px)!important;max-height:calc(100dvh - 16px)!important;border-radius:18px!important}.ary125cloud .ary125actions{padding-bottom:max(4px,env(safe-area-inset-bottom));backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.ary139confirmCard{box-shadow:0 12px 28px rgba(0,0,0,.28)}}
`;
 document.head.appendChild(st);
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
window.aryGuideCancel139=askCancel;
ensureStyle();
})();

// V140 — keep long-screen guide targets and controls in a safe viewport layout.
(()=>{
 if(document.getElementById('aryGuideSafeLayoutLoader140'))return;
 const script=document.createElement('script');
 script.id='aryGuideSafeLayoutLoader140';
 script.src='guide-safe-layout-v140.js?v=140.3';
 script.async=false;
 document.body.appendChild(script);
})();
