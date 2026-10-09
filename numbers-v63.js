(()=>{
const locale=()=>s.locale||'es-US';
const opts=()=>({style:'currency',currency:s.currency||'USD',useGrouping:true,...(s.currency==='COP'?{minimumFractionDigits:0,maximumFractionDigits:0}:{})});
window.aryMoney63=n=>{const value=typeof n==='bigint'?n:typeof n==='string'&&/^-?\d{16,}$/.test(n)?BigInt(n):Number(n)||0;return (typeof value==='number'&&Math.abs(value)>Number.MAX_SAFE_INTEGER?'≈ ':'')+new Intl.NumberFormat(locale(),opts()).format(value)};
window.aryInputNumber63=n=>new Intl.NumberFormat(locale(),{useGrouping:true,maximumFractionDigits:20}).format(Number(n)||0);
window.aryNumberHint63=()=>({es:'Los separadores siguen tu idioma. Los valores fuera de la precisión numérica se muestran con ≈ (aproximados).',en:'Separators follow your language. Values beyond numeric precision are shown with ≈ (approximate).',pt:'Os separadores seguem seu idioma. Valores além da precisão numérica são exibidos com ≈ (aproximados).'}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
const monetaryIds=new Set(['oi','inc','inc45','b','m','payAmount54','editPayAmount54','cevAmount36','aryAntCustom','goalAmount54','buyPrice45']);
const isAmount=el=>el&&el.tagName==='INPUT'&&el.type==='text'&&(el.inputMode==='decimal'||monetaryIds.has(el.id));
const separators=loc=>{const p=new Intl.NumberFormat(loc).formatToParts(1000.1);return{decimal:p.find(p=>p.type==='decimal')?.value||'.',group:p.find(p=>p.type==='group')?.value||','}};
// Keep fractional digits and a trailing decimal while editing; regroup integers without rounding them.
window.aryLiveNumber67=(raw,loc=locale(),pasted=false)=>{
 const text=String(raw??'').trim(),{decimal}=separators(loc);
 if(!text)return '';if(/^[-]?\d+(?:[.,]\d+)?e[+-]?\d+$/i.test(text)){const n=parseNum(text);return Number.isFinite(n)?new Intl.NumberFormat(loc,{maximumFractionDigits:20}).format(n):text}
 let z=text.replace(/[^\d.,'’\-]/g,''),negative=z.startsWith('-');z=z.replace(/-/g,'');if(!z)return negative?'-':'';
 const grouped=/^\d{1,3}(?:[.,'’]\d{3})+$/.test(z),apostrophe=/['’]/.test(z),dots=(z.match(/\./g)||[]).length,commas=(z.match(/,/g)||[]).length;
 let chosen=decimal;
 if(grouped&&(apostrophe||(decimal==='.'?dots>1:commas>1)))chosen='';
 else if(pasted&&dots&&commas)chosen=z.lastIndexOf('.')>z.lastIndexOf(',')?'.':',';
 else if(pasted&&!z.includes(decimal)&&!grouped){const other=decimal==='.'?',':'.';if(z.includes(other))chosen=other}
 const index=chosen?z.indexOf(chosen):-1,integer=(index<0?z:z.slice(0,index)).replace(/\D/g,'')||'0',fraction=index<0?'':z.slice(index+1).replace(/\D/g,'');
 const groupedInt=new Intl.NumberFormat(loc,{maximumFractionDigits:0,useGrouping:true}).format(BigInt(integer));
 return (negative?'-':'')+groupedInt+(index<0?'':decimal+fraction);
};
const live=(el,pasted=false)=>{if(!isAmount(el))return;const raw=el.value,start=el.selectionStart??raw.length,end=el.selectionEnd??start,next=aryLiveNumber67(raw,locale(),pasted);if(next===raw)return;const decimal=separators(locale()).decimal;
 const position=offset=>{if(offset===raw.length)return next.length;const prefix=raw.slice(0,offset),digits=(prefix.match(/\d/g)||[]).length;if(!digits)return raw.startsWith('-')&&offset>0?1:0;let count=0;for(let i=0;i<next.length;i++)if(/\d/.test(next[i])&&++count===digits)return i+1+(prefix.endsWith(decimal)&&next[i+1]===decimal?1:0);return next.length};
 const a=position(start),b=position(end);el.value=next;el.setSelectionRange(a,b);
};
document.addEventListener('beforeinput',event=>{const el=event.target;if(!isAmount(el)||event.isComposing||el.selectionStart!==el.selectionEnd)return;const pos=el.selectionStart,{group}=separators(locale());if(event.inputType==='deleteContentBackward'&&pos>0&&el.value[pos-1]===group){let i=pos-2;while(i>=0&&!/\d/.test(el.value[i]))i--;if(i>=0)el.setSelectionRange(i,pos)}else if(event.inputType==='deleteContentForward'&&el.value[pos]===group){let i=pos+1;while(i<el.value.length&&!/\d/.test(el.value[i]))i++;if(i<el.value.length)el.setSelectionRange(pos,i+1)}});
document.addEventListener('input',event=>{if(!event.isComposing)live(event.target,event.inputType==='insertFromPaste')});
document.addEventListener('compositionend',event=>live(event.target));
const format=el=>{if(!isAmount(el)||document.activeElement===el||!el.value.trim())return;const value=parseNum(el.value);if(!Number.isFinite(value))return;el.value=aryInputNumber63(value);if(Math.abs(value)>Number.MAX_SAFE_INTEGER)el.setAttribute('aria-description',aryNumberHint63())};
document.addEventListener('focusout',event=>{const el=event.target;if(isAmount(el)&&el.value.trim()){const value=parseNum(el.value);if(Number.isFinite(value))el.value=aryInputNumber63(value)}});
const scan=()=>{document.querySelectorAll('input[type="text"][inputmode="decimal"]').forEach(format);const m=document.getElementById('modal');if(m&&!m.classList.contains('hidden')&&m.querySelector('input[inputmode="decimal"]')&&!document.getElementById('numberHint63')){const p=document.createElement('small');p.id='numberHint63';p.className='muted numberHint63';p.textContent=aryNumberHint63();m.querySelector('input[inputmode="decimal"]').insertAdjacentElement('afterend',p)}};
new MutationObserver(scan).observe(document.getElementById('app'),{childList:true,subtree:true});new MutationObserver(scan).observe(document.getElementById('modal'),{childList:true,subtree:true});scan();if(typeof render==='function')render();
})();
