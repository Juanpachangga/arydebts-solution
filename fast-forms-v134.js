(()=>{
'use strict';
const STYLE='aryFastFormsStyle134';
function ensureStyle(){
 if(document.getElementById(STYLE))return;
 const st=document.createElement('style');st.id=STYLE;st.textContent=`
#modal .sheet.ary134fast input,#modal .sheet.ary134fast select{min-height:46px}
#modal .sheet.ary134fast .ary134save{position:sticky;bottom:0;z-index:3;box-shadow:0 -8px 22px rgba(7,14,35,.18)}
.ary-light #modal .sheet.ary134fast .ary134save{box-shadow:0 -8px 22px rgba(60,83,115,.10)}
@media(max-width:560px){#modal .sheet.ary134fast{padding-bottom:max(12px,env(safe-area-inset-bottom))}#modal .sheet.ary134fast label{margin-top:9px}#modal .sheet.ary134fast input,#modal .sheet.ary134fast select{font-size:16px;min-height:48px}}
`;
 document.head.appendChild(st);
}
function visible(el){return !!el&&!el.disabled&&el.offsetParent!==null}
function formKind(sheet){
 if(sheet.querySelector('button[onclick*="saveExpense"]')&&sheet.querySelector('#n')&&sheet.querySelector('#b'))return 'expense';
 if(sheet.querySelector('button[onclick*="saveDebt"]')&&sheet.querySelector('#n')&&sheet.querySelector('#b'))return 'debt';
 if(sheet.querySelector('button[onclick*="setIncome"]')&&sheet.querySelector('#inc'))return 'income';
 return '';
}
function orderedFields(sheet,kind){
 const ids=kind==='expense'?['n','b','c']:kind==='debt'?['n','b','m','due','note','a']:['inc','if'];
 return ids.map(id=>sheet.querySelector('#'+id)).filter(visible);
}
function primary(sheet,kind){
 const key=kind==='expense'?'saveExpense':kind==='debt'?'saveDebt':'setIncome';
 return sheet.querySelector(`button[onclick*="${key}"]`);
}
function enhance(){
 ensureStyle();
 const sheet=document.querySelector('#modal:not(.hidden) .sheet');if(!sheet||sheet.dataset.aryFast134==='1')return;
 const kind=formKind(sheet);if(!kind)return;
 sheet.dataset.aryFast134='1';sheet.classList.add('ary134fast');
 const fields=orderedFields(sheet,kind),save=primary(sheet,kind);if(save)save.classList.add('ary134save');
 fields.forEach((el,i)=>{
   if(el.tagName==='INPUT')el.setAttribute('enterkeyhint',i===fields.length-1?'done':'next');
   if(el.tagName==='INPUT'&&['number','text','tel'].includes((el.type||'text').toLowerCase())&&(el.id==='b'||el.id==='m'||el.id==='a'||el.id==='inc')){
     el.addEventListener('focus',()=>{try{el.select()}catch{}},{once:true});
   }
 });
 sheet.addEventListener('keydown',e=>{
   if(e.key!=='Enter'||e.isComposing)return;
   if(e.target?.tagName==='TEXTAREA')return;
   const current=fields.indexOf(e.target),force=e.ctrlKey||e.metaKey;
   if(force&&save){e.preventDefault();save.click();return}
   if(current<0)return;
   const next=fields.slice(current+1).find(visible);
   if(next){e.preventDefault();next.focus();return}
   if(save){e.preventDefault();save.click()}
 });
 const first=fields.find(el=>String(el.value??'').trim()==='')||fields[0];
 if(first)setTimeout(()=>{if(document.querySelector('#modal:not(.hidden) .sheet')===sheet)try{first.focus({preventScroll:true})}catch{first.focus()}},40);
}
const baseModal=window.modal;
if(typeof baseModal==='function'&&!baseModal._aryFast134){
 const wrapped=function(){const out=baseModal.apply(this,arguments);requestAnimationFrame(enhance);return out};wrapped._aryFast134=true;window.modal=wrapped;
}
document.addEventListener('click',()=>requestAnimationFrame(enhance),{capture:true});
ensureStyle();requestAnimationFrame(enhance);
})();

// V139 — "Entendido" advances the correct automatic guide branch instead of ending the tour.
(()=>{
 if(document.getElementById('aryGuideUnderstoodLoader135'))return;
 const script=document.createElement('script');
 script.id='aryGuideUnderstoodLoader135';
 script.src='guide-understood-v135.js?v=135.2';
 script.async=false;
 document.body.appendChild(script);
})();
