// One brief profile signpost after a new customer completes setup.
(()=>{
'use strict';
const words={es:['Aquí está tu perfil','Presiona ARYDEBTS arriba o entra a Más → Mi perfil','Ver mi perfil','Cerrar'],en:['Here is your profile','Press ARYDEBTS at the top or go to More → My profile','View my profile','Close'],pt:['Aqui está seu perfil','Pressione ARYDEBTS no topo ou entre em Mais → Meu perfil','Ver meu perfil','Fechar']};
let current='',visible=false,timer,expires=0;
const owner=()=>window.aryGuideLifecycle128?.currentUser?.()||'';
function clear(){visible=false;expires=0;clearTimeout(timer);document.getElementById('profileHint213')?.remove();document.querySelector('.profileTarget213')?.classList.remove('profileTarget213')}
window.aryDismissProfileHint213=clear;
function position(){if(visible&&Date.now()>=expires){clear();return}const box=document.getElementById('profileHint213'),target=document.querySelector('#nav button[onclick="go(\'more\')"]');if(!box||!target)return;const r=target.getBoundingClientRect(),width=box.getBoundingClientRect().width,height=box.getBoundingClientRect().height;box.style.left=Math.max(8,Math.min(innerWidth-width-8,r.right-width))+'px';box.style.top=Math.max(8,Math.min(innerHeight-height-8,r.top-height-12))+'px'}
function paint(){
 if(visible&&Date.now()>=expires)clear();
 const key=owner();if(key!==current){clear();current=key}
 if(!profile||!s.onboarded||screen!=='home'){clear();return}
 if(document.hidden||document.querySelector('#modal:not(.hidden) .sheet'))return;
 if(!visible){
  if(s.profileHint213!=='pending'||!key)return;
  // Persist the acknowledgement before display: reloading never repeats it.
  if(!aryCommitFinancial109(next=>{next.profileHint213='seen';if(!next.premiumWelcome217)next.premiumWelcome217={owner:key,status:'pending'}}))return;
  visible=true;expires=Date.now()+10000;timer=setTimeout(clear,10000);
 }
 const target=document.querySelector('#nav button[onclick="go(\'more\')"]');if(!target)return;
 target.classList.add('profileTarget213');const x=words[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es'];let box=document.getElementById('profileHint213');if(!box){box=document.createElement('aside');box.id='profileHint213';box.setAttribute('data-ary-copy','');document.body.append(box)}
 box.innerHTML=`<div role="status"><b>👤 ${x[0]}</b><small>${x[1]}</small></div><button type="button" class="profileOpen213">${x[2]} ›</button><button type="button" class="profileClose213" aria-label="${x[3]}">×</button>`;
 box.querySelector('.profileOpen213').onclick=()=>{clear();go('profile')};box.querySelector('.profileClose213').onclick=clear;position();
}
const before=window.render;window.render=function(){const result=before.apply(this,arguments);paint();return result};
addEventListener('resize',position);addEventListener('scroll',position,{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else paint()});paint();
})();

