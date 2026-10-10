(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar el cambio. Tus datos siguen como antes.',invalidSettings:'Revisa el idioma o la moneda seleccionada.'},
 en:{saveError:'Could not save the change. Your data remains unchanged.',invalidSettings:'Check the selected language or currency.'},
 pt:{saveError:'Não foi possível salvar a alteração. Seus dados continuam como antes.',invalidSettings:'Revise o idioma ou a moeda selecionada.'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const locales=['es-US','es-CO','es-ES','en-US','pt-BR'];
const validCurrency=value=>typeof value==='string'&&/^[A-Z]{3}$/.test(value)&&(typeof currencies!=='function'||currencies().includes(value));
const saveChange=change=>{if(!commit(change)){if(typeof toast==='function')toast(t().saveError);return false}return true};

window.setLocale=function(value){
 const locale=String(value||'');if(!locales.includes(locale))return false;
 if(!saveChange(next=>{next.locale=locale;}))return false;
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.toggleMode=function(){
 if(!saveChange(next=>{next.mode=next.mode==='lite'?'immersive':'lite';}))return false;
 if(typeof render==='function')render();return true;
};

window.toggleTheme=function(){
 if(!saveChange(next=>{next.theme=next.theme==='light'?'dark':'light';}))return false;
 if(typeof render==='function')render();return true;
};

window.finishOnboarding=function(){
 if(!saveChange(next=>{next.onboarded=true;}))return false;
 if(typeof go==='function')go('home');return true;
};

window.saveSettings=function(){
 const greeting=String(document.getElementById('greet')?.value||'').trim();
 const locale=String(document.getElementById('loc')?.value||s.locale||'es-US');
 const currency=String(document.getElementById('cur')?.value||s.currency||'USD');
 if(!locales.includes(locale)||!validCurrency(currency)){if(typeof toast==='function')toast(t().invalidSettings);return false;}
 if(!saveChange(next=>{next.greeting=greeting;next.locale=locale;next.currency=currency;}))return false;
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.moveNav=function(index,direction){
 const i=Number(index),d=Number(direction),order=Array.isArray(s.navOrder)?s.navOrder:[],j=i+d;
 if(!Number.isInteger(i)||!Number.isInteger(d)||i<0||i>=order.length||j<0||j>=order.length)return false;
 if(!saveChange(next=>{const items=Array.isArray(next.navOrder)?[...next.navOrder]:[];[items[i],items[j]]=[items[j],items[i]];next.navOrder=items;}))return false;
 if(typeof render==='function')render();
 if(typeof customizeHome==='function')customizeHome();
 return true;
};

window.aryUniqueId120=function(...collections){
 const used=new Set();
 for(const collection of collections)for(const item of Array.isArray(collection)?collection:[])if(item&&item.id!==undefined&&item.id!==null)used.add(String(item.id));
 let id=Date.now();while(used.has(String(id)))id++;return id;
};

window.aryIntegrity120=function(){
 const groups={debts:s.debts||[],expenses:s.expenses||[],payments:s.payments||[],calendarEvents:s.calendarEvents||[]},duplicates={};
 for(const [name,items] of Object.entries(groups)){const seen=new Set(),dupes=[];for(const item of items){if(!item||item.id===undefined||item.id===null)continue;const id=String(item.id);if(seen.has(id)&&!dupes.includes(id))dupes.push(id);seen.add(id)}duplicates[name]=dupes;}
 const progress=typeof window.aryRealDebtProgress54==='function'?window.aryRealDebtProgress54():null;
 return {incomeValid:Number.isFinite(Number(s.income))&&Number(s.income)>=0,savingsValid:Number.isFinite(Number(s.savings))&&Number(s.savings)>=0,duplicates,progress};
};
})();
