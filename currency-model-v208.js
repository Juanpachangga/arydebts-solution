/* Daily reference conversion. Original units are retained; percentages and IDs never change. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryFX208=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const code=x=>typeof x==='string'&&/^[A-Z]{3}$/.test(x);
const groups={expenses:['amount'],debts:['balance','min'],payments:['amount'],calendarEvents:['amount'],incomeEntries93:['amount'],assets93:['value'],worthHistory93:['assets','debt','net']};
function records(state){return [{item:state,fields:['income','savings'],currency:state.currency},...Object.entries(groups).flatMap(([key,fields])=>(Array.isArray(state[key])?state[key]:[]).map(item=>({item,fields,retain:key==='debts',currency:code(item.currency)?item.currency:state.currency})))];}
function anchor(item,field,currency,retain=false){
 const value=Number(item[field]),prior=item.fxBasis208?.[field];
 if(prior&&code(prior.currency)&&Number.isFinite(prior.value)&&Number.isFinite(prior.shown)&&item.fxShownCurrency208===currency){if(prior.shown===value)return prior;if(retain&&Number.isFinite(prior.scale)&&prior.scale>0)return {...prior,value:prior.value+(value-prior.shown)/prior.scale,shown:value};}
 return {value,currency,shown:value};
}
function needed(state,target){const out=new Set([target]);for(const r of records(state))for(const field of r.fields)if(r.item[field]!=null&&Number(r.item[field])!==0)out.add(anchor(r.item,field,r.currency,r.retain).currency);return [...out];}
function rates(rows,today){
 if(!Array.isArray(rows)||rows.length>300)throw Error('invalid_rates');
 const result={USD:{rate:1,date:today}},end=Date.parse(today+'T00:00:00Z');
 for(const row of rows){const date=row?.date,time=Date.parse(date+'T00:00:00Z');if(row?.base!=='USD'||!code(row.quote)||typeof row.rate!=='number'||!Number.isFinite(row.rate)||row.rate<=0||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(time)||new Date(time).toISOString().slice(0,10)!==date||time>end||end-time>7*86400000||row.quote==='USD'&&row.rate!==1)throw Error('invalid_rates');if(result[row.quote]&&row.quote!=='USD')throw Error('duplicate_rate');result[row.quote]={rate:row.rate,date};}
 return result;
}
function convert(value,from,to,table){if(!Number.isFinite(value))throw Error('invalid_amount');if(value===0||from===to)return value;const a=table[from]?.rate,b=table[to]?.rate;if(!Number.isFinite(a)||!Number.isFinite(b)||a<=0||b<=0)throw Error('missing_rate');const n=value/a*b;if(!Number.isFinite(n)||n===0&&value!==0)throw Error('amount_range');return n;}
function transform(state,target,table){
 if(!code(state.currency)||!code(target))throw Error('invalid_currency');for(const r of records(state))for(const field of r.fields)if(r.item[field]!=null&&!Number.isFinite(Number(r.item[field])))throw Error('invalid_amount');const next=JSON.parse(JSON.stringify(state));
 for(const {item,fields,currency,retain} of records(next)){
  const basis={};for(const field of fields){if(item[field]==null)continue;const original=anchor(item,field,currency,retain),value=convert(original.value,original.currency,target,table);basis[field]={...original,shown:value,scale:original.currency===target?1:table[original.currency]&&table[target]?table[target].rate/table[original.currency].rate:undefined};item[field]=value;}
  if(Object.keys(basis).length){item.fxBasis208=basis;item.fxShownCurrency208=target;if(item!==next)item.currency=target;}
  if(item.amountText197&&currency!==target)delete item.amountText197;
 }
 next.currency=target;return next;
}
return Object.freeze({code,records,needed,rates,convert,transform});
});
