(()=>{
/* V44 guardrail: V10 onboarding remains the source of truth. Never erase existing finance data just by tapping the landing CTA. */
function hasFinanceData(){
  if(typeof s==='undefined')return false;
  return !!((s.debts&&s.debts.length)||(s.expenses&&s.expenses.length)||Number(s.income)>0||(s.goals&&s.goals.length));
}
function newProfileOnboarding(){
  if(typeof s==='undefined')return;
  if(!profile&&!s.onboarded&&!hasFinanceData()){s.name='';s.income=0;s.incomeFrequency='monthly';s.goal='';s.goals=[];s.debts=[];s.expenses=[];s.savings=0;}
  s.onboarded=false;
  try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}
}
window.aryStartOnboarding43=()=>{if(typeof go==='function')go('signup')};
window.aryPrepareNewProfile44=newProfileOnboarding;
window.aryBeginQuestions43=()=>{if(typeof go==='function')go('intro')};
})();
