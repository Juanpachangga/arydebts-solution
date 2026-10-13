// Pure projection: fixed APR, monthly interest, no new charges or fees.
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryDebtStrategy215=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
function simulate(debts,extra=0,strategy='avalanche'){
 if(!Array.isArray(debts)||!Number.isFinite(extra)||extra<0||extra>1e12||!['avalanche','snowball'].includes(strategy))return null;
 const rows=debts.filter(d=>Number(d.balance)>0).map(d=>({id:d.id,name:d.name,balance:Number(d.balance),min:Number(d.min)||0,apr:Number(d.apr)||0}));
 if(rows.some(d=>!Number.isFinite(d.balance)||!Number.isFinite(d.min)||!Number.isFinite(d.apr)||d.min<0||d.apr<0||d.apr>1000))return null;
 const round=n=>Math.round((n+Number.EPSILON)*100)/100;
 const budget=round(rows.reduce((n,d)=>n+d.min,0)+extra),start=round(rows.reduce((n,d)=>n+d.balance,0));
 if(!rows.length)return{months:0,interest:0,total:0,budget,complete:true};
 if(budget<=0)return{months:null,interest:0,total:0,budget,complete:false};
 let interest=0,total=0;
 for(let month=1;month<=600;month++){
  let left=budget;
  for(const d of rows){if(d.balance<=0)continue;const fee=round(d.balance*d.apr/1200);d.balance=round(d.balance+fee);interest=round(interest+fee);const pay=Math.min(d.balance,d.min,left);d.balance=round(d.balance-pay);left=round(left-pay);total=round(total+pay)}
  const sorted=rows.filter(d=>d.balance>0).sort((a,b)=>strategy==='snowball'?a.balance-b.balance||b.apr-a.apr:b.apr-a.apr||a.balance-b.balance);
  for(const d of sorted){const pay=Math.min(left,d.balance);d.balance=round(d.balance-pay);left=round(left-pay);total=round(total+pay)}
  const remaining=round(rows.reduce((n,d)=>n+d.balance,0));
  if(remaining<=0)return{months:month,interest,total:round(start+interest),budget,complete:true};
 }
 return{months:null,interest,total,budget,complete:false};
}
return{simulate};
});
