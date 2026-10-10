(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const COPY={
 es:{title:'Tu progreso hacia la libertad financiera',start:'Deuda inicial reconstruida',remaining:'Saldo restante',paid:'Has pagado',empty:'Tu progreso aparecerá cuando registres tu primer pago real.',open:'Ver progreso ›'},
 en:{title:'Your progress toward financial freedom',start:'Reconstructed starting debt',remaining:'Remaining balance',paid:'You have paid',empty:'Your progress will appear after you record your first real payment.',open:'View progress ›'},
 pt:{title:'Seu progresso rumo à liberdade financeira',start:'Dívida inicial reconstruída',remaining:'Saldo restante',paid:'Você pagou',empty:'Seu progresso aparecerá quando registrar o primeiro pagamento real.',open:'Ver progresso ›'}
};
const tx=()=>COPY[lang()];
function real(){
 try{
  if(typeof window.aryRealDebtProgress54==='function')return window.aryRealDebtProgress54();
 }catch{}
 const current=(s.debts||[]).reduce((sum,d)=>sum+(Number(d.balance)||0),0);
 const paid=(s.payments||[]).reduce((sum,p)=>sum+(Number(p.amount)||0),0);
 const start=current+paid;
 return{current,paid,start,pct:start>0&&paid>0?Math.max(0,Math.min(100,Math.round(paid/start*100))):null};
}
window.aryHomeProgress72=function(){
 const x=tx(),r=real(),hasDebt=(s.debts||[]).length>0;
 if(!hasDebt)return `<button type="button" class="card full heroCard homeTruth29 homeTap51" onclick="go('debts')"><b>${x.title}</b><div class="kpi">—</div><p class="muted">${x.remaining}: ${money(0)}</p><small>${x.open}</small></button>`;
 const ring=r.pct===null?`<div class="ring" style="--p:0"><b>—</b></div>`:`<div class="ring" style="--p:${r.pct}"><b>${r.pct}%</b></div>`;
 return `<button type="button" class="card full heroCard homeTruth29 homeTap51" onclick="go('progress')"><b>${x.title}</b><div class="progressBox">${ring}<div><span class="muted">${x.remaining}</span><div class="kpi">${money(r.current)}</div><span class="muted">${x.paid}</span><div class="kpi good">${money(r.paid)}</div></div></div>${r.pct===null?`<p class="muted">${x.empty}</p>`:`<small class="muted">${x.start}: ${money(r.start)}</small>`}<small>${x.open}</small></button>`;
};
try{localStorage.removeItem('ary-home-baseline-v29')}catch{}
if(typeof screen!=='undefined'&&screen==='home'&&typeof window.render==='function')requestAnimationFrame(()=>window.render());
window.aryHomeProgressIntegrity154={real};
})();
