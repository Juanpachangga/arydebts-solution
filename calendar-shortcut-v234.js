// Current local date and direct calendar access in every signed-in experience.
(()=>{
'use strict';
let timer;
const localDay=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
function paint(){
 document.querySelectorAll('#todayCalendar234').forEach(el=>el.remove());
 if(!profile||!s.onboarded||['welcome','signup','login','intro'].includes(screen))return;
 const home=document.getElementById('homeExperience214'),header=document.querySelector('#app .hello');
 if(!home&&!header)return;
 const en=s.locale==='en-US',pt=s.locale==='pt-BR',label=en?'Open calendar':pt?'Abrir calendário':'Abrir calendario',now=new Date();
 const button=document.createElement('button');button.id='todayCalendar234';button.type='button';button.className='btn todayCalendar234';button.setAttribute('data-ary-copy','');button.setAttribute('aria-label',label+' · '+new Intl.DateTimeFormat(s.locale||'es-US',{dateStyle:'full'}).format(now));button.title=label;
 const icon=document.createElement('span');icon.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18"/></svg>';icon.setAttribute('aria-hidden','true');
 const text=document.createElement('span'),small=document.createElement('small');small.textContent=en?'Today':pt?'Hoje':'Hoy';
 const time=document.createElement('time');time.dateTime=localDay();time.textContent=new Intl.DateTimeFormat(s.locale||'es-US',{day:'numeric',month:'short',year:'numeric'}).format(now);
 const arrow=document.createElement('span');arrow.textContent='›';arrow.setAttribute('aria-hidden','true');text.append(small,time);button.append(icon,text,arrow);
 button.onclick=()=>aryCalendarDate60(localDay());
 if(home)home.append(button);else header.append(button);
}
function schedule(){clearTimeout(timer);const now=new Date(),next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);timer=setTimeout(()=>{paint();schedule()},next-now+50)}
const before=window.render;window.render=function(){const result=before.apply(this,arguments);paint();return result};
addEventListener('ary-premium-status',()=>queueMicrotask(paint));
addEventListener('pageshow',()=>{paint();schedule()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){paint();schedule()}});
paint();schedule();
})();
