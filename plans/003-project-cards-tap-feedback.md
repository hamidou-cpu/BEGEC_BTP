# 003 — Touch Press Feedback and Hover Gating on Project Reference Cards

- **Status**: TODO
- **Commit**: 1c4a172
- **Severity**: MEDIUM
- **Category**: Feedback & Physicality
- **Estimated scope**: 1 file (`client/src/pages/Home.tsx`), ~15 lines modified

## Problem

The project showcase cards define a desktop elevation on mouse hover (`whileHover={{ y: -6 }}`), but have zero press response (`whileTap`). When tapped on mobile devices or clicked on desktop, the surface does not yield, feeling unresponsive and rigid.

Furthermore, on mobile devices, touch taps trigger a synthetic hover event that locks the card into its raised state (`y: -6`) even after releasing ("sticky hover bug").

```tsx
/* client/src/pages/Home.tsx:409-418 — current */
<motion.div
  key={project.id}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: i * 0.1 }}
  whileHover={{ y: -6 }}
  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-slate-900 cursor-pointer border border-border"
>
```

## Target

1. Add explicit tactile press depression: `whileTap={{ scale: 0.985 }}` over `120ms` with `cubic-bezier(0.23, 1, 0.32, 1)`.
2. Keep the scale subtle (between `0.98` and `0.99`) so large 4/3 image cards compress slightly under pressure without warping child text.
3. Gate hover lift so it behaves cleanly across touch and desktop interfaces.

```tsx
/* target */
<motion.div
  /* ...layout and entrance props... */
  whileHover={{ y: -6 }}
  whileTap={{ scale: 0.985 }}
  transition={{
    scale: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
    y: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
  }}
  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-slate-900 cursor-pointer border border-border select-none"
>
```

## Repo conventions to follow

- Micro-interaction durations for button/card clicks must stay within the standard budget: `100–160ms`.
- Standard curve: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Never `scale(0)` or large downscales (`< 0.95`) on content-heavy cards.

## Steps

1. In `client/src/pages/Home.tsx`, locate the project card `<motion.div>` in the portfolio grid (around line 415).
2. Add `whileTap={{ scale: 0.985 }}`.
3. In the card's `transition` property, define `scale: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }` to ensure the compression and release feel snappy and physical.
4. Add `select-none` to the card className to prevent accidental text selection during touch drags or taps.

## Boundaries

- Do NOT alter card children (image zoom `group-hover:scale-105`, dark gradient, badges, or title typography).
- Do NOT alter the card link or navigation targets.
- Can be applied concurrently with plan `001-project-grid-filter-transitions.md`.

## Verification

- **Mechanical**:
  - Run `npm run check` to ensure Framer Motion props pass TypeScript validation.
- **Feel check**:
  - Click down and hold on any project card: notice the subtle `0.985` compression under the mouse/finger.
  - Release the click: notice the card snaps back smoothly within `120ms`.
  - In Chrome DevTools Device Mode (touch emulation), tap a card: confirm it depresses on touch without sticking in an awkward hover state.
- **Done when**: Project cards respond immediately to touch and click presses with an intentional, subtle tactile compression.
