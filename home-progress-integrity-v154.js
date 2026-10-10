(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const COPY={
 es:{title:'Tu progreso hacia la libertad financiera',start:'Deuda inicial reconstruida',remaining:'Saldo restante',paid:'Has pagado',empty:'Registra una deuda o un pago para empezar a mover este progreso.',open:'Ver progreso ›'},
 en:{title:'Your progress toward financial freedom',start:'Reconstructed starting debt',remaining:'Remaining balance',paid:'You have paid',empty:'Add a debt or payment to start moving this progress.',open:'View progress ›'},
 pt:{title:'Seu progresso rumo à liberdade financeira',start:'Dívida inicial reconstruída',remaining:'Saldo restante',paid:'Você pagou',empty:'Adicione uma dívida ou pagamento para começar a mover este progresso.',open:'Ver progresso ›'}
};
const tx=()=>COPY[lang()];
function real(){
 try{
  if(typeof window.aryRealDebtProgress54==='function')return window.aryRealDebtProgress54();
 }catch{}
 const current=(s.debts||[]).reduce((sum,d)=>sum+(Number(d.balance)||0),0);
 const paid=(s.payments||[]).reduce((sum,p)=>sum+(Number(p.amount)||0),0);
 const start=current+paid;
 return{current,paid,start,pct:start>0?Math.max(0,Math.min(100,Math.round(paid/start*100))):0};
}
window.aryHomeProgress72=function(){
 const x=tx(),r=real();
 const current=Number(r?.current)||0,paid=Number(r?.paid)||0,start=Number(r?.start)||current+paid;
 const rawPct=Number(r?.pct),pct=Number.isFinite(rawPct)?Math.max(0,Math.min(100,Math.round(rawPct))):(start>0?Math.max(0,Math.min(100,Math.round(paid/start*100))):0);
 const hasDebt=(s.debts||[]).length>0;
 const dest=hasDebt?'progress':'debts';
 return `<button type="button" class="card full heroCard homeTruth29 homeTap51" onclick="go('${dest}')"><b>${x.title}</b><div class="progressBox"><div class="ring" style="--p:${pct}"><b>${pct}%</b></div><div><span class="muted">${x.remaining}</span><div class="kpi">${money(current)}</div><span class="muted">${x.paid}</span><div class="kpi good">${money(paid)}</div></div></div>${start>0?`<small class="muted">${x.start}: ${money(start)}</small>`:`<p class="muted">${x.empty}</p>`}<small>${x.open}</small></button>`;
};
try{localStorage.removeItem('ary-home-baseline-v29')}catch{}
if(typeof screen!=='undefined'&&screen==='home'&&typeof window.render==='function')requestAnimationFrame(()=>window.render());
window.aryHomeProgressIntegrity154={real};
})();
