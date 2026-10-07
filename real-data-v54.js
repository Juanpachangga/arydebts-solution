(()=>{
const MIGRATION='ary-real-data-v54';
function isLegacyDemoState(x){
  if(!x||x.onboarded||profile)return false;
  const debtNames=(x.debts||[]).map(d=>d.name);
  const expenseNames=(x.expenses||[]).map(e=>e.name);
  return x.name==='Ana'&&Number(x.income)===850&&x.incomeFrequency==='weekly'&&
    debtNames.length===5&&debtNames.includes('Tarjeta de crédito')&&debtNames.includes('Renta atrasada')&&
    expenseNames.length===6&&expenseNames.includes('Gaseosas / Snacks')&&expenseNames.includes('Uber / Transporte');
}
function emptyFinancialState(){
  const keep={currency:s.currency||'USD',locale:s.locale||'es-US',mode:s.mode||'immersive',theme:s.theme||'dark',navOrder:Array.isArray(s.navOrder)?s.navOrder:['home','debts','expenses','plan','more']};
  Object.assign(s,keep,{name:'',income:0,incomeFrequency:'monthly',goal:'',goals:[],greeting:'',savings:0,onboarded:false,debts:[],expenses:[],calendarEvents:[],payments:[]});
}
try{
  if(!localStorage.getItem(MIGRATION)){
    if(isLegacyDemoState(s)){
      emptyFinancialState();
      localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s));
    }
    localStorage.setItem(MIGRATION,'1');
  }
}catch(e){}
window.aryEmptyFinancialState54=emptyFinancialState;
})();