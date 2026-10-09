(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryNotificationRules89=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const day=k=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(k||'')))return null;const[y,m,d]=k.split('-').map(Number),v=new Date(y,m-1,d);return key(v)===k?Date.UTC(y,m-1,d)/86400000:null};
const defaults={payments:true,ants:true,morning:true,morningTime:'08:00',dismissed:[]};
function preferences(raw={}){return {...defaults,...Object.fromEntries(['payments','ants','morning'].map(k=>[k,typeof raw[k]==='boolean'?raw[k]:true])),morningTime:/^([01]\d|2[0-3]):[0-5]\d$/.test(raw.morningTime)?raw.morningTime:'08:00',dismissed:Array.isArray(raw.dismissed)?raw.dismissed.filter(x=>typeof x==='string').slice(-200):[]}}
function evaluate({now=new Date(),prefs={},activity=[],expenses=[],income=0,recurring=()=>false,protectedExpense=()=>false}){
 const p=preferences(prefs),today=key(now),n=day(today),out=[];
 if(p.payments)for(const a of activity){const d=day(a.date);if(d===null||d<n-30||d>n+1)continue;out.push({id:`due:${a.source}:${a.id}:${a.date}:${today}`,type:d<n?'overdue':d===n?'today':'tomorrow',name:a.name,date:a.date,route:'calendar',icon:a.icon||'📅'})}
 const actual=expenses.filter(e=>e.cat==='Hormiga'&&!recurring(e)&&!protectedExpense(e)&&day(e.date)!==null&&day(e.date)<=n&&Number.isFinite(Number(e.amount))&&Number(e.amount)>0);
 const total=actual.filter(e=>e.date.slice(0,7)===today.slice(0,7)).reduce((sum,e)=>sum+Number(e.amount),0);
 if(p.ants&&income>0&&total/income>=.05)out.push({id:`ants:${today}`,type:'ants',route:'ants',icon:total/income>=.2?'😵‍💫':'🫣',amount:total,percent:Math.round(total/income*100)});
 const recent=actual.filter(e=>day(e.date)>=n-7&&day(e.date)<n),previous=actual.filter(e=>day(e.date)>=n-14&&day(e.date)<n-7),sum=a=>a.reduce((v,e)=>v+Number(e.amount),0),before=sum(previous),after=sum(recent);
 // Fewer records alone are not evidence of savings. Require at least four recorded days in both windows.
 if(p.ants&&new Set(recent.map(e=>e.date)).size>=4&&new Set(previous.map(e=>e.date)).size>=4&&before>0&&after<before*.8)out.push({id:`progress:${today}`,type:'progress',route:'ants',icon:'🌱',percent:Math.round((1-after/before)*100)});
 const[h,m]=p.morningTime.split(':').map(Number),minute=now.getHours()*60+now.getMinutes(),start=h*60+m;
 if(p.morning&&minute>=start&&minute<Math.min(1440,start+180))out.push({id:`morning:${today}`,type:'morning',route:'home',icon:'✨',phrase:n%4});
 return out.filter(a=>!p.dismissed.includes(a.id));
}
return {key,day,preferences,evaluate};
});
