# Credit-score integration readiness

The Expenses card is an inactive interface until a score provider is approved and connected. USD display currency does not establish US residency. Eligibility, identity verification and consent must be checked server-side.

`server/credit-score-v206.mjs` exports a read-only handler with injected session verification, per-user quota, verified owned consent and owned report readers. It is not a deployed API or a bureau connector. Do not call credit bureaus or expose credentials in browser code.

Before activation:

1. Obtain an approved consumer self-monitoring product and agreement from a credit-report/score provider. Bank balances and card liabilities are separate from an official credit score. Experian Connect's use case and contract must be confirmed for Arydebts; its availability does not imply authorization for personal score monitoring.
2. Deploy authenticated backend hosting and verify US eligibility, identity and current consent. Store provider tokens and bureau identifiers in protected server storage. Enforce ownership/RLS, quotas and consent expiry.
3. Normalize the provider response into a score, scoring model, provider, source report timestamp and every associated positive/negative factor. Supported initial score models are VantageScore 3.0/4.0 and FICO Score 8/9, 300–850. Keep provider-approved factor descriptions in Spanish, English and Portuguese; never invent missing factors.
4. Bind `window.aryCreditService206 = {ready:true, readOwnReport:({signal})=>...}` to the authenticated read-only backend. The request must select the account from the verified session, never from browser-supplied user IDs. A ready response is `{status:'ready',report:{score,minimum:300,maximum:850,model,provider,asOf,factors:[{type:'positive'|'negative',code,descriptions:{es,en,pt}}]}}`.
5. Show the source report date. A successful fetch is not a new bureau score. The UI reads on Expenses entry, supports refresh and the `ary-credit-updated` event, times out after 15 seconds, and clears score data on account changes. Provider cadence determines freshness; never label stale data as real-time.

No credit score is computed from manual debt or expense entries. Scores stay in browser memory, not the application's local financial state. Privacy mode hides the score and factors. The source model and date remain visible.

Primary documentation:

- https://connectapi.experian.com/api/doc/credit-score.html
- https://www.experian.com/connect/api/
- https://plaid.com/docs/liabilities/ (bank liabilities, approximately daily updates)
