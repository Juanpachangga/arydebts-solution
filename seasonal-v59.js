(()=>{
const lang=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const words={es:{birthday:'Cumpleaños',optional:'Opcional: celebraremos contigo ese día.',month:'Mes',day:'Día',invalid:'Elige un mes y un día válidos, o deja ambos vacíos.',halloween:'Halloween',christmas:'Navidad',newyear:'Año nuevo',celebrate:'¡Feliz cumpleaños!'},en:{birthday:'Birthday',optional:'Optional: we will celebrate with you that day.',month:'Month',day:'Day',invalid:'Choose a valid month and day, or leave both empty.',halloween:'Halloween',christmas:'Christmas',newyear:'New year',celebrate:'Happy birthday!'},pt:{birthday:'Aniversário',optional:'Opcional: vamos celebrar com você nesse dia.',month:'Mês',day:'Dia',invalid:'Escolha um mês e dia válidos ou deixe ambos vazios.',halloween:'Halloween',christmas:'Natal',newyear:'Ano novo',celebrate:'Feliz aniversário!'}};
window.arySeason59=(date=new Date(),birthday=profile?.birthday||'')=>{
 const month=date.getMonth()+1,day=date.getDate();
 if(birthday===`${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`)return 'birthday';
 if(month===10)return 'halloween';
 if(month===12&&day>=26||month===1&&day<=7)return 'newyear';
 if(month===12)return 'christmas';
 return 'everyday';
};
const pumpkin='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 15q-3-10 6-12" fill="none" stroke="#6de5b4" stroke-width="5" stroke-linecap="round"/><path d="M32 15C5 4-7 54 26 58h12C71 54 59 4 32 15" fill="#ff973b"/><ellipse cx="32" cy="36" rx="16" ry="22" fill="#ffba52"/><path d="m17 31 11-6-2 11zm19-6 11 6-9 5zM18 43l8 4 6-4 6 4 8-4-5 10H23z" fill="#482350"/></svg>';
const star='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="m32 4 7 19 21 9-21 8-7 20-8-20L4 32l20-9z" fill="currentColor"/><path d="M49 5v12m-6-6h12" stroke="currentColor" stroke-width="3"/></svg>';
window.aryBrand59=()=>{
 const season=arySeason59(),x=words[lang()],icon=season==='halloween'?pumpkin:season==='christmas'?'<span>🎄</span>':season==='birthday'?'<span>🎂</span>':star;
 const label=season==='birthday'?x.celebrate:season==='everyday'?'':x[season];
 return `<div class="brandNeon59 season-${season}" aria-label="Arydebts${label?' · '+label:''}"><span class="brandCharm59" aria-hidden="true">${icon}</span><div class="brandLetter59"><b>ARYDEBTS</b>${label?`<small>${label}</small>`:''}</div><span class="brandSpark59" aria-hidden="true">✦</span></div>`;
};
window.aryBirthdayFields59=()=>{
 const x=words[lang()],[month,day]=(profile?.birthday||'').split('-').map(Number);
 const select=(id,count,value,label)=>`<div><label for="${id}">${label}</label><select id="${id}"><option value="">—</option>${Array.from({length:count},(_,i)=>`<option value="${i+1}" ${value===i+1?'selected':''}>${i+1}</option>`).join('')}</select></div>`;
 return `<fieldset class="birthdayFields59"><legend>${x.birthday}</legend><p class="muted">${x.optional}</p><div>${select('aryBirthdayMonth59',12,month,x.month)}${select('aryBirthdayDay59',31,day,x.day)}</div></fieldset>`;
};
window.arySaveBirthday59=()=>{
 const m=document.getElementById('aryBirthdayMonth59'),d=document.getElementById('aryBirthdayDay59');if(!m||!d)return true;
 const month=Number(m.value),day=Number(d.value),date=new Date(2000,month-1,day);
 if((month||day)&&(!month||!day||date.getMonth()!==month-1||date.getDate()!==day)){toast(words[lang()].invalid);return false}
 if(profile)profile.birthday=month?`${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`:'';
 return true;
};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&document.querySelector('.brandNeon59'))render()});
render();
})();
