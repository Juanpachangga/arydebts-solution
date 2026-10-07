(()=>{
  const EXP='ary-experience-v18';
  const getMode=()=>localStorage.getItem(EXP)||((typeof s!=='undefined'&&s.mode)||'immersive');
  const L={
    'es-US':{title:'Configuración',desc:'Ajusta cómo se siente Arydebts sin cambiar tus datos ni tu plan.',exp:'Experiencia',expd:'Inmersiva usa movimiento y brillo. Lite reduce efectos.',immersive:'✨ Inmersiva',lite:'⚡ Lite',appearance:'Apariencia',appearanced:'Cambia entre oscuro y claro.',dark:'🌙 Oscuro',light:'☀️ Claro',language:'Idioma',languaged:'Español Latinoamérica, English o Português Brasil.',change:'🌐 Cambiar',close:'Cerrar',settings:'⚙️ Configuración',summary:'Apariencia, idioma y experiencia'},
    'en-US':{title:'Settings',desc:'Adjust how Arydebts feels without changing your data or your plan.',exp:'Experience',expd:'Immersive uses motion and glow. Lite reduces effects.',immersive:'✨ Immersive',lite:'⚡ Lite',appearance:'Appearance',appearanced:'Switch between dark and light.',dark:'🌙 Dark',light:'☀️ Light',language:'Language',languaged:'Latin American Spanish, English or Brazilian Portuguese.',change:'🌐 Change',close:'Close',settings:'⚙️ Settings',summary:'Appearance, language and experience'},
    'pt-BR':{title:'Configurações',desc:'Ajuste a experiência do Arydebts sem alterar seus dados nem seu plano.',exp:'Experiência',expd:'Imersiva usa movimento e brilho. Lite reduz os efeitos.',immersive:'✨ Imersiva',lite:'⚡ Lite',appearance:'Aparência',appearanced:'Alterne entre escuro e claro.',dark:'🌙 Escuro',light:'☀️ Claro',language:'Idioma',languaged:'Espanhol Latinoamérica, English ou Português Brasil.',change:'🌐 Alterar',close:'Fechar',settings:'⚙️ Configurações',summary:'Aparência, idioma e experiência'}
  };
  const text=()=>L[(typeof s!=='undefined'&&L[s.locale])?s.locale:'es-US'];
  function applyMode(){document.body.classList.toggle('ary-lite',getMode()==='lite')}
  window.arySetExperience=(m)=>{localStorage.setItem(EXP,m);if(typeof s!=='undefined'){s.mode=m;try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}applyMode();enhance()};
  window.aryV18Settings=()=>{
    const mode=getMode(),theme=(typeof s!=='undefined'&&s.theme)||'dark',t=text();
    if(typeof modal!=='function')return;
    modal(`<h2>⚙️ ${t.title}</h2><p class="muted">${t.desc}</p><div class="v18-settings"><div class="v18-settingRow"><div><b>${t.exp}</b><span class="muted">${t.expd}</span></div><div class="v18-seg"><button class="btn ${mode==='immersive'?'on':''}" onclick="arySetExperience('immersive');setTimeout(aryV18Settings,0)">${t.immersive}</button><button class="btn ${mode==='lite'?'on':''}" onclick="arySetExperience('lite');setTimeout(aryV18Settings,0)">${t.lite}</button></div></div><div class="v18-settingRow"><div><b>${t.appearance}</b><span class="muted">${t.appearanced}</span></div><div class="v18-seg"><button class="btn ${theme==='dark'?'on':''}" onclick="toggleTheme();setTimeout(aryV18Settings,0)">${t.dark}</button><button class="btn ${theme==='light'?'on':''}" onclick="toggleTheme();setTimeout(aryV18Settings,0)">${t.light}</button></div></div><div class="v18-settingRow"><div><b>${t.language}</b><span class="muted">${t.languaged}</span></div><button class="btn" onclick="closeM();languageMenu()">${t.change}</button></div></div><button class="btn widebtn" onclick="closeM()">${t.close}</button>`);
  };
  function enhance(){
    applyMode();const app=document.getElementById('app');if(!app)return;
    if(typeof screen!=='undefined'&&screen==='more'&&!app.querySelector('[data-v18-settings]')){const t=text(),cards=[...app.querySelectorAll('.card')],host=cards[cards.length-1]||app,b=document.createElement('button');b.className='btn widebtn';b.dataset.v18Settings='1';b.innerHTML=`${t.settings} <span class="muted">${t.summary}</span>`;b.onclick=window.aryV18Settings;host.appendChild(b)}
  }
  const obs=new MutationObserver(()=>requestAnimationFrame(enhance));
  window.addEventListener('DOMContentLoaded',()=>{applyMode();enhance();const app=document.getElementById('app');if(app)obs.observe(app,{childList:true,subtree:true})});
  applyMode();setTimeout(enhance,0);
})();
