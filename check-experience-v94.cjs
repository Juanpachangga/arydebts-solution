const assert=require('node:assert/strict'),m=require('./experience-model-v94.js');
for(let previous=0;previous<12;previous++)for(const random of [0,.2,.5,.999,1]){const n=m.nextQuote(previous,12,random);assert.notEqual(n,previous);assert.ok(n>=0&&n<12)}
assert.equal(m.nextQuote(-1,12,0),0);assert.equal(m.nextQuote('bad',12,.999),11);assert.equal(m.nextQuote(0,1),0);
assert.equal(m.present(undefined,'home').show,false,'Established accounts are not forced into a guide');
let guide=m.begin();for(const route of m.routes){const next=m.present(guide,route);assert.equal(next.show,true);guide=next.state;assert.equal(m.present(guide,route).show,false,'A shown hint does not repeat after a reload or navigation');guide=m.dismiss(guide)}assert.equal(guide.active,false);
assert.equal(m.present(m.begin(),'setupIncome').show,false,'Data entry setup has no tour yet');assert.equal(m.present(m.end(m.begin()),'home').show,false);
assert.deepEqual(m.present({active:true,seen:['home','home','unknown']},'expenses').state,{active:true,seen:['home','expenses']});
assert.deepEqual(m.begin(),{active:true,seen:[]});console.log('PASS first-use experience: no repeat on visits, invalid route filtering, dismiss, completion, opt-out, explicit replay and non-repeating launch quotes');
