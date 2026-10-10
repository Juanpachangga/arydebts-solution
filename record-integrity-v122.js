(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{badExpense:'Completa nombre y monto válido.',badQuick:'Escribe un valor válido.',savedQuick:'Gasto hormiga agregado',saveError:'No se pudo guardar. Tus datos siguen como antes.',badPayment:'Este registro de pago antiguo ya no es compatible. Usa Registrar pago desde Deudas o Progreso.'},
 en:{badExpense:'Enter a valid name and amount.',badQuick:'Enter a valid amount.',savedQuick:'Small expense added',saveError:'Could not save. Your data remains unchanged.',badPayment:'This legacy payment entry is no longer supported. Use Record payment from Debts or Progress.'},
 pt:{badExpense:'Informe um nome e valor válidos.',badQuick:'Digite um valor válido.',savedQuick:'Pequeno gasto adicionado',saveError:'Não foi possível salvar. Seus dados continuam como antes.',badPayment:'Este registro de pagamento antigo não é mais compatível. Use Registrar pagamento em Dívidas ou Progresso.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const uniqueId=(...collections)=>typeof window.aryUniqueId120==='function'?window.aryUniqueId120(...collections):(()=>{let id=Date.now(),used=new Set(collections.flatMap(x=>Array.isArray(x)?x:[]).map(x=>String(x?.id)));while(used.has(String(id)))id++;return id})();
const amount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const today=()=>typeof localDate==='function'?localDate():(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`})();

window.addQuickAnt=function(){
 const field=document.getElementById('quickAnt'),value=amount(field?.value);
 if(!Number.isFinite(value)||value<=0){if(typeof toast==='function')toast(t().badQuick);return false;}
 if(!commit(next=>{if(!Array.isArray(next.expenses))next.expenses=[];next.expenses.push({id:uniqueId(next.expenses,next.debts,next.payments,next.calendarEvents),name:'Gasto rápido',amount:value,cat:'Hormiga',date:today()});})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().savedQuick);
 return true;
};

window.saveExpense=function(id){
 const name=String(document.getElementById('n')?.value||'').trim(),raw=String(document.getElementById('b')?.value??'').trim(),value=amount(raw),cat=String(document.getElementById('c')?.value||'Variable');
 if(!name||raw===''||!Number.isFinite(value)||value<0){if(typeof toast==='function')toast(t().badExpense);return false;}
 const editing=id!==null&&id!==undefined&&id!=='';
 if(editing&&!(s.expenses||[]).some(x=>String(x.id)===String(id)))return false;
 if(!commit(next=>{
  if(!Array.isArray(next.expenses))next.expenses=[];
  if(editing){const item=next.expenses.find(x=>String(x.id)===String(id));Object.assign(item,{name,amount:value,cat});}
  else next.expenses.push({id:uniqueId(next.expenses,next.debts,next.payments,next.calendarEvents),name,amount:value,cat,date:today()});
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

// Disable the old detached payment path instead of allowing orphan payment records.
window.addPayment=function(){
 if(typeof toast==='function')toast(t().badPayment);
 if(typeof go==='function')go('progress');
 return false;
};

// Upgrade debt creation to the same cross-record unique id policy while preserving the current atomic save behavior.
const originalSaveDebt=window.saveDebt;
if(typeof originalSaveDebt==='function')window.aryLegacySaveDebt122=originalSaveDebt;
})();
