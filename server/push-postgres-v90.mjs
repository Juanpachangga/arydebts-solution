import {planPush90} from './push-planner-v90.mjs';
export function createPostgresPushStore90(pool){
 const tx=async fn=>{const db=await pool.connect();try{await db.query('begin');const result=await fn(db);await db.query('commit');return result}catch(e){await db.query('rollback');throw e}finally{db.release()}};
 const api={
 async subscribe(owner,subscription,preferences){return tx(async db=>{
 const inserted=await db.query(`insert into public.ary_push_subscriptions(user_id,endpoint,subscription) values($1,$2,$3) on conflict(endpoint) do update set subscription=excluded.subscription,revision=ary_push_subscriptions.revision+1 where ary_push_subscriptions.user_id=excluded.user_id returning id`,[owner,subscription.endpoint,subscription]);
 if(!inserted.rowCount)throw Object.assign(Error('endpoint_owner_conflict'),{code:'endpoint_owner_conflict'});
 await db.query('insert into public.ary_push_preferences(user_id,preferences) values($1,$2) on conflict(user_id) do update set preferences=excluded.preferences',[owner,preferences]);
 // Re-subscription changes the transport revision; stale jobs must be cancelled.
 await db.query("update public.ary_push_jobs set status='cancelled',lease_token=null,lease_until=null where subscription_id=$1 and status in ('pending','sending')",[inserted.rows[0].id]);
 return inserted.rows[0].id;
 })},
 async preferences(owner,prefs){return tx(async db=>{await db.query('insert into public.ary_push_preferences(user_id,preferences) values($1,$2) on conflict(user_id) do update set preferences=excluded.preferences',[owner,prefs]);if(!prefs.enabled)await db.query("update public.ary_push_jobs j set status='cancelled',lease_token=null,lease_until=null from public.ary_push_subscriptions s where j.subscription_id=s.id and s.user_id=$1 and j.status in ('pending','sending')",[owner])})},
 async unsubscribe(owner,endpoint){await pool.query('delete from public.ary_push_subscriptions where user_id=$1 and endpoint=$2',[owner,endpoint])},
 async schedule(now=new Date(),after=null,limit=100){
 const rows=await pool.query(`select s.id,s.revision,p.preferences,d.payload->'state' as state from public.ary_push_subscriptions s join public.ary_push_preferences p on p.user_id=s.user_id join public.ary_account_data d on d.user_id=s.user_id where ($1::uuid is null or s.id>$1) order by s.id limit $2`,[after,Math.max(1,Math.min(1000,limit))]);let queued=0;
 for(const row of rows.rows)for(const planned of planPush90(row.state,row.preferences,now))queued+=(await pool.query(`insert into public.ary_push_jobs(subscription_id,subscription_revision,idempotency_key,expires_at,available_at) select id,revision,$2,$3,$4 from public.ary_push_subscriptions where id=$1 and revision=$5 on conflict(subscription_id,idempotency_key) do nothing`,[row.id,planned.key,planned.expiresAt,now,row.revision])).rowCount;
 return {queued,next:rows.rows.length?rows.rows.at(-1).id:null};
 },
 async claim(limit=25){return tx(async db=>{
 await db.query("update public.ary_push_jobs set status='cancelled',lease_token=null,lease_until=null where status in ('pending','sending') and expires_at<=now()");
 await db.query("update public.ary_push_jobs set status='failed',lease_token=null,lease_until=null where attempts>=5 and (status='pending' or (status='sending' and lease_until<now()))");
 return (await db.query(`with selected as (select id from public.ary_push_jobs where attempts<5 and expires_at>now() and ((status='pending' and available_at<=now()) or (status='sending' and lease_until<now())) order by available_at for update skip locked limit $1) update public.ary_push_jobs j set status='sending',attempts=j.attempts+1,lease_token=gen_random_uuid(),lease_until=now()+interval '2 minutes' from selected where j.id=selected.id returning j.*`,[Math.max(1,Math.min(100,limit))])).rows;
 })},
 async current(job){const row=(await pool.query(`select s.subscription,p.preferences,d.payload->'state' as state from public.ary_push_jobs j join public.ary_push_subscriptions s on s.id=j.subscription_id join public.ary_push_preferences p on p.user_id=s.user_id join public.ary_account_data d on d.user_id=s.user_id where j.id=$1 and j.lease_token=$2 and j.status='sending' and j.subscription_revision=s.revision`,[job.id,job.lease_token])).rows[0];return row||null},
 async finish(job,status){await pool.query("update public.ary_push_jobs set status=$3,lease_token=null,lease_until=null where id=$1 and lease_token=$2 and status='sending'",[job.id,job.lease_token,status])},
 async retry(job,when){await pool.query("update public.ary_push_jobs set status='pending',available_at=$3,lease_token=null,lease_until=null where id=$1 and lease_token=$2 and status='sending'",[job.id,job.lease_token,when])},
 async revoke(job){await pool.query('delete from public.ary_push_subscriptions where id=$1 and revision=$2',[job.subscription_id,job.subscription_revision])},
 async prune(){await pool.query("delete from public.ary_push_jobs where expires_at<now()-interval '45 days'")}
 };return api;
}
