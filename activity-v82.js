(()=>{
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const valid=k=>typeof k==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(k)&&key(new Date(k+'T12:00:00'))===k;
const positive=v=>Math.max(0,Number(v)||0);
const copy=()=>({es:{late:'Vencido',today:'Hoy',pending:'Pendiente',reserve:'Reserva recurrente'},en:{late:'Overdue',today:'Today',pending:'Pending',reserve:'Recurring reserve'},pt:{late:'Vencido',today:'Hoje',pending:'Pendente',reserve:'Reserva recorrente'}}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
let dateFmtLocale='',dateFmt=null;
const formatter=()=>{const loc=s.locale||'es-US';if(!dateFmt||dateFmtLocale!==loc){dateFmtLocale=loc;dateFmt=new Intl.DateTimeFormat(loc,{month:'short',day:'numeric',year:'numeric'})}return dateFmt};
// Only use explicitly entered dates. Frequency alone never invents a due date.
window.aryHomeActivity82=(now=new Date(),limit=4)=>{
 const today=key(now),out=[],paymentsByDebtMonth=new Map(),recordedBySource=new Map();
 for(const p of s.payments||[]){
  if(!valid(p?.date)||p.date>today)continue;
  const k=String(p.debtId)+'|'+p.date.slice(0,7);
  paymentsByDebtMonth.set(k,(paymentsByDebtMonth.get(k)||0)+positive(p.amount));
 }
 const recurring=window.aryRecurring63;
 if(recurring){
  for(const p of s.expenses||[]){
   if(recurring(p)||!p?.sourceExpenseId||!valid(p.date)||p.date>today)continue;
   const id=String(p.sourceExpenseId),list=recordedBySource.get(id)||[];
   list.push(p);recordedBySource.set(id,list);
  }
 }
 for(const d of s.debts||[]){
  if(!valid(d.due)||positive(d.balance)<=0)continue;
  const minimum=positive(d.min),paid=paymentsByDebtMonth.get(String(d.id)+'|'+d.due.slice(0,7))||0;
  if(minimum>0&&paid>=minimum)continue;
  out.push({source:'debt',id:d.id,date:d.due,name:d.name,amount:Math.min(positive(d.balance),Math.max(0,minimum-paid)),icon:iconFor(d.name,'deuda')});
 }
 for(const e of s.calendarEvents||[]){
  if(!valid(e.date)||e.kind==='payment')continue;
  if(e.kind==='reminder'&&(window.aryReminderPending63?!aryReminderPending63(e):e.completed))continue;
  if(e.kind!=='reminder'&&e.date<today)continue;
  out.push({source:'event',id:e.id,date:e.date,name:e.name,amount:positive(e.amount),icon:e.icon||'📌'});
 }
 if(recurring){
  for(const e of s.expenses||[]){
   if(!recurring(e)||!valid(e.date))continue;
   let recorded=0;
   for(const p of recordedBySource.get(String(e.id))||[])if(p.date>=e.date)recorded+=positive(p.amount);
   if(positive(e.amount)>0&&recorded>=positive(e.amount))continue;
   out.push({source:'expense',id:e.id,date:e.date,name:e.name,amount:Math.max(0,positive(e.amount)-recorded),icon:iconFor(e.name,e.cat)});
  }
 }
 return out.sort((a,b)=>a.date.localeCompare(b.date)||String(a.name||'').localeCompare(String(b.name||''))).slice(0,limit);
};
window.aryActivityDate82=date=>{const x=copy(),today=key(new Date()),label=formatter().format(new Date(date+'T12:00:00'));return (date<today?x.late+' · ':date===today?x.today+' · ':'')+label};
window.aryCalendarExpenses82=date=>(s.expenses||[]).filter(e=>window.aryRecurring63&&aryRecurring63(e)&&valid(e.date)&&e.date===date).map(e=>({type:'expense',id:e.id,name:e.name,amount:positive(e.amount),icon:iconFor(e.name,e.cat),note:copy().reserve+' · '+aryFrequencyLabel63(e.frequency)}));
render();
})();
