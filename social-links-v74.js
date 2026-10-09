/* The owner must configure a real OAuth broker. Public provider homepages do
   not register users in Arydebts, and this adapter never fabricates a session. */
(()=>{
const names={apple:'Apple',google:'Google',facebook:'Facebook',instagram:'Instagram',discord:'Discord'};
const text=()=>({es:{title:'Registro con',pending:'Este proveedor aún no está conectado a Arydebts.',local:'Crear un perfil en este navegador',close:'Cerrar'},en:{title:'Sign up with',pending:'This provider is not connected to Arydebts yet.',local:'Create a profile in this browser',close:'Close'},pt:{title:'Cadastrar com',pending:'Este provedor ainda não está conectado ao Arydebts.',local:'Criar um perfil neste navegador',close:'Fechar'}}[s.locale==='en-US'?'en':s.locale==='pt-BR'?'pt':'es']);
window.arySocialUrl74=provider=>{const key=String(provider||'').toLowerCase(),config=window.aryUIConfig72?.socialAuth;if(!names[key]||!Array.isArray(config?.providers)||!config.providers.includes(key))return'';try{const url=new URL(config.startUrl);if(url.protocol!=='https:'||url.username||url.password)return'';url.searchParams.set('provider',key);url.searchParams.set('returnTo',location.origin+location.pathname+'#welcome');return url.href}catch(e){return''}};
window.arySocial=provider=>{const key=String(provider||'').toLowerCase();if(!names[key])return;const url=arySocialUrl74(key);if(url){location.assign(url);return}const x=text();modal(`<h2>${x.title} ${names[key]}</h2><p>${x.pending}</p><button type="button" class="btn primary widebtn" onclick="closeM();go('signup')">${x.local}</button><button type="button" class="btn widebtn" onclick="closeM()">${x.close}</button>`)};
window.socialDemo=window.arySocial;
})();
