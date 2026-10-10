(()=>{
'use strict';
const STYLE='aryGuideSectionTransitionStyle131';
let hiding=0;
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const names={
 es:{home:'Inicio',income:'Ingresos',debts:'Deudas',expenses:'Gastos',ants:'Gastos hormiga',plan:'Tu plan',progress:'Progreso',calendar:'Calendario',more:'Más herramientas',analysis:'Análisis',buy:'Compras',goals:'Metas',notifications:'Notificaciones',profile:'Perfil',assistant:'Asistente'},
 en:{home:'Home',income:'Income',debts:'Debts',expenses:'Expenses',ants:'Small expenses',plan:'Your plan',progress:'Progress',calendar:'Calendar',more:'More tools',analysis:'Analysis',buy:'Purchases',goals:'Goals',notifications:'Notifications',profile:'Profile',assistant:'Assistant'},
 pt:{home:'Início',income:'Renda',debts:'Dívidas',expenses:'Gastos',ants:'Pequenos gastos',plan:'Seu plano',progress:'Progresso',calendar:'Calendário',more:'Mais ferramentas',analysis:'Análise',buy:'Compras',goals:'Metas',notifications:'Notificações',profile:'Perfil',assistant:'Assistente'}
};
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary131transition{position:fixed;inset:0;z-index:10020;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 45%,rgba(45,99,160,.3),rgba(3,8,22,.92) 58%);backdrop-filter:blur(7px);pointer-events:auto;animation:ary131in .18s ease both}
.ary131transitionCard{min-width:min(360px,calc(100vw - 36px));max-width:440px;padding:22px 24px;border-radius:28px;text-align:center;border:1px solid rgba(113,222,255,.34);background:linear-gradient(145deg,rgba(14,30,59,.96),rgba(35,24,76,.96));box-shadow:0 28px 90px rgba(0,0,0,.5),0 0 38px rgba(73,190,255,.15);color:#f3f9ff}
.ary131orb{width:54px;height:54px;margin:0 auto 12px;border-radius:50%;display:grid;place-items:center;font-size:26px;background:linear-gradient(135deg,#31dbc1,#52c6ff,#7d62ff);box-shadow:0 0 0 8px rgba(95,218,255,.08),0 12px 30px rgba(56,127,255,.25);animation:ary131float 1.1s ease-in-out infinite alternate}
.ary131transition small{display:block;margin-bottom:5px;color:#91abc8;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ary131transition strong{font-size:21px}.ary131transition p{margin:8px 0 0;color:#b8cae0;font-size:12px}.ary131transition.out{animation:ary131out .22s ease forwards}
.ary-light .ary131transition{background:radial-gradient(circle at 50% 45%,rgba(147,218,244,.44),rgba(240,246,255,.94) 60%)}.ary-light .ary131transitionCard{background:linear-gradient(145deg,#fff,#eef5ff);color:#17304d;border-color:#b8e4ee;box-shadow:0 24px 70px rgba(45,74,112,.22)}.ary-light .ary131transition p{color:#667b92}.ary-light .ary131transition small{color:#66859e}
@keyframes ary131in{from{opacity:0}to{opacity:1}}@keyframes ary131out{to{opacity:0;transform:scale(1.015)}}@keyframes ary131float{from{transform:translateY(-2px)}to{transform:translateY(3px)}}
@media(max-width:560px){.ary131transitionCard{padding:19px;border-radius:24px}.ary131transition strong{font-size:18px}.ary131orb{width:48px;height:48px;font-size:23px}}
@media(prefers-reduced-motion:reduce){.ary131transition,.ary131transition.out,.ary131orb{animation:none!important}}
`;document.head.appendChild(st)}
function guideActive(){const st=window.aryFullGuideStatus125?.();return !!st?.active||!!document.querySelector('.ary126node.ary125cloud')}
function removeNow(){clearTimeout(hiding);document.querySelector('.ary131transition')?.remove()}
function show(route){
 ensureStyle();removeNow();
 const l=lang(),title=names[l]?.[route]||route||'Arydebts';
 const lead=l==='en'?'Now let’s go to':l==='pt'?'Agora vamos para':'Ahora vamos a';
 const sub=l==='en'?'I’ll show you what matters here.':l==='pt'?'Vou mostrar o que é importante aqui.':'Te mostraré rápidamente lo importante de esta sección.';
 const node=document.createElement('div');node.className='ary131transition';node.setAttribute('aria-live','polite');node.innerHTML=`<div class="ary131transitionCard"><div class="ary131orb">✦</div><small>${lead}</small><strong>${title} →</strong><p>${sub}</p></div>`;document.body.appendChild(node);
 hiding=setTimeout(()=>{node.classList.add('out');setTimeout(()=>node.remove(),220)},560);
}
const baseGo=window.go;
if(typeof baseGo==='function'&&!baseGo._aryTransition131){
 const wrapped=function(route){
   const changing=guideActive()&&typeof route==='string'&&typeof screen==='string'&&route!==screen;
   if(changing)show(route);
   return baseGo.apply(this,arguments);
 };
 wrapped._aryTransition131=true;window.go=wrapped;
}
window.aryGuideTransition131={show,clear:removeNow};
ensureStyle();
})();
