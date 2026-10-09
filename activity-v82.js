(()=>{
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const valid=k=>typeof k==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(k)&&key(new Date(k+'T12:00:00'))===k;
const positive=v=>Math.max(0,Number(v)||0);
const copy=()=>({es:{late:'Vencido',today:'Hoy',pending:'Pendiente',reserve:'Reserva recurrente'},en:{late:'Overdue',today:'Today',pending:'Pending',reserve:'Recurring reserve'},pt:{late:'Vencido',today:'Hoje',pending:'Pendente',reserve:'Reserva recorrente'}}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
// Only use explicitly entered dates. Frequency alone never invents a due date.
window.aryHomeActivity82=(now=new Date(),limit=4)=>{
 const today=key(now),out=[];
 for(const d of s.debts||[]){
  if(!valid(d.due)||positive(d.balance)<=0)continue;
  const minimum=positive(d.min),paid=(s.payments||[]).filter(p=>String(p.debtId)===String(d.id)&&valid(p.date)&&p.date.slice(0,7)===d.due.slice(0,7)&&p.date<=today).reduce((n,p)=>n+positive(p.amount),0);
  if(minimum>0&&paid>=minimum)continue;
  out.push({source:'debt',id:d.id,date:d.due,name:d.name,amount:Math.min(positive(d.balance),Math.max(0,minimum-paid)),icon:d.icon||'💳'});
 }
 for(const e of s.calendarEvents||[]){
  if(!valid(e.date)||e.kind==='payment')continue;
  if(e.kind==='reminder'&&(window.aryReminderPending63?!aryReminderPending63(e):e.completed))continue;
  if(e.kind!=='reminder'&&e.date<today)continue;
  out.push({source:'event',id:e.id,date:e.date,name:e.name,amount:positive(e.amount),icon:e.icon||'📌'});
 }
 for(const e of s.expenses||[]){
  if(!window.aryRecurring63||!aryRecurring63(e)||!valid(e.date))continue;
  const recorded=(s.expenses||[]).filter(p=>!aryRecurring63(p)&&String(p.sourceExpenseId)===String(e.id)&&valid(p.date)&&p.date>=e.date&&p.date<=today).reduce((n,p)=>n+positive(p.amount),0);
  if(positive(e.amount)>0&&recorded>=positive(e.amount))continue;
  out.push({source:'expense',id:e.id,date:e.date,name:e.name,amount:Math.max(0,positive(e.amount)-recorded),icon:e.icon||iconFor(e.name,e.cat)});
 }
 return out.sort((a,b)=>a.date.localeCompare(b.date)||String(a.name||'').localeCompare(String(b.name||''))).slice(0,limit);
};
window.aryActivityDate82=date=>{const x=copy(),today=key(new Date()),label=new Intl.DateTimeFormat(s.locale||'es-US',{month:'short',day:'numeric',year:'numeric'}).format(new Date(date+'T12:00:00'));return (date<today?x.late+' · ':date===today?x.today+' · ':'')+label};
window.aryCalendarExpenses82=date=>(s.expenses||[]).filter(e=>window.aryRecurring63&&aryRecurring63(e)&&valid(e.date)&&e.date===date).map(e=>({type:'expense',id:e.id,name:e.name,amount:positive(e.amount),icon:e.icon||iconFor(e.name,e.cat),note:copy().reserve+' · '+aryFrequencyLabel63(e.frequency)}));
render();
})();
