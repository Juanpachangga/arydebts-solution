const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
 const scripts=[...fs.readFileSync(__dirname+'/index.html','utf8').matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
function boot(existing=false,startHash){
 const nodes={},data={};
 const element=()=>{const classes=new Set();return{innerHTML:'',textContent:'',style:{setProperty(){}},dataset:{},classList:{add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name),toggle:(name,on)=>on===false?classes.delete(name):classes.add(name)},querySelectorAll:()=>[],querySelector:()=>null,setAttribute(){},addEventListener(){},appendChild(){},remove(){}}};
 for(const id of ['app','nav','modal','toast'])nodes[id]=element();
 const document={body:element(),documentElement:element(),getElementById:id=>nodes[id]||null,querySelector:sel=>sel.startsWith('#')?nodes[sel.slice(1)]||null:null,querySelectorAll:()=>[],createTreeWalker:()=>({nextNode:()=>null}),createElement:element,addEventListener(){}};
 if(existing&&typeof existing==='object')Object.assign(data,existing);
 else if(existing){data['arydebts-profile']=JSON.stringify({name:'Test',email:'test@example.com'});data['arydebts-v3']=JSON.stringify({currency:'USD',locale:'es-US',mode:'lite',name:'Test',income:1000,incomeFrequency:'weekly',goal:'security',goals:['security'],theme:'dark',navOrder:['home','debts','expenses','plan','more'],onboarded:true,savings:0,debts:[],expenses:[],calendarEvents:[],payments:[]});}
 const context=vm.createContext({document,location:{hash:startHash??(existing?'#home':'')},history:{length:1,replaceState(){},pushState(){}},localStorage:{getItem:k=>data[k]??null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]},navigator:{},URL,matchMedia:()=>({matches:false,addEventListener(){}}),console,Intl,NodeFilter:{SHOW_TEXT:4},MutationObserver:class{observe(){}},addEventListener(){},setTimeout(){},setInterval(){},requestAnimationFrame(){},confirm:()=>true});
 context.window=context;
 for(const file of scripts)vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context,{filename:file});
 return{context,nodes,data,run:code=>vm.runInContext(code,context)};
}
for(const existing of [false,true]){
 const b=boot(existing);
 const monthly=boot(existing);monthly.run("s.income=1000;s.incomeFrequency='monthly';s.expenses=[{id:1,name:'Food',amount:200,date:localDate(),cat:'Esencial'}];s.debts=[{id:1,name:'Card',balance:1000,min:100},{id:2,name:'Small debt',balance:40,min:100}];s.payments=[]");
 assert.equal(monthly.run('aryRealData54.snapshot().minimums'),140,'Reserve never exceeds remaining debt');assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),660);
 monthly.run('aryApplyPayment54({debtId:1,amount:60})');assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),60);assert.equal(monthly.run('aryRealData54.snapshot().minimums'),80);assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),660,'Partial minimum is not counted twice');
 monthly.run('aryApplyPayment54({debtId:1,amount:150})');assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),210);assert.equal(monthly.run('aryRealData54.snapshot().minimums'),40);assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),550,'Extra payments reduce estimated margin');
 monthly.run('aryApplyPayment54({debtId:2,amount:40})');assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),250);assert.equal(monthly.run('aryRealData54.snapshot().minimums'),0);assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),550,'Paid-off debt still counts as money paid this month');
 assert.equal(monthly.run('aryAssessPurchase45(100).before'),550);monthly.run("go('plan')");assert.match(monthly.nodes.app.innerHTML,/Pagos de deuda este mes/);assert.match(monthly.nodes.app.innerHTML,/Reserva estimada de mínimos/);
 monthly.run("aryDeleteConfirmed68('payment',s.payments[1].id)");assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),100);assert.equal(monthly.run('aryRealData54.snapshot().minimums'),40);assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),660);
 const monthReload=boot(monthly.data);assert.equal(monthReload.run('aryRealData54.snapshot().availableAfterMinimums'),660);
 const sharedReal=monthReload.context.aryRealData54;delete monthReload.context.aryRealData54;assert.equal(monthReload.run('aryAssessPurchase45(100).before'),660,'Fallback purchase calculation uses the same monthly engine');monthReload.run("go('plan')");assert.match(monthReload.nodes.app.innerHTML,/Pagos de deuda este mes/);monthReload.context.aryRealData54=sharedReal;
 monthly.run("s.payments.push({id:99,debtId:1,amount:999,date:'2000-01-01'});s.payments.push({id:100,debtId:1,amount:999,date:'2099-01-01'})");assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),100,'Other months and future payments do not enter current cash flow');
 assert.equal(monthly.run("aryBudgetSnapshot54(s,new Date(2099,0,2)).debtPayments"),999,'Payments are grouped by the selected month');
 monthly.run("s.debts.push({id:3,name:'Other card',balance:40,min:40})");
 assert.equal(monthly.run("aryBudgetSnapshot54(s,new Date(2099,0,2)).minimums"),40,'Minimum credit applies only to the linked debt');
 const legacyState={currency:'USD',locale:'es-US',mode:'lite',name:'Test',income:1000,incomeFrequency:'monthly',goal:'Family emergency fund',goals:['Comprar casa','Family emergency fund','Comprar carro','Negocio propio'],theme:'dark',navOrder:['home','debts','expenses','plan','more'],onboarded:true,savings:0,debts:[],expenses:[],calendarEvents:[],payments:[]};
 const migrated=boot({'arydebts-v3':JSON.stringify(legacyState),'arydebts-profile':JSON.stringify({name:'Test'})});
 assert.equal(migrated.run('s.goal'),'Family emergency fund','Migration preserves chosen custom primary goal');assert.deepEqual(JSON.parse(migrated.run('JSON.stringify(s.goals)')),['home','Family emergency fund','car','Negocio propio']);
 const goalsReload=boot(migrated.data);assert.equal(goalsReload.run('s.goal'),'Family emergency fund');assert.deepEqual(JSON.parse(goalsReload.run('JSON.stringify(s.goals)')),['home','Family emergency fund','car','Negocio propio']);
 migrated.run("go('setupGoal')");assert.match(migrated.nodes.app.innerHTML,/Family emergency fund/);assert.match(migrated.nodes.app.innerHTML,/aryGoalForm54\(\)/);migrated.run("aryChooseGoal54('security')");assert.equal(migrated.run('s.goal'),'Family emergency fund','Selecting an additional preset does not replace custom primary');migrated.run("aryChooseGoal54('security')");
 for(const [locale,label]of [['es-US','Comprar una casa'],['en-US','Buy a home'],['pt-BR','Comprar uma casa']]){migrated.run(`s.locale='${locale}';go('goals')`);assert.ok(migrated.nodes.app.innerHTML.includes(label));assert.match(migrated.nodes.app.innerHTML,/Family emergency fund/);assert.doesNotMatch(migrated.nodes.app.innerHTML,/>home<|>car</);}
 migrated.run('arySetPrimaryGoal54(2)');assert.equal(migrated.run('s.goal'),'car');migrated.run('removeGoal(0)');assert.equal(migrated.run('s.goal'),'car','Removing another goal preserves primary');
 migrated.nodes.newGoal={value:'My child’s future <school>'};migrated.run('saveGoal()');assert.equal(migrated.run('s.goals.length'),4);assert.match(migrated.nodes.app.innerHTML,/&lt;school&gt;/);
 migrated.run('saveGoal()');assert.equal(migrated.run('s.goals.length'),4,'Duplicate goals are rejected');migrated.run('arySetPrimaryGoal54(3)');assert.equal(migrated.run('s.goal'),'My child’s future <school>');
 const customReload=boot(migrated.data);assert.equal(customReload.run('s.goal'),'My child’s future <school>');assert.equal(customReload.run('s.goals.length'),4);
 migrated.run('aryRemoveGoal54(3)');assert.equal(migrated.run('s.goal'),'Family emergency fund');const goalCount=migrated.run('s.goals.length');migrated.nodes.newGoal.value='';migrated.run('saveGoal()');assert.equal(migrated.run('s.goals.length'),goalCount);migrated.nodes.newGoal.value='X'.repeat(121);migrated.run('saveGoal()');assert.equal(migrated.run('s.goals.length'),goalCount);
 migrated.run("s.locale='es-CO';s.savings=0");migrated.nodes.sv={value:'100,50'};migrated.run('saveSaving()');assert.equal(migrated.run('s.savings'),100.5);migrated.nodes.sv.value='-5';migrated.run('saveSaving()');assert.equal(migrated.run('s.savings'),100.5);
 for(const locale of ['es-US','es-CO','es-ES','en-US','pt-BR']){
  b.run(`s.locale=${JSON.stringify(locale)}`);
  for(const route of ['home','income','debts','expenses','plan','progress','calendar','profile','buy','setupIncome','setupGoal','setupDebts','setupExpenses']){
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
 b.run("aryDeleteConfirmed68('payment',s.payments[0].id)");assert.equal(b.run('s.debts[0].balance'),500);assert.equal(b.run('s.payments.length'),0);
 b.run("s.debts=[{id:10,name:'Calendar payment',balance:300,min:20}];s.payments=[];s.calendarEvents=[];aryApplyPayment54({debtId:10,amount:100,date:'2000-01-02'});go('calendar');aryPickDay35('2000-01-02')");
 assert.match(b.nodes.app.innerHTML,/Calendar payment/,'Recorded payment appears in calendar');
 assert.match(b.nodes.app.innerHTML,/aryEditPayment54/,'Calendar edits use central payment editor');
 assert.match(b.nodes.app.innerHTML,/aryDeletePayment54/,'Calendar deletions use central payment ledger');
 b.nodes.editPayDebt54={value:'10'};b.nodes.editPayAmount54={value:'50'};b.nodes.editPayDate54={value:'2000-01-03'};b.nodes.editPayNote54={value:'Edited'};
 b.run('arySaveEditedPayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),250);
 b.run("aryPickDay35('2000-01-02')");assert.doesNotMatch(b.nodes.app.innerHTML,/Calendar payment/);
 b.run("aryPickDay35('2000-01-03')");assert.match(b.nodes.app.innerHTML,/Calendar payment/);
 b.nodes.editPayAmount54.value='25';b.nodes.editPayDate54.value='2099-01-01';b.run('arySaveEditedPayment54(s.payments[0].id)');assert.equal(b.run('s.debts[0].balance'),250);assert.equal(b.run('s.payments[0].amount'),50);assert.equal(b.run('s.payments[0].date'),'2000-01-03');
 b.run("aryDeleteConfirmed68('payment',s.payments[0].id)");assert.equal(b.run('s.debts[0].balance'),300);assert.doesNotMatch(b.nodes.app.innerHTML,/Calendar payment/);
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
 b.run("s.locale='es-US';s.income=1000;s.incomeFrequency='weekly';s.debts=[{id:1,name:'Car',balance:1000,min:100}];s.expenses=[{id:1,name:'Food',amount:200,date:localDate(),cat:'Esencial'},{id:2,name:'Historical',amount:9999,date:'2000-01-01',cat:'Variable'}]");
 b.run("go('buy')");assert.match(b.nodes.app.innerHTML,/id="buyName45"/);assert.match(b.nodes.app.innerHTML,/onclick="aryCheckBuy45\(\)"/);
 const stateBefore=b.run('JSON.stringify(s)');const assessment=b.run('aryAssessPurchase45(100)');assert.equal(assessment.status,'ESTIMATE');assert.ok(Math.abs(assessment.before-(1000*52/12-200-100))<1e-8);assert.equal(assessment.after,assessment.before-100);assert.equal(b.run('JSON.stringify(s)'),stateBefore,'Analysis does not register an expense');
 b.nodes.buyPrice={value:'100'};b.nodes.buyName45={value:"Family's clothes <new>"};b.nodes.buyResult={innerHTML:''};b.run('checkBuy()');assert.match(b.nodes.buyResult.innerHTML,/&lt;new&gt;/);assert.match(b.nodes.buyResult.innerHTML,/saldo bancario/);assert.equal(b.run('JSON.stringify(s)'),stateBefore);
 b.run("s.income=0");assert.equal(b.run('aryAssessPurchase45(100).status'),'MISSING_INCOME');assert.equal(b.run('aryAssessPurchase45(100).before'),null);
 b.run("s.income=200;s.incomeFrequency='monthly'");assert.equal(b.run('aryAssessPurchase45(100).status'),'SHORTFALL');
 b.run("s.income=400");assert.equal(b.run('aryAssessPurchase45(100).status'),'ZERO_MARGIN');
 b.run("s.income=1000;s.expenses.push({id:3,name:'Undated',amount:100,cat:'Variable'})");assert.equal(b.run('aryAssessPurchase45(100).status'),'INCOMPLETE');
 for(const price of [0,-1,NaN,Infinity]){b.context.testPrice=price;assert.equal(b.run('aryAssessPurchase45(testPrice).status'),'INVALID');}
 b.run("s.expenses=s.expenses.filter(e=>e.date);s.locale='es-CO'");b.nodes.buyPrice.value='1.000,50';b.run('aryCheckBuy45()');assert.match(b.nodes.buyResult.innerHTML,/1\.000,50/);
 for(const [locale,heading,note] of [['en-US','Can I buy this?','bank balance'],['pt-BR','Posso comprar isto?','saldo bancário']]){b.run(`s.locale='${locale}';go('buy');aryCheckBuy45()`);assert.ok(b.nodes.app.innerHTML.includes(heading));assert.ok(b.nodes.buyResult.innerHTML.includes(note));}
 b.run("s.locale='es-US';s.calendarEvents=[{id:1,name:'Reminder only',amount:9999,date:'2099-01-01',kind:'reminder'}];s.debts[0].due='invalid-date'");assert.equal(b.run('aryAssessPurchase45(100).due'),null,'Reminders and invalid dates are not treated as obligations');
 b.run("s.debts[0].due='2099-01-01'");assert.equal(b.run('aryAssessPurchase45(100).due.name'),'Car');
 const margin=b.run('aryAssessPurchase45(100).after');b.run("s.expenses.push({id:4,name:'New expense',amount:50,date:localDate(),cat:'Variable'})");assert.equal(b.run('aryAssessPurchase45(100).after'),margin-50,'Each analysis reads current finances');
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
 const originalCreate=b.context.document.createElement,images=[],revoked=[],encodes=[];let urlIndex=0,photoRefreshes=0;
 b.context.URL={createObjectURL:()=>`blob:test-${++urlIndex}`,revokeObjectURL:url=>revoked.push(url)};
 b.context.Image=class{constructor(){this.naturalWidth=4000;this.naturalHeight=3000;images.push(this)}set src(value){this.url=value}};
 b.context.document.createElement=tag=>{if(tag!=='canvas')return originalCreate(tag);const canvas={width:0,height:0,getContext:()=>({fillRect(){},drawImage(){}}),toDataURL:(type,quality)=>{encodes.push({width:canvas.width,height:canvas.height,type,quality});return'data:image/jpeg;base64,'+'A'.repeat(100)}};return canvas};
 const originalProfile=b.context.aryProfile46;b.context.aryProfile46=()=>{photoRefreshes++;originalProfile();for(const id of ['aryName46','aryEmail46','aryBio54'])b.nodes[id]={value:'RESET'}};
 b.run("s.locale='es-US';go('profile');aryProfile46()");
 const draft={aryName46:'Unsaved name',aryEmail46:'draft@example.com',aryBio54:'Unsaved biography'};for(const [id,value]of Object.entries(draft))b.nodes[id]={value};
 const financialBeforePhoto=b.data['arydebts-v3'],input={files:[{type:'image/jpeg',size:10*1024*1024}],value:'selected'};
 b.context.arySavePhoto46(input);assert.equal(input.value,'');images.at(-1).onload();assert.equal(encodes.at(-1).width,768);assert.equal(encodes.at(-1).height,576);assert.equal(encodes.at(-1).type,'image/jpeg');assert.ok(b.data['ary-profile-photo-v46'].length<512*1024);
 for(const [id,value]of Object.entries(draft))assert.equal(b.nodes[id].value,value,'Photo refresh preserves unsaved profile fields');assert.equal(b.data['arydebts-v3'],financialBeforePhoto,'Photo does not modify finances');
 const savedPhoto=b.data['ary-profile-photo-v46'],originalSet=b.context.localStorage.setItem;b.context.localStorage.setItem=(key,value)=>{if(key==='ary-profile-photo-v46')throw Error('Quota');originalSet(key,value)};
 b.context.arySavePhoto46(input);images.at(-1).onload();assert.equal(b.data['ary-profile-photo-v46'],savedPhoto);assert.match(b.nodes.toast.textContent,/No pudimos guardar/);b.context.localStorage.setItem=originalSet;
 const count=images.length;b.context.arySavePhoto46({files:[{type:'text/plain',size:100}],value:'selected'});b.context.arySavePhoto46({files:[{type:'image/jpeg',size:21*1024*1024}],value:'selected'});assert.equal(images.length,count);assert.equal(b.data['ary-profile-photo-v46'],savedPhoto);
 b.context.arySavePhoto46(input);images.at(-1).onerror();assert.match(b.nodes.toast.textContent,/No pudimos abrir/);assert.equal(b.data['ary-profile-photo-v46'],savedPhoto);
 b.context.arySavePhoto46(input);const oldImage=images.at(-1);b.context.arySavePhoto46(input);const latestImage=images.at(-1),encodeCount=encodes.length;oldImage.onload();assert.equal(encodes.length,encodeCount,'An older upload cannot overwrite the newer selection');latestImage.naturalWidth=1000;latestImage.naturalHeight=3000;latestImage.onload();assert.equal(encodes.at(-1).width,256);assert.equal(encodes.at(-1).height,768);
 b.context.arySavePhoto46(input);const closingImage=images.at(-1),refreshBeforeClose=photoRefreshes;b.run("closeM();screen='home'");closingImage.onload();assert.equal(photoRefreshes,refreshBeforeClose,'A completed upload does not reopen a closed profile');
 b.context.arySavePhoto46(input);const removedImage=images.at(-1);b.context.aryRemovePhoto46();assert.equal(b.data['ary-profile-photo-v46'],undefined);removedImage.onload();assert.equal(b.data['ary-profile-photo-v46'],undefined,'Removing photo cancels a pending upload');assert.equal(revoked.length,urlIndex,'Temporary image URLs are released');
 console.log('PASS complete script order, 13 routes x 5 locales, income edits, persistence, deficit, payments, dated expenses, theme state:',existing?'existing profile':'fresh storage');
 console.log('PASS translated interface and protected user names, goals, messages, textarea contents and debt options.');
 console.log('PASS calendar payment display, edits, deletions, reload, future-date protection and unique payment IDs.');
 console.log('PASS purchase assessment uses shared snapshot, exposes missing data, supports locales and leaves finances unchanged.');
 console.log('PASS photo compression, profile draft preservation, quota/decode failures, concurrent uploads, modal close and removal.');
 console.log('PASS legacy/custom goal migration, primary selection, localized labels, duplicates, reload and savings inputs.');
 console.log('PASS monthly cash flow accounts for actual payments, remaining minimum reserves, payoff, deletion, reload and month boundaries.');
}
const legacy={currency:'USD',locale:'es-US',mode:'lite',theme:'dark',name:'Customer',income:850,incomeFrequency:'weekly',onboarded:true,goals:[],goal:'',savings:0,navOrder:['home','debts','expenses','plan','more'],debts:[[1,'Tarjeta de crédito',2300,75,28],[2,'Carro',8500,200,9],[3,'Teléfono',700,50,12],[4,'Renta atrasada',1200,300,0],[5,'Préstamo personal',3000,150,16]].map(([id,name,balance,min,apr])=>({id,name,balance,min,apr})),expenses:[[1,'Comida',32,'Esencial'],[2,'Gasolina',60,'Esencial'],[3,'Restaurantes',35,'Hormiga'],[4,'Gaseosas / Snacks',72,'Hormiga'],[5,'Café',46,'Hormiga'],[6,'Uber / Transporte',72,'Variable']].map(([id,name,amount,cat])=>({id,name,amount,cat})),payments:[],calendarEvents:[]};
const legacyStorage=value=>({'arydebts-profile':JSON.stringify({name:'Customer',email:'customer@example.com'}),'arydebts-v3':JSON.stringify(value)});
const cleaned=boot(legacyStorage(legacy),'#welcome');
assert.equal(cleaned.run('s.debts.length+s.expenses.length'),0);
assert.equal(cleaned.run('s.income'),0);
assert.equal(cleaned.run('screen'),'welcome');
assert.equal(JSON.parse(cleaned.data['ary-v52-sample-backup-v54']).debts.reduce((a,d)=>a+d.balance,0),15700);
for(const mutate of [x=>x.debts[0].balance=2301,x=>x.income=900,x=>x.payments=[{id:1,amount:10}],x=>x.expenses[0].date='2026-10-01']){
 const actual=JSON.parse(JSON.stringify(legacy));mutate(actual);const retained=boot(legacyStorage(actual),'#welcome');assert.equal(retained.run('s.debts.length'),5);assert.equal(retained.data['ary-v52-sample-backup-v54'],undefined);assert.equal(retained.run('screen'),'welcome');
}
const portal=boot(true,'#welcome');assert.equal(portal.run('screen'),'welcome');assert.equal(portal.run('s.income'),1000);assert.equal(portal.nodes.nav.innerHTML,'');
portal.run("go('more');go('profile');back()");assert.equal(portal.run('screen'),'more');
portal.run('back()');assert.equal(portal.run('screen'),'welcome');
portal.run("go('expenses')");assert.match(portal.nodes.app.innerHTML,/antEntry55/);
console.log('PASS exact V52 sample cleanup with existing profile, archived original, changed finances preserved, direct welcome route.');
console.log('DOM stubs: this verifies JavaScript integration, not browser layout or camera permissions.');

const greeting58=boot(true);greeting58.run("const DeviceDate58=Date;Date=class extends DeviceDate58{getHours(){return 8}}");assert.match(greeting58.run('aryHumanGreeting41().title'),/^Buenos días/);greeting58.run("Date=class extends DeviceDate58{getHours(){return 14}}");assert.match(greeting58.run('aryHumanGreeting41().title'),/^Buenas tardes/);greeting58.run("Date=class extends DeviceDate58{getHours(){return 22}}");assert.match(greeting58.run('aryHumanGreeting41().title'),/^Buenas noches/);greeting58.run("go('home')");assert.doesNotMatch(greeting58.nodes.app.innerHTML,/onclick="back\(\)"/);console.log('PASS device-hour greetings and no Back on signed-in home');

const seasons59=boot(true);
for(const [m,d,birthday,expected]of [[10,8,'','halloween'],[12,25,'','christmas'],[12,31,'','newyear'],[1,1,'','newyear'],[4,10,'','everyday'],[10,8,'10-08','birthday']])assert.equal(seasons59.run(`arySeason59(new Date(2026,${m-1},${d}),'${birthday}')`),expected);
seasons59.run("s.debts=[{id:44,name:'Card',balance:100,min:7}];go('setupDebts')");assert.match(seasons59.nodes.app.innerHTML,/deleteDebt\(44\)/);seasons59.run('deleteDebt(44)');assert.equal(seasons59.run('s.debts.length'),0);
console.log('PASS seasonal boundaries, birthday priority and initial-debt deletion');
const reminders60=boot(true);
reminders60.run("s.debts=[{id:1,name:'Carro',balance:1000,min:100,due:'2026-10-09'},{id:2,name:'Luz',balance:200,min:20,due:'2026-10-08'},{id:3,name:'Paid card',balance:900,min:100,due:'2026-10-08'},{id:4,name:'Later',balance:100,min:10,due:'2026-10-16'},{id:5,name:'Invalid',balance:100,min:10,due:'2026-02-31'}];s.payments=[{id:1,debtId:3,amount:100,date:'2026-10-08'},{id:2,debtId:1,amount:100,date:'2026-10-10'}];s.expenses=[{id:1,name:'Rent already spent',amount:300,date:'2026-10-08'}];s.calendarEvents=[{id:1,name:'Renta',kind:'reminder',date:'2026-10-10'},{id:2,name:'Income',kind:'income',date:'2026-10-08'},{id:3,name:'Completed',kind:'reminder',date:'2026-10-08',completed:true},{id:4,name:'Overdue reminder',kind:'reminder',date:'2026-10-07'}]");
assert.deepEqual(JSON.parse(reminders60.run("JSON.stringify(aryDueReminders60(new Date(2026,9,8)).map(e=>[e.name,e.days,e.kind]))")),[['Overdue reminder',-1,'other'],['Luz',0,'power'],['Carro',1,'car'],['Renta',2,'home']]);
const financeBefore60=reminders60.run('JSON.stringify([s.debts,s.expenses,s.payments])');reminders60.run('aryCompleteReminder60(1,true)');assert.equal(reminders60.run('JSON.stringify([s.debts,s.expenses,s.payments])'),financeBefore60);assert.equal(reminders60.run('s.calendarEvents[0].completed'),true);assert.equal(boot(reminders60.data).run('s.calendarEvents[0].completed'),true);reminders60.run('aryCompleteReminder60(1,false)');assert.equal(reminders60.run('s.calendarEvents[0].completed'),false);
assert.equal(reminders60.run("aryDueReminders60(new Date(2026,9,10)).some(e=>e.name==='Carro')"),false,'Recorded minimum hides reminder when the payment date has arrived');
assert.equal(reminders60.run("aryReminderKind60('Aluguel')"),'home');assert.equal(reminders60.run("aryReminderKind60('Electricity')"),'power');assert.equal(reminders60.run("aryReminderKind60('Vehicle loan')"),'car');
console.log('PASS real due dates, seven-day window, overdue, paid minimums, future payments, invalid dates, completed reminders and unchanged finance records');
const personal61=boot(true),stamp61=Date.now()-124000;
for(let i=0;i<4;i++)personal61.context.aryTrackVisit61('expenses',stamp61+i*31000);
assert.equal(personal61.context.aryRankHome61(stamp61+124000)[0],'expenses');
const count61=personal61.run('s.personalization61.visits.expenses.score');personal61.context.aryTrackVisit61('expenses',stamp61+100000);assert.equal(personal61.run('s.personalization61.visits.expenses.score'),count61,'Repeated clicks are throttled');
assert.equal(boot(personal61.data).run('aryRankHome61()[0]'),'expenses','Learned routes survive reload');
personal61.run("aryPin61('calendar')");assert.equal(personal61.run('aryRankHome61()[0]'),'calendar');personal61.run("s.personalization61.enabled=false;aryPin61('')");assert.equal(personal61.run('aryRankHome61()[0]'),'debts');personal61.context.aryTrackVisit61('plan',stamp61+200000);assert.equal(personal61.run('s.personalization61.visits.plan'),undefined);
personal61.run("s.personalization61={enabled:true,pinned:'',visits:{expenses:{score:8,at:Date.now()-100*86400000},debts:{score:1,at:Date.now()}}}");assert.equal(personal61.run('aryRankHome61()[0]'),'debts','Recent use can outweigh old habits');
personal61.run("s.income=1000;s.incomeFrequency='monthly';s.debts=[{id:1,name:'Carro',balance:1000,min:100,due:localDate()}];s.payments=[];s.expenses=[{id:1,name:'Food',amount:200,date:localDate()}];s.calendarEvents=[{id:1,name:'Luz',date:localDate(),kind:'reminder',amount:80},{id:2,name:'Carro',date:localDate(),kind:'reminder',amount:100},{id:3,name:'Completed',date:localDate(),kind:'reminder',amount:999,completed:true},{id:4,name:'Income',date:localDate(),kind:'income',amount:999}]");
assert.equal(personal61.run('aryPersonalBudget61().margin'),620);assert.equal(personal61.run('aryPersonalBudget61().reserve'),80);personal61.run("s.calendarEvents.push({id:99,name:'Overdue power',date:'2000-01-01',kind:'reminder',amount:50})");assert.equal(personal61.run('aryPersonalBudget61().reserve'),130,'Overdue reminders remain reserved');personal61.run('s.calendarEvents.pop()');assert.equal(personal61.run('aryAssessPurchase45(100).after'),520,'Purchase analysis protects pending calendar reminders');assert.equal(personal61.run('aryPersonalBudget61().complete'),true);
personal61.run("s.expenses.push({id:2,name:'Unknown date',amount:500,date:''})");assert.equal(personal61.run('aryPersonalBudget61().complete'),false);
personal61.run("s.expenses=[1,2,3].map(id=>({id,name:'Gym deporte',amount:50,date:localDate()}))");assert.equal(personal61.run('aryInterest61()'),'sport');personal61.run("s.income=100;go('home')");assert.doesNotMatch(personal61.nodes.app.innerHTML,/class="interest61"/,'Deficit never promotes interest-based purchases');
personal61.run("go('notifications')");assert.doesNotMatch(personal61.nodes.app.innerHTML,/Completaste una parte de tu plan/,'Notifications do not invent completed tasks');
personal61.run('aryEmptyFinancialState54()');assert.equal(personal61.run('s.personalization61'),undefined,'New account clears learned habits');
console.log('PASS learned shortcut persistence, click throttling, recency, pinning, disable, pending bill reserve, interest evidence and truthful alerts');
const recurrence63=boot(true);
recurrence63.run("s.income=3000;s.incomeFrequency='quarterly';s.expenses=[{id:1,name:'Gas',amount:200,cat:'Esencial',frequency:'monthly',date:''},{id:2,name:'Quarterly',amount:300,frequency:'quarterly',date:''},{id:3,name:'Actual',amount:50,date:localDate()}];s.debts=[{id:1,balance:1000,min:150,paymentFrequency:'quarterly'}];s.calendarEvents=[];s.payments=[]");
assert.equal(recurrence63.run('aryRealData54.snapshot().income'),1000);
assert.equal(recurrence63.run('aryRealData54.snapshot().actualExpenses'),50);
assert.equal(recurrence63.run('aryRealData54.snapshot().recurringExpenses'),300);
assert.equal(recurrence63.run('aryRealData54.snapshot().minimums'),50);
assert.equal(recurrence63.run('aryPersonalBudget61().margin'),600);
assert.equal(recurrence63.run('aryPersonalBudget61().complete'),true);
recurrence63.run("s.expenses.push({id:4,name:'Gas recorded',amount:120,date:localDate(),sourceExpenseId:1,frequency:'once'})");
assert.equal(recurrence63.run('aryRealData54.snapshot().actualExpenses'),170);
assert.equal(recurrence63.run('aryRealData54.snapshot().recurringExpenses'),180);
assert.equal(recurrence63.run('aryPersonalBudget61().margin'),600,'Linked actual expense replaces reserve instead of double counting');
recurrence63.run("s.calendarEvents=[{id:99,name:'Reminder',frequency:'quarterly',amount:60,date:'',kind:'reminder'}]");
assert.equal(recurrence63.run('aryPersonalBudget61().reserve'),20);
recurrence63.run("s.calendarEvents.push({id:98,name:'Gas',amount:200,frequency:'monthly',kind:'reminder',date:''})");
assert.equal(recurrence63.run('aryPersonalBudget61().reserve'),20,'Matching recurring expense and reminder reserve once');
for(const [f,m] of [['daily',365/12],['weekly',52/12],['biweekly',26/12],['twice_monthly',2],['monthly',1],['quarterly',1/3],['semiannual',1/6],['annual',1/12]])assert.equal(recurrence63.run(`aryMonthly63(1,'${f}')`),m);
recurrence63.run('save()');assert.equal(boot(recurrence63.data).run('s.expenses[0].frequency'),'monthly');
recurrence63.run("s.locale='es-CO';s.currency='COP'");assert.equal(recurrence63.run("aryInputNumber63(1800000)"),'1.800.000');assert.equal(recurrence63.run("parseNum('1.800.000')"),1800000);
recurrence63.run("s.locale='pt-BR';s.currency='BRL'");assert.equal(recurrence63.run("aryInputNumber63(1800000.5)"),'1.800.000,5');assert.equal(recurrence63.run("parseNum('1.800.000,5')"),1800000.5);
recurrence63.run("s.locale='en-US';s.currency='USD'");assert.equal(recurrence63.run("aryInputNumber63(1800000.5)"),'1,800,000.5');assert.match(recurrence63.run('money(1e30)'),/^≈ /);assert.equal(recurrence63.run("parseNum('1e+30')"),1e30);assert.match(recurrence63.run("money('1000000000000000000000000000000')"),/1,000,000,000,000,000,000,000,000,000,000/);
assert.equal(recurrence63.run("aryValidDate63('2026-02-30')"),false);
console.log('PASS recurring budget, all periods, actual/reserve distinction, linked expense double-count protection, reminders, reload, localized numbers and very large amounts');

recurrence63.run("s.calendarEvents=[{id:99,name:'Reminder',frequency:'monthly',amount:60,date:'',kind:'reminder',completed:true,completedMonth63:localDate().slice(0,7)}]");assert.equal(recurrence63.run('aryPersonalBudget61().reserve'),0);recurrence63.run("s.calendarEvents[0].completedMonth63='2000-01'");assert.equal(recurrence63.run('aryPersonalBudget61().reserve'),60,'Recurring reserve restarts next month without inventing a payment');

const navigation65=boot(true);navigation65.run("s.navOrder=['home','plan','home','unknown','more'];go('home')");assert.deepEqual(Array.from(navigation65.run('s.navOrder')),['home','plan','more','debts','expenses']);assert.match(navigation65.nodes.nav.innerHTML,/go\('expenses'\)/);assert.equal(boot(navigation65.data).run('s.navOrder.length'),5);console.log('PASS complete navigation repair preserves order, restores Expenses and survives reload');
const live67=boot(true);
for(const locale of ['es-US','en-US','es-CO','es-ES','pt-BR']){
 const expected=new Intl.NumberFormat(locale,{maximumFractionDigits:0,useGrouping:true}).format(2000000),small=new Intl.NumberFormat(locale,{maximumFractionDigits:0,useGrouping:true}).format(2000);
 assert.equal(live67.run(`aryLiveNumber67("2'000.000",${JSON.stringify(locale)})`),expected,'Imported apostrophe grouping is normalized');
 assert.equal(live67.run(`aryLiveNumber67(${JSON.stringify(expected.slice(0,-3))},${JSON.stringify(locale)})`),small,'Deleting three zeros regroups the remaining amount');
 const decimal=new Intl.NumberFormat(locale).formatToParts(1.1).find(p=>p.type==='decimal').value;
 assert.equal(live67.run(`aryLiveNumber67(${JSON.stringify('2000'+decimal+'05')},${JSON.stringify(locale)})`),small+decimal+'05');
 assert.equal(live67.run(`aryLiveNumber67(${JSON.stringify('2000'+decimal)},${JSON.stringify(locale)})`),small+decimal,'Trailing decimal is retained while editing');
 assert.equal(live67.run(`aryLiveNumber67('',${JSON.stringify(locale)})`),'','Deleting everything leaves an empty editable field');
}
assert.equal(live67.run("aryLiveNumber67('9007199254740993123','en-US')"),'9,007,199,254,740,993,123','Live input grouping does not round the integer');
console.log('PASS live numeric regrouping, apostrophes, decimal editing, empty fields and large integer preservation');
const logic68=boot(true);logic68.run("s.expenses=[{id:1,name:'Renta',cat:'Hormiga',amount:1600,frequency:'monthly'},{id:2,name:'Celulares',cat:'Variable',amount:300,frequency:'monthly'},{id:3,name:'Pañales',cat:'Hormiga',amount:50,frequency:'monthly'},{id:4,name:'Energizantes',cat:'Hormiga',amount:8,frequency:'daily'},{id:5,name:'Energizantes',cat:'Hormiga',amount:8,sourceExpenseId:4,date:localDate()}]");
assert.deepEqual(JSON.parse(logic68.run('JSON.stringify(aryExpenseCuts68().map(e=>e.name))')),['Energizantes']);
assert.equal(logic68.run('aryExpenseCuts68()[0].monthly'),8*365/12,'Linked spending does not duplicate recurring estimates');
logic68.run("go('ants')");assert.match(logic68.nodes.app.innerHTML,/Energizantes/);assert.match(logic68.nodes.app.innerHTML,/recurringAnts68/);
logic68.run("s.calendarEvents=[{id:'44',name:'holis',kind:'income',amount:111,date:localDate()}];aryDeleteEvent36(44)");assert.equal(logic68.run('s.calendarEvents.length'),1,'X opens an in-app confirmation');assert.match(logic68.nodes.modal.innerHTML,/aryDeleteConfirmed68/);
logic68.run("aryDeleteConfirmed68('event',44)");assert.equal(logic68.run('s.calendarEvents.length'),0);assert.equal(boot(logic68.data).run('s.calendarEvents.length'),0,'Deletion survives reload');
console.log('PASS protected essentials, recurring ant visibility, non-duplicated adjustment estimates and in-app calendar deletion');

{const b=boot(true);for(const [m,d,region,birthday,expected] of [[10,1,'es-US','','halloween'],[11,1,'es-US','','everyday'],[12,25,'es-CO','','christmas'],[12,26,'es-CO','','newyear'],[1,7,'en-US','','newyear'],[1,8,'en-US','','everyday'],[7,4,'en-US','','usa'],[7,4,'es-CO','','everyday'],[7,20,'es-CO','','colombia'],[7,21,'es-CO','','everyday'],[9,7,'pt-BR','','brazil'],[10,9,'es-US','10-09','birthday']]){assert.equal(b.run(`aryBackdropSeason71(new Date(2026,${m-1},${d}),${JSON.stringify(region)},${JSON.stringify(birthday)})`),expected)}console.log('PASS seasonal background date boundaries, selected region and birthday priority');}

{const b=boot(true);b.run("s.debts=[{id:101,name:'Préstamo Árbol',balance:900,min:30}];s.expenses=[{id:102,name:'Café especial',amount:12,cat:'Hormiga',date:localDate()}];s.payments=[{id:103,amount:100,debtId:101,date:localDate()}];go('home')");assert.match(b.nodes.app.innerHTML,/10%/);const state=b.run('JSON.stringify(s)');b.run('aryTogglePrivacy72()');assert.equal(b.run('money(900)'), '••••');assert.equal(b.run('JSON.stringify(s)'),state,'Privacy never changes financial data');assert.equal(boot(b.data).run('aryHidden72()'),true);assert.equal(b.run("arySearchItems72('arbol').length"),0);b.run('aryTogglePrivacy72()');assert.equal(b.run("arySearchItems72('arbol')[0].id"),101);assert.equal(b.run("arySearchItems72('cafe')[0].id"),102);b.run("arySetUI72('size',1.5);arySetUI72('palette','ocean');arySetUI72('brand','amber');arySetUI72('contrast','true')");assert.equal(JSON.parse(b.data['ary-ui-v72']).size,1.5);b.run("arySetUI72('size',99)");assert.equal(JSON.parse(b.data['ary-ui-v72']).size,1.5);b.nodes.selfNote72={value:'I can <learn>'};b.run('arySaveNote72()');b.run("go('profile')");assert.match(b.nodes.app.innerHTML,/I can &lt;learn&gt;/);assert.equal(b.run('JSON.stringify(s)'),state);for(const l of ['es-US','en-US','pt-BR']){b.run(`s.locale='${l}'`);for(const route of ['more','support','announcements','events','feedback','appearance']){b.run(`go('${route}')`);assert.ok(b.nodes.app.innerHTML.length)}}assert.equal(b.run("aryEvents72(new Date(2026,6,5),'en-US').find(e=>e.month===7).date"),'2027-07-04');assert.equal(b.run("aryEvents72(new Date(2026,6,5),'es-CO').find(e=>e.month===7).date"),'2026-07-20');console.log('PASS privacy persistence, unchanged finances, progress, accent search, validated appearance settings, escaped personal note, translated community routes and regional events');}

{const b=boot(true);b.run("s.locale='es-US'");const pair=b.run('JSON.stringify(aryLandingQuotes74(new Date(2026,9,5)))');for(const d of [6,7,8,9,10,11])assert.equal(b.run(`JSON.stringify(aryLandingQuotes74(new Date(2026,9,${d})))`),pair,'The thought remains stable Monday through Sunday');assert.notEqual(b.run('JSON.stringify(aryLandingQuotes74(new Date(2026,9,12)))'),pair,'The next Monday rotates the thought');for(const loc of ['es-US','en-US','pt-BR']){b.run(`s.locale='${loc}'`);assert.equal(b.run('aryLandingQuotes74().length'),1)}assert.equal(b.run("arySocialUrl74('Google')"),'','No fabricated provider URL');b.run("location.origin='https://example.test';location.pathname='/arydebts/';aryUIConfig72.socialAuth={startUrl:'https://auth.example.test/auth/start',providers:['google','discord']}");const link=new URL(b.run("arySocialUrl74('Google')"));assert.equal(link.searchParams.get('provider'),'google');assert.equal(link.searchParams.get('returnTo'),'https://example.test/arydebts/#welcome');assert.equal(b.run("arySocialUrl74('Facebook')"),'');assert.equal(b.run("arySocialUrl74('Unknown')"),'');for(const url of ['javascript:alert(1)','http://example.test/start','https://user:password@example.test/start']){b.run(`aryUIConfig72.socialAuth.startUrl=${JSON.stringify(url)}`);assert.equal(b.run("arySocialUrl74('Google')"),'')}console.log('PASS stable weekly thought, Monday rotation, localized copy, configured-provider allowlist, safe HTTPS OAuth start URLs and truthful missing configuration');}

{const b=boot(true);b.nodes.selfNote72={value:'Keep going'};b.nodes.aryName46={value:''};b.nodes.aryEmail46={value:'test@example.com'};b.run('arySaveProfile46()');assert.equal(b.data['ary-self-message-v72'],undefined,'Invalid profile must not save its note');b.nodes.aryName46.value='Test';b.nodes.aryEmail46.value='invalid';b.run('arySaveProfile46()');assert.equal(b.data['ary-self-message-v72'],undefined);b.nodes.modal.innerHTML='PROFILE DRAFT';b.run('arySaveNote72()');assert.equal(b.nodes.modal.innerHTML,'PROFILE DRAFT','Saving just the note preserves the open profile and drafts');assert.equal(JSON.parse(b.data['ary-self-message-v72']),'Keep going');b.nodes.appearance72={};b.nodes.modal.innerHTML='APPEARANCE DRAFT';b.run("arySetUI72('size',1.3)");assert.equal(b.nodes.modal.innerHTML,'APPEARANCE DRAFT','Appearance changes must not rebuild the dialog');console.log('PASS profile validation, independent note draft preservation and stable appearance dialog');}

{const b=boot(true);b.nodes.feedbackText72={value:'Keep this draft'};b.nodes.selfNote72={value:'Keep this note'};b.run("localStorage.setItem=()=>{throw new Error('quota')}");assert.equal(b.run('arySaveFeedback72()'),false);assert.equal(b.nodes.feedbackText72.value,'Keep this draft');assert.equal(b.data['ary-feedback-v72'],undefined);assert.equal(b.run('arySaveNote72()'),false);assert.equal(b.data['ary-self-message-v72'],undefined);b.context.localStorage.setItem=(k,v)=>b.data[k]=v;b.run('arySaveFeedback72();arySaveFeedback72()');const entries=JSON.parse(b.data['ary-feedback-v72']);assert.notEqual(entries[0].id,entries[1].id,'Fast submissions have distinct IDs');b.run("localStorage.setItem=()=>{throw new Error('quota')}");assert.equal(b.run(`aryDeleteFeedback72(${entries[0].id})`),false);b.run("go('feedback')");assert.equal((b.nodes.app.innerHTML.match(/feedbackCard72/g)||[]).length,2,'Failed deletion keeps both comments');const damaged=boot({...b.data,'ary-feedback-v72':JSON.stringify([null,{id:'bad',text:'ignored'},{id:7,text:'Readable',date:'bad-date'}])});damaged.run("go('feedback')");assert.match(damaged.nodes.app.innerHTML,/Readable/);assert.match(damaged.nodes.app.innerHTML,/—/);console.log('PASS failed storage preserves note/comment drafts, deletion rollback, unique feedback IDs and damaged feedback recovery');}

{const b=boot(true);b.run("s.income=0;s.expenses=[];s.debts=[];go('home')");assert.doesNotMatch(b.nodes.app.innerHTML,/homeSetup54/,'Completed onboarding hides the setup notice even with no debts');b.run("s.onboarded=false;go('home')");assert.match(b.nodes.app.innerHTML,/homeSetup54/);b.run("aryFinishOnboarding54()");assert.doesNotMatch(b.nodes.app.innerHTML,/homeSetup54/);assert.doesNotMatch(boot(b.data).nodes.app.innerHTML,/homeSetup54/,'Completed setup stays hidden after reload');assert.match(b.run("aryGreetingScene77('halloween')"),/greetingBat77/);for(const season of ['christmas','newyear','birthday','usa','colombia','brazil'])assert.match(b.run(`aryGreetingScene77('${season}')`),/greetingEmblem77/);console.log('PASS completed setup dismissal without forcing debts and season-specific greeting artwork');}

{const b=boot(true);for(const locale of ['es-US','es-CO','es-ES','en-US','pt-BR']){b.run(`s.locale='${locale}';languageMenu()`);assert.equal((b.nodes.modal.innerHTML.match(/onclick="setLocale/g)||[]).length,3);assert.doesNotMatch(b.nodes.modal.innerHTML,/España|Colombia|Latinoamérica/);assert.match(b.nodes.modal.innerHTML,/Español/);if(locale.startsWith('es'))assert.equal(b.run('localeName()'),'Español');}console.log('PASS three-language selector and unified Spanish labels with legacy locale compatibility');}

{const b=boot(true);const financial=b.run('JSON.stringify([s.income,s.debts,s.expenses])');b.run("s.mode='lite';save();logout()");assert.equal(b.run('aryEffectiveMotion80()'),'immersive','Signing out does not stop public globe');b.run('aryToggleCoverMotion80()');assert.equal(b.run('s.mode'),'lite');assert.equal(b.run('aryEffectiveMotion80()'),'lite');assert.equal(boot(b.data,'#welcome').run('aryEffectiveMotion80()'),'lite','Public switch has its own persistence');b.run("profile={email:'new@example.com',name:'New'};go('home')");assert.equal(b.run('s.mode'),'immersive','A different local profile does not inherit the previous Lite setting');b.run("profile={email:'test@example.com',name:'Test'};go('home')");assert.equal(b.run('s.mode'),'lite','Previous local profile restores its motion setting');assert.equal(b.run('JSON.stringify([s.income,s.debts,s.expenses])'),financial);console.log('PASS separate public motion, sign-out, reload, local profile preference restoration and unchanged finances');}

{
 const b=boot(true);b.run("s.income=1000;s.expenses=[{id:8201,name:'Gas recurrente',amount:60,frequency:'monthly',date:'2026-10-08'}];s.debts=[{id:8202,name:'Card overdue',balance:200,min:76,due:'2026-10-07'},{id:8203,name:'Paid card',balance:500,min:25,due:'2026-10-09'},{id:8204,name:'Small balance',balance:10,min:50,due:'2026-10-10'},{id:8205,name:'Invalid',balance:90,min:10,due:'2026-02-30'}];s.payments=[{debtId:8202,amount:30,date:'2026-10-06'},{debtId:8203,amount:25,date:'2026-10-08'},{debtId:8202,amount:99,date:'2026-10-20'}];s.calendarEvents=[{id:8206,name:'Done',date:'2026-10-08',kind:'reminder',completed:true},{id:8207,name:'Old income',date:'2026-10-01',kind:'income',amount:500},{id:8208,name:'No date',date:'',kind:'reminder',frequency:'monthly',amount:100}]");
 const before=b.run('JSON.stringify([s.debts,s.expenses,s.payments,s.calendarEvents])');
 assert.deepEqual(JSON.parse(b.run("JSON.stringify(aryHomeActivity82(new Date(2026,9,9)).map(e=>[e.name,e.amount]))")),[['Card overdue',46],['Gas recurrente',60],['Small balance',10]]);
 assert.equal(b.run("aryCalendarExpenses82('2026-10-08')[0].id"),8201);
 b.run("s.expenses.push({id:8209,sourceExpenseId:8201,name:'Gas paid',amount:60,date:'2026-10-08',frequency:'once'})");
 assert.equal(b.run("aryHomeActivity82(new Date(2026,9,9)).some(e=>e.id===8201)"),false);
 b.run('s.expenses.pop()');assert.equal(b.run('JSON.stringify([s.debts,s.expenses,s.payments,s.calendarEvents])'),before,'Reading activity leaves financial records unchanged');
 console.log('PASS overdue priority, partial/fulfilled minimums, balance cap, valid dates, dated recurring expenses, linked records and unchanged finances');
}
