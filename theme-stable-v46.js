(()=>{
const THEME='ary-theme-v46';
function current(){if(typeof s!=='undefined'&&(s.theme==='light'||s.theme==='dark'))return s.theme;try{const stored=localStorage.getItem(THEME);if(stored==='light'||stored==='dark')return stored}catch{}return'dark'}
function apply(t){const light=t==='light',landing=!!document.querySelector('.landing9');document.body?.classList.toggle('landing-bright',light&&landing);document.documentElement.classList.toggle('landing-bright-root',light&&landing);document.documentElement.dataset.aryTheme=t;document.documentElement.style.colorScheme=t;document.documentElement.style.backgroundColor=light?'#fcfcff':'#17152b';document.body?.classList.toggle('ary-light',light);document.body?.classList.toggle('ary-dark',!light);if(document.body)document.body.style.backgroundColor=light?'#fcfcff':'#17152b';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=light?'#fcfcff':'#17152b'}
function persist(t){
 if(typeof window.aryCommitFinancial109==='function'){
  if(!window.aryCommitFinancial109(next=>{next.theme=t})){window.toast?.(window.aryStorageError109?.()||'No se pudo guardar.');return false}
 }else if(typeof s!=='undefined'){
  try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify({...s,theme:t}));s.theme=t}catch{return false}
 }
 try{localStorage.setItem(THEME,t)}catch{}
 return true;
}
window.aryApplyTheme46=()=>apply(current());
window.arySetTheme46=t=>{if(t!=='light'&&t!=='dark')return;if(!persist(t))return false;apply(t);if(typeof render==='function')render();requestAnimationFrame(()=>{apply(current());})};
window.aryToggleTheme40=()=>window.arySetTheme46(current()==='light'?'dark':'light');window.toggleTheme=window.aryToggleTheme40;
addEventListener('DOMContentLoaded',()=>apply(current()));apply(current());
})();
