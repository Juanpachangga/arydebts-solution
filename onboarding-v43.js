(()=>{
/* V43 guardrail: preserve the V10 questions and make Comenzar hoy enter them directly. */
function resetForNewAccount(){
  if(typeof s==='undefined')return;
  s.onboarded=false;
  s.name='';s.income=0;s.incomeFrequency='monthly';s.goal='';s.goals=[];s.debts=[];s.expenses=[];s.savings=0;
  try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}
}
window.aryStartOnboarding43=()=>{resetForNewAccount();if(typeof go==='function')go('signup')};
window.aryBeginQuestions43=()=>{if(typeof go==='function')go('intro')};
})();
