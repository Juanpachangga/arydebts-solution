(()=>{
'use strict';
const STYLE='aryGuideCompletionStyle132';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{title:'Tu siguiente paso',sub:'Ya conoces Arydebts. Ahora no necesitas aprender más pantallas: solo empezar con tus datos reales.',assistant:'Preguntar al asistente',home:'Ir a Inicio',ready:'Tu base ya está bastante completa. Mantén tus movimientos al día y deja que Arydebts haga el resto.',items:{income:['💰','Confirma tus ingresos','Mantén actualizado cuánto recibes y con qué frecuencia.'],debts:['💳','Agrega tu primera deuda','Saldo, mínimo, APR y vencimiento ayudan a crear una prioridad real.'],expenses:['🌸','Registra tus gastos principales','Empieza por renta, mercado, transporte y pagos recurrentes.'],goals:['🎯','Define una meta','Dale una dirección a tu esfuerzo: deuda, ahorro, casa, viaje o tranquilidad.'],calendar:['📅','Añade fechas importantes','Con vencimientos y recordatorios, el calendario puede anticiparte lo que viene.'],progress:['📊','Registra los pagos reales','Cada pago correcto mejora tu progreso y mantiene tus cálculos al día.']}},
 en:{title:'Your next step',sub:'You now know Arydebts. You do not need more screens explained—just start using your real numbers.',assistant:'Ask the assistant',home:'Go Home',ready:'Your setup is already in good shape. Keep real movements updated and let Arydebts do the rest.',items:{income:['💰','Confirm your income','Keep how much you receive and how often up to date.'],debts:['💳','Add your first debt','Balance, minimum, APR and due date create a real priority.'],expenses:['🌸','Record your main expenses','Start with housing, groceries, transport and recurring bills.'],goals:['🎯','Set a goal','Give your effort a direction: debt payoff, savings, home, travel or peace of mind.'],calendar:['📅','Add important dates','Due dates and reminders help the calendar show what is coming.'],progress:['📊','Record real payments','Each correct payment improves progress and keeps calculations current.']}},
 pt:{title:'Seu próximo passo',sub:'Agora você já conhece o Arydebts. Não precisa aprender mais telas: só começar com seus dados reais.',assistant:'Perguntar ao assistente',home:'Ir ao Início',ready:'Sua base já está bem completa. Mantenha os movimentos reais atualizados e deixe o Arydebts fazer o resto.',items:{income:['💰','Confirme sua renda','Mantenha atualizado quanto recebe e com que frequência.'],debts:['💳','Adicione sua primeira dívida','Saldo, mínimo, APR e vencimento criam uma prioridade real.'],expenses:['🌸','Registre seus principais gastos','Comece por moradia, mercado, transporte e contas recorrentes.'],goals:['🎯','Defina uma meta','Dê direção ao esforço: dívida, economia, casa, viagem ou tranquilidade.'],calendar:['📅','Adicione datas importantes','Vencimentos e lembretes ajudam o calendário a antecipar o que vem.'],progress:['📊','Registre pagamentos reais','Cada pagamento correto melhora o progresso e mantém os cálculos atualizados.']}}
};
function style(){if(document.getElementById(STYLE))return;const st=document.createElement('style');st.id=STYLE;st.textContent=`
.ary132wrap{margin:12px 0 4px;text-align:left}.ary132wrap>strong{display:block;margin-bottom:8px;font-size:13px}.ary132grid{display:grid;gap:7px}.ary132item{display:grid;grid-template-columns:28px 1fr;gap:8px;align-items:start;padding:9px 10px;border-radius:14px;border:1px solid rgba(117,220,255,.16);background:rgba(91,193,255,.07)}.ary132item i{font-style:normal;font-size:18px}.ary132item b{display:block;font-size:11.5px}.ary132item span{display:block;margin-top:2px;color:#9db3cd;font-size:10.5px;line-height:1.35}.ary132ready{padding:10px 12px;border-radius:14px;background:rgba(63,214,174,.09);border:1px solid rgba(63,214,174,.2);color:#bdebdc;font-size:11px;line-height:1.4}.ary132home{width:100%;margin-top:7px;min-height:40px;border-radius:13px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);color:#fff;font-weight:800}.ary-light .ary132item{background:#f4fbff;border-color:#d6ebf3}.ary-light .ary132item span{color:#657b91}.ary-light .ary132ready{background:#effbf7;color:#326653;border-color:#ccecdf}.ary-light .ary132home{background:#fff;color:#203653;border-color:#d6e2ef}@media(max-width:560px){.ary132item{padding:8px}.ary132item span{font-size:10px}}
`;document.head.appendChild(st)}
function plans(){
 const out=[];
 const add=k=>{if(!out.includes(k)&&out.length<3)out.push(k)};
 if(!(Number(s?.income)>0))add('income');
 if(!Array.isArray(s?.debts)||!s.debts.length)add('debts');
 if(!Array.isArray(s?.expenses)||!s.expenses.length)add('expenses');
 if((!Array.isArray(s?.goals)||!s.goals.length)&&!String(s?.goal||'').trim())add('goals');
 if(out.length<3&&(!Array.isArray(s?.calendarEvents)||!s.calendarEvents.length)&&(!Array.isArray(s?.debts)||!s.debts.some(d=>d?.due)))add('calendar');
 if(out.length<3)add('progress');
 return out.slice(0,3);
}
function goHome(){window.aryFullGuideFinish125?.();setTimeout(()=>{if(typeof go==='function')go('home')},60)}
window.aryGuideHome132=goHome;
function enhance(final){
 if(!final||final.dataset.ary132==='1')return;final.dataset.ary132='1';style();
 const c=copy[lang()]||copy.es,keys=plans();
 const p=final.querySelector('p');if(p)p.textContent=c.sub;
 const h=final.querySelector('h3');if(h)h.textContent='🎉 '+c.title;
 const wrap=document.createElement('div');wrap.className='ary132wrap';
 if(keys.length){wrap.innerHTML=`<strong>${c.title}</strong><div class="ary132grid">${keys.map(k=>{const x=c.items[k];return `<div class="ary132item"><i>${x[0]}</i><div><b>${x[1]}</b><span>${x[2]}</span></div></div>`}).join('')}</div>`}else wrap.innerHTML=`<div class="ary132ready">${c.ready}</div>`;
 const bar=final.querySelector('.ary125bar');if(bar)bar.before(wrap);else final.appendChild(wrap);
 const primary=final.querySelector('.ary125actions .primary');if(primary)primary.textContent=c.assistant;
 const home=document.createElement('button');home.type='button';home.className='ary132home';home.textContent=c.home;home.onclick=goHome;final.appendChild(home);
}
const obs=new MutationObserver(()=>document.querySelectorAll('.ary125final').forEach(enhance));obs.observe(document.documentElement,{subtree:true,childList:true});
style();document.querySelectorAll('.ary125final').forEach(enhance);
})();
