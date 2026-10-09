// Runs only against the disposable PostgreSQL CI service, never a user's project.
import pg from 'pg';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
if(process.env.ARY_DISPOSABLE_RLS_TEST!=='yes')throw new Error('Disposable test database required');
const db=new pg.Client({connectionString:process.env.ARY_TEST_DATABASE_URL});await db.connect();
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222';
const data={state:{debts:[],expenses:[],payments:[],calendarEvents:[]},profile:{name:'Synthetic'}};
async function as(role,id,anonymous=false){await db.query('reset role');await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:id,is_anonymous:anonymous})]);await db.query('set role '+role)}
try{
 await db.query(`create role anon;create role authenticated;create schema auth;grant usage on schema auth to anon,authenticated;create table auth.users(id uuid primary key);create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;create function auth.uid() returns uuid language sql stable as $$select (auth.jwt()->>'sub')::uuid$$`);
 await db.query('insert into auth.users(id) values ($1),($2)',[A,B]);
 await db.query(await fs.readFile(new URL('../supabase/migrations/20261009130000_accounts_v83.sql',import.meta.url),'utf8'));
 await as('anon',null);await assert.rejects(()=>db.query('select * from public.ary_account_data'),e=>e.code==='42501');
 await as('authenticated',A);await db.query('insert into public.ary_account_data(user_id,payload) values ($1,$2)',[A,data]);
 await assert.rejects(()=>db.query('insert into public.ary_account_data(user_id,payload) values ($1,$2)',[B,data]),e=>e.code==='42501');
 await as('authenticated',B);assert.equal((await db.query('select * from public.ary_account_data where user_id=$1',[A])).rowCount,0);
 assert.equal((await db.query('update public.ary_account_data set revision=2 where user_id=$1',[A])).rowCount,0);
 assert.equal((await db.query('delete from public.ary_account_data where user_id=$1',[A])).rowCount,0);
 await db.query('insert into public.ary_account_data(user_id,payload) values ($1,$2)',[B,data]);
 await assert.rejects(()=>db.query('update public.ary_account_data set user_id=$1 where user_id=$2',[A,B]),e=>e.code==='42501');
 await as('authenticated',A,true);assert.equal((await db.query('select * from public.ary_account_data')).rowCount,0);
 await as('authenticated',A);await assert.rejects(()=>db.query('update public.ary_account_data set payload=$1 where user_id=$2',[{profile:{}},A]),e=>e.code==='23514');
 assert.equal((await db.query('update public.ary_account_data set revision=revision+1 where user_id=$1 and revision=1 returning revision',[A])).rows[0].revision,'2');
 assert.equal((await db.query('update public.ary_account_data set revision=revision+1 where user_id=$1 and revision=1 returning revision',[A])).rowCount,0);
 assert.equal((await db.query('select * from public.ary_account_data')).rows[0].user_id,A);
 console.log('PASS PostgreSQL RLS: anonymous denied; A/B read, insert, update, owner changes and deletion isolated; anonymous Auth denied; schema constraints and revision conflicts enforced. Auth JWT functions are CI fixtures, not production Auth tests.');
}finally{await db.end()}
