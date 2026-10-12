// Compatibility for saved shortcuts. ARY now lives only in the Home card.
(()=>{
'use strict';
window.aryGuideUnified125=false;
window.aryStartFullGuide125=()=>window.aryStartGuide94?.();
window.aryFullGuideFinish125=()=>window.aryDismissGuide94?.();
window.aryFullGuideNext125=()=>window.aryDismissGuide94?.();
window.aryFullGuideBack125=()=>false;
window.aryFullGuideToggleAuto125=()=>false;
window.aryFullGuideStatus125=()=>({active:false,index:0,automatic:false,completed:s?.guide94?.completed===true,steps:0,unified:false});
})();
