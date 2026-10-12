# Real stock purchases and withdrawals: activation still required

The deployed Investments page displays manually recorded savings, an informational stock catalog and a per-user watchlist. It does not claim a real brokerage balance, live prices, owned shares, profits, orders or bank transfers. Buy and Withdraw are disabled. Savings in the budget are not brokerage buying power. Existing expense history and payments are never deleted by this feature.

For actual operations, Arydebts needs a contracted brokerage provider, an approved production application and a deployed HTTPS backend. Alpaca Broker API is a candidate for embedded stocks; provider/country eligibility must be confirmed for the intended customers. Binance stock products/API and regional availability must be evaluated separately; tokens and direct securities are not interchangeable.

1. Select and contract the provider for the target countries, then complete its production integration requirements. Do not place production credentials in GitHub Pages or localStorage.
2. Deploy a server with verified sessions and per-user authorization. Bind each brokerage account to the authenticated user on the server. Never accept the account owner from browser parameters.
3. Add provider account opening, required identity verification, disclosures and account-status handling. Sandbox identity data is not approval for a live account.
4. Connect market data with its entitlement, timestamp and currency. Show actual broker buying power separately from savings entered in Arydebts.
5. Add reviewed order previews, explicit user confirmation, allowed assets, order validation, idempotency, audit events and reconciliation of executions. Do not count an unfilled order as an owned position.
6. Add funding and withdrawals using verified linked accounts and provider-reported withdrawable/settled cash. Handle pending/failed transfers, fees, currency and settlement; sale proceeds are not automatically cash ready to withdraw.
7. Test in the provider sandbox, finish its production approval, then enable capabilities only for eligible verified accounts. The current read-only readiness adapter deliberately exposes neither orders nor transfers.

Primary sources checked 2026-10-12:
- https://docs.alpaca.markets/us/docs/getting-started-with-broker-api
- https://docs.alpaca.markets/us/docs/funding-accounts
- https://developers.binance.com/en/docs/catalog/advanced-trading-stocks-trading/api/rest-api/market-data
- https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks

Monthly small-expense policy is a view and budgeting lifecycle: records remain in the expense ledger for monthly history and annual comparisons. Small recurring expenses tagged to a month stop reserving budget in later months; essential/variable recurring commitments continue. Legacy undated records receive an observed display month without inventing a payment date. History does not imply a recurring reserve was actually paid.
