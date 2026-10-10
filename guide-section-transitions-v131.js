(()=>{
'use strict';
// V182 — the full guide already owns routing, spotlight placement and timing.
// The former full-screen section transition added a second visual layer above
// the guide and could intercept clicks while a new section was rendering.
// Keep this module as a compatibility cleanup only: one guide, one overlay.
const STYLE='aryGuideSectionTransitionStyle131';
let cleaned=false;
function clear(){
 document.querySelectorAll('.ary131transition').forEach(n=>n.remove());
 document.getElementById(STYLE)?.remove();
 cleaned=true;
}
clear();
window.aryGuideTransition131={show:()=>{clear();return false},clear};
})();

// V132 — adapt the final guide screen to the customer's actual next steps.
(()=>{
 if(document.getElementById('aryGuideCompletionLoader132'))return;
 const script=document.createElement('script');
 script.id='aryGuideCompletionLoader132';
 script.src='guide-completion-v132.js?v=132.1';
 script.async=false;
 document.body.appendChild(script);
})();
