/* Decimal addition/subtraction without binary rounding leftovers. No currency conversion. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryMoney108=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function parts(value){
  const n=Number(value);if(!Number.isFinite(n))throw new RangeError('Non-finite amount');
  const [mantissa,power='0']=String(n).split('e'),[whole,fraction='']=mantissa.split('.');
  return {units:BigInt(whole+fraction),exponent:Number(power)-fraction.length};
 }
 function combine(a,b,subtract=false){
  const x=parts(a),y=parts(b),exponent=Math.min(x.exponent,y.exponent);
  const left=x.units*10n**BigInt(x.exponent-exponent),right=y.units*10n**BigInt(y.exponent-exponent);
  return Number(String(subtract?left-right:left+right)+'e'+exponent);
 }
 return Object.freeze({add:(a,b)=>combine(a,b),subtract:(a,b)=>combine(a,b,true)});
});
