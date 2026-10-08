(()=>{
const COPY={
  es:{soon:p=>`${p}: inicio de sesión seguro próximamente.`,note:'La conexión con cuentas externas todavía no está habilitada.'},
  en:{soon:p=>`${p}: secure sign-in is coming soon.`,note:'External account sign-in is not enabled yet.'},
  pt:{soon:p=>`${p}: login seguro em breve.`,note:'O login com contas externas ainda não está habilitado.'}
};
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
window.arySocial=provider=>{
  const x=COPY[lang()];
  if(typeof toast==='function')toast(x.soon(provider));
};
const enhance=()=>{
  if(screen!=='welcome')return;
  const social=document.querySelector('.social21');
  if(!social||social.dataset.truth54)return;
  social.dataset.truth54='1';
  social.setAttribute('aria-label',COPY[lang()].note);
  social.title=COPY[lang()].note;
};
const observer=new MutationObserver(()=>requestAnimationFrame(enhance));
addEventListener('DOMContentLoaded',()=>{
  enhance();
  const app=document.getElementById('app');
  if(app)observer.observe(app,{childList:true,subtree:true});
});
setTimeout(enhance,0);
})();