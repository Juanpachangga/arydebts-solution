// Monthly planning: actual ledger payments plus an estimated reserve for unpaid minimums.
// A recorded minimum is a monthly planning input, not a lender statement or bank balance.
window.aryBudgetSnapshot54=function(state,now=new Date()){
const positive=value=>{const n=Number(value);return Number.isFinite(n)&&n>0?n:0};
const list=value=>Array.isArray(value)?value.filter(item=>item&&typeof item==='object'):[];
const month=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`,today=`${month}-${String(now.getDate()).padStart(2,'0')}`;
const inMonth=value=>{const v=String(value||'');if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||v.slice(0,7)!==month)return false;const[y,m,d]=v.split('-').map(Number),date=new Date(y,m-1,d);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d};
const incomeBase=positive(state.income),income=state.incomeFrequency==='weekly'?incomeBase*52/12:state.incomeFrequency==='biweekly'?incomeBase*26/12:incomeBase;
const expenses=list(state.expenses).filter(e=>inMonth(e.date)).reduce((sum,e)=>sum+positive(e.amount),0);
const payments=list(state.payments).filter(p=>inMonth(p.date)&&String(p.date)<=today),paidByDebt=new Map();
let debtPayments=0;for(const p of payments){const amount=positive(p.amount);debtPayments+=amount;if(p.debtId!==undefined&&p.debtId!==null){const id=String(p.debtId);paidByDebt.set(id,(paidByDebt.get(id)||0)+amount)}}
const active=list(state.debts).filter(d=>positive(d.balance)>0);
const debt=active.reduce((sum,d)=>sum+positive(d.balance),0),registeredMinimums=active.reduce((sum,d)=>sum+positive(d.min),0);
const minimums=active.reduce((sum,d)=>sum+Math.min(positive(d.balance),Math.max(0,positive(d.min)-(paidByDebt.get(String(d.id))||0))),0);
const cashFlowBeforeMinimums=income-expenses-debtPayments,availableAfterMinimums=cashFlowBeforeMinimums-minimums;
return{income,expenses,debt,debtPayments,registeredMinimums,minimums,remainingMinimums:minimums,cashFlowBeforeMinimums,availableAfterMinimums,available:availableAfterMinimums}
};
(()=>{
  const KEY='arydebts-v3';
  try{
    if(localStorage.getItem(KEY)!==null)return;
    const fresh={
      currency:'USD',locale:'es-US',mode:'immersive',name:'',income:0,
      incomeFrequency:'monthly',goal:'',goals:[],greeting:'',theme:'dark',
      navOrder:['home','debts','expenses','plan','more'],savings:0,
      onboarded:false,debts:[],expenses:[],calendarEvents:[],payments:[]
    };
    localStorage.setItem(KEY,JSON.stringify(fresh));
  }catch(e){}
})();
