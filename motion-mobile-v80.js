(()=>{
const PUBLIC='ary-cover-motion-v80',ACCOUNTS='ary-profile-motion-v80',valid=m=>m==='lite'||m==='immersive';
let cover=safeGet(PUBLIC);if(!valid(cover))cover='immersive';
let accounts;try{accounts=JSON.parse(safeGet(ACCOUNTS))}catch(e){}if(!accounts||typeof accounts!=='object'||Array.isArray(accounts))accounts={};
const identity=()=>profile?encodeURIComponent(String(profile.email||profile.name||'local').trim().toLowerCase()):'';
let active=identity();
const stored=id=>Object.prototype.hasOwnProperty.call(accounts,id)&&valid(accounts[id])?accounts[id]:null;
const remember=()=>{const id=identity();if(!id)return;accounts[id]=valid(s.mode)?s.mode:'immersive';safeSet(ACCOUNTS,JSON.stringify(accounts))};
if(active){const saved=stored(active);if(saved)s.mode=saved;else remember()}
function sync(){const id=identity();if(id!==active){active=id;if(id){s.mode=stored(id)||'immersive';remember();safeSet(KEY,JSON.stringify(s))}}}
window.aryEffectiveMotion80=()=>screen==='welcome'||!profile?cover:(valid(s.mode)?s.mode:'immersive');
const words=()=>s.locale==='en-US'?['Immersive','Lite','Motion on the cover']:s.locale==='pt-BR'?['Imersiva','Lite','Movimento na capa']:['Inmersiva','Lite','Movimiento de la portada'];
window.aryToggleCoverMotion80=()=>{const next=cover==='immersive'?'lite':'immersive';try{localStorage.setItem(PUBLIC,next)}catch(e){return toast(s.locale==='en-US'?'Could not save this preference.':s.locale==='pt-BR'?'Não foi possível salvar a preferência.':'No se pudo guardar esta preferencia.')}cover=next;render()};
function paint(){if(screen!=='welcome')return;const toolbar=document.querySelector('.landingToolbar55'),theme=toolbar?.querySelector('.darkControl9');if(!theme)return;const stack=document.createElement('div');stack.className='landingSwitches80';theme.after(stack);stack.appendChild(theme);const x=words(),button=document.createElement('button');button.type='button';button.className='control9 coverMotion80';button.setAttribute('role','switch');button.setAttribute('aria-checked',String(cover==='immersive'));button.setAttribute('aria-label',x[2]);button.setAttribute('title',x[2]);button.setAttribute('onclick','aryToggleCoverMotion80()');button.innerHTML=`<span>${cover==='immersive'?'✨ '+x[0]:'⚡ '+x[1]}</span><i aria-hidden="true"></i>`;stack.appendChild(button)}
const saveBefore=window.save;window.save=()=>{if(identity()===active)remember();return saveBefore()};
const before=window.render;window.render=()=>{sync();const result=before();paint();return result};
const modeBefore=window.arySetMode58;window.arySetMode58=mode=>{if(!valid(mode))return;const id=identity();if(id){accounts[id]=mode;safeSet(ACCOUNTS,JSON.stringify(accounts))}return modeBefore(mode)};
const toggleBefore=window.toggleMode;window.toggleMode=()=>{const result=toggleBefore();remember();return result};
const logoutBefore=window.logout;window.logout=()=>{remember();return logoutBefore()};
render();
})();
