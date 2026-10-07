# Arydebts Solution — Clean Rebuild Contract

## Rule
The approved nine-screen montage is the visual specification, not inspiration. Do not merge to main until the clean rebuild passes navigation and interaction review.

## Screen order
1. Welcome / premium world hero
2. Goals onboarding
3. Dashboard
4. Debts
5. Add/edit debt
6. Expenses
7. Ant expenses
8. Calendar
9. Assistant
10. Plan / progress / savings / profile using the same system

## Architecture
- State and calculations stay independent from rendering.
- Screens may read/write through actions only.
- Modals must never intercept pointer events while hidden.
- Every visible CTA must have an action or an explicitly disabled state.
- Back navigation on every multi-step flow.
- Desktop uses a centered mobile shell; mobile uses full viewport.
- No emoji/CSS substitute for the cinematic hero artwork in release builds.

## Acceptance gates before merge
- Welcome CTA, login and language controls work.
- Onboarding supports back/forward without losing values.
- Debt CRUD works with arbitrary typed values.
- Expense CRUD and one-tap ant expense work.
- Calendar dates are selectable and display matching payments.
- Currency changes update displayed values consistently.
- Bottom navigation reaches every primary section.
- Enter submits assistant chat on desktop.
- No invisible overlays block clicks.
- Layout checked at narrow mobile and desktop widths.
