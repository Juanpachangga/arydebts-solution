# Task colors 217.27

Every task can use Blue, Green, Violet, Coral, Amber, Pink, Teal or Gray, with localized names in Spanish, English and Portuguese. The task editor offers named radio choices with checked/focus indicators. A new task suggests the least-used palette color; people may reuse any color for their own grouping.

The selected allowlisted color key is stored on the task record in calendarEvents through the existing atomic save path. Edit, completion, reload, backup and restore retain that field. Legacy or unknown color values receive a deterministic ID-based palette fallback without a storage migration. Failed writes preserve both the saved record and the chosen form draft.

Task rows show the color as a left stripe and a named badge, so meaning does not depend only on hue. Monthly day cells show up to three distinct color dots and an overflow indicator, separate from the existing event-count badge; their accessible label lists the color names. Financial records, reminders and exported calendar behavior remain unchanged. External calendar apps choose their own colors; this palette belongs to Arydebts.

Validation extends the task/reminder browser check with all-tier selection, least-used suggestion, edit rollback/retry, reload persistence, stable legacy fallback and invalid-key handling. The existing reminder, completion, notification preference and ICS checks remain covered in Chromium and WebKit. Layout and label interaction checked at 320, 390 and 1366 px in light/dark and all three locales.
