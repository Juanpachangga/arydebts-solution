(()=>{
const phrases={
 morning:[
  ['Buenos días','Hoy no tienes que resolverlo todo: un buen movimiento financiero ya cuenta.'],
  ['Buenos días','Que hoy tus decisiones te acerquen un poco más a la tranquilidad que estás construyendo.'],
  ['Buenos días','Empecemos con calma: mira tus números, elige una prioridad y avanza.'],
  ['Buenos días','Tu dinero necesita dirección, no perfección. Hoy podemos darle una.'],
  ['Buenos días','Un día nuevo también es una nueva oportunidad para cuidar mejor lo que ganas.'],
  ['Buenos días','Vamos paso a paso. Cada dólar que diriges con intención trabaja para tu futuro.']
 ],
 afternoon:[
  ['Buenas tardes','Todavía queda día para tomar una decisión que le haga bien a tu bolsillo.'],
  ['Buenas tardes','¿Cómo va tu día? Revisemos tus números antes de que un gasto pequeño se vuelva invisible.'],
  ['Buenas tardes','Lo que pasó esta mañana ya pasó. Esta tarde puedes volver a tomar el control.'],
  ['Buenas tardes','Un minuto revisando tus finanzas ahora puede ahorrarte preocupaciones después.'],
  ['Buenas tardes','Sigamos avanzando: menos improvisación y más dinero con propósito.']
 ],
 evening:[
  ['Buenas noches','Antes de cerrar el día, revisa cómo se movió tu dinero. Mañana empezarás con más claridad.'],
  ['Buenas noches','Hoy no tenía que ser perfecto. Lo importante es saber dónde estás y cuál será tu próximo paso.'],
  ['Buenas noches','Descansa. Tus finanzas se construyen con constancia, no con resolverlo todo en una noche.'],
  ['Buenas noches','Cierra el día con claridad: lo que registras hoy te ayuda a decidir mejor mañana.'],
  ['Buenas noches','Mañana seguimos. Por hoy, reconoce cada decisión que protegió tu tranquilidad financiera.']
 ]
};
function period(){const h=new Date().getHours();return h<12?'morning':h<18?'afternoon':'evening'}
function pick(){const p=period(),a=phrases[p],d=new Date(),seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()+(String((s&&s.name)||'').length*7);return a[seed%a.length]}
function firstName(){const n=String((s&&s.name)||'').trim();return n&&n.toLowerCase()!=='ana'?n.split(/\s+/)[0]:''}
window.aryHumanGreeting41=()=>{const x=pick(),n=firstName();return{title:`${x[0]}${n?', '+esc(n):''} 👋`,sub:x[1]}}
})();
