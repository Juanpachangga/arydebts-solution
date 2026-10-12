// Stable account identity remains shared with personal layout preferences.
(()=>{
'use strict';
function identity(){
 const p=typeof profile==='object'&&profile?profile:null;
 const raw=String(p?.email||p?.id||p?.name||'').trim().toLowerCase();
 if(!raw)return '';
 let h=2166136261;
 for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(36);
}
window.aryGuideLifecycle128={
 currentUser:identity,
 completed:()=>s?.guide94?.completed===true,
 resetCurrent:()=>false,
 complete:()=>false,
 sync:()=>s?.guide94?.completed===true
};
})();
