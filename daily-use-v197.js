(function dailyUse197(){
'use strict';
const lang=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const C={
es:{currency:'Moneda de la app',currencyHint:'Cambia la moneda de visualización; no convierte los importes.',date:'Fecha',dateHint:'Sin fecha manual, se cuenta en el mes en que lo registras.',sound:'Sonido suave en modo inmersivo',soundHint:'Puedes desactivarlo cuando prefieras silencio.',error:'No se pudo guardar. Inténtalo de nuevo.',saved:'Gasto registrado',invalid:'Escribe el monto y el nombre del gasto.'},
en:{currency:'App currency',currencyHint:'Changes the display currency; does not convert amounts.',date:'Date',dateHint:'Without a manual date, this counts in the month you record it.',sound:'Soft sound in immersive mode',soundHint:'Turn it off whenever you prefer silence.',error:'Could not save. Please try again.',saved:'Expense recorded',invalid:'Enter the amount and expense name.'},
pt:{currency:'Moeda do app',currencyHint:'Muda a moeda de exibição; não converte os valores.',date:'Data',dateHint:'Sem data manual, conta no mês em que você registra.',sound:'Som suave no modo imersivo',soundHint:'Desative quando preferir silêncio.',error:'Não foi possível salvar. Tente novamente.',saved:'Gasto registrado',invalid:'Informe o valor e o nome do gasto.'}};
const tx=()=>C[lang()],today=()=>localDate();
const priorCurrencies=window.currencies;let codes=[];try{codes=Intl.supportedValuesOf('currency')}catch{}
codes=[...new Set([...(priorCurrencies?.()||['USD']),...codes])];window.currencies=()=>[...codes];
const currencyOptions=()=>codes.map(code=>`<option value="${code}" ${code===s.currency?'selected':''}>${code}</option>`).join('');
window.arySetCurrency70=code=>{
 if(!codes.includes(code))return false;
 const input=document.getElementById('homeExpense193'),draft=input?.value,date=document.getElementById('quickDate197')?.value,enabled=document.getElementById('dateEnabled-quickDate197')?.checked;
 if(!window.aryCommitFinancial109?.(next=>next.currency=code)){document.querySelectorAll('select[onchange*="arySetCurrency70"],#quickCurrency197').forEach(select=>select.value=s.currency);toast(tx().error);return false}
 render();const nextInput=document.getElementById('homeExpense193');if(nextInput&&draft!==undefined)nextInput.value=draft;
 const nextDate=document.getElementById('quickDate197'),check=document.getElementById('dateEnabled-quickDate197');if(nextDate&&check){check.checked=!!enabled;nextDate.value=date||'';nextDate.hidden=!enabled;nextDate.disabled=!enabled}
 document.querySelectorAll('#modal .amountPresets button').forEach(button=>{const match=button.getAttribute('onclick')?.match(/^presetAmount\((\d+(?:\.\d+)?)\)$/);if(match)button.textContent='+'+money(Number(match[1]))});return true;
};
const debtForm198=window.debtForm;window.debtForm=function(){const out=debtForm198.apply(this,arguments),select=document.getElementById('debtCurrency70');if(select&&typeof select.after==='function'){const hint=document.createElement('small');hint.className='muted';hint.textContent=tx().currencyHint;select.after(hint)}return out};
window.aryParseQuickExpense193=value=>aryInstant197.parse(value,s.locale);
function formatInput(input,pasted=false){
 if(!input)return;
 const raw=input.value,start=input.selectionStart??raw.length,end=input.selectionEnd??start,next=aryInstant197.format(raw,s.locale,pasted),parts=aryInstant197.split(raw);
 const warning=document.getElementById('instantPrecision197'),number=parts&&aryInstant197.number(parts.raw,s.locale,pasted);
 if(warning){warning.hidden=!number?.approximate;warning.textContent=lang()==='en'?'≈ Calculations for these amounts are approximate.':lang()==='pt'?'≈ Os cálculos destes valores são aproximados.':'≈ Los cálculos de estos importes son aproximados.'}
 if(next===raw)return;
 const nextParts=aryInstant197.split(next),a=parts?.before.length||0,b=a+(parts?.raw.length||0),newEnd=(nextParts?.before.length||0)+(nextParts?.raw.length||0);
 function cursor(pos){if(pos<=a)return pos;if(pos>=b)return pos+newEnd-b;const count=(raw.slice(a,pos).match(/\d/g)||[]).length;let found=0;for(let i=a;i<newEnd;i++)if(/\d/.test(next[i])&&++found===count)return i+1;return a}
 input.value=next;input.setSelectionRange(cursor(start),cursor(end));
}
window.aryFormatHomeExpense196=()=>{const input=document.getElementById('homeExpense193');formatInput(input,true);return !!input};
function dateChoice(input,labelText,checked=false){
 if(!input||typeof input.before!=='function'||document.getElementById('dateChoice-'+input.id))return;
 input.setAttribute('aria-label',labelText);const label=document.createElement('label');label.className='dateChoice197';label.id='dateChoice-'+input.id;
 const check=document.createElement('input');check.type='checkbox';check.id='dateEnabled-'+input.id;check.checked=checked;const text=document.createElement('span');text.textContent=labelText;label.append(check,text);
 const previous=input.previousElementSibling;if(previous?.tagName==='LABEL')previous.replaceWith(label);else input.before(label);
 const update=()=>{input.hidden=!check.checked;input.disabled=!check.checked;if(check.checked&&!input.value)input.value=today();if(!check.checked)input.value=''};
 check.onchange=update;update();
}
const expenseForm=window.expenseForm;
window.expenseForm=function(){
 const out=expenseForm.apply(this,arguments),input=document.getElementById('edate');dateChoice(input,tx().date,!!input?.value);
 const hint=input?.nextElementSibling,frequency=document.getElementById('expenseFrequency63'),repeat=frequency?.nextElementSibling;
 if(repeat?.tagName==='SMALL'){repeat.classList.add('repeatHint197');repeat.textContent=lang()==='en'?'Repeats estimate monthly spending; they are not recorded payments.':lang()==='pt'?'Repetições estimam o gasto mensal; não são pagamentos registrados.':'Las repeticiones estiman tu gasto mensual; no son pagos registrados.'}
 const update=()=>{const recurring=frequency&&frequency.value!=='once';if(repeat?.tagName==='SMALL')repeat.hidden=!recurring;if(hint?.tagName==='SMALL')hint.textContent=recurring?(lang()==='en'?'Without an exact date, we reserve the monthly estimate.':lang()==='pt'?'Sem data exata, reservamos a estimativa mensal.':'Sin fecha exacta, reservamos el promedio mensual.'):(arguments[0]?(lang()==='en'?'Removing the date preserves its accounting month.':lang()==='pt'?'Remover a data preserva seu mês contábil.':'Quitar la fecha conserva su mes contable.'):tx().dateHint)};
 frequency?.addEventListener?.('change',update);update();return out;
};
const quick=window.aryQuickExpense192;window.aryQuickExpense192=function(){const out=quick.apply(this,arguments),form=document.getElementById('quickExpense192');if(form&&!document.getElementById('edate')){const input=document.createElement('input');input.id='edate';input.type='date';form.querySelector('button').before(input);dateChoice(input,tx().date)}return out};
window.arySaveHomeExpense193=()=>{
 const form=document.querySelector('#homeQuickExpense193 form'),input=document.getElementById('homeExpense193');
 if(!form||form.dataset.saving==='1'||screen!=='home'||!profile||!s.onboarded)return false;
 const item=aryInstant197.parse(input?.value,s.locale);if(!item){toast(tx().invalid);input?.focus();return false}
 const enabled=document.getElementById('dateEnabled-quickDate197')?.checked,date=enabled?document.getElementById('quickDate197')?.value:'';
 if(enabled&&(!date||!window.aryValidDate63?.(date))){toast(tx().date);return false}
 form.dataset.saving='1';
 const saved=window.aryCommitFinancial109?.(next=>{next.expenses=Array.isArray(next.expenses)?next.expenses:[];next.expenses.push({...item,id:window.aryUniqueId120(next.expenses,next.debts,next.payments,next.calendarEvents),cat:'Variable',date,recordedAt197:today(),frequency:'once',icon:iconFor(item.name,'Variable')})});
 if(!saved){delete form.dataset.saving;toast(tx().error);return false}input.value='';const check=document.getElementById('dateEnabled-quickDate197'),dateInput=document.getElementById('quickDate197');if(check)check.checked=false;if(dateInput)dateInput.value='';render();toast(tx().saved);return true;
};
function home(){
 const card=document.getElementById('homeQuickExpense193');if(!card)return;
 card.dataset.draftOwner198=window.aryGuideLifecycle128?.currentUser?.()||'';
 card.dataset.draftLocale198=s.locale||'es-US';
 if(!document.getElementById('quickCurrency197')){
  const box=document.createElement('div');box.className='quickCurrency197';box.innerHTML=`<label for="quickCurrency197">${tx().currency}</label><select id="quickCurrency197">${currencyOptions()}</select><small>${tx().currencyHint}</small>`;card.querySelector('form').after(box);
  box.querySelector('select').onchange=e=>{if(!window.arySetCurrency70(e.target.value))e.target.value=s.currency};
  const date=document.createElement('input');date.id='quickDate197';date.type='date';box.after(date);dateChoice(date,tx().date);
  const warning=document.createElement('small');warning.id='instantPrecision197';warning.setAttribute('role','status');warning.hidden=true;card.querySelector('form').after(warning);
  const input=card.querySelector('#homeExpense193');
  input.oninput=e=>{if(!e.isComposing)formatInput(input,e.inputType==='insertFromPaste'||(e.data?.length||0)>1)};
  input.oncompositionend=()=>formatInput(input,true);
  input.addEventListener('beforeinput',e=>{
   const p=aryInstant197.split(input.value),pos=input.selectionStart;if(!p||input.selectionEnd!==pos||!e.cancelable)return;const a=p.before.length,b=a+p.raw.length;if(pos<a||pos>b)return;
   const punctuation=aryInstant197.punctuation(s.locale);
   if(e.data==='.'&&punctuation.decimal===','){e.preventDefault();input.setRangeText(',',pos,pos,'end');formatInput(input,false)}
   else if(e.inputType==='deleteContentBackward'&&pos>a+1&&input.value[pos-1]===punctuation.group){e.preventDefault();input.setRangeText('',pos-2,pos,'end');formatInput(input,false)}
  });
  const examples=window.aryExpenseExamples196();
  card.querySelectorAll('.quickExample196').forEach((button,index)=>{
   const sample=aryInstant197.parse(examples[index],s.locale);if(!sample)return;
   const numeric=aryInstant197.number(sample.amountText197,s.locale,true)?.formatted||String(sample.amount);button.textContent=numeric;button.setAttribute('aria-label',numeric+' '+sample.name);
   button.onclick=()=>{const current=aryInstant197.split(input.value),name=current?.name||(/^\p{L}/u.test(input.value.trim())?input.value.trim():sample.name);input.value=numeric+' '+name;formatInput(input,true);input.focus()};
  });
  input.placeholder=aryInstant197.format(examples[0],s.locale,true);const help=document.getElementById('homeExpenseHelp193');if(help)help.textContent=tx().dateHint;
 }
 const search=document.querySelector('#app .searchLaunch72'),quote=document.querySelector('#app .homeCoach29');
 if(search&&quote&&!window.aryLayoutPlacement197?.(quote)&&(quote.parentElement!==search.parentElement||(!window.aryLayoutCustom197?.()&&search.nextElementSibling!==quote)))search.after(quote);
}
const appearance=screens.appearance;screens.appearance=function(){const out=appearance.apply(this,arguments);return out+`<section class="card full" id="soundPreferences197"><label class="dateChoice197"><input type="checkbox" id="softSound197" ${s.softSound197===false?'':'checked'} onchange="aryToggleSound197(this.checked)"><span>${tx().sound}</span></label><small>${tx().soundHint}</small></section>`};
window.aryToggleSound197=value=>{if(!window.aryCommitFinancial109?.(next=>next.softSound197=!!value)){toast(tx().error);render();return false}return true};
let audio=null,lastSound=0;
window.arySoftClick197=()=>{
 if(s.mode!=='immersive'||s.softSound197===false||document.hidden||Date.now()-lastSound<120)return false;
 const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;
 try{audio=audio||new Audio();lastSound=Date.now();if(audio.state==='suspended')audio.resume().catch(()=>{});const now=audio.currentTime,osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.setValueAtTime(660,now);osc.frequency.exponentialRampToValueAtTime(440,now+.16);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.012,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.18);osc.connect(gain);gain.connect(audio.destination);osc.start(now);osc.stop(now+.2);osc.onended=()=>{osc.disconnect();gain.disconnect()};return true}catch{return false}
};
document.addEventListener('click',e=>{if(e.isTrusted&&!e.defaultPrevented&&e.target.closest('button,[role="button"],input[type="checkbox"],select,a[href]'))window.arySoftClick197()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&audio?.state==='running')audio.suspend().catch(()=>{})});
function refresh(){if(!profile||!s.onboarded)return;if(screen==='home')home();window.aryLayoutApply197?.()}
for(const name of ['aryNextQuote72','aryFavoriteQuote72']){const fn=window[name];if(fn)window[name]=function(){const out=fn.apply(this,arguments);window.aryLayoutApply197?.();return out}}
function captureDraft198(){
 const card=document.getElementById('homeQuickExpense193'),owner=window.aryGuideLifecycle128?.currentUser?.();
 if(screen!=='home'||!profile||!owner||card?.dataset.draftOwner198!==owner)return null;
 const input=document.getElementById('homeExpense193');if(!input)return null;
 return{owner,locale:card.dataset.draftLocale198,value:input.value,start:input.selectionStart,end:input.selectionEnd,focused:document.activeElement===input,activeId:card.contains(document.activeElement)?document.activeElement.id:'',date:document.getElementById('quickDate197')?.value||'',enabled:!!document.getElementById('dateEnabled-quickDate197')?.checked};
}
const renderBase=window.render;window.render=function(){
 const draft=captureDraft198(),out=renderBase.apply(this,arguments);refresh();
 if(draft&&screen==='home'&&draft.owner===window.aryGuideLifecycle128?.currentUser?.()){
  const input=document.getElementById('homeExpense193'),date=document.getElementById('quickDate197'),check=document.getElementById('dateEnabled-quickDate197');
  if(input){
   let value=draft.value;if(draft.locale!==s.locale){const parts=aryInstant197.split(value),number=parts&&aryInstant197.number(parts.raw,draft.locale,true);if(number){const localized=number.canonical.replace('.',aryInstant197.punctuation(s.locale).decimal);value=parts.before+aryInstant197.number(localized,s.locale,false).formatted+parts.after}}
   input.value=value;input.setSelectionRange(Math.min(draft.start,value.length),Math.min(draft.end,value.length));formatInput(input,false);if(draft.focused)input.focus({preventScroll:true});
  }
  if(date&&check){check.checked=draft.enabled;date.value=draft.date;date.hidden=!draft.enabled;date.disabled=!draft.enabled}
  const focused=document.getElementById(draft.activeId);if(focused&&!focused.disabled&&document.getElementById('homeQuickExpense193')?.contains(focused))focused.focus({preventScroll:true});
 }return out;
};
window.aryDailyUse197={refresh,formatInput,holdMilliseconds:1800};refresh();
})();
