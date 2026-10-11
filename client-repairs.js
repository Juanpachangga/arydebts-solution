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
// Source: guided-tour-v116.js
(()=>{
const GUIDE_KEY='arydebts-guide-v116';
const styles=`
.aryGuideMask116{position:fixed;inset:0;z-index:9998;background:linear-gradient(180deg,rgba(2,7,19,.14),rgba(2,7,19,.48));pointer-events:none}
.aryGuide116{position:fixed;z-index:9999;left:50%;bottom:max(86px,calc(env(safe-area-inset-bottom) + 74px));transform:translateX(-50%);width:min(560px,calc(100vw - 24px));padding:17px;border-radius:22px;border:1px solid rgba(92,225,255,.38);background:linear-gradient(145deg,rgba(12,27,54,.97),rgba(21,18,53,.97));box-shadow:0 22px 70px rgba(0,0,0,.5),inset 0 1px rgba(255,255,255,.08);color:#edf7ff;backdrop-filter:blur(18px)}
.aryGuideTop116{display:flex;gap:12px;align-items:flex-start}.aryGuideAvatar116{width:42px;height:42px;flex:0 0 42px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#31d9c4,#6a5cff);font-size:21px;box-shadow:0 8px 22px rgba(69,100,255,.28)}
.aryGuide116 h3{margin:0 0 5px;font-size:18px}.aryGuide116 p{margin:0;color:#b8c9df;line-height:1.5;font-size:13px}.aryGuideStep116{display:flex;gap:5px;margin:14px 0 12px}.aryGuideStep116 i{height:4px;flex:1;border-radius:20px;background:rgba(255,255,255,.12)}.aryGuideStep116 i.on{background:linear-gradient(90deg,#39dec4,#53cfff,#8268ff)}
.aryGuideActions116{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center}.aryGuideActions116 button{min-height:40px;border-radius:13px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.07);color:#eef7ff;padding:8px 12px;font-weight:750;cursor:pointer}.aryGuideActions116 .primary116{background:linear-gradient(135deg,#2bd8bb,#4cbcff,#765aff);border:0;color:white}.aryGuideActions116 .skip116{background:transparent;border:0;color:#91a5c4;font-size:12px}.aryGuideCount116{text-align:center;color:#7f91aa;font-size:11px}
body.ary-light .aryGuide116{background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(244,247,255,.98));color:#17233b;border-color:#91dce8;box-shadow:0 22px 60px rgba(44,72,110,.22)}body.ary-light .aryGuide116 p{color:#61728a}body.ary-light .aryGuideActions116 button{color:#233650;background:#fff;border-color:#d7e2ee}body.ary-light .aryGuideActions116 .primary116{color:#fff}body.ary-light .aryGuideActions116 .skip116{background:transparent;border:0;color:#728198}
@media(max-width:480px){.aryGuide116{bottom:max(78px,calc(env(safe-area-inset-bottom) + 68px));padding:14px;border-radius:19px}.aryGuide116 h3{font-size:16px}.aryGuide116 p{font-size:12px}.aryGuideActions116{grid-template-columns:auto 1fr auto}.aryGuideActions116 button{padding:7px 10px;font-size:12px}}
`;
const steps={
 es:[
  {route:'home',title:'👋 Bienvenido a tu centro financiero',text:'Aquí ves tu panorama general: progreso, ingresos, gastos, disponible y próximos pagos. Esta pantalla te ayuda a saber dónde estás antes de tomar decisiones.'},
  {route:'income',title:'💰 Tus ingresos',text:'Aquí registras cuánto recibes y con qué frecuencia. Arydebts convierte ese dato a una base mensual para alimentar tu plan y estimar tu margen.'},
  {route:'debts',title:'💳 Tus deudas',text:'Aquí agregas, editas y organizas cada deuda, su saldo, pago mínimo, fecha de vencimiento y APR. También puedes registrar pagos reales sin perder el historial.'},
  {route:'expenses',title:'🌸 Tus gastos',text:'Aquí registras gastos esenciales, variables y gastos hormiga. Mientras más reales sean estos datos, más útil será tu plan semanal.'},
  {route:'plan',title:'🧭 Tu plan',text:'Aquí Arydebts junta ingresos, gastos, pagos y mínimos para mostrarte qué debes proteger primero y cuánto margen estimado te queda.'},
  {route:'progress',title:'📈 Tu progreso',text:'Este apartado muestra cuánto has pagado de tus deudas usando pagos reales registrados. Así puedes ver tu avance sin porcentajes inventados.'},
  {route:'calendar',title:'📅 Tu calendario',text:'Aquí puedes ver vencimientos, pagos y eventos por fecha. Úsalo para anticiparte y no dejar que un pago importante te tome por sorpresa.'},
  {route:'assistant',title:'✦ Tu asistente personal',text:'Aquí puedes preguntar cómo usar Arydebts o pedir ayuda para entender tus números. El asistente te orienta sin cambiar tus registros automáticamente.'},
  {route:'assistant',title:'🎉 Terminaste la guía',text:'Espero haberte ayudado a entender Arydebts. Si te queda cualquier duda, pregúntame aquí. Estoy para acompañarte como tu asistente personal mientras organizas tus finanzas.'}
 ],
 en:[
  {route:'home',title:'👋 Welcome to your financial hub',text:'Here you see your overall picture: progress, income, expenses, available margin and upcoming payments. Use it to understand where you are before making decisions.'},
  {route:'income',title:'💰 Your income',text:'Record how much you receive and how often. Arydebts uses it to build the monthly planning baseline for your plan and estimated margin.'},
  {route:'debts',title:'💳 Your debts',text:'Add and manage each debt, balance, minimum payment, due date and APR. You can also record real payments while keeping the history.'},
  {route:'expenses',title:'🌸 Your expenses',text:'Record essential, variable and small recurring expenses. The more realistic these numbers are, the more useful your plan becomes.'},
  {route:'plan',title:'🧭 Your plan',text:'Arydebts combines income, expenses, debt payments and minimums to show what to protect first and your estimated remaining margin.'},
  {route:'progress',title:'📈 Your progress',text:'This section shows how much debt you have paid using real recorded payments, so your progress is based on actual data.'},
  {route:'calendar',title:'📅 Your calendar',text:'See due dates, payments and events by date so important payments do not catch you by surprise.'},
  {route:'assistant',title:'✦ Your personal assistant',text:'Ask how to use Arydebts or get help understanding your numbers. The assistant guides you without changing your records automatically.'},
  {route:'assistant',title:'🎉 You finished the guide',text:'I hope this helped you understand Arydebts. If you have any questions, ask me here. I am here to help you organize your finances one step at a time.'}
 ],
 pt:[
  {route:'home',title:'👋 Bem-vindo ao seu centro financeiro',text:'Aqui você vê seu panorama geral: progresso, renda, gastos, disponível e próximos pagamentos. Use esta tela para entender onde está antes de decidir.'},
  {route:'income',title:'💰 Sua renda',text:'Registre quanto recebe e com que frequência. O Arydebts usa esse dado como base mensal para seu plano e sua margem estimada.'},
  {route:'debts',title:'💳 Suas dívidas',text:'Adicione e organize cada dívida, saldo, pagamento mínimo, vencimento e APR. Você também pode registrar pagamentos reais mantendo o histórico.'},
  {route:'expenses',title:'🌸 Seus gastos',text:'Registre gastos essenciais, variáveis e pequenos gastos recorrentes. Quanto mais reais forem os dados, mais útil será seu plano.'},
  {route:'plan',title:'🧭 Seu plano',text:'O Arydebts reúne renda, gastos, pagamentos e mínimos para mostrar o que proteger primeiro e sua margem estimada.'},
  {route:'progress',title:'📈 Seu progresso',text:'Aqui você vê quanto já pagou das dívidas usando pagamentos reais registrados, sem porcentagens inventadas.'},
  {route:'calendar',title:'📅 Seu calendário',text:'Veja vencimentos, pagamentos e eventos por data para se antecipar aos compromissos importantes.'},
  {route:'assistant',title:'✦ Seu assistente pessoal',text:'Pergunte como usar o Arydebts ou peça ajuda para entender seus números. O assistente orienta sem alterar seus registros automaticamente.'},
  {route:'assistant',title:'🎉 Você terminou o guia',text:'Espero ter ajudado você a entender o Arydebts. Se tiver qualquer dúvida, pergunte aqui. Estou ao seu lado para organizar suas finanças passo a passo.'}
 ]
};
let active=false,index=0,automaticTimer=null;
const locale=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const list=()=>steps[locale()];
const done=()=>{try{return localStorage.getItem(GUIDE_KEY)==='done'}catch(e){return false}};
const markDone=()=>{try{localStorage.setItem(GUIDE_KEY,'done')}catch(e){}};
function ensureStyle(){if(document.getElementById('aryGuideStyle116'))return;const style=document.createElement('style');style.id='aryGuideStyle116';style.textContent=styles;document.head.appendChild(style)}
function removeGuide(){document.getElementById('aryGuide116')?.remove();document.getElementById('aryGuideMask116')?.remove()}
function renderGuide(){removeGuide();if(!active)return;ensureStyle();const items=list(),step=items[index];if(!step)return finish(false);const mask=document.createElement('div');mask.id='aryGuideMask116';mask.className='aryGuideMask116';document.body.appendChild(mask);const box=document.createElement('section');box.id='aryGuide116';box.className='aryGuide116';box.setAttribute('role','dialog');box.setAttribute('aria-live','polite');const final=index===items.length-1,back=index>0;box.innerHTML=`<div class="aryGuideTop116"><div class="aryGuideAvatar116">✦</div><div><h3>${step.title}</h3><p>${step.text}</p></div></div><div class="aryGuideStep116">${items.map((_,i)=>`<i class="${i<=index?'on':''}"></i>`).join('')}</div><div class="aryGuideActions116"><button type="button" ${back?'':'disabled style="opacity:.35"'} onclick="aryGuideBack116()">‹ ${locale()==='en'?'Back':locale()==='pt'?'Voltar':'Atrás'}</button><div><div class="aryGuideCount116">${index+1} / ${items.length}</div><button type="button" class="skip116" onclick="aryGuideSkip116()">${locale()==='en'?'Skip guide':locale()==='pt'?'Pular guia':'Saltar guía'}</button></div><button type="button" class="primary116" onclick="aryGuideNext116()">${final?(locale()==='en'?'Ask assistant':locale()==='pt'?'Perguntar ao assistente':'Preguntar al asistente'):(locale()==='en'?'Next ›':locale()==='pt'?'Próximo ›':'Siguiente ›')}</button></div>`;document.body.appendChild(box)}
function routeTo(i){const step=list()[i];if(!step)return;index=i;if(typeof go==='function'&&screen!==step.route)go(step.route);clearTimeout(automaticTimer);automaticTimer=setTimeout(renderGuide,20);if(screen===step.route)renderGuide()}
function start(force=false){if(active)return;if(!force&&done())return;if(!profile||!s?.onboarded)return;active=true;index=0;routeTo(0)}
function finish(openAssistant){active=false;markDone();removeGuide();if(openAssistant&&typeof go==='function')go('assistant')}
window.aryGuideNext116=()=>{const items=list();if(index>=items.length-1)return finish(true);routeTo(index+1)};
window.aryGuideBack116=()=>{if(index>0)routeTo(index-1)};
window.aryGuideSkip116=()=>finish(false);
window.aryStartGuide116=()=>{try{localStorage.removeItem(GUIDE_KEY)}catch(e){};active=false;start(true)};
window.aryGuideStatus116=()=>({active,index,completed:done(),steps:list().length});
const priorRender=window.render;
window.render=function(){const out=priorRender.apply(this,arguments);if(active)setTimeout(renderGuide,0);else if(!done()&&profile&&s?.onboarded&&screen==='home')setTimeout(()=>start(false),60);return out};
ensureStyle();
if(!done()&&profile&&s?.onboarded&&screen==='home')setTimeout(()=>start(false),120);
})();


