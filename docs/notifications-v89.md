# Notifications V89 — current status and activation

## Working now

The bell opens a localized ES/EN/PT notification center. The list is recalculated on saves, every 30 seconds while visible, and when the app regains focus. Dates use the device's local calendar, including daylight saving boundaries. All dated home activity is evaluated (the home preview still shows only four).

- Pending payments due today/tomorrow and dates overdue by at most 30 days. Paid minimums and completed reminders are excluded by the existing activity evaluator.
- Optional, recorded small expenses at or above 5% of monthly income. Reserves, protected essentials, invalid/future/undated expenses are excluded. Unknown income produces no invented percentage. This is budget pressure, not a claim that a bank savings balance fell.
- A recorded-spending reduction of more than 20% across two completed seven-day windows, with at least four recorded days in each. Wording says recorded spending, never verified savings.
- One morning message per local day in the three-hour window starting at the chosen time (default 08:00). No backlog at midnight.
- Categories, time and dismissed IDs persist in the current account state, using existing storage behavior. This is still local mode, not remote account isolation.
- A notification can be dismissed. It does not change payment records or balances. Notifications do not expose amounts when numeric privacy mode is enabled because the message never includes monetary amounts.

## Not activated

Phone/lock-screen delivery is NOT active. GitHub Pages cannot run the scheduled sender. There is no Supabase project, verified account integration, VAPID credential, subscription database, cron job or actual push subscription configured. Do not describe this release as real-time background push.

`push-worker-v89.js` is a tested background receiver prepared for the later service. It is deliberately not registered on production yet. It displays a generic localized message (no names, bill amounts or balances on the lock screen), handles invalid payloads, deduplicates with a tag, and limits clicks to local application routes. The exact calendar date needs integration after login; the current click opens the calendar section. No caching/fetch interception is added.

## Activate after accounts are connected

1. Finish V83 Supabase Auth, per-user data synchronization and RLS first. A local profile email is not a trusted account identity.
2. Create Web Push VAPID keys on the server. Keep the private key in server secrets; only the public key goes to the browser.
3. Add owner-scoped subscription and notification-preference tables. Validate the Auth JWT server-side and derive owner from it; never accept user ID/email as identity. On shared devices allow an endpoint to belong to one verified owner, revoke/rebind on account changes, and unsubscribe on logout. Do not log endpoints or key material.
4. Under an explicit user click, check platform support and request notification permission; on iOS explain adding Arydebts to the Home Screen. Register the worker under the project scope, create `pushManager.subscribe({userVisibleOnly:true, applicationServerKey})`, then store it through the authenticated endpoint. Roll back the local subscription if registration with the server fails. A permission grant alone is not successful activation.
5. Evaluate authoritative saved payment/calendar data on changes. Use a server cron for due dates and morning motivation in the user's saved IANA timezone, not UTC or browser timers. Store the selected time; users decide when morning is, not inferred wake-up detection. Respect categories and quiet hours. Frequency without a known date must not invent a bill deadline.
6. Queue one daily morning message and one due alert per obligation/date/day, plus at most one small-expense alert per day. Claim jobs transactionally with idempotency keys, re-check payment status immediately before sending, retry temporary failures with a cap, remove 404/410 subscriptions, and cancel pending jobs after opt-out/logout. No indefinite backlog or notification bursts.
7. Receiving push is subject to connectivity, OS Focus settings and browser delivery; do not promise exact-second or guaranteed delivery. Bank-related changes can only arrive once the separate bank connection/import has synchronized.
8. Test on real iPhone (Home Screen), Android, Windows and Mac: closed app delivery, permission denied/revoked, account switching, timezones/DST, paid/deleted obligations, network loss/retry, duplicates and opt-out. Verify lock-screen text discloses no financial details.

Sources:
- https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- https://developer.mozilla.org/en-US/docs/Web/API/Push_API
- https://supabase.com/docs/guides/functions/schedule-functions
