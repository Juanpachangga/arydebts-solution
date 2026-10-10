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
