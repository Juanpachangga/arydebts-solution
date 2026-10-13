(()=>{
'use strict';
const model=window.aryFX208,cacheKey='ary-fx-rates-v208';let busy=false;
const lang=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const C={es:{loading:'Consultando tasa…',failed:'No se pudo convertir. Conservamos tu moneda y tus valores.',hint:'Conversión con tasas de referencia diarias.',date:'Tasa de referencia',source:'Frankfurter',sourceHint:'Conversión estimada. No cambia dinero en el banco ni incluye comisiones.'},en:{loading:'Fetching rate…',failed:'Could not convert. Your currency and amounts were kept.',hint:'Conversion using daily reference rates.',date:'Reference rate',source:'Frankfurter',sourceHint:'Estimated conversion. It does not exchange bank funds or include fees.'},pt:{loading:'Consultando taxa…',failed:'Não foi possível converter. Sua moeda e seus valores foram mantidos.',hint:'Conversão com taxas de referência diárias.',date:'Taxa de referência',source:'Frankfurter',sourceHint:'Conversão estimada. Não troca dinheiro no banco nem inclui tarifas.'}};
const t=()=>C[lang()],owner=()=>window.aryGuideLifecycle128?.currentUser?.()||profile?.email||'',today=()=>new Date().toISOString().slice(0,10);
function controls(){return [...document.querySelectorAll('#quickCurrency197,#debtCurrency70,#oc,#cur,select[onchange*="arySetCurrency70"]')];}
function status(){const box=document.querySelector('.quickCurrency197 small');if(box){box.textContent=busy?t().loading:s.fxRate208?t().date+' · '+s.fxRate208.date+' · '+t().source:t().hint;box.title=t().sourceHint;box.dataset.aryCopy='';}}
function resetControls(){controls().forEach(el=>{el.disabled=busy;el.setAttribute('aria-busy',String(busy));if(!busy)el.value=s.currency});status();}
function readCache(codes){try{const stored=JSON.parse(localStorage.getItem(cacheKey));if(stored?.fetchedDate!==today())return null;const table=model.rates(stored.rows,today());return codes.every(c=>table[c])?table:null}catch{return null}}
async function load(codes){
 const controller=new AbortController();let timer;
 try{return await Promise.race([(async()=>{const response=await fetch('https://api.frankfurter.dev/v2/rates?base=USD&quotes='+codes.join(','),{signal:controller.signal,credentials:'omit',headers:{Accept:'application/json'}});if(!response.ok)throw Error('rates_unavailable');const rows=await response.json(),table=model.rates(rows,today());if(!codes.every(c=>table[c]))throw Error('missing_rate');try{localStorage.setItem(cacheKey,JSON.stringify({fetchedDate:today(),rows}))}catch{}return table})(),new Promise((_,reject)=>timer=setTimeout(()=>{controller.abort();reject(Error('timeout'))},8000))])}finally{clearTimeout(timer)}
}
function draft(){const ids=['homeExpense193','b','m','payAmount54','editPayAmount54','cevAmount36','sv','buyPrice45','inc45','oi','analysisAmount93'];return ids.map(id=>{const el=document.getElementById(id);if(!el||id==='b'&&document.getElementById('expenseUnit208')?.value&&document.getElementById('expenseUnit208').value!==s.currency)return null;const quick=id==='homeExpense193',parts=quick?aryInstant197.split(el.value):null,n=parts&&aryInstant197.number(parts.raw,s.locale,true);return {id,value:el.value,quick,amount:quick?n?.value:parseNum(el.value),name:parts?.name||''};}).filter(Boolean);}
function updateDraft(values,from,to,table){for(const saved of values){const el=document.getElementById(saved.id);if(!el||!Number.isFinite(saved.amount)||!saved.value.trim())continue;try{const n=model.convert(saved.amount,from,to,table);if(saved.quick){if(n===saved.amount)continue;const decimal=aryInstant197.punctuation(s.locale).decimal;el.value=String(n).replace('.',decimal)+(saved.name?' '+saved.name:'');aryFormatHomeExpense196();}else el.value=window.aryInputNumber63?aryInputNumber63(n):String(n);}catch{}}
 const unit=document.getElementById('expenseUnit208');if(unit?.value===from)unit.value=to;
 document.querySelectorAll('#modal .amountPresets button').forEach(button=>{const match=button.getAttribute('onclick')?.match(/^presetAmount\((\d+(?:\.\d+)?)\)$/);if(match)button.textContent='+'+money(Number(match[1]))});
}
function apply(target,table,extra,after,originalOwner,from,values){
 if(owner()!==originalOwner||s.currency!==from)return false;
 values=draft();
 const required=model.needed(s,target);if(required.some(c=>!table[c])&&model.records(s).some(r=>r.fields.some(f=>Number(r.item[f])!==0&&r.item[f]!=null)))return false;
 const saved=aryCommitFinancial109(next=>{const converted=model.transform(next,target,table);Object.assign(next,converted);const dates=required.map(c=>table[c]?.date).filter(Boolean).sort();next.fxRate208={source:'Frankfurter',date:dates[0]||today(),from,to:target};if(extra)extra(next)});
 if(!saved)return false;
 render();updateDraft(values,from,target,table);after?.();return true;
}
window.aryCurrencyUpdate208=function(target,extra,after){
 if(busy||!model.code(target)||!currencies().includes(target))return false;
 if(target===s.currency){if(!extra)return true;const ok=aryCommitFinancial109(extra);if(ok){render();after?.()}else toast(t().failed);return ok;}
 const originalOwner=owner(),from=s.currency,values=draft(),codes=model.needed(s,target),hasMoney=model.records(s).some(r=>r.fields.some(f=>r.item[f]!=null&&Number(r.item[f])!==0));
 const cached=hasMoney?readCache(codes):{};
 if(cached){const ok=apply(target,cached,extra,after,originalOwner,from,values);resetControls();if(!ok)toast(t().failed);return ok;}
 busy=true;resetControls();
 return load(codes).then(table=>{const ok=apply(target,table,extra,after,originalOwner,from,values);if(!ok&&owner()===originalOwner)toast(t().failed);return ok}).catch(()=>{if(owner()===originalOwner)toast(t().failed);return false}).finally(()=>{busy=false;resetControls()});
};
window.arySetCurrency70=target=>aryCurrencyUpdate208(target);
const renderBase=window.render;window.render=function(){const out=renderBase.apply(this,arguments);resetControls();return out};
// Setup uses the same transaction when a returning user changes currency.
window.arySaveIncome54=function(){const input=document.getElementById('oi'),raw=input?.value||'',amount=parseNum(raw),frequency=document.getElementById('of')?.value||'monthly',currency=document.getElementById('oc')?.value||s.currency;if(!raw.trim()||!Number.isFinite(amount)||amount<0||!['daily','every_2_days','every_3_days','every_4_days','weekly','biweekly','twice_monthly','monthly','quarterly','semiannual','annual'].includes(frequency)){toast(t().failed);return false}return aryCurrencyUpdate208(currency,next=>{next.income=amount;next.incomeFrequency=frequency},()=>go('setupExpenses'));};
// A record-level unit selector also lets users correct legacy entries whose units were not stored.
const expenseFormBase=window.expenseForm;
window.expenseForm=function(){const out=expenseFormBase.apply(this,arguments),input=document.getElementById('b');if(!input||typeof input.after!=='function'||document.getElementById('expenseUnit208'))return out;const box=document.createElement('div');box.className='expenseUnit208';const label=document.createElement('label');label.htmlFor='expenseUnit208';label.textContent=({es:'Moneda del importe',en:'Amount currency',pt:'Moeda do valor'})[lang()];const select=document.createElement('select');select.id='expenseUnit208';for(const code of currencies()){const option=document.createElement('option');option.value=code;option.textContent=code;option.selected=code===s.currency;select.appendChild(option)}box.append(label,select);input.after(box);return out;};
const saveExpenseBase=window.saveExpense;
window.saveExpense=function(id){
 const input=document.getElementById('b'),unit=document.getElementById('expenseUnit208'),from=unit?.value,target=s.currency;
 if(!unit||from===target)return saveExpenseBase.apply(this,arguments);
 const amount=parseNum(input?.value),raw=input?.value,originalOwner=owner(),name=document.getElementById('n')?.value;
 if(busy||!model.code(from)||!Number.isFinite(amount)||amount<=0||!name?.trim())return false;
 const beforeIds=new Set((s.expenses||[]).map(e=>String(e.id)));
 function complete(table){
  if(owner()!==originalOwner||s.currency!==target||document.getElementById('b')!==input||input.value!==raw||document.getElementById('n')?.value!==name||unit.value!==from)return false;
  const value=model.convert(amount,from,target,table),commitBase=window.aryCommitFinancial109;
  input.value=window.aryInputNumber63?aryInputNumber63(value):String(value);
  window.aryCommitFinancial109=change=>commitBase(next=>{change(next);const item=id!=null?next.expenses.find(e=>String(e.id)===String(id)):next.expenses.find(e=>!beforeIds.has(String(e.id)));if(item){item.currency=target;item.fxShownCurrency208=target;item.fxBasis208={amount:{currency:from,value:amount,shown:item.amount}};delete item.amountText197;}});
  try{const ok=saveExpenseBase(id);if(!ok&&document.getElementById('b')===input)input.value=raw;return !!ok}finally{window.aryCommitFinancial109=commitBase}
 }
 const codes=[...new Set([from,target])],cached=readCache(codes);
 if(cached){try{return complete(cached)}catch{toast(t().failed);return false}}
 busy=true;unit.disabled=true;resetControls();
 return load(codes).then(table=>{const ok=complete(table);if(!ok&&owner()===originalOwner)toast(t().failed);return ok}).catch(()=>{if(owner()===originalOwner)toast(t().failed);return false}).finally(()=>{busy=false;if(document.getElementById('expenseUnit208')===unit)unit.disabled=false;resetControls()});
};
status();
})();
