const assert=require('node:assert/strict'),h=require('./investment-history-v201.js');
const growth=h.example(2000,'2020-06-30','2025-06-30');assert.equal(growth.value,5102.6);assert.equal(growth.percent,155.13);
const fall=h.example(2000,'2021-06-30','2022-06-30');assert.equal(Number(fall.value.toFixed(2)),1911.76);assert.equal(Number(fall.percent.toFixed(2)),-4.41);
for(const value of [0,-1,Infinity,NaN,1e13])assert.equal(h.example(value,'2020-06-30','2025-06-30'),null);
assert.equal(h.example(2000,'2025-06-30','2020-06-30'),null);const a=h.series();a[0].index=999;assert.equal(h.series()[0].index,100);
console.log('PASS published historical returns: dividends, five-year total, actual losing year, invalid input and immutable source');
