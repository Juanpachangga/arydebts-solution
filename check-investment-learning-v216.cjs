const assert=require('node:assert/strict'),model=require('./investment-learning-model-v216.js');
assert.deepEqual(model.project({initial:100,monthly:10,months:12,rate:0}),{total:220,contributions:220,change:0});
assert.equal(model.project({initial:100,monthly:0,months:12,rate:12}).total,112.68);
assert.ok(model.project({initial:100,monthly:0,months:12,rate:-12}).total<100);
for(const patch of [{months:0},{months:1.5},{months:481},{initial:-1},{monthly:-1},{rate:21},{rate:-21},{rate:Infinity}])assert.equal(model.project({initial:100,monthly:10,months:12,rate:0,...patch}),null);
console.log('PASS investment learning: contributions, compounding, loss scenarios, invalid ranges.');
