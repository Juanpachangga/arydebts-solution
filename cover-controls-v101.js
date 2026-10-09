(()=>{
const before=window.render;
function paint(){
 const brand=document.querySelector('.authBrand99');if(brand&&!brand.querySelector('.aryLogo101')){const logo=document.createElement('img');logo.className='aryLogo101';logo.src='assets/arydebts-logo.svg';logo.alt='';logo.width=30;logo.height=30;brand.prepend(logo);}
 const host=document.querySelector('.mobileWelcome97');if(!host)return;
 const dark=document.documentElement.dataset.aryTheme==='dark';
 const lang=s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
 const words={es:['Oscuro','Claro','Inmersiva','Lite'],en:['Dark','Light','Immersive','Lite'],pt:['Escuro','Claro','Imersiva','Lite']}[lang];
 const theme=host.querySelector('.darkControl9'),motion=host.querySelector('.coverMotion80');
 if(theme){theme.setAttribute('role','switch');theme.setAttribute('aria-checked',String(dark));theme.setAttribute('aria-label',words[0]+' / '+words[1]);theme.innerHTML='<span class="darkLabel9">'+words[dark?0:1]+'</span><i aria-hidden="true"></i>';}
 if(motion){motion.querySelector('span').textContent=words[motion.getAttribute('aria-checked')==='true'?2:3];}
 const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#17152b':'#fcfcff';
}
window.render=()=>{const result=before();paint();return result;};
render();
})();
