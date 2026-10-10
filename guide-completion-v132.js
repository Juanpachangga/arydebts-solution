(()=>{
'use strict';
// Completion content is owned by V125; preserve the legacy Home shortcut API.
window.aryGuideHome132=()=>{window.aryFullGuideFinish125?.();window.go?.('home')};
})();

// V133 — keep daily use fast with one-tap global quick actions after onboarding.
(()=>{
 if(document.getElementById('aryFastUxLoader133'))return;
 const script=document.createElement('script');
 script.id='aryFastUxLoader133';
 script.src='fast-ux-v133.js?v=133.1';
 script.async=false;
 document.body.appendChild(script);
})();
