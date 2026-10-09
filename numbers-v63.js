(()=>{
const locale=()=>s.locale||'es-US';
const opts=()=>({style:'currency',currency:s.currency||'USD',useGrouping:true,...(s.currency==='COP'?{minimumFractionDigits:0,maximumFractionDigits:0}:{})});
window.aryMoney63=n=>{const value=typeof n==='bigint'?n:typeof n==='string'&&/^-?\d{16,}$/.test(n)?BigInt(n):Number(n)||0;return (typeof value==='number'&&Math.abs(value)>Number.MAX_SAFE_INTEGER?'≈ ':'')+new Intl.NumberFormat(locale(),opts()).format(value)};
window.aryInputNumber63=n=>new Intl.NumberFormat(locale(),{useGrouping:true,maximumFractionDigits:20}).format(Number(n)||0);
window.aryNumberHint63=()=>({es:'Los separadores siguen tu idioma. Los valores fuera de la precisión numérica se muestran con ≈ (aproximados).',en:'Separators follow your language. Values beyond numeric precision are shown with ≈ (approximate).',pt:'Os separadores seguem seu idioma. Valores além da precisão numérica são exibidos com ≈ (aproximados).'}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
const monetaryIds=new Set(['oi','inc','inc45','b','m','payAmount54','editPayAmount54','cevAmount36','aryAntCustom','goalAmount54','buyPrice45']);
const isAmount=el=>el&&el.tagName==='INPUT'&&el.type==='text'&&(el.inputMode==='decimal'||monetaryIds.has(el.id));
const format=el=>{if(!isAmount(el)||document.activeElement===el||!el.value.trim())return;const value=parseNum(el.value);if(!Number.isFinite(value))return;el.value=aryInputNumber63(value);if(Math.abs(value)>Number.MAX_SAFE_INTEGER)el.setAttribute('aria-description',aryNumberHint63())};
document.addEventListener('focusout',event=>{const el=event.target;if(isAmount(el)&&el.value.trim()){const value=parseNum(el.value);if(Number.isFinite(value))el.value=aryInputNumber63(value)}});
const scan=()=>{document.querySelectorAll('input[type="text"][inputmode="decimal"]').forEach(format);const m=document.getElementById('modal');if(m&&!m.classList.contains('hidden')&&m.querySelector('input[inputmode="decimal"]')&&!document.getElementById('numberHint63')){const p=document.createElement('small');p.id='numberHint63';p.className='muted numberHint63';p.textContent=aryNumberHint63();m.querySelector('input[inputmode="decimal"]').insertAdjacentElement('afterend',p)}};
new MutationObserver(scan).observe(document.getElementById('app'),{childList:true,subtree:true});new MutationObserver(scan).observe(document.getElementById('modal'),{childList:true,subtree:true});scan();
})();
