// Background receiver for the future authenticated Web Push service.
// Not registered until the push backend is configured. No financial values on lock screens.
const allowedRoutes89=new Set(['home','calendar','ants','notifications']);
self.addEventListener('push',event=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 const locale=['es','en','pt'].includes(data.locale)?data.locale:'es';
 const generic={es:'Tienes una novedad en Arydebts. Abre la app para verla.',en:'You have an update in Arydebts. Open the app to view it.',pt:'Você tem uma novidade no Arydebts. Abra o app para ver.'}[locale];
 const body=data.type==='tasks'?{es:'Tienes una tarea pendiente. Abre tu calendario en Arydebts.',en:'You have a pending task. Open your Arydebts calendar.',pt:'Você tem uma tarefa pendente. Abra o calendário do Arydebts.'}[locale]:data.type==='morning'?{es:'Buenos días. Un pequeño paso hoy acerca tu tranquilidad de mañana.',en:'Good morning. A small step today brings peace tomorrow.',pt:'Bom dia. Um pequeno passo hoje traz tranquilidade amanhã.'}[locale]:generic;
 const route=allowedRoutes89.has(data.route)?data.route:'notifications';
 const date=typeof data.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(data.date)?data.date:'';
 event.waitUntil(self.registration.showNotification('Arydebts',{body,tag:typeof data.id==='string'?data.id.slice(0,180):'arydebts-update',data:{route,date},renotify:false}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();const data=event.notification.data||{},route=allowedRoutes89.has(data.route)?data.route:'notifications';
 const url=new URL('./index.html',self.registration.scope);url.hash=route;
 // Existing auth guards decide whether the person needs to sign in first.
 event.waitUntil((async()=>{const list=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const client of list){const current=new URL(client.url);if(current.origin===url.origin&&current.pathname.startsWith(new URL(self.registration.scope).pathname)){await client.navigate(url.href);return client.focus()}}return self.clients.openWindow(url.href)})());
});

// Installable web-app fallback. Network pages and account/API responses are never cached.
const shellCache235='arydebts-install-v235';
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(shellCache235);
 await cache.addAll(['./offline.html','./assets/app-icon-192.png']);
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const name of await caches.keys())if(name.startsWith('arydebts-install-')&&name!==shellCache235)await caches.delete(name);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(event.request.method!=='GET'||event.request.mode!=='navigate'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const relative=url.pathname.slice(scope.pathname.length);
 if(relative!==''&&relative!=='index.html')return;
 event.respondWith(fetch(event.request).catch(async()=>await caches.match(new URL('offline.html',scope).href)||Response.error()));
});
