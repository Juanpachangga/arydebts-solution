/* Account screens share the welcome palette without changing saved theme or auth behavior. */
(()=>{
const before=window.render;
window.render=()=>{
 const result=before(),active=['signup','login'].includes(screen);
 document.body.classList.toggle('authPortal99',active);
 document.documentElement.classList.toggle('authRoot99',active);
 if(active){
  const host=document.querySelector('#app .auth');
  if(host){
   host.classList.add('authForm99');
   const halloween=typeof aryBackdropSeason71==='function'&&aryBackdropSeason71()==='halloween';
   const brand=document.createElement('div');brand.className='authBrand99';
   brand.innerHTML='<span>Arydebts</span><i aria-hidden="true">'+(halloween?'☾ 🎃':'✦')+'</i>';
   host.insertBefore(brand,host.querySelector('h1'));
   const social=host.querySelector('.socials');
   if(social){
    social.className='authSocial100';
    const lang=s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
    const labels={es:['También puedes elegir','Conexión de registro próximamente.'],en:['You can also choose','Social sign-in connection coming soon.'],pt:['Você também pode escolher','Conexão de cadastro em breve.']}[lang];
    social.setAttribute('role','group');social.setAttribute('aria-label',labels[0]);
    social.innerHTML='<p class="authSocialTitle100">'+labels[0]+'</p><div class="authSocialButtons100">'+['Apple','Google','Facebook','Instagram','Discord'].map(name=>'<button type="button" class="authSocialButton100" aria-label="'+name+'" onclick="arySocial(\''+name+'\')"><span class="socialIcon55 social'+name+'55">'+aryBrandIcon55(name)+'</span><small>'+name+'</small></button>').join('')+'</div>';
    const hint=social.nextElementSibling;
    if(hint?.tagName==='P'){hint.className='authSocialHint100';hint.textContent=labels[1];}
   }
  }
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#fcfcff';
 }
 return result;
};
render();
})();
