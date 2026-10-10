(()=>{
'use strict';
const STYLE_ID='aryGuidePremiumStyle127',BLOCK_ID='aryGuideBlock127';
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const sectionNames={
 es:{home:'Inicio',income:'Ingresos',debts:'Deudas',expenses:'Gastos',ants:'Gastos hormiga',plan:'Plan',progress:'Progreso',calendar:'Calendario',more:'Más herramientas',analysis:'Análisis',buy:'Compras',goals:'Metas',notifications:'Notificaciones',profile:'Perfil',assistant:'Asistente'},
 en:{home:'Home',income:'Income',debts:'Debts',expenses:'Expenses',ants:'Small expenses',plan:'Plan',progress:'Progress',calendar:'Calendar',more:'More tools',analysis:'Analysis',buy:'Purchases',goals:'Goals',notifications:'Notifications',profile:'Profile',assistant:'Assistant'},
 pt:{home:'Início',income:'Renda',debts:'Dívidas',expenses:'Gastos',ants:'Pequenos gastos',plan:'Plano',progress:'Progresso',calendar:'Calendário',more:'Mais ferramentas',analysis:'Análise',buy:'Compras',goals:'Metas',notifications:'Notificações',profile:'Perfil',assistant:'Assistente'}
};
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const label=()=>sectionNames[lang()]?.[typeof screen==='string'?screen:'home']||sectionNames[lang()]?.home||'Arydebts';
function ensureStyle(){if(document.getElementById(STYLE_ID))return;const st=document.createElement('style');st.id=STYLE_ID;st.textContent=`
#aryGuideBlock127{display:none!important;pointer-events:none!important;touch-action:auto!important}
.ary125navShield{pointer-events:none!important}
.ary125focus{animation:aryGuidePulse127 2.2s ease-in-out infinite}
@keyframes aryGuidePulse127{0%,100%{box-shadow:0 0 0 5px rgba(89,221,255,.13),0 0 30px rgba(85,209,255,.46)}50%{box-shadow:0 0 0 8px rgba(89,221,255,.18),0 0 48px rgba(85,209,255,.78)}}
.ary125cloud,.ary126node.ary125cloud{padding-top:46px!important;overflow:auto!important}
.ary127section{position:absolute;left:16px;top:12px;display:inline-flex;align-items:center;gap:6px;max-width:calc(100% - 78px);padding:6px 10px;border-radius:999px;background:rgba(91,211,255,.12);border:1px solid rgba(109,222,255,.26);color:#bfefff;font-size:10px;font-weight:850;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ary127section:before{content:'✦';font-size:10px}.ary-light .ary127section{background:#e8f8ff;color:#235b74;border-color:#b9e7f1}
.ary127countdown{height:3px;margin:10px 0 3px;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.08)}.ary127countdown i{display:block;height:100%;width:100%;transform-origin:left center;background:linear-gradient(90deg,#3ce0c5,#55cfff,#8a6cff);animation:aryGuideCountdown127 5.2s linear forwards}
@keyframes aryGuideCountdown127{from{transform:scaleX(1)}to{transform:scaleX(0)}}
.ary127hint{margin-top:7px;text-align:center;color:#7f97b7;font-size:10px}.ary-light .ary127hint{color:#71849b}
.ary125cloud button:focus-visible,.ary125skip:focus-visible{outline:3px solid #65dcff!important;outline-offset:3px!important}
body:has(#modal:not(.hidden)) .ary125shade,body:has(#modal:not(.hidden)) .ary125focus,body:has(#modal:not(.hidden)) .ary125navShield,body:has(#modal:not(.hidden)) .ary125cloud,body:has(#modal:not(.hidden)) .ary125skip,body:has(#modal:not(.hidden)) .ary140cancelTop{visibility:hidden!important;pointer-events:none!important}
@media(max-width:820px),(pointer:coarse){.ary125focus{animation:none!important}.ary125cloud,.ary126node.ary125cloud{padding-top:43px!important}.ary127section{left:14px;top:10px}.ary127hint,.ary127countdown{display:none!important}}
@media(prefers-reduced-motion:reduce){.ary125focus{animation:none!important}.ary125shade,.ary125focus,.ary125cloud{transition:none!important}.ary127countdown i{animation:none!important}}
`;document.head.appendChild(st)}
function activeGuide(){const st=window.aryFullGuideStatus125?.();return !!st?.active||!!document.querySelector('.ary126node.ary125cloud')}
function syncBlock(){document.getElementById(BLOCK_ID)?.remove()}
function enrichCloud(cloud){if(!cloud||cloud.dataset.aryPremium127==='1')return;cloud.dataset.aryPremium127='1';cloud.setAttribute('aria-modal','true');cloud.setAttribute('aria-label',label());const chip=document.createElement('div');chip.className='ary127section';chip.textContent=label();cloud.prepend(chip);const actions=cloud.querySelector('.ary125actions');const status=window.aryFullGuideStatus125?.();if(!mobile()&&actions&&status?.automatic&&!cloud.classList.contains('ary125final')){const cd=document.createElement('div');cd.className='ary127countdown';cd.innerHTML='<i></i>';actions.before(cd)}if(!mobile()){const hint=document.createElement('div');hint.className='ary127hint';hint.textContent=lang()==='en'?'← → navigate · Space pauses':lang()==='pt'?'← → navegar · Espaço pausa':'← → navegar · Espacio pausa';cloud.appendChild(hint)}requestAnimationFrame(()=>{const first=cloud.querySelector('button:not([disabled])');if(first&&document.activeElement===document.body)first.focus({preventScroll:true})})}
function sync(){ensureStyle();syncBlock();document.querySelectorAll('.ary125cloud').forEach(enrichCloud)}
const observer=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary126node,#aryGuideBlock127')||n.querySelector?.('.ary125cloud,.ary126node')))))requestAnimationFrame(sync)});
observer.observe(document.body||document.documentElement,{subtree:false,childList:true});
window.addEventListener('keydown',e=>{if(!activeGuide())return;if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();window.aryFullGuideNext125?.()}else if(e.key==='ArrowLeft'){e.preventDefault();window.aryFullGuideBack125?.()}else if(e.code==='Space'){e.preventDefault();window.aryFullGuideToggleAuto125?.()}});
window.addEventListener('resize',()=>requestAnimationFrame(sync),{passive:true});
ensureStyle();sync();
})();
