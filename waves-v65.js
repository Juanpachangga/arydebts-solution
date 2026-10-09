(()=>{
const before=window.aryV18Settings;
window.aryV18Settings=()=>{before();const sheet=document.querySelector('#modal .sheet');if(!sheet||!profile)return;const button=document.createElement('button');button.type='button';button.className='btn widebtn signoutWave65';button.setAttribute('onclick','logout()');button.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4H4v16h6M13 8l4 4-4 4m-5-4h13"/></svg><span>${s.locale==='en-US'?'Sign out':s.locale==='pt-BR'?'Sair':'Cerrar sesión'}</span>`;sheet.insertBefore(button,sheet.querySelector(':scope>button:last-child'))};
const waves=document.createElement('div');waves.className='waves65';waves.setAttribute('aria-hidden','true');document.body.appendChild(waves);
})();
