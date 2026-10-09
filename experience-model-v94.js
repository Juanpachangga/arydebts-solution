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
return{routes,nextQuote,begin,present,dismiss,end};
});
