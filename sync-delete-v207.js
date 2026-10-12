// All delete controls use one durable transaction and rerender every derived view.
(()=>{
'use strict';
const lists={expense:'expenses',debt:'debts',event:'calendarEvents',payment:'payments'};
function remove(kind,id){
 const field=lists[kind],key=String(id),item=(s[field]||[]).find(item=>String(item.id)===key);
 if(!item)return false;
 // Historical calendar payments must be removed from the actual payment ledger.
 if(kind==='event'&&item.kind==='payment')return item.paymentId!=null?remove('payment',item.paymentId):false;
 const ok=window.aryCommitFinancial109?.(next=>{
  if(kind==='expense'){for(const expense of next.expenses||[])if(String(expense.sourceExpenseId)===key)delete expense.sourceExpenseId;}
  if(kind==='payment'){
   const debt=(next.debts||[]).find(d=>String(d.id)===String(item.debtId));
   if(debt)debt.balance=aryMoney108.add(Number(debt.balance)||0,Number(item.amount)||0);
   next.calendarEvents=(next.calendarEvents||[]).filter(e=>String(e.paymentId)!==key);
  }
  if(kind==='debt'){
   const paymentIds=new Set((next.payments||[]).filter(p=>String(p.debtId)===key).map(p=>String(p.id)));
   next.payments=(next.payments||[]).filter(p=>String(p.debtId)!==key);
   next.calendarEvents=(next.calendarEvents||[]).filter(e=>String(e.debtId)!==key&&!paymentIds.has(String(e.paymentId)));
  }
  next[field]=(next[field]||[]).filter(item=>String(item.id)!==key);
 });
 if(!ok){toast(aryStorageError109());return false}
 closeM();render();return true;
}
window.deleteExpense=id=>remove('expense',id);
window.deleteDebt=window.aryDeleteDebt54=id=>remove('debt',id);
window.aryDeleteEvent36=id=>remove('event',id);
window.aryDeletePayment54=id=>remove('payment',id);
window.aryRemove207=remove;
})();
