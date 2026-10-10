(()=>{
'use strict';
// V125 owns the card, theme, content and geometry. This compatibility module
// supplies only keyboard navigation and hides guidance behind open dialogs.
const style=document.createElement('style');style.id='aryGuidePremiumStyle127';
style.textContent=`
body:has(#modal:not(.hidden)) .ary125shade,body:has(#modal:not(.hidden)) .ary125focus,body:has(#modal:not(.hidden)) .ary125navShield,body:has(#modal:not(.hidden)) .ary125cloud,body:has(#modal:not(.hidden)) .ary125skip{visibility:hidden!important;pointer-events:none!important}
.ary125cloud button:focus-visible{outline:3px solid #65dcff;outline-offset:3px}
`;
document.head.appendChild(style);
window.addEventListener('keydown',event=>{
 if(!window.aryFullGuideStatus125?.()?.active)return;
 if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 if(event.key==='ArrowRight'){event.preventDefault();window.aryFullGuideNext125?.()}
 else if(event.key==='ArrowLeft'){event.preventDefault();window.aryFullGuideBack125?.()}
});
})();
