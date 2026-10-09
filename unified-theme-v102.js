(()=>{
const before=window.render;
window.render=()=>{const result=before();aryApplyTheme46();const dark=document.documentElement.dataset.aryTheme==='dark';document.documentElement.style.colorScheme=dark?'dark':'light';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#17152b':'#fcfcff';return result;};
render();
})();
