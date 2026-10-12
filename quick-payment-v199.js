(()=>{
'use strict';
const language=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const copy={es:{title:'Pago al instante',hint:'Registra un pago que ya hiciste.',debt:'¿A quién pagaste?',choose:'Elige una deuda',amount:'Monto pagado',save:'Registrar pago',date:'Fecha',today:'Sin elegir fecha, se registra hoy.',paid:'No tienes deudas pendientes. 🎉',empty:'Agrega una deuda para registrar sus pagos.',add:'Agregar deuda',history:'Ver pagos',cancel:'Cancelar',invalid:'Elige la deuda y escribe un monto válido.'},en:{title:'Instant payment',hint:'Record a payment you already made.',debt:'Who did you pay?',choose:'Choose a debt',amount:'Amount paid',save:'Record payment',date:'Date',today:'Without a selected date, this records today.',paid:'You have no outstanding debts. 🎉',empty:'Add a debt to record its payments.',add:'Add debt',history:'View payments',cancel:'Cancel',invalid:'Choose a debt and enter a valid amount.'},pt:{title:'Pagamento na hora',hint:'Registre um pagamento que já fez.',debt:'A quem você pagou?',choose:'Escolha uma dívida',amount:'Valor pago',save:'Registrar pagamento',date:'Data',today:'Sem escolher a data, registra hoje.',paid:'Você não tem dívidas pendentes. 🎉',empty:'Adicione uma dívida para registrar seus pagamentos.',add:'Adicionar dívida',history:'Ver pagamentos',cancel:'Cancelar',invalid:'Escolha a dívida e informe um valor válido.'}};
const t=()=>copy[language()],owner=()=>window.aryGuideLifecycle128?.currentUser?.()||'';
const active=()=> (s.debts||[]).filter(d=>Number.isFinite(Number(d.balance))&&Number(d.balance)>0);
function content(where,preselect){
 const x=t(),list=active(),prefix=where==='home'?'instantPay199':'quickPay199';
 if(!list.length)return `<h3>${x.title}</h3><p>${(s.debts||[]).length?x.paid:x.empty}</p>${(s.debts||[]).length?'':`<button type="button" class="btn" onclick="debtForm()">＋ ${x.add}</button>`}<button type="button" class="btn" onclick="go('progress')">${x.history} →</button>`;
 const chosen=list.find(d=>String(d.id)===String(preselect))?.id??(list.length===1?list[0].id:'');
 return `<h3 id="${prefix}Title"><span aria-hidden="true">✓</span> ${x.title}</h3><small>${x.hint}</small><form data-payment199="${where}" data-owner199="${esc(owner())}" aria-labelledby="${prefix}Title"><label for="${prefix}Debt">${x.debt}</label><select id="${prefix}Debt" required><option value="" ${chosen===''?'selected':''} disabled>${x.choose}</option>${list.map(d=>`<option data-ary-user translate="no" value="${esc(d.id)}" ${String(chosen)===String(d.id)?'selected':''}>${esc(d.name)} · ${esc(money(d.balance))}</option>`).join('')}</select><div class="paymentAmount199"><label for="${prefix}Amount">${x.amount} (${esc(s.currency)})</label><input id="${prefix}Amount" type="text" inputmode="decimal" autocomplete="off" placeholder="0" required><button class="btn primary" type="submit">${x.save} →</button></div><label class="dateChoice197" for="${prefix}Enable"><input id="${prefix}Enable" type="checkbox"><span>${x.date}</span></label><input id="${prefix}Date" aria-label="${x.date}" type="date" max="${localDate()}" hidden disabled><small>${x.today}</small></form><button type="button" class="linkBtn" onclick="go('progress')">${x.history} →</button>`;
}
function bind(container){
 const form=container?.querySelector('form[data-payment199]');if(!form)return;
 const date=form.querySelector('input[type="date"]'),check=form.querySelector('input[type="checkbox"]');
 check.onchange=()=>{date.hidden=!check.checked;date.disabled=!check.checked;date.value=check.checked?(date.value||localDate()):''};
 form.onsubmit=event=>{event.preventDefault();window.arySaveQuickPayment199(form)};
}
window.arySaveQuickPayment199=form=>{
 if(!form||!form.isConnected||form.dataset.saving==='1'||!profile||!s.onboarded||form.dataset.owner199!==owner()||(form.dataset.payment199==='modal'&&!form.closest('#modal:not(.hidden)')))return false;
 const id=form.querySelector('select')?.value,raw=form.querySelector('input[inputmode="decimal"]')?.value?.trim(),amount=parseNum(raw),enabled=form.querySelector('input[type="checkbox"]')?.checked,date=enabled?form.querySelector('input[type="date"]')?.value:localDate();
 if(!id||!raw||!Number.isFinite(amount)||amount<=0||!active().some(d=>String(d.id)===id)){toast(t().invalid);return false}
 if(enabled&&(!date||!aryValidDate63(date))){toast(t().date);return false}
 form.dataset.saving='1';const result=window.aryApplyPayment54({debtId:id,amount,date});
 if(!result.ok){delete form.dataset.saving;toast(result.message||t().invalid);return false}
 // Invalidate the submitted DOM before rendering to reject stale/double submissions.
 form.querySelector('input[inputmode="decimal"]').value='';form.querySelector('input[type="checkbox"]').checked=false;form.querySelector('input[type="date"]').value='';if(form.dataset.payment199==='modal')closeM();render();toast(result.message);return true;
};
window.aryQuickPayment199=preselect=>{modal(`<section id="quickPayment199" data-ary-copy>${content('modal',preselect)}<button type="button" class="btn widebtn" onclick="closeM()">${t().cancel}</button></section>`);bind(document.getElementById('quickPayment199'))};
const quickAction=window.aryQuickAction133;window.aryQuickAction133=function(type){if(type==='payment')return window.aryQuickPayment199();return quickAction.apply(this,arguments)};
function snapshot(){const form=document.querySelector('#homeQuickPayment199 form');if(!form||form.dataset.owner199!==owner()||screen!=='home')return null;return{debt:form.querySelector('select').value,amount:form.querySelector('input[inputmode="decimal"]').value,enabled:form.querySelector('input[type="checkbox"]').checked,date:form.querySelector('input[type="date"]').value,locale:form.dataset.locale199,focus:form.contains(document.activeElement)?document.activeElement.id:'',start:form.querySelector('input[inputmode="decimal"]').selectionStart,end:form.querySelector('input[inputmode="decimal"]').selectionEnd}}
function home(draft){
 if(!profile||!s.onboarded||screen!=='home')return;const anchor=document.getElementById('homeQuickExpense193');if(!anchor)return;
 let card=document.getElementById('homeQuickPayment199');if(!card){card=document.createElement('section');card.className='card full';card.id='homeQuickPayment199';card.setAttribute('data-ary-copy','');card.innerHTML=content('home');(document.querySelector('#app .homeCoach29')||document.querySelector('#app .searchLaunch72')||anchor).after(card);bind(card)}
 const form=card.querySelector('form');if(form){form.dataset.locale199=s.locale;if(draft){if(active().some(d=>String(d.id)===draft.debt))form.querySelector('select').value=draft.debt;const input=form.querySelector('input[inputmode="decimal"]');let amount=draft.amount;if(draft.locale!==s.locale){const parts=new Intl.NumberFormat(draft.locale).formatToParts(1000.1),group=parts.find(p=>p.type==='group')?.value||',',decimal=parts.find(p=>p.type==='decimal')?.value||'.',value=Number(amount.split(group).join('').replace(decimal,'.'));if(amount.trim()&&Number.isFinite(value))amount=new Intl.NumberFormat(s.locale,{maximumFractionDigits:20}).format(value)}input.value=amount;form.querySelector('input[type="checkbox"]').checked=draft.enabled;const date=form.querySelector('input[type="date"]');date.value=draft.date;date.hidden=!draft.enabled;date.disabled=!draft.enabled;const focused=document.getElementById(draft.focus);if(focused&&form.contains(focused)&&!focused.disabled){focused.focus({preventScroll:true});if(focused===input)input.setSelectionRange(draft.start,draft.end)}}}
 window.aryLayoutApply197?.();
}
const previousRender=window.render;window.render=function(){const draft=snapshot(),out=previousRender.apply(this,arguments);home(draft);return out};home(null);
})();
