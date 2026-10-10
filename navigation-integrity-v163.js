(()=>{
'use strict';
const oldGo=window.go;
const oldBack=window.back;
const copy=()=>s?.locale==='en-US'?'That section is not available.':s?.locale==='pt-BR'?'Essa seção não está disponível.':'Esa sección no está disponible.';
const valid=name=>typeof screens==='object'&&screens!==null&&Object.prototype.hasOwnProperty.call(screens,String(name||''));

if(typeof oldGo==='function'&&!oldGo._ary163){
 const guardedGo=function(name){
  const target=String(name||'');
  if(!valid(target)){
   if(typeof toast==='function')toast(copy());
   return false;
  }
  return oldGo.call(this,target);
 };
 guardedGo._ary163=true;
 guardedGo._aryPrevious163=oldGo;
 window.go=guardedGo;
}

if(typeof oldBack==='function'&&!oldBack._ary163){
 const guardedBack=function(){
  try{
   if(Array.isArray(appNavigation55)){
    while(appNavigation55.length&&!valid(appNavigation55[appNavigation55.length-1]))appNavigation55.pop();
   }
  }catch{}
  return oldBack.apply(this,arguments);
 };
 guardedBack._ary163=true;
 guardedBack._aryPrevious163=oldBack;
 window.back=guardedBack;
}

window.aryNavigationIntegrity163={valid};
})();

// V180 — prevent the full guide from changing routes while the user is interacting.
(()=>{
 if(document.getElementById('aryGuideInteractionSafetyLoader180'))return;
 const script=document.createElement('script');
 script.id='aryGuideInteractionSafetyLoader180';
 script.src='guide-interaction-safety-v180.js?v=180.1';
 script.async=false;
 document.body.appendChild(script);
})();
