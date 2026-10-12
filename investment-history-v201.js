/* Historical total returns published in Microsoft's FY2025 annual report.
 * USD100 invested 2020-06-30, dividends reinvested. Not a price feed or forecast. */
(function(root){
 'use strict';
 const series=[{date:'2020-06-30',index:100},{date:'2021-06-30',index:134.41},{date:'2022-06-30',index:128.48},{date:'2023-06-30',index:172.01},{date:'2024-06-30',index:227.51},{date:'2025-06-30',index:255.13}];
 const source='https://www.microsoft.com/investor/reports/ar25/index.html';
 function example(amount,start,end){amount=Number(amount);const a=series.find(x=>x.date===start),b=series.find(x=>x.date===end);if(!Number.isFinite(amount)||amount<=0||amount>1e12||!a||!b||end<=start)return null;const value=amount*b.index/a.index;return{amount,value,gain:value-amount,percent:(b.index/a.index-1)*100,start,end,source};}
 function scenario(amount,percent){amount=Number(amount);percent=Number(percent);if(!Number.isFinite(amount)||amount<=0||amount>1e12||!Number.isFinite(percent)||percent< -100||percent>1e6)return null;const gain=amount*percent/100;return{amount,value:amount+gain,gain,percent};}
 const api={scenario,series:()=>series.map(x=>({...x})),example,source};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.aryInvestmentHistory201=api;
})(typeof window==='undefined'?globalThis:window);
