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
    // Back may skip duplicate current routes before reading the next entry.
    // Remove invalid entries at every depth, not only at the top.
    for(let i=appNavigation55.length-1;i>=0;i--)if(!valid(appNavigation55[i]))appNavigation55.splice(i,1);
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

// V184 — automatic first-use guidance yields to interaction and clears stale step visuals.
(()=>{
 if(document.getElementById('aryGuideInteractionSafetyLoader180'))return;
 const script=document.createElement('script');
 script.id='aryGuideInteractionSafetyLoader180';
 script.src='guide-interaction-safety-v180.js?v=184.1';
 script.async=false;
 document.body.appendChild(script);
})();

