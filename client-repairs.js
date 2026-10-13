// Source: unified-theme-v102.js
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
 en:{invalidIncome:'Enter a valid income amount.',saveError:'Could not save. Your numbers remain unchanged. Free up space or enable storage and try again.',deleteDebt:'Delete this debt? This action cannot be undone.',deleteDebtPayments:n=>`This debt has ${n} recorded payment${n===1?'':'s'} registered. Deleting it will also remove that history so your calculations stay correct. Continue?`,deleted:'Debt deleted',incomeSaved:'Income saved'},
 pt:{invalidIncome:'Digite uma renda válida.',saveError:'Não foi possível salvar. Seus números continuam como antes. Libere espaço ou habilite o armazenamento e tente novamente.',deleteDebt:'Excluir esta dívida? Esta ação não pode ser desfeita.',deleteDebtPayments:n=>`Esta dívida tem ${n} pagamento${n===1?'':'s'} registrado${n===1?'':'s'}. Ao excluí-la, esse histórico também será removido para manter seus cálculos corretos. Continuar?`,deleted:'Dívida excluída',incomeSaved:'Renda salva'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof window.parseNum==='function'?window.parseNum(value):typeof parseNum==='function'?parseNum(value):Number(value);
const validFrequency=value=>['daily','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'].includes(value)?value:'monthly';

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
 if(window.aryCurrencyUpdate208&&currency!==s.currency)return aryCurrencyUpdate208(currency,next=>{next.income=amount;next.incomeFrequency=frequency},()=>go('setupGoal'));
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


// V117 — enhance the guided tour and close calendar persistence gaps after all base modules load.


// V118 — make recurring reminder completion atomic after recurrence wrappers finish loading.


// V119 — secure goals, savings and adaptive-home preferences, and keep guide focus stable while scrolling.


// V120 — harden core settings/onboarding state and expose integrity diagnostics.


// V121 — validate and import downloaded recovery files safely.


// V122 — replace legacy record creation with atomic writes and collision-safe IDs.


// V123 — use globally collision-safe IDs for debts and calendar events.


// V124 — atomic expense deletion and mobile interaction polish.


// V125 — replace the short guide with a full automatic spotlight tour across the important app experience.


// V126 — extend the full guide to dedicated small-expense and money-analysis screens.


// V127 — premium guide polish: interaction lock, section labels, countdown and keyboard accessibility.


// V128 — make the automatic guide a true first-use experience per customer/account.


// V129 — launch the first-use guide only after onboarding settles and pause it when the app is hidden.


// V130 — point the guide cloud at its spotlight and explain empty first-use states clearly.


// V131 — smooth section-to-section transitions during the first-use guide.




;
// Source: recurrence-safety-v118.js
(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar el cambio. El recordatorio sigue como antes.'},
 en:{saveError:'Could not save the change. The reminder remains unchanged.'},
 pt:{saveError:'Não foi possível salvar a alteração. O lembrete continua como antes.'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const monthKey=()=>typeof localDate==='function'?String(localDate()).slice(0,7):(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`})();

window.aryCompleteReminder60=function(id,completed){
 const current=(s.calendarEvents||[]).find(e=>Number(e.id)===Number(id)&&e.kind==='reminder');
 if(!current)return false;
 const done=!!completed,isRecurring=typeof window.aryRecurring63==='function'&&window.aryRecurring63(current);
 if(!commit(next=>{
   const event=(next.calendarEvents||[]).find(e=>Number(e.id)===Number(id)&&e.kind==='reminder');
   if(!event)throw new Error('missing_reminder');
   event.completed=done;
   if(isRecurring)event.completedMonth63=done?monthKey():'';
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.aryReminderState118=id=>{
 const e=(s.calendarEvents||[]).find(x=>Number(x.id)===Number(id));
 return e?{completed:!!e.completed,completedMonth63:e.completedMonth63||'',recurring:typeof window.aryRecurring63==='function'&&window.aryRecurring63(e)}:null;
};
})();



;
// Source: goals-personalization-safety-v119.js
(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',invalidSaving:'Escribe un valor válido para el ahorro.',savingSaved:'Ahorro guardado'},
 en:{saveError:'Could not save. Your data remains unchanged.',invalidSaving:'Enter a valid savings amount.',savingSaved:'Savings saved'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',invalidSaving:'Digite um valor válido para a poupança.',savingSaved:'Poupança salva'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const addMoney=(a,b)=>window.aryMoney108&&typeof aryMoney108.add==='function'?aryMoney108.add(a,b):(Number(a)||0)+(Number(b)||0);

window.saveSaving=function(){
 const raw=String(document.getElementById('sv')?.value||'').trim(),value=parseAmount(raw);
 if(raw===''||!Number.isFinite(value)||value<=0){if(typeof toast==='function')toast(t().invalidSaving);return false;}
 if(!commit(next=>{next.savings=Math.max(0,addMoney(Number(next.savings)||0,value));})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().savingSaved);
 return true;
};

window.removeGoal=function(index){
 const i=Number(index);if(!Number.isInteger(i)||i<0||i>=(s.goals||[]).length)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];goals.splice(i,1);next.goals=goals;next.goal=goals[0]||'';})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();return true;
};

window.toggleGoal=function(value){
 const goal=String(value||'').trim();if(!goal)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];next.goals=goals.includes(goal)?goals.filter(g=>g!==goal):[...goals,goal];next.goal=next.goals[0]||'';})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();return true;
};

window.chooseGoal=function(value){
 const goal=String(value||'').trim();if(!goal)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];if(!goals.includes(goal))goals.push(goal);next.goals=goals;next.goal=goal;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof go==='function')go('setupDebts');return true;
};

const validRoutes=['debts','expenses','plan','calendar','income','goals','progress','buy','ants','assistant'];
window.aryToggleAdaptive61=function(){
 if(!commit(next=>{if(!next.personalization61||typeof next.personalization61!=='object'||Array.isArray(next.personalization61))next.personalization61={enabled:true,visits:{},pinned:''};next.personalization61.enabled=next.personalization61.enabled===false;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();
 if(typeof aryCustomize61==='function')aryCustomize61();return true;
};
window.aryPin61=function(route){
 const value=String(route||'');if(value!==''&&!validRoutes.includes(value))return false;
 if(!commit(next=>{if(!next.personalization61||typeof next.personalization61!=='object'||Array.isArray(next.personalization61))next.personalization61={enabled:true,visits:{},pinned:''};next.personalization61.pinned=value;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();return true;
};

// Keep adaptive-home visit learning transactional too. Navigation should never leave
// in-memory preferences ahead of what was actually persisted.
const visitRecent119={};
const visitScore119=(value,now)=>{const n=Number(value?.score),at=Number(value?.at);return Number.isFinite(n)&&n>0&&Number.isFinite(at)&&at<=now?Math.min(n,1000)*Math.pow(.5,(now-at)/(14*86400000)):0};
window.aryTrackVisit61=function(route,now=Date.now()){
 if(!profile||!s.onboarded||!validRoutes.includes(route)||!Number.isFinite(now))return false;
 const current=s.personalization61&&typeof s.personalization61==='object'&&!Array.isArray(s.personalization61)?s.personalization61:null;
 if(current?.enabled===false)return false;
 if(visitRecent119[route]!==undefined&&now-visitRecent119[route]<30000)return false;
 const ok=commit(next=>{
  if(!next.personalization61||typeof next.personalization61!=='object'||Array.isArray(next.personalization61))next.personalization61={enabled:true,visits:{},pinned:''};
  const p=next.personalization61;if(p.enabled===false)return;
  if(!p.visits||typeof p.visits!=='object'||Array.isArray(p.visits))p.visits={};
  p.visits[route]={score:visitScore119(p.visits[route],now)+1,at:now};
 });
 if(ok)visitRecent119[route]=now;
 return !!ok;
};

let scrollFrame=0;
const refreshGuideFocus=()=>{if(!document.getElementById('aryGuide116'))return;cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(()=>{const focused=document.querySelector('.aryGuideFocus117');if(focused&&typeof focused.getBoundingClientRect==='function'){const r=focused.getBoundingClientRect();const top=92,bottom=window.innerHeight-190;if(r.top<top||r.bottom>bottom){try{focused.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'})}catch(e){}}}})};
window.addEventListener('scroll',refreshGuideFocus,{passive:true});
})();



;
// Source: integrity-polish-v120.js
(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar el cambio. Tus datos siguen como antes.',invalidSettings:'Revisa el idioma o la moneda seleccionada.'},
 en:{saveError:'Could not save the change. Your data remains unchanged.',invalidSettings:'Check the selected language or currency.'},
 pt:{saveError:'Não foi possível salvar a alteração. Seus dados continuam como antes.',invalidSettings:'Revise o idioma ou a moeda selecionada.'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const locales=['es-US','es-CO','es-ES','en-US','pt-BR'];
const validCurrency=value=>typeof value==='string'&&/^[A-Z]{3}$/.test(value)&&(typeof currencies!=='function'||currencies().includes(value));
const saveChange=change=>{if(!commit(change)){if(typeof toast==='function')toast(t().saveError);return false}return true};
const landingLang=value=>value==='en-US'?'en':value==='pt-BR'?'pt':'es';

window.setLocale=function(value){
 const locale=String(value||'');if(!locales.includes(locale))return false;
 if(!saveChange(next=>{next.locale=locale;}))return false;
 try{localStorage.setItem('ary-lang',landingLang(locale))}catch{}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.toggleMode=function(){
 if(!saveChange(next=>{next.mode=next.mode==='lite'?'immersive':'lite';}))return false;
 if(typeof render==='function')render();return true;
};

window.toggleTheme=function(){
 if(!saveChange(next=>{next.theme=next.theme==='light'?'dark':'light';}))return false;
 if(typeof render==='function')render();return true;
};

window.finishOnboarding=function(){
 if(!saveChange(next=>{next.onboarded=true;delete next.onboardingStep;if(!s.onboarded){next.guide94=window.aryExperience94.beginGuide();next.profileHint213='pending';}}))return false;
 if(typeof go==='function')go('home');return true;
};

// All setup buttons, including the goals screen, must call the same atomic finish.
window.aryFinishOnboarding54=window.finishOnboarding;

window.saveSettings=function(){
 const greeting=String(document.getElementById('greet')?.value||'').trim();
 const locale=String(document.getElementById('loc')?.value||s.locale||'es-US');
 const currency=String(document.getElementById('cur')?.value||s.currency||'USD');
 if(!locales.includes(locale)||!validCurrency(currency)){if(typeof toast==='function')toast(t().invalidSettings);return false;}
 if(window.aryCurrencyUpdate208&&currency!==s.currency)return aryCurrencyUpdate208(currency,next=>{next.greeting=greeting;next.locale=locale},()=>{try{localStorage.setItem('ary-lang',landingLang(locale))}catch{}closeM();render()});
 if(!saveChange(next=>{next.greeting=greeting;next.locale=locale;next.currency=currency;}))return false;
 try{localStorage.setItem('ary-lang',landingLang(locale))}catch{}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.moveNav=function(index,direction){
 const i=Number(index),d=Number(direction),order=Array.isArray(s.navOrder)?s.navOrder:[],j=i+d;
 if(!Number.isInteger(i)||!Number.isInteger(d)||i<0||i>=order.length||j<0||j>=order.length)return false;
 if(order[i]==='more'||order[j]==='more')return false;
 if(!saveChange(next=>{const items=Array.isArray(next.navOrder)?[...next.navOrder]:[];[items[i],items[j]]=[items[j],items[i]];next.navOrder=items;}))return false;
 if(typeof render==='function')render();
 if(typeof customizeHome==='function')customizeHome();
 return true;
};

window.aryUniqueId120=function(...collections){
 const used=new Set();
 for(const collection of collections)for(const item of Array.isArray(collection)?collection:[])if(item&&item.id!==undefined&&item.id!==null)used.add(String(item.id));
 let id=Date.now();while(used.has(String(id)))id++;return id;
};

const validMoney=value=>Number.isFinite(Number(value))&&Number(value)>=0;
window.aryIntegrity120=function(){
 const groups={debts:s.debts||[],expenses:s.expenses||[],payments:s.payments||[],calendarEvents:s.calendarEvents||[]},duplicates={},invalid={},missingIds={};
 for(const [name,items] of Object.entries(groups)){
  const seen=new Set(),dupes=[],bad=[],missing=[];
  items.forEach((item,index)=>{
   if(!item||typeof item!=='object'||Array.isArray(item)){bad.push(index);return}
   if(item.id===undefined||item.id===null||String(item.id).trim()==='')missing.push(index);else{const id=String(item.id);if(seen.has(id)&&!dupes.includes(id))dupes.push(id);seen.add(id)}
   if(name==='debts'&&(!validMoney(item.balance??0)||!validMoney(item.min??0)||!validMoney(item.apr??0)))bad.push(index);
   if(name==='expenses'&&!validMoney(item.amount??0))bad.push(index);
   if(name==='payments'&&!validMoney(item.amount??0))bad.push(index);
  });
  duplicates[name]=dupes;invalid[name]=[...new Set(bad)];missingIds[name]=missing;
 }
 const debtIds=new Set((s.debts||[]).filter(Boolean).map(d=>String(d.id)));
 const orphanPayments=(s.payments||[]).filter(p=>p&&p.debtId!==undefined&&p.debtId!==null&&!debtIds.has(String(p.debtId))).map(p=>String(p.id??''));
 const progress=typeof window.aryRealDebtProgress54==='function'?window.aryRealDebtProgress54():null;
 const clean=validMoney(s.income)&&validMoney(s.savings)&&Object.values(duplicates).every(x=>!x.length)&&Object.values(invalid).every(x=>!x.length)&&Object.values(missingIds).every(x=>!x.length)&&!orphanPayments.length;
 return {clean,incomeValid:validMoney(s.income),savingsValid:validMoney(s.savings),duplicates,invalid,missingIds,orphanPayments,progress};
};
})();



;
// Source: recovery-integrity-v121.js
(()=>{
'use strict';
const KEY='arydebts-v3',BACKUP_KEY='arydebts-recovery-v92';
const allowedCurrencies=new Set(typeof currencies==='function'?currencies():['USD','COP','EUR','MXN','BRL','CAD','GBP','JPY']);try{for(const code of Intl.supportedValuesOf('currency'))allowedCurrencies.add(code)}catch{}
const allowedLocales=new Set(['es-US','en-US','pt-BR']);
const allowedNav=new Set(['home','expenses','plan','debts','investments','more']);
const validDate=value=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return false;const [y,m,d]=String(value).split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d};
const finite=value=>Number.isFinite(Number(value));
const uniqueIds=list=>{const seen=new Set();for(const item of list||[]){if(!item||item.id==null)continue;const id=String(item.id);if(seen.has(id))throw new Error('duplicate');seen.add(id)}};
const t=()=>s?.locale==='en-US'?{import:'Import backup',hint:'Choose a JSON backup exported by Arydebts. Your current state is retained first.',confirm:'Replace your current Arydebts data with this backup?',done:'Backup imported',invalid:'That file is not a valid Arydebts backup.',save:'The backup is valid, but Arydebts could not safely retain your current state. Nothing was replaced.'}:s?.locale==='pt-BR'?{import:'Importar backup',hint:'Escolha um backup JSON exportado pelo Arydebts. Seu estado atual será preservado primeiro.',confirm:'Substituir seus dados atuais do Arydebts por este backup?',done:'Backup importado',invalid:'Esse arquivo não é um backup válido do Arydebts.',save:'O backup é válido, mas o Arydebts não conseguiu preservar com segurança seu estado atual. Nada foi substituído.'}:{import:'Importar copia',hint:'Elige una copia JSON exportada por Arydebts. Primero conservaremos tu estado actual.',confirm:'¿Reemplazar tus datos actuales de Arydebts con esta copia?',done:'Copia importada',invalid:'Ese archivo no es una copia válida de Arydebts.',save:'La copia es válida, pero Arydebts no pudo conservar con seguridad tu estado actual. No se reemplazó nada.'};
function rawStateFromFile(parsed){return parsed?.state&&typeof parsed.state==='object'?parsed.state:parsed?.data&&typeof parsed.data==='object'?parsed.data:parsed}
function validateState(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('invalid');
 const next=typeof aryNormalizeState104==='function'?aryNormalizeState104(raw):structuredClone(raw);
 next.debts=Array.isArray(next.debts)?next.debts:[];next.expenses=Array.isArray(next.expenses)?next.expenses:[];next.payments=Array.isArray(next.payments)?next.payments:[];next.calendarEvents=Array.isArray(next.calendarEvents)?next.calendarEvents:[];next.goals=Array.isArray(next.goals)?next.goals:[];
 if(!allowedCurrencies.has(String(next.currency||'')))throw new Error('invalid_currency');
 if(!allowedLocales.has(String(next.locale||'')))next.locale='es-US';
 next.navOrder=[...new Set((Array.isArray(next.navOrder)?next.navOrder:[]).filter(x=>allowedNav.has(String(x))))];for(const x of ['home','expenses','plan','debts','investments','more'])if(!next.navOrder.includes(x))next.navOrder.push(x);next.navOrder=next.navOrder.filter(x=>x!=='more').concat('more');
 uniqueIds(next.debts);uniqueIds(next.expenses);uniqueIds(next.payments);uniqueIds(next.calendarEvents);uniqueIds(next.goals);
 for(const d of next.debts){if(!finite(d.balance)||Number(d.balance)<0||d.minimum!=null&&(!finite(d.minimum)||Number(d.minimum)<0)||d.apr!=null&&(!finite(d.apr)||Number(d.apr)<0))throw new Error('invalid');if(d.due&& !validDate(d.due))d.due=''}
 for(const e of next.expenses){if(!finite(e.amount)||Number(e.amount)<0)throw new Error('invalid');if(e.date&&!validDate(e.date))throw new Error('date');}
 const debtIds=new Set(next.debts.map(d=>String(d.id)));for(const p of next.payments){if(!finite(p.amount)||Number(p.amount)<=0||!validDate(p.date)||!debtIds.has(String(p.debtId)))throw new Error('invalid')}
 for(const e of next.calendarEvents){if(!validDate(e.date))throw new Error('date')}
 return next;
}
function retainCurrentBeforeImport(encoded){
 const current=localStorage.getItem(KEY);if(!current||current===encoded)return true;
 try{
  const before=localStorage.getItem(BACKUP_KEY),history=before?JSON.parse(before):[];
  const list=Array.isArray(history)?history:[];
  if(!list.some(entry=>entry?.state===current))list.unshift({savedAt:new Date().toISOString(),reason:'before-import',state:current});
  localStorage.setItem(BACKUP_KEY,JSON.stringify(list.slice(0,12)));
  const verify=JSON.parse(localStorage.getItem(BACKUP_KEY)||'[]');
  if(!Array.isArray(verify)||!verify.some(entry=>entry?.state===current))throw new Error('retain');
  return true;
 }catch{throw new Error('retain')}
}
function message(error){return error?.message==='retain'?t().save:t().invalid}
window.aryImportBackup121=async function(file){
 try{
  if(!file||file.size>8*1024*1024)throw new Error('invalid');
  const parsed=JSON.parse(await file.text()),candidate=validateState(rawStateFromFile(parsed));
  if(!confirm(t().confirm))return false;
  const encoded=JSON.stringify(candidate);
  retainCurrentBeforeImport(encoded);
  localStorage.setItem(KEY,encoded);
  s=candidate;
  if(typeof closeM==='function')closeM();
  if(typeof render==='function')render();
  if(typeof toast==='function')toast(t().done);
  return true;
 }catch(error){if(typeof toast==='function')toast(message(error));return false}
};
const original=window.aryRecovery92;
if(typeof original==='function')window.aryRecovery92=function(){
 original();
 const sheet=document.querySelector('#modal .sheet');if(!sheet||document.getElementById('aryImport121'))return;
 const x=t(),box=document.createElement('section');box.id='aryImport121';box.className='notice';
 box.innerHTML=`<b>📥 ${x.import}</b><p class="muted">${x.hint}</p><input id="aryImportFile121" type="file" accept="application/json,.json" hidden><button type="button" class="btn widebtn" id="aryImportButton121">${x.import}</button>`;
 const directButtons=[...sheet.children].filter(el=>el.tagName==='BUTTON');
 const close=directButtons.length?directButtons[directButtons.length-1]:null;
 if(close&&close.parentNode===sheet)sheet.insertBefore(box,close);else sheet.appendChild(box);
 const input=box.querySelector('#aryImportFile121');box.querySelector('#aryImportButton121').onclick=()=>input.click();input.onchange=()=>{const file=input.files?.[0];if(file)aryImportBackup121(file);input.value=''};
};
})();


;
// Source: record-integrity-v122.js
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



;
// Source: record-ids-v123.js
(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',invalidDebt:'Escribe valores válidos para la deuda.',invalidEvent:'Revisa el nombre, fecha y monto del movimiento.'},
 en:{saveError:'Could not save. Your data remains unchanged.',invalidDebt:'Enter valid debt values.',invalidEvent:'Check the event name, date and amount.'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',invalidDebt:'Digite valores válidos para a dívida.',invalidEvent:'Revise o nome, a data e o valor do movimento.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const nextId=()=>typeof window.aryUniqueId120==='function'?aryUniqueId120(s.debts||[],s.expenses||[],s.payments||[],s.calendarEvents||[]):Date.now();
const validDate=value=>typeof window.aryValidDate63==='function'?window.aryValidDate63(value):/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));

window.saveDebt=function(id,frequency){
 frequency=document.getElementById('debtFrequency63')?.value||frequency||'monthly';
 if(!['daily','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'].includes(frequency)){if(typeof toast==='function')toast(t().invalidDebt);return false;}
 const name=String(document.getElementById('n')?.value||'').trim();
 const rawBalance=String(document.getElementById('b')?.value??'').trim();
 const rawMin=String(document.getElementById('m')?.value??'').trim();
 const rawApr=String(document.getElementById('a')?.value??'').trim();
 const balance=parseAmount(rawBalance),min=rawMin===''?0:parseAmount(rawMin),apr=rawApr===''?0:parseAmount(rawApr);
 const due=String(document.getElementById('due')?.value||''),note=String(document.getElementById('note')?.value||'').trim();
 const editing=id!==null&&id!==undefined;
 const shownIcon=String(document.getElementById('recordIcon96')?.textContent||'').trim();
 const resolvedIcon=shownIcon||(typeof iconFor==='function'?iconFor(name,'deuda'):'💳');
 if(!name||rawBalance===''||!Number.isFinite(balance)||balance<0||!Number.isFinite(min)||min<0||!Number.isFinite(apr)||apr<0){if(typeof toast==='function')toast(t().invalidDebt);return false;}
 if(editing&&!(s.debts||[]).some(d=>String(d.id)===String(id)))return false;
 if(due&&!validDate(due)){if(typeof toast==='function')toast(t().invalidDebt);return false;}
 const recordId=editing?id:nextId();
 if(!commit(next=>{
   if(!Array.isArray(next.debts))next.debts=[];
   if(!Array.isArray(next.payments))next.payments=[];
   let debt=editing?next.debts.find(d=>String(d.id)===String(id)):null;
   if(!debt){debt={id:recordId};next.debts.push(debt);}
   Object.assign(debt,{name,balance,min,apr,due,note,icon:resolvedIcon,paymentFrequency:frequency||'monthly'});
   if(editing)for(const payment of next.payments)if(String(payment?.debtId)===String(id))payment.debtName=name;
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 window._debtIcon=null;
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const kind=String(document.getElementById('cevType36')?.value||'reminder');
 if(id!==null&&id!==undefined)return previousSaveEvent.apply(this,arguments);
 if(kind==='payment')return previousSaveEvent.apply(this,arguments);
 const date=String(document.getElementById('cevDate36')?.value||''),name=String(document.getElementById('cevName36')?.value||'').trim();
 const raw=String(document.getElementById('cevAmount36')?.value||'').trim(),amount=raw===''?0:parseAmount(raw);
 const note=String(document.getElementById('cevNote36')?.value||'').trim(),frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidEvent);return false;}
 const eventId=nextId(),icon=kind==='income'?'🟢':'🔔';
 if(!commit(next=>{if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];next.calendarEvents.push({id:eventId,date:date||'',name,amount,kind,note,icon,frequency});})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious123=previousSaveEvent;
})();



;
// Source: cross-delete-mobile-v124.js
(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',deleteExpense:'¿Eliminar este gasto? Esta acción no se puede deshacer.',deletedExpense:'Gasto eliminado',deleteDebt:'¿Eliminar esta deuda? Esta acción no se puede deshacer.',deletedDebt:'Deuda eliminada'},
 en:{saveError:'Could not save. Your data remains unchanged.',deleteExpense:'Delete this expense? This action cannot be undone.',deletedExpense:'Expense deleted',deleteDebt:'Delete this debt? This action cannot be undone.',deletedDebt:'Debt deleted'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',deleteExpense:'Excluir esta despesa? Esta ação não pode ser desfeita.',deletedExpense:'Despesa excluída',deleteDebt:'Excluir esta dívida? Esta ação não pode ser desfeita.',deletedDebt:'Dívida excluída'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);

window.deleteExpense=function(id){
 const exists=(s.expenses||[]).some(x=>String(x.id)===String(id));
 if(!exists)return false;
 const onboarding=typeof screen==='string'&&screen==='setupExpenses';

 if(!commit(next=>{next.expenses=(next.expenses||[]).filter(x=>String(x.id)!==String(id));})){
  if(typeof toast==='function')toast(t().saveError);
  return false;
 }
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().deletedExpense);
 return true;
};

window.deleteDebt=function(id){
 const key=String(id),exists=(s.debts||[]).some(x=>String(x.id)===key);
 if(!exists)return false;
 const onboarding=typeof screen==='string'&&screen==='setupDebts';
 if(!onboarding&&!confirm(t().deleteDebt))return false;
 if(!commit(next=>{
  next.debts=(next.debts||[]).filter(x=>String(x.id)!==key);
  // Payments are debt-owned records; removing them prevents orphan financial history.
  next.payments=(next.payments||[]).filter(x=>String(x.debtId)!==key);
 })){
  if(typeof toast==='function')toast(t().saveError);
  return false;
 }
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().deletedDebt);
 return true;
};

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



;
// Source: full-guide-v125.js
// Compatibility for saved shortcuts. ARY uses independent page cards with no automatic navigation.
(()=>{
'use strict';
window.aryGuideUnified125=false;
window.aryStartFullGuide125=()=>window.aryStartGuide94?.();
window.aryFullGuideFinish125=()=>window.aryDismissGuide94?.();
window.aryFullGuideNext125=()=>window.aryDismissGuide94?.();
window.aryFullGuideBack125=()=>false;
window.aryFullGuideToggleAuto125=()=>false;
window.aryFullGuideStatus125=()=>({active:false,index:0,automatic:false,completed:s?.guide94?.completed===true,steps:0,unified:false});
})();



;
// Source: guide-lifecycle-v128.js
// Stable account identity remains shared with personal layout preferences.
(()=>{
'use strict';
function identity(){
 const p=typeof profile==='object'&&profile?profile:null;
 const raw=String(p?.email||p?.id||p?.name||'').trim().toLowerCase();
 if(!raw)return '';
 let h=2166136261;
 for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(36);
}
window.aryGuideLifecycle128={
 currentUser:identity,
 completed:()=>s?.guide94?.completed===true,
 resetCurrent:()=>false,
 complete:()=>false,
 sync:()=>s?.guide94?.completed===true
};
})();



;
// Source: guide-completion-v132.js
(()=>{
'use strict';
// Completion content is owned by V125; preserve the legacy Home shortcut API.
window.aryGuideHome132=()=>{window.aryFullGuideFinish125?.();window.go?.('home')};
})();

// V133 — keep daily use fast with one-tap global quick actions after onboarding.




;
// Source: fast-ux-v133.js
(()=>{
'use strict';
const STYLE='aryFastUxStyle133',FAB='aryQuickFab133';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{label:'Acciones rápidas',expense:'Gasto rápido',debt:'Deuda',income:'Ingreso',payment:'Pago',title:'¿Qué quieres registrar?',close:'Cerrar'},
 en:{label:'Quick actions',expense:'Quick expense',debt:'Debt',income:'Income',payment:'Payment',title:'What do you want to add?',close:'Close'},
 pt:{label:'Ações rápidas',expense:'Gasto rápido',debt:'Dívida',income:'Renda',payment:'Pagamento',title:'O que deseja registrar?',close:'Fechar'}
};
const t=()=>copy[lang()]||copy.es;
function guideActive(){return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary125cloud,.ary126node')}
function modalOpen(){const m=document.getElementById('modal');if(!m||m.classList.contains('hidden'))return false;const cs=globalThis.getComputedStyle?.(m);return !cs||cs.display!=='none'&&cs.visibility!=='hidden'}
function usable(){return !!profile&&!!s?.onboarded&&!modalOpen()&&!['welcome','signup','login','intro','setupIncome','setupExpenses','setupDebts','setupGoal'].includes(String(screen||''))&&!guideActive()}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
html{scroll-behavior:auto}button,.btn,[role="button"],a,input,select{touch-action:manipulation}.btn,button{-webkit-tap-highlight-color:transparent}
#aryQuickFab133{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:calc(82px + env(safe-area-inset-bottom));z-index:25;width:54px;height:54px;border:0;border-radius:18px;display:grid;place-items:center;font-size:28px;line-height:1;color:#fff;background:linear-gradient(135deg,#29d7bd,#46c5ff,#7863ff);box-shadow:0 14px 34px rgba(20,63,125,.32),0 0 0 1px rgba(255,255,255,.14);cursor:pointer;transition:transform .12s ease,box-shadow .12s ease}#aryQuickFab133:active{transform:scale(.94);box-shadow:0 7px 18px rgba(20,63,125,.26)}
#modal:not(.hidden)~#aryQuickFab133{display:none!important;pointer-events:none!important}
.ary133quickGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:12px 0}.ary133quickGrid button{min-height:74px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border-radius:18px}.ary133quickGrid .ary133ico{font-size:24px}.ary133quickGrid b{font-size:12px}
@media(min-width:900px){#aryQuickFab133{right:28px;bottom:28px;width:58px;height:58px}}@media(max-width:560px){#aryQuickFab133{right:14px;bottom:calc(76px + env(safe-area-inset-bottom));width:52px;height:52px;border-radius:17px}.ary133quickGrid button{min-height:68px}}
@media(prefers-reduced-motion:reduce){#aryQuickFab133{transition:none}}
`;document.head.appendChild(st)}
function quickSheet(){
 const x=t();
 if(typeof modal!=='function')return;
 modal(`<section data-ary-copy><h2>⚡ ${x.title}</h2><div class="ary133quickGrid"><button class="btn" onclick="aryQuickAction133('expense')"><span class="ary133ico">🌸</span><b>${x.expense}</b></button><button class="btn" onclick="aryQuickAction133('debt')"><span class="ary133ico">💳</span><b>${x.debt}</b></button><button class="btn" onclick="aryQuickAction133('income')"><span class="ary133ico">💰</span><b>${x.income}</b></button><button class="btn" onclick="aryQuickAction133('payment')"><span class="ary133ico">✓</span><b>${x.payment}</b></button></div><button class="btn widebtn" onclick="closeM()">${x.close}</button></section>`)
}
window.aryQuickAction133=function(type){
 try{if(typeof closeM==='function')closeM()}catch{}
 requestAnimationFrame(()=>{
  if(type==='expense'&&typeof expenseForm==='function')return expenseForm();
  if(type==='debt'&&typeof debtForm==='function')return debtForm();
  if(type==='income'&&typeof incomeForm==='function')return incomeForm();
  if(type==='payment'&&typeof go==='function')return go('progress');
 });
};
function syncFab(){
 ensureStyle();let fab=document.getElementById(FAB);
 if(!usable()){fab?.remove();return}
 if(fab){fab.setAttribute('aria-label',t().label);fab.title=t().label;return}
 fab=document.createElement('button');fab.id=FAB;fab.type='button';fab.textContent='+';fab.setAttribute('aria-label',t().label);fab.title=t().label;fab.onclick=quickSheet;document.body.appendChild(fab);
}
function hook(name,after,before){const fn=window[name];if(typeof fn!=='function'||fn._aryFast133)return;const wrapped=function(){if(before)before();const out=fn.apply(this,arguments);if(after)requestAnimationFrame(after);return out};wrapped._aryFast133=true;window[name]=wrapped}
function watchModal(){
 const m=document.getElementById('modal');
 if(!m||m._aryFabObserver133)return;
 const obs=new MutationObserver(()=>requestAnimationFrame(syncFab));
 obs.observe(m,{attributes:true,attributeFilter:['class']});
 m._aryFabObserver133=obs;
}
hook('render',syncFab);
hook('modal',syncFab,()=>document.getElementById(FAB)?.remove());
hook('closeM',syncFab);
hook('aryStartFullGuide125',null,()=>document.getElementById(FAB)?.remove());
hook('aryFullGuideFinish125',syncFab);
hook('logout',syncFab);
hook('localAuth',syncFab);
window.addEventListener('hashchange',()=>requestAnimationFrame(syncFab));
document.addEventListener('click',e=>{if(e.target?.closest?.('.ary125skip'))setTimeout(syncFab,80)},{capture:true});
window.addEventListener('keydown',e=>{if(e.key!=='Escape'||guideActive())return;const m=document.getElementById('modal');if(m&&!m.classList.contains('hidden')&&typeof closeM==='function'){e.preventDefault();closeM()}});
ensureStyle();watchModal();syncFab();
})();





;
// Source: fast-forms-v134.js
(()=>{
'use strict';
const STYLE='aryFastFormsStyle134';
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
#modal .sheet.ary134fast input,#modal .sheet.ary134fast select{min-height:46px}
#modal .sheet.ary134fast .ary134save{position:sticky;bottom:0;z-index:3;box-shadow:0 -8px 22px rgba(7,14,35,.18)}
.ary-light #modal .sheet.ary134fast .ary134save{box-shadow:0 -8px 22px rgba(60,83,115,.10)}
@media(max-width:560px){#modal .sheet.ary134fast{padding-bottom:max(12px,env(safe-area-inset-bottom))}#modal .sheet.ary134fast label{margin-top:9px}#modal .sheet.ary134fast input,#modal .sheet.ary134fast select{font-size:16px;min-height:48px}}
`;
 document.head.appendChild(st);
}
function visible(el){return !!el&&!el.disabled&&el.offsetParent!==null}
function formKind(sheet){
 if(sheet.querySelector('button[onclick*="saveExpense"]')&&sheet.querySelector('#n')&&sheet.querySelector('#b'))return 'expense';
 if(sheet.querySelector('button[onclick*="saveDebt"]')&&sheet.querySelector('#n')&&sheet.querySelector('#b'))return 'debt';
 if(sheet.querySelector('button[onclick*="setIncome"]')&&sheet.querySelector('#inc'))return 'income';
 return '';
}
function orderedFields(sheet,kind){
 const ids=kind==='expense'?['n','b','c']:kind==='debt'?['n','b','m','due','note','a']:['inc','if'];
 return ids.map(id=>sheet.querySelector('#'+id)).filter(visible);
}
function primary(sheet,kind){
 const key=kind==='expense'?'saveExpense':kind==='debt'?'saveDebt':'setIncome';
 return sheet.querySelector(`button[onclick*="${key}"]`);
}
function enhance(){
 ensureStyle();
 const sheet=document.querySelector('#modal:not(.hidden) .sheet');if(!sheet||sheet.dataset.aryFast134==='1')return;
 const kind=formKind(sheet);if(!kind)return;
 sheet.dataset.aryFast134='1';sheet.classList.add('ary134fast');
 const fields=orderedFields(sheet,kind),save=primary(sheet,kind);if(save)save.classList.add('ary134save');
 fields.forEach((el,i)=>{
   if(el.tagName==='INPUT')el.setAttribute('enterkeyhint',i===fields.length-1?'done':'next');
   if(el.tagName==='INPUT'&&['number','text','tel'].includes((el.type||'text').toLowerCase())&&(el.id==='b'||el.id==='m'||el.id==='a'||el.id==='inc')){
     el.addEventListener('focus',()=>{try{el.select()}catch{}},{once:true});
   }
 });
 sheet.addEventListener('keydown',e=>{
   if(e.key!=='Enter'||e.isComposing)return;
   if(e.target?.tagName==='TEXTAREA')return;
   const current=fields.indexOf(e.target),force=e.ctrlKey||e.metaKey;
   if(force&&save){e.preventDefault();save.click();return}
   if(current<0)return;
   const next=fields.slice(current+1).find(visible);
   if(next){e.preventDefault();next.focus();return}
   if(save){e.preventDefault();save.click()}
 });
 const first=fields.find(el=>String(el.value??'').trim()==='')||fields[0];
 if(first)setTimeout(()=>{if(document.querySelector('#modal:not(.hidden) .sheet')===sheet&&!sheet.contains(document.activeElement))try{first.focus({preventScroll:true})}catch{first.focus()}},40);
}
const baseModal=window.modal;
if(typeof baseModal==='function'&&!baseModal._aryFast134){
 const wrapped=function(){const out=baseModal.apply(this,arguments);requestAnimationFrame(enhance);return out};wrapped._aryFast134=true;window.modal=wrapped;
}
document.addEventListener('click',()=>requestAnimationFrame(enhance),{capture:true});
ensureStyle();requestAnimationFrame(enhance);
})();

// V139 — "Entendido" advances the correct automatic guide branch instead of ending the tour.




;
// Source: fast-navigation-v137.js
(()=>{
'use strict';
function guideActive(){
 try{return !!window.aryFullGuideStatus125?.()?.active}catch{return !!document.querySelector('.ary125cloud,.ary125final,.ary126node')}
}
function modalOpen(){
 const m=document.getElementById('modal');
 return !!m&&!m.classList.contains('hidden')&&m.offsetParent!==null;
}
// A repeated route is a no-op only when the state that was painted is unchanged.
// Locale/theme and committed state changes must still repaint the same screen.
const signature=()=>{try{return JSON.stringify([s,profile])}catch{return null}};
let painted=signature();
const baseRender=window.render;
window.render=function(){const out=baseRender.apply(this,arguments);painted=signature();return out};
const unchanged=()=>{const current=signature();return current!==null&&current===painted};
const baseGo=window.go;
if(typeof baseGo==='function'&&!baseGo._aryFastNav137){
 const wrapped=function(route){
   if(guideActive())return baseGo.apply(this,arguments);
   const dest=typeof route==='string'?route:'';
   // Same-screen navigation is intentionally a no-op. Locale/data setters render explicitly,
   // avoiding duplicate paints that can detach buttons while a user is tapping them.
   if(dest&&typeof screen==='string'&&dest===screen&&!modalOpen()&&unchanged())return false;
   return baseGo.apply(this,arguments);
 };
 wrapped._aryFastNav137=true;
 window.go=wrapped;
}
// V164: do not intercept click events in capture phase. Native button taps are more reliable,
// especially on iOS/Safari, and the same-screen guard above prevents redundant navigation.
window.aryFastNavigation137={active:true,captureGuard:false};
})();

// V138 — preserve recurrence/date/source metadata in late atomic expense saves.




;
// Source: expense-recurrence-integrity-v138.js
(()=>{
'use strict';
const frequencies=['daily','every_2_days','every_3_days','every_4_days','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'];
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

window.saveExpense=function(id){
 const name=String(document.getElementById('n')?.value||'').trim();
 const raw=String(document.getElementById('b')?.value??'').trim();
 const value=amount(raw);
 const cat=String(document.getElementById('c')?.value||'Variable');
 if(!name||raw===''||!Number.isFinite(value)||value<=0){if(typeof toast==='function')toast(t().bad);return false;}

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
 if((document.getElementById('dateEnabled-edate')?.checked&&!date)||!validDate(date)){if(typeof toast==='function')toast(t().badRecurrence);return false;}
 // A manually selected expense date is optional.


 const sourceExpenseId=sourcePending!=null&&sourcePending!==''?sourcePending:existing?.sourceExpenseId;
 const icon=typeof iconFor==='function'?iconFor(name,cat):existing?.icon;

 if(!commit(next=>{
   if(!Array.isArray(next.expenses))next.expenses=[];
   if(editing){
     const item=next.expenses.find(x=>String(x.id)===String(id));
     if(!item)return;
     item.name=name;if(item.amount!==value){delete item.amountText197;delete item.approximate197;}item.amount=value;item.cat=cat;
     if(icon)item.icon=icon;
     if(frequencyField){item.frequency=frequency;if(frequency!=='once')delete item.sourceExpenseId;}
     else if(item.frequency==null)item.frequency='once';
     if(dateField){if(!date&&existing?.date)item.accountedDate197=existing.date;item.date=date;}
     else if(item.date==null)item.date='';
     if(frequency==='once'&&sourceExpenseId!=null&&sourceExpenseId!=='')item.sourceExpenseId=sourceExpenseId;
   }else{
     const item={
       id:uniqueId(next.expenses,next.debts,next.payments,next.calendarEvents),
       name,amount:value,cat,
       date,
       recordedAt197:today(),
       frequency
     };
     if(icon)item.icon=icon;
     if(frequency==='once'&&sourceExpenseId!=null&&sourceExpenseId!=='')item.sourceExpenseId=sourceExpenseId;
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




;
// Source: mobile-performance-v144.js
(()=>{
'use strict';
const MOBILE=()=>window.matchMedia?.('(max-width: 820px), (pointer: coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const STYLE='aryMobilePerformanceStyle144';
let progressTimer=0,progressVisit=0,lastScreen=typeof screen==='string'?screen:'';

function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
body #app .progressHeading110>b{font-size:clamp(24px,5.7vw,34px)!important;line-height:1.12!important;font-weight:850!important;letter-spacing:-.02em}
body #app .progressTips110.ary144hide{opacity:0!important;transform:scale(.96)!important;pointer-events:none!important;visibility:hidden!important}
body #app .progressTips110{transition:opacity .18s ease,transform .18s ease!important}
@media(max-width:820px),(pointer:coarse){
 html.aryGuideLite144 .ary125shade{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important;background:rgba(2,6,18,.86)!important}
 html.aryGuideLite144 .ary125focus{animation:none!important;transition:none!important;box-shadow:0 0 0 3px rgba(98,221,255,.16)!important;border-width:2px!important}
 html.aryGuideLite144 .ary125cloud,html.aryGuideLite144 .ary126node.ary125cloud{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important;box-shadow:0 12px 34px rgba(0,0,0,.34)!important;background:#172541!important;color:#f2f8ff!important}
 html.aryGuideLite144 .ary125cloud p{color:#bdd0e8!important}
 html.aryGuideLite144 .ary127section{background:#203858!important;color:#bfefff!important;box-shadow:none!important}
 html.aryGuideLite144.ary-light .ary125cloud,html.aryGuideLite144 .ary-light .ary125cloud{background:linear-gradient(145deg,#fff,#f1f6ff)!important;color:#172641!important;border-color:#81cfdf!important;box-shadow:0 12px 30px rgba(39,62,103,.22)!important}
 html.aryGuideLite144.ary-light .ary125cloud p,html.aryGuideLite144 .ary-light .ary125cloud p{color:#60738c!important}
 html.aryGuideLite144.ary-light .ary127section,html.aryGuideLite144 .ary-light .ary127section{background:#e8f8ff!important;color:#235b74!important;border-color:#b9e7f1!important}
 html.aryGuideLite144 .ary127countdown,html.aryGuideLite144 .ary130link,html.aryGuideLite144 .ary131transition{display:none!important}
 html.aryGuideLite144 #aryGuideBlock127{touch-action:none!important}
 html.aryGuideLite144 .ary140cancelTop{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideLite144 .ary125cloud .ary125actions{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideLite144 .aryGuide94{display:none!important}
 html.aryGuideLite144 *{scroll-behavior:auto!important}
}
`;
 document.head.appendChild(st);
}

function guideActive(){try{return !!window.aryFullGuideStatus125?.()?.active}catch{return false}}
function syncLite(){
 const root=document.documentElement;
 if(MOBILE()&&guideActive())root.classList.add('aryGuideLite144');
 else root.classList.remove('aryGuideLite144');
}

function progressCopy(){
 const l=s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
 return l==='en'?'Your progress':l==='pt'?'Seu progresso':'Tu avance';
}
function polishProgress(){
 if(typeof screen!=='string'||screen!=='progress')return;
 const heading=document.querySelector('#app .progressHeading110>b');
 if(heading)heading.textContent=progressCopy();
 const tips=document.querySelector('#app .progressTips110');
 if(tips&&tips.dataset.ary144!=='1'){
   tips.dataset.ary144='1';
   tips.classList.remove('ary144hide');
   const token=progressVisit;
   clearTimeout(progressTimer);
   progressTimer=setTimeout(()=>{if(token===progressVisit&&typeof screen==='string'&&screen==='progress')document.querySelector('#app .progressTips110')?.classList.add('ary144hide')},3000);
 }
}
function onScreenChange(){
 const current=typeof screen==='string'?screen:'';
 if(current!==lastScreen){
   if(current==='progress'){progressVisit++;clearTimeout(progressTimer)}
   else clearTimeout(progressTimer);
   lastScreen=current;
 }
 syncLite();
 requestAnimationFrame(polishProgress);
}

function hook(name){
 const fn=window[name];if(typeof fn!=='function'||fn._ary144)return;
 const wrapped=function(){const out=fn.apply(this,arguments);requestAnimationFrame(onScreenChange);return out};
 wrapped._ary144=true;window[name]=wrapped;
}
ensureStyle();
hook('render');hook('go');
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,()=>requestAnimationFrame(syncLite),{passive:true});
const guideStart=window.aryStartFullGuide125;
if(typeof guideStart==='function'&&!guideStart._ary144){const w=function(){const out=guideStart.apply(this,arguments);requestAnimationFrame(syncLite);return out};w._ary144=true;window.aryStartFullGuide125=w}
const guideFinish=window.aryFullGuideFinish125;
if(typeof guideFinish==='function'&&!guideFinish._ary144){const w=function(){const out=guideFinish.apply(this,arguments);requestAnimationFrame(syncLite);return out};w._ary144=true;window.aryFullGuideFinish125=w}
if(typeof screen==='string'&&screen==='progress')progressVisit++;
onScreenChange();
window.aryMobilePerformance144={mobile:MOBILE,sync:()=>{syncLite();polishProgress()}};
})();

