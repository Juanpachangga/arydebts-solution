const assert=require('node:assert/strict'),model=require('./investment-learning-model-v216.js');
assert.deepEqual(model.project({initial:100,monthly:10,months:12,rate:0}),{total:220,contributions:220,change:0});
assert.equal(model.project({initial:100,monthly:0,months:12,rate:12}).total,112.68);
assert.ok(model.project({initial:100,monthly:0,months:12,rate:-12}).total<100);
for(const patch of [{months:0},{months:1.5},{months:481},{initial:-1},{monthly:-1},{rate:21},{rate:-21},{rate:Infinity}])assert.equal(model.project({initial:100,monthly:10,months:12,rate:0,...patch}),null);
for(const rate of [1e-12,-1e-12,1e-14,-1e-14,1e-15])assert.deepEqual(model.project({initial:100,monthly:100,months:480,rate}),{total:48100,contributions:48100,change:0},'Near-zero rates retain every contribution');
for(const rate of [-20,-5,-0.001,0,0.001,5,20]){let reference=123.45;for(let month=0;month<480;month++)reference=reference*(1+rate/1200)+67.89;assert.ok(Math.abs(model.project({initial:123.45,monthly:67.89,months:480,rate}).total-reference)<=0.011,'Projection agrees with independent month-by-month accumulation')}
assert.deepEqual(model.project({initial:200000000,monthly:2000000,months:120,rate:0}),{total:440000000,contributions:440000000,change:0},'COP scenarios retain all deposits');
assert.equal(model.project({initial:1e12,monthly:1e12,months:480,rate:0}),null,'Unsafe aggregate amounts are rejected');
assert.equal(model.project({initial:1e12+1,monthly:0,months:12,rate:0}),null);
console.log('PASS investment learning: contributions, compounding, loss scenarios, invalid ranges.');
