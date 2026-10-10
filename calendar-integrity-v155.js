(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{invalidDate:'Escribe una fecha válida.',invalidEvent:'Revisa el nombre, la fecha y el monto del movimiento.',saveError:'No se pudo guardar. Tus datos siguen como antes.',deleteConfirm:'¿Eliminar este movimiento del calendario?',paymentLedger:'Los pagos de deuda se editan desde Tu progreso para mantener el saldo y el historial sincronizados.'},
 en:{invalidDate:'Enter a valid date.',invalidEvent:'Check the event name, date and amount.',saveError:'Could not save. Your data remains unchanged.',deleteConfirm:'Delete this calendar event?',paymentLedger:'Debt payments are edited from Your progress so the balance and history stay synchronized.'},
 pt:{invalidDate:'Digite uma data válida.',invalidEvent:'Revise o nome, a data e o valor do movimento.',saveError:'Não foi possível salvar. Seus dados continuam como antes.',deleteConfirm:'Excluir este movimento do calendário?',paymentLedger:'Pagamentos de dívida são editados em Seu progresso para manter saldo e histórico sincronizados.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
function validDate(value){
 const v=String(value||'');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
 const [y,m,d]=v.split('-').map(Number),date=new Date(y,m-1,d);
 return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d;
}
window.aryValidCalendarDate155=validDate;
const nextId=()=>typeof window.aryUniqueId120==='function'?aryUniqueId120(s.debts||[],s.expenses||[],s.payments||[],s.calendarEvents||[]):Date.now();

const previousCalendarDate=window.aryCalendarDate60;
window.aryCalendarDate60=function(value){
 const date=String(value||'');
 if(!validDate(date))return false;
 return typeof previousCalendarDate==='function'?previousCalendarDate.call(this,date):false;
};

window.arySaveDue35=function(value){
 const date=String(value||'');
 if(!validDate(date)){if(typeof toast==='function')toast(t().invalidDate);return false;}
 const id=Number(document.getElementById('calDebt35')?.value);
 if(!Number.isFinite(id)||(s.debts||[]).every(d=>Number(d.id)!==id))return false;
 if(!commit(next=>{const debt=(next.debts||[]).find(d=>Number(d.id)===id);if(!debt)throw new Error('missing_debt');debt.due=date;})){
   if(typeof toast==='function')toast(t().saveError);return false;
 }
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const kind=String(document.getElementById('cevType36')?.value||'reminder');
 if(kind==='payment')return typeof previousSaveEvent==='function'?previousSaveEvent.apply(this,arguments):false;
 const date=String(document.getElementById('cevDate36')?.value||'');
 const name=String(document.getElementById('cevName36')?.value||'').trim();
 const raw=String(document.getElementById('cevAmount36')?.value||'').trim();
 const amount=raw===''?0:parseAmount(raw);
 const note=String(document.getElementById('cevNote36')?.value||'').trim();
 const frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidEvent);return false;}
 const editing=id!==null&&id!==undefined;
 const eventId=editing?id:nextId();
 const icon=kind==='income'?'🟢':'🔔';
 if(editing&&!(s.calendarEvents||[]).some(e=>String(e.id)===String(id)))return false;
 if(!commit(next=>{
   if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];
   let event=editing?next.calendarEvents.find(e=>String(e.id)===String(id)):null;
   if(!event){event={id:eventId};next.calendarEvents.push(event);}
   Object.assign(event,{date:date||'',name,amount,kind,note,icon,frequency});
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(date&&typeof window.aryCalendarDate60==='function')window.aryCalendarDate60(date);
 else if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious155=previousSaveEvent;

window.aryDeleteEvent36=function(id){
 const event=(s.calendarEvents||[]).find(e=>String(e.id)===String(id));
 if(!event)return false;
 if(event.kind==='payment'){if(typeof toast==='function')toast(t().paymentLedger);return false;}
 if(!confirm(t().deleteConfirm))return false;
 if(!commit(next=>{next.calendarEvents=(next.calendarEvents||[]).filter(e=>String(e.id)!==String(id));})){
   if(typeof toast==='function')toast(t().saveError);return false;
 }
 if(typeof render==='function')render();
 return true;
};
window.aryCalendarIntegrity155={validDate};
})();
