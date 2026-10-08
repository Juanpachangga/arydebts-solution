(()=>{
const tx=()=>({es:{title:'Tus fechas por atender',sub:'Vencimientos y recordatorios que registraste. Los próximos siete días y las fechas vencidas aparecen junto a Arydebts.',today:'Hoy',tomorrow:'Mañana',late:'Vencido',days:n=>`En ${n} días`,calendar:'Ver en calendario',done:'Marcar realizado',undo:'Volver a pendiente',close:'Cerrar',note:'Marcar un recordatorio como realizado no registra un pago ni modifica tus saldos.',empty:'No hay fechas pendientes en este periodo.',car:'Carro',power:'Luz',home:'Casa',other:'Otros',more:'Más fechas'},en:{title:'Dates to take care of',sub:'Due dates and reminders you recorded. The next seven days and overdue dates appear next to Arydebts.',today:'Today',tomorrow:'Tomorrow',late:'Overdue',days:n=>`In ${n} days`,calendar:'View in calendar',done:'Mark done',undo:'Mark pending',close:'Close',note:'Marking a reminder done does not record a payment or change your balances.',empty:'There are no pending dates in this period.',car:'Car',power:'Electricity',home:'Home',other:'Other',more:'More dates'},pt:{title:'Datas para cuidar',sub:'Vencimentos e lembretes que você registrou. Os próximos sete dias e as datas vencidas aparecem ao lado do Arydebts.',today:'Hoje',tomorrow:'Amanhã',late:'Vencido',days:n=>`Em ${n} dias`,calendar:'Ver no calendário',done:'Marcar realizado',undo:'Marcar pendente',close:'Fechar',note:'Marcar um lembrete como realizado não registra um pagamento nem altera seus saldos.',empty:'Não há datas pendentes neste período.',car:'Carro',power:'Luz',home:'Casa',other:'Outros',more:'Mais datas'}}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
const dateNumber=k=>{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(String(k)))return null;
 const [y,m,d]=k.split('-').map(Number),date=new Date(y,m-1,d);
 if(date.getFullYear()!==y||date.getMonth()!==m-1||date.getDate()!==d)return null;
 return Date.UTC(y,m-1,d)/86400000;
};
const localKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
window.aryReminderKind60=(name='',icon='')=>{
 const text=String(name).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(/\b(luz|electricity|electric|electricidade|eletricidade|energia|power|electrica|eletrica)\b/.test(text)||icon==='⚡')return 'power';
 if(/\b(carro|car|auto|automovil|vehicle|vehiculo|veiculo)\b/.test(text)||['🚗','🔑'].includes(icon))return 'car';
 if(/\b(casa|renta|alquiler|aluguel|rent|mortgage|hipoteca|housing|house|home)\b/.test(text)||icon==='🏠')return 'home';
 return 'other';
};
const icons={car:'🔑',power:'⚡',home:'🏠',other:'📅'};
window.aryDueReminders60=(now=new Date())=>{
 const today=localKey(now),day=dateNumber(today),out=[];
 const add=(item,date)=>{const n=dateNumber(date);if(n===null||n-day>7)return;out.push({...item,date,days:n-day,kind:aryReminderKind60(item.name,item.icon)})};
 for(const d of s.debts||[]){
  if(!(Number(d.balance)>0)||dateNumber(d.due)===null)continue;
  const minimum=Math.max(0,Number(d.min)||0),paid=(s.payments||[]).filter(p=>Number(p.debtId)===Number(d.id)&&String(p.date||'').slice(0,7)===d.due.slice(0,7)&&dateNumber(p.date)!==null&&p.date<=today).reduce((sum,p)=>sum+Math.max(0,Number(p.amount)||0),0);
  if(minimum>0&&paid>=minimum)continue;
  add({source:'debt',id:d.id,name:d.name||'',icon:d.icon||'',amount:Math.max(0,minimum-paid)},d.due);
 }
 for(const e of s.calendarEvents||[]){if(e.kind!=='reminder'||e.completed)continue;add({source:'event',id:e.id,name:e.name||'',icon:e.icon||'',amount:Number(e.amount)||0},e.date)}
 return out.sort((a,b)=>a.days-b.days||String(a.name).localeCompare(String(b.name)));
};
const when=(item,x)=>item.days<0?x.late:item.days===0?x.today:item.days===1?x.tomorrow:x.days(item.days);
window.aryDueHeader60=()=>{
 const list=aryDueReminders60();if(!list.length)return '';
 const x=tx(),groups=[...new Set(list.map(e=>e.kind))],shown=groups.slice(0,3);
 return `<div class="dueBadges60" role="group" aria-label="${x.title}">${shown.map(kind=>{const first=list.find(e=>e.kind===kind),label=`${x[kind]} · ${when(first,x)}`;return `<button type="button" class="dueBadge60 ${first.days<0?'overdue60':first.days===0?'today60':''}" aria-label="${label}" title="${label}" onclick="aryShowDue60('${kind}')"><span aria-hidden="true">${icons[kind]}</span><small>${when(first,x)}</small></button>`}).join('')}${groups.length>3?`<button type="button" class="dueBadge60" aria-label="${x.more}" onclick="aryShowDue60()">+${groups.length-3}</button>`:''}</div>`;
};
window.aryShowDue60=kind=>{
 const x=tx(),list=aryDueReminders60().filter(e=>!kind||e.kind===kind);
 modal(`<h2>${x.title}</h2><p class="muted">${x.sub}</p><div class="dueList60">${list.map(e=>`<section class="dueItem60"><span class="dueIcon60" aria-hidden="true">${icons[e.kind]}</span><div><strong>${userText(e.name)}</strong><p class="muted">${when(e,x)} · ${new Intl.DateTimeFormat(s.locale,{month:'short',day:'numeric',year:'numeric'}).format(new Date(e.date+'T12:00:00'))}</p><button type="button" class="btn tiny" onclick="aryCalendarDate60('${e.date}')">${x.calendar}</button>${e.source==='event'&&Number.isFinite(Number(e.id))?`<button type="button" class="btn tiny" onclick="aryCompleteReminder60(${Number(e.id)},true)">${x.done}</button>`:''}</div></section>`).join('')||`<p class="muted">${x.empty}</p>`}</div><p class="muted dueNote60">${x.note}</p><button type="button" class="btn widebtn" onclick="closeM()">${x.close}</button>`);
};
window.aryCompleteReminder60=(id,completed)=>{
 const event=(s.calendarEvents||[]).find(e=>Number(e.id)===Number(id)&&e.kind==='reminder');if(!event)return;
 event.completed=!!completed;closeM();save();
};
window.aryReminderAction60=e=>e.kind==='reminder'?`<button type="button" class="btn tiny" onclick="aryCompleteReminder60(${Number(e.id)},${!e.completed})">${e.completed?tx().undo:tx().done}</button>`:'';
const brand=window.aryBrand59;window.aryBrand59=()=>brand()+aryDueHeader60();
render();
})();
