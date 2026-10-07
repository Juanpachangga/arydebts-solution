(()=>{
  const EXP='ary-experience-v18';
  const getMode=()=>localStorage.getItem(EXP)||((typeof s!=='undefined'&&s.mode)||'immersive');
  function applyMode(){document.body.classList.toggle('ary-lite',getMode()==='lite')}
  window.arySetExperience=(m)=>{localStorage.setItem(EXP,m);if(typeof s!=='undefined'){s.mode=m;try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}applyMode();enhance()};
  window.aryV18Settings=()=>{
    const mode=getMode(), theme=(typeof s!=='undefined'&&s.theme)||'dark';
    if(typeof modal!=='function')return;
    modal(`<h2>⚙️ Configuración</h2><p class="muted">Ajusta cómo se siente Arydebts sin cambiar tus datos ni tu plan.</p><div class="v18-settings"><div class="v18-settingRow"><div><b>Experiencia</b><span class="muted">Inmersiva usa movimiento y brillo. Lite reduce efectos.</span></div><div class="v18-seg"><button class="btn ${mode==='immersive'?'on':''}" onclick="arySetExperience('immersive')">✨ Inmersiva</button><button class="btn ${mode==='lite'?'on':''}" onclick="arySetExperience('lite')">⚡ Lite</button></div></div><div class="v18-settingRow"><div><b>Apariencia</b><span class="muted">Cambia entre oscuro y claro.</span></div><div class="v18-seg"><button class="btn ${theme==='dark'?'on':''}" onclick="toggleTheme();setTimeout(aryV18Settings,0)">🌙 Oscuro</button><button class="btn ${theme==='light'?'on':''}" onclick="toggleTheme();setTimeout(aryV18Settings,0)">☀️ Claro</button></div></div><div class="v18-settingRow"><div><b>Idioma</b><span class="muted">Español Latinoamérica, English o Português Brasil.</span></div><button class="btn" onclick="closeM();languageMenu()">🌐 Cambiar</button></div></div><button class="btn widebtn" onclick="closeM()">Cerrar</button>`);
  };
  function enhance(){
    applyMode();
    const app=document.getElementById('app');if(!app)return;
    if(typeof screen!=='undefined'&&screen==='more'&&!app.querySelector('[data-v18-settings]')){
      const cards=[...app.querySelectorAll('.card')];const host=cards[cards.length-1]||app;
      const b=document.createElement('button');b.className='btn widebtn';b.dataset.v18Settings='1';b.innerHTML='⚙️ Configuración <span class="muted">Apariencia, idioma y experiencia</span>';b.onclick=window.aryV18Settings;host.appendChild(b);
    }
  }
  const obs=new MutationObserver(()=>requestAnimationFrame(enhance));
  window.addEventListener('DOMContentLoaded',()=>{applyMode();enhance();const app=document.getElementById('app');if(app)obs.observe(app,{childList:true,subtree:true})});
  applyMode();setTimeout(enhance,0);
})();
