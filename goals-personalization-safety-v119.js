(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes.',invalidSaving:'Escribe un valor válido para el ahorro.',savingSaved:'Ahorro guardado'},
 en:{saveError:'Could not save. Your data remains unchanged.',invalidSaving:'Enter a valid savings amount.',savingSaved:'Savings saved'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes.',invalidSaving:'Digite um valor válido para a poupança.',savingSaved:'Poupança salva'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const parseAmount=value=>typeof parseNum==='function'?parseNum(value):Number(value);
const addMoney=(a,b)=>window.aryMoney108&&typeof aryMoney108.add==='function'?aryMoney108.add(a,b):(Number(a)||0)+(Number(b)||0);

window.saveSaving=function(){
 const raw=String(document.getElementById('sv')?.value||'').trim(),value=parseAmount(raw);
 if(raw===''||!Number.isFinite(value)||value<=0){if(typeof toast==='function')toast(t().invalidSaving);return false;}
 if(!commit(next=>{next.savings=Math.max(0,addMoney(Number(next.savings)||0,value));})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 if(typeof toast==='function')toast(t().savingSaved);
 return true;
};

window.removeGoal=function(index){
 const i=Number(index);if(!Number.isInteger(i)||i<0||i>=(s.goals||[]).length)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];goals.splice(i,1);next.goals=goals;next.goal=goals[0]||'';})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();return true;
};

window.toggleGoal=function(value){
 const goal=String(value||'').trim();if(!goal)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];next.goals=goals.includes(goal)?goals.filter(g=>g!==goal):[...goals,goal];next.goal=next.goals[0]||'';})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();return true;
};

window.chooseGoal=function(value){
 const goal=String(value||'').trim();if(!goal)return false;
 if(!commit(next=>{const goals=Array.isArray(next.goals)?[...next.goals]:[];if(!goals.includes(goal))goals.push(goal);next.goals=goals;next.goal=goal;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof go==='function')go('setupDebts');return true;
};

const validRoutes=['debts','expenses','plan','calendar','income','goals','progress','buy','ants','assistant'];
window.aryToggleAdaptive61=function(){
 if(!commit(next=>{if(!next.personalization61||typeof next.personalization61!=='object'||Array.isArray(next.personalization61))next.personalization61={enabled:true,visits:{},pinned:''};next.personalization61.enabled=next.personalization61.enabled===false;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof aryCustomize61==='function')aryCustomize61();return true;
};
window.aryPin61=function(route){
 const value=String(route||'');if(value!==''&&!validRoutes.includes(value))return false;
 if(!commit(next=>{if(!next.personalization61||typeof next.personalization61!=='object'||Array.isArray(next.personalization61))next.personalization61={enabled:true,visits:{},pinned:''};next.personalization61.pinned=value;})){if(typeof toast==='function')toast(t().saveError);return false;}
 return true;
};

let scrollFrame=0;
const refreshGuideFocus=()=>{if(!document.getElementById('aryGuide116'))return;cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(()=>{const focused=document.querySelector('.aryGuideFocus117');if(focused&&typeof focused.getBoundingClientRect==='function'){const r=focused.getBoundingClientRect();const top=92,bottom=window.innerHeight-190;if(r.top<top||r.bottom>bottom){try{focused.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'})}catch(e){}}}})};
window.addEventListener('scroll',refreshGuideFocus,{passive:true});
})();
