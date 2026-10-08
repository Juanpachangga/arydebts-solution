(()=>{
const positions=[];
const top=()=>Number(window.scrollY)||0;
const scroll=y=>{if(typeof window.scrollTo==='function')window.scrollTo(0,y)};
const goBefore=window.go;
window.go=route=>{const previous=screen;if(route!==previous)positions.push({route:previous,y:top()});const result=goBefore(route);if(screen!==previous)scroll(0);return result};
const backBefore=window.back;
window.back=()=>{const modal=document.getElementById('modal'),wasModal=modal&&!modal.classList.contains('hidden'),previous=screen,result=backBefore();if(!wasModal&&screen!==previous){let entry;do{entry=positions.pop()}while(entry&&entry.route!==screen);scroll(entry?.y||0)}return result};
const logoutBefore=window.logout;window.logout=()=>{positions.length=0;const result=logoutBefore();scroll(0);return result};
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const modal=document.getElementById('modal');if(modal&&!modal.classList.contains('hidden')){event.preventDefault();closeM()}});
})();
