(()=>{
'use strict';
/* V176: V126 no longer owns a second guide. The four former extra steps now
   live inside V125, so this file stays only as a compatibility marker. */
window.aryGuideExtraStability142={active:()=>false,integrated:true};
})();

// V143 — make the final guide state truly adaptive and exit cleanly to Home.
(()=>{
 if(document.getElementById('aryGuideCompletionPolishLoader143'))return;
 const script=document.createElement('script');
 script.id='aryGuideCompletionPolishLoader143';
 script.src='guide-completion-polish-v143.js?v=143.3';
 script.async=false;
 document.body.appendChild(script);
})();
