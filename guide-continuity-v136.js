(()=>{
'use strict';
let wakeTimer=0;
function status(){try{return window.aryFullGuideStatus125?.()||null}catch{return null}}
function wake(){
 clearTimeout(wakeTimer);
 const st=status();
 if(!st?.active||document.visibilityState==='hidden')return;
 wakeTimer=setTimeout(()=>{
   try{window.dispatchEvent(new Event('resize'))}catch{}
   requestAnimationFrame(()=>window.aryGuideRelabel135?.());
 },120);
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState!=='hidden')wake()});
window.addEventListener('pageshow',wake,{passive:true});
window.aryGuideContinuity136={
 check:()=>{const st=status();return{active:!!st?.active,index:st?.index??-1,automatic:!!st?.automatic,ui:!!document.querySelector('.ary125cloud'),unified:!!st?.unified}},
 wake
};
})();

// V137 — avoid redundant renders and accidental double-navigation during normal daily use.
(()=>{
 if(document.getElementById('aryFastNavigationLoader137'))return;
 const script=document.createElement('script');
 script.id='aryFastNavigationLoader137';
 script.src='fast-navigation-v137.js?v=137.1';
 script.async=false;
 document.body.appendChild(script);
})();