;
// Source: guided-safety-v117.js
(()=>{
const LEGACY_GUIDE_KEY='arydebts-guide-v116';
try{localStorage.setItem(LEGACY_GUIDE_KEY,'done');window.aryGuideSkip116?.()}catch{}
const HIGHLIGHT_ID='aryGuideHighlightStyle117';
const selectors={
 home:['.heroCard','.homeTruth29','.grid .card'],
 income:['.card.full','.kpi'],
 debts:['.debtPulse33','.debtTarget33','.card.full'],
 expenses:['.card.full','.list'],
 plan:['.planHero34','.planPulse34','.card.full'],
 progress:['.progressBox','.card.full'],
 calendar:['.cal35','.calDetail35'],
 assistant:['.assistant58','.assistantIntro58']
};
function ensureHighlightStyle(){if(document.getElementById(HIGHLIGHT_ID))return;const style=document.createElement('style');style.id=HIGHLIGHT_ID;style.textContent=`
.aryGuideFocus117{position:relative!important;z-index:9999!important;box-shadow:0 0 0 3px rgba(83,207,255,.9),0 0 0 9px rgba(83,207,255,.16),0 20px 55px rgba(18,170,255,.2)!important;transition:box-shadow .22s ease,transform .22s ease!important;transform:translateZ(0) scale(1.008)!important}
body.ary-light .aryGuideFocus117{box-shadow:0 0 0 3px rgba(56,164,218,.75),0 0 0 9px rgba(56,164,218,.13),0 20px 45px rgba(61,109,160,.16)!important}
@media(max-width:480px){.aryGuideFocus117{transform:none!important}}
`;document.head.appendChild(style)}
function clearFocus(){document.querySelectorAll('.aryGuideFocus117').forEach(el=>el.classList.remove('aryGuideFocus117'))}
function currentRoute(){return typeof screen==='string'?screen:(location.hash||'').replace(/^#/,'')||'home'}
function applyFocus(){ensureHighlightStyle();clearFocus();if(!document.getElementById('aryGuide116'))return;const route=currentRoute(),list=selectors[route]||[];let el=null;for(const selector of list){el=document.querySelector(selector);if(el)break}if(el){el.classList.add('aryGuideFocus117');try{el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'})}catch(e){}}}
/* V116 is legacy. Do not observe every DOM mutation for its old spotlight engine. */
window.addEventListener('resize',()=>document.getElementById('aryGuide116')&&applyFocus(),{passive:true});

const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes. Inténtalo de nuevo.',deleteConfirm:'¿Eliminar este movimiento del calendario?'},
 en:{saveError:'Could not save. Your data remains unchanged. Try again.',deleteConfirm:'Delete this calendar event?'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes. Tente novamente.',deleteConfirm:'Excluir este movimento do calendário?'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const validDate=value=>typeof window.aryValidDate63==='function'?window.aryValidDate63(value):/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));

const previousSaveDue=window.arySaveDue35;
window.arySaveDue35=function(date){
 const id=Number(document.getElementById('calDebt35')?.value),debt=(s.debts||[]).find(d=>Number(d.id)===id);
 if(!debt||!validDate(date))return false;
 if(!commit(next=>{const target=(next.debts||[]).find(d=>Number(d.id)===id);if(!target)throw new Error('missing_debt');target.due=date;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveDue35._aryPrevious117=previousSaveDue;

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const date=String(document.getElementById('cevDate36')?.value||''),name=String(document.getElementById('cevName36')?.value||'').trim(),raw=String(document.getElementById('cevAmount36')?.value||'').trim(),kind=String(document.getElementById('cevType36')?.value||'reminder'),note=String(document.getElementById('cevNote36')?.value||'').trim(),frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 if(kind==='payment')return previousSaveEvent.apply(this,arguments);
 const amount=raw===''?0:(typeof parseNum==='function'?parseNum(raw):Number(raw));
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0)return previousSaveEvent.apply(this,arguments);
 const icon=kind==='income'?'🟢':'🔔',eventId=id?Number(id):Date.now();
 if(!commit(next=>{if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];const existing=id?next.calendarEvents.find(e=>Number(e.id)===Number(id)):null;const payload={id:eventId,date:date||'',name,amount,kind,note,icon,frequency};if(existing)Object.assign(existing,payload);else next.calendarEvents.push(payload);})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious117=previousSaveEvent;

const previousDeleteEvent=window.aryDeleteEvent36;
window.aryDeleteEvent36=function(id){
 const event=(s.calendarEvents||[]).find(e=>Number(e.id)===Number(id));
 if(!event)return false;
 if(event.kind==='payment')return previousDeleteEvent.apply(this,arguments);
 if(!confirm(t().deleteConfirm))return false;
 if(!commit(next=>{next.calendarEvents=(next.calendarEvents||[]).filter(e=>Number(e.id)!==Number(id));})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();
 return true;
};
window.aryDeleteEvent36._aryPrevious117=previousDeleteEvent;
})();


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
 if(!saveChange(next=>{next.onboarded=true;}))return false;
 if(typeof go==='function')go('home');return true;
};

window.saveSettings=function(){
 const greeting=String(document.getElementById('greet')?.value||'').trim();
 const locale=String(document.getElementById('loc')?.value||s.locale||'es-US');
 const currency=String(document.getElementById('cur')?.value||s.currency||'USD');
 if(!locales.includes(locale)||!validCurrency(currency)){if(typeof toast==='function')toast(t().invalidSettings);return false;}
 if(!saveChange(next=>{next.greeting=greeting;next.locale=locale;next.currency=currency;}))return false;
 try{localStorage.setItem('ary-lang',landingLang(locale))}catch{}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.moveNav=function(index,direction){
 const i=Number(index),d=Number(direction),order=Array.isArray(s.navOrder)?s.navOrder:[],j=i+d;
 if(!Number.isInteger(i)||!Number.isInteger(d)||i<0||i>=order.length||j<0||j>=order.length)return false;
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
const allowedCurrencies=new Set(['USD','COP','EUR','MXN','BRL','CAD','GBP','JPY']);
const allowedLocales=new Set(['es-US','en-US','pt-BR']);
const allowedNav=new Set(['home','debts','expenses','plan','more']);
const validDate=value=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return false;const [y,m,d]=String(value).split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d};
const finite=value=>Number.isFinite(Number(value));
const uniqueIds=list=>{const seen=new Set();for(const item of list||[]){if(!item||item.id==null)continue;const id=String(item.id);if(seen.has(id))throw new Error('duplicate');seen.add(id)}};
const t=()=>s?.locale==='en-US'?{import:'Import backup',hint:'Choose a JSON backup exported by Arydebts. Your current state is retained first.',confirm:'Replace your current Arydebts data with this backup?',done:'Backup imported',invalid:'That file is not a valid Arydebts backup.',save:'The backup is valid, but Arydebts could not safely retain your current state. Nothing was replaced.'}:s?.locale==='pt-BR'?{import:'Importar backup',hint:'Escolha um backup JSON exportado pelo Arydebts. Seu estado atual será preservado primeiro.',confirm:'Substituir seus dados atuais do Arydebts por este backup?',done:'Backup importado',invalid:'Esse arquivo não é um backup válido do Arydebts.',save:'O backup é válido, mas o Arydebts não conseguiu preservar com segurança seu estado atual. Nada foi substituído.'}:{import:'Importar copia',hint:'Elige una copia JSON exportada por Arydebts. Primero conservaremos tu estado actual.',confirm:'¿Reemplazar tus datos actuales de Arydebts con esta copia?',done:'Copia importada',invalid:'Ese archivo no es una copia válida de Arydebts.',save:'La copia es válida, pero Arydebts no pudo conservar con seguridad tu estado actual. No se reemplazó nada.'};
function rawStateFromFile(parsed){return parsed?.state&&typeof parsed.state==='object'?parsed.state:parsed?.data&&typeof parsed.data==='object'?parsed.data:parsed}
function validateState(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('invalid');
 const next=typeof aryNormalizeState104==='function'?aryNormalizeState104(raw):structuredClone(raw);
 next.debts=Array.isArray(next.debts)?next.debts:[];next.expenses=Array.isArray(next.expenses)?next.expenses:[];next.payments=Array.isArray(next.payments)?next.payments:[];next.calendarEvents=Array.isArray(next.calendarEvents)?next.calendarEvents:[];next.goals=Array.isArray(next.goals)?next.goals:[];
 if(!allowedCurrencies.has(String(next.currency||'')))next.currency='USD';
 if(!allowedLocales.has(String(next.locale||'')))next.locale='es-US';
 next.navOrder=[...new Set((Array.isArray(next.navOrder)?next.navOrder:[]).filter(x=>allowedNav.has(String(x))))];for(const x of ['home','debts','expenses','plan','more'])if(!next.navOrder.includes(x))next.navOrder.push(x);
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
 if(!onboarding&&!confirm(t().deleteExpense))return false;
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
(()=>{
'use strict';
const KEY='arydebts-guide-v125',OLD_KEY='arydebts-guide-v116';
const AUTO_MS=5200;
const MOBILE=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const TXT={
 es:{back:'Atrás',next:'Entendido',skip:'Saltar guía',pause:'Pausar',play:'Automático',finish:'Terminar',count:'Paso',restart:'☁️ Repetir guía completa',doneTitle:'🎉 Ya conoces Arydebts',doneText:'Ya puedes empezar. Si tienes dudas, pregunta al Asistente ARY.'},
 en:{back:'Back',next:'Got it',skip:'Skip guide',pause:'Pause',play:'Auto',finish:'Finish',count:'Step',restart:'☁️ Replay full guide',doneTitle:'🎉 You know Arydebts now',doneText:'You finished the tour. Whenever you have questions, open Arydebts Assistant for help understanding your numbers and each tool.'},
 pt:{back:'Voltar',next:'Entendi',skip:'Pular guia',pause:'Pausar',play:'Automático',finish:'Concluir',count:'Passo',restart:'☁️ Repetir guia completo',doneTitle:'🎉 Agora você conhece o Arydebts',doneText:'Você terminou o tour. Quando tiver dúvidas, abra o Assistente Arydebts para entender seus números e cada ferramenta.'}
};
const copy=()=>TXT[lang()];
const S={
 es:[
  ['home',['.homeTruth29','.heroCard'],'🏠 Tu resumen','Aquí ves tu dinero y cuánto has pagado.'],
  ['income',['.card.full'],'💰 Ingresos','Agrega cuánto recibes y cada cuánto te pagan.'],
  ['expenses',['.addExpense67','.expenseRecords185'],'🧾 Gastos','Agrega tus gastos para saber cuánto te queda.'],
  ['debts',['.card.full button.primary','.rowActions','.debtPulse33'],'💳 Deudas y pagos','Agrega tus deudas. Registra cada pago cuando lo hagas.']
 ],
 en:[
  ['home',['.homeTruth29','.heroCard'],'🏠 Your overview','See your money and how much you have paid.'],
  ['income',['.card.full'],'💰 Income','Add how much you receive and how often.'],
  ['expenses',['.addExpense67','.expenseRecords185'],'🧾 Expenses','Add your expenses to see what you have left.'],
  ['debts',['.card.full button.primary','.rowActions','.debtPulse33'],'💳 Debts and payments','Add your debts. Record each payment after making it.']
 ],
 pt:[
  ['home',['.homeTruth29','.heroCard'],'🏠 Seu resumo','Veja seu dinheiro e quanto já pagou.'],
  ['income',['.card.full'],'💰 Renda','Adicione quanto recebe e com que frequência.'],
  ['expenses',['.addExpense67','.expenseRecords185'],'🧾 Gastos','Adicione seus gastos para saber quanto sobra.'],
  ['debts',['.card.full button.primary','.rowActions','.debtPulse33'],'💳 Dívidas e pagamentos','Adicione suas dívidas. Registre cada pagamento realizado.']
 ]
};
let routing=false,active=false,index=0,auto=false,timer=0,target=null,renderTimer=0,renderRaf=0,paintTimer=0,renderToken=0,startTimer=0;
const steps=()=>S[lang()]||S.es;
const completed=()=>{try{return localStorage.getItem(KEY)==='done'}catch{return false}};
const markDone=()=>{try{localStorage.setItem(KEY,'done')}catch{}};

function css(){
 if(document.getElementById('aryFullGuideStyle125'))return;
 const st=document.createElement('style');st.id='aryFullGuideStyle125';st.textContent=`
.ary125shade{position:fixed;z-index:10000;background:rgba(2,6,18,.86);backdrop-filter:blur(1.5px);pointer-events:none;transition:none}
.ary125focus{position:fixed;z-index:10001;border:3px solid #62ddff;border-radius:20px;box-shadow:0 0 0 5px rgba(89,221,255,.15),0 0 38px rgba(85,209,255,.65);pointer-events:none;transition:none}
.ary125navShield{position:fixed;z-index:10002;background:rgba(2,6,18,.86);pointer-events:none;border-radius:24px}
.ary125cloud{position:fixed;z-index:10003;width:min(410px,calc(100vw - 24px));padding:16px;border:1px solid rgba(124,226,255,.5);border-radius:26px;background:linear-gradient(145deg,rgba(16,28,58,.98),rgba(31,23,67,.98));box-shadow:0 24px 80px rgba(0,0,0,.55),0 0 36px rgba(69,193,255,.14);color:#f2f8ff;transition:none;max-height:min(360px,calc(100dvh - 28px));overflow:auto;box-sizing:border-box}
.ary125cloud:before{content:'☁️';position:absolute;right:16px;top:10px;font-size:28px;filter:drop-shadow(0 5px 9px rgba(0,0,0,.25))}
.ary125cloud h3{margin:0 42px 6px 0;font-size:17px}.ary125cloud p{margin:0;color:#bdd0e8;line-height:1.48;font-size:13px}
.ary125bar{display:flex;gap:4px;margin:13px 0 11px}.ary125bar i{height:4px;flex:1;background:rgba(255,255,255,.11);border-radius:9px}.ary125bar i.on{background:linear-gradient(90deg,#39dfc5,#5bcfff,#8b6bff)}
.ary125actions{display:grid;grid-template-columns:auto minmax(78px,1fr) auto;align-items:center;gap:7px}.ary125actions button{min-height:40px;padding:8px 11px;border-radius:13px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);color:#fff;font-weight:800;-webkit-text-fill-color:currentColor}.ary125actions .primary{min-width:96px;background:linear-gradient(135deg,#27d5bb,#43bfff,#765bff)!important;border:0!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:1!important;visibility:visible!important}
.ary125meta{text-align:center;font-size:11px;color:#8fa5c4}.ary125auto{display:block;margin:4px auto 0;border:0!important;background:transparent!important;color:#9db4d2!important;-webkit-text-fill-color:#9db4d2!important;font-size:11px;padding:2px!important;min-height:24px!important}
.ary125skip{position:fixed;z-index:10004;right:14px;top:max(12px,env(safe-area-inset-top));border:1px solid rgba(255,255,255,.16);background:rgba(10,18,38,.82);color:#c9d8eb;border-radius:999px;padding:8px 12px;font-size:11px}
.ary125final{text-align:center}.ary125final .finishIcon{font-size:42px;margin-bottom:8px}.ary125final p{font-size:14px}
.ary-light .ary125cloud{background:linear-gradient(145deg,rgba(255,255,255,.99),rgba(241,246,255,.99));color:#172641;border-color:#81cfdf;box-shadow:0 24px 65px rgba(39,62,103,.28)}.ary-light .ary125cloud p{color:#60738c}.ary-light .ary125actions button{color:#203653;background:#fff;border-color:#d6e2ef}.ary-light .ary125actions .primary{background:linear-gradient(135deg,#27d5bb,#43bfff,#765bff)!important;color:#fff!important;-webkit-text-fill-color:#fff!important}.ary-light .ary125skip{background:rgba(255,255,255,.92);color:#40536e;border-color:#ccd9e8}
@media(max-width:560px),(pointer:coarse){.ary125cloud{padding:14px;border-radius:20px;max-height:min(350px,calc(100dvh - 20px));width:calc(100vw - 20px)}.ary125cloud h3{font-size:16px}.ary125cloud p{font-size:12px}.ary125actions{grid-template-columns:minmax(86px,auto) minmax(70px,1fr) minmax(98px,auto)}.ary125actions button{font-size:12px;padding:7px 9px}.ary125actions .primary{min-width:98px}.ary125shade{backdrop-filter:none}}
html.aryGuideActive[data-ary-guide-route="expenses"] .debtExpenses66{display:none!important}
html.aryGuideActive .aryGuide94,html.aryGuideActive #aryGuide116,html.aryGuideActive #aryGuideMask116{display:none!important}
html body .ary125cloud{padding:14px!important;padding-top:58px!important;width:min(410px,calc(100vw - 16px))!important;max-height:var(--ary-guide-height,calc(100dvh - 24px))!important;border-radius:26px 26px 26px 8px!important;transition:none!important;background:#172541!important;color:#f2f8ff!important;contain:layout paint}
html body.ary-light .ary125cloud{background:#fff!important;color:#172641!important}
html body .ary125cloud h3{color:inherit!important;-webkit-text-fill-color:currentColor!important;font-size:18px!important;margin:0 0 8px!important}
html body .ary125cloud p{color:#d3e0ef!important;-webkit-text-fill-color:currentColor!important;font-size:16px!important;line-height:1.45!important}
html body.ary-light .ary125cloud p{color:#40536e!important}
html body .aryGuideCompanion{position:absolute;top:12px;left:14px;display:flex;align-items:center;gap:6px;color:inherit;font-size:14px;font-weight:800}
html body .aryGuideCompanion span{font-size:26px;display:flex;align-items:center}
html body .aryGuideCompanion svg{width:32px;height:36px;display:block}
html body .ary125cloud .ary125actions button{background:#253853!important;color:#f2f8ff!important;-webkit-text-fill-color:currentColor!important;border-color:#50647e!important}
html body.ary-light .ary125cloud .ary125actions button{background:#f1f5f9!important;color:#172641!important;border-color:#c6d3e0!important}
html body.ary-light .ary125cloud .ary140cancelTop{background:#f1f5f9!important;color:#172641!important}
html body .ary125cloud .ary140cancelTop{background:#253853!important;color:#f2f8ff!important;min-height:44px!important;font-size:14px!important}
html body .ary125cloud:before{display:none!important}
html body .ary125cloud .ary125actions{position:static!important;background:none!important;padding:0!important;margin-top:12px!important;grid-template-columns:auto 1fr auto!important}
html body .ary125cloud .ary125actions button{min-height:44px!important;font-size:14px!important}
html body .ary125cloud .ary125actions button.primary,html body.ary-light .ary125cloud .ary125actions button.primary{background:linear-gradient(135deg,#087f86,#4853c8)!important;color:#fff!important;-webkit-text-fill-color:#fff!important}
html body .ary125cloud .ary125meta{color:inherit!important;font-size:12px!important}
html body .ary125cloud .ary125auto{display:none!important}
html body .ary125cloud .ary140cancelTop{position:absolute!important;top:8px!important;right:10px!important;min-height:44px!important;font-size:14px!important}
html body .ary125cloud .ary127section,html body .ary125cloud .ary130new,html body .ary125cloud .ary127hint,html body .ary125cloud .ary127countdown{display:none!important}
html body .ary125focus{box-sizing:border-box;animation:none!important;transition:none!important;border-radius:14px;box-shadow:none!important}
html body .ary125shade{transition:none!important;backdrop-filter:none!important}
html body .ary125cloud.ary125final{padding-top:14px!important}

`;
 document.head.appendChild(st)
}
function modalOpen(){return !!document.querySelector('#modal:not(.hidden)')}
function contextualGuideOpen(){return !!document.querySelector('.aryGuide94,#aryGuide116,#aryGuideMask116')}
function canAutoStart(){return !active&&!completed()&&!!profile&&!!s?.onboarded&&typeof screen==='string'&&screen==='home'&&!modalOpen()&&!contextualGuideOpen()}
function cancelAutoStart(){clearTimeout(startTimer);startTimer=0}
function scheduleAutoStart(delay=220){if(startTimer||!canAutoStart())return;startTimer=setTimeout(()=>{startTimer=0;if(canAutoStart())start(false)},delay)}
function clearPending(){clearTimeout(timer);clearTimeout(renderTimer);clearTimeout(paintTimer);cancelAutoStart();cancelAnimationFrame(renderRaf);renderTimer=0;paintTimer=0;renderRaf=0;renderToken++}
function clearNodes(){document.querySelectorAll('.ary125shade,.ary125focus,.ary125navShield,.ary125cloud,.ary125skip,.ary126node').forEach(n=>n.remove())}
function navElement(){return document.querySelector('#nav')}
function isNavTarget(el){const nav=navElement();return !!nav&&(el===nav||nav.contains(el))}
function guideFrame(){const v=window.visualViewport,top=(v?.offsetTop||0)+8,bottom=(v?.offsetTop||0)+(v?.height||innerHeight)-8,nav=navElement();let contentBottom=bottom;if(nav){const r=nav.getBoundingClientRect();if(r.width>0&&r.height>0&&r.top>top+120&&r.top<bottom)contentBottom=Math.min(contentBottom,r.top-10)}return{top,bottom,contentBottom,height:Math.max(120,contentBottom-top)}}
function targetQueries(step){return step[1]||[]}
function selectTarget(step){
 if(typeof screen!=='string'||screen!==step[0])return null;
 for(const q of targetQueries(step)){
  try{for(const el of document.querySelectorAll(q)){
   if(!el.closest('#app')&&el.id!=='nav')continue;
   if(el.closest('.aryGuide94,.ary125cloud'))continue;
   const r=el.getBoundingClientRect();if(r.width>0&&r.height>0)return el;
  }}catch{}
 }
 return null;
}
function targetRect(el){if(!el)return null;const raw=el.getBoundingClientRect(),frame=guideFrame(),maxBottom=isNavTarget(el)?frame.bottom:frame.contentBottom,left=Math.max(4,raw.left),right=Math.min(innerWidth-4,raw.right),top=Math.max(frame.top,raw.top),bottom=Math.min(maxBottom,raw.bottom);if(right-left<8||bottom-top<8)return null;return{left,top,right,bottom,width:right-left,height:bottom-top}}
function shieldNav(targetEl){const nav=navElement();if(!nav||isNavTarget(targetEl))return;const r=nav.getBoundingClientRect();if(r.width<=0||r.height<=0)return;const n=document.createElement('div');n.className='ary125navShield';Object.assign(n.style,{left:Math.max(0,r.left)+'px',top:Math.max(0,r.top)+'px',width:Math.min(innerWidth,r.width)+'px',height:Math.min(innerHeight-Math.max(0,r.top),r.height)+'px'});document.body.appendChild(n)}
function shade(rect,targetEl){const pad=4,vw=innerWidth,vh=innerHeight,frame=guideFrame(),maxBottom=isNavTarget(targetEl)?frame.bottom:frame.contentBottom,r=rect?{l:Math.max(0,rect.left-pad),t:Math.max(frame.top,rect.top-pad),r:Math.min(vw,rect.right+pad),b:Math.min(maxBottom,rect.bottom+pad)}:null;const parts=r?[[0,0,vw,r.t],[0,r.t,r.l,r.b-r.t],[r.r,r.t,vw-r.r,r.b-r.t],[0,r.b,vw,vh-r.b]]:[[0,0,vw,vh]];for(const [l,t,w,h] of parts){if(w<=0||h<=0)continue;const n=document.createElement('div');n.className='ary125shade';Object.assign(n.style,{left:l+'px',top:t+'px',width:w+'px',height:h+'px'});document.body.appendChild(n)}if(r){const f=document.createElement('div');f.className='ary125focus';Object.assign(f.style,{left:r.l+'px',top:r.t+'px',width:(r.r-r.l)+'px',height:(r.b-r.t)+'px'});document.body.appendChild(f)}shieldNav(targetEl)}
function placeCloud(box,rect){
 const frame=guideFrame(),width=box.offsetWidth;
 box.style.left=Math.max(8,(innerWidth-width)/2)+'px';
 box.style.setProperty('--ary-guide-height',Math.max(100,frame.height-16)+'px');
 // The card has its final content before measurement. Reserve its own space;
 // never place a guide on top of the element it describes.
 const height=box.getBoundingClientRect().height;
 const below=rect?rect.bottom+12:frame.top;
 const above=rect?rect.top-height-12:frame.top;
 let top=rect&&below+height<=frame.contentBottom?below:
         rect&&above>=frame.top?above:frame.contentBottom-height;
 box.style.top=Math.max(frame.top,top)+'px';
 if(rect&&top<rect.bottom+8&&top+height>rect.top-8){
  const bottom=Math.min(rect.bottom,Math.max(frame.top,top)-12);
  return bottom>rect.top?{...rect,bottom,height:bottom-rect.top}:null;
 }
 return rect;
}

function schedule(){clearTimeout(timer);if(auto&&active)timer=setTimeout(()=>window.aryFullGuideNext125?.(),AUTO_MS)}
function ensureTargetVisible(el){
 if(!el||isNavTarget(el))return false;
 const frame=guideFrame(),r=el.getBoundingClientRect();
 const delta=r.top-(frame.top+12);
 if(Math.abs(delta)<2)return false;
 window.scrollBy({top:delta,left:0,behavior:'instant'});
 return true;
}

function requestGuideRender(delay=0){if(document.querySelector('.ary139confirm'))return;clearTimeout(renderTimer);cancelAnimationFrame(renderRaf);const token=++renderToken;const run=()=>{renderRaf=requestAnimationFrame(()=>{renderRaf=0;if(active&&token===renderToken)renderStep(token)})};if(delay>0)renderTimer=setTimeout(run,delay);else run()}
function renderStep(token=renderToken){if(!active||token!==renderToken)return;silenceContextGuide();css();const step=steps()[index];if(!step)return finish(false);if(step[4])return renderFinal();clearTimeout(paintTimer);target=selectTarget(step);const moved=target&&!document.querySelector('.ary125cloud')?ensureTargetVisible(target):false;const expected=index;const draw=()=>{paintTimer=0;if(!active||expected!==index||token!==renderToken)return;paint(step,expected,token)};if(moved)paintTimer=setTimeout(draw,MOBILE()?65:220);else renderRaf=requestAnimationFrame(draw)}
function paint(step,expected=index,token=renderToken){if(!active||expected!==index||token!==renderToken)return;if(document.querySelector('.ary139confirm'))return;target=selectTarget(step);const rect=target?targetRect(target):null;const existing=document.querySelector('.ary125cloud');if(existing?.dataset.guideStep===String(index)){document.querySelectorAll('.ary125shade,.ary125focus,.ary125navShield').forEach(n=>n.remove());shade(placeCloud(existing,rect),target);schedule();return}clearNodes();const x=copy(),box=document.createElement('section');box.dataset.guideStep=String(index);box.className='ary125cloud';box.setAttribute('data-ary-copy','');box.setAttribute('role','dialog');box.setAttribute('aria-modal','false');box.setAttribute('aria-live','polite');box.innerHTML=`<div class="aryGuideCompanion" aria-label="ARY 🤖"><span aria-hidden="true">${window.aryRobotMarkup94?aryRobotMarkup94():'🤖'}</span> ARY</div><h3>${step[2]}</h3><p>${step[3]}</p><div class="ary125bar">${steps().map((_,i)=>`<i class="${i<=index?'on':''}"></i>`).join('')}</div><div class="ary125actions"><button ${index?'':'disabled style="opacity:.35"'} onclick="aryFullGuideBack125()">‹ ${x.back}</button><div><div class="ary125meta">${x.count} ${index+1} / ${steps().length}</div><button class="ary125auto" onclick="aryFullGuideToggleAuto125()">${auto?'⏸ '+x.pause:'▶ '+x.play}</button></div><button class="primary" aria-label="${index===steps().length-1?x.finish:x.next}" onclick="aryFullGuideNext125()">${index===steps().length-1?x.finish:x.next} ›</button></div>`;const cancel=document.createElement('button');cancel.type='button';cancel.className='ary140cancelTop';cancel.textContent=lang()==='en'?'✕ Cancel guide':lang()==='pt'?'✕ Cancelar guia':'✕ Cancelar guía';cancel.onclick=e=>{e.preventDefault();e.stopPropagation();if(window.aryGuideCancel139)aryGuideCancel139();else finish(false)};box.appendChild(cancel);document.body.appendChild(box);const sk=document.createElement('button');sk.className='ary125skip';sk.textContent=x.skip;sk.onclick=()=>finish(false);document.body.appendChild(sk);const spotlight=placeCloud(box,rect);shade(spotlight,target);schedule()}
function renderFinal(){if(!active)return;clearNodes();shade(null,null);const x=copy(),box=document.createElement('section');box.className='ary125cloud ary125final';box.setAttribute('data-ary-copy','');box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.innerHTML=`<div class="finishIcon">🎉</div><h3>${x.doneTitle}</h3><p>${x.doneText}</p><div class="ary125bar">${steps().map(()=>'<i class="on"></i>').join('')}</div><div class="ary125actions"><button onclick="aryFullGuideBack125()">‹ ${x.back}</button><div class="ary125meta">${x.count} ${index+1} / ${steps().length}</div><button class="primary" onclick="aryFullGuideFinish125()">${x.finish}</button></div>`;document.body.appendChild(box);placeCloud(box,null);clearTimeout(timer)}
function route(i){const step=steps()[i];if(!step)return;clearTimeout(timer);clearTimeout(paintTimer);clearNodes();index=i;renderToken++;const dest=step[0];document.documentElement.dataset.aryGuideRoute=dest;if(typeof go==='function'&&typeof screen==='string'&&screen!==dest){routing=true;try{go(dest)}finally{routing=false}requestGuideRender(MOBILE()?80:120)}else requestGuideRender()}
function silenceContextGuide(){document.querySelectorAll('.aryGuide94').forEach(n=>n.remove());try{if(s?.guide94?.active===true&&typeof window.aryEndGuide94==='function')window.aryEndGuide94()}catch{document.querySelectorAll('.aryGuide94').forEach(n=>n.remove())}}
function start(force=false){cancelAutoStart();if(active)return;if(!profile||!s?.onboarded)return;if(!force&&!canAutoStart())return;try{localStorage.setItem(OLD_KEY,'done')}catch{};try{if(typeof aryGuideSkip116==='function')aryGuideSkip116()}catch{};document.getElementById('aryGuide116')?.remove();document.getElementById('aryGuideMask116')?.remove();active=true;document.documentElement.classList.add('aryGuideActive');auto=false;index=0;silenceContextGuide();route(0)}
function finish(openAssistant){active=false;document.documentElement.classList.remove('aryGuideActive');delete document.documentElement.dataset.aryGuideRoute;document.querySelector('.ary139confirm')?.remove();clearPending();clearNodes();document.getElementById('aryGuideBlock127')?.remove();document.documentElement.classList.remove('aryGuideLite144','aryGuideUltra148');markDone();if(openAssistant&&typeof go==='function')go('assistant')}
window.aryFullGuideNext125=()=>{if(!active||document.querySelector('.ary139confirm')||!document.querySelector('.ary125cloud'))return;if(index>=steps().length-1)return finish(false);route(index+1)};
window.aryFullGuideBack125=()=>{if(active&&index>0&&!document.querySelector('.ary139confirm')&&document.querySelector('.ary125cloud'))route(index-1)};
window.aryFullGuideToggleAuto125=()=>{if(!active)return;auto=!auto;clearTimeout(timer);requestGuideRender()};
window.aryFullGuideFinish125=()=>finish(false);
window.aryStartFullGuide125=()=>{try{localStorage.removeItem(KEY)}catch{};active=false;clearPending();start(true)};
window.aryFullGuideStatus125=()=>({active,index,automatic:auto,completed:completed(),steps:steps().length,unified:true});
window.aryGuideUnified125=true;
const priorGo=window.go;window.go=function(name){
 if(active&&!routing&&name!==steps()[index]?.[0])finish(false);
 return priorGo.apply(this,arguments);
};
const priorBack=window.back;window.back=function(){if(active)finish(false);return priorBack.apply(this,arguments)};

window.visualViewport?.addEventListener('resize',()=>active&&requestGuideRender(60),{passive:true});
window.visualViewport?.addEventListener('scroll',()=>active&&requestGuideRender(60),{passive:true});
window.addEventListener('resize',()=>active&&requestGuideRender(MOBILE()?100:60),{passive:true});
window.addEventListener('scroll',()=>{if(active)requestGuideRender(120)},{passive:true});
document.addEventListener('pointerdown',()=>{if(!active&&startTimer)cancelAutoStart()},{capture:true,passive:true});
const priorRender=window.render;window.render=function(){const out=priorRender.apply(this,arguments);if(active){cancelAutoStart();document.querySelectorAll('.aryGuide94,.ary126node').forEach(n=>n.remove());requestGuideRender(MOBILE()?55:80)}else if(canAutoStart())scheduleAutoStart(180);else cancelAutoStart();return out};
function addRestart(){const sheet=document.querySelector('#modal .sheet');if(!sheet||sheet.querySelector('#aryRestartGuide125'))return;const b=document.createElement('button');b.id='aryRestartGuide125';b.type='button';b.className='btn widebtn';b.textContent=copy().restart;b.onclick=()=>{if(typeof closeM==='function')closeM();window.aryStartFullGuide125()};sheet.appendChild(b)}
for(const name of ['aryV18Settings','settings']){const fn=window[name];if(typeof fn==='function'&&!fn._aryGuide125){const wrapped=function(){const r=fn.apply(this,arguments);setTimeout(addRestart,0);return r};wrapped._aryGuide125=true;window[name]=wrapped}}
try{localStorage.setItem(OLD_KEY,'done')}catch{}
try{if(typeof aryGuideSkip116==='function')aryGuideSkip116()}catch{}
clearNodes();css();scheduleAutoStart(220);
})();

;
// Source: guide-coverage-v126.js
(()=>{
'use strict';
/* V175: the four coverage steps now live inside the single V125 guide engine.
   Keep this file as a compatibility marker because older loaders still request it. */
document.querySelectorAll('.ary126node').forEach(node=>node.remove());
window.aryGuideCoverage126={integrated:true,active:()=>false};
})();

;
// Source: guide-premium-v127.js
(()=>{
'use strict';
// V125 owns the card, theme, content and geometry. This compatibility module
// supplies only keyboard navigation and hides guidance behind open dialogs.
const style=document.createElement('style');style.id='aryGuidePremiumStyle127';
style.textContent=`
body:has(#modal:not(.hidden)) .ary125shade,body:has(#modal:not(.hidden)) .ary125focus,body:has(#modal:not(.hidden)) .ary125navShield,body:has(#modal:not(.hidden)) .ary125cloud,body:has(#modal:not(.hidden)) .ary125skip{visibility:hidden!important;pointer-events:none!important}
.ary125cloud button:focus-visible{outline:3px solid #65dcff;outline-offset:3px}
`;
document.head.appendChild(style);
window.addEventListener('keydown',event=>{
 if(!window.aryFullGuideStatus125?.()?.active||document.querySelector('.ary139confirm,#modal:not(.hidden)'))return;
 if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 if(event.key==='ArrowRight'){event.preventDefault();window.aryFullGuideNext125?.()}
 else if(event.key==='ArrowLeft'){event.preventDefault();window.aryFullGuideBack125?.()}
});
})();


;
// Source: guide-lifecycle-v128.js
(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const OWNER='arydebts-guide-owner-v128';
const PREFIX='arydebts-guide-user-v128:';
const ACTIVE_MS=1000,IDLE_MS=6000,HIDDEN_MS=8000;
let wasActive=false,watcher=0,lastUser='';
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const remove=k=>{try{localStorage.removeItem(k)}catch{}};
function identity(){
 const p=typeof profile==='object'&&profile?profile:null;
 const raw=String(p?.email||p?.id||p?.name||'').trim().toLowerCase();
 if(!raw)return '';
 let h=2166136261;
 for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(36);
}
const scoped=id=>id?PREFIX+id:'';
function syncForCurrentUser(){
 const id=identity();
 if(!id)return false;
 lastUser=id;
 const key=scoped(id),owner=read(OWNER),globalDone=read(GLOBAL)==='done',userDone=read(key)==='done';
 if(!owner&&globalDone){write(OWNER,id);write(key,'done');return true}
 if(!owner)write(OWNER,id);
 if(userDone){write(GLOBAL,'done');return true}
 remove(GLOBAL);
 return false;
}
function persistCompletion(){
 const id=identity()||lastUser;
 if(!id||read(GLOBAL)!=='done')return;
 write(scoped(id),'done');
 if(!read(OWNER))write(OWNER,id);
}
function schedule(ms){clearTimeout(watcher);watcher=setTimeout(check,ms)}
function check(){
 const status=window.aryFullGuideStatus125?.();
 if(status?.active)wasActive=true;
 if(wasActive&&!status?.active&&read(GLOBAL)==='done'){
   persistCompletion();wasActive=false;
 }
 if(document.hidden)schedule(HIDDEN_MS);
 else schedule(status?.active?ACTIVE_MS:IDLE_MS);
}
function monitor(){schedule(0)}
function wrapStart(){
 const start=window.aryStartFullGuide125;
 if(typeof start!=='function'||start._aryLifecycle128)return;
 const wrapped=function(){
   const id=identity();
   if(id){remove(scoped(id));remove(GLOBAL);lastUser=id}
   wasActive=true;
   const out=start.apply(this,arguments);
   schedule(ACTIVE_MS);
   return out;
 };
 wrapped._aryLifecycle128=true;
 window.aryStartFullGuide125=wrapped;
}
function wrapFinish(){
 const finish=window.aryFullGuideFinish125;
 if(typeof finish!=='function'||finish._aryLifecycle128)return;
 const wrapped=function(){
   const out=finish.apply(this,arguments);
   setTimeout(()=>{persistCompletion();wasActive=false;schedule(IDLE_MS)},0);
   return out;
 };
 wrapped._aryLifecycle128=true;
 window.aryFullGuideFinish125=wrapped;
}
function wrapLogoutAndAuth(){
 for(const name of ['localAuth','logout']){
   const fn=window[name];
   if(typeof fn!=='function'||fn._aryLifecycle128)continue;
   const wrapped=function(){
     const out=fn.apply(this,arguments);
     setTimeout(()=>{syncForCurrentUser();monitor()},0);
     return out;
   };
   wrapped._aryLifecycle128=true;
   window[name]=wrapped;
 }
}
function init(){
 syncForCurrentUser();
 wrapStart();wrapFinish();wrapLogoutAndAuth();monitor();
 document.addEventListener('visibilitychange',()=>schedule(document.hidden?HIDDEN_MS:0));
}
window.aryGuideLifecycle128={
 currentUser:()=>identity(),
 completed:()=>{const id=identity();return !!id&&read(scoped(id))==='done'},
 resetCurrent:()=>{const id=identity();if(id)remove(scoped(id));remove(GLOBAL);return !!id},
 sync:syncForCurrentUser
};
init();
})();


;
// Source: guide-first-run-v129.js
(()=>{
'use strict';
const GLOBAL='arydebts-guide-v125';
const REPAIR_PREFIX='arydebts-guide-repair-v166:';
const LAUNCH_DELAY=260,READY_DELAY=120,READY_TRIES=18;
let launchTimer=0,paintTimer=0,readyTimer=0,hiddenPaused=false;
const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const remove=k=>{try{localStorage.removeItem(k)}catch{}};
const lifecycle=()=>window.aryGuideLifecycle128;
const status=()=>window.aryFullGuideStatus125?.();
const onHome=()=>typeof screen!=='string'||screen==='home';
function currentNeedsGuide(){
 const api=lifecycle(),id=api?.currentUser?.();
 if(!id||typeof s!=='object'||!s?.onboarded)return false;
 return !api.completed?.();
}
function ready(){
 const api=lifecycle();
 return !!(api?.currentUser?.()&&typeof s==='object'&&s?.onboarded&&typeof window.aryStartFullGuide125==='function');
}
function repairGuideOnce(){
 const api=lifecycle(),id=api?.currentUser?.();
 if(!id||typeof s!=='object'||!s?.onboarded)return false;
 const key=REPAIR_PREFIX+id;
 if(read(key)==='done')return false;
 // Existing accounts that completed an older/broken tour receive the corrected
 // tour once. New/incomplete accounts simply get marked as already on the repaired
 // generation so they are never replayed unnecessarily after completing it.
 const wasCompleted=!!api.completed?.()||read(GLOBAL)==='done';
 if(wasCompleted){
  try{api.resetCurrent?.()}catch{remove(GLOBAL)}
 }else remove(GLOBAL);
 write(key,'done');
 return wasCompleted;
}
function ensureVisiblePaint(){
 clearTimeout(paintTimer);
 paintTimer=setTimeout(()=>{
  const st=status();
  if(!st?.active||document.hidden||document.querySelector('.ary125cloud'))return;
  try{if(typeof window.render==='function')window.render()}catch{}
 },180);
}
function scheduleFirstLaunch(delay=LAUNCH_DELAY){
 clearTimeout(launchTimer);launchTimer=0;
 if(!currentNeedsGuide()||document.hidden||!onHome())return false;
 launchTimer=setTimeout(()=>{
  launchTimer=0;
  if(!currentNeedsGuide()||document.hidden||!onHome())return;
  const st=status();
  if(st?.active){ensureVisiblePaint();return}
  const start=window.aryStartFullGuide125;
  if(typeof start!=='function')return;
  start();
  ensureVisiblePaint();
 },delay);
 return true;
}
function settle(attempt=0){
 clearTimeout(readyTimer);readyTimer=0;
 if(!ready()){
  // Script/bootstrap order can briefly expose V129 before profile/lifecycle are
  // fully hydrated on reload. Retry only for a short bounded window.
  if(attempt<READY_TRIES)readyTimer=setTimeout(()=>settle(attempt+1),READY_DELAY);
  return;
 }
 repairGuideOnce();
 if(currentNeedsGuide())scheduleFirstLaunch();
}
function wrapFinishOnboarding(){
 const fn=window.finishOnboarding;
 if(typeof fn!=='function'||fn._aryFirstRun129)return;
 const wrapped=function(){
  const out=fn.apply(this,arguments);
  setTimeout(()=>settle(0),50);
  return out;
 };
 wrapped._aryFirstRun129=true;
 window.finishOnboarding=wrapped;
}
function wrapAuth(){
 const fn=window.localAuth;
 if(typeof fn!=='function'||fn._aryFirstRun129)return;
 const wrapped=function(){
  const out=fn.apply(this,arguments);
  setTimeout(()=>settle(0),70);
  return out;
 };
 wrapped._aryFirstRun129=true;
 window.localAuth=wrapped;
}
function visibility(){
 document.addEventListener('visibilitychange',()=>{
  const st=status();
  if(document.hidden){
   clearTimeout(launchTimer);launchTimer=0;
   clearTimeout(paintTimer);paintTimer=0;
   if(st?.active&&st.automatic&&typeof window.aryFullGuideToggleAuto125==='function'){
    hiddenPaused=true;
    window.aryFullGuideToggleAuto125();
   }
   return;
  }
  if(hiddenPaused){
   hiddenPaused=false;
   const now=status();
   if(now?.active&&!now.automatic&&typeof window.aryFullGuideToggleAuto125==='function')window.aryFullGuideToggleAuto125();
   ensureVisiblePaint();
  }else settle(0);
 });
}
function init(){
 wrapFinishOnboarding();wrapAuth();visibility();settle(0);
}
window.aryGuideFirstRun129={needsGuide:currentNeedsGuide,schedule:scheduleFirstLaunch,repair:repairGuideOnce,ensurePaint:ensureVisiblePaint,settle};
init();
})();


;
// Source: guide-first-data-v130.js
(()=>{
'use strict';
// Empty-state instructions belong to the current guide step. Do not append
// a second explanation or connector after V125 measures the card.
document.querySelectorAll('.ary130new,.ary130link').forEach(node=>node.remove());
})();


;
// Source: guide-section-transitions-v131.js
(()=>{
'use strict';
// V182 — the full guide already owns routing, spotlight placement and timing.
// The former full-screen section transition added a second visual layer above
// the guide and could intercept clicks while a new section was rendering.
// Keep this module as a compatibility cleanup only: one guide, one overlay.
const STYLE='aryGuideSectionTransitionStyle131';
let cleaned=false;
function clear(){
 document.querySelectorAll('.ary131transition').forEach(n=>n.remove());
 document.getElementById(STYLE)?.remove();
 cleaned=true;
}
clear();
window.aryGuideTransition131={show:()=>{clear();return false},clear};
})();

// V132 — adapt the final guide screen to the customer's actual next steps.



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
 es:{label:'Acciones rápidas',expense:'Gasto',debt:'Deuda',income:'Ingreso',payment:'Pago',title:'¿Qué quieres registrar?',close:'Cerrar'},
 en:{label:'Quick actions',expense:'Expense',debt:'Debt',income:'Income',payment:'Payment',title:'What do you want to add?',close:'Close'},
 pt:{label:'Ações rápidas',expense:'Gasto',debt:'Dívida',income:'Renda',payment:'Pagamento',title:'O que deseja registrar?',close:'Fechar'}
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
// Source: guide-understood-v135.js
(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const understood=()=>lang()==='en'?'Got it':lang()==='pt'?'Entendi':'Entendido';
function relabel(){
 const st=window.aryFullGuideStatus125?.();
 if(!st?.active)return;
 const button=document.querySelector('.ary125cloud:not(.ary125final) .ary125actions .primary');
 if(!button)return;
 const text=understood();
 if(String(button.textContent||'').trim()!==text+' ›')button.textContent=text+' ›';
 button.setAttribute('aria-label',text);
}
window.aryGuideUnderstood135=()=>{
 const st=window.aryFullGuideStatus125?.();
 if(!st?.active||document.querySelector('.ary125final'))return false;
 window.aryFullGuideNext125?.();
 return true;
};
window.aryGuideRelabel135=relabel;
requestAnimationFrame(relabel);
})();

// V136 — continuity must preserve the user's pause/step choice; it never advances on its own.


;
// Source: guide-continuity-v136.js
(()=>{
'use strict';
let wakeTimer=0;
function status(){try{return window.aryFullGuideStatus125?.()||null}catch{return null}}
function wake(){
 clearTimeout(wakeTimer);
 const st=status();
 if(!st?.active||document.visibilityState==='hidden')return;
 wakeTimer=setTimeout(()=>{
   try{window.dispatchEvent(new Event('resize'))}catch{}
   requestAnimationFrame(()=>window.aryGuideRelabel135?.());
 },120);
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState!=='hidden')wake()});
window.addEventListener('pageshow',wake,{passive:true});
window.aryGuideContinuity136={
 check:()=>{const st=status();return{active:!!st?.active,index:st?.index??-1,automatic:!!st?.automatic,ui:!!document.querySelector('.ary125cloud'),unified:!!st?.unified}},
 wake
};
})();

// V137 — avoid redundant renders and accidental double-navigation during normal daily use.


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
const frequencies=['daily','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'];
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
 if(!name||raw===''||!Number.isFinite(value)||value<0){if(typeof toast==='function')toast(t().bad);return false;}

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
 if(!validDate(date)){if(typeof toast==='function')toast(t().badRecurrence);return false;}
 if(frequency==='once'&&!date&&!editing)date=today();
 if(frequency==='once'&&!date&&editing&&existing?.date)date=existing.date;

 const sourceExpenseId=sourcePending!=null&&sourcePending!==''?sourcePending:existing?.sourceExpenseId;
 const icon=typeof iconFor==='function'?iconFor(name,cat):existing?.icon;

 if(!commit(next=>{
   if(!Array.isArray(next.expenses))next.expenses=[];
   if(editing){
     const item=next.expenses.find(x=>String(x.id)===String(id));
     if(!item)return;
     item.name=name;item.amount=value;item.cat=cat;
     if(icon)item.icon=icon;
     if(frequencyField)item.frequency=frequency;
     else if(item.frequency==null)item.frequency='once';
     if(dateField)item.date=date;
     else if(item.date==null&&frequency==='once')item.date=today();
     if(sourceExpenseId!=null&&sourceExpenseId!=='')item.sourceExpenseId=sourceExpenseId;
   }else{
     const item={
       id:uniqueId(next.expenses,next.debts,next.payments,next.calendarEvents),
       name,amount:value,cat,
       date:frequency==='once'?(date||today()):date,
       frequency
     };
     if(icon)item.icon=icon;
     if(sourceExpenseId!=null&&sourceExpenseId!=='')item.sourceExpenseId=sourceExpenseId;
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
// Source: guide-mobile-controls-v139.js
(()=>{
'use strict';
const STYLE='aryGuideMobileControlsStyle139';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const text={
 es:{title:'¿Cancelar la guía?',body:'Puedes volver a abrirla desde Configuración.',yes:'Sí, cancelar',no:'Seguir con la guía'},
 en:{title:'Cancel the guide?',body:'You can reopen it from Settings.',yes:'Yes, cancel',no:'Keep the guide'},
 pt:{title:'Cancelar o guia?',body:'Você pode reabri-lo nas Configurações.',yes:'Sim, cancelar',no:'Continuar guia'}
};
const t=()=>text[lang()]||text.es;
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - 24px)!important;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain!important;box-sizing:border-box}
.ary125cloud .ary125actions{position:sticky;bottom:-1px;z-index:4;margin-top:10px;padding:10px 0 2px;background:linear-gradient(180deg,rgba(20,29,61,0),rgba(20,29,61,.97) 28%,rgba(20,29,61,.99))}
.ary-light .ary125cloud .ary125actions{background:linear-gradient(180deg,rgba(255,255,255,0),rgba(248,252,255,.97) 28%,rgba(248,252,255,.99))}
.ary125skip{display:none!important}
.ary139confirm{position:fixed;inset:0;z-index:10040;display:grid;place-items:center;padding:18px;background:rgba(2,7,20,.82)}
.ary139confirmCard{width:min(370px,calc(100vw - 30px));padding:20px;border-radius:22px;border:1px solid rgba(105,218,255,.35);background:#172541;color:#f4f9ff;box-shadow:0 18px 52px rgba(0,0,0,.45);text-align:center}
.ary139confirmCard h3{margin:0 0 8px}.ary139confirmCard p{margin:0 0 16px;color:#b8cae1;font-size:13px;line-height:1.45}.ary139confirmActions{display:grid;gap:8px}.ary139confirmActions button{min-height:44px;border-radius:14px;font-weight:850}.ary139yes{border:1px solid rgba(255,129,150,.4);background:rgba(255,86,119,.15);color:#ffd8df}.ary139no{border:0;background:#58d6df;color:#071223}.ary-light .ary139confirm{background:rgba(2,7,20,.86)}.ary-light .ary139confirmCard{background:#fff;color:#19334e;border-color:#bfe4ed}.ary-light .ary139confirmCard p{color:#657d94}
html body .ary139confirmActions button{opacity:1!important;visibility:visible!important;pointer-events:auto!important;touch-action:manipulation;transform:none!important;transition:none!important;min-height:48px;font-size:16px;-webkit-text-fill-color:currentColor!important}
html body .ary139confirmActions .ary139yes{background:#b42342!important;color:#fff!important;border:1px solid #b42342!important}
html body .ary139confirmActions .ary139no{background:#087f86!important;color:#fff!important;border:1px solid #087f86!important}
html body .ary139confirmCard{box-sizing:border-box;max-height:calc(100dvh - 36px);overflow:auto}
@media(max-width:820px),(pointer:coarse){.ary125cloud,.ary126node.ary125cloud{width:calc(100vw - 16px)!important;max-height:calc(100dvh - 16px)!important;border-radius:18px!important}.ary125cloud .ary125actions{padding-bottom:max(4px,env(safe-area-inset-bottom));backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.ary139confirmCard{box-shadow:0 12px 28px rgba(0,0,0,.28)}}
`;
 document.head.appendChild(st);
}
function closeConfirm(){document.querySelector('.ary139confirm')?.remove()}
function cancelConfirmed(){
 closeConfirm();
 if(typeof window.aryFullGuideFinish125==='function'){window.aryFullGuideFinish125();return}
 try{localStorage.setItem('arydebts-guide-v125','done')}catch{}
 const lifecycle=window.aryGuideLifecycle128;
 try{const id=lifecycle?.currentUser?.();if(id)localStorage.setItem('arydebts-guide-user-v128:'+id,'done')}catch{}
 document.querySelectorAll('.ary125shade,.ary125focus,.ary125cloud,.ary125skip,.ary131transition,#aryGuideBlock127').forEach(n=>n.remove());
}
function askCancel(){
 if(document.querySelector('.ary139confirm'))return;
 const c=t(),node=document.createElement('div');node.className='ary139confirm';node.innerHTML=`<div class="ary139confirmCard" role="dialog" aria-modal="true"><h3>${c.title}</h3><p>${c.body}</p><div class="ary139confirmActions"><button type="button" class="ary139no">${c.no}</button><button type="button" class="ary139yes">${c.yes}</button></div></div>`;
 node.querySelector('.ary139no').onclick=closeConfirm;node.querySelector('.ary139yes').onclick=cancelConfirmed;document.body.appendChild(node);
}
window.aryGuideCancel139=askCancel;
ensureStyle();
})();

// V140 — add controls only; V125 owns target-aware cloud placement.



;
// Source: guide-safe-layout-v140.js
(()=>{
'use strict';
const STYLE='aryGuideSafeLayoutStyle140';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const labels={es:'Cancelar guía',en:'Cancel guide',pt:'Cancelar guia'};
let raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud,.ary126node.ary125cloud{contain:layout paint}
.ary140cancelTop{position:absolute;right:12px;top:10px;z-index:8;display:inline-flex;align-items:center;gap:5px;min-height:30px;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(8,16,35,.9);color:#bed0e6;font-size:10px;font-weight:850;cursor:pointer}.ary140cancelTop:hover{color:#fff;background:rgba(24,38,69,.96)}.ary-light .ary140cancelTop{background:#fff;color:#61758c;border-color:#d9e5ef}.ary-light .ary140cancelTop:hover{color:#17304b}
.ary125cloud .ary125actions{z-index:9!important}
@media(max-width:820px),(pointer:coarse){
 .ary140cancelTop{right:9px;top:8px;min-height:32px;padding:5px 8px;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 .ary125cloud,.ary126node.ary125cloud{max-height:calc(100dvh - max(18px,env(safe-area-inset-top)) - max(18px,env(safe-area-inset-bottom)))!important}
}
`;document.head.appendChild(st)}
function addTopCancel(cloud){if(!cloud||cloud.classList.contains('ary125final')||cloud.querySelector('.ary140cancelTop'))return;const b=document.createElement('button');b.type='button';b.className='ary140cancelTop';b.innerHTML='✕ <span>'+labels[lang()]+'</span>';b.onclick=e=>{e.preventDefault();e.stopPropagation();window.aryGuideCancel139?.()};cloud.appendChild(b)}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;document.querySelectorAll('.ary125cloud').forEach(addTopCancel)})}
/* V164: V125 owns cloud placement. This layer must never reposition the guide over its target. */
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary126node')||n.querySelector?.('.ary125cloud,.ary126node')))))sync()});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
window.aryGuideSafeLayout140={sync,placementOwner:'v125'};
ensureStyle();sync();
})();

// V141 — keep guide controls visible without moving the page away from the highlighted target.



;
// Source: guide-scroll-stability-v141.js
(()=>{
'use strict';
const STYLE='aryGuideScrollStabilityStyle141';
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||false;
let lastIndex=-1,raf=0;
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary125cloud{scroll-behavior:smooth}
@media(max-width:560px){.ary125cloud{scroll-behavior:auto}}
`;document.head.appendChild(st)}
function overlap(a,b,pad=8){return !(a.right+pad<b.left||b.right+pad<a.left||a.bottom+pad<b.top||b.bottom+pad<a.top)}
function cleanArrow(){
 if(mobile())return;
 const cloud=document.querySelector('.ary125cloud'),focus=document.querySelector('.ary125focus'),line=document.querySelector('.ary130link');
 if(!line)return;
 if(!cloud||!focus){line.remove();return}
 const a=cloud.getBoundingClientRect(),b=focus.getBoundingClientRect();
 if(overlap(a,b,14)||innerWidth<620)line.style.display='none';else line.style.display='block';
}
function keepControlsVisible(){
 const cloud=document.querySelector('.ary125cloud');if(!cloud)return;
 const actions=cloud.querySelector('.ary125actions');if(!actions)return;
 const cr=cloud.getBoundingClientRect(),ar=actions.getBoundingClientRect();
 if(ar.bottom>cr.bottom+1)cloud.scrollTop+=ar.bottom-cr.bottom+10;
}
function resetCloudOnly(){
 if(!active())return;
 const st=window.aryFullGuideStatus125?.();
 if(st&&st.index!==lastIndex){
   lastIndex=st.index;
   const cloud=document.querySelector('.ary125cloud');
   if(cloud)cloud.scrollTop=0;
 }
}
function sync(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{ensureStyle();if(!active())return;resetCloudOnly();cleanArrow();keepControlsVisible()})}
/* V164: never force window.scrollTo while the guide is active. V125 already scrolls the target into view. */
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125cloud,.ary125focus,.ary126node')||n.querySelector?.('.ary125cloud,.ary125focus,.ary126node')))))sync()});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
if(!mobile())document.addEventListener('scroll',()=>{if(active())sync()},true);
for(const ev of ['resize','orientationchange'])window.addEventListener(ev,sync,{passive:true});
window.visualViewport?.addEventListener('resize',sync,{passive:true});
window.aryGuideScrollStability141={sync,targetScrollOwner:'v125'};
ensureStyle();sync();
})();

// V142 — compatibility marker after V126 was folded into V125.



;
// Source: guide-extra-stability-v142.js
(()=>{
'use strict';
/* V176: V126 no longer owns a second guide. The four former extra steps now
   live inside V125, so this file stays only as a compatibility marker. */
window.aryGuideExtraStability142={active:()=>false,integrated:true};
})();

// V143 — make the final guide state truly adaptive and exit cleanly to Home.



;
// Source: guide-completion-polish-v143.js
(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{title:'Tu siguiente paso',ready:'Tu base ya está lista para empezar. Mantén tus movimientos reales al día y Arydebts hará el resto.',progress:['📊','Registra tu primer pago real','Ya tienes deudas registradas. Cuando hagas un pago, regístralo para que el progreso sea real.']},
 en:{title:'Your next step',ready:'Your setup is ready to use. Keep real movements updated and let Arydebts do the rest.',progress:['📊','Record your first real payment','You already have debts recorded. When you make a payment, record it so progress stays real.']},
 pt:{title:'Seu próximo passo',ready:'Sua base já está pronta para começar. Mantenha os movimentos reais atualizados e deixe o Arydebts fazer o resto.',progress:['📊','Registre seu primeiro pagamento real','Você já tem dívidas registradas. Quando fizer um pagamento, registre-o para manter o progresso real.']}
};
function missingKeys(){
 const out=[];
 const add=k=>{if(!out.includes(k)&&out.length<3)out.push(k)};
 if(!(Number(s?.income)>0))add('income');
 if(!Array.isArray(s?.debts)||!s.debts.length)add('debts');
 if(!Array.isArray(s?.expenses)||!s.expenses.length)add('expenses');
 if((!Array.isArray(s?.goals)||!s.goals.length)&&!String(s?.goal||'').trim())add('goals');
 const hasDates=(Array.isArray(s?.calendarEvents)&&s.calendarEvents.length>0)||(Array.isArray(s?.debts)&&s.debts.some(d=>String(d?.due||'').trim()));
 if(out.length<3&&!hasDates)add('calendar');
 const hasDebts=Array.isArray(s?.debts)&&s.debts.length>0;
 const hasPayments=Array.isArray(s?.payments)&&s.payments.length>0;
 if(out.length<3&&hasDebts&&!hasPayments)add('progress');
 return out.slice(0,3);
}
function itemHtml(key){const c=window.__aryCompletionItems143?.[lang()]?.[key];if(!c)return'';return `<div class="ary132item"><i>${c[0]}</i><div><b>${c[1]}</b><span>${c[2]}</span></div></div>`}
function itemSource(){
 const es={income:['💰','Confirma tus ingresos','Mantén actualizado cuánto recibes y con qué frecuencia.'],debts:['💳','Agrega tu primera deuda','Saldo, mínimo, APR y vencimiento ayudan a crear una prioridad real.'],expenses:['🌸','Registra tus gastos principales','Empieza por renta, mercado, transporte y pagos recurrentes.'],goals:['🎯','Define una meta','Dale una dirección a tu esfuerzo financiero.'],calendar:['📅','Añade fechas importantes','Vencimientos y recordatorios ayudan a anticiparte.'],progress:copy.es.progress};
 const en={income:['💰','Confirm your income','Keep how much you receive and how often up to date.'],debts:['💳','Add your first debt','Balance, minimum, APR and due date create a real priority.'],expenses:['🌸','Record your main expenses','Start with housing, groceries, transport and recurring bills.'],goals:['🎯','Set a goal','Give your financial effort a clear direction.'],calendar:['📅','Add important dates','Due dates and reminders help you stay ahead.'],progress:copy.en.progress};
 const pt={income:['💰','Confirme sua renda','Mantenha atualizado quanto recebe e com que frequência.'],debts:['💳','Adicione sua primeira dívida','Saldo, mínimo, APR e vencimento criam uma prioridade real.'],expenses:['🌸','Registre seus principais gastos','Comece por moradia, mercado, transporte e contas recorrentes.'],goals:['🎯','Defina uma meta','Dê uma direção clara ao seu esforço financeiro.'],calendar:['📅','Adicione datas importantes','Vencimentos e lembretes ajudam você a se antecipar.'],progress:copy.pt.progress};
 return {es,en,pt};
}
window.__aryCompletionItems143=itemSource();
function finishHome(){
 if(typeof window.aryFullGuideFinish125!=='function')return;
 const realGo=window.go;
 try{if(typeof realGo==='function')window.go=function(route){if(route==='assistant')return false;return realGo.apply(this,arguments)};window.aryFullGuideFinish125();}
 finally{if(typeof realGo==='function')window.go=realGo}
 if(typeof realGo==='function')realGo('home');
}
function polish(final){
 if(!final)return;
 const keys=missingKeys(),c=copy[lang()]||copy.es,wrap=final.querySelector('.ary132wrap');
 if(wrap){if(keys.length)wrap.innerHTML=`<strong>${c.title}</strong><div class="ary132grid">${keys.map(itemHtml).join('')}</div>`;else wrap.innerHTML=`<div class="ary132ready">${c.ready}</div>`}
 const home=final.querySelector('.ary132home');if(home){home.onclick=finishHome;home.dataset.ary143='1'}
 final.dataset.ary143='1';
}
const sync=()=>document.querySelectorAll('.ary125final').forEach(polish);
const obs=new MutationObserver(list=>{if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.ary125final')||n.querySelector?.('.ary125final')))))requestAnimationFrame(sync)});
obs.observe(document.body||document.documentElement,{subtree:false,childList:true});
window.aryGuideCompletion143={plans:missingKeys,finishHome};
sync();
})();

// V144 — simplify the progress header/tips and use a lighter guide on mobile devices.



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
// Source: guide-ultralite-v148.js
(()=>{
'use strict';
const STYLE='aryGuideUltraStyle148';
const root=document.documentElement;
const mobile=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
function active(){try{return !!window.aryFullGuideStatus125?.()?.active||!!document.querySelector('.ary126node.ary125cloud')}catch{return false}}
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
@media(max-width:820px),(pointer:coarse){
 html.aryGuideUltra148 .waves65,html.aryGuideUltra148 .seasonBackdrop71,html.aryGuideUltra148 .aurora{display:none!important}
 html.aryGuideUltra148 .ary125shade{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:none!important}
 html.aryGuideUltra148 .ary125focus{animation:none!important;transition:none!important}
 html.aryGuideUltra148 .ary125cloud,html.aryGuideUltra148 .ary126node.ary125cloud{animation:none!important;transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideUltra148 .ary125cloud *,html.aryGuideUltra148 .ary126node.ary125cloud *{animation:none!important;transition:none!important}
 html.aryGuideUltra148 .ary127countdown,html.aryGuideUltra148 .ary127hint,html.aryGuideUltra148 .ary130link,html.aryGuideUltra148 .ary131transition{display:none!important}
 html.aryGuideUltra148 .ary125cloud .ary125actions{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 html.aryGuideUltra148 *,html.aryGuideUltra148 *::before,html.aryGuideUltra148 *::after{scroll-behavior:auto!important}
}
`;
 document.head.appendChild(st);
}
function sync(){ensureStyle();root.classList.toggle('aryGuideUltra148',mobile()&&active())}
function wrap(name){
 const fn=window[name];if(typeof fn!=='function'||fn._ary148)return;
 const wrapped=function(){const out=fn.apply(this,arguments);requestAnimationFrame(sync);return out};
 wrapped._ary148=true;window[name]=wrapped;
}
/* Keep the original guide look; only remove expensive motion on mobile. */
const nativeScroll=Element.prototype.scrollIntoView;
if(nativeScroll&&!nativeScroll._ary148){
 const wrapped=function(options){
   if(mobile()&&active()&&options&&typeof options==='object'&&options.behavior==='smooth'){
     return nativeScroll.call(this,{...options,behavior:'auto',block:options.block||'nearest',inline:options.inline||'nearest'});
   }
   return nativeScroll.call(this,options);
 };
 wrapped._ary148=true;wrapped._ary148native=nativeScroll;Element.prototype.scrollIntoView=wrapped;
}
for(const name of ['aryStartFullGuide125','aryFullGuideNext125','aryFullGuideBack125','aryFullGuideFinish125'])wrap(name);
for(const ev of ['resize','orientationchange','pageshow'])window.addEventListener(ev,()=>requestAnimationFrame(sync),{passive:true});
document.addEventListener('visibilitychange',sync);
sync();
window.aryGuideUltra148={sync,mobile,active};
})();

// V184 — load the current paint/navigation/guide transition chain fresh.



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
    while(appNavigation55.length&&!valid(appNavigation55[appNavigation55.length-1]))appNavigation55.pop();
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

function clearPreviousGuideVisual(){
 document.querySelectorAll('.ary125shade,.ary125focus,.ary125navShield,.ary125cloud,.ary125skip,.ary126node').forEach(n=>n.remove());
}
function wrapStep(name){
 const fn=window[name];
 if(typeof fn!=='function'||fn._ary184transition)return;
 const wrapped=function(){
  const before=status(),beforeIndex=before?.index;
  const out=fn.apply(this,arguments);
  const after=status();
  // V125 updates its index before the route-specific card is ready. Remove the
  // previous card immediately so an old explanation can never remain visible
  // while the new step/route is already active. V125 alone paints the next card.
  if(before?.active&&after?.active&&after.index!==beforeIndex)clearPreviousGuideVisual();
  return out;
 };
 wrapped._ary184transition=true;
 wrapped._ary184raw=fn;
 window[name]=wrapped;
}
wrapStep('aryFullGuideNext125');
wrapStep('aryFullGuideBack125');

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

