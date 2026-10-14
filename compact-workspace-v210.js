// Compact quick entry; explicit tab taps return to the top without reloading data.
(()=>{
'use strict';
const opened=new Map(),owner=()=>window.aryGuideLifecycle128?.currentUser?.()||'',words=()=>s.locale==='en-US'?['Options','Hide options']:s.locale==='pt-BR'?['Opções','Ocultar opções']:['Opciones','Ocultar opciones'];
function compactPayment(){
 const card=document.getElementById('homeQuickPayment199'),form=card?.querySelector('form');if(!form||document.getElementById('paymentOptions211'))return;
 const key='payment:'+form.dataset.owner199,focused=document.activeElement,details=document.createElement('details'),summary=document.createElement('summary');details.id='paymentOptions211';details.className='quickOptions210';details.open=opened.get(key)===true;summary.textContent=words()[details.open?1:0];details.append(summary);
 const hint=card.querySelector(':scope>small');if(hint)details.append(hint);
 for(const el of [...form.children])if(el.matches('.dateChoice197,input[type="date"],small'))details.append(el);
 const history=card.querySelector('.paymentHistory199');if(history)details.append(history);form.append(details);
 const title=card.querySelector('h3');if(title){const unit=document.createElement('span');unit.className='paymentCurrency211';unit.textContent=' ('+s.currency+')';title.append(unit)}
 details.addEventListener('toggle',()=>{opened.set(key,details.open);summary.textContent=words()[details.open?1:0]});if(details.open&&focused&&details.contains(focused))focused.focus({preventScroll:true});
}
function compact(){
 compactPayment();
 const card=document.getElementById('homeQuickExpense193');if(!card||document.getElementById('quickOptions210'))return;
 const focused=document.activeElement;
 const details=document.createElement('details');details.id='quickOptions210';details.className='quickOptions210';details.open=opened.get(owner())===true;
 const summary=document.createElement('summary');summary.textContent=words()[details.open?1:0];details.append(summary);
 for(const el of [...card.children])if(el.matches('.quickCurrency197,.dateChoice197,#quickDate197,.quickExamples196,#homeExpenseHelp193'))details.append(el);
 details.addEventListener('toggle',()=>{opened.set(card.dataset.draftOwner198||owner(),details.open);summary.textContent=words()[details.open?1:0]});card.append(details);if(details.open&&focused&&details.contains(focused))focused.focus({preventScroll:true});
}
const beforeRender=window.render;window.render=function(){const previous=document.getElementById('quickOptions210');if(previous)opened.set(document.getElementById('homeQuickExpense193')?.dataset.draftOwner198||owner(),previous.open);const payment=document.getElementById('paymentOptions211');if(payment)opened.set('payment:'+document.querySelector('#homeQuickPayment199 form')?.dataset.owner199,payment.open);const result=beforeRender.apply(this,arguments);compact();return result};
function orderSettings(){const before=window.aryV18Settings;if(typeof before!=='function')return;window.aryV18Settings=function(){const result=before.apply(this,arguments),sheet=document.querySelector('#modal .sheet');if(!sheet)return result;
 const title=sheet.querySelector(':scope>h2'),close=sheet.querySelector(':scope>button[onclick="closeM()"]'),signout=sheet.querySelector('.signoutWave65,[onclick="logout()"]');
 if(title&&close){const header=document.createElement('div');header.className='preferenceHeader210';title.before(header);header.append(title,close);close.classList.add('preferenceClose210')}
 const access=sheet.querySelector(':scope>button[onclick="aryAppearance72()"]')||[...sheet.querySelectorAll(':scope>button')].find(b=>b.onclick===window.aryAppearance72);
 if(access)sheet.append(access);
 const alerts=[...sheet.querySelectorAll(':scope>button')].find(b=>b.dataset.preference210==='notifications');if(alerts)sheet.append(alerts);
 const backup=[...sheet.querySelectorAll(':scope>button')].find(b=>b.dataset.preference210==='backup');if(backup)sheet.append(backup);
 if(signout)sheet.append(signout);sheet.classList.add('preferences210');return result};}
function orderAccount(){if(!['more','profile'].includes(screen))return;const container=document.querySelector('#app .simpleMore215')||document.querySelector('#app .more94')||document.getElementById('app');for(const button of document.querySelectorAll('#app button[onclick="logout()"]'))container.append(button);}
const orderedRender=window.render;window.render=function(){const result=orderedRender.apply(this,arguments);orderAccount();return result};
function init(){orderSettings();compact();orderAccount();const nav=document.getElementById('nav');nav?.addEventListener('click',event=>{if(event.defaultPrevented||document.body.classList.contains('arranging192'))return;const button=event.composedPath().find(el=>el?.tagName==='BUTTON'&&/^go\(['"](?:home|expenses|plan|debts|investments|more)['"]\)$/.test(el.getAttribute('onclick')||''));if(!button)return;const route=button.getAttribute('onclick').match(/['"]([^'"]+)['"]/)[1],previous=screen;requestAnimationFrame(()=>{if(screen!==route)return;try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch{window.scrollTo(0,0)}})},{capture:true});}
if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

