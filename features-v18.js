(()=>{
  const EXP='ary-experience-v18';
  const getMode=()=>localStorage.getItem(EXP)||((typeof s!=='undefined'&&s.mode)||'immersive');
  const L={
    'es-US':{title:'Configuración',desc:'Ajusta cómo se siente Arydebts sin cambiar tus datos ni tu plan.',exp:'Experiencia',expd:'Inmersiva usa movimiento y brillo. Lite reduce efectos.',immersive:'✨ Inmersiva',lite:'⚡ Lite',appearance:'Apariencia',appearanced:'Toca el interruptor para transformar toda la aplicación.',dark:'🌙 Modo oscuro',light:'☀️ Modo claro',language:'Idioma',languaged:'Español Latinoamérica, English o Português Brasil.',change:'🌐 Cambiar',close:'Cerrar',settings:'⚙️ Configuración',summary:'Apariencia, idioma y experiencia'},
    'en-US':{title:'Settings',desc:'Adjust how Arydebts feels without changing your data or your plan.',exp:'Experience',expd:'Immersive uses motion and glow. Lite reduces effects.',immersive:'✨ Immersive',lite:'⚡ Lite',appearance:'Appearance',appearanced:'Tap the switch to transform the entire app.',dark:'🌙 Dark mode',light:'☀️ Light mode',language:'Language',languaged:'Latin American Spanish, English or Brazilian Portuguese.',change:'🌐 Change',close:'Close',settings:'⚙️ Settings',summary:'Appearance, language and experience'},
    'pt-BR':{title:'Configurações',desc:'Ajuste a experiência do Arydebts sem alterar seus dados nem seu plano.',exp:'Experiência',expd:'Imersiva usa movimento e brilho. Lite reduz os efeitos.',immersive:'✨ Imersiva',lite:'⚡ Lite',appearance:'Aparência',appearanced:'Toque no botão para transformar todo o aplicativo.',dark:'🌙 Modo escuro',light:'☀️ Modo claro',language:'Idioma',languaged:'Espanhol Latinoamérica, English ou Português Brasil.',change:'🌐 Alterar',close:'Fechar',settings:'⚙️ Configurações',summary:'Aparência, idioma e experiência'}
  };
  const text=()=>L[(typeof s!=='undefined'&&L[s.locale])?s.locale:'es-US'];
  const theme=()=>typeof s!=='undefined'&&s.theme==='light'?'light':'dark';
  function applyMode(){document.body.classList.toggle('ary-lite',getMode()==='lite')}
  function applyTheme(){const light=theme()==='light';document.body.classList.toggle('ary-light',light);document.documentElement.style.background=light?'#f5f7fb':'#020713';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=light?'#f5f7fb':'#020713'}
  window.arySetExperience=(m)=>{localStorage.setItem(EXP,m);if(typeof s!=='undefined'){s.mode=m;try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}applyMode();enhance()};
  window.aryToggleTheme40=()=>{if(typeof s==='undefined')return;s.theme=theme()==='light'?'dark':'light';try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}applyTheme();if(typeof render==='function')render();setTimeout(()=>{if(document.querySelector('.sheet'))aryV18Settings()},0)};
  window.aryV18Settings=()=>{
    const mode=getMode(),th=theme(),t=text();
    if(typeof modal!=='function')return;
    modal(`<h2>⚙️ ${t.title}</h2><p class="muted">${t.desc}</p><div class="v18-settings"><div class="v18-settingRow"><div><b>${t.exp}</b><span class="muted">${t.expd}</span></div><div class="v18-seg"><button class="btn ${mode==='immersive'?'on':''}" onclick="arySetExperience('immersive');setTimeout(aryV18Settings,0)">${t.immersive}</button><button class="btn ${mode==='lite'?'on':''}" onclick="arySetExperience('lite');setTimeout(aryV18Settings,0)">${t.lite}</button></div></div><div class="v18-settingRow"><div class="aryThemeSwitch40"><div><b>${th==='light'?t.light:t.dark}</b><span class="muted">${t.appearanced}</span></div><button class="${th}" onclick="aryToggleTheme40()" aria-label="${th==='light'?t.light:t.dark}"><i></i></button></div></div><div class="v18-settingRow"><div><b>${t.language}</b><span class="muted">${t.languaged}</span></div><button class="btn" onclick="closeM();languageMenu()">${t.change}</button></div></div><button class="btn widebtn" onclick="closeM()">${t.close}</button>`);
  };
  function enhance(){applyMode();applyTheme();const app=document.getElementById('app');if(!app)return;if(typeof screen!=='undefined'&&screen==='more'&&!app.querySelector('[data-v18-settings]')){const t=text(),cards=[...app.querySelectorAll('.card')],host=cards[cards.length-1]||app,b=document.createElement('button');b.className='btn widebtn';b.dataset.v18Settings='1';b.innerHTML=`${t.settings} <span class="muted">${t.summary}</span>`;b.onclick=window.aryV18Settings;host.appendChild(b)}}
  const obs=new MutationObserver(()=>requestAnimationFrame(enhance));
  window.addEventListener('DOMContentLoaded',()=>{applyMode();applyTheme();enhance();const app=document.getElementById('app');if(app)obs.observe(app,{childList:true,subtree:true})});
  applyMode();setTimeout(()=>{applyTheme();enhance()},0);
})();