// V147 — adaptive performance profile for the whole application.




;
// Source: performance-stability-v147.js
(()=>{
'use strict';
const STYLE='aryPerformanceStabilityStyle147';
const root=document.documentElement;
const mqCoarse=window.matchMedia?.('(pointer:coarse)');
const mqSmall=window.matchMedia?.('(max-width:820px)');
const mqReduced=window.matchMedia?.('(prefers-reduced-motion:reduce)');

function profile(){
 const cores=Number(navigator.hardwareConcurrency)||8;
 const memory=Number(navigator.deviceMemory)||8;
 const mobile=!!(mqCoarse?.matches||mqSmall?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||''));
 const reduced=!!mqReduced?.matches;
 const constrained=reduced||memory<=4||cores<=4||(mobile&&cores<=6);
 return {mobile,reduced,constrained,cores,memory};
}
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
html.aryPerfBalanced147 .ary125shade,html.aryPerfBalanced147 .ary125cloud{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
html.aryPerfLite147 .waves65::before,html.aryPerfLite147 .waves65::after,html.aryPerfLite147 .signoutWave65::before,
html.aryPerfLite147 .seasonBackdrop71 *,html.aryPerfLite147 .aurora{animation:none!important}
html.aryPerfLite147 .seasonArt71{filter:none!important}
html.aryPerfLite147 #app .card,html.aryPerfLite147 #nav,html.aryPerfLite147 #modal .sheet{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
html.aryPerfLite147 #app *,html.aryPerfLite147 #nav *,html.aryPerfLite147 #modal *{scroll-behavior:auto!important}
html.aryPerfLite147 .ary125focus{animation:none!important;box-shadow:0 0 0 3px rgba(98,221,255,.16)!important}
html.aryPerfPaused147 *{animation-play-state:paused!important}
@media(prefers-reduced-motion:reduce){html *{scroll-behavior:auto!important}}
`;
 document.head.appendChild(st);
}
function apply(){
 ensureStyle();
 const p=profile();
 root.classList.toggle('aryPerfBalanced147',p.mobile);
 root.classList.toggle('aryPerfLite147',p.constrained);
 root.classList.toggle('aryPerfPaused147',document.visibilityState==='hidden');
 root.dataset.aryPerf147=p.constrained?'lite':p.mobile?'balanced':'full';
 return p;
}
function idle(fn){
 if('requestIdleCallback'in window)return requestIdleCallback(fn,{timeout:1200});
 return setTimeout(fn,160);
}
let raf=0;
function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(apply)}
for(const m of [mqCoarse,mqSmall,mqReduced])m?.addEventListener?.('change',schedule);
window.addEventListener('resize',schedule,{passive:true});
document.addEventListener('visibilitychange',()=>{apply();if(document.visibilityState==='visible')idle(()=>window.aryMobilePerformance144?.sync?.())});
window.addEventListener('pageshow',schedule,{passive:true});
apply();
window.aryPerformance147={profile,apply};
})();

// V148 — while the guide is active on mobile, use an ultra-light rendering path.




;
// Source: performance-paint-v151.js
(()=>{
'use strict';
const STYLE='aryPerformancePaintStyle151';
const root=document.documentElement;
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const guideActive=()=>{try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}};
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
@media(max-width:820px),(pointer:coarse){
 html.aryPerfLite147:not(.aryPaintGuide151) #app .card{box-shadow:none!important}
 html.aryPerfLite147:not(.aryPaintGuide151) #app .tap45,
 html.aryPerfLite147:not(.aryPaintGuide151) #app .btn{transition:none!important}
}
/* Click reliability: hidden modals must never receive taps, even if another stylesheet changes display. */
#modal.hidden{pointer-events:none!important}
#modal:not(.hidden){pointer-events:auto}
`;
 document.head.appendChild(st);
}
function sync(){
 ensureStyle();
 const p=window.aryPerformance147?.profile?.();
 const use=mobile()||!!p?.constrained;
 root.classList.toggle('aryPaint151',use);
 root.classList.toggle('aryPaintGuide151',guideActive());
}
function wrap(name){const fn=window[name];if(typeof fn!=='function'||fn._ary151)return;const w=function(){const out=fn.apply(this,arguments);requestAnimationFrame(sync);return out};w._ary151=true;window[name]=w}
for(const name of ['render','go','aryStartFullGuide125','aryFullGuideNext125','aryFullGuideBack125','aryFullGuideFinish125'])wrap(name);
for(const ev of ['resize','orientationchange','pageshow'])window.addEventListener(ev,()=>requestAnimationFrame(sync),{passive:true});
document.addEventListener('visibilitychange',sync);
sync();
window.aryPerformancePaint151={sync,interactivePaintSafe:true};
})();

