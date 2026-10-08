(()=>{
/* V54: new users begin with their own data, never the legacy demo dataset. */
const L={es:{required:'Completa tu nombre, correo y contraseña'},en:{required:'Complete your name, email, and password'},pt:{required:'Preencha seu nome, e-mail e senha'}};
const tx=()=>L[(typeof s!=='undefined'&&s.locale==='en-US')?'en':(typeof s!=='undefined'&&s.locale==='pt-BR')?'pt':'es'];
const hasProfile=()=>typeof profile!=='undefined'&&!!profile;
function isLegacyDemoState(){if(typeof s==='undefined'||s.onboarded||hasProfile())return false;const dn=(s.debts||[]).map(d=>d.name),en=(s.expenses||[]).map(e=>e.name);return s.name==='Ana'&&Number(s.income)===850&&s.incomeFrequency==='weekly'&&dn.length===5&&dn.includes('Tarjeta de crédito')&&dn.includes('Renta atrasada')&&en.length===6&&en.includes('Gaseosas / Snacks')&&en.includes('Uber / Transporte')}
function resetDebtBaseline(){try{localStorage.removeItem('ary-home-baseline-v29')}catch(e){}}
function emptyFinancialState(){if(typeof s==='undefined')return;s.name='';s.income=0;s.incomeFrequency='monthly';s.goal='';s.goals=[];s.debts=[];s.expenses=[];s.savings=0;s.calendarEvents=[];s.payments=[];s.onboarded=false;resetDebtBaseline()}
function migrateLegacyDemo(){if(!isLegacyDemoState())return;emptyFinancialState();try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}
function newProfileOnboarding(){if(typeof s==='undefined')return;if(!hasProfile()&&!s.onboarded)emptyFinancialState();s.onboarded=false;resetDebtBaseline();try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}
migrateLegacyDemo();
window.aryStartOnboarding43=()=>{newProfileOnboarding();if(typeof go==='function')go('signup')};
window.aryPrepareNewProfile44=newProfileOnboarding;
/* Guided sequence: intro=1, income=2, expenses=3, debts=4, goal=5. */
window.aryBeginQuestions43=()=>{if(typeof go==='function')go('intro')};
window.aryEmptyFinancialState54=emptyFinancialState;
function patchAuth(){if(typeof window.localAuth!=='function'||window.localAuth.__ary54)return;const original=window.localAuth;const wrapped=function(mode){if(mode!=='signup')return original.apply(this,arguments);const name=document.getElementById('an')?.value.trim(),email=document.getElementById('ae')?.value.trim(),pass=document.getElementById('ap')?.value||'';if(!name||!email||!pass){if(typeof toast==='function')toast(tx().required);return}if(typeof s!=='undefined'){s.name=name;s.onboarded=false;resetDebtBaseline();try{localStorage.setItem(typeof KEY!=='undefined'?KEY:'arydebts-v3',JSON.stringify(s))}catch(e){}}try{const p={name,email};localStorage.setItem(typeof AUTH!=='undefined'?AUTH:'arydebts-profile',JSON.stringify(p));if(typeof profile!=='undefined')profile=p}catch(e){}if(typeof go==='function')go('intro')};wrapped.__ary54=true;window.localAuth=wrapped;try{localAuth=wrapped}catch(e){}}
patchAuth();addEventListener('DOMContentLoaded',patchAuth);setTimeout(patchAuth,0);
})();