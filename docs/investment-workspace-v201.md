# Investment workspace activation

## Current implementation

Portfolio and Market are two views on the Investments route. Recorded budget savings are separate from brokerage funds. Ten issuer identity assets are copied unchanged from official sites; sources are recorded in `assets/investments/sources.json`. Company links go to official investor relations. Watchlists and Ary guide dismissal remain scoped to the authenticated local user; no educational action changes savings, payments or debt records.

The Market view embeds TradingView's original market overview, selected-stock chart and symbol-specific news. Frames are hosted on the provider origin and sandboxed; no external script executes in the Arydebts page origin, and no user identifiers or financial data are passed to widgets. Data is explicitly labeled delayed. Direct source links remain available above the chart if the provider fails or embedding is blocked. These widgets are not a trading connection or a source of brokerage balances. Preserve attribution; do not scrape the frames or treat personal TradingView subscriptions as redistribution rights.

More is always the last navigation item, including repaired state, imported backups, customization arrows, long-press saved orders and keyboard reorder. Other tabs remain reorderable.

## Historical education

`investment-history-v201.js` contains the Microsoft FY2025 annual-report total-return indices: 2020-06-30 100.00, 2021-06-30 134.41, 2022-06-30 128.48, 2023-06-30 172.01, 2024-06-30 227.51, 2025-06-30 255.13. The report assumes dividends reinvested.

Initial USD2000 over 2020-06-30 to 2025-06-30 scales to USD5102.60 (+155.13% over five years). USD2000 over 2021-06-30 to 2022-06-30 scales to USD1911.76 (-4.41%). This is an educational scaling of actual published historical data, not an actual person's trade, annual fixed interest rate, price quote, trading recommendation or forecast. Personal taxes, fees and FX are not applied.

Source: https://www.microsoft.com/investor/reports/ar25/index.html

## Required external activation

1. Register for Broker API sandbox at https://broker-app.alpaca.markets/ and request a commercial evaluation at https://alpaca.markets/broker-contact-form. Provider choice, production approval and eligibility for US/Colombia/Brazil remain unconfirmed.
2. Obtain written account/custody/KYC/funding/withdrawal requirements and market-data redistribution rights. Live IEX covers one exchange; live SIP is consolidated and needs the appropriate entitlement. Do not assume a retail subscription covers all Arydebts users.
3. Deploy HTTPS backend services with verified identity, per-owner broker bindings, quotas, secret storage and audit records. Existing `server/investment-readiness-v200.mjs` is read-only and does not enable trades.
4. Add genuine portfolio/positions/cash/history, market streams with timestamp/feed/stale status, reviewed and confirmed orders, idempotency, execution events and reconciled transfers. Never count an accepted unfilled order as ownership or sales proceeds as immediately withdrawable funds.
5. Test sandbox cases, complete provider production approval and enable buy/sell/deposit/withdraw only for eligible accounts with provider-reported capabilities. Round-ups and recurring investment actions are also pending support and user consent.

Primary documentation checked 2026-10-12:
- https://docs.alpaca.markets/us/docs/getting-started-with-broker-api
- https://docs.alpaca.markets/us/docs/market-data-faq
- https://docs.alpaca.markets/us/docs/real-time-stock-pricing-data
- https://docs.alpaca.markets/us/docs/funding-accounts
- https://www.tradingview.com/widget-docs/faq/data/
- https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/widget-integration/
