# 005 — Directional Arrow and Press Feedback on Hero Astreinte Link

- **Status**: TODO
- **Commit**: 1c4a172
- **Severity**: LOW
- **Category**: Feedback & Cohesion
- **Estimated scope**: 1 file (`client/src/pages/Home.tsx`), ~8 lines modified

## Problem

In the Hero section's operational card ("Disponibilité Flotte & Équipes"), the urgent dispatch action ("Contacter l'astreinte") includes an `<ArrowRight />` icon that stays completely static on hover and click:

```tsx
/* client/src/pages/Home.tsx:297-307 — current */
<div className="pt-4 border-t border-white/10 flex items-center justify-between">
  <div className="text-xs text-gray-300">
    <span>Un chantier urgent à sécuriser ?</span>
  </div>
  <Link href="/contact">
    <span className="text-xs font-bold text-secondary hover:text-white flex items-center gap-1 cursor-pointer transition-colors">
      Contacter l'astreinte <ArrowRight className="w-3.5 h-3.5" />
    </span>
  </Link>
</div>
```

Elsewhere in the design system (e.g. section 3 CTA at `Home.tsx:359` and `StickyContentWrapper.tsx:377`), directional arrows use `group-hover:translate-x-1` or `group-hover:translate-x-1.5`. The static arrow here breaks design cohesion and misses an opportunity to reinforce directionality on an urgent CTA.

## Target

1. Add `group inline-flex items-center gap-1 select-none` to the link trigger.
2. Add directional translation to the arrow: `transition-transform duration-180 ease-out group-hover:translate-x-1`.
3. Add tactile active press depression: `active:scale-[0.96] transition-transform duration-120`.

```tsx
/* target */
<div className="pt-4 border-t border-white/10 flex items-center justify-between">
  <div className="text-xs text-gray-300">
    <span>Un chantier urgent à sécuriser ?</span>
  </div>
  <Link href="/contact" className="group">
    <span className="text-xs font-bold text-secondary group-hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors duration-150 active:scale-[0.96] select-none">
      Contacter l'astreinte{" "}
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-180 ease-out group-hover:translate-x-1" />
    </span>
  </Link>
</div>
```

## Repo conventions to follow

- Arrow translations on interactive links must be subtle: `translate-x-1` (4px).
- Duration for directional nudges: `150–200ms` with `ease-out`.
- Color transitions use `duration-150` consistent with Tailwind standard tokens.

## Steps

1. In `client/src/pages/Home.tsx`, locate lines 297-307 inside the Hero operational card.
2. Add `className="group"` to the `<Link href="/contact">` component.
3. Update the inner `<span>` to include `group-hover:text-white active:scale-[0.96] select-none`.
4. Add `transition-transform duration-180 ease-out group-hover:translate-x-1` to the `<ArrowRight />` icon.

## Boundaries

- Do NOT change the target route (`/contact`).
- Do NOT alter the card header, badge, or operational counters above.

## Verification

- **Mechanical**:
  - `npm run check` passes with 0 errors.
- **Feel check**:
  - Hover over "Contacter l'astreinte": verify the text shifts to white while the arrow smoothly slides 4px to the right.
  - Press down: verify the link compresses slightly (`0.96`) under the click.
  - Release mouse: verify immediate navigation to `/contact`.
- **Done when**: The astreinte link aligns with BEGEC BTP's directional micro-interaction standard.
