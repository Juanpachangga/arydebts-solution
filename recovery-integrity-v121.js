(()=>{
'use strict';
const KEY='arydebts-v3';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const C={
 es:{import:'Importar una copia descargada',hint:'Acepta únicamente un archivo JSON de Arydebts. Antes de reemplazar tus datos, Arydebts valida el archivo y conserva el estado actual en el historial local.',bad:'Este archivo no parece una copia válida de Arydebts.',large:'El archivo es demasiado grande para una copia local de Arydebts.',duplicate:'La copia contiene identificadores duplicados y no se importó.',orphan:'La copia contiene pagos asociados a una deuda inexistente y no se importó.',numbers:'La copia contiene valores financieros inválidos y no se importó.',confirm:'¿Importar esta copia? Reemplazará los datos actuales. Arydebts conservará primero una copia local del estado actual.',done:'Copia importada correctamente.',failed:'No se pudo importar. Tus datos actuales no fueron reemplazados.'},
 en:{import:'Import a downloaded backup',hint:'Only an Arydebts JSON backup is accepted. Before replacing your data, Arydebts validates the file and keeps the current state in local recovery history.',bad:'This file does not appear to be a valid Arydebts backup.',large:'The file is too large for an Arydebts local backup.',duplicate:'The backup contains duplicate identifiers and was not imported.',orphan:'The backup contains payments linked to a missing debt and was not imported.',numbers:'The backup contains invalid financial values and was not imported.',confirm:'Import this backup? It will replace current data. Arydebts will first retain a local copy of the current state.',done:'Backup imported successfully.',failed:'Could not import the backup. Current data was not replaced.'},
 pt:{import:'Importar uma cópia baixada',hint:'Somente um backup JSON do Arydebts é aceito. Antes de substituir seus dados, o Arydebts valida o arquivo e mantém o estado atual no histórico local.',bad:'Este arquivo não parece ser um backup válido do Arydebts.',large:'O arquivo é grande demais para um backup local do Arydebts.',duplicate:'O backup contém identificadores duplicados e não foi importado.',orphan:'O backup contém pagamentos ligados a uma dívida inexistente e não foi importado.',numbers:'O backup contém valores financeiros inválidos e não foi importado.',confirm:'Importar este backup? Ele substituirá os dados atuais. O Arydebts primeiro manterá uma cópia local do estado atual.',done:'Backup importado com sucesso.',failed:'Não foi possível importar. Seus dados atuais não foram substituídos.'}
};
const t=()=>C[lang()];
const isRecord=v=>v&&typeof v==='object'&&!Array.isArray(v);
const arrays=['debts','expenses','payments','calendarEvents'];
function duplicateIds(items){const seen=new Set();for(const item of items){if(!isRecord(item)||item.id===undefined||item.id===null)continue;const id=String(item.id);if(seen.has(id))return true;seen.add(id)}return false}
function finiteNonNegative(value){const n=Number(value);return Number.isFinite(n)&&n>=0}
function rawStateFromFile(parsed){if(isRecord(parsed)&&parsed.format==='arydebts-local-backup'&&Number(parsed.schema)===1&&isRecord(parsed.state))return parsed.state;if(isRecord(parsed)&&arrays.every(k=>Array.isArray(parsed[k])))return parsed;throw new Error('invalid_backup')}
function validateState(input){
 if(!isRecord(input)||!arrays.every(k=>Array.isArray(input[k])))throw new Error('invalid_backup');
 if(arrays.some(k=>duplicateIds(input[k])))throw new Error('duplicate_ids');
 if(!finiteNonNegative(input.income??0)||!finiteNonNegative(input.savings??0))throw new Error('invalid_numbers');
 for(const d of input.debts){if(!isRecord(d)||!finiteNonNegative(d.balance??0)||!finiteNonNegative(d.min??0)||!finiteNonNegative(d.apr??0))throw new Error('invalid_numbers')}
 for(const e of input.expenses){if(!isRecord(e)||!finiteNonNegative(e.amount??0))throw new Error('invalid_numbers')}
 for(const p of input.payments){if(!isRecord(p)||!finiteNonNegative(p.amount??0))throw new Error('invalid_numbers')}
 const debtIds=new Set(input.debts.filter(isRecord).map(d=>String(d.id)));
 for(const p of input.payments)if(p.debtId!==undefined&&p.debtId!==null&&!debtIds.has(String(p.debtId)))throw new Error('orphan_payment');
 const normalized=window.aryState104&&typeof aryState104.normalize==='function'?aryState104.normalize(input,cloneSeed()):input;
 const encoded=JSON.stringify(normalized,(key,value)=>{if(typeof value==='number'&&!Number.isFinite(value))throw new Error('invalid_numbers');return value});
 if(encoded.length>1048576)throw new Error('too_large');
 return normalized;
}
function message(error){const x=t();return error?.message==='too_large'?x.large:error?.message==='duplicate_ids'?x.duplicate:error?.message==='orphan_payment'?x.orphan:error?.message==='invalid_numbers'?x.numbers:error?.message==='invalid_backup'?x.bad:x.failed}
window.aryValidateBackup121=validateState;
window.aryImportBackup121=async file=>{
 const x=t();
 try{
  if(!file||file.size>1048576)throw new Error('too_large');
  const parsed=JSON.parse(await file.text()),candidate=validateState(rawStateFromFile(parsed));
  if(!confirm(x.confirm))return false;
  const encoded=JSON.stringify(candidate);
  localStorage.setItem(KEY,encoded);
  s=candidate;
  if(typeof closeM==='function')closeM();
  if(typeof render==='function')render();
  if(typeof toast==='function')toast(x.done);
  return true;
 }catch(error){if(typeof toast==='function')toast(message(error));return false}
};
const original=window.aryRecovery92;
if(typeof original==='function')window.aryRecovery92=function(){
 original();
 const sheet=document.querySelector('#modal .sheet');if(!sheet||document.getElementById('aryImport121'))return;
 const x=t(),box=document.createElement('section');box.id='aryImport121';box.className='notice';
 box.innerHTML=`<b>📥 ${x.import}</b><p class="muted">${x.hint}</p><input id="aryImportFile121" type="file" accept="application/json,.json" hidden><button type="button" class="btn widebtn" id="aryImportButton121">${x.import}</button>`;
 const close=sheet.querySelector('button:last-child');sheet.insertBefore(box,close||null);
 const input=box.querySelector('#aryImportFile121');box.querySelector('#aryImportButton121').onclick=()=>input.click();input.onchange=()=>{const file=input.files?.[0];if(file)aryImportBackup121(file);input.value=''};
};
})();
