# 002 — Sliding Active Pill and Tactile Press Feedback on Category Filter Tabs

- **Status**: TODO
- **Commit**: 1c4a172
- **Severity**: MEDIUM
- **Category**: Feedback & Spatial consistency
- **Estimated scope**: 1 file (`client/src/pages/Home.tsx`), ~20 lines modified

## Problem

The portfolio category filter tabs currently toggle using static CSS class swaps with `transition-all`. The active background color (`bg-secondary`) teleports abruptly between buttons, giving no sense of continuous selection. Additionally, the buttons lack physical `:active` feedback: when tapped or clicked, the tab does not depress, leaving the user with no tactile acknowledgment that the click registered before the state change takes effect.

```tsx
/* client/src/pages/Home.tsx:384-396 — current */
<div className="flex flex-wrap gap-2">
  {["Tous", "Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === cat
        ? "bg-secondary text-white shadow-md shadow-secondary/20"
        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        }`}
    >
      {cat}
    </button>
  ))}
</div>
```

## Target

1. Implement a shared sliding pill indicator using Framer Motion's `<motion.span layoutId="activeCategoryPill" />`.
2. Apply an Apple-style spring for the gliding pill: `{ type: "spring", stiffness: 450, damping: 35 }`.
3. Add tactile active press depression: `active:scale-[0.97]` over `140ms` with `cubic-bezier(0.23, 1, 0.32, 1)`.
4. Replace indiscriminate `transition-all` with targeted `transition-colors duration-150` on the text and hover states.
5. Provide reduced-motion fallback: if `shouldReduceMotion` is enabled, disable `layoutId` and swap backgrounds instantly.

```tsx
/* target */
<div className="flex flex-wrap gap-2">
  {["Tous", "Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement"].map((cat) => {
    const isActive = selectedCategory === cat;
    return (
      <button
        key={cat}
        type="button"
        onClick={() => setSelectedCategory(cat)}
        className={`relative px-4 py-2 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-150 active:scale-[0.97] transition-transform select-none ${
          isActive
            ? "text-white"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        }`}
      >
        {isActive && (
          <motion.span
            layoutId={shouldReduceMotion ? undefined : "activeCategoryPill"}
            className="absolute inset-0 bg-secondary rounded-lg shadow-md shadow-secondary/20 -z-0"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}
        <span className="relative z-10">{cat}</span>
      </button>
    );
  })}
</div>
```

## Repo conventions to follow

- Secondary orange token: `bg-secondary` (`hsl(28.02 100% 47.45%)`) with glow shadow `shadow-md shadow-secondary/20`.
- Spring values: `stiffness: 450, damping: 35` for responsive mechanical snap without wobble, consistent with industrial engineering aesthetics.
- Active press scale: `0.97` with standard duration under `160ms`.

## Steps

1. In `client/src/pages/Home.tsx`, ensure `useReducedMotion` is available in scope (`const shouldReduceMotion = useReducedMotion()`).
2. Locate lines 384-396 containing `{["Tous", "Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement"].map((cat) => ...)}`.
3. Replace the static button markup with the targeted structure above:
   - Add `relative` and `active:scale-[0.97] transition-transform` to the button.
   - Separate the text label into `<span className="relative z-10">{cat}</span>`.
   - Render `<motion.span layoutId={shouldReduceMotion ? undefined : "activeCategoryPill"} ... />` conditionally when `selectedCategory === cat`.
4. Ensure `type="button"` is explicitly set to prevent unintended form submissions.

## Boundaries

- Do NOT change the categories list array (`["Tous", "Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement"]`).
- Do NOT change the parent layout container or title styling.
- Do NOT add external dependencies.

## Verification

- **Mechanical**:
  - `npm run check` or `npx tsc --noEmit` succeeds with no type errors.
  - No React console warnings about duplicate `layoutId` keys.
- **Feel check**:
  - Click on "Bâtiment", then "Terrassement", then "Tous".
  - Observe the orange pill smoothly sliding and reshaping between buttons rather than flashing on and off.
  - Press down and hold a button without releasing: verify the button scales down to `0.97`, confirming the press physically before releasing.
  - Rapidly switch back and forth: confirm the spring interrupts seamlessly without popping or resetting to zero.
- **Done when**: Category tabs feel like a cohesive segmented control with immediate physical press feedback and smooth pill translation.
