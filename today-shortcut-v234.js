// Local calendar day, updated without rebuilding financial forms or saving state.
(()=>{'use strict';
const active=()=>!!profile&&!!s.onboarded&&screen==='home',day=(now=new Date())=>`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const text=()=>s.locale==='en-US'?['Today','Open today in my calendar']:s.locale==='pt-BR'?['Hoje','Abrir hoje no meu calendário']:['Hoy','Abrir hoy en mi calendario'];
let timer;
window.aryOpenToday234=()=>{if(!profile||!s.onboarded)return false;return aryCalendarDate60(day())};
function paint(){
 clearTimeout(timer);if(!active())return;
 const picker=document.getElementById('homeExperience214'),hello=document.querySelector('#app .hello');if(!picker||!hello)return;
 let button=document.getElementById('todayShortcut234');
 if(!button){button=document.createElement('button');button.type='button';button.id='todayShortcut234';button.className='btn todayShortcut234';button.onclick=window.aryOpenToday234;button.innerHTML='<span class="todayIcon234" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="4"/><path d="M7 3v4m10-4v4M3 11h18m-12 4h2m4 0h2m-8 3h2"/></svg></span><span class="todayCopy234"><small></small><time></time></span><span class="todayArrow234" aria-hidden="true">›</span>';
 if(picker.querySelector('.premiumBadge219')){picker.classList.add('premiumDate234');picker.append(button)}else{const row=document.createElement('div');row.className='todayRow234';row.append(button);hello.after(row)}}
 const now=new Date(),key=day(now),x=text();let label;try{label=new Intl.DateTimeFormat(s.locale||'es-US',{day:'numeric',month:'short',year:'numeric'}).format(now)}catch{label=new Intl.DateTimeFormat('es-US',{day:'numeric',month:'short',year:'numeric'}).format(now)}
 const time=button.querySelector('time'),small=button.querySelector('small');if(time.dateTime!==key)time.dateTime=key;if(time.textContent!==label)time.textContent=label;if(small.textContent!==x[0])small.textContent=x[0];button.setAttribute('aria-label',x[1]+' · '+label);button.title=x[1];
 if(!document.hidden){const next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0,50);timer=setTimeout(paint,Math.max(50,next-now))}
}
const before=window.render;window.render=function(){const result=before.apply(this,arguments);paint();return result};
for(const event of ['focus','pageshow'])addEventListener(event,paint);document.addEventListener('visibilitychange',paint);
window.aryTodayShortcut234=true;paint();
})();
