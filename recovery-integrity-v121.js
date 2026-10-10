(()=>{
'use strict';
const KEY='arydebts-v3',BACKUP_KEY='arydebts-recovery-v92';
const allowedCurrencies=new Set(['USD','COP','EUR','MXN','BRL','CAD','GBP','JPY']);
const allowedLocales=new Set(['es-US','en-US','pt-BR']);
const allowedNav=new Set(['home','debts','expenses','plan','more']);
const validDate=value=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return false;const [y,m,d]=String(value).split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d};
const finite=value=>Number.isFinite(Number(value));
const uniqueIds=list=>{const seen=new Set();for(const item of list||[]){if(!item||item.id==null)continue;const id=String(item.id);if(seen.has(id))throw new Error('duplicate');seen.add(id)}};
const t=()=>s?.locale==='en-US'?{import:'Import backup',hint:'Choose a JSON backup exported by Arydebts. Your current state is retained first.',confirm:'Replace your current Arydebts data with this backup?',done:'Backup imported',invalid:'That file is not a valid Arydebts backup.',save:'The backup is valid, but Arydebts could not safely retain your current state. Nothing was replaced.'}:s?.locale==='pt-BR'?{import:'Importar backup',hint:'Escolha um backup JSON exportado pelo Arydebts. Seu estado atual será preservado primeiro.',confirm:'Substituir seus dados atuais do Arydebts por este backup?',done:'Backup importado',invalid:'Esse arquivo não é um backup válido do Arydebts.',save:'O backup é válido, mas o Arydebts não conseguiu preservar com segurança seu estado atual. Nada foi substituído.'}:{import:'Importar copia',hint:'Elige una copia JSON exportada por Arydebts. Primero conservaremos tu estado actual.',confirm:'¿Reemplazar tus datos actuales de Arydebts con esta copia?',done:'Copia importada',invalid:'Ese archivo no es una copia válida de Arydebts.',save:'La copia es válida, pero Arydebts no pudo conservar con seguridad tu estado actual. No se reemplazó nada.'};
function rawStateFromFile(parsed){return parsed?.state&&typeof parsed.state==='object'?parsed.state:parsed?.data&&typeof parsed.data==='object'?parsed.data:parsed}
function validateState(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('invalid');
 const next=typeof aryNormalizeState104==='function'?aryNormalizeState104(raw):structuredClone(raw);
 next.debts=Array.isArray(next.debts)?next.debts:[];next.expenses=Array.isArray(next.expenses)?next.expenses:[];next.payments=Array.isArray(next.payments)?next.payments:[];next.calendarEvents=Array.isArray(next.calendarEvents)?next.calendarEvents:[];next.goals=Array.isArray(next.goals)?next.goals:[];
 if(!allowedCurrencies.has(String(next.currency||'')))next.currency='USD';
 if(!allowedLocales.has(String(next.locale||'')))next.locale='es-US';
 next.navOrder=[...new Set((Array.isArray(next.navOrder)?next.navOrder:[]).filter(x=>allowedNav.has(String(x))))];for(const x of ['home','debts','expenses','plan','more'])if(!next.navOrder.includes(x))next.navOrder.push(x);
 uniqueIds(next.debts);uniqueIds(next.expenses);uniqueIds(next.payments);uniqueIds(next.calendarEvents);uniqueIds(next.goals);
 for(const d of next.debts){if(!finite(d.balance)||Number(d.balance)<0||d.minimum!=null&&(!finite(d.minimum)||Number(d.minimum)<0)||d.apr!=null&&(!finite(d.apr)||Number(d.apr)<0))throw new Error('invalid');if(d.due&& !validDate(d.due))d.due=''}
 for(const e of next.expenses){if(!finite(e.amount)||Number(e.amount)<0)throw new Error('invalid');if(e.date&&!validDate(e.date))throw new Error('date');}
 const debtIds=new Set(next.debts.map(d=>String(d.id)));for(const p of next.payments){if(!finite(p.amount)||Number(p.amount)<=0||!validDate(p.date)||!debtIds.has(String(p.debtId)))throw new Error('invalid')}
 for(const e of next.calendarEvents){if(!validDate(e.date))throw new Error('date')}
 return next;
}
function retainCurrentBeforeImport(encoded){
 const current=localStorage.getItem(KEY);if(!current||current===encoded)return true;
 try{
  const before=localStorage.getItem(BACKUP_KEY),history=before?JSON.parse(before):[];
  const list=Array.isArray(history)?history:[];
  if(!list.some(entry=>entry?.state===current))list.unshift({savedAt:new Date().toISOString(),reason:'before-import',state:current});
  localStorage.setItem(BACKUP_KEY,JSON.stringify(list.slice(0,12)));
  const verify=JSON.parse(localStorage.getItem(BACKUP_KEY)||'[]');
  if(!Array.isArray(verify)||!verify.some(entry=>entry?.state===current))throw new Error('retain');
  return true;
 }catch{throw new Error('retain')}
}
function message(error){return error?.message==='retain'?t().save:t().invalid}
window.aryImportBackup121=async function(file){
 try{
  if(!file||file.size>8*1024*1024)throw new Error('invalid');
  const parsed=JSON.parse(await file.text()),candidate=validateState(rawStateFromFile(parsed));
  if(!confirm(t().confirm))return false;
  const encoded=JSON.stringify(candidate);
  retainCurrentBeforeImport(encoded);
  localStorage.setItem(KEY,encoded);
  s=candidate;
  if(typeof closeM==='function')closeM();
  if(typeof render==='function')render();
  if(typeof toast==='function')toast(t().done);
  return true;
 }catch(error){if(typeof toast==='function')toast(message(error));return false}
};
const original=window.aryRecovery92;
if(typeof original==='function')window.aryRecovery92=function(){
 original();
 const sheet=document.querySelector('#modal .sheet');if(!sheet||document.getElementById('aryImport121'))return;
 const x=t(),box=document.createElement('section');box.id='aryImport121';box.className='notice';
 box.innerHTML=`<b>📥 ${x.import}</b><p class="muted">${x.hint}</p><input id="aryImportFile121" type="file" accept="application/json,.json" hidden><button type="button" class="btn widebtn" id="aryImportButton121">${x.import}</button>`;
 const directButtons=[...sheet.children].filter(el=>el.tagName==='BUTTON');
 const close=directButtons.length?directButtons[directButtons.length-1]:null;
 if(close&&close.parentNode===sheet)sheet.insertBefore(box,close);else sheet.appendChild(box);
 const input=box.querySelector('#aryImportFile121');box.querySelector('#aryImportButton121').onclick=()=>input.click();input.onchange=()=>{const file=input.files?.[0];if(file)aryImportBackup121(file);input.value=''};
};
})();