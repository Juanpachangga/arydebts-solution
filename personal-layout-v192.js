(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const words={es:['Ordenar pestañas','Mantén pulsado y arrastra.','Listo','Restablecer','No se pudo guardar el orden.','Gasto rápido','Nombre','Monto','Categoría','Guardar gasto','Cancelar','Escribe un nombre y un monto mayor que cero.'],en:['Arrange tabs','Press and hold, then drag.','Done','Reset','Could not save the order.','Quick expense','Name','Amount','Category','Save expense','Cancel','Enter a name and an amount greater than zero.'],pt:['Organizar abas','Mantenha pressionado e arraste.','Pronto','Restaurar','Não foi possível salvar a ordem.','Gasto rápido','Nome','Valor','Categoria','Salvar gasto','Cancelar','Informe um nome e um valor maior que zero.']};
const t=()=>words[lang()];
let editing=false,drag=null,hold=0,suppressUntil=0;
const key=()=>{const id=window.aryGuideLifecycle128?.currentUser?.();return id?'ary-layout-v192:'+id:null};
const read=()=>{try{const v=JSON.parse(localStorage.getItem(key())||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}};
const groups=()=>[document.querySelector('#nav'),...document.querySelectorAll('#app .menuGrid,#app .moreGrid94,#app .communityGrid72,#app .homeActions81')].filter(Boolean);
const groupKey=g=>g.id==='nav'?'navigation':String(screen)+':'+[...document.querySelectorAll('#app .menuGrid,#app .moreGrid94,#app .communityGrid72,#app .homeActions81')].indexOf(g);
const id=n=>n.getAttribute('onclick')||'';
const items=g=>[...g.children].filter(n=>n.tagName==='BUTTON'&&id(n));
function save(g){const k=key();if(!k)return false;try{const data=read();data[groupKey(g)]=items(g).map(id);localStorage.setItem(k,JSON.stringify(data));return true}catch{toast(t()[4]);return false}}
function apply(){if(!profile||!s?.onboarded)return;const data=read();for(const g of groups()){const order=Array.isArray(data[groupKey(g)])?data[groupKey(g)]:[];const list=items(g),rank=n=>{const i=order.indexOf(id(n));return i<0?order.length+list.indexOf(n):i};list.sort((a,b)=>rank(a)-rank(b)).forEach(n=>{g.appendChild(n);n.dataset.move192='1';n.title=t()[1]})}}
function end(){clearTimeout(hold);if(drag?.active){if(!save(drag.group)){for(const n of drag.original)drag.group.appendChild(n)}suppressUntil=Date.now()+450}drag?.node.classList.remove('moving192');drag=null}
function done(){end();editing=false;document.body.classList.remove('arranging192');document.getElementById('arrangeBar192')?.remove()}
function edit(){if(editing)return;editing=true;document.body.classList.add('arranging192');const b=document.createElement('div');b.id='arrangeBar192';b.innerHTML=`<b>${t()[0]}</b><button type="button">${t()[3]}</button><button type="button">${t()[2]}</button>`;b.children[1].onclick=()=>{try{localStorage.removeItem(key());done();render()}catch{toast(t()[4])}};b.children[2].onclick=done;document.body.appendChild(b)}
function start(node,x,y){if(!profile||window.aryFullGuideStatus125?.().active||document.querySelector('#modal:not(.hidden)'))return;const g=groups().find(g=>g===node?.parentElement);if(!g)return;clearTimeout(hold);drag={node,group:g,x,y,original:items(g),active:false};hold=setTimeout(()=>{if(!drag)return;edit();drag.active=true;node.classList.add('moving192');suppressUntil=Date.now()+1000},editing?0:550)}
function move(x,y,event){if(!drag)return;if(!drag.active){if(Math.hypot(x-drag.x,y-drag.y)>10){clearTimeout(hold);drag=null}return}if(event.cancelable)event.preventDefault();const over=document.elementFromPoint(x,y)?.closest('[data-move192]');if(over&&over!==drag.node&&over.parentElement===drag.group){const list=items(drag.group);drag.group.insertBefore(drag.node,list.indexOf(over)>list.indexOf(drag.node)?over.nextSibling:over)}}
document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'&&e.button===0)start(e.target.closest('[data-move192]'),e.clientX,e.clientY)});
document.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')move(e.clientX,e.clientY,e)});
document.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')end()});
document.addEventListener('touchstart',e=>{const node=e.target.closest('[data-move192]');if(!node)return;const touches=e.touches||e.changedTouches||[];if(touches.length!==1)return end();const p=touches[0];start(node,p.clientX,p.clientY)},{passive:true});
document.addEventListener('touchmove',e=>{const touches=e.touches||[];if(touches.length===1)move(touches[0].clientX,touches[0].clientY,e)},{passive:false});
document.addEventListener('touchend',end);document.addEventListener('touchcancel',end);window.addEventListener('blur',end);
document.addEventListener('contextmenu',e=>{if(e.target.closest('[data-move192]'))e.preventDefault()});
document.addEventListener('click',e=>{if((editing||Date.now()<suppressUntil)&&e.target.closest('[data-move192]')){e.preventDefault();e.stopImmediatePropagation()}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')return done();const n=e.target.closest('[data-move192]');if(!n||!e.altKey||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();edit();const g=n.parentElement,list=items(g),i=list.indexOf(n),delta=['ArrowLeft','ArrowUp'].includes(e.key)?-1:1,target=list[i+delta];if(target){g.insertBefore(n,delta<0?target:target.nextSibling);if(!save(g))list.forEach(n=>g.appendChild(n));n.focus()}});
const baseRender=window.render;window.render=function(){end();const out=baseRender.apply(this,arguments);apply();homeQuick();return out};
const go=window.go;window.go=function(){done();return go.apply(this,arguments)};
window.aryArrange192=()=>{apply();edit()};
window.aryQuickExpense192=()=>{window._expenseSource63=null;const w=t();modal(`<section id="quickExpense192" data-ary-copy><h2>${w[5]}</h2><label for="n">${w[6]}</label><input id="n" maxlength="120" autocomplete="off" placeholder="${lang()==='es'?'Gasolina':lang()==='pt'?'Gasolina':'Gas'}"><label for="b">${w[7]} (${esc(s.currency||'USD')})</label><input id="b" type="text" inputmode="decimal" placeholder="50"><label for="c">${w[8]}</label><select id="c"><option value="Variable">${lang()==='en'?'Variable': 'Variable'}</option><option value="Esencial">${lang()==='en'?'Essential':lang()==='pt'?'Essencial':'Esencial'}</option><option value="Hormiga">${lang()==='en'?'Small expense':lang()==='pt'?'Pequeno gasto':'Hormiga'}</option></select><button class="btn primary widebtn" onclick="arySaveQuickExpense192()">${w[9]}</button><button class="btn widebtn" onclick="closeM()">${w[10]}</button></section>`);document.querySelector('#modal .sheet').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.target.tagName==='INPUT'){e.preventDefault();if(e.target.id==='n')document.getElementById('b').focus();else arySaveQuickExpense192()}});document.getElementById('n')?.focus()};
window.arySaveQuickExpense192=()=>{const form=document.querySelector('#modal:not(.hidden) #quickExpense192');if(!form||form.dataset.saving==='1')return false;const name=document.getElementById('n')?.value.trim(),raw=document.getElementById('b')?.value,value=typeof parseNum==='function'?parseNum(raw):Number(raw);if(!name||!Number.isFinite(value)||value<=0){toast(t()[11]);return false}form.dataset.saving='1';try{return window.saveExpense()}finally{if(document.querySelector('#modal:not(.hidden) #quickExpense192')===form)delete form.dataset.saving}};
const quick=window.aryQuickAction133;window.aryQuickAction133=function(type){if(type==='expense')return aryQuickExpense192();return quick.apply(this,arguments)};
const quickWords={
 es:['Gasto al instante','Ej. 3.50 café','Agregar','Se guarda en Gastos con la fecha de hoy.','Escribe el monto y el nombre. Ej. 3.50 café o 24,90 mercado.','Gasto registrado','No se pudo guardar. Intenta otra vez.'],
 en:['Instant expense','e.g. 3.50 coffee','Add','Saved in Expenses with today’s date.','Enter an amount and name, e.g. 3.50 coffee or 24.90 groceries.','Expense recorded','Could not save. Try again.'],
 pt:['Gasto na hora','Ex. 3,50 café','Adicionar','Salvo em Gastos com a data de hoje.','Informe o valor e o nome. Ex. 3,50 café ou 24,90 mercado.','Gasto registrado','Não foi possível salvar. Tente novamente.']
};
window.aryParseQuickExpense193=value=>{
 const text=String(value||'').trim();
 // Exactly one amount at either end. Currency always comes from the profile.
 const prefix=text.match(/^(?:[$€£]|R\$)?\s*(\d+(?:[.,]\d+)*)\s+(.+)$/i);
 const suffix=prefix?null:text.match(/^(.+?)\s+(?:[$€£]|R\$)?\s*(\d+(?:[.,]\d+)*)$/i);
 if(!prefix&&!suffix)return null;
 const raw=prefix?prefix[1]:suffix[2],name=(prefix?prefix[2]:suffix[1]).trim();
 const valueNumber=typeof parseNum==='function'?parseNum(raw):Number(raw);
 if(!name||name.length>120||!Number.isFinite(valueNumber)||valueNumber<=0)return null;
 return {name,amount:valueNumber};
};
window.aryFormatHomeExpense196=()=>{
 const input=document.getElementById('homeExpense193'),item=window.aryParseQuickExpense193(input?.value);
 if(!item){toast(quickWords[lang()][4]);input?.focus();return false}
 input.value=new Intl.NumberFormat(s.locale||'es-US',{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:false}).format(item.amount)+' '+item.name;
 input.focus();input.setSelectionRange(input.value.length,input.value.length);return true;
};
function homeQuick(){
 if(!profile||!s?.onboarded||screen!=='home'||document.getElementById('homeQuickExpense193'))return;
 const anchor=document.querySelector('#app .searchLaunch72,#app .homeDaily81,#app .homeTruth29');
 if(!anchor)return;
 const examples=window.aryExpenseExamples196(),x=quickWords[lang()],card=document.createElement('section');card.className='card full';card.id='homeQuickExpense193';card.setAttribute('data-ary-copy','');
 card.innerHTML=`<label for="homeExpense193">⚡ ${x[0]} (${esc(s.currency||'USD')})</label><form><input id="homeExpense193" maxlength="150" autocomplete="off" placeholder="${examples[0]}" aria-describedby="homeExpenseHelp193"><button type="submit" class="btn primary">${x[2]} →</button></form><div class="quickOptions196"><button type="button" id="quickDecimal196" class="btn" aria-label="${lang()==='en'?'Format with two decimal places':lang()==='pt'?'Formatar com duas casas decimais':'Dar formato con dos decimales'}">${lang()==='en'?'Decimals':lang()==='pt'?'Decimais':'Decimales'}</button><span>${lang()==='en'?'Examples':lang()==='pt'?'Exemplos':'Ejemplos'}</span></div><div class="quickExamples196">${examples.map(example=>`<button type="button" class="btn quickExample196">${esc(example)}</button>`).join('')}</div><small id="homeExpenseHelp193">${x[3]}</small>`;
 card.querySelector('#quickDecimal196').onclick=()=>window.aryFormatHomeExpense196();
 card.querySelectorAll('.quickExample196').forEach((button,index)=>{button.onclick=()=>{const input=card.querySelector('#homeExpense193');input.value=examples[index];input.focus()}});
 card.querySelector('form').onsubmit=event=>{event.preventDefault();window.arySaveHomeExpense193()};
 anchor.before(card);
}
window.arySaveHomeExpense193=()=>{
 const form=document.querySelector('#homeQuickExpense193 form'),input=document.getElementById('homeExpense193');
 if(screen!=='home'||!profile||!s?.onboarded||!form||form.dataset.saving==='1'||window.aryFullGuideStatus125?.().active)return false;
 const item=window.aryParseQuickExpense193(input?.value),x=quickWords[lang()];
 if(!item){toast(x[4]);input?.focus();return false}
 form.dataset.saving='1';
 const saved=window.aryCommitFinancial109?.(next=>{
  next.expenses=Array.isArray(next.expenses)?next.expenses:[];
  next.expenses.push({...item,id:window.aryUniqueId120(next.expenses,next.debts,next.payments,next.calendarEvents),cat:'Variable',date:localDate(),frequency:'once',icon:iconFor(item.name,'Variable')});
 });
 if(!saved){delete form.dataset.saving;toast(x[6]);return false}
 input.value='';render();toast(x[5]);return true;
};
homeQuick();
const st=document.createElement('style');st.textContent=`[data-move192]{-webkit-touch-callout:none}.arranging192 [data-move192]{outline:2px dashed #258e99;outline-offset:-3px;user-select:none}.moving192{opacity:.65!important;outline:3px solid #258e99!important}#arrangeBar192{position:fixed;top:max(8px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:9999;display:flex;gap:8px;align-items:center;padding:10px;border-radius:16px;background:#172541;color:white;box-shadow:0 4px 20px #0005;width:max-content;max-width:calc(100vw - 16px);box-sizing:border-box}#arrangeBar192 button{min-height:44px;background:#087f86;color:white;border:0;border-radius:10px;padding:8px}#arrangeBar192 b{font-size:13px}`;document.head.appendChild(st);apply();
})();
