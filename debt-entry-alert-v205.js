(()=>{
'use strict';
const text=()=>s.locale==='en-US'?'Overdue payment pending.':s.locale==='pt-BR'?'Pagamento vencido pendente.':'Pago vencido pendiente.';
let previous='',owner='',deadline=0,timer=0;
const pending=()=>{const today=localDate();return (window.aryHomeActivity82?.(new Date(),Infinity)||[]).filter(item=>item.source==='debt'&&item.date<today)};
function clear(){document.getElementById('debtEntryNotice205')?.remove();document.querySelectorAll('.debtEntryPulse205').forEach(row=>row.classList.remove('debtEntryPulse205'))}
function paint(){
 clearTimeout(timer);
 const currentOwner=window.aryGuideLifecycle128?.currentUser?.()||'';
 if(owner!==currentOwner){owner=currentOwner;previous='';deadline=0}
 if(!profile||!s.onboarded||screen!=='debts'){previous=screen;deadline=0;clear();return}
 const debts=pending(),entering=previous!=='debts';previous='debts';
 if(entering)deadline=debts.length?Date.now()+3000:0;
 clear();if(!debts.length||Date.now()>=deadline)return;
 const notice=document.createElement('p');notice.id='debtEntryNotice205';notice.className='debtEntryNotice205';notice.setAttribute('role','status');notice.textContent=text();
 const header=document.querySelector('#app .sectionHeader94');if(header)header.after(notice);else document.getElementById('app')?.prepend(notice);
 for(const item of debts){const button=[...document.querySelectorAll('.debtRecords186 button')].find(b=>b.getAttribute('onclick')===`aryDebtPayment54(${item.id})`);button?.closest('.row')?.classList.add('debtEntryPulse205')}
 const lite=(window.aryEffectiveMotion80?.()||s.mode)==='lite';document.getElementById('app')?.classList.toggle('debtEntryLite205',lite);
 timer=setTimeout(clear,Math.max(0,deadline-Date.now()));
}
const renderBefore=window.render;window.render=function(){const result=renderBefore.apply(this,arguments);paint();return result};
window.addEventListener('DOMContentLoaded',paint);paint();
})();
