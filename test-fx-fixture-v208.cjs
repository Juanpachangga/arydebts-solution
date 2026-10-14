// Synthetic parity rates keep legacy UI tests deterministic. Unequal rates have their own suite.
exports.install=async page=>{
 await page.addInitScript(()=>{if(window!==window.top)return;const date=new Date().toISOString().slice(0,10);localStorage.setItem('ary-fx-rates-v208',JSON.stringify({fetchedDate:date,checkedAt:Date.now(),rows:['USD','COP','BRL','PEN','EUR'].map(quote=>({base:'USD',quote,date,rate:1}))}));});
 await page.route('https://api.frankfurter.dev/v2/rates?*',route=>{const date=new Date().toISOString().slice(0,10),quotes=new URL(route.request().url()).searchParams.get('quotes').split(',');return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(quotes.map(quote=>({date,base:'USD',quote,rate:1})))})});
};

