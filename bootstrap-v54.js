// Monthly planning: actual ledger payments plus an estimated reserve for unpaid minimums.
// A recorded minimum is a monthly planning input, not a lender statement or bank balance.
window.aryBudgetSnapshot54=function(state,now=new Date()){
const positive=value=>{const n=Number(value);return Number.isFinite(n)&&n>0?n:0};
const list=value=>Array.isArray(value)?value.filter(item=>item&&typeof item==='object'):[];
const month=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`,today=`${month}-${String(now.getDate()).padStart(2,'0')}`;
const inMonth=value=>{const v=String(value||'');if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||v.slice(0,7)!==month)return false;const[y,m,d]=v.split('-').map(Number),date=new Date(y,m-1,d);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d};
const incomeBase=positive(state.income),income=state.incomeFrequency==='weekly'?incomeBase*52/12:state.incomeFrequency==='biweekly'?incomeBase*26/12:incomeBase;
const expenses=list(state.expenses).filter(e=>inMonth(e.date)&&String(e.date)<=today).reduce((sum,e)=>sum+positive(e.amount),0);
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
    const raw=localStorage.getItem(KEY);
    if(raw!==null){
      // V52 saved its sample finances even after creating a local profile.
      // Match the complete untouched sample, never a total or a person's name.
      const old=JSON.parse(raw),debts=[[1,'Tarjeta de crédito',2300,75,28],[2,'Carro',8500,200,9],[3,'Teléfono',700,50,12],[4,'Renta atrasada',1200,300,0],[5,'Préstamo personal',3000,150,16]],expenses=[[1,'Comida',32,'Esencial'],[2,'Gasolina',60,'Esencial'],[3,'Restaurantes',35,'Hormiga'],[4,'Gaseosas / Snacks',72,'Hormiga'],[5,'Café',46,'Hormiga'],[6,'Uber / Transporte',72,'Variable']];
      const sample=old&&Number(old.income)===850&&old.incomeFrequency==='weekly'&&Number(old.savings||0)===0&&!(old.payments||[]).length&&!(old.calendarEvents||[]).length&&Array.isArray(old.debts)&&old.debts.length===5&&debts.every(([id,name,balance,min,apr])=>old.debts.some(d=>d.id===id&&d.name===name&&Number(d.balance)===balance&&Number(d.min)===min&&Number(d.apr)===apr&&!d.due&&!d.note))&&Array.isArray(old.expenses)&&old.expenses.length===6&&expenses.every(([id,name,amount,cat])=>old.expenses.some(e=>e.id===id&&e.name===name&&Number(e.amount)===amount&&e.cat===cat&&!e.date));
      if(sample){
        const archive='ary-v52-sample-backup-v54';
        if(localStorage.getItem(archive)===null)localStorage.setItem(archive,raw);
        localStorage.setItem(KEY,JSON.stringify({...old,income:0,incomeFrequency:'monthly',debts:[],expenses:[],onboarded:false,onboardingStep:'intro'}));
        localStorage.removeItem('ary-home-baseline-v29');
      }
      return;
    }
    const fresh={
      currency:'USD',locale:'es-US',mode:'immersive',name:'',income:0,
      incomeFrequency:'monthly',goal:'',goals:[],greeting:'',theme:'dark',
      navOrder:['home','debts','expenses','plan','more'],savings:0,
      onboarded:false,debts:[],expenses:[],calendarEvents:[],payments:[]
    };
    localStorage.setItem(KEY,JSON.stringify(fresh));
  }catch(e){}
})();

