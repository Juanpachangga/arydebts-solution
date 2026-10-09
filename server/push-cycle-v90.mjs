// Invoke every minute from a trusted server scheduler. Never from a browser.
export async function runPushCycle90({store,dispatch,now=new Date()}){
 let after=null,queued=0;
 do{const page=await store.schedule(now,after,100);queued+=page.queued;after=page.next}while(after);
 await dispatch(100);
 await store.prune();
 return {queued};
}
