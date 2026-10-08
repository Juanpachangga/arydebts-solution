const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
 const scripts=[...fs.readFileSync(__dirname+'/index.html','utf8').matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
function boot(existing=false){
 const nodes={},data={};
 const element=()=>({innerHTML:'',textContent:'',style:{setProperty(){}},dataset:{},classList:{add(){},remove(){},toggle(){}},querySelectorAll:()=>[],querySelector:()=>null,setAttribute(){},addEventListener(){},appendChild(){},remove(){}});
 for(const id of ['app','nav','modal','toast'])nodes[id]=element();
 const document={body:element(),documentElement:element(),getElementById:id=>nodes[id]||null,querySelector:sel=>sel.startsWith('#')?nodes[sel.slice(1)]||null:null,querySelectorAll:()=>[],createTreeWalker:()=>({nextNode:()=>null}),createElement:element,addEventListener(){}};
 if(existing&&typeof existing==='object')Object.assign(data,existing);
 else if(existing){data['arydebts-profile']=JSON.stringify({name:'Test',email:'test@example.com'});data['arydebts-v3']=JSON.stringify({currency:'USD',locale:'es-US',mode:'lite',name:'Test',income:1000,incomeFrequency:'weekly',goal:'security',goals:['security'],theme:'dark',navOrder:['home','debts','expenses','plan','more'],onboarded:true,savings:0,debts:[],expenses:[],calendarEvents:[],payments:[]});}
 const context=vm.createContext({document,location:{hash:existing?'#home':''},history:{length:1,replaceState(){},pushState(){}},localStorage:{getItem:k=>data[k]??null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]},navigator:{},console,Intl,NodeFilter:{SHOW_TEXT:4},MutationObserver:class{observe(){}},addEventListener(){},setTimeout(){},requestAnimationFrame(){},confirm:()=>true});
 context.window=context;
 for(const file of scripts)vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context,{filename:file});
 return{context,nodes,data,run:code=>vm.runInContext(code,context)};
}
for(const existing of [false,true]){
 const b=boot(existing);
 for(const locale of ['es-US','es-CO','es-ES','en-US','pt-BR']){
  b.run(`s.locale=${JSON.stringify(locale)}`);
  for(const route of ['home','income','debts','expenses','plan','progress','calendar','profile','setupIncome','setupGoal','setupDebts','setupExpenses']){
   b.run(`go(${JSON.stringify(route)})`);assert.ok(b.nodes.app.innerHTML.length,route);
  }
  b.run("go('income');incomeForm()");assert.match(b.nodes.modal.innerHTML,/id="inc45"/);
 }
 b.run("s.locale='es-US';s.income=1000;s.incomeFrequency='weekly';s.expenses=[];s.debts=[]");
 assert.ok(Math.abs(b.run('aryRealData54.snapshot().income')-1000*52/12)<1e-8);
 b.run("s.incomeFrequency='monthly';incomeForm()");assert.match(b.nodes.modal.innerHTML,/value="monthly" selected/);
 b.nodes.inc45={value:'1,250.50'};b.nodes.freq45={value:'weekly'};b.run('arySaveIncome45()');assert.equal(b.run('s.income'),1250.5);assert.equal(b.run('s.incomeFrequency'),'weekly');
 assert.equal(JSON.parse(b.data['arydebts-v3']).income,1250.5);
 b.nodes.inc45.value='-1';b.run('arySaveIncome45()');assert.equal(b.run('s.income'),1250.5);
 b.run("s.locale='es-CO'");b.nodes.inc45.value='1.250,50';b.run('arySaveIncome45()');assert.equal(b.run('s.income'),1250.5);
 b.run("s.income=100;s.incomeFrequency='monthly';s.debts=[{id:1,name:'Debt',balance:500,min:200}]");assert.equal(b.run('aryRealData54.snapshot().availableAfterMinimums'),-100);
 b.run("s.locale='es-US';s.payments=[]");
 assert.equal(b.run("aryApplyPayment54({debtId:1,amount:100}).ok"),true);assert.equal(b.run('s.debts[0].balance'),400);
 assert.equal(b.run("aryApplyPayment54({debtId:1,amount:401}).ok"),false);assert.equal(b.run('s.debts[0].balance'),400);assert.equal(b.run('s.payments.length'),1);
 b.run('aryDeletePayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),500);assert.equal(b.run('s.payments.length'),0);
 b.run("s.debts=[{id:10,name:'Calendar payment',balance:300,min:20}];s.payments=[];s.calendarEvents=[];aryApplyPayment54({debtId:10,amount:100,date:'2000-01-02'});go('calendar');aryPickDay35('2000-01-02')");
 assert.match(b.nodes.app.innerHTML,/Calendar payment/,'Recorded payment appears in calendar');
 assert.match(b.nodes.app.innerHTML,/aryEditPayment54/,'Calendar edits use central payment editor');
 assert.match(b.nodes.app.innerHTML,/aryDeletePayment54/,'Calendar deletions use central payment ledger');
 b.nodes.editPayDebt54={value:'10'};b.nodes.editPayAmount54={value:'50'};b.nodes.editPayDate54={value:'2000-01-03'};b.nodes.editPayNote54={value:'Edited'};
 b.run('arySaveEditedPayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),250);
 b.run("aryPickDay35('2000-01-02')");assert.doesNotMatch(b.nodes.app.innerHTML,/Calendar payment/);
 b.run("aryPickDay35('2000-01-03')");assert.match(b.nodes.app.innerHTML,/Calendar payment/);
 b.nodes.editPayAmount54.value='25';b.nodes.editPayDate54.value='2099-01-01';b.run('arySaveEditedPayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),250);assert.equal(b.run('s.payments[0].amount'),50);assert.equal(b.run('s.payments[0].date'),'2000-01-03');
 b.run('aryDeletePayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),300);assert.doesNotMatch(b.nodes.app.innerHTML,/Calendar payment/);
 assert.equal(b.run("aryApplyPayment54({debtId:10,amount:50,date:'2099-01-01'}).ok"),false,'Future payments cannot reduce balance');
 assert.equal(b.run("aryApplyPayment54({debtId:10,amount:50,date:'2026-02-30'}).ok"),false,'Invalid dates cannot enter ledger');
 assert.equal(b.run('s.debts[0].balance'),300);assert.equal(b.run('s.payments.length'),0);
 b.run("Date.now=()=>1700000000000;aryApplyPayment54({debtId:10,amount:10,date:'2000-01-01'});aryApplyPayment54({debtId:10,amount:10,date:'2000-01-01'})");assert.notEqual(b.run('s.payments[0].id'),b.run('s.payments[1].id'),'Fast payments have distinct IDs');
 const restored=boot(b.data);assert.equal(restored.run('s.debts[0].balance'),280);assert.equal(restored.run('s.payments.length'),2);restored.run("go('calendar');aryPickDay35('2000-01-01')");assert.match(restored.nodes.app.innerHTML,/Calendar payment/);
 b.nodes.calDebt35={value:'10'};b.run("arySaveDue35('2099-01-01')");assert.equal(b.run('s.debts[0].balance'),280);assert.equal(b.run('s.debts[0].due'),'2099-01-01');
 const quotedName="Dad's payment",quotedNote="Family's purchase & clothes <new>";
 b.nodes.cevDate36={value:'2000-01-04'};b.nodes.cevName36={value:quotedName};b.nodes.cevAmount36={value:'25'};b.nodes.cevType36={value:'payment'};b.nodes.cevNote36={value:quotedNote};b.nodes.calPayDebt54={value:'10'};
 b.run('arySaveEvent36(null)');assert.match(b.nodes.modal.innerHTML,/onclick="aryCommitCalendarPayment54\(\)"/);assert.doesNotMatch(b.nodes.modal.innerHTML,/Dad's payment/);
 b.run('aryCommitCalendarPayment54()');assert.equal(b.run('s.debts[0].balance'),255);assert.equal(b.run('s.payments[2].note'),quotedNote);b.run('aryCommitCalendarPayment54()');assert.equal(b.run('s.payments.length'),3,'Repeated confirmation does not duplicate a payment');
 b.run("aryPickDay35('2000-01-04')");assert.match(b.nodes.app.innerHTML,/&lt;new&gt;/);
 b.nodes.n={value:'Family clothes'};b.nodes.b={value:'100'};b.nodes.c={value:'Variable'};b.nodes.edate={value:b.run('localDate()')};b.run('saveExpense(null)');assert.equal(b.run('aryRealData54.snapshot().expenses'),100);
 b.nodes.b.value='0';b.run('saveExpense(null)');assert.equal(b.run('s.expenses.length'),1);
 b.run("s.expenses.push({id:2,name:'Old',amount:200,date:'2000-01-01',cat:'Variable'})");assert.equal(b.run('aryRealData54.snapshot().expenses'),100);
 for(const theme of ['light','dark']){b.run(`s.theme=${JSON.stringify(theme)};localStorage.setItem('ary-theme-v46',s.theme);render()`);assert.equal(b.context.document.documentElement.dataset.aryTheme,theme);}
 b.run("s.name='Gastos';s.debts=[{id:1,name:'Mis deudas',balance:500,min:20,apr:10}];s.expenses=[{id:1,name:'Ingreso semanal',amount:100,date:localDate(),cat:'Variable'}];s.goals=['Comprar casa'];s.locale='en-US'");
 for(const route of ['debts','expenses','plan','goals']){b.run(`go('${route}')`);assert.match(b.nodes.app.innerHTML,/data-ary-user translate="no"/);}
 assert.match(b.run('aryHumanGreeting41().title'),/data-ary-user translate="no">Gastos/);
 b.run('aryPaymentForm54()');assert.match(b.nodes.modal.innerHTML,/<option data-ary-user translate="no"/);
 assert.match(b.run("userText('<img src=x onerror=alert(1)>')"),/&lt;img/);
 for(const locale of ['en-US','pt-BR']){
  b.run(`s.locale='${locale}'`);
  const protectedParent={tagName:'SPAN',closest:()=>({})},plainParent={tagName:'SPAN',closest:()=>null},textarea={tagName:'TEXTAREA',closest:()=>({})};
  const textNodes=[{nodeValue:'Mis deudas',parentElement:protectedParent},{nodeValue:'Mis deudas',parentElement:plainParent},{nodeValue:'Mis deudas',parentElement:textarea}];
  const option={textContent:'Mis deudas',closest:()=>({})};
  const root={querySelectorAll:sel=>sel==='option'?[option]:[]};
  b.context.document.createTreeWalker=()=>{let i=0;return{nextNode:()=>textNodes[i++]||null}};
  b.context.aryTranslate(root);b.context.aryTranslateRemaining53(root);
  assert.equal(textNodes[0].nodeValue,'Mis deudas');assert.equal(textNodes[2].nodeValue,'Mis deudas');assert.equal(option.textContent,'Mis deudas');assert.equal(textNodes[1].nodeValue,locale==='en-US'?'My debts':'Minhas dívidas');
 }
 assert.equal(b.run('s.debts[0].name'),'Mis deudas');assert.equal(b.run('s.expenses[0].name'),'Ingreso semanal');
 console.log('PASS complete script order, 12 routes x 5 locales, income edits, persistence, deficit, payments, dated expenses, theme state:',existing?'existing profile':'fresh storage');
 console.log('PASS translated interface and protected user names, goals, messages, textarea contents and debt options.');
 console.log('PASS calendar payment display, edits, deletions, reload, future-date protection and unique payment IDs.');
}
console.log('DOM stubs: this verifies JavaScript integration, not browser layout or camera permissions.');
