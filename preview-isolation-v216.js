// Separate sample workspace: never read or mutate the user's persistent storage.
(async()=>{
'use strict';
const app=document.getElementById('app');
try{
 class SampleStorage{#data=new Map();get length(){return this.#data.size}key(i){return [...this.#data.keys()][i]??null}getItem(k){return this.#data.get(String(k))??null}setItem(k,v){this.#data.set(String(k),String(v))}removeItem(k){this.#data.delete(String(k))}clear(){this.#data.clear()}}
 Object.defineProperty(window,'Storage',{value:SampleStorage,configurable:false});
 const local=new SampleStorage(),session=new SampleStorage();
 Object.defineProperty(window,'localStorage',{value:local,configurable:false});Object.defineProperty(window,'sessionStorage',{value:session,configurable:false});
 if(window.localStorage!==local||window.sessionStorage!==session)throw Error('storage');
 addEventListener('storage',e=>e.stopImmediatePropagation(),true);
 const today=new Date().toISOString().slice(0,10);
 local.setItem('arydebts-profile',JSON.stringify({name:'Alex · ejemplo',email:'premium-preview@example.test',localDemo:true}));
 local.setItem('arydebts-v3',JSON.stringify({currency:'USD',locale:'es-US',mode:'immersive',theme:'light',name:'Alex · ejemplo',income:3200,incomeFrequency:'monthly',goal:'Preparar mi primera vivienda',goals:[],greeting:'',savings:1800,onboarded:true,experience214:'complete',navOrder:['home','expenses','plan','debts','investments','more'],debts:[{id:21601,name:'Tarjeta · ejemplo',balance:450,min:45,apr:18},{id:21602,name:'Computador · ejemplo',balance:900,min:75,apr:5}],expenses:[{id:21603,name:'Vivienda · ejemplo',amount:800,cat:'Casa',date:today,frequency:'monthly'},{id:21604,name:'Café · ejemplo',amount:6,cat:'Hormiga',date:today,frequency:'once'}],calendarEvents:[],payments:[],guide94:{version:203,active:false,completed:true,seen:['home','expenses','plan','debts','investments','more']}}));
 const nativeFetch=window.fetch.bind(window);window.fetch=(input,init={})=>{const request=input instanceof Request?input:null,url=new URL(request?.url||String(input),location.href),method=String(init.method||request?.method||'GET').toUpperCase();if(method==='GET'&&((url.origin===location.origin&&url.pathname.endsWith('/release.json'))||['api.frankfurter.dev','api.frankfurter.app'].includes(url.hostname)))return nativeFetch(input,init);return Promise.reject(Error('Sample preview: account services are disconnected'))};
 window.aryReview216=Object.freeze({active:true});
 const overlay=document.createElement('div');overlay.className='previewLoading216';overlay.textContent='Preparando Premium con datos de ejemplo…';document.body.append(overlay);document.body.classList.add('previewPending216');
 const scripts=JSON.parse(document.getElementById('aryPreviewScripts216').textContent);for(const src of scripts){await new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.src=src;tag.async=false;tag.onload=resolve;tag.onerror=reject;document.body.append(tag)})}
 document.dispatchEvent(new Event('DOMContentLoaded',{bubbles:true}));
 overlay.remove();document.body.classList.remove('previewPending216');window.aryPreviewReady216=true;
}catch{document.body.classList.remove('previewPending216');document.querySelector('.previewLoading216')?.remove();app.innerHTML='<section class="card"><h1>La vista de ejemplo no pudo iniciar</h1><p>Vuelve a abrirla en otra pestaña.</p><a href="index.html">Volver a la aplicación</a></section>'}
})();
