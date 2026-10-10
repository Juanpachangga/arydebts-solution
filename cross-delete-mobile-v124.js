(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',deleteExpense:'¿Eliminar este gasto? Esta acción no se puede deshacer.',deleteRecurring:n=>`Este compromiso tiene ${n} gasto${n===1?'':'s'} realizado${n===1?'':'s'} registrado${n===1?'':'s'}. Se conservará${n===1?'':'n'} como historial y solo se eliminará el compromiso recurrente. ¿Continuar?`,deletedExpense:'Gasto eliminado'},
 en:{saveError:'Could not save. Your data remains unchanged.',deleteExpense:'Delete this expense? This action cannot be undone.',deleteRecurring:n=>`This commitment has ${n} recorded expense${n===1?'':'s'}. ${n===1?'It will':'They will'} remain in your history and only the recurring commitment will be removed. Continue?`,deletedExpense:'Expense deleted'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',deleteExpense:'Excluir esta despesa? Esta ação não pode ser desfeita.',deleteRecurring:n=>`Este compromisso tem ${n} gasto${n===1?'':'s'} realizado${n===1?'':'s'} registrado${n===1?'':'s'}. ${n===1?'Ele será mantido':'Eles serão mantidos'} no histórico e apenas o compromisso recorrente será excluído. Continuar?`,deletedExpense:'Despesa excluída'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);

window.deleteExpense=function(id){
 const expense=(s.expenses||[]).find(x=>String(x.id)===String(id));
 if(!expense)return false;
 const linked=(s.expenses||[]).filter(x=>String(x.sourceExpenseId)===String(id));
 if(!confirm(linked.length?t().deleteRecurring(linked.length):t().deleteExpense))return false;
 if(!commit(next=>{
  next.expenses=(next.expenses||[]).filter(x=>String(x.id)!==String(id));
  for(const item of next.expenses)if(String(item?.sourceExpenseId)===String(id))delete item.sourceExpenseId;
 })){
  if(typeof toast==='function')toast(t().saveError);
  return false;
 }
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().deletedExpense);
 return true;
};

// Keep modal sheets within the viewport and make destructive/action buttons easier to tap on small screens.
const STYLE_ID='aryMobilePolish124';
if(!document.getElementById(STYLE_ID)){
 const style=document.createElement('style');
 style.id=STYLE_ID;
 style.textContent=`
 #modal .sheet{max-width:min(680px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
 #modal .sheet :is(input,select,textarea,button,.btn){max-width:100%;box-sizing:border-box}
 #modal .sheet .rowActions{display:flex;flex-wrap:wrap;gap:8px}
 @media(max-width:600px){
   #modal{padding:12px!important;align-items:flex-end}
   #modal .sheet{width:100%!important;max-width:100%!important;max-height:calc(100dvh - 12px);border-bottom-left-radius:0;border-bottom-right-radius:0}
   #modal .sheet :is(button,.btn){min-height:44px}
   #app .rowActions{display:flex;flex-wrap:wrap;gap:8px}
   #app .rowActions :is(button,.btn){min-height:40px;flex:1 1 112px}
 }
 `;
 document.head.appendChild(style);
}
})();
