# Arydebts 217.19: installation, appearance and next steps

## Installed web app

The manifest now declares the stable relative app identity, standalone display and 192/512 px icons. Apple devices receive a 180 px touch icon. All icons render the existing half-storm, half-sun planet, including its original ring gradient.

Open **More → Install Arydebts**, or the same action in app preferences:
- Windows/Linux, Chrome: browser menu → Install page as app.
- Edge: browser Apps menu → Install this site as an app.
- macOS Sonoma or later, Safari: File → Add to Dock.
- iPhone/iPad, Safari: Share → Add to Home Screen → Open as Web App when offered.
- Android, Chrome: Add to Home screen / Install app.

The browser controls installation. Arydebts uses a native prompt only after a user clicks Install and the browser has supplied that capability. Bookmarks and pinned tabs remain browser actions; the website cannot silently create them or guarantee that they remain forever.

The service worker stores only the generic offline page and a logo. It uses the network for app navigation and leaves all APIs and financial pages uncached. When an installed app is opened without a connection it shows a retry screen, not an out-of-date financial dashboard. Existing push handlers remain available for the future configured push backend; installation does not enable push subscriptions.

Safari-installed apps may use separate website storage. Existing local data should be backed up before installing or changing origins. Installation does not provide cloud sync.

## Motion and desktop

Feature complexity and motion are independent. Simple no longer forces Lite. Old Simple defaults are migrated to the saved prior Complete motion choice, or Immersive if none exists. Lite remains selectable. Reduced-motion OS settings and hidden tabs pause animation. Four seasonal vector decorations use transform-only motion without financial render loops. The desktop navigation rail now also applies to Simple at 1000 px and above; smaller screens retain their four-tab bar.

## Official investment routes

The existing educational cards retain their official educational sources and now include:
- US savings/CD: Ally's official product pages.
- US Treasury bills: TreasuryDirect account opening.
- US funds/ETFs and REITs: Fidelity's brokerage account information.
- Home preparation: CFPB financing guidance.
- Colombia: Bancolombia investment products.

These are provider examples, not individual recommendations or proof of eligibility. Country filters remain explicit. No amount, identity, or account information is included in the outbound links. Actual account opening, funding and trades happen with each provider. URLs were checked against official provider pages on 2026-10-15; product terms can change.

## Custom domain: waiting for the owner's exact domain

The owner chose a custom domain; no domain has been purchased or configured by this change. Do not create a CNAME for a guessed or unowned name.

When the owner supplies an owned domain:
1. Verify ownership and configure the appropriate DNS records using the current GitHub Pages guidance.
2. Set the domain in Pages and enable HTTPS after DNS validation.
3. Test both root/subdomain behavior, all relative assets and installation scope.
4. Keep a backup of existing local financial data before changing origin, and plan account/data migration.
5. Explain domain renewal and hosting continuity. A custom domain is not a permanent registration.

The current GitHub Pages address remains available.

## Release readiness

Further visual screens are not necessary just to make the app feel larger. Prioritize validating complete user journeys on real devices: account creation/recovery, data export and restoration across devices, Premium checkout/cancellation, and reminders with the app closed. Server/account/subscription/push deployment remains separate from this frontend change.

An installed web app does not create App Store/Google Play listings. Store distribution requires platform packages, developer accounts and each store's review process.

## Verification

- Chromium and WebKit 26.5: Simple/Complete/Premium routes at 320–3840 px; desktop rail separation; live motion; Lite and system reduced motion; installation guide; all icon sizes; three-language investment actions and country filters; unchanged financial records.
- Chromium: service worker registration, network-first navigation, offline fallback and cache contents limited to the offline screen/logo.
- Existing integration, experience tier, atmosphere and refinement checks retained with their updated motion/desktop expectations.

This matrix is evidence for these engines and tested sizes, not a guarantee for every device or browser ever produced.

References:
- https://support.google.com/chrome/answer/9658361
- https://support.microsoft.com/en-us/edge/install-manage-or-uninstall-apps-in-microsoft-edge
- https://support.apple.com/en-us/104996
- https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
