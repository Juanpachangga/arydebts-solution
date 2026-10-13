// Public provider smoke test: sends currency codes only, never customer information.
import {createRequire} from 'node:module';
const fx=createRequire(import.meta.url)('../currency-model-v208.js');
const url='https://api.frankfurter.dev/v2/rates?base=USD&quotes=COP,BRL,PEN';
let last;
for(let attempt=0;attempt<2;attempt++){
 try{
  const response=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{Accept:'application/json',Origin:'https://juanpachangga.github.io'}});
  if(!response.ok)throw Error('Provider HTTP '+response.status);
  const cors=response.headers.get('access-control-allow-origin');if(!['*','https://juanpachangga.github.io'].includes(cors))throw Error('Provider does not allow browser CORS');
  const raw=await response.text();if(raw.length>50000)throw Error('Unexpected response size');
  const table=fx.rates(JSON.parse(raw),new Date().toISOString().slice(0,10));
  for(const code of ['COP','BRL','PEN'])if(!table[code])throw Error('Missing '+code+' reference rate');
  console.log('PASS public Frankfurter daily USD/COP/BRL/PEN response, dates, positive rates and browser CORS');process.exit(0);
 }catch(error){last=error;}
}
console.error('Daily FX provider verification failed:',last.message);process.exitCode=1;
