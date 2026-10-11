// Read untrusted bodies incrementally so size limits apply before buffering.
export class RequestBodyError extends Error {
 constructor(status){super('Invalid request body');this.status=status}
}
export async function readRequestJSON(request,maxBytes){
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type')||''))throw new RequestBodyError(415);
 const reader=request.body?.getReader();if(!reader)throw new RequestBodyError(400);
 let size=0;const chunks=[];
 try{
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;
   if(size>maxBytes){void reader.cancel().catch(()=>{});throw new RequestBodyError(413)}chunks.push(value);
  }
 }catch(error){if(error instanceof RequestBodyError)throw error;throw new RequestBodyError(400)}finally{reader.releaseLock()}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
 try{const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error();return value;
 }catch{throw new RequestBodyError(400)}
}
