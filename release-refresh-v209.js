// Recheck after Safari restores a page from back/forward cache. Never clear saved data.
(()=>{
'use strict';
const current=document.querySelector('meta[name="ary-release"]')?.content;if(!current)return;
let checking=false,last=0,pending=null;
const newer=version=>/^\d{3,}\.\d{1,3}$/.test(version)&&version.split('.').reduce((n,x)=>n*1000+Number(x),0)>current.split('.').reduce((n,x)=>n*1000+Number(x),0);
// Untouched defaults are safe; typed, checked, selected or uploaded drafts are not.
function dirty(field){
 if(field.disabled||field.readOnly)return false;
 if(field.tagName==='SELECT'){
  const options=[...field.options];
  if(field.multiple)return options.some(o=>o.selected!==o.defaultSelected);
  const selected=options.reduce((found,o,i)=>o.defaultSelected?i:found,-1);
  const initial=selected<0?options.findIndex(o=>!o.disabled&&!o.parentElement?.disabled):selected;
  return field.selectedIndex!==initial;
 }
 if(field.type==='file')return !!field.files?.length;
 if(['checkbox','radio'].includes(field.type))return field.checked!==field.defaultChecked;
 return field.validity?.badInput||field.value!==field.defaultValue;
}
const safe=()=>{
 const focused=document.activeElement;
 return document.getElementById('modal')?.classList.contains('hidden')&&
 !document.body.classList.contains('arranging192')&&
 !document.querySelector('#app [aria-busy="true"],#modal [aria-busy="true"]')&&
 ![...document.querySelectorAll('#app input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]),#app textarea,#app select')].some(dirty)&&
 !document.querySelector('#app [contenteditable="true"]')&&
 !focused?.matches('input,textarea,select')&&!focused?.isContentEditable;
};
function reload(manual=false){if(!pending)return;const url=new URL(location.href);if(url.searchParams.get('v')===pending&&!manual){notice();return}url.searchParams.set('v',pending);if(manual)url.searchParams.set('ary_refresh',String(Date.now()));location.replace(url.href);}
function notice(){if(document.getElementById('aryRelease209'))return;const button=document.createElement('button');button.type='button';button.id='aryRelease209';button.className='aryRelease209';button.textContent=s.locale==='en-US'?'New version · Update':s.locale==='pt-BR'?'Nova versão · Atualizar':'Nueva versión · Actualizar';button.onclick=()=>{if(safe())reload(true);else{button.textContent=s.locale==='en-US'?'Save or close your form first':s.locale==='pt-BR'?'Salve ou feche o formulário primeiro':'Guarda o cierra el formulario primero'}};button.setAttribute('aria-live','polite');document.body.appendChild(button);}
window.aryCheckRelease209=async function(){if(checking||Date.now()-last<30000)return false;checking=true;last=Date.now();const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),5000);try{const url=new URL('release.json',new URL('.',location.href));url.searchParams.set('check',String(Date.now()));const response=await fetch(url.href,{cache:'no-store',credentials:'same-origin',signal:controller.signal});if(!response.ok)return false;const result=await response.json();if(!newer(result?.version))return false;pending=result.version;if(safe())reload();else notice();return true}catch{return false}finally{clearTimeout(timer);checking=false}};
window.addEventListener('pageshow',event=>{if(event.persisted)last=0;aryCheckRelease209()});let refreshTimer;function schedule(){clearTimeout(refreshTimer);if(document.hidden||window.aryReview216?.active)return;refreshTimer=setTimeout(async()=>{await aryCheckRelease209();schedule()},300000)}document.addEventListener('visibilitychange',()=>{if(!document.hidden)aryCheckRelease209();schedule()});aryCheckRelease209();schedule();
})();
