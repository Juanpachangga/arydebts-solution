/* Pause actual SVG clocks as well as CSS motion; no frame loops or render calls. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function sync(){
  const svg=document.querySelector('.worldMotion57');
  if(!svg)return;
  const paused=document.body.classList.contains('mode-lite')||reduced.matches||document.hidden;
  svg.classList.toggle('worldMotionPaused77',paused);
  if(typeof svg.pauseAnimations==='function'){
   if(paused)svg.pauseAnimations();else svg.unpauseAnimations();
  }
 }
 const app=document.getElementById('app');
 if(app)new MutationObserver(sync).observe(app,{childList:true});
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 reduced.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 sync();
})();
