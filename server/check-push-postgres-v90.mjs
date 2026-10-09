// Run after check-account-rls-v83.mjs in a disposable CI database only.
import pg from 'pg';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createPostgresPushStore90} from './push-postgres-v90.mjs';
import {createPushDispatcher90} from './push-dispatch-v90.mjs';
import {localClock90} from './push-planner-v90.mjs';
if(process.env.ARY_DISPOSABLE_RLS_TEST!=='yes')throw Error('Disposable database required');
const pool=new pg.Pool({connectionString:process.env.ARY_TEST_DATABASE_URL,max:5});
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222';
const now=new Date(),clock=localClock90(now,'UTC'),today=`${clock.getFullYear()}-${String(clock.getMonth()+1).padStart(2,'0')}-${String(clock.getDate()).padStart(2,'0')}`;
// Morning window starts at the current minute so this test runs at any CI hour.
const prefs={enabled:true,timezone:'UTC',morning:true,payments:false,ants:false,morningTime:`${String(clock.getHours()).padStart(2,'0')}:${String(clock.getMinutes()).padStart(2,'0')}`};
const sub={endpoint:'https://fcm.googleapis.com/fcm/send/synthetic-db',keys:{auth:'synthetic',p256dh:'synthetic'}};
const store=createPostgresPushStore90(pool),state={income:1000,expenses:[],debts:[],payments:[],calendarEvents:[]};
const count=async()=>Number((await pool.query('select count(*) from public.ary_push_jobs')).rows[0].count);
try{
 await pool.query('create role service_role bypassrls');
 await pool.query(await fs.readFile(new URL('../supabase/migrations/20261009160000_push_v90.sql',import.meta.url),'utf8'));
 const client=await pool.connect();try{await client.query('set role service_role');await client.query('select * from public.ary_account_data');await client.query('select * from public.ary_push_jobs');await client.query('reset role');for(const role of ['anon','authenticated']){await client.query('set role '+role);for(const table of ['ary_push_preferences','ary_push_subscriptions','ary_push_jobs'])await assert.rejects(()=>client.query('select * from public.'+table),e=>e.code==='42501');await client.query('reset role')}}finally{client.release()}
 await pool.query('update public.ary_account_data set payload=$1 where user_id=$2',[{state,profile:{name:'Synthetic'}},A]);
 const id=await store.subscribe(A,sub,prefs);
 await assert.rejects(()=>store.subscribe(B,sub,prefs),e=>e.code==='endpoint_owner_conflict');
 await store.unsubscribe(B,sub.endpoint);assert.equal((await pool.query('select user_id from public.ary_push_subscriptions where id=$1',[id])).rows[0].user_id,A);
 await Promise.all([store.schedule(now),store.schedule(now)]);assert.equal(await count(),1,'Concurrent schedulers deduplicate');
 const claims=await Promise.all([store.claim(),store.claim()]);assert.equal(claims.flat().length,1,'Concurrent dispatchers claim only once');
 const job=claims.flat()[0];assert.equal(job.idempotency_key,'morning:'+today);assert.ok(await store.current(job));
 await store.preferences(A,{...prefs,enabled:false});assert.equal(await store.current(job),null,'Opt-out invalidates claimed work');
 await store.finish(job,'accepted');assert.equal((await pool.query('select status from public.ary_push_jobs where id=$1',[job.id])).rows[0].status,'cancelled','Old lease cannot overwrite opt-out');
 await store.preferences(A,prefs);await pool.query('delete from public.ary_push_jobs');await store.schedule(now);const stale=(await store.claim())[0];
 await store.subscribe(A,sub,prefs);assert.equal(await store.current(stale),null,'Subscription revision invalidates old lease');await store.revoke(stale);assert.equal((await pool.query('select * from public.ary_push_subscriptions where id=$1',[id])).rowCount,1,'Stale provider error cannot revoke renewed subscription');
 await pool.query('delete from public.ary_push_jobs');await store.schedule(now);const abandoned=(await store.claim())[0];
 await pool.query("update public.ary_push_jobs set lease_until=now()-interval '1 minute' where id=$1",[abandoned.id]);const recovered=(await store.claim())[0];assert.notEqual(abandoned.lease_token,recovered.lease_token);await store.finish(abandoned,'accepted');assert.ok(await store.current(recovered),'Stale lease cannot finish recovered job');
 await pool.query("update public.ary_push_jobs set attempts=5,lease_until=now()-interval '1 minute' where id=$1",[recovered.id]);assert.equal((await store.claim()).length,0);assert.equal((await pool.query('select status from public.ary_push_jobs where id=$1',[recovered.id])).rows[0].status,'failed','Crashed last attempt terminates');
 await pool.query('delete from public.ary_push_jobs');await store.schedule(now);await pool.query("update public.ary_push_jobs set expires_at=now()-interval '1 second'");assert.equal((await store.claim()).length,0);assert.equal((await pool.query('select status from public.ary_push_jobs')).rows[0].status,'cancelled');
 await pool.query('delete from public.ary_push_jobs');await store.schedule(now);let sent=0;await createPushDispatcher90({store,now:()=>now,sendPush:async()=>{sent++}})();assert.equal(sent,1);assert.equal((await pool.query('select status from public.ary_push_jobs')).rows[0].status,'accepted');
 await store.unsubscribe(A,sub.endpoint);assert.equal(await count(),0,'Unsubscribe cascades queue deletion');
 console.log('PASS PostgreSQL push queue: private tables, owner isolation, concurrent deduplication/claims, opt-out, revision and lease fencing, crash recovery, attempt limit, expiry and unsubscribe. Push transport is simulated; no device was contacted.');
}finally{await pool.end()}
