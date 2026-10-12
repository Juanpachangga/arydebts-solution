/* Exact input text formatting; the established financial engine remains numeric. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.aryInstant197=api})(typeof globalThis!=='undefined'?globalThis:this,function instantFactory197(){
'use strict';
const punctuation=locale=>/^(es|pt)/.test(locale||'es')?{group:'.',decimal:','}:{group:',',decimal:'.'};
function number(raw,locale='es-US',pasted=true){
 const {group,decimal}=punctuation(locale);let text=String(raw??'').trim();if(!/^-?\d[\d.,'’]*$/.test(text))return null;
 const negative=text[0]==='-';text=text.replace(/^-/,'');let sep=decimal;
 if(pasted){const dots=(text.match(/\./g)||[]).length,commas=(text.match(/,/g)||[]).length;
  if(dots&&commas)sep=text.lastIndexOf('.')>text.lastIndexOf(',')?'.':',';
  else if(!text.includes(decimal)&&text.includes(group)&&!/^[1-9]\d{0,2}(?:[.,]\d{3})+$/.test(text))sep=group;
 }
 if(text.split(sep).length>2)return null;
 const at=text.indexOf(sep),integerText=at<0?text:text.slice(0,at),fractionText=at<0?'':text.slice(at+1);
 if(pasted&&(!/^\d+$/.test(integerText)&&!/^\d{1,3}([.,'’])\d{3}(?:\1\d{3})*$/.test(integerText)||!/^[0-9]*$/.test(fractionText)))return null;
 const whole=integerText.replace(/[.,'’]/g,''),fraction=fractionText.replace(/[.,'’]/g,'');
 if(!/^\d+$/.test(whole)||!/^\d*$/.test(fraction))return null;
 const digits=BigInt(whole).toString(),canonical=(negative?'-':'')+digits+(at<0?'':'.'+fraction),formatted=(negative?'-':'')+digits.replace(/\B(?=(\d{3})+(?!\d))/g,group)+(at<0?'':decimal+fraction);
 return{canonical,formatted,value:Number(canonical),approximate:Math.abs(Number(canonical))>Number.MAX_SAFE_INTEGER/100};
}
function split(value){const text=String(value??'');let match=text.match(/^(\s*(?:[$€£]|R\$)?\s*)(-?\d[\d.,'’]*)([\s\S]*)$/i);if(match&&(!match[3]||/^\s/.test(match[3])))return{before:match[1],raw:match[2],after:match[3],name:match[3].trim()};match=text.match(/^(.+?\s+)(?:[$€£]|R\$)?\s*(-?\d[\d.,'’]*)(\s*)$/i);return match?{before:match[1],raw:match[2],after:match[3],name:match[1].trim()}:null}
function format(value,locale,pasted=false){const parts=split(value);if(!parts)return String(value??'');const n=number(parts.raw,locale,pasted);return n?parts.before+n.formatted+parts.after:String(value??'')}
function parse(value,locale){const parts=split(value),n=parts&&number(parts.raw,locale,true);if(!n||!parts.name||parts.name.length>120||!Number.isFinite(n.value)||n.value<=0)return null;return{name:parts.name,amount:n.value,amountText197:n.canonical,approximate197:n.approximate}}
return{punctuation,number,split,format,parse};
});
