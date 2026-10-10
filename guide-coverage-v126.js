(()=>{
'use strict';
if(typeof window.aryFullGuideNext125!=='function')return;
const originalNext=window.aryFullGuideNext125,originalStart=window.aryStartFullGuide125,originalFinish=window.aryFullGuideFinish125;
let inserted=false,active=false,pos=0,timer=0,resumeAuto=false;
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const extra={
 es:[
  ['ants',['.antHero25','.card.full'],'🐜 Gastos hormiga','Esta pantalla reúne los pequeños gastos del mes y te muestra cuánto podrían estar drenando de tus ingresos.'],
  ['ants',['.antPulse28','.antStats26'],'🔎 Impacto y tendencia','Aquí ves lo gastado hoy, en la semana, la proyección mensual y qué categoría está pesando más.'],
  ['analysis',['.analysis93','.analysisTabs93'],'📊 Análisis de dinero','Aquí puedes analizar ingresos y salidas por período o cambiar a la vista de patrimonio. Sirve para ver tendencias, no solo saldos del día.'],
  ['analysis',['.analysisMetrics93','.analysisCard93'],'🏦 Patrimonio y registros reales','El análisis separa movimientos reales, bienes y deudas. Registra cada valor una sola vez para evitar duplicados y mantener una lectura limpia.']
 ],
 en:[
  ['ants',['.antHero25','.card.full'],'🐜 Small recurring expenses','This screen groups small monthly expenses and shows how much they may be draining from your income.'],
  ['ants',['.antPulse28','.antStats26'],'🔎 Impact and trend','See today, the last seven days, month-end projection and your heaviest category.'],
  ['analysis',['.analysis93','.analysisTabs93'],'📊 Money analysis','Analyze real income and outflows by period or switch to net-worth analysis to see trends, not just today’s balances.'],
  ['analysis',['.analysisMetrics93','.analysisCard93'],'🏦 Net worth and real records','Keep assets, received income and debts recorded once so the analysis stays clean and avoids duplicates.']
 ],
 pt:[
  ['ants',['.antHero25','.card.full'],'🐜 Pequenos gastos','Esta tela reúne pequenos gastos do mês e mostra quanto eles podem consumir da sua renda.'],
  ['ants',['.antPulse28','.antStats26'],'🔎 Impacto e tendência','Veja hoje, últimos sete dias, projeção mensal e a categoria que mais pesa.'],
  ['analysis',['.analysis93','.analysisTabs93'],'📊 Análise de dinheiro','Analise entradas e saídas reais por período ou mude para patrimônio para enxergar tendências.'],
  ['analysis',['.analysisMetrics93','.analysisCard93'],'🏦 Patrimônio e registros reais','Registre bens, renda recebida e dívidas uma única vez para evitar duplicações.']
 ]
};
const list=()=>extra[lang()]||extra.es;
const labels=()=>lang()==='en'?{back:'Back',next:'Next',skip:'Skip guide'}:lang()==='pt'?{back:'Voltar',next:'Próximo',skip:'Pular guia'}:{back:'Atrás',next:'Siguiente',skip:'Saltar guía'};
function clear(){clearTimeout(timer);document.querySelectorAll('.ary126node').forEach(n=>n.remove())}
function target(step){for(const q of step[1]){const el=document.querySelector(q);if(el&&el.getBoundingClientRect().width>0)return el}return null}
function masks(rect){const vw=innerWidth,vh=innerHeight,p=9,r=rect?{l:Math.max(0,rect.left-p),t:Math.max(0,rect.top-p),r:Math.min(vw,rect.right+p),b:Math.min(vh,rect.bottom+p)}:null,parts=r?[[0,0,vw,r.t],[0,r.t,r.l,r.b-r.t],[r.r,r.t,vw-r.r,r.b-r.t],[0,r.b,vw,vh-r.b]]:[[0,0,vw,vh]];for(const [l,t,w,h] of parts){if(w<=0||h<=0)continue;const n=document.createElement('div');n.className='ary125shade ary126node';Object.assign(n.style,{left:l+'px',top:t+'px',width:w+'px',height:h+'px'});document.body.appendChild(n)}if(r){const n=document.createElement('div');n.className='ary125focus ary126node';Object.assign(n.style,{left:r.l+'px',top:r.t+'px',width:(r.r-r.l)+'px',height:(r.b-r.t)+'px'});document.body.appendChild(n)}}
function paint(){if(!active)return;clear();const step=list()[pos],el=target(step);if(el)try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch{};setTimeout(()=>{if(!active)return;clear();const current=target(step),rect=current?current.getBoundingClientRect():null;masks(rect);const l=labels(),box=document.createElement('section');box.className='ary125cloud ary126node';box.innerHTML=`<h3>${step[2]}</h3><p>${step[3]}</p><div class="ary125bar">${list().map((_,i)=>`<i class="${i<=pos?'on':''}"></i>`).join('')}</div><div class="ary125actions"><button ${pos?'':'disabled style="opacity:.35"'} id="ary126back">‹ ${l.back}</button><div class="ary125meta">Extra ${pos+1} / ${list().length}</div><button class="primary" id="ary126next">${l.next} ›</button></div>`;document.body.appendChild(box);const w=Math.min(390,innerWidth-24),h=box.offsetHeight||210;let left=Math.max(12,Math.min(innerWidth-w-12,rect?rect.left+(rect.width-w)/2:(innerWidth-w)/2)),top=rect&&rect.bottom+14+h<innerHeight?rect.bottom+14:rect&&rect.top-h-14>12?rect.top-h-14:Math.max(12,innerHeight-h-12);box.style.left=left+'px';box.style.top=top+'px';const sk=document.createElement('button');sk.className='ary125skip ary126node';sk.textContent=l.skip;sk.onclick=()=>{active=false;clear();originalFinish()};document.body.appendChild(sk);box.querySelector('#ary126back').onclick=()=>{if(pos>0){pos--;route()}};box.querySelector('#ary126next').onclick=advance;timer=setTimeout(advance,5200)},240)}
function route(){const step=list()[pos];if(typeof go==='function'&&screen!==step[0]){go(step[0]);setTimeout(paint,120)}else paint()}
function advance(){if(!active)return;if(pos<list().length-1){pos++;route();return}active=false;inserted=true;clear();originalNext();if(resumeAuto)setTimeout(()=>{const st=window.aryFullGuideStatus125?.();if(st?.active&&!st.automatic)window.aryFullGuideToggleAuto125?.()},220)}
function startExtra(){const st=window.aryFullGuideStatus125?.();resumeAuto=!!st?.automatic;if(resumeAuto)window.aryFullGuideToggleAuto125?.();document.querySelectorAll('.ary125shade,.ary125focus,.ary125cloud,.ary125skip').forEach(n=>n.remove());active=true;pos=0;route()}
window.aryFullGuideNext125=function(){const st=window.aryFullGuideStatus125?.();if(st?.active&&st.index===15&&!inserted&&!active)return startExtra();return originalNext.apply(this,arguments)};
window.aryStartFullGuide125=function(){inserted=false;active=false;clear();return originalStart.apply(this,arguments)};
})();
