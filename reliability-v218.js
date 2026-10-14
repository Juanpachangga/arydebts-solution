// Shared guards for delayed actions and transparent scenario validation.
(()=>{
'use strict';
const owner=()=>window.aryGuideLifecycle128?.currentUser?.()||'',modal=document.getElementById('modal');
let navigation=0,modalVersion=0,lastRoute=screen,lastOwner=owner();
const modalObserver=new MutationObserver(records=>{modalVersion+=records.length});
if(modal)modalObserver.observe(modal,{childList:true,attributes:true,attributeFilter:['class']});
function sync(){modalVersion+=modalObserver.takeRecords?.().length||0;if(screen!==lastRoute||owner()!==lastOwner){navigation++;lastRoute=screen;lastOwner=owner()}}
window.aryAsyncScope218={capture(){sync();return{navigation,modalVersion,owner:owner(),route:screen,sheet:document.querySelector('#modal:not(.hidden) .sheet')}},current(value){sync();return !!value&&value.navigation===navigation&&value.modalVersion===modalVersion&&value.owner===owner()&&value.route===screen&&value.sheet===document.querySelector('#modal:not(.hidden) .sheet')}};
const before=window.render;window.render=function(){sync();const out=before.apply(this,arguments);sync();return out};
const errorText=()=>s.locale==='en-US'?'Check this value and its allowed range.':s.locale==='pt-BR'?'Revise este valor e o intervalo permitido.':'Revisa este valor y el rango permitido.';
function clear(input){if(!input)return;input.removeAttribute('aria-invalid');const id='error218-'+input.id;document.getElementById(id)?.remove();const other=(input.getAttribute('aria-describedby')||'').split(/\s+/).filter(value=>value&&value!==id);other.length?input.setAttribute('aria-describedby',other.join(' ')):input.removeAttribute('aria-describedby')}
function mark(input){if(!input)return;clear(input);input.setAttribute('aria-invalid','true');const message=document.createElement('small');message.id='error218-'+input.id;message.className='fieldError218';message.setAttribute('role','alert');message.textContent=errorText();input.after(message);input.setAttribute('aria-describedby',[input.getAttribute('aria-describedby'),message.id].filter(Boolean).join(' '))}
window.aryScenarioNumber218=raw=>{let text=String(raw??'').trim();if(text.startsWith('+'))text=text.slice(1);if(/^-?[.,]\d+$/.test(text))text=text.replace(/^(-?)/,(_,sign)=>sign+'0');if(/^-?\d+(?:[.,]\d+)?e[+-]?\d+$/i.test(text))return Number(text.replace(',','.'));const locale=['es-CO','es-ES','pt-BR'].includes(s.locale)?'es-CO':'en-US';return window.aryInstant197?.number(text,locale,true)?.value??NaN};
window.aryValidateScenario218=specs=>{let first=null,failed=false;const values={};for(const spec of specs){const input=document.getElementById(spec.id),value=aryScenarioNumber218(input?.value);if(!input||!Number.isFinite(value)||value<spec.min||value>spec.max||spec.valid&&!spec.valid(value)){mark(input);failed=true;first ||= input;values[spec.id]=NaN}else{clear(input);values[spec.id]=value}}if(failed){first?.focus({preventScroll:false});return null}return values};
document.addEventListener('input',event=>{if(event.target.matches?.('[data-number-kind="scenario"]'))clear(event.target)});
window.aryReliability218=true;render();
})();
