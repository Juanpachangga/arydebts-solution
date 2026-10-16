# Full-day task colors 217.28

Calendar day cells now use a full pastel fill derived from their task colors instead of visible dots. A single color fills the entire cell; multiple task colors share a soft diagonal gradient. Light and dark palettes use separate strengths over readable base colors. Task colors remain allowlisted and persisted by the existing editor.

Day numbers keep high-contrast ink, today is underlined and the selected day retains an outline. Existing event counts remain visible in compact neutral badges. Named color markers remain visually hidden for assistive technology. Days without tasks retain the existing calendar style. All feature tiers share this behavior.

Validation: Chromium and WebKit, single/multiple task colors, 320/390/1366px, light/dark and working date selection. Existing task/reminder browser check also verifies full-cell fills across Simple, Complete and Premium, alongside edit/reload/rollback, reminder and ICS behavior.
