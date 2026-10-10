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
function itemHtml(key){
 const c=window.__aryCompletionItems143?.[lang()]?.[key];
 if(!c)return'';
 return `<div class="ary132item"><i>${c[0]}</i><div><b>${c[1]}</b><span>${c[2]}</span></div></div>`;
}
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
 try{
   if(typeof realGo==='function')window.go=function(route){if(route==='assistant')return false;return realGo.apply(this,arguments)};
   window.aryFullGuideFinish125();
 }finally{if(typeof realGo==='function')window.go=realGo}
 if(typeof realGo==='function')realGo('home');
}
function polish(final){
 if(!final)return;
 const keys=missingKeys(),c=copy[lang()]||copy.es;
 const wrap=final.querySelector('.ary132wrap');
 if(wrap){
   if(keys.length)wrap.innerHTML=`<strong>${c.title}</strong><div class="ary132grid">${keys.map(itemHtml).join('')}</div>`;
   else wrap.innerHTML=`<div class="ary132ready">${c.ready}</div>`;
 }
 const home=final.querySelector('.ary132home');
 if(home){home.onclick=finishHome;home.dataset.ary143='1'}
 final.dataset.ary143='1';
}
const sync=()=>document.querySelectorAll('.ary125final').forEach(polish);
const obs=new MutationObserver(()=>requestAnimationFrame(sync));obs.observe(document.documentElement,{subtree:true,childList:true});
window.aryGuideCompletion143={plans:missingKeys,finishHome};
sync();
})();
