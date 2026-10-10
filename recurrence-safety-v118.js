(()=>{
const lang=()=>s?.locale==='en-US'?'en':s?.locale==='pt-BR'?'pt':'es';
const copy={
 es:{saveError:'No se pudo guardar el cambio. El recordatorio sigue como antes.'},
 en:{saveError:'Could not save the change. The reminder remains unchanged.'},
 pt:{saveError:'Não foi possível salvar a alteração. O lembrete continua como antes.'}
};
const t=()=>copy[lang()];
const commit=change=>typeof window.aryCommitFinancial109==='function'&&window.aryCommitFinancial109(change);
const monthKey=()=>typeof localDate==='function'?String(localDate()).slice(0,7):(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`})();

window.aryCompleteReminder60=function(id,completed){
 const current=(s.calendarEvents||[]).find(e=>Number(e.id)===Number(id)&&e.kind==='reminder');
 if(!current)return false;
 const done=!!completed,isRecurring=typeof window.aryRecurring63==='function'&&window.aryRecurring63(current);
 if(!commit(next=>{
   const event=(next.calendarEvents||[]).find(e=>Number(e.id)===Number(id)&&e.kind==='reminder');
   if(!event)throw new Error('missing_reminder');
   event.completed=done;
   if(isRecurring)event.completedMonth63=done?monthKey():'';
 })){if(typeof toast==='function')toast(t().saveError);return false;}
 if(typeof closeM==='function')closeM();
 if(typeof render==='function')render();
 return true;
};

window.aryReminderState118=id=>{
 const e=(s.calendarEvents||[]).find(x=>Number(x.id)===Number(id));
 return e?{completed:!!e.completed,completedMonth63:e.completedMonth63||'',recurring:typeof window.aryRecurring63==='function'&&window.aryRecurring63(e)}:null;
};
})();
