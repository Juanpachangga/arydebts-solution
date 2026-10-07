(()=>{
const MIGRATION='ary-real-data-v54';
function isLegacyDemoState(x){
  if(!x||x.onboarded||profile)return false;
  const debtNames=(x.debts||[]).map(d=>d.name);
  const expenseNames=(x.expenses||[]).map(e=>e.name);
  return x.name==='Ana'&&Number(x.income)===850&&x.incomeFrequency==='weekly'&&debtNames.length===5&&debtNames.includes('Tarjeta de crédito')&&debtNames.includes('Renta atrasada')&&expenseNames.length===6&&expenseNames.includes('Gaseosas / Snacks')&&expenseNames.includes('Uber / Transporte');
}
function emptyFinancialState(){
  const keep={currency:s.currency||'USD',locale:s.locale||'es-US',mode:s.mode||'immersive',theme:s.theme||'dark',navOrder:Array.isArray(s.navOrder)?s.navOrder:['home','debts','expenses','plan','more']};
  Object.assign(s,keep,{name:'',income:0,incomeFrequency:'monthly',goal:'',goals:[],greeting:'',savings:0,onboarded:false,debts:[],expenses:[],calendarEvents:[],payments:[]});
}
try{if(!localStorage.getItem(MIGRATION)){if(isLegacyDemoState(s)){emptyFinancialState();localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}localStorage.setItem(MIGRATION,'1')}}catch(e){}
window.aryEmptyFinancialState54=emptyFinancialState;

const L={es:{income:'Ingresa un ingreso válido'},en:{income:'Enter a valid income'},pt:{income:'Digite uma renda válida'}};
const tx=()=>L[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es'];
function persist(){try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}
function saveIncome54(){
 const input=document.getElementById('oi'),freq=document.getElementById('of'),currency=document.getElementById('oc'),raw=input?.value??'',amount=parseNum(raw);
 if(String(raw).trim()===''||!Number.isFinite(amount)||amount<0){if(typeof toast==='function')toast(tx().income);return}
 s.income=amount;s.incomeFrequency=freq?.value||'monthly';s.currency=currency?.value||s.currency||'USD';persist();if(typeof go==='function')go('setupDebts');
}
window.arySaveIncome54=saveIncome54;
window.saveIncomeSetup=saveIncome54;
try{saveIncomeSetup=saveIncome54}catch(e){}
window.aryRealData54={
 monthlyIncome(){const n=Number(s.income)||0;return s.incomeFrequency==='weekly'?n*52/12:s.incomeFrequency==='biweekly'?n*26/12:n},
 debtTotal(){return (s.debts||[]).reduce((a,d)=>a+(Number(d.balance)||0),0)},
 currentMonthExpenses(){const d=new Date(),ym=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;return (s.expenses||[]).filter(e=>e.date&&String(e.date).slice(0,7)===ym).reduce((a,e)=>a+(Number(e.amount)||0),0)},
 snapshot(){const income=this.monthlyIncome(),expenses=this.currentMonthExpenses(),debt=this.debtTotal();return{income,expenses,debt,available:income-expenses,currency:s.currency,locale:s.locale}}
};
})();