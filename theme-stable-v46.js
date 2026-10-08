(()=>{
const THEME='ary-theme-v46';
function current(){const stored=(()=>{try{return localStorage.getItem(THEME)}catch(e){return null}})();if(stored==='light'||stored==='dark')return stored;if(typeof s!=='undefined'&&(s.theme==='light'||s.theme==='dark'))return s.theme;return'dark'}
function apply(t){const light=t==='light',landing=!!document.querySelector('.landing9');document.body?.classList.toggle('landing-bright',light&&landing);document.documentElement.classList.toggle('landing-bright-root',light&&landing);document.documentElement.dataset.aryTheme=t;document.documentElement.style.colorScheme=t;document.documentElement.style.backgroundColor=light?'#f4f7fc':'#020713';document.body?.classList.toggle('ary-light',light);document.body?.classList.toggle('ary-dark',!light);if(document.body)document.body.style.backgroundColor=light?'#f4f7fc':'#020713';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=light?'#f4f7fc':'#020713'}
function persist(t){try{localStorage.setItem(THEME,t)}catch(e){}if(typeof s!=='undefined'){s.theme=t;try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}}
window.aryApplyTheme46=()=>apply(current());
window.arySetTheme46=t=>{if(t!=='light'&&t!=='dark')return;persist(t);apply(t);if(typeof render==='function')render();requestAnimationFrame(()=>{apply(t);})};
window.aryToggleTheme40=()=>window.arySetTheme46(current()==='light'?'dark':'light');window.toggleTheme=window.aryToggleTheme40;
addEventListener('DOMContentLoaded',()=>apply(current()));apply(current());
})();