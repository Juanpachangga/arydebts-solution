(()=>{
'use strict';
const STYLE='aryFastUxStyle133',FAB='aryQuickFab133';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{label:'Acciones rápidas',expense:'Gasto',debt:'Deuda',income:'Ingreso',payment:'Pago',title:'¿Qué quieres registrar?',close:'Cerrar'},
 en:{label:'Quick actions',expense:'Expense',debt:'Debt',income:'Income',payment:'Payment',title:'What do you want to add?',close:'Close'},
 pt:{label:'Ações rápidas',expense:'Gasto',debt:'Dívida',income:'Renda',payment:'Pagamento',title:'O que deseja registrar?',close:'Fechar'}
};
const t=()=>copy[lang()]||copy.es;
function guideActive(){return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary125cloud,.ary126node')}
function usable(){return !!profile&&!!s?.onboarded&&!['welcome','signup','login','intro','setupIncome','setupExpenses','setupDebts','setupGoal'].includes(String(screen||''))&&!guideActive()}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
html{scroll-behavior:auto}button,.btn,[role="button"],a,input,select{touch-action:manipulation}.btn,button{-webkit-tap-highlight-color:transparent}
#aryQuickFab133{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:calc(82px + env(safe-area-inset-bottom));z-index:9300;width:54px;height:54px;border:0;border-radius:18px;display:grid;place-items:center;font-size:28px;line-height:1;color:#fff;background:linear-gradient(135deg,#29d7bd,#46c5ff,#7863ff);box-shadow:0 14px 34px rgba(20,63,125,.32),0 0 0 1px rgba(255,255,255,.14);cursor:pointer;transition:transform .12s ease,box-shadow .12s ease}#aryQuickFab133:active{transform:scale(.94);box-shadow:0 7px 18px rgba(20,63,125,.26)}
.ary133quickGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:12px 0}.ary133quickGrid button{min-height:74px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border-radius:18px}.ary133quickGrid .ary133ico{font-size:24px}.ary133quickGrid b{font-size:12px}
@media(min-width:900px){#aryQuickFab133{right:28px;bottom:28px;width:58px;height:58px}}@media(max-width:560px){#aryQuickFab133{right:14px;bottom:calc(76px + env(safe-area-inset-bottom));width:52px;height:52px;border-radius:17px}.ary133quickGrid button{min-height:68px}}
@media(prefers-reduced-motion:reduce){#aryQuickFab133{transition:none}}
`;document.head.appendChild(st)}
function quickSheet(){
 const x=t();
 if(typeof modal!=='function')return;
 modal(`<section data-ary-copy><h2>⚡ ${x.title}</h2><div class="ary133quickGrid"><button class="btn" onclick="aryQuickAction133('expense')"><span class="ary133ico">🌸</span><b>${x.expense}</b></button><button class="btn" onclick="aryQuickAction133('debt')"><span class="ary133ico">💳</span><b>${x.debt}</b></button><button class="btn" onclick="aryQuickAction133('income')"><span class="ary133ico">💰</span><b>${x.income}</b></button><button class="btn" onclick="aryQuickAction133('payment')"><span class="ary133ico">✓</span><b>${x.payment}</b></button></div><button class="btn widebtn" onclick="closeM()">${x.close}</button></section>`)
}
window.aryQuickAction133=function(type){
 try{if(typeof closeM==='function')closeM()}catch{}
 requestAnimationFrame(()=>{
  if(type==='expense'&&typeof expenseForm==='function')return expenseForm();
  if(type==='debt'&&typeof debtForm==='function')return debtForm();
  if(type==='income'&&typeof incomeForm==='function')return incomeForm();
  if(type==='payment'&&typeof go==='function')return go('progress');
 });
};
function syncFab(){
 ensureStyle();let fab=document.getElementById(FAB);
 if(!usable()){fab?.remove();return}
 if(fab){fab.setAttribute('aria-label',t().label);fab.title=t().label;return}
 fab=document.createElement('button');fab.id=FAB;fab.type='button';fab.textContent='+';fab.setAttribute('aria-label',t().label);fab.title=t().label;fab.onclick=quickSheet;document.body.appendChild(fab);
}
function hook(name,after,before){const fn=window[name];if(typeof fn!=='function'||fn._aryFast133)return;const wrapped=function(){if(before)before();const out=fn.apply(this,arguments);if(after)requestAnimationFrame(after);return out};wrapped._aryFast133=true;window[name]=wrapped}
// Update only on actual app lifecycle events instead of watching the entire DOM.
hook('render',syncFab);
hook('aryStartFullGuide125',null,()=>document.getElementById(FAB)?.remove());
hook('aryFullGuideFinish125',syncFab);
hook('logout',syncFab);
hook('localAuth',syncFab);
window.addEventListener('hashchange',()=>requestAnimationFrame(syncFab));
document.addEventListener('click',e=>{if(e.target?.closest?.('.ary125skip'))setTimeout(syncFab,80)},{capture:true});
// Escape safely dismisses an open sheet/modal on desktop.
window.addEventListener('keydown',e=>{if(e.key!=='Escape'||guideActive())return;const m=document.getElementById('modal');if(m&&!m.classList.contains('hidden')&&typeof closeM==='function'){e.preventDefault();closeM()}});
ensureStyle();syncFab();
})();

// V134 — make financial forms faster to fill without changing their save logic.
(()=>{
 if(document.getElementById('aryFastFormsLoader134'))return;
 const script=document.createElement('script');
 script.id='aryFastFormsLoader134';
 script.src='fast-forms-v134.js?v=134.1';
 script.async=false;
 document.body.appendChild(script);
})();
