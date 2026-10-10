const assert=require('node:assert/strict'),{load,normalize,KEY,ARCHIVE}=require('./state-guard-v104.js');
const defaults={name:'',goal:'',greeting:'',currency:'USD',locale:'es-US',theme:'dark',mode:'immersive',income:0,incomeFrequency:'monthly',savings:0,goals:[],navOrder:['home'],debts:[],expenses:[],payments:[],calendarEvents:[]};
const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
const debt={id:3,name:'My card',balance:912.34,min:45};
const original=JSON.stringify({income:1000,debts:[debt,null],expenses:null,locale:'broken_locale',currency:'bad',goals:'bad'});data.set(KEY,original);
let result=load(storage,defaults);assert.equal(result.repaired,true);assert.deepEqual(result.state.debts,[debt]);assert.equal(result.state.income,1000);assert.deepEqual(result.state.expenses,[]);assert.equal(result.state.currency,'USD');assert.equal(data.get(KEY),original,'Loading never overwrites the financial state');assert.equal(JSON.parse(data.get(ARCHIVE))[0].raw,original);
load(storage,defaults);assert.equal(JSON.parse(data.get(ARCHIVE)).length,1,'Repeated recovery deduplicates the original');
data.set(KEY,JSON.stringify({...result.state,extra:'retained'}));result=load(storage,defaults);assert.equal(result.repaired,false);assert.equal(result.state.extra,'retained');
const reversed=Object.fromEntries(Object.entries(result.state).reverse());data.set(KEY,JSON.stringify(reversed));assert.equal(load(storage,defaults).repaired,false,'Key ordering is not corruption');
for(const raw of ['{broken','42','[]','null']){data.set(KEY,raw);assert.equal(load(storage,defaults).repaired,true);assert.equal(JSON.parse(data.get(ARCHIVE))[0].raw,raw);assert.equal(data.get(KEY),raw);}
assert.equal(JSON.parse(data.get(ARCHIVE)).length,3);
data.set(KEY,'{broken');data.delete(ARCHIVE);assert.throws(()=>load({getItem:storage.getItem,setItem(){throw Error('quota')}},defaults));assert.equal(data.get(KEY),'{broken','Do not continue with a replacement if the original cannot be retained');
assert.deepEqual(normalize({...defaults,debts:[debt],mode:'lite'},defaults).debts,[debt]);assert.equal(normalize({...defaults,locale:'broken_locale',currency:'COP'},defaults).currency,'COP','A damaged language preference must not change the currency');console.log('PASS local state recovery: malformed JSON, legacy missing lists, null records, invalid locale/currency, original retention, metadata preservation, deduplication and quota protection');
