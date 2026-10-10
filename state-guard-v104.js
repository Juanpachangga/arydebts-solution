/* Normalize damaged local structure without discarding the original bytes. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryState104=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const KEY='arydebts-v3',ARCHIVE='arydebts-repair-original-v104';
const record=v=>v&&typeof v==='object'&&!Array.isArray(v);
function normalize(value,defaults){
 const state={...defaults,...(record(value)?value:{})};
 for(const key of ['debts','expenses','payments','calendarEvents'])state[key]=Array.isArray(state[key])?state[key].filter(record):[];
 for(const key of ['goals','navOrder'])state[key]=Array.isArray(state[key])?state[key].filter(v=>typeof v==='string'):[...defaults[key]];
 for(const key of ['name','greeting','goal'])if(typeof state[key]!=='string')state[key]=defaults[key];
 if(!['light','dark'].includes(state.theme))state.theme=defaults.theme;
 if(!['immersive','lite'].includes(state.mode))state.mode=defaults.mode;
 if(!['monthly','weekly','biweekly'].includes(state.incomeFrequency))state.incomeFrequency=defaults.incomeFrequency;
 try{if(typeof state.locale!=='string')throw Error();new Intl.NumberFormat(state.locale);}catch{state.locale=defaults.locale;}
 if(typeof state.currency!=='string'||! /^[A-Z]{3}$/.test(state.currency))state.currency=defaults.currency;
 return state;
}
function load(storage,defaults){
 let raw;try{raw=storage.getItem(KEY);}catch{return{state:normalize(null,defaults),repaired:false};}
 if(raw===null)return{state:normalize(null,defaults),repaired:false};
 let parsed;try{parsed=JSON.parse(raw);}catch{parsed=null;}
 const state=normalize(parsed,defaults),repaired=!record(parsed)||Object.keys(state).some(key=>JSON.stringify(state[key])!==JSON.stringify(parsed[key]));
 if(repaired){
  let history;try{history=JSON.parse(storage.getItem(ARCHIVE)||'[]');}catch{history=[];}
  if(!Array.isArray(history))history=[];
  if(history[0]?.raw!==raw){history.unshift({at:new Date().toISOString(),raw});storage.setItem(ARCHIVE,JSON.stringify(history.slice(0,3)));}
 }
 return{state,repaired};
}
return Object.freeze({normalize,load,KEY,ARCHIVE});
});
