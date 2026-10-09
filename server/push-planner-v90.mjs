import rules from '../notification-rules-v89.js';
const positive=v=>Math.max(0,Number(v)||0),factors={daily:365/12,weekly:52/12,biweekly:26/12,twice_monthly:2,monthly:1,quarterly:1/3,semiannual:1/6,annual:1/12};
const recurring=e=>Object.hasOwn(factors,e?.frequency),valid=d=>rules.day(d)!==null;
const protectedExpense=e=>e.cat==='Esencial'||/renta|rent\b|alquiler|aluguel|mortgage|hipoteca|vivienda|housing|celular|phone|movil|internet|datos|data plan|electric|luz\b|agua|water|gas\b|mercado|grocer|supermerc|panal|diaper|fralda|medic|salud|health|seguro|insurance|transporte|transport|gasolina|fuel|carro|car payment|escuela|school|creche|guarderia/.test(String(e.name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase());
export function validatePushPreferences90(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||typeof raw.enabled!=='boolean')throw Error('invalid_preferences');
 const timezone=typeof raw.timezone==='string'?raw.timezone:'';if(!timezone||timezone.length>100)throw Error('invalid_timezone');
 try{new Intl.DateTimeFormat('en',{timeZone:timezone}).format()}catch{throw Error('invalid_timezone')}
 for(const key of ['payments','ants','morning'])if(typeof raw[key]!=='boolean')throw Error('invalid_preferences');
 const p=rules.preferences(raw);
 if(raw.morningTime!==p.morningTime)throw Error('invalid_time');
 return {...p,dismissed:[],enabled:raw.enabled,timezone};
}
export function localClock90(date,timezone){const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));return {getFullYear:()=>Number(parts.year),getMonth:()=>Number(parts.month)-1,getDate:()=>Number(parts.day),getHours:()=>Number(parts.hour),getMinutes:()=>Number(parts.minute)}}
export function pushActivity90(state,today){
 const debts=Array.isArray(state.debts)?state.debts:[],expenses=Array.isArray(state.expenses)?state.expenses:[],events=Array.isArray(state.calendarEvents)?state.calendarEvents:[],payments=Array.isArray(state.payments)?state.payments:[],out=[];
 for(const d of debts){if(!valid(d.due)||positive(d.balance)<=0)continue;const paid=payments.filter(p=>String(p.debtId)===String(d.id)&&valid(p.date)&&p.date.slice(0,7)===d.due.slice(0,7)&&p.date<=today).reduce((v,p)=>v+positive(p.amount),0);if(positive(d.min)>0&&paid>=positive(d.min))continue;out.push({source:'debt',id:d.id,date:d.due,name:d.name})}
 for(const e of events){if(!valid(e.date)||e.kind==='payment')continue;if(e.kind==='reminder'&&e.completed&&(!recurring(e)||e.completedMonth63===today.slice(0,7)))continue;if(e.kind!=='reminder'&&e.date<today)continue;out.push({source:'event',id:e.id,date:e.date,name:e.name})}
 for(const e of expenses){if(!recurring(e)||!valid(e.date))continue;const recorded=expenses.filter(p=>!recurring(p)&&String(p.sourceExpenseId)===String(e.id)&&valid(p.date)&&p.date>=e.date&&p.date<=today).reduce((v,p)=>v+positive(p.amount),0);if(positive(e.amount)>0&&recorded>=positive(e.amount))continue;out.push({source:'expense',id:e.id,date:e.date,name:e.name})}
 return out;
}
export function planPush90(state,prefs,now=new Date()){
 const p=validatePushPreferences90(prefs);if(!p.enabled)return [];
 const clock=localClock90(now,p.timezone),today=rules.key(clock),hour=clock.getHours();
 // Quiet hours for financial alerts: 08:00–21:00 in the saved timezone.
 const financial=hour>=8&&hour<21;
 const items=rules.evaluate({now:clock,prefs:{...p,payments:p.payments&&financial,ants:p.ants&&financial},activity:pushActivity90(state,today),expenses:Array.isArray(state.expenses)?state.expenses:[],income:positive(state.income)*(factors[state.incomeFrequency]??1),recurring,protectedExpense});
 const locale=state.locale==='en-US'?'en':state.locale==='pt-BR'?'pt':'es',out=[];
 const add=(kind,route,item)=>out.push({key:`${['ants','progress'].includes(kind)?'spending':kind}:${today}`,payload:{id:`${['ants','progress'].includes(kind)?'spending':kind}:${today}`,type:kind,route,locale,...(item?.date?{date:item.date}:{})},expiresAt:new Date(now.getTime()+10*60000).toISOString()});
 const bills=items.filter(x=>['today','tomorrow','overdue'].includes(x.type));if(bills.length)add('payments','calendar',bills.length===1?bills[0]:null);
 if(items.some(x=>x.type==='progress'))add('progress','ants');else if(items.some(x=>x.type==='ants'))add('ants','ants');
 if(items.some(x=>x.type==='morning'))add('morning','home');
 return out;
}
