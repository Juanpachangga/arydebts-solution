// Bundle the ordered repair chain without changing its source modules.
// Native script loaders inserted with async=false execute in insertion order.
// Breadth-first traversal preserves that order and removes serial network trips.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),queue=['unified-theme-v102.js'],seen=new Set(),parts=[];
const loader=/\(\(\)=>\{\s*if\(document\.getElementById\('[^']+'\)\)return;\s*const script=document\.createElement\('script'\);[\s\S]*?document\.body\.appendChild\(script\);\s*\}\)\(\);/g;
while(queue.length){const file=queue.shift();if(seen.has(file))continue;seen.add(file);
 const raw=fs.readFileSync(path.join(root,file),'utf8');
 const source=raw.replace(loader,block=>{const match=block.match(/script\.src='([^'?]+)(?:\?[^']*)?'/);if(!match)throw Error('Unknown loader: '+file);queue.push(match[1]);return ''});
 parts.push('// Source: '+file+'\n'+source+'\n');
}
fs.writeFileSync(path.join(root,'client-repairs.js'),parts.join('\n;\n'));
console.log('Bundled '+seen.size+' ordered modules into one request.');
