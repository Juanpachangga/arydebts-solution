(()=>{
'use strict';
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const words={es:['Ordenar tu página','Mantén pulsado y arrastra.','Listo','Restablecer','No se pudo guardar el orden.','Gasto rápido','Nombre','Monto','Categoría','Guardar gasto','Cancelar','Escribe un nombre y un monto mayor que cero.'],en:['Arrange your page','Press and hold, then drag.','Done','Reset','Could not save the order.','Quick expense','Name','Amount','Category','Save expense','Cancel','Enter a name and an amount greater than zero.'],pt:['Organizar sua página','Mantenha pressionado e arraste.','Pronto','Restaurar','Não foi possível salvar a ordem.','Gasto rápido','Nome','Valor','Categoria','Salvar gasto','Cancelar','Informe um nome e um valor maior que zero.']};
const t=()=>words[lang()];

let editing=false,drag=null,hold=0,suppressUntil=0;
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
const pinMore201=g=>{if(g?.id==='nav'){const more=g.querySelector('[onclick="go(\'more\')"]');if(more){g.appendChild(more);delete more.dataset.move192;more.removeAttribute('title')}}};
const movableTarget197=element=>{const node=element?.closest?.('[data-move192]'),control=element?.closest?.('input,select,textarea,a,button');return control&&control!==node?null:node};
function save(g){pinMore201(g);const k=key();if(!k)return false;try{const data=read();data[groupKey(g)]=items(g).map(id);localStorage.setItem(k,JSON.stringify(data));return true}catch{toast(t()[4]);return false}}
function apply(){if(!profile||!s?.onboarded)return;const data=read();let current=groups();for(const g of current){groupKey(g);identify(g);items(g).forEach(n=>{n.dataset.move192='1';n.title=t()[1]})}
 const placements=Array.isArray(data[placementsKey()])?data[placementsKey()].filter(p=>p&&typeof p==='object'&&typeof p.id==='string'):[];
 for(const place of placements){const node=[...document.querySelectorAll('#app [data-move192]')].find(n=>id(n)===place.id),parent=current.find(g=>place.parentId?g.id===place.parentId:String(g.className||'').replace(/\blayoutRoot197\b/g,'').trim()===place.parentClass);if(node&&parent&&node.parentElement!==parent&&!node.contains(parent)&&!parent.closest('button,a,form,.sheet')){parent.appendChild(node);node.classList.toggle('layoutRoot197',parent.id==='app')}}
 current=groups();for(const g of current){groupKey(g);identify(g);let order=Array.isArray(data[groupKey(g)])?data[groupKey(g)]:[];if(g.id==='nav'&&(window.aryExperience94?.migrateGuide(s.guide94)?.active||JSON.stringify(order)===JSON.stringify(legacyOrder204)||JSON.stringify(order)===JSON.stringify(legacyOrder204.filter(x=>x!=="go('investments')"))))order=tourOrder204;const list=items(g),rank=n=>{const i=order.indexOf(id(n));return i<0?order.length+list.indexOf(n):i};if(order.length)reorder(g,[...list].sort((a,b)=>rank(a)-rank(b)));list.forEach(n=>{n.dataset.move192='1';n.title=t()[1]});pinMore201(g)}}
function saveDrag(d){pinMore201(d.group);const k=key();if(!k)return false;try{const data=read();for(const g of new Set([d.firstGroup,d.group]))data[groupKey(g)]=items(g).map(id);if(d.firstGroup!==d.group){const list=Array.isArray(data[placementsKey()])?data[placementsKey()]:[];data[placementsKey()]=[...list.filter(x=>x?.id!==id(d.node)),{id:id(d.node),parentId:d.group.id||'',parentClass:String(d.group.className||'').replace(/\blayoutRoot197\b/g,'').trim()}]}localStorage.setItem(k,JSON.stringify(data));return true}catch{toast(t()[4]);return false}}
function restoreDrag(d){for(const [g,nodes] of d.originals)for(const n of nodes)g.appendChild(n);d.node.classList.toggle('layoutRoot197',d.originalRoot)}
function end(event){clearTimeout(hold);if(drag?.active){if(['touchcancel','pointercancel','blur','cancel'].includes(event?.type)||!saveDrag(drag))restoreDrag(drag);suppressUntil=Date.now()+450}drag?.node.classList.remove('moving192');drag=null}
function done(){end({type:'cancel'});editing=false;document.body.classList.remove('arranging192');document.getElementById('arrangeBar192')?.remove()}
function edit(){if(editing)return;editing=true;document.body.classList.add('arranging192');const bar=document.createElement('div');bar.id='arrangeBar192';bar.innerHTML=`<b>${t()[0]}</b><button type="button">${t()[3]}</button><button type="button">${t()[2]}</button>`;bar.children[1].onclick=()=>{try{const data=read();for(const name of Object.keys(data))if(name==='navigation'||name.startsWith(String(screen)+':'))delete data[name];localStorage.setItem(key(),JSON.stringify(data));done();render()}catch{toast(t()[4])}};bar.children[2].onclick=done;document.body.appendChild(bar)}
function start(node,x,y){if(node?.getAttribute('onclick')==="go('more')")return;if(node?.parentElement?.id==='nav'&&window.aryExperience94?.migrateGuide(s.guide94)?.active)return;if(!profile||window.aryFullGuideStatus125?.().active||document.querySelector('#modal:not(.hidden)'))return;const group=groups().find(g=>g===node?.parentElement);if(!group)return;clearTimeout(hold);drag={node,group,firstGroup:group,x,y,originalRoot:node.classList.contains('layoutRoot197'),originals:new Map(groups().map(parent=>[parent,[...parent.children]])),active:false};hold=setTimeout(()=>{if(!drag)return;edit();drag.active=true;node.classList.add('moving192');suppressUntil=Date.now()+1000},1800)}
function move(x,y,event){if(!drag)return;if(!drag.active){if(Math.hypot(x-drag.x,y-drag.y)>10){clearTimeout(hold);drag=null;suppressUntil=Date.now()+450}return}if(event.cancelable)event.preventDefault();if(drag.node.matches(blockSelector)){if(y<65)window.scrollBy(0,-18);else if(y>innerHeight-95)window.scrollBy(0,18)}const over=document.elementFromPoint(x,y)?.closest('[data-move192]');if(!over||over===drag.node||drag.node.contains(over)||over.contains(drag.node))return;const parent=over.parentElement;if(parent!==drag.group){if(!drag.node.matches(blockSelector)||!over.matches(blockSelector)||parent.closest('button,a,form,.sheet'))return;const r=over.getBoundingClientRect();parent.insertBefore(drag.node,y<r.top+r.height/2?over:over.nextSibling);drag.node.classList.toggle('layoutRoot197',parent.id==='app');drag.group=parent;return}const list=items(parent);parent.insertBefore(drag.node,list.indexOf(over)>list.indexOf(drag.node)?over.nextSibling:over)}
document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'&&e.button===0)start(movableTarget197(e.target),e.clientX,e.clientY)});
document.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')move(e.clientX,e.clientY,e)});
document.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')end()});
document.addEventListener('touchstart',e=>{const node=movableTarget197(e.target);if(!node)return;const touches=e.touches||e.changedTouches||[];if(touches.length!==1)return end({type:'touchcancel'});const point=touches[0];start(node,point.clientX,point.clientY)},{passive:true});
document.addEventListener('touchmove',e=>{const touches=e.touches||[];if(touches.length===1)move(touches[0].clientX,touches[0].clientY,e)},{passive:false});
document.addEventListener('pointercancel',end);document.addEventListener('touchend',end);document.addEventListener('touchcancel',end);window.addEventListener('blur',end);
document.addEventListener('contextmenu',e=>{if(movableTarget197(e.target))e.preventDefault()});
document.addEventListener('click',e=>{if((editing||Date.now()<suppressUntil)&&movableTarget197(e.target)){e.preventDefault();e.stopImmediatePropagation()}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')return done();const node=movableTarget197(e.target);if(node?.parentElement?.id==='nav'&&window.aryExperience94?.migrateGuide(s.guide94)?.active)return;if(!node||!e.altKey||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();edit();const g=node.parentElement,list=items(g),i=list.indexOf(node),delta=['ArrowLeft','ArrowUp'].includes(e.key)?-1:1,next=list[i+delta];if(next&&next.getAttribute('onclick')!=="go('more')"){g.insertBefore(node,delta<0?next:next.nextSibling);if(!save(g))list.forEach(n=>g.appendChild(n));node.focus()}});
const baseRender=window.render;window.render=function(){done();const out=baseRender.apply(this,arguments);homeQuick();apply();return out};
const go=window.go;window.go=function(){done();return go.apply(this,arguments)};
window.aryArrange192=()=>{apply();edit()};window.aryLayoutApply197=apply;window.aryLayoutPageCustom226=()=>Object.entries(read()).some(([name,order])=>name.startsWith(String(screen)+':')&&Array.isArray(order)&&order.length>0);window.aryLayoutCustom197=()=>Array.isArray(read()[String(screen)+':blocks']);window.aryLayoutPlacement197=node=>{const places=read()[placementsKey()];return Array.isArray(places)&&places.some(x=>x&&typeof x==='object'&&x.id===id(node))};

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
const st=document.createElement('style');st.textContent=`[data-move192]{-webkit-touch-callout:none}.arranging192 [data-move192]{outline:2px dashed #258e99;outline-offset:-3px;user-select:none}.moving192{opacity:.65!important;outline:3px solid #258e99!important}#arrangeBar192{position:fixed;top:max(8px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:9999;display:flex;gap:8px;align-items:center;padding:10px;border-radius:16px;background:#172541;color:white;box-shadow:0 4px 20px #0005;width:max-content;max-width:calc(100vw - 16px);box-sizing:border-box}#arrangeBar192 button{min-height:44px;background:#087f86;color:white;border:0;border-radius:10px;padding:8px}#arrangeBar192 b{font-size:13px}`;document.head.appendChild(st);apply();
})();

