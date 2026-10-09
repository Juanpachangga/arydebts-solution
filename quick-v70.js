(()=>{
const lang=()=>s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es';
const L={es:{details:'Ver detalles',unknown:'Añade tu ingreso para comparar',steady:'Impacto bajo',watch:'Ojo con este ritmo',high:'Gasto alto: revisa tus extras',very:'Mucho impacto en tu ingreso',extreme:'Frena y revisa tus extras'},en:{details:'View details',unknown:'Add income to compare',steady:'Low impact',watch:'Watch this pace',high:'High spending: review extras',very:'Large impact on your income',extreme:'Pause and review extras'},pt:{details:'Ver detalhes',unknown:'Adicione sua renda para comparar',steady:'Impacto baixo',watch:'Observe este ritmo',high:'Gasto alto: revise os extras',very:'Grande impacto na sua renda',extreme:'Pare e revise os extras'}};
window.aryDetailsLabel70=()=>L[lang()].details;
window.arySetCurrency70=currency=>{if(!currencies().includes(currency))return;s.currency=currency;safeSet(KEY,JSON.stringify(s));render()};
// Compare optional spending with the entered income; never infer a bank balance.
window.aryAntPressure70=(list,ratio)=>{if(ratio===null)return null;const income=aryRealData54.monthlyIncome();if(!(income>0))return null;const month=localDate().slice(0,7),planned=s.expenses.filter(e=>e.cat==='Hormiga'&&aryRecurring63(e)&&(!e.date||e.date.slice(0,7)<=month)).reduce((n,e)=>n+Math.max(0,aryMonthly63(e.amount,e.frequency)),0);const end=new Date(localDate()+'T12:00:00'),start=new Date(end);start.setDate(start.getDate()-6);const recent=list.filter(e=>{const d=new Date(e.date+'T12:00:00');return d>=start&&d<=end}),days=new Set(recent.map(e=>e.date));const pace=days.size>=3?recent.reduce((n,e)=>n+Math.max(0,Number(e.amount)||0),0)/7*365/12/income:0;return Math.max(ratio,planned/income,pace)};
const face=ratio=>ratio>.4?'🤯':ratio>.25?'😵‍💫':ratio>.12?'😣':'🫣';
window.aryAntMoodLabel70=ratio=>L[lang()][ratio===null?'unknown':ratio<=.05?'steady':ratio<=.12?'watch':ratio<=.25?'high':ratio<=.4?'very':'extreme'];
const pig=window.aryPig63;
window.aryPig63=ratio=>ratio!==null&&ratio>.05?`<span class="antFace58 antAlert70" aria-hidden="true">${face(ratio)}</span>`:pig(ratio);
// Translate common labels for display only. Custom names and brands stay intact.
const names={es:['Tarjeta de crédito','Tarjeta','Carro','Renta','Celular','Celulares','Gasolina','Comida','Mercado','Luz','Agua','Préstamo'],en:['Credit card','Card','Car','Rent','Mobile phone','Mobile phones','Fuel','Food','Groceries','Electricity','Water','Loan'],pt:['Cartão de crédito','Cartão','Carro','Aluguel','Celular','Celulares','Combustível','Alimentação','Supermercado','Luz','Água','Empréstimo']};
window.aryDisplayName70=name=>{const raw=String(name||''),match=raw.match(/^(.*?)(\s+\d+)?$/),base=match[1].toLocaleLowerCase(),suffix=match[2]||'';for(const list of Object.values(names)){const i=list.findIndex(n=>n.toLocaleLowerCase()===base);if(i>=0)return names[lang()][i]+suffix}return raw};
const rowBefore=window.row;window.row=(icon,name,...rest)=>rowBefore(icon,aryDisplayName70(name),...rest);
const makeDetails=el=>{if(el.closest('details,button,[role="alert"],.bad,.aprNotice68')||el.textContent.trim().length<120||el.querySelector('button,input,select,a'))return;const box=document.createElement('details'),summary=document.createElement('summary');box.className='details70';summary.textContent=aryDetailsLabel70();el.parentNode.insertBefore(box,el);box.appendChild(summary);box.appendChild(el)};
const simplify=()=>{for(const el of document.querySelectorAll('#app .card>p.muted,#app .recurrenceNote63,#app .estimate61,#app .dueNote60,#modal .numberHint63'))makeDetails(el)};
const tabLabels={es:['Todos','Esenciales','Hormiga','Variables'],en:['All','Essentials','Small expenses','Variable'],pt:['Todos','Essenciais','Pequenos gastos','Variáveis']};window.aryExpenseTab70=i=>tabLabels[lang()][i];
const before=window.render;window.render=()=>{const r=before();simplify();return r};
const modalBefore=window.modal;window.modal=html=>{const r=modalBefore(html);simplify();return r};
render();
})();
