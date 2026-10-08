const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
 const scripts=[...fs.readFileSync(__dirname+'/index.html','utf8').matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
function boot(existing=false,startHash){
 const nodes={},data={};
 const element=()=>{const classes=new Set();return{innerHTML:'',textContent:'',style:{setProperty(){}},dataset:{},classList:{add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name),toggle:(name,on)=>on===false?classes.delete(name):classes.add(name)},querySelectorAll:()=>[],querySelector:()=>null,setAttribute(){},addEventListener(){},appendChild(){},remove(){}}};
 for(const id of ['app','nav','modal','toast'])nodes[id]=element();
 const document={body:element(),documentElement:element(),getElementById:id=>nodes[id]||null,querySelector:sel=>sel.startsWith('#')?nodes[sel.slice(1)]||null:null,querySelectorAll:()=>[],createTreeWalker:()=>({nextNode:()=>null}),createElement:element,addEventListener(){}};
 if(existing&&typeof existing==='object')Object.assign(data,existing);
 else if(existing){data['arydebts-profile']=JSON.stringify({name:'Test',email:'test@example.com'});data['arydebts-v3']=JSON.stringify({currency:'USD',locale:'es-US',mode:'lite',name:'Test',income:1000,incomeFrequency:'weekly',goal:'security',goals:['security'],theme:'dark',navOrder:['home','debts','expenses','plan','more'],onboarded:true,savings:0,debts:[],expenses:[],calendarEvents:[],payments:[]});}
 const context=vm.createContext({document,location:{hash:startHash??(existing?'#home':'')},history:{length:1,replaceState(){},pushState(){}},localStorage:{getItem:k=>data[k]??null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]},navigator:{},matchMedia:()=>({matches:false,addEventListener(){}}),console,Intl,NodeFilter:{SHOW_TEXT:4},MutationObserver:class{observe(){}},addEventListener(){},setTimeout(){},requestAnimationFrame(){},confirm:()=>true});
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
 monthly.run('aryDeletePayment54(s.payments[1].id)');assert.equal(monthly.run('aryRealData54.snapshot().debtPayments'),100);assert.equal(monthly.run('aryRealData54.snapshot().minimums'),40);assert.equal(monthly.run('aryRealData54.snapshot().availableAfterMinimums'),660);
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
