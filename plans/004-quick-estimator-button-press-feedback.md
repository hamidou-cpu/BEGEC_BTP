# 004 — Active Press Feedback and Targeted Transitions on Quick Estimator Buttons

- **Status**: TODO
- **Commit**: 1c4a172
- **Severity**: LOW
- **Category**: Feedback & Performance
- **Estimated scope**: 1 file (`client/src/pages/Home.tsx`), ~25 lines modified

## Problem

The interactive quick quotation simulator ("Planificateur Rapide de Chantier") features two sets of four option buttons: "Type d'intervention prioritaire" and "Surface estimative du terrain".

Currently, all eight buttons use `transition-all`. As noted in Emil Kowalski's animation rules, `transition: all` triggers browser recalculations on unintended properties off-GPU and introduces sluggishness. Furthermore, these buttons provide zero tactile press response (`:active`): clicking or tapping them updates the border color, but the element feels flat and unresponsive under pressure.

```tsx
/* client/src/pages/Home.tsx:509-543 — current */
{["Construction Bâtiments", "Ponts & Chaussées", "Terrassement", "Assainissement & Eau"].map((srv) => (
  <button
    key={srv}
    type="button"
    onClick={() => setQuickService(srv)}
    className={`text-xs p-3 rounded-lg border font-semibold text-left transition-all ${quickService === srv
      ? "border-secondary bg-secondary/10 text-secondary font-bold"
      : "border-border text-foreground hover:bg-muted"
      }`}
  >
    {srv}
  </button>
))}

/* and volume buttons: */
{["< 500 m²", "500 à 2 000 m²", "2 000 à 10 000 m²", "> 10 000 m²"].map((vol) => (
  <button
    key={vol}
    type="button"
    onClick={() => setQuickVolume(vol)}
    className={`text-xs p-3 rounded-lg border font-semibold text-left transition-all ${quickVolume === vol
      ? "border-secondary bg-secondary/10 text-secondary font-bold"
      : "border-border text-foreground hover:bg-muted"
      }`}
  >
    {vol}
  </button>
))}
```

## Target

1. Replace `transition-all` with targeted transitions: `transition-[color,background-color,border-color,box-shadow,transform] duration-140 ease-out`.
2. Add physical mechanical press feedback: `active:scale-[0.97]`.
3. Add subtle focus ring indicator: `focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none`.
4. Enhance the selected state with a subtle shadow glow: `shadow-sm shadow-secondary/15`.

```tsx
/* target for service options */
{["Construction Bâtiments", "Ponts & Chaussées", "Terrassement", "Assainissement & Eau"].map((srv) => {
  const isSelected = quickService === srv;
  return (
    <button
      key={srv}
      type="button"
      onClick={() => setQuickService(srv)}
      className={`text-xs p-3 rounded-lg border font-semibold text-left select-none transition-[color,background-color,border-color,box-shadow,transform] duration-140 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none ${
        isSelected
          ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm shadow-secondary/15"
          : "border-border text-foreground hover:bg-muted hover:border-border/80"
      }`}
    >
      {srv}
    </button>
  );
})}

/* target for volume options */
{["< 500 m²", "500 à 2 000 m²", "2 000 à 10 000 m²", "> 10 000 m²"].map((vol) => {
  const isSelected = quickVolume === vol;
  return (
    <button
      key={vol}
      type="button"
      onClick={() => setQuickVolume(vol)}
      className={`text-xs p-3 rounded-lg border font-semibold text-left select-none transition-[color,background-color,border-color,box-shadow,transform] duration-140 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none ${
        isSelected
          ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm shadow-secondary/15"
          : "border-border text-foreground hover:bg-muted hover:border-border/80"
      }`}
    >
      {vol}
    </button>
  );
})}
```

## Repo conventions to follow

- Press feedback duration must be inside the `100–160ms` budget.
- Scale ratio for compact option pills: `0.97`.
- Explicit Tailwind `transition-[...]` classes instead of blanket `transition-all`.

## Steps

1. Open `client/src/pages/Home.tsx` and scroll to section 6 ("Planificateur Rapide de Chantier").
2. Update the `className` on the 4 `quickService` buttons (lines 513-520) with the targeted classes.
3. Update the `className` on the 4 `quickVolume` buttons (lines 534-541) with the targeted classes.
4. Verify `type="button"` remains present on every button.

## Boundaries

- Do NOT alter the underlying URL query parameter generation (`/devis?service=...&volume=...`).
- Do NOT alter the button text or option values.
- Do NOT touch the MovingBorderButton CTA ("Lancer mon devis technique").

## Verification

- **Mechanical**:
  - `npm run check` succeeds without lint or type issues.
- **Feel check**:
  - Click down on "Terrassement": the button immediately compresses to `0.97`.
  - Release: it pops back to `1.0` while activating the orange border and tint with a quick `140ms` transition.
  - Test via keyboard Tab and Enter/Space: the focus ring highlights cleanly and activates without layout shaking.
- **Done when**: All eight estimator options depress physically on click/tap and avoid indiscriminate `transition-all`.
