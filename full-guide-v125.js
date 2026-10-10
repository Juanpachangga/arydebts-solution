(()=>{
'use strict';
const KEY='arydebts-guide-v125',OLD_KEY='arydebts-guide-v116';
const AUTO_MS=5200;
const MOBILE=()=>window.matchMedia?.('(max-width:820px),(pointer:coarse)')?.matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent||'');
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const TXT={
 es:{back:'Atrás',next:'Entendido',skip:'Saltar guía',pause:'Pausar',play:'Automático',finish:'Terminar',count:'Paso',restart:'☁️ Repetir guía completa',doneTitle:'🎉 Ya conoces Arydebts',doneText:'Terminaste el recorrido. Cuando tengas dudas, abre el Asistente Arydebts: está para explicarte tus números y cómo usar cada herramienta.'},
 en:{back:'Back',next:'Got it',skip:'Skip guide',pause:'Pause',play:'Auto',finish:'Finish',count:'Step',restart:'☁️ Replay full guide',doneTitle:'🎉 You know Arydebts now',doneText:'You finished the tour. Whenever you have questions, open Arydebts Assistant for help understanding your numbers and each tool.'},
 pt:{back:'Voltar',next:'Entendi',skip:'Pular guia',pause:'Pausar',play:'Automático',finish:'Concluir',count:'Passo',restart:'☁️ Repetir guia completo',doneTitle:'🎉 Agora você conhece o Arydebts',doneText:'Você terminou o tour. Quando tiver dúvidas, abra o Assistente Arydebts para entender seus números e cada ferramenta.'}
};
const copy=()=>TXT[lang()];
const S={
 es:[
  ['home',['.heroCard','.homeTruth29','.grid .card'],'☁️ Tu centro financiero','Este es tu resumen. Aquí ves rápidamente cómo estás hoy antes de tomar cualquier decisión.'],
  ['home',['.progressBox','.heroCard'],'📈 Progreso real','Este indicador usa tus deudas y pagos registrados. Aquí ves cuánto has avanzado sin calcularlo a mano.'],
  ['home',['.homeDaily81','.grid'],'💵 Lo que entra y sale','Estas tarjetas resumen ingresos, gastos y dinero disponible para detectar rápido si el mes está apretado o tiene margen.'],
  ['home',['#nav'],'🧭 Navegación principal','Estas son tus áreas principales. La guía irá entrando a cada una para enseñarte qué hace.'],
  ['income',['.card.full','.kpi'],'💰 Ingresos','Registra cuánto recibes y cada cuánto. Ese dato alimenta los cálculos del plan, así que mantenlo actualizado.'],
  ['debts',['.debtPulse33','.card.full'],'💳 Resumen de deudas','Aquí ves deuda total, pagos mínimos e interés aproximado para saber qué obligación necesita más atención.'],
  ['debts',['.debtTarget33','.aprNotice68','.card.full .list'],'🎯 Prioridad de pago','Arydebts destaca la deuda más costosa o te avisa si falta el APR. Así sabes dónde enfocar dinero extra después de cubrir mínimos.'],
  ['debts',['.rowActions','.card.full button.primary','.card.full'],'✍️ Acciones de deuda','Desde aquí agregas, editas, eliminas y registras pagos. Los pagos reales quedan ligados a la deuda para mantener correcto el progreso.'],
  ['expenses',['.card.full .list','.list','.card.full'],'🌸 Gastos','Aquí registras lo que realmente gastas. Separa esenciales, variables y gastos hormiga para que el plan sea realista.'],
  ['expenses',['.quick','#quickAnt','.card.full button.primary'],'🐜 Registro rápido','Los gastos pequeños también cuentan. Regístralos rápido aquí para detectar fugas de dinero que normalmente pasan desapercibidas.'],
  ['plan',['.planHero34','.planPulse34','.card.full'],'🧭 Tu plan','Arydebts junta ingresos, gastos, mínimos y deudas para mostrar cuánto debes proteger primero y qué margen te queda.'],
  ['plan',['.planAttack34','.planStatus34','.card.full'],'⚡ Próxima acción','Esta zona transforma tus números en una prioridad concreta. No tienes que adivinar qué atacar primero.'],
  ['progress',['.progressBox','.card.full'],'📊 Progreso','Aquí puedes comprobar tu avance con pagos registrados y ver cómo baja tu deuda con el tiempo.'],
  ['calendar',['.cal35','.card.full'],'📅 Calendario','Aquí se reúnen vencimientos, recordatorios y movimientos por fecha para ayudarte a anticiparte a pagos importantes.'],
  ['calendar',['.calDetail35','.list','.card.full'],'🔔 Detalle del día','Selecciona un día para revisar vencimientos y recordatorios. Registra un pago solo cuando realmente lo hayas realizado.'],
  ['more',['.menuGrid','.menuItem','.more94'],'✨ Más herramientas','Aquí están las herramientas complementarias. También forman parte de tu sistema financiero.'],
  ['ants',['.antHero25','.card.full'],'🐜 Gastos hormiga','Esta pantalla reúne los pequeños gastos del mes y te muestra cuánto podrían estar drenando de tus ingresos.'],
  ['ants',['.antPulse28','.antStats26','.card.full'],'🔎 Impacto y tendencia','Aquí ves lo gastado hoy, los últimos 7 días, la proyección mensual y qué categoría está pesando más.'],
  ['analysis',['.analysis93','.analysisTabs93','.card.full'],'📊 Análisis de dinero','Aquí puedes analizar ingresos y salidas por período o cambiar a la vista de patrimonio. Sirve para ver tendencias, no solo saldos del día.'],
  ['analysis',['.analysisMetrics93','.analysisCard93','.card.full'],'🏦 Patrimonio y registros reales','El análisis separa movimientos reales, bienes y deudas. Registra cada valor una sola vez para evitar duplicados.'],
  ['buy',['#buyPrice','.card.full'],'🛍️ ¿Puedo comprar esto?','Escribe el precio de algo que quieres comprar. Arydebts lo compara con tu margen actual para ayudarte a decidir sin improvisar.'],
  ['goals',['.choiceGrid','.card.full','.list'],'🎯 Tus metas','Guarda lo que quieres conseguir. Tus metas conectan el esfuerzo de pagar deudas con algo importante para ti.'],
  ['notifications',['.card.full','.list'],'🔔 Notificaciones','Aquí aparecen avisos importantes de la app. Revísalos para no perder vencimientos, recordatorios o acciones pendientes.'],
  ['profile',['.card.full','.menuGrid'],'👤 Perfil y configuración','Aquí administras tus preferencias, idioma, moneda y opciones personales.'],
  ['profile',['button[onclick*="settings"],button[onclick*="aryV18Settings"],.btn'],'⚙️ Configuración','Desde Configuración puedes ajustar la experiencia, acceder a tus copias de datos y repetir esta guía.'],
  ['assistant',['.assistantIntro58','.assistant58'],'✦ Asistente Arydebts','Este es tu espacio para preguntar qué significa algo de la app o pedir ayuda para entender tus números.'],
  ['assistant',['#chatinput','.assistant58 input','.assistant58'],'💬 Pregunta sin miedo','Escribe tu duda aquí. El asistente te orienta, pero no cambia tus registros financieros por su cuenta.'],
  ['assistant',[],null,null,true]
 ],
 en:[
  ['home',['.heroCard','.homeTruth29','.grid .card'],'☁️ Your financial hub','This is your quick overview. Use it to understand where you stand before making a decision.'],
  ['home',['.progressBox','.heroCard'],'📈 Real progress','This uses your recorded debts and payments, so you do not need to calculate progress yourself.'],
  ['home',['.homeDaily81','.grid'],'💵 Money in and out','These cards summarize income, spending and available margin so you can quickly see how tight the month is.'],
  ['home',['#nav'],'🧭 Main navigation','These are your main areas. The guide will move through them one at a time.'],
  ['income',['.card.full','.kpi'],'💰 Income','Record how much you receive and how often. This feeds the calculations behind your plan.'],
  ['debts',['.debtPulse33','.card.full'],'💳 Debt summary','See total debt, minimums and approximate interest so you know what needs attention.'],
  ['debts',['.debtTarget33','.aprNotice68','.card.full .list'],'🎯 Payment priority','Arydebts highlights the most expensive debt or tells you when APR data is missing.'],
  ['debts',['.rowActions','.card.full button.primary','.card.full'],'✍️ Debt actions','Add, edit, delete and record payments here. Real payments stay linked to the debt.'],
  ['expenses',['.card.full .list','.list','.card.full'],'🌸 Expenses','Record what you really spend and separate essential, variable and small expenses.'],
  ['expenses',['.quick','#quickAnt','.card.full button.primary'],'🐜 Quick capture','Capture little purchases quickly so hidden money leaks become visible.'],
  ['plan',['.planHero34','.planPulse34','.card.full'],'🧭 Your plan','Arydebts combines income, expenses, minimums and debts to show what to protect first.'],
  ['plan',['.planAttack34','.planStatus34','.card.full'],'⚡ Next action','This turns your numbers into a concrete priority so you do not have to guess.'],
  ['progress',['.progressBox','.card.full'],'📊 Progress','Check your real payoff progress using recorded payments.'],
  ['calendar',['.cal35','.card.full'],'📅 Calendar','Due dates, reminders and dated movements come together here.'],
  ['calendar',['.calDetail35','.list','.card.full'],'🔔 Day details','Pick a day to review due dates and reminders. Record a payment only after you actually make it.'],
  ['more',['.menuGrid','.menuItem','.more94'],'✨ More tools','These complementary tools are also part of your financial system.'],
  ['ants',['.antHero25','.card.full'],'🐜 Small expenses','This screen groups small monthly expenses and shows how much they may be draining from your income.'],
  ['ants',['.antPulse28','.antStats26','.card.full'],'🔎 Impact and trend','See today, the last seven days, month-end projection and your heaviest category.'],
  ['analysis',['.analysis93','.analysisTabs93','.card.full'],'📊 Money analysis','Analyze real income and outflows by period or switch to net-worth analysis to see trends.'],
  ['analysis',['.analysisMetrics93','.analysisCard93','.card.full'],'🏦 Net worth and real records','Keep assets, received income and debts recorded once so the analysis stays clean and avoids duplicates.'],
  ['buy',['#buyPrice','.card.full'],'🛍️ Can I buy this?','Enter a price and Arydebts compares it with your current margin before you spend.'],
  ['goals',['.choiceGrid','.card.full','.list'],'🎯 Goals','Save what you are working toward so paying debt connects to a real purpose.'],
  ['notifications',['.card.full','.list'],'🔔 Notifications','Review important reminders and pending actions here.'],
  ['profile',['.card.full','.menuGrid'],'👤 Profile & preferences','Manage language, currency and personal preferences here.'],
  ['profile',['button[onclick*="settings"],button[onclick*="aryV18Settings"],.btn'],'⚙️ Settings','Adjust the experience, access data backups and replay this guide.'],
  ['assistant',['.assistantIntro58','.assistant58'],'✦ Arydebts Assistant','Ask what something means or get help understanding your numbers.'],
  ['assistant',['#chatinput','.assistant58 input','.assistant58'],'💬 Ask anything about the app','Type your question here. The assistant guides you without changing financial records on its own.'],
  ['assistant',[],null,null,true]
 ],
 pt:[
  ['home',['.heroCard','.homeTruth29','.grid .card'],'☁️ Seu centro financeiro','Este é o resumo rápido para entender sua situação antes de decidir.'],
  ['home',['.progressBox','.heroCard'],'📈 Progresso real','Este indicador usa dívidas e pagamentos registrados.'],
  ['home',['.homeDaily81','.grid'],'💵 Entradas e saídas','Veja renda, gastos e margem disponível rapidamente.'],
  ['home',['#nav'],'🧭 Navegação principal','Estas são as áreas principais. O guia vai percorrê-las uma por uma.'],
  ['income',['.card.full','.kpi'],'💰 Renda','Registre quanto recebe e com que frequência. Isso alimenta os cálculos do plano.'],
  ['debts',['.debtPulse33','.card.full'],'💳 Resumo das dívidas','Veja dívida total, mínimos e juros aproximados.'],
  ['debts',['.debtTarget33','.aprNotice68','.card.full .list'],'🎯 Prioridade','O Arydebts destaca a dívida mais cara ou avisa quando falta APR.'],
  ['debts',['.rowActions','.card.full button.primary','.card.full'],'✍️ Ações da dívida','Adicione, edite, exclua e registre pagamentos ligados à dívida.'],
  ['expenses',['.card.full .list','.list','.card.full'],'🌸 Gastos','Registre gastos essenciais, variáveis e pequenos gastos.'],
  ['expenses',['.quick','#quickAnt','.card.full button.primary'],'🐜 Registro rápido','Capture compras pequenas para enxergar vazamentos de dinheiro.'],
  ['plan',['.planHero34','.planPulse34','.card.full'],'🧭 Seu plano','Renda, gastos, mínimos e dívidas se transformam em um plano claro.'],
  ['plan',['.planAttack34','.planStatus34','.card.full'],'⚡ Próxima ação','Aqui você vê uma prioridade concreta em vez de adivinhar.'],
  ['progress',['.progressBox','.card.full'],'📊 Progresso','Confira o avanço real usando pagamentos registrados.'],
  ['calendar',['.cal35','.card.full'],'📅 Calendário','Vencimentos, lembretes e movimentos por data ficam reunidos aqui.'],
  ['calendar',['.calDetail35','.list','.card.full'],'🔔 Detalhe do dia','Escolha um dia para ver vencimentos e lembretes. Registre um pagamento somente depois de realizá-lo.'],
  ['more',['.menuGrid','.menuItem','.more94'],'✨ Mais ferramentas','Estas ferramentas complementares também fazem parte do seu sistema.'],
  ['ants',['.antHero25','.card.full'],'🐜 Pequenos gastos','Esta tela reúne pequenos gastos do mês e mostra quanto eles podem consumir da sua renda.'],
  ['ants',['.antPulse28','.antStats26','.card.full'],'🔎 Impacto e tendência','Veja hoje, últimos sete dias, projeção mensal e a categoria que mais pesa.'],
  ['analysis',['.analysis93','.analysisTabs93','.card.full'],'📊 Análise de dinheiro','Analise entradas e saídas reais por período ou mude para patrimônio para enxergar tendências.'],
  ['analysis',['.analysisMetrics93','.analysisCard93','.card.full'],'🏦 Patrimônio e registros reais','Registre bens, renda recebida e dívidas uma única vez para evitar duplicações.'],
  ['buy',['#buyPrice','.card.full'],'🛍️ Posso comprar?','Digite um preço e compare com sua margem atual antes de gastar.'],
  ['goals',['.choiceGrid','.card.full','.list'],'🎯 Metas','Guarde o que deseja conquistar para conectar o plano a um objetivo real.'],
  ['notifications',['.card.full','.list'],'🔔 Notificações','Veja alertas, lembretes e ações pendentes.'],
  ['profile',['.card.full','.menuGrid'],'👤 Perfil e preferências','Gerencie idioma, moeda e preferências pessoais.'],
  ['profile',['button[onclick*="settings"],button[onclick*="aryV18Settings"],.btn'],'⚙️ Configurações','Ajuste a experiência, acesse backups e repita este guia.'],
  ['assistant',['.assistantIntro58','.assistant58'],'✦ Assistente Arydebts','Pergunte o significado de qualquer área ou peça ajuda com seus números.'],
  ['assistant',['#chatinput','.assistant58 input','.assistant58'],'💬 Pergunte sobre o app','Digite sua dúvida aqui. O assistente orienta sem alterar seus registros sozinho.'],
  ['assistant',[],null,null,true]
 ]
};
let active=false,index=0,auto=true,timer=0,target=null,renderTimer=0,renderRaf=0,paintTimer=0,renderToken=0,startTimer=0;
const steps=()=>S[lang()]||S.es;
const completed=()=>{try{return localStorage.getItem(KEY)==='done'}catch{return false}};
const markDone=()=>{try{localStorage.setItem(KEY,'done')}catch{}};
const TARGETS={5:['.debtPulse33'],6:['.debtTarget33','.aprNotice68'],7:['.rowActions','.card.full button.primary'],13:['.calTop35','.calGrid35'],14:['.calDetail35','.calHint35'],16:['.antHero25'],17:['.antPulse28','.antStats26'],18:['.analysisTabs93','.analysis93'],19:['.analysisMetrics93','.analysisCard93']};
function css(){
 if(document.getElementById('aryFullGuideStyle125'))return;
 const st=document.createElement('style');st.id='aryFullGuideStyle125';st.textContent=`
.ary125shade{position:fixed;z-index:10000;background:rgba(2,6,18,.78);backdrop-filter:blur(1.5px);pointer-events:none;transition:all .2s ease}
.ary125focus{position:fixed;z-index:10001;border:3px solid #62ddff;border-radius:20px;box-shadow:0 0 0 5px rgba(89,221,255,.15),0 0 38px rgba(85,209,255,.65);pointer-events:none;transition:all .2s ease}
.ary125navShield{position:fixed;z-index:10002;background:rgba(2,6,18,.78);pointer-events:none;border-radius:24px}
.ary125cloud{position:fixed;z-index:10003;width:min(410px,calc(100vw - 24px));padding:16px;border:1px solid rgba(124,226,255,.5);border-radius:26px;background:linear-gradient(145deg,rgba(16,28,58,.98),rgba(31,23,67,.98));box-shadow:0 24px 80px rgba(0,0,0,.55),0 0 36px rgba(69,193,255,.14);color:#f2f8ff;transition:top .18s ease,left .18s ease;max-height:min(360px,calc(100dvh - 28px));overflow:auto;box-sizing:border-box}
.ary125cloud:before{content:'☁️';position:absolute;right:16px;top:10px;font-size:28px;filter:drop-shadow(0 5px 9px rgba(0,0,0,.25))}
.ary125cloud h3{margin:0 42px 6px 0;font-size:17px}.ary125cloud p{margin:0;color:#bdd0e8;line-height:1.48;font-size:13px}
.ary125bar{display:flex;gap:4px;margin:13px 0 11px}.ary125bar i{height:4px;flex:1;background:rgba(255,255,255,.11);border-radius:9px}.ary125bar i.on{background:linear-gradient(90deg,#39dfc5,#5bcfff,#8b6bff)}
.ary125actions{display:grid;grid-template-columns:auto minmax(78px,1fr) auto;align-items:center;gap:7px}.ary125actions button{min-height:40px;padding:8px 11px;border-radius:13px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);color:#fff;font-weight:800;-webkit-text-fill-color:currentColor}.ary125actions .primary{min-width:96px;background:linear-gradient(135deg,#27d5bb,#43bfff,#765bff)!important;border:0!important;color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:1!important;visibility:visible!important}
.ary125meta{text-align:center;font-size:11px;color:#8fa5c4}.ary125auto{display:block;margin:4px auto 0;border:0!important;background:transparent!important;color:#9db4d2!important;-webkit-text-fill-color:#9db4d2!important;font-size:11px;padding:2px!important;min-height:24px!important}
.ary125skip{position:fixed;z-index:10004;right:14px;top:max(12px,env(safe-area-inset-top));border:1px solid rgba(255,255,255,.16);background:rgba(10,18,38,.82);color:#c9d8eb;border-radius:999px;padding:8px 12px;font-size:11px}
.ary125final{text-align:center}.ary125final .finishIcon{font-size:42px;margin-bottom:8px}.ary125final p{font-size:14px}
.ary-light .ary125cloud{background:linear-gradient(145deg,rgba(255,255,255,.99),rgba(241,246,255,.99));color:#172641;border-color:#81cfdf;box-shadow:0 24px 65px rgba(39,62,103,.28)}.ary-light .ary125cloud p{color:#60738c}.ary-light .ary125actions button{color:#203653;background:#fff;border-color:#d6e2ef}.ary-light .ary125actions .primary{background:linear-gradient(135deg,#27d5bb,#43bfff,#765bff)!important;color:#fff!important;-webkit-text-fill-color:#fff!important}.ary-light .ary125skip{background:rgba(255,255,255,.92);color:#40536e;border-color:#ccd9e8}
@media(max-width:560px),(pointer:coarse){.ary125cloud{padding:14px;border-radius:20px;max-height:min(350px,calc(100dvh - 20px));width:calc(100vw - 20px)}.ary125cloud h3{font-size:16px}.ary125cloud p{font-size:12px}.ary125actions{grid-template-columns:minmax(86px,auto) minmax(70px,1fr) minmax(98px,auto)}.ary125actions button{font-size:12px;padding:7px 9px}.ary125actions .primary{min-width:98px}.ary125shade{backdrop-filter:none}}
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
function targetQueries(step){return TARGETS[index]||step[1]||[]}
function selectTarget(step){for(const q of targetQueries(step)){try{const el=document.querySelector(q);if(!el)continue;const r=el.getBoundingClientRect();if(r.width>0&&r.height>0)return el}catch{}}return null}
function targetRect(el){if(!el)return null;const raw=el.getBoundingClientRect(),frame=guideFrame(),maxBottom=isNavTarget(el)?frame.bottom:frame.contentBottom,left=Math.max(4,raw.left),right=Math.min(innerWidth-4,raw.right),top=Math.max(frame.top,raw.top),bottom=Math.min(maxBottom,raw.bottom);if(right-left<8||bottom-top<8)return null;return{left,top,right,bottom,width:right-left,height:bottom-top}}
function shieldNav(targetEl){const nav=navElement();if(!nav||isNavTarget(targetEl))return;const r=nav.getBoundingClientRect();if(r.width<=0||r.height<=0)return;const n=document.createElement('div');n.className='ary125navShield';Object.assign(n.style,{left:Math.max(0,r.left)+'px',top:Math.max(0,r.top)+'px',width:Math.min(innerWidth,r.width)+'px',height:Math.min(innerHeight-Math.max(0,r.top),r.height)+'px'});document.body.appendChild(n)}
function shade(rect,targetEl){const pad=9,vw=innerWidth,vh=innerHeight,frame=guideFrame(),maxBottom=isNavTarget(targetEl)?frame.bottom:frame.contentBottom,r=rect?{l:Math.max(0,rect.left-pad),t:Math.max(frame.top,rect.top-pad),r:Math.min(vw,rect.right+pad),b:Math.min(maxBottom,rect.bottom+pad)}:null;const parts=r?[[0,0,vw,r.t],[0,r.t,r.l,r.b-r.t],[r.r,r.t,vw-r.r,r.b-r.t],[0,r.b,vw,vh-r.b]]:[[0,0,vw,vh]];for(const [l,t,w,h] of parts){if(w<=0||h<=0)continue;const n=document.createElement('div');n.className='ary125shade';Object.assign(n.style,{left:l+'px',top:t+'px',width:w+'px',height:h+'px'});document.body.appendChild(n)}if(r){const f=document.createElement('div');f.className='ary125focus';Object.assign(f.style,{left:r.l+'px',top:r.t+'px',width:(r.r-r.l)+'px',height:(r.b-r.t)+'px'});document.body.appendChild(f)}shieldNav(targetEl)}
function placeCloud(box,rect){const frame=guideFrame(),gap=12,w=box.offsetWidth||Math.min(410,innerWidth-20),safeH=Math.max(150,frame.contentBottom-frame.top),natural=Math.min(box.scrollHeight||box.offsetHeight||210,safeH-8);let left=MOBILE()?Math.max(8,Math.round((innerWidth-w)/2)):Math.max(8,Math.min(innerWidth-w-8,rect?rect.left+(rect.width-w)/2:(innerWidth-w)/2)),top;if(rect){const below=rect.bottom+gap,roomBelow=frame.contentBottom-below,roomAbove=rect.top-gap-frame.top,preferBelow=roomBelow>=natural+4||roomBelow>=roomAbove,room=Math.max(104,preferBelow?roomBelow:roomAbove),h=Math.min(natural,room);box.style.maxHeight=Math.max(104,h)+'px';top=preferBelow?Math.min(below,frame.contentBottom-h):Math.max(frame.top,rect.top-gap-h)}else{box.style.maxHeight=Math.min(natural,safeH-8)+'px';top=Math.max(frame.top,frame.top+(safeH-Math.min(natural,safeH-8))/2)}box.style.left=left+'px';box.style.top=top+'px'}
function schedule(){clearTimeout(timer);if(auto&&active)timer=setTimeout(()=>window.aryFullGuideNext125?.(),AUTO_MS)}
function ensureTargetVisible(el){if(!el||isNavTarget(el))return false;const frame=guideFrame(),top=frame.top+12,bottom=frame.contentBottom-12,r=el.getBoundingClientRect();if(r.top>=top&&r.bottom<=bottom)return false;let delta=0;if(r.height<=Math.max(80,bottom-top)){if(r.top<top)delta=r.top-top;else if(r.bottom>bottom)delta=r.bottom-bottom}else delta=r.top-top;try{if(Math.abs(delta)<2)return false;window.scrollBy({top:delta,left:0,behavior:MOBILE()?'auto':'smooth'});return true}catch{return false}}
function requestGuideRender(delay=0){clearTimeout(renderTimer);cancelAnimationFrame(renderRaf);const token=++renderToken;const run=()=>{renderRaf=requestAnimationFrame(()=>{renderRaf=0;if(active&&token===renderToken)renderStep(token)})};if(delay>0)renderTimer=setTimeout(run,delay);else run()}
function renderStep(token=renderToken){if(!active||token!==renderToken)return;css();const step=steps()[index];if(!step)return finish(false);if(step[4])return renderFinal();clearTimeout(paintTimer);target=selectTarget(step);const moved=target?ensureTargetVisible(target):false;const expected=index;const draw=()=>{paintTimer=0;if(!active||expected!==index||token!==renderToken)return;paint(step,expected,token)};if(moved)paintTimer=setTimeout(draw,MOBILE()?65:220);else renderRaf=requestAnimationFrame(draw)}
function paint(step,expected=index,token=renderToken){if(!active||expected!==index||token!==renderToken)return;clearNodes();target=selectTarget(step);const rect=target?targetRect(target):null;shade(rect,target);const x=copy(),box=document.createElement('section');box.className='ary125cloud';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-live','polite');box.innerHTML=`<h3>${step[2]}</h3><p>${step[3]}</p><div class="ary125bar">${steps().map((_,i)=>`<i class="${i<=index?'on':''}"></i>`).join('')}</div><div class="ary125actions"><button ${index?'':'disabled style="opacity:.35"'} onclick="aryFullGuideBack125()">‹ ${x.back}</button><div><div class="ary125meta">${x.count} ${index+1} / ${steps().length}</div><button class="ary125auto" onclick="aryFullGuideToggleAuto125()">${auto?'⏸ '+x.pause:'▶ '+x.play}</button></div><button class="primary" aria-label="${x.next}" onclick="aryFullGuideNext125()">${x.next} ›</button></div>`;document.body.appendChild(box);const sk=document.createElement('button');sk.className='ary125skip';sk.textContent=x.skip;sk.onclick=()=>finish(false);document.body.appendChild(sk);placeCloud(box,rect);schedule()}
function renderFinal(){if(!active)return;clearNodes();shade(null,null);const x=copy(),box=document.createElement('section');box.className='ary125cloud ary125final';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.innerHTML=`<div class="finishIcon">🎉</div><h3>${x.doneTitle}</h3><p>${x.doneText}</p><div class="ary125bar">${steps().map(()=>'<i class="on"></i>').join('')}</div><div class="ary125actions"><button onclick="aryFullGuideBack125()">‹ ${x.back}</button><div class="ary125meta">${x.count} ${index+1} / ${steps().length}</div><button class="primary" onclick="aryFullGuideFinish125()">${x.finish}</button></div>`;document.body.appendChild(box);placeCloud(box,null);clearTimeout(timer)}
function route(i){const step=steps()[i];if(!step)return;clearTimeout(timer);clearTimeout(paintTimer);index=i;renderToken++;const dest=step[0];if(typeof go==='function'&&typeof screen==='string'&&screen!==dest){go(dest);requestGuideRender(MOBILE()?80:120)}else requestGuideRender()}
function silenceContextGuide(){document.querySelectorAll('.aryGuide94').forEach(n=>n.remove());try{if(s?.guide94?.active===true&&typeof window.aryEndGuide94==='function')window.aryEndGuide94()}catch{document.querySelectorAll('.aryGuide94').forEach(n=>n.remove())}}
function start(force=false){cancelAutoStart();if(active)return;if(!profile||!s?.onboarded)return;if(!force&&!canAutoStart())return;try{localStorage.setItem(OLD_KEY,'done')}catch{};try{if(typeof aryGuideSkip116==='function')aryGuideSkip116()}catch{};document.getElementById('aryGuide116')?.remove();document.getElementById('aryGuideMask116')?.remove();active=true;auto=true;index=0;silenceContextGuide();route(0)}
function finish(openAssistant){active=false;clearPending();clearNodes();document.getElementById('aryGuideBlock127')?.remove();document.documentElement.classList.remove('aryGuideLite144','aryGuideUltra148');markDone();if(openAssistant&&typeof go==='function')go('assistant')}
window.aryFullGuideNext125=()=>{if(!active)return;if(index>=steps().length-1)return finish(true);route(index+1)};
window.aryFullGuideBack125=()=>{if(active&&index>0)route(index-1)};
window.aryFullGuideToggleAuto125=()=>{if(!active)return;auto=!auto;clearTimeout(timer);requestGuideRender()};
window.aryFullGuideFinish125=()=>finish(true);
window.aryStartFullGuide125=()=>{try{localStorage.removeItem(KEY)}catch{};active=false;clearPending();start(true)};
window.aryFullGuideStatus125=()=>({active,index,automatic:auto,completed:completed(),steps:steps().length,unified:true});
window.aryGuideUnified125=true;
window.addEventListener('resize',()=>active&&requestGuideRender(MOBILE()?100:60),{passive:true});
if(!MOBILE())window.addEventListener('scroll',()=>{if(active)requestGuideRender(120)},{passive:true});
document.addEventListener('pointerdown',()=>{if(!active&&startTimer)cancelAutoStart()},{capture:true,passive:true});
const priorRender=window.render;window.render=function(){const out=priorRender.apply(this,arguments);if(active){cancelAutoStart();document.querySelectorAll('.aryGuide94,.ary126node').forEach(n=>n.remove());requestGuideRender(MOBILE()?55:80)}else if(canAutoStart())scheduleAutoStart(180);else cancelAutoStart();return out};
function addRestart(){const sheet=document.querySelector('#modal .sheet');if(!sheet||sheet.querySelector('#aryRestartGuide125'))return;const b=document.createElement('button');b.id='aryRestartGuide125';b.type='button';b.className='btn widebtn';b.textContent=copy().restart;b.onclick=()=>{if(typeof closeM==='function')closeM();window.aryStartFullGuide125()};sheet.appendChild(b)}
for(const name of ['aryV18Settings','settings']){const fn=window[name];if(typeof fn==='function'&&!fn._aryGuide125){const wrapped=function(){const r=fn.apply(this,arguments);setTimeout(addRestart,0);return r};wrapped._aryGuide125=true;window[name]=wrapped}}
try{localStorage.setItem(OLD_KEY,'done')}catch{}
try{if(typeof aryGuideSkip116==='function')aryGuideSkip116()}catch{}
clearNodes();css();scheduleAutoStart(220);
})();