// Plain official links: eligibility, account opening and transactions belong to each provider.
(()=>{
'use strict';
const data={
savings:{name:'Ally Bank',url:'https://www.ally.com/bank/online-savings-account/',country:'US'},
cd:{name:'Ally Bank',url:'https://www.ally.com/bank/high-yield-cd/',country:'US'},
treasury:{name:'TreasuryDirect',url:'https://www.treasurydirect.gov/RS/UN-AccountCreate.do',country:'US'},
funds:{name:'Fidelity',url:'https://www.fidelity.com/investing/brokerage-account',country:'US'},
reit:{name:'Fidelity',url:'https://www.fidelity.com/investing/brokerage-account',country:'US'},
home:{name:'CFPB',url:'https://www.consumerfinance.gov/owning-a-home/explore/',country:'US'},
co:{name:'Bancolombia',url:'https://www.bancolombia.com/personas/productos/inversiones',country:'CO'}
};
const copy={
es:{open:'Explorar en ',steps:'Cómo dar el siguiente paso',external:'Sitio oficial externo · ',note:'Ejemplos de proveedores, no una recomendación personalizada. Revisa si aceptan residentes de tu país y compara condiciones. La apertura, los depósitos y las operaciones se realizan con el proveedor.',home:'Explorar opciones para vivienda',country:{US:'Estados Unidos',CO:'Colombia'},
savings:['Compara tasas, comisiones, protección del depósito y disponibilidad del dinero.','En la web del banco, revisa los requisitos y abre la cuenta solo si te conviene.','Desde el banco, vincula tu cuenta y decide cuánto transferir.'],
cd:['Compara plazo, tasa y penalizaciones por retiro antes del vencimiento.','Revisa requisitos y elige un CD que deje tu reserva para imprevistos disponible.','Abre y financia el CD en el banco cuando hayas revisado las condiciones.'],
treasury:['Revisa los requisitos de TreasuryDirect y abre tu cuenta en su web oficial.','Dentro de tu cuenta, entra a Buy Direct y revisa el tipo de letra, plazo y subasta.','Elige el importe y la cuenta bancaria; lee y confirma allí la orden.'],
funds:['Compara intermediarios, requisitos, costos y tipos de cuenta.','Si eliges ese proveedor, abre una cuenta y revisa cómo aportar fondos.','Investiga el fondo o ETF, su prospecto y riesgo antes de enviar una orden allí.'],
reit:['Distingue REIT cotizados, fondos inmobiliarios y productos que no cotizan.','Compara intermediarios y sus requisitos antes de abrir y financiar una cuenta.','Revisa composición, costos y liquidez del producto; decide y opera con el proveedor.'],
home:['Define precio objetivo, ahorros disponibles y gastos de la compra.','Consulta opciones y costos de financiación en la guía del CFPB.','Compara propuestas de entidades antes de presentar una solicitud; esta guía no vende inmuebles.'],
co:['Compara fondos, entidad administradora, riesgo y plazo de rescate.','En la entidad, verifica requisitos, reglamento, comisiones y monto mínimo vigente.','Si eliges un fondo, abre y aporta desde sus canales oficiales.']},
en:{open:'Explore at ',steps:'How to take the next step',external:'External official website · ',note:'Provider examples, not personalized recommendations. Check residency eligibility and compare terms. Accounts, deposits and transactions are handled by the provider.',home:'Explore homebuying options',country:{US:'United States',CO:'Colombia'},
savings:['Compare rates, fees, deposit protection and access to funds.','Review bank eligibility and open an account only if it fits your needs.','Link your bank account and choose an amount to transfer at the provider.'],
cd:['Compare the term, rate and early-withdrawal penalties.','Review eligibility and choose a CD that leaves emergency funds accessible.','Open and fund the CD with the bank after reviewing its terms.'],
treasury:['Review TreasuryDirect eligibility and open an account on its official site.','Inside your account, use Buy Direct to review bill types, terms and auctions.','Choose the amount and bank account; review and confirm the order there.'],
funds:['Compare brokers, eligibility, costs and account types.','If you choose that provider, open an account and review how funding works.','Research the fund or ETF, its prospectus and risks before placing an order there.'],
reit:['Distinguish listed REITs, real estate funds and non-traded products.','Compare brokers and eligibility before opening and funding an account.','Review holdings, fees and liquidity; make decisions and trade with the provider.'],
home:['Define your target price, available savings and purchase costs.','Explore financing options and costs with the CFPB guide.','Compare lender proposals before applying; this guide does not sell property.'],
co:['Compare funds, managers, risks and redemption terms.','Review eligibility, fund rules, fees and current minimum amounts with the institution.','If you choose a fund, open and contribute through its official channels.']},
pt:{open:'Explorar em ',steps:'Como dar o próximo passo',external:'Site oficial externo · ',note:'Exemplos de provedores, não recomendações personalizadas. Confira a elegibilidade por residência e compare condições. Contas, depósitos e operações são realizados com o provedor.',home:'Explorar opções de moradia',country:{US:'Estados Unidos',CO:'Colômbia'},
savings:['Compare taxas, custos, proteção de depósitos e acesso ao dinheiro.','Revise os requisitos do banco e abra uma conta somente se fizer sentido para você.','Vincule sua conta bancária e decida quanto transferir no provedor.'],
cd:['Compare prazo, taxa e penalidade por resgate antecipado.','Revise requisitos e preserve o acesso à reserva para imprevistos.','Abra e financie o CD no banco depois de ler as condições.'],
treasury:['Revise os requisitos do TreasuryDirect e abra uma conta no site oficial.','Na sua conta, acesse Buy Direct e confira letras, prazos e leilões.','Escolha valor e conta bancária; leia e confirme a ordem no provedor.'],
funds:['Compare corretoras, requisitos, custos e tipos de conta.','Se escolher o provedor, abra uma conta e confira como aportar recursos.','Pesquise o fundo ou ETF, prospecto e riscos antes de enviar uma ordem.'],
reit:['Diferencie REITs listados, fundos imobiliários e produtos não negociados.','Compare corretoras e requisitos antes de abrir e financiar uma conta.','Revise composição, custos e liquidez; decida e opere com o provedor.'],
home:['Defina preço-alvo, poupança disponível e custos de compra.','Explore opções e custos de financiamento com a guia do CFPB.','Compare propostas de instituições antes de solicitar; esta guia não vende imóveis.'],
co:['Compare fundos, administradores, riscos e prazos de resgate.','Confira requisitos, regulamento, custos e mínimo vigente com a instituição.','Se escolher um fundo, abra e aporte pelos canais oficiais.']}
};
function paint(){
 if(screen!=='investingGuide216'||!window.aryPremiumActive214?.())return;
 const lang=s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es',x=copy[lang];
 document.querySelectorAll('[data-learning-kind235]').forEach(card=>{
  if(card.querySelector('.learningPath235'))return;
  const kind=card.dataset.learningKind235,p=data[kind];if(!p)return;
  const box=document.createElement('div');box.className='learningPath235';box.setAttribute('data-ary-copy','');
  const a=document.createElement('a');a.className='btn primary';a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=(kind==='home'?x.home:x.open+p.name)+' ↗';
  const source=document.createElement('small');source.textContent=x.external+new URL(p.url).hostname+' · '+x.country[p.country];
  const details=document.createElement('details'),summary=document.createElement('summary'),list=document.createElement('ol');summary.textContent=x.steps;
  for(const text of x[kind]){const li=document.createElement('li');li.textContent=text;list.append(li)}
  details.append(summary,list);box.append(a,source,details);card.append(box);
 });
 const host=document.querySelector('.learningCards216');if(host&&!document.getElementById('providerNote235')){const note=document.createElement('p');note.id='providerNote235';note.className='marketDisclaimer216';note.setAttribute('data-ary-copy','');note.textContent=x.note;host.after(note)}
}
const before=window.render;window.render=function(){const result=before.apply(this,arguments);paint();return result};paint();
})();
