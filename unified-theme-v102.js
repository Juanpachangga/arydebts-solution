(()=>{
const before=window.render;
window.render=()=>{const result=before();aryApplyTheme46();const dark=document.documentElement.dataset.aryTheme==='dark';document.documentElement.style.colorScheme=dark?'dark':'light';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#17152b':'#fcfcff';return result;};
render();
})();

// V115 — close remaining financial-state gaps without changing the existing UI.
(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{invalidIncome:'Escribe un ingreso válido.',saveError:'No se pudo guardar. Tus números siguen como antes. Libera espacio o habilita el almacenamiento e inténtalo de nuevo.',deleteDebt:'¿Eliminar esta deuda? Esta acción no se puede deshacer.',deleteDebtPayments:n=>`Esta deuda tiene ${n} pago${n===1?'':'s'} registrado${n===1?'':'s'}. Si la eliminas, también se eliminará ese historial para mantener tus cálculos correctos. ¿Continuar?`,deleted:'Deuda eliminada',incomeSaved:'Ingreso guardado'},
 en:{invalidIncome:'Enter a valid income amount.',saveError:'Could not save. Your numbers remain unchanged. Free up space or enable storage and try again.',deleteDebt:'Delete this debt? This action cannot be undone.',deleteDebtPayments:n=>`This debt has ${n} recorded payment${n===1?'':'s'}. Deleting it will also remove that history so your calculations stay correct. Continue?`,deleted:'Debt deleted',incomeSaved:'Income saved'},
 pt:{invalidIncome:'Digite uma renda válida.',saveError:'Não foi possível salvar. Seus números continuam como antes. Libere espaço ou habilite o armazenamento e tente novamente.',deleteDebt:'Excluir esta dívida? Esta ação não pode ser desfeita.',deleteDebtPayments:n=>`Esta dívida tem ${n} pagamento${n===1?'':'s'} registrado${n===1?'':'s'}. Ao excluí-la, esse histórico também será removido para manter seus cálculos corretos. Continuar?`,deleted:'Dívida excluída',incomeSaved:'Renda salva'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof window.parseNum==='function'?window.parseNum(value):typeof parseNum==='function'?parseNum(value):Number(value);
const validFrequency=value=>['weekly','biweekly','monthly'].includes(value)?value:'monthly';

function atomicDeleteDebt(id){
 const debt=(s.debts||[]).find(d=>String(d.id)===String(id));
 if(!debt)return false;
 const linked=(s.payments||[]).filter(p=>String(p.debtId)===String(id));
 if(!confirm(linked.length?t().deleteDebtPayments(linked.length):t().deleteDebt))return false;
 if(!commit(next=>{
   next.debts=(next.debts||[]).filter(d=>String(d.id)!==String(id));
   next.payments=(next.payments||[]).filter(p=>String(p.debtId)!==String(id));
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().deleted);
 return true;
}
window.aryDeleteDebt54=atomicDeleteDebt;
window.deleteDebt=atomicDeleteDebt;

window.arySaveIncome45=function(){
 const raw=String(document.getElementById('inc45')?.value??'').trim();
 const amount=parseAmount(raw),frequency=validFrequency(document.getElementById('freq45')?.value);
 if(raw===''||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidIncome);return false;}
 if(!commit(next=>{next.income=amount;next.incomeFrequency=frequency;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().incomeSaved);
 return true;
};

window.saveIncomeSetup=function(){
 const raw=String(document.getElementById('oi')?.value??'').trim(),amount=Number(raw);
 const frequency=validFrequency(document.getElementById('of')?.value),currency=String(document.getElementById('oc')?.value||s.currency||'USD');
 if(raw===''||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidIncome);return false;}
 if(!commit(next=>{next.income=amount;next.incomeFrequency=frequency;next.currency=currency;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof go==='function')go('setupGoal');
 return true;
};

window.setIncome=function(){
 const raw=String(document.getElementById('inc')?.value??'').trim(),amount=Number(raw);
 const frequency=validFrequency(document.getElementById('if')?.value);
 if(raw===''||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidIncome);return false;}
 if(!commit(next=>{next.income=amount;next.incomeFrequency=frequency;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
})();

// V116 — load the guided tour only after the rest of the app has finished booting.
(()=>{
 if(document.getElementById('aryGuideLoader116'))return;
 const script=document.createElement('script');
 script.id='aryGuideLoader116';
 script.src='guided-tour-v116.js?v=116.1';
 script.async=false;
 document.body.appendChild(script);
})();

// V117 — enhance the guided tour and close calendar persistence gaps after all base modules load.
(()=>{
 if(document.getElementById('aryGuideSafetyLoader117'))return;
 const script=document.createElement('script');
 script.id='aryGuideSafetyLoader117';
 script.src='guided-safety-v117.js?v=117.1';
 script.async=false;
 document.body.appendChild(script);
})();

// V118 — make recurring reminder completion atomic after recurrence wrappers finish loading.
(()=>{
 if(document.getElementById('aryRecurrenceSafetyLoader118'))return;
 const script=document.createElement('script');
 script.id='aryRecurrenceSafetyLoader118';
 script.src='recurrence-safety-v118.js?v=118.1';
 script.async=false;
 document.body.appendChild(script);
})();

// V119 — secure goals, savings and adaptive-home preferences, and keep guide focus stable while scrolling.
(()=>{
 if(document.getElementById('aryGoalPreferenceSafetyLoader119'))return;
 const script=document.createElement('script');
 script.id='aryGoalPreferenceSafetyLoader119';
 script.src='goals-personalization-safety-v119.js?v=119.1';
 script.async=false;
 document.body.appendChild(script);
})();

// V120 — harden core settings/onboarding state and expose integrity diagnostics.
(()=>{
 if(document.getElementById('aryIntegrityLoader120'))return;
 const script=document.createElement('script');
 script.id='aryIntegrityLoader120';
 script.src='integrity-polish-v120.js?v=120.1';
 script.async=false;
 document.body.appendChild(script);
})();
