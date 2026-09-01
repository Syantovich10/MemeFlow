# Flow Pulse Loader Design

## Goal

Add a small, reusable loading indicator that matches MemeFlow's dark violet visual language and can be placed inside compact interface regions without visible text.

## Component

Create `Loader` under `frontend/src/components/UI/Loader/Loader.tsx`.

The component renders three small rounded squares rotated by 45 degrees so they appear as diamonds. Each diamond uses the existing primary violet palette and participates in the same wave animation with a staggered delay.

The public API stays intentionally small:

- Standard `span` attributes are accepted.
- `className` controls placement and external spacing.
- The component has a compact default footprint suitable for buttons, cards, and inline loading states.
- No visible loading text or size-variant API is added.

## Motion

Add a dedicated `flow-pulse` keyframe and utility styling to `frontend/src/app/globals.css`. During the animation, each diamond briefly rises, scales up, and becomes fully opaque before returning to its resting state. Staggered delays create a left-to-right wave.

When `prefers-reduced-motion: reduce` is active, the animation is disabled and the three diamonds remain visible as a static indicator.

## Accessibility

The root element uses `role="status"` and an accessible label. The visible diamonds are decorative and hidden from the accessibility tree. The loader does not announce continuously during animation.

## Initial Integration

Replace the current `return null` loading branch in `PopularSearches` with a centered `Loader`. The surrounding block reserves a small amount of vertical space so loading does not cause a distracting layout jump.

No other loading states are changed in this task. Existing skeleton screens remain appropriate for content-heavy result grids.

## Error Handling

The loader only represents an active request. It does not handle request failures. Existing or future query error UI remains the responsibility of the consuming component.

## Verification

- Run the frontend linter.
- Run a production frontend build.
- Inspect the `PopularSearches` loading state and confirm the indicator is compact, centered, and visually consistent.
- Verify that reduced-motion mode leaves a clear static indicator.

No new test framework will be introduced solely for this component.
