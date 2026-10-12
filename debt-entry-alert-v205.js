(()=>{
'use strict';
const lang=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const words={es:{title:'🚨 Atención inmediata',seen:'Entendido',error:'No se pudo guardar el aviso. Inténtalo otra vez.'},en:{title:'🚨 Needs attention',seen:'Understood',error:'Could not save the alert. Try again.'},pt:{title:'🚨 Atenção imediata',seen:'Entendido',error:'Não foi possível salvar o aviso. Tente novamente.'}};
const owner=()=>window.aryGuideLifecycle128?.currentUser?.()||'';
const key=()=>owner()?'ary-debt-alert-v206:'+owner():null;
const read=()=>{try{const value=JSON.parse(localStorage.getItem(key())||'[]');return Array.isArray(value)?value.filter(x=>typeof x==='string'):[]}catch{return []}};
const identity=item=>JSON.stringify([String(item.id),item.date]);
const pending=()=>{const today=localDate(),seen=new Set(read());return (window.aryHomeActivity82?.(new Date(),Infinity)||[]).filter(item=>item.source==='debt'&&item.date<today&&!seen.has(identity(item)))};
function clear(){document.querySelector('#app .debtAlert33')?.remove();document.querySelectorAll('.debtEntryPulse205').forEach(row=>row.classList.remove('debtEntryPulse205'))}
function paint(){
 clear();if(!profile||!s.onboarded||screen!=='debts')return;
 const debts=pending();if(!debts.length)return;
 const x=words[lang()],card=document.createElement('section');card.className='card full debtAlert33 debtAttention206';card.dataset.layout197='debt:attention';card.setAttribute('role','status');card.setAttribute('data-ary-copy','');
 card.innerHTML=`<div class="debtAttentionHead206"><b>${x.title}</b><button type="button" class="btn" onclick="aryDismissDebtAlert206()">${x.seen}</button></div><div class="debtAttentionNames206">${debts.map(item=>`<span data-ary-user translate="no">${esc(item.name)}</span>`).join('')}</div>`;
 const anchor=document.querySelector('#app .debtPulse33');if(anchor)anchor.after(card);else document.getElementById('app')?.prepend(card);
 for(const item of debts){const button=[...document.querySelectorAll('.debtRecords186 button')].find(b=>b.getAttribute('onclick')===`aryDebtPayment54(${item.id})`);button?.closest('.row')?.classList.add('debtEntryPulse205')}
 window.aryLayoutApply197?.();const lite=(window.aryEffectiveMotion80?.()||s.mode)==='lite';document.getElementById('app')?.classList.toggle('debtEntryLite205',lite);
}
window.aryDismissDebtAlert206=()=>{if(!profile||!s.onboarded||screen!=='debts'||!key())return false;try{localStorage.setItem(key(),JSON.stringify([...new Set([...read(),...pending().map(identity)])].slice(-500)))}catch{toast(words[lang()].error);return false}paint();return true};
const renderBefore=window.render;window.render=function(){const result=renderBefore.apply(this,arguments);paint();return result};
window.addEventListener('DOMContentLoaded',paint);paint();
})();
