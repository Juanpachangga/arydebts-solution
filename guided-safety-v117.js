(()=>{
const LEGACY_GUIDE_KEY='arydebts-guide-v116';
try{localStorage.setItem(LEGACY_GUIDE_KEY,'done');window.aryGuideSkip116?.()}catch{}
const HIGHLIGHT_ID='aryGuideHighlightStyle117';
const selectors={
 home:['.heroCard','.homeTruth29','.grid .card'],
 income:['.card.full','.kpi'],
 debts:['.debtPulse33','.debtTarget33','.card.full'],
 expenses:['.card.full','.list'],
 plan:['.planHero34','.planPulse34','.card.full'],
 progress:['.progressBox','.card.full'],
 calendar:['.cal35','.calDetail35'],
 assistant:['.assistant58','.assistantIntro58']
};
function ensureHighlightStyle(){if(document.getElementById(HIGHLIGHT_ID))return;const style=document.createElement('style');style.id=HIGHLIGHT_ID;style.textContent=`
.aryGuideFocus117{position:relative!important;z-index:9999!important;box-shadow:0 0 0 3px rgba(83,207,255,.9),0 0 0 9px rgba(83,207,255,.16),0 20px 55px rgba(18,170,255,.2)!important;transition:box-shadow .22s ease,transform .22s ease!important;transform:translateZ(0) scale(1.008)!important}
body.ary-light .aryGuideFocus117{box-shadow:0 0 0 3px rgba(56,164,218,.75),0 0 0 9px rgba(56,164,218,.13),0 20px 45px rgba(61,109,160,.16)!important}
@media(max-width:480px){.aryGuideFocus117{transform:none!important}}
`;document.head.appendChild(style)}
function clearFocus(){document.querySelectorAll('.aryGuideFocus117').forEach(el=>el.classList.remove('aryGuideFocus117'))}
function currentRoute(){return typeof screen==='string'?screen:(location.hash||'').replace(/^#/,'')||'home'}
function applyFocus(){ensureHighlightStyle();clearFocus();if(!document.getElementById('aryGuide116'))return;const route=currentRoute(),list=selectors[route]||[];let el=null;for(const selector of list){el=document.querySelector(selector);if(el)break}if(el){el.classList.add('aryGuideFocus117');try{el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'})}catch(e){}}}
/* V116 is legacy. Do not observe every DOM mutation for its old spotlight engine. */
window.addEventListener('resize',()=>document.getElementById('aryGuide116')&&applyFocus(),{passive:true});

const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar. Tus datos siguen como antes. Inténtalo de nuevo.',deleteConfirm:'¿Eliminar este movimiento del calendario?'},
 en:{saveError:'Could not save. Your data remains unchanged. Try again.',deleteConfirm:'Delete this calendar event?'},
 pt:{saveError:'Não foi possível salvar. Seus dados continuam como antes. Tente novamente.',deleteConfirm:'Excluir este movimento do calendário?'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const validDate=value=>typeof window.aryValidDate63==='function'?window.aryValidDate63(value):/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));

const previousSaveDue=window.arySaveDue35;
window.arySaveDue35=function(date){
 const id=Number(document.getElementById('calDebt35')?.value),debt=(s.debts||[]).find(d=>Number(d.id)===id);
 if(!debt||!validDate(date))return false;
 if(!commit(next=>{const target=(next.debts||[]).find(d=>Number(d.id)===id);if(!target)throw new Error('missing_debt');target.due=date;})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveDue35._aryPrevious117=previousSaveDue;

const previousSaveEvent=window.arySaveEvent36;
window.arySaveEvent36=function(id){
 const date=String(document.getElementById('cevDate36')?.value||''),name=String(document.getElementById('cevName36')?.value||'').trim(),raw=String(document.getElementById('cevAmount36')?.value||'').trim(),kind=String(document.getElementById('cevType36')?.value||'reminder'),note=String(document.getElementById('cevNote36')?.value||'').trim(),frequency=String(document.getElementById('eventFrequency63')?.value||'once');
 if(kind==='payment')return previousSaveEvent.apply(this,arguments);
 const amount=raw===''?0:(typeof parseNum==='function'?parseNum(raw):Number(raw));
 const recurring=frequency!=='once';
 if(!name||(!recurring&&!validDate(date))||(date&&!validDate(date))||!Number.isFinite(amount)||amount<0)return previousSaveEvent.apply(this,arguments);
 const icon=kind==='income'?'🟢':'🔔',eventId=id?Number(id):Date.now();
 if(!commit(next=>{if(!Array.isArray(next.calendarEvents))next.calendarEvents=[];const existing=id?next.calendarEvents.find(e=>Number(e.id)===Number(id)):null;const payload={id:eventId,date:date||'',name,amount,kind,note,icon,frequency};if(existing)Object.assign(existing,payload);else next.calendarEvents.push(payload);})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};
window.arySaveEvent36._aryPrevious117=previousSaveEvent;

const previousDeleteEvent=window.aryDeleteEvent36;
window.aryDeleteEvent36=function(id){
 const event=(s.calendarEvents||[]).find(e=>Number(e.id)===Number(id));
 if(!event)return false;
 if(event.kind==='payment')return previousDeleteEvent.apply(this,arguments);
 if(!confirm(t().deleteConfirm))return false;
 if(!commit(next=>{next.calendarEvents=(next.calendarEvents||[]).filter(e=>Number(e.id)!==Number(id));})){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof render==='function')render();
 return true;
};
window.aryDeleteEvent36._aryPrevious117=previousDeleteEvent;
})();
