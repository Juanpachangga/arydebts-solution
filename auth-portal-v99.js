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
  }
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#fcfcff';
 }
 return result;
};
render();
})();
