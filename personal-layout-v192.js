(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const words={es:['Ordenar tu página','Mantén pulsado y arrastra.','Listo','Restablecer','No se pudo guardar el orden.','Gasto rápido','Nombre','Monto','Categoría','Guardar gasto','Cancelar','Escribe un nombre y un monto mayor que cero.'],en:['Arrange your page','Press and hold, then drag.','Done','Reset','Could not save the order.','Quick expense','Name','Amount','Category','Save expense','Cancel','Enter a name and an amount greater than zero.'],pt:['Organizar sua página','Mantenha pressionado e arraste.','Pronto','Restaurar','Não foi possível salvar a ordem.','Gasto rápido','Nome','Valor','Categoria','Salvar gasto','Cancelar','Informe um nome e um valor maior que zero.']};
const t=()=>words[lang()];

// Arrangement controls retired; keep previously saved layouts readable.
const key=()=>{const user=window.aryGuideLifecycle128?.currentUser?.();return user?'ary-layout-v192:'+user:null};
const read=()=>{try{const value=JSON.parse(localStorage.getItem(key())||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}};
const blockSelector='.card,.searchLaunch72';
const groups=()=>{const list=[document.querySelector('#nav'),...document.querySelectorAll('#app .menuGrid,#app .moreGrid94,#app .communityGrid72,#app .homeActions81')].filter(Boolean);for(const node of document.querySelectorAll('#app '+blockSelector.split(',').join(',#app '))){if(node.parentElement&&!node.parentElement.closest('.aryGuide94,form,.sheet')&&!list.includes(node.parentElement))list.push(node.parentElement)}return list};
const calculatedGroupKey=g=>g.id==='nav'?'navigation':g.id==='app'?String(screen)+':blocks':g.matches?.('.menuGrid,.moreGrid94,.communityGrid72,.homeActions81')?String(screen)+':'+[...document.querySelectorAll('#app .menuGrid,#app .moreGrid94,#app .communityGrid72,#app .homeActions81')].indexOf(g):String(screen)+':blocks:'+String(g.className||'group')+':'+groups().indexOf(g);
const groupKey=g=>g.dataset.group197||(g.dataset.group197=calculatedGroupKey(g));
const placementsKey=()=>String(screen)+':placements197';
const id=n=>n.dataset.layout197||n.getAttribute('onclick')||'';
const items=g=>[...g.children].filter(n=>n.tagName==='BUTTON'&&n.getAttribute('onclick')||n.matches?.(blockSelector)&&!n.matches('.aryGuide94,.hello'));
function identify(g){items(g).forEach((n,index)=>{if(n.tagName!=='BUTTON'&&!n.dataset.layout197){const specific=String(n.className||'').split(/\s+/).filter(c=>!['card','full','btn','tap45','moving192','layoutRoot197'].includes(c)).join('.');n.dataset.layout197=n.id?'block:'+n.id:'block:'+(specific||String(index));if(!n.hasAttribute('tabindex'))n.tabIndex=0}})}
function reorder(g,list){if(items(g).every((n,i)=>n===list[i]))return;const slots=items(g).map(n=>{const slot=document.createComment('layout');g.replaceChild(slot,n);return slot});slots.forEach((slot,i)=>g.replaceChild(list[i],slot))}
const tourOrder204=['home','expenses','plan','debts','investments','more'].map(route=>"go('"+route+"')");
const legacyOrder204=["go('home')","go('debts')","go('expenses')","go('plan')","go('investments')","go('more')"];
// Preserve layouts saved before arrangement controls were retired.
const pinMore201=()=>{};
function apply(){if(!profile||!s?.onboarded)return;const data=read();let current=groups();for(const g of current){groupKey(g);identify(g);items(g).forEach(n=>{n.dataset.move192='1';n.removeAttribute('title')})}
 const placements=Array.isArray(data[placementsKey()])?data[placementsKey()].filter(p=>p&&typeof p==='object'&&typeof p.id==='string'):[];
 for(const place of placements){const node=[...document.querySelectorAll('#app [data-move192]')].find(n=>id(n)===place.id),parent=current.find(g=>place.parentId?g.id===place.parentId:String(g.className||'').replace(/\blayoutRoot197\b/g,'').trim()===place.parentClass);if(node&&parent&&node.parentElement!==parent&&!node.contains(parent)&&!parent.closest('button,a,form,.sheet')){parent.appendChild(node);node.classList.toggle('layoutRoot197',parent.id==='app')}}
 current=groups();for(const g of current){groupKey(g);identify(g);let order=Array.isArray(data[groupKey(g)])?data[groupKey(g)]:[];if(g.id==='nav'&&(!data.navigation227)&&(window.aryExperience94?.migrateGuide(s.guide94)?.active||JSON.stringify(order)===JSON.stringify(legacyOrder204)||JSON.stringify(order)===JSON.stringify(legacyOrder204.filter(x=>x!=="go('investments')"))))order=tourOrder204;const list=items(g),rank=n=>{const i=order.indexOf(id(n));return i<0?order.length+list.indexOf(n):i};if(order.length)reorder(g,[...list].sort((a,b)=>rank(a)-rank(b)));list.forEach(n=>{n.dataset.move192='1';n.removeAttribute('title')});pinMore201(g)}}
const baseRender=window.render;window.render=function(){const out=baseRender.apply(this,arguments);homeQuick();apply();return out};
const go=window.go;window.go=function(){return go.apply(this,arguments)};
window.aryArrange192=()=>false;window.aryLayoutApply197=apply;window.aryLayoutPageCustom226=()=>Object.entries(read()).some(([name,order])=>name.startsWith(String(screen)+':')&&Array.isArray(order)&&order.length>0);window.aryLayoutCustom197=()=>Array.isArray(read()[String(screen)+':blocks']);window.aryLayoutPlacement197=node=>{const places=read()[placementsKey()];return Array.isArray(places)&&places.some(x=>x&&typeof x==='object'&&x.id===id(node))};

window.aryQuickExpense192=()=>{window._expenseSource63=null;const w=t();modal(`<section id="quickExpense192" data-ary-copy><h2>${w[5]}</h2><label for="n">${w[6]}</label><input id="n" maxlength="120" autocomplete="off" placeholder="${lang()==='es'?'Gasolina':lang()==='pt'?'Gasolina':'Gas'}"><label for="b">${w[7]} (${esc(s.currency||'USD')})</label><input id="b" type="text" inputmode="decimal" placeholder="50"><label for="c">${w[8]}</label><select id="c"><option value="Variable">${lang()==='en'?'Variable': 'Variable'}</option><option value="Esencial">${lang()==='en'?'Essential':lang()==='pt'?'Essencial':'Esencial'}</option><option value="Hormiga">${lang()==='en'?'Small expense':lang()==='pt'?'Pequeno gasto':'Hormiga'}</option></select><button class="btn primary widebtn" onclick="arySaveQuickExpense192()">${w[9]}</button><button class="btn widebtn" onclick="closeM()">${w[10]}</button></section>`);document.querySelector('#modal .sheet').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.target.tagName==='INPUT'&&['n','b'].includes(e.target.id)){e.preventDefault();if(e.target.id==='n')document.getElementById('b').focus();else arySaveQuickExpense192()}});document.getElementById('n')?.focus()};
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
 const anchor=document.querySelector('#app .searchLaunch72,#app .homeDaily81,#app .homeTruth29,#app .simpleShell215');
 if(!anchor)return;
 const examples=window.aryExpenseExamples196(),x=quickWords[lang()],card=document.createElement('section');card.className='card full';card.id='homeQuickExpense193';card.setAttribute('data-ary-copy','');
 card.innerHTML=`<label for="homeExpense193">⚡ ${x[0]} (${esc(s.currency||'USD')})</label><form><input id="homeExpense193" maxlength="150" autocomplete="off" placeholder="${examples[0]}" aria-describedby="homeExpenseHelp193"><button type="submit" class="btn primary">${x[2]} →</button></form><div class="quickExamples196">${examples.map(example=>`<button type="button" class="btn quickExample196">${esc(example)}</button>`).join('')}</div><small id="homeExpenseHelp193">${x[3]}</small>`;
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
apply();
})();

