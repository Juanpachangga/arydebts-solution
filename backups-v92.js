/* Local recovery history only; never a cloud backup or authentication boundary. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryBackups92=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 const KEY='arydebts-v3',HISTORY='arydebts-recovery-v92';
 function valid(raw){try{const v=JSON.parse(raw);return v&&typeof v==='object'&&!Array.isArray(v)&&['debts','expenses','payments','calendarEvents'].every(k=>Array.isArray(v[k]))}catch{return false}}
 function create(storage,write=(k,v)=>storage.setItem(k,v),warn=()=>{},prepareRestore=value=>value){
  const read=()=>{try{const h=JSON.parse(storage.getItem(HISTORY)||'[]');return Array.isArray(h)?h.filter(x=>x&&typeof x.at==='string'&&valid(x.raw)).slice(0,8):[]}catch{return []}};
  function capture(raw){if(!valid(raw))return false;let h=read();if(h[0]?.raw===raw)return true;h.unshift({at:new Date().toISOString(),version:92,raw});h=h.slice(0,8);while(JSON.stringify(h).length>524288&&h.length>1)h.pop();if(JSON.stringify(h).length>524288){warn('backup');return false}try{write(HISTORY,JSON.stringify(h));return true}catch{warn('backup');return false}}
  function retainForRestore(raws){
    const required=[...new Set(raws)],previous=read();
    let history=required.map(raw=>previous.find(copy=>copy.raw===raw)||{at:new Date().toISOString(),version:92,raw});
    history=history.concat(previous.filter(copy=>!required.includes(copy.raw))).slice(0,8);
    while(JSON.stringify(history).length>524288&&history.length>required.length)history.pop();
    if(JSON.stringify(history).length>524288){warn('backup');return false}
    try{write(HISTORY,JSON.stringify(history));return true}catch{warn('backup');return false}
  }
  return Object.freeze({read,capture,write(k,v){if(k===KEY){const before=storage.getItem(KEY);if(before!==v)capture(before)}try{write(k,v)}catch(e){if(k===KEY)warn('save');throw e}},restore(index,selectedRaw,liveState){
    const copies=read(),item=selectedRaw===undefined?copies[index]:copies.find(copy=>copy.raw===selectedRaw);
    if(!item)throw new Error('invalid_backup');
    const raw=JSON.stringify(prepareRestore(JSON.parse(item.raw)));
    if(!valid(raw))throw new Error('invalid_backup');
    const before=storage.getItem(KEY);
    const live=liveState===undefined?null:JSON.stringify(liveState);
    if(live!==null&&!valid(live))throw new Error('invalid_live_state');
    const retain=[];
    if(live!==null&&live!==raw)retain.push(live);
    if(valid(before)&&before!==raw)retain.push(before);
    if(raw!==item.raw)retain.push(item.raw);
    if(retain.length&&!retainForRestore(retain))throw new Error('backup_retention_failed');
    try{write(KEY,raw)}catch(e){warn('save');throw e}
    return JSON.parse(raw);
  },export(liveState){
    const hasLive=liveState!==undefined;
    let current;try{current=storage.getItem(KEY)}catch(e){if(!hasLive)throw e;current=null}
    const raw=hasLive?JSON.stringify(liveState):current;
    if(!valid(raw))throw new Error('invalid_state');
    const unsaved=hasLive&&raw!==current;
    return JSON.stringify({format:'arydebts-local-backup',schema:1,createdAt:new Date().toISOString(),state:JSON.parse(raw),history:read(),...(unsaved?{unsavedChanges:true,lastSavedState:valid(current)?JSON.parse(current):null}:{}),repairedOriginals:(()=>{try{const items=JSON.parse(storage.getItem('arydebts-repair-original-v104')||'[]');return Array.isArray(items)?items.slice(0,3):[]}catch{return[]}})()},null,2);
  }});
 }
 return Object.freeze({create,valid,KEY,HISTORY});
});
if(typeof window!=='undefined'&&window.aryBackups92){
 (()=>{'use strict';if(typeof Storage==='undefined')return;let store;let problem='';
  function warning(kind){problem=kind;const show=()=>{let b=document.getElementById('aryStorageWarning92');if(!b){b=document.createElement('div');b.id='aryStorageWarning92';b.setAttribute('role','alert');b.style.cssText='position:fixed;top:0;left:0;right:0;z-index:9999;padding:14px;background:#542222;color:white;text-align:center';document.body.append(b)}b.textContent=kind==='save'?'No se pudo guardar el cambio. Mantén esta página abierta y descarga tus datos.':'No se pudo crear la copia local. Descarga tus datos desde Configuración.'};if(document.body)show();else window.addEventListener('DOMContentLoaded',show,{once:true})}
  try{const rawSet=Storage.prototype.setItem;store=aryBackups92.create(localStorage,(k,v)=>rawSet.call(localStorage,k,v),warning,value=>aryState104.normalize(value,cloneSeed()));Storage.prototype.setItem=function(k,v){if(this===localStorage&&String(k)===aryBackups92.KEY)return store.write(String(k),String(v));return rawSet.call(this,k,v)};store.capture(localStorage.getItem(aryBackups92.KEY))}catch{warning('backup');return}
  window.aryRecovery92=()=>{const h=store.read();modal('<section data-ary-copy><h2>Copias de mis datos</h2><p>Se conservan hasta 8 estados anteriores en este navegador. Borrar los datos del navegador también borra estas copias. Todavía no hay respaldo externo automático.</p><p>La descarga contiene información financiera sin cifrar. Guárdala en un lugar privado.</p>'+(problem?'<p role="alert">Hay un problema de almacenamiento. Descarga tus datos ahora.</p>':'')+'<button type="button" class="btn primary widebtn" id="aryDownload92">Descargar mis datos</button><div id="aryHistory92"></div><button class="btn widebtn" onclick="closeM()">Cerrar</button></section>');document.getElementById('aryDownload92').onclick=()=>{try{const url=URL.createObjectURL(new Blob([store.export(s)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='Arydebts-datos-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}catch{toast('No se pudo descargar el estado actual. Conserva la página abierta.')}};const list=document.getElementById('aryHistory92');h.forEach((item,index)=>{const b=document.createElement('button');b.type='button';b.className='btn widebtn';b.textContent='Recuperar '+new Date(item.at).toLocaleString();b.onclick=()=>{if(!confirm('¿Recuperar esta copia? Reemplazará los datos financieros actuales. Descarga tus datos antes de continuar.'))return;try{const state=store.restore(index,item.raw,s);s=state;closeM();render();toast('Copia local recuperada')}catch(error){toast(error.message==='backup_retention_failed'?'No se pudo conservar una copia de tus datos actuales. Descárgalos antes de intentar recuperar.':error.message==='invalid_backup'?'Esta copia ya no está disponible. Cierra y vuelve a abrir Copias de mis datos.':'No se pudo recuperar. Los datos actuales no se reemplazaron.')}};list.append(b)})};
  window.addEventListener('DOMContentLoaded',()=>{const before=window.aryV18Settings;if(typeof before==='function')window.aryV18Settings=()=>{before();const sheet=document.querySelector('#modal .sheet');if(!sheet)return;const b=document.createElement('button');b.type='button';b.className='btn widebtn';b.textContent='💾 Copias de mis datos';b.onclick=window.aryRecovery92;sheet.append(b)}});
 })();
}
