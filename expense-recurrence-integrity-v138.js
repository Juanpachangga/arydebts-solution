(()=>{
'use strict';
const frequencies=['daily','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'];
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{bad:'Completa nombre y monto válido.',badRecurrence:'Revisa la frecuencia y la fecha del gasto.',saveError:'No se pudo guardar. Tus datos siguen como antes.'},
 en:{bad:'Enter a valid name and amount.',badRecurrence:'Check the expense frequency and date.',saveError:'Could not save. Your data remains unchanged.'},
 pt:{bad:'Informe um nome e valor válidos.',badRecurrence:'Revise a frequência e a data do gasto.',saveError:'Não foi possível salvar. Seus dados continuam como antes.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const uniqueId=(...collections)=>typeof window.aryUniqueId120==='function'?window.aryUniqueId120(...collections):(()=>{let id=Date.now(),used=new Set(collections.flatMap(x=>Array.isArray(x)?x:[]).map(x=>String(x?.id)));while(used.has(String(id)))id++;return id})();
const amount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const today=()=>typeof localDate==='function'?localDate():(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`})();
const validDate=value=>!value||(typeof window.aryValidDate63==='function'?window.aryValidDate63(value):/^\d{4}-\d{2}-\d{2}$/.test(value));
const validSource=(expenses,sourceId)=>{
 if(sourceId==null||sourceId==='')return null;
 const parent=(expenses||[]).find(x=>String(x?.id)===String(sourceId));
 return parent&&frequencies.includes(parent.frequency)?parent.id:null;
};

window.saveExpense=function(id){
 const name=String(document.getElementById('n')?.value||'').trim();
 const raw=String(document.getElementById('b')?.value??'').trim();
 const value=amount(raw);
 const cat=String(document.getElementById('c')?.value||'Variable');
 if(!name||raw===''||!Number.isFinite(value)||value<0){if(typeof toast==='function')toast(t().bad);return false;}

 const editing=id!==null&&id!==undefined&&id!=='';
 const existing=editing?(s.expenses||[]).find(x=>String(x.id)===String(id)):null;
 if(editing&&!existing)return false;

 const frequencyField=document.getElementById('expenseFrequency63');
 const dateField=document.getElementById('edate');
 const sourcePending=window._expenseSource63;
 const frequency=frequencyField?String(frequencyField.value||'once'):String(existing?.frequency||'once');
 if(!['once',...frequencies].includes(frequency)){if(typeof toast==='function')toast(t().badRecurrence);return false;}

 let date;
 if(dateField){
   date=String(dateField.value||'').trim();
 }else if(editing){
   date=String(existing?.date||'');
 }else{
   date=frequency==='once'?today():'';
 }
 if(!validDate(date)){if(typeof toast==='function')toast(t().badRecurrence);return false;}
 if(frequency==='once'&&!date&&!editing)date=today();
 if(frequency==='once'&&!date&&editing&&existing?.date)date=existing.date;

 const requestedSource=sourcePending!=null&&sourcePending!==''?sourcePending:existing?.sourceExpenseId;
 const icon=typeof iconFor==='function'?iconFor(name,cat):existing?.icon;

 if(!commit(next=>{
   if(!Array.isArray(next.expenses))next.expenses=[];
   const sourceExpenseId=frequency==='once'?validSource(next.expenses,requestedSource):null;
   if(editing){
     const item=next.expenses.find(x=>String(x.id)===String(id));
     if(!item)return;
     item.name=name;item.amount=value;item.cat=cat;
     if(icon)item.icon=icon;
     if(frequencyField)item.frequency=frequency;
     else if(item.frequency==null)item.frequency='once';
     if(dateField)item.date=date;
     else if(item.date==null&&frequency==='once')item.date=today();
     if(sourceExpenseId!=null)item.sourceExpenseId=sourceExpenseId;
     else delete item.sourceExpenseId;
   }else{
     const item={
       id:uniqueId(next.expenses,next.debts,next.payments,next.calendarEvents),
       name,amount:value,cat,
       date:frequency==='once'?(date||today()):date,
       frequency
     };
     if(icon)item.icon=icon;
     if(sourceExpenseId!=null)item.sourceExpenseId=sourceExpenseId;
     next.expenses.push(item);
   }
 })){
   if(typeof toast==='function')toast(t().saveError);
   return false;
 }
 window._expenseSource63=null;
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.aryExpenseRecurrenceIntegrity138={active:true};
})();

// V139 — keep guide controls reachable on long/mobile screens and add an explicit cancel choice.
(()=>{
 if(document.getElementById('aryGuideMobileControlsLoader139'))return;
 const script=document.createElement('script');
 script.id='aryGuideMobileControlsLoader139';
 script.src='guide-mobile-controls-v139.js?v=139.1';
 script.async=false;
 document.body.appendChild(script);
})();
