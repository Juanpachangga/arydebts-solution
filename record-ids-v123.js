(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',invalidDebt:'Escribe valores válidos para la deuda.',invalidEvent:'Revisa el nombre, fecha y monto del movimiento.'},
 en:{saveError:'Could not save. Your data remains unchanged.',invalidDebt:'Enter valid debt values.',invalidEvent:'Check the event name, date and amount.'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',invalidDebt:'Digite valores válidos para a dívida.',invalidEvent:'Revise o nome, a data e o valor do movimento.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const nextId=()=>typeof window.aryUniqueId120==='function'?aryUniqueId120(s.debts||[],s.expenses||[],s.payments||[],s.calendarEvents||[]):Date.now();
const validDate=value=>typeof window.aryValidDate63==='function'?window.aryValidDate63(value):/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));

window.saveDebt=function(id,frequency='monthly'){
 const name=String(document.getElementById('n')?.value||'').trim();
 const rawBalance=String(document.getElementById('b')?.value??'').trim();
 const rawMin=String(document.getElementById('m')?.value??'').trim();
 const rawApr=String(document.getElementById('a')?.value??'').trim();
 const balance=parseAmount(rawBalance),min=rawMin===''?0:parseAmount(rawMin),apr=rawApr===''?0:parseAmount(rawApr);
 const due=String(document.getElementById('due')?.value||''),note=String(document.getElementById('note')?.value||'').trim();
 const editing=id!==null&&id!==undefined;
 if(!name||rawBalance===''||!Number.isFinite(balance)||balance<0||!Number.isFinite(min)||min<0||!Number.isFinite(apr)||apr<0){if(typeof toast==='function')toast(t().invalidDebt);return false;}
 if(editing&&!(s.debts||[]).some(d=>String(d.id)===String(id)))return false;
 if(due&&!validDate(due)){if(typeof toast==='function')toast(t().invalidDebt);return false;}
 const recordId=editing?id:nextId();
 if(!commit(next=>{
   if(!Array.isArray(next.debts))next.debts=[];
   if(!Array.isArray(next.payments))next.payments=[];
   let debt=editing?next.debts.find(d=>String(d.id)===String(id)):null;
   if(!debt){debt={id:recordId};next.debts.push(debt);}
   Object.assign(debt,{name,balance,min,apr,due,note,icon:typeof iconFor==='function'?iconFor(name,'deuda'):'💳',paymentFrequency:frequency||'monthly'});
   if(editing)for(const payment of next.payments)if(String(payment?.debtId)===String(id))payment.debtName=name;
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 window._debtIcon=null;
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const kind=String(document.getElementById('cevType36')?.value||'reminder');
 if(id!==null&&id!==undefined)return previousSaveEvent.apply(this,arguments);
 if(kind==='payment')return previousSaveEvent.apply(this,arguments);
 const date=String(document.getElementById('cevDate36')?.value||''),name=String(document.getElementById('cevName36')?.value||'').trim();
 const raw=String(document.getElementById('cevAmount36')?.value||'').trim(),amount=raw===''?0:parseAmount(raw);
 const note=String(document.getElementById('cevNote36')?.value||'').trim(),frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidEvent);return false;}
 const eventId=nextId(),icon=kind==='income'?'🟢':'🔔';
 if(!commit(next=>{if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];next.calendarEvents.push({id:eventId,date:date||'',name,amount,kind,note,icon,frequency});})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious123=previousSaveEvent;
})();
