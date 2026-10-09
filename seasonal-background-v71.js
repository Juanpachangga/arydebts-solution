(()=>{
// Local device date + region chosen in the app; no location permission needed.
window.aryBackdropSeason71=(date=new Date(),locale=s.locale,birthday=profile?.birthday||'')=>{
 const m=date.getMonth()+1,d=date.getDate(),key=`${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
 if(birthday&&birthday===key)return 'birthday';
 if(m===10)return 'halloween';
 if(m===12&&d>=26||m===1&&d<=7)return 'newyear';
 if(m===12)return 'christmas';
 if(locale?.endsWith('-US')&&m===7&&d>=1&&d<=4)return 'usa';
 if(locale==='es-CO'&&m===7&&d>=18&&d<=20)return 'colombia';
 if(locale==='pt-BR'&&m===9&&d>=5&&d<=7)return 'brazil';
 return 'everyday';
};
const shapes={
 pumpkin:'<path d="M49 26q-5-14 9-19" fill="none" stroke="#74dfb6" stroke-width="5" stroke-linecap="round"/><path d="M50 26C13 9 1 89 43 91h14C99 89 87 9 50 26" fill="#ff8f38"/><ellipse cx="50" cy="58" rx="21" ry="33" fill="#ffc76c"/><path d="m26 51 17-9-3 17zm31-9 17 9-14 8zM28 71l11 5 11-5 11 5 11-5-8 13H36z" fill="#542667"/>',
 bat:'<path d="M50 45 43 29l-7 16Q14 13 4 27q13 3 9 27 13-8 22 10 15 15 30 0 9-18 22-10-4-24 9-27Q86 13 64 45l-7-16z" fill="#bd8fff"/><circle cx="44" cy="51" r="2" fill="#f6d5ff"/><circle cx="56" cy="51" r="2" fill="#f6d5ff"/>',
 ghost:'<path d="M24 81V42a26 26 0 0 1 52 0v39L65 72 54 84 43 73 32 85z" fill="#ddf5ff"/><ellipse cx="41" cy="43" rx="4" ry="7" fill="#754a96"/><ellipse cx="59" cy="43" rx="4" ry="7" fill="#754a96"/><ellipse cx="50" cy="63" rx="5" ry="6" fill="#754a96"/>',
 tree:'<path d="m50 10 22 29H61l22 28H68l23 24H9l23-24H17l22-28H28z" fill="#53d7a6"/><path d="m50 3 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#ffe196"/><g fill="#ff88aa"><circle cx="44" cy="36" r="4"/><circle cx="59" cy="56" r="4"/><circle cx="32" cy="74" r="4"/></g>',
 ornament:'<path d="M50 4v19" stroke="#ffe4a4" stroke-width="3"/><rect x="41" y="23" width="18" height="9" rx="3" fill="#ffe4a4"/><circle cx="50" cy="60" r="30" fill="#ff789a"/><path d="M27 48q23 21 46 0m-46 22q23-21 46 0" stroke="#ffe5ae" stroke-width="4" fill="none"/>',
 star:'<path d="m50 10 10 28 29 12-29 11-10 29-11-29L10 50l29-12z" fill="#ffe29a"/><path d="M81 9v14m-7-7h14" stroke="#b79aff" stroke-width="3"/>',
 fireworks:'<g fill="none" stroke-width="4" stroke-linecap="round"><path d="M50 6v23m0 42v23M6 50h23m42 0h23" stroke="#ffd579"/><path d="m19 19 17 17m28 28 17 17M19 81l17-17m28-28 17-17" stroke="#d398ff"/></g><circle cx="50" cy="50" r="7" fill="#67ddff"/>',
 balloon:'<path d="M50 68q-15 16 1 28" fill="none" stroke="#d7c6ff" stroke-width="2"/><ellipse cx="50" cy="35" rx="25" ry="31" fill="#ff90d3"/><path d="m50 65-5 7h10z" fill="#ca73df"/><path d="M37 19q-7 8-7 18" fill="none" stroke="#ffe4f6" stroke-width="4" stroke-linecap="round"/>',
 usa:'<path d="M15 18h70v51H15z" fill="#ffe1e8"/><path d="M15 25h70m-70 14h70m-70 14h70m-70 14h70" stroke="#ff7295" stroke-width="7"/><path d="M15 18h32v28H15z" fill="#587bea"/><path d="m31 23 3 6 7 1-5 4 1 7-6-4-6 4 1-7-5-4 7-1z" fill="white"/>',
 colombia:'<path d="M15 18h70v27H15z" fill="#ffd570"/><path d="M15 45h70v14H15z" fill="#548aff"/><path d="M15 59h70v14H15z" fill="#ff7992"/>',
 brazil:'<path d="M15 18h70v55H15z" fill="#57d39d"/><path d="m50 25 28 21-28 21-28-21z" fill="#ffe296"/><circle cx="50" cy="46" r="12" fill="#5386e8"/><path d="M39 42q11 0 21 8" fill="none" stroke="#eefbff" stroke-width="2"/>'
};
const motifs={halloween:['pumpkin','bat','ghost','bat'],christmas:['tree','ornament','star','ornament'],newyear:['fireworks','star','fireworks','star'],birthday:['balloon','star','balloon','star'],usa:['usa','star','usa','fireworks'],colombia:['colombia','star','colombia','star'],brazil:['brazil','star','brazil','star'],everyday:[]};
const host=document.createElement('div');host.className='seasonBackdrop71';host.setAttribute('aria-hidden','true');
for(const name of ['seasonGlow71','seasonMist71']){const layer=document.createElement('div');layer.className=name;host.appendChild(layer)}
const art=document.createElement('div');art.className='seasonMotifs71';host.appendChild(art);document.body.appendChild(host);
let last='';
window.aryUpdateBackdrop71=()=>{const season=aryBackdropSeason71();document.body.dataset.season71=season;host.dataset.season=season;if(last===season)return;last=season;art.innerHTML=motifs[season].map((shape,i)=>`<span class="seasonArt71 art71-${i}"><svg viewBox="0 0 100 100" aria-hidden="true">${shapes[shape]}</svg></span>`).join('')};
const before=window.render;window.render=()=>{const result=before();aryUpdateBackdrop71();return result};
const refresh=()=>{document.body.classList.toggle('seasonPaused71',document.hidden);if(!document.hidden)aryUpdateBackdrop71()};
document.addEventListener('visibilitychange',refresh);window.addEventListener('focus',refresh);
const midnight=()=>{const now=new Date(),next=new Date(now);next.setHours(24,0,1,0);setTimeout(()=>{aryUpdateBackdrop71();midnight()},next-now)};midnight();aryUpdateBackdrop71();
})();
