// Educational projection only: fixed nominal annual rate, deposits at month-end.
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryInvestmentLearning216=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
function project({initial,monthly,months,rate}){
 if(![initial,monthly,rate].every(Number.isFinite)||initial<0||initial>1e8||monthly<0||monthly>1e6||!Number.isInteger(months)||months<1||months>480||rate < -20||rate>20)return null;
 const r=rate/1200,growth=Math.pow(1+r,months),contributions=initial+monthly*months;
 const total=initial*growth+monthly*(r===0?months:(growth-1)/r);
 if(!Number.isFinite(total)||total>1e15)return null;
 const cents=n=>Math.round((n+Number.EPSILON)*100)/100;
 return{total:cents(total),contributions:cents(contributions),change:cents(total-contributions)};
}
return{project};
});
