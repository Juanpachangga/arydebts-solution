(()=>{
'use strict';
const STYLE='aryGuideFirstDataStyle130';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const notes={
 es:{
  debts:'Aún no tienes deudas registradas. Cuando agregues la primera, aquí aparecerán su saldo, mínimo, APR, vencimiento y prioridad.',
  expenses:'Si todavía no ves gastos, es normal. Agrega los principales primero y Arydebts irá construyendo una imagen más real de tu mes.',
  calendar:'El calendario se llena con vencimientos, recordatorios y eventos. Si está vacío, empieza agregando fechas a tus deudas o crea un recordatorio.',
  goals:'Todavía no hay metas guardadas. Puedes crear una cuando quieras; sirven para conectar tu esfuerzo financiero con algo que realmente quieres lograr.',
  analysis:'Al principio el análisis puede verse vacío. Se irá llenando con ingresos recibidos, gastos, pagos, bienes y deudas reales que registres.',
  ants:'Si aún no hay gastos hormiga, perfecto. Cuando registres cafés, apps, snacks o transportes pequeños, aquí podrás ver su impacto.'
 },
 en:{
  debts:'You have no debts recorded yet. After you add the first one, its balance, minimum, APR, due date and priority will appear here.',
  expenses:'If you do not see expenses yet, that is normal. Add the main ones first and Arydebts will build a more realistic picture of your month.',
  calendar:'The calendar fills with due dates, reminders and events. If it is empty, add dates to debts or create a reminder.',
  goals:'No goals are saved yet. Create one whenever you want to connect your financial effort to something meaningful.',
  analysis:'Analysis may be empty at first. It fills as you record real income, expenses, payments, assets and debts.',
  ants:'No small recurring expenses yet? Great. When you record coffee, apps, snacks or small transport costs, their impact will appear here.'
 },
 pt:{
  debts:'Você ainda não tem dívidas registradas. Ao adicionar a primeira, saldo, mínimo, APR, vencimento e prioridade aparecerão aqui.',
  expenses:'Se ainda não há gastos, é normal. Adicione primeiro os principais e o Arydebts construirá uma visão mais real do seu mês.',
  calendar:'O calendário recebe vencimentos, lembretes e eventos. Se estiver vazio, adicione datas às dívidas ou crie um lembrete.',
  goals:'Ainda não há metas salvas. Crie uma quando quiser para conectar seu esforço financeiro a algo importante.',
  analysis:'A análise pode começar vazia. Ela será preenchida conforme você registrar renda, gastos, pagamentos, bens e dívidas reais.',
  ants:'Ainda não há pequenos gastos? Ótimo. Quando registrar cafés, apps, lanches ou transportes pequenos, o impacto aparecerá aqui.'
 }};
function emptyFor(route){
 if(route==='debts')return !Array.isArray(s?.debts)||s.debts.length===0;
 if(route==='expenses')return !Array.isArray(s?.expenses)||s.expenses.length===0;
 if(route==='calendar')return (!Array.isArray(s?.calendarEvents)||s.calendarEvents.length===0)&&(!Array.isArray(s?.debts)||!s.debts.some(d=>d?.due));
 if(route==='goals')return (!Array.isArray(s?.goals)||s.goals.length===0)&&!String(s?.goal||'').trim();
 if(route==='analysis')return (!Array.isArray(s?.expenses)||s.expenses.length===0)&&(!Array.isArray(s?.payments)||s.payments.length===0)&&(!Array.isArray(s?.incomeEntries93)||s.incomeEntries93.length===0)&&(!Array.isArray(s?.assets93)||s.assets93.length===0);
 if(route==='ants')return !Array.isArray(s?.expenses)||!s.expenses.some(e=>e?.cat==='Hormiga');
 return false;
}
function ensureStyle(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary130link{position:fixed;z-index:10002;height:2px;transform-origin:0 50%;pointer-events:none;background:linear-gradient(90deg,rgba(92,220,255,.25),rgba(92,220,255,.95));box-shadow:0 0 12px rgba(92,220,255,.55)}
.ary130link:after{content:'';position:absolute;right:-1px;top:50%;width:9px;height:9px;border-radius:50%;transform:translate(50%,-50%);background:#70e3ff;box-shadow:0 0 0 5px rgba(112,227,255,.14),0 0 18px rgba(112,227,255,.8)}
.ary130new{margin:10px 0 2px;padding:9px 11px;border-radius:14px;border:1px solid rgba(105,222,255,.18);background:rgba(86,196,255,.08);color:#aedaec;font-size:11px;line-height:1.4}
.ary130new b{color:#d9f6ff}.ary-light .ary130new{background:#effaff;border-color:#c9edf5;color:#5d7589}.ary-light .ary130new b{color:#24566d}
@media(max-width:560px){.ary130link{display:none}.ary130new{font-size:10.5px}}
@media(prefers-reduced-motion:reduce){.ary130link{display:none}}
`;document.head.appendChild(st)}
function activeCloud(){return document.querySelector('.ary125cloud')}
function currentFocus(){return document.querySelector('.ary125focus:not(.ary126node),.ary126node.ary125focus,.ary125focus')}
function clearLink(){document.querySelectorAll('.ary130link').forEach(n=>n.remove())}
function addNote(cloud){
 if(!cloud||cloud.dataset.aryEmpty130==='1')return;
 const route=typeof screen==='string'?screen:'';
 if(!emptyFor(route)||!notes[lang()]?.[route])return;
 cloud.dataset.aryEmpty130='1';
 const n=document.createElement('div');n.className='ary130new';n.innerHTML=`<b>${lang()==='en'?'First time here:':lang()==='pt'?'Primeira vez aqui:':'Primera vez aquí:'}</b> ${notes[lang()][route]}`;
 const actions=cloud.querySelector('.ary125actions');
 if(actions)actions.before(n);else cloud.appendChild(n);
}
function drawLink(){
 clearLink();
 const cloud=activeCloud(),focus=currentFocus();
 if(!cloud||!focus)return;
 const a=cloud.getBoundingClientRect(),b=focus.getBoundingClientRect();
 if(!a.width||!b.width)return;
 const ac={x:a.left+a.width/2,y:a.top+a.height/2},bc={x:b.left+b.width/2,y:b.top+b.height/2};
 let start,end;
 if(Math.abs(ac.y-bc.y)>=Math.abs(ac.x-bc.x)){
  if(ac.y<bc.y){start={x:ac.x,y:a.bottom};end={x:bc.x,y:b.top}}
  else{start={x:ac.x,y:a.top};end={x:bc.x,y:b.bottom}}
 }else{
  if(ac.x<bc.x){start={x:a.right,y:ac.y};end={x:b.left,y:bc.y}}
  else{start={x:a.left,y:ac.y};end={x:b.right,y:bc.y}}
 }
 const dx=end.x-start.x,dy=end.y-start.y,len=Math.hypot(dx,dy);if(len<20)return;
 const line=document.createElement('div');line.className='ary130link';Object.assign(line.style,{left:start.x+'px',top:start.y+'px',width:Math.max(0,len-8)+'px',transform:`rotate(${Math.atan2(dy,dx)}rad)`});document.body.appendChild(line);
}
function sync(){ensureStyle();const cloud=activeCloud();if(!cloud){clearLink();return}addNote(cloud);requestAnimationFrame(drawLink)}
const obs=new MutationObserver(()=>requestAnimationFrame(sync));obs.observe(document.documentElement,{subtree:true,childList:true});
for(const ev of ['resize','scroll'])window.addEventListener(ev,()=>requestAnimationFrame(sync),{passive:true});
ensureStyle();sync();
})();
