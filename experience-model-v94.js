/* Visit rotation and first-use hints, independent of DOM and financial records. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryExperience94=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const routes=['home','expenses','debts','plan','analysis','ants','income','calendar','goals','more'];
function nextQuote(previous,count,random=Math.random()){if(count<2)return 0;const old=Number.isInteger(previous)&&previous>=0&&previous<count?previous:-1;const pick=Math.min(count-(old<0?1:2),Math.max(0,Math.floor(random*(count-(old<0?0:1)))));return old>=0&&pick>=old?pick+1:pick}
const clean=g=>({active:g?.active===true,seen:[...new Set((Array.isArray(g?.seen)?g.seen:[]).filter(x=>routes.includes(x)))]});
function begin(){return{active:true,seen:[]}}
function present(g,route){const state=clean(g);if(!state.active||!routes.includes(route)||state.seen.includes(route))return{show:false,state};return{show:true,state:{active:true,seen:[...state.seen,route]}}}
function dismiss(g){const state=clean(g);return{...state,active:state.active&&state.seen.length<routes.length}}
function end(g){return{...clean(g),active:false}}
// Page hints are acknowledged individually; visiting a page does not dismiss it.
const guideRoutes=['home','expenses','debts','plan','more'];
function beginGuide(){return{version:195,active:true,completed:false,seen:[]}}
function normalizeGuide(g){
 const seen=[...new Set((Array.isArray(g?.seen)?g.seen:[]).filter(x=>guideRoutes.includes(x)))];
 const completed=seen.length===guideRoutes.length;
 return{version:195,active:!completed,completed,seen};
}
function migrateGuide(g){
 if(g?.version===195)return normalizeGuide(g);
 const seen=Array.isArray(g?.seen)?[...g.seen]:[];
 if(g?.homeOnly194&&g.completed===true)seen.push('home');
 return normalizeGuide({seen});
}
function dismissGuide(g,route){
 const state=normalizeGuide(g);
 if(!guideRoutes.includes(route)||!state.active)return state;
 return normalizeGuide({...state,seen:[...state.seen,route]});
}
return{routes,nextQuote,begin,present,dismiss,end,guideRoutes,beginGuide,normalizeGuide,migrateGuide,dismissGuide};
});
