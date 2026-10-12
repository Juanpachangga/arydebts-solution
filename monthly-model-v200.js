(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryMonth200=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const recurring=e=>['daily','every_2_days','every_3_days','every_4_days','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'].includes(e?.frequency);
const valid=m=>typeof m==='string'&&/^\d{4}-(0[1-9]|1[0-2])$/.test(m);
const effective=e=>e.date||e.accountedDate197||e.recordedAt197||'';
const month=d=>typeof d==='string'?d.slice(0,7):`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
const antActive=(e,m)=>e.cat!=='Hormiga'||!valid(e.monthlyAnt200)||e.monthlyAnt200===m;
function budget(list,m){return(list||[]).filter(e=>recurring(e)?antActive(e,m):effective(e)||!valid(e.displayMonth200)||e.displayMonth200===m)}
function visible(list,m,current){return(list||[]).filter(e=>recurring(e)?antActive(e,m):(valid(month(effective(e)))?month(effective(e)):e.displayMonth200||current)===m)}
function periods(list,current){return [...new Set([current,...(list||[]).map(e=>recurring(e)?e.monthlyAnt200:month(effective(e))||e.displayMonth200).filter(valid)])].sort().reverse()}
function stamp(list,current){return(list||[]).map(e=>{const copy={...e};if(e.cat==='Hormiga'&&!valid(e.monthlyAnt200)){const start=month(e.date||'');copy.monthlyAnt200=recurring(e)?(valid(start)&&start>current?start:current):(valid(month(effective(e)))?month(effective(e)):current)}if(!recurring(e)&&!effective(e)&&!valid(e.displayMonth200))copy.displayMonth200=current;return copy})}
return{recurring,valid,effective,month,antActive,budget,visible,periods,stamp};
});
