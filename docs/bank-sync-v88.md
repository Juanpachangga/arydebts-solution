# Bank transaction sync: proposed next stage

Status: NOT connected, no bank tokens, no real banking API calls. V88 repairs onboarding row layout only. The public app remains a local prototype, and Supabase Auth/cloud state is still awaiting configuration and UI integration.

## Intended experience

The user connects selected accounts with a financial data provider (proposed: Plaid Transactions + Link). For Chase, the OAuth flow lets the user authorize access. The app reads movements; this proposal does not initiate payments or move money. The server can ingest updates while the app is closed. On return, show newly imported movements, their financial effect, and the last successful update. Do not promise instant ingestion: typical provider update checks are one to four times daily, depending on institution.

## Prerequisites

1. Complete verified Supabase accounts, isolation by authenticated UUID, cloud state, backups/import, and recovery.
2. Create the developer's Plaid account and choose the applicable Trial/Production plan. Confirm bank/product availability in the account's dashboard; do not assume eligibility or approval. Paid plans require the applicable OAuth onboarding.
3. Deploy authenticated server endpoints and a durable webhook/sync worker. GitHub Pages cannot hold bank secrets or execute background sync.
4. Store provider tokens only server-side, encrypted; scope every connection to its authenticated owner. Validate webhook signatures, enforce disconnect/revocation, deletion and consent handling. Never collect bank passwords in Arydebts forms.
5. Review the actual company's privacy, security, provider agreements and applicable legal requirements. Read access and initiating/transmitting payments are distinct scopes; this document does not determine licensing obligations.
6. Exercise Sandbox fixtures before linking any real account; real-account testing requires the owner's deliberate authorization.

## Accounting requirements

- Stable provider transaction IDs, account IDs and connection IDs prevent duplicates on retries.
- Persist added/modified/removed pages and the sync cursor atomically. Distinguish pending from posted and replace linked pending entries rather than counting both. Handle refunds/removals without silently deleting unrelated manual entries.
- Keep imported transactions separate from planned recurring reserves; reconcile a confirmed payment against its matching plan to avoid counting both.
- Purchases on a linked credit card are spending. The matching bank-to-card payment is a transfer/payment, not another copy of those purchases.
- Loan/card repayment detection is not proof of principal reduction. Interest/fees and unmatched account ownership require verified mapping/data or a brief review; never automatically subtract every debit from an arbitrary debt.
- Learn categories only from explicit user choices. Small expenses are configurable; do not label essential rent/phone costs as discretionary based solely on size/name.
- Ask for a quick review only when mapping is uncertain. Corrections must survive later sync updates.

## Official references checked 2026-10-09

- https://plaid.com/docs/transactions/
- https://plaid.com/docs/transactions/transactions-data/
- https://plaid.com/docs/api/products/transactions/
- https://plaid.com/docs/link/oauth/
- https://plaid.com/docs/launch-checklist/
- https://support.plaid.com/hc/en-us/articles/39994173227159-What-is-the-Plaid-Trial-plan

Provider plans/availability may change; recheck the developer dashboard before activation. No secret should be sent in chat or committed to GitHub.
