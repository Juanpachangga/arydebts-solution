(()=>{
const L={es:{experience:'Experiencia',motion:'Inmersiva usa movimiento y brillo. Lite reduce efectos.',immersive:'✨ Inmersiva',lite:'⚡ Lite',logout:'Cerrar sesión',edit:'Editar perfil',preferences:'Preferencias de la app',profile:'Mi perfil'},en:{experience:'Experience',motion:'Immersive adds motion and glow. Lite reduces effects.',immersive:'✨ Immersive',lite:'⚡ Lite',logout:'Sign out',edit:'Edit profile',preferences:'App preferences',profile:'My profile'},pt:{experience:'Experiência',motion:'Imersiva usa movimento e brilho. Lite reduz efeitos.',immersive:'✨ Imersiva',lite:'⚡ Lite',logout:'Sair',edit:'Editar perfil',preferences:'Preferências do app',profile:'Meu perfil'}};
const tx=()=>L[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es'];
const preferences=window.aryV18Settings;
window.aryV18Settings=()=>{
 preferences();const sheet=document.querySelector('#modal .sheet'),x=tx();if(!sheet)return;
 const section=document.createElement('section');section.className='experience58';
 section.innerHTML=`<div><b>${x.experience}</b><p class="muted">${x.motion}</p></div><div class="modeChoices58">${['immersive','lite'].map(mode=>`<button type="button" class="btn ${s.mode===mode?'primary':''}" aria-pressed="${s.mode===mode}" onclick="arySetMode58('${mode}')">${x[mode]}</button>`).join('')}</div>`;
 const close=sheet.querySelector(':scope>button:last-child');sheet.insertBefore(section,close);
};
window.arySetMode58=mode=>{if(!['immersive','lite'].includes(mode))return;s.mode=mode;save();window.aryV18Settings()};
screens.profile=()=>{const x=tx(),photo=safeGet('ary-profile-photo-v46'),name=s.name||profile?.name||'';return head(x.profile)+`<section class="card full profileOverview58"><button type="button" class="profileAvatar46" aria-label="${x.edit}" onclick="aryProfile46()">${photo?`<img src="${esc(photo)}" alt="${x.profile}">`:`<span>${userText(name.charAt(0).toUpperCase()||'A')}</span>`}</button><h2>${userText(name)}</h2><div class="menuGrid"><button class="btn menuItem" onclick="go('income')">💵 ${s.locale==='en-US'?'My income':s.locale==='pt-BR'?'Minha renda':'Mis ingresos'}</button><button class="btn menuItem" onclick="go('debts')">💳 ${s.locale==='en-US'?'My debts':s.locale==='pt-BR'?'Minhas dívidas':'Mis deudas'}</button><button class="btn menuItem" onclick="go('expenses')">🧾 ${s.locale==='en-US'?'My expenses':s.locale==='pt-BR'?'Meus gastos':'Mis gastos'}</button><button class="btn menuItem" onclick="go('goals')">🎯 ${s.locale==='en-US'?'My goals':s.locale==='pt-BR'?'Minhas metas':'Mis metas'}</button><button class="btn menuItem" onclick="aryProfile46()">✏️ ${x.edit}</button><button class="btn menuItem" onclick="aryV18Settings()">⚙️ ${x.preferences}</button></div></section>`};
const morePage=screens.more;
screens.more=()=>morePage()+`<button type="button" class="btn widebtn" onclick="aryV18Settings()">⚙️ ${tx().preferences}</button><button type="button" class="btn widebtn logout58" onclick="logout()">${tx().logout}</button>`;
let lastPeriod=Math.floor(new Date().getHours()/6);
document.addEventListener('visibilitychange',()=>{if(document.hidden||screen!=='home')return;const p=Math.floor(new Date().getHours()/6);if(p!==lastPeriod){lastPeriod=p;render()}});
render();
})();