// V154 — keep Home debt progress aligned with the real payment ledger.


// V155 — validate real calendar dates and keep calendar writes atomic.


// V184 — reject invalid routes and load the stale-guide transition repair fresh.




;
// Source: home-progress-integrity-v154.js
(()=>{
'use strict';
const STYLE='aryHomeProgressStyle166';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const COPY={
 es:{title:'Tu progreso hacia la libertad financiera',start:'Deuda inicial reconstruida',remaining:'Saldo restante',paid:'Has pagado',empty:'Registra una deuda o un pago para empezar a mover este progreso.',open:'Ver progreso ›'},
 en:{title:'Your progress toward financial freedom',start:'Reconstructed starting debt',remaining:'Remaining balance',paid:'You have paid',empty:'Add a debt or payment to start moving this progress.',open:'View progress ›'},
 pt:{title:'Seu progresso rumo à liberdade financeira',start:'Dívida inicial reconstruída',remaining:'Saldo restante',paid:'Você pagou',empty:'Adicione uma dívida ou pagamento para começar a mover este progresso.',open:'Ver progresso ›'}
};
const tx=()=>COPY[lang()];
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
.homeTruth29 .ring{flex:0 0 91px;background:conic-gradient(#12dfff 0 var(--p1,0deg),#684dff var(--p1,0deg) var(--p2,0deg),#ff31b5 var(--p2,0deg) var(--p3,0deg),#ffc233 var(--p3,0deg) var(--p4,0deg),rgba(120,139,170,.20) var(--p4,0deg) 360deg)!important;box-shadow:0 0 20px rgba(38,201,255,.28)!important}
.homeTruth29 .ring:after{background:#0a1b3b!important}
.ary-light .homeTruth29 .ring:after{background:#f8fbff!important}
.homeTruth29 .ring b{color:inherit!important;-webkit-text-fill-color:currentColor!important}
`;
 document.head.appendChild(st);
}
function real(){
 try{
  if(typeof window.aryRealDebtProgress54==='function')return window.aryRealDebtProgress54();
 }catch{}
 const current=(s.debts||[]).reduce((sum,d)=>sum+(Number(d.balance)||0),0);
 const paid=(s.payments||[]).reduce((sum,p)=>sum+(Number(p.amount)||0),0);
 const start=current+paid;
 return{current,paid,start,pct:start>0?Math.max(0,Math.min(100,Math.round(paid/start*100))):0};
}
window.aryHomeProgress72=function(){
 ensureStyle();
 const x=tx(),r=real();
 const current=Number(r?.current)||0,paid=Number(r?.paid)||0,start=Number(r?.start)||current+paid;
 const rawPct=Number(r?.pct),pct=Number.isFinite(rawPct)?Math.max(0,Math.min(100,Math.round(rawPct))):(start>0?Math.max(0,Math.min(100,Math.round(paid/start*100))):0);
 const p1=(pct*3.6*.28).toFixed(2),p2=(pct*3.6*.52).toFixed(2),p3=(pct*3.6*.75).toFixed(2),p4=(pct*3.6).toFixed(2);
 const hidden=typeof window.aryHidden72==='function'&&aryHidden72();
 const hasDebt=(s.debts||[]).length>0;
 const dest=hasDebt?'progress':'debts';
 return `<button type="button" class="card full heroCard homeTruth29 homeTap51" onclick="go('${dest}')"><b>${x.title}</b><div class="progressBox"><div class="ring" style="--p1:${p1}deg;--p2:${p2}deg;--p3:${p3}deg;--p4:${p4}deg"><b>${hidden?'••••':pct+'%'}</b></div><div><span class="muted">${x.remaining}</span><div class="kpi">${money(current)}</div><span class="muted">${x.paid}</span><div class="kpi good">${money(paid)}</div></div></div>${start>0?`<small class="muted">${x.start}: ${money(start)}</small>`:`<p class="muted">${x.empty}</p>`}<small>${x.open}</small></button>`;
};
try{localStorage.removeItem('ary-home-baseline-v29')}catch{}
ensureStyle();
if(typeof screen!=='undefined'&&screen==='home'&&typeof window.render==='function')requestAnimationFrame(()=>window.render());
window.aryHomeProgressIntegrity154={real};
})();



;
// Source: calendar-integrity-v155.js
(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{invalidDate:'Escribe una fecha válida.',invalidEvent:'Revisa el nombre, la fecha y el monto del movimiento.',saveError:'No se pudo guardar. Tus datos siguen como antes.',deleteConfirm:'¿Eliminar este movimiento del calendario?',paymentLedger:'Los pagos de deuda se editan desde Tu progreso para mantener el saldo y el historial sincronizados.'},
 en:{invalidDate:'Enter a valid date.',invalidEvent:'Check the event name, date and amount.',saveError:'Could not save. Your data remains unchanged.',deleteConfirm:'Delete this calendar event?',paymentLedger:'Debt payments are edited from Your progress so the balance and history stay synchronized.'},
 pt:{invalidDate:'Digite uma data válida.',invalidEvent:'Revise o nome, a data e o valor do movimento.',saveError:'Não foi possível salvar. Seus dados continuam como antes.',deleteConfirm:'Excluir este movimento do calendário?',paymentLedger:'Pagamentos de dívida são editados em Seu progresso para manter saldo e histórico sincronizados.'}
};
const t=()=>C[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
function validDate(value){
 const v=String(value||'');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
 const [y,m,d]=v.split('-').map(Number),date=new Date(y,m-1,d);
 return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d;
}
window.aryValidCalendarDate155=validDate;
const nextId=()=>typeof window.aryUniqueId120==='function'?aryUniqueId120(s.debts||[],s.expenses||[],s.payments||[],s.calendarEvents||[]):Date.now();

const previousCalendarDate=window.aryCalendarDate60;
window.aryCalendarDate60=function(value){
 const date=String(value||'');
 if(!validDate(date))return false;
 return typeof previousCalendarDate==='function'?previousCalendarDate.call(this,date):false;
};

window.arySaveDue35=function(value){
 const date=String(value||'');
 if(!validDate(date)){if(typeof toast==='function')toast(t().invalidDate);return false;}
 const id=Number(document.getElementById('calDebt35')?.value);
 if(!Number.isFinite(id)||(s.debts||[]).every(d=>Number(d.id)!==id))return false;
 if(!commit(next=>{const debt=(next.debts||[]).find(d=>Number(d.id)===id);if(!debt)throw new Error('missing_debt');debt.due=date;})){
   if(typeof toast==='function')toast(t().saveError);return false;
 }
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const kind=String(document.getElementById('cevType36')?.value||'reminder');
 if(kind==='payment')return typeof previousSaveEvent==='function'?previousSaveEvent.apply(this,arguments):false;
 const date=String(document.getElementById('cevDate36')?.value||'');
 const name=String(document.getElementById('cevName36')?.value||'').trim();
 const raw=String(document.getElementById('cevAmount36')?.value||'').trim();
 const amount=raw===''?0:parseAmount(raw);
 const note=String(document.getElementById('cevNote36')?.value||'').trim();
 const frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(t().invalidEvent);return false;}
 const editing=id!==null&&id!==undefined;
 const eventId=editing?id:nextId();
 const icon=kind==='income'?'🟢':'🔔';
 if(editing&&!(s.calendarEvents||[]).some(e=>String(e.id)===String(id)))return false;
 if(!commit(next=>{
   if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];
   let event=editing?next.calendarEvents.find(e=>String(e.id)===String(id)):null;
   if(!event){event={id:eventId};next.calendarEvents.push(event);}
   Object.assign(event,{date:date||'',name,amount,kind,note,icon,frequency});
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(date&&typeof window.aryCalendarDate60==='function')window.aryCalendarDate60(date);
 else if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious155=previousSaveEvent;

window.aryDeleteEvent36=function(id){
 const event=(s.calendarEvents||[]).find(e=>String(e.id)===String(id));
 if(!event)return false;
 if(event.kind==='payment'){if(typeof toast==='function')toast(t().paymentLedger);return false;}
 if(typeof window.aryAskDelete68==='function'){aryAskDelete68('event',id);return true;}
 if(!confirm(t().deleteConfirm))return false;
 if(!commit(next=>{next.calendarEvents=(next.calendarEvents||[]).filter(e=>String(e.id)!==String(id));})){
   if(typeof toast==='function')toast(t().saveError);return false;
 }
 if(typeof render==='function')render();
 return true;
};
window.aryCalendarIntegrity155={validDate};
})();



;
// Source: navigation-integrity-v163.js
(()=>{
'use strict';
const oldGo=window.go;
const oldBack=window.back;
const copy=()=>s?.locale==='en-US'?'That section is not available.':s?.locale==='pt-BR'?'Essa seção não está disponível.':'Esa sección no está disponible.';
const valid=name=>typeof screens==='object'&&screens!==null&&Object.prototype.hasOwnProperty.call(screens,String(name||''));

if(typeof oldGo==='function'&&!oldGo._ary163){
 const guardedGo=function(name){
  const target=String(name||'');
  if(!valid(target)){
   if(typeof toast==='function')toast(copy());
   return false;
  }
  return oldGo.call(this,target);
 };
 guardedGo._ary163=true;
 guardedGo._aryPrevious163=oldGo;
 window.go=guardedGo;
}

if(typeof oldBack==='function'&&!oldBack._ary163){
 const guardedBack=function(){
  try{
   if(Array.isArray(appNavigation55)){
    // Back may skip duplicate current routes before reading the next entry.
    // Remove invalid entries at every depth, not only at the top.
    for(let i=appNavigation55.length-1;i>=0;i--)if(!valid(appNavigation55[i]))appNavigation55.splice(i,1);
   }
  }catch{}
  return oldBack.apply(this,arguments);
 };
 guardedBack._ary163=true;
 guardedBack._aryPrevious163=oldBack;
 window.back=guardedBack;
}

window.aryNavigationIntegrity163={valid};
})();

// V184 — automatic first-use guidance yields to interaction and clears stale step visuals.




;
// Source: guide-interaction-safety-v180.js
(()=>{
'use strict';
let userAuto=false,internalToggle=false;
const status=()=>{try{return window.aryFullGuideStatus125?.()||null}catch{return null}};
const rawToggle=window.aryFullGuideToggleAuto125;

function pauseAuto(){
 const st=status();
 if(!st?.active||!st.automatic||typeof rawToggle!=='function')return false;
 internalToggle=true;
 try{rawToggle()}finally{internalToggle=false}
 userAuto=false;
 return true;
}

if(typeof rawToggle==='function'&&!rawToggle._ary180){
 const wrapped=function(){
  const out=rawToggle.apply(this,arguments);
  if(!internalToggle)userAuto=!!status()?.automatic;
  return out;
 };
 wrapped._ary180=true;
 wrapped._ary180raw=rawToggle;
 window.aryFullGuideToggleAuto125=wrapped;
}

// V125 clears old visuals before routing; no second wrapper may remove its new card.
function guideControl(target){return target?.closest?.('.ary125cloud,.ary140cancelTop,.ary139confirm')}
function userInteraction(event){
 const st=status();
 if(!st?.active||!st.automatic||guideControl(event?.target))return;
 // Only genuine interaction with the application pauses automatic progression.
 // Guide rendering, route painting and programmatic scrolling must never pause it.
 pauseAuto();
}

for(const ev of ['pointerdown','touchstart','input']){
 document.addEventListener(ev,userInteraction,{capture:true,passive:ev!=='input'});
}
window.addEventListener('wheel',userInteraction,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden&&status()?.active&&status()?.automatic)pauseAuto();
});

// WebKit can coalesce rapid fill/input work around modal enhancement. Keep the
// live debt/expense icon tied directly to the current field value as a fallback.
document.addEventListener('input',event=>{
 const input=event.target;
 if(input?.id!=='n'||!document.getElementById('recordIcon96')||typeof window.aryPreviewIcon96!=='function')return;
 const debt=!!document.querySelector('#modal:not(.hidden) button[onclick*="saveDebt"]');
 window.aryPreviewIcon96(input,debt?'deuda':undefined);
},{capture:true});

// V125 owns guide start, route changes, rendering and automatic scheduling.
// This layer only pauses for genuine application interaction and clears a stale
// visual between step changes; it never changes guide index, route or completion.
window.aryGuideInteractionSafety180={
 status:()=>({...status(),userAuto}),
 pause:()=>pauseAuto()
};
})();


