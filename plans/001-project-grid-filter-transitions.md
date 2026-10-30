# 001 — Smooth Layout Transition and AnimatePresence on Project Filtering

- **Status**: TODO
- **Commit**: 1c4a172
- **Severity**: HIGH
- **Category**: Missed opportunities & Teleporting state
- **Estimated scope**: 1 file (`client/src/pages/Home.tsx`), ~35 lines modified

## Problem

When the user selects a project category tab ("Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement", or "Tous"), the filtered project cards teleport instantaneously. Cards excluded by the filter vanish without an exit animation, newly appearing cards pop in abruptly, and adjacent cards snap to their new grid positions without geometric interpolation.

`AnimatePresence` is already imported at the top of `client/src/pages/Home.tsx:2` but is never rendered:

```tsx
/* client/src/pages/Home.tsx:407-422 — current */
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredProjects?.slice(0, 6).map((project, i) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-slate-900 cursor-pointer border border-border"
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
```

This violates the spatial continuity principle: filtering feels like a jarring DOM tear instead of an intuitive restructuring of the company's technical portfolio.

## Target

1. Wrap the project grid cards in `<AnimatePresence mode="popLayout">`.
2. Add the `layout` prop to the container and card elements to enable automatic FLIP repositioning.
3. Configure asymmetric exit and entry:
   - **Exit**: `opacity: 0, scale: 0.96` over `180ms` with `easeIn` (starts quickly to vacate space).
   - **Enter**: `opacity: 1, scale: 1` over `240ms` with `cubic-bezier(0.23, 1, 0.32, 1)`.
   - **Layout transition**: `280ms` with `cubic-bezier(0.23, 1, 0.32, 1)`.
4. Honor `useReducedMotion`: if active, disable `scale` and layout morphing, using an instantaneous `150ms` opacity fade.

```tsx
/* target */
<motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <AnimatePresence mode="popLayout">
    {filteredProjects?.slice(0, 6).map((project) => (
      <motion.div
        layout
        key={project.id}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={
          shouldReduceMotion
            ? { opacity: 0, transition: { duration: 0.15 } }
            : { opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: "easeIn" } }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.15 }
            : {
                opacity: { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
                layout: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
              }
        }
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-slate-900 cursor-pointer border border-border"
      >
```

## Repo conventions to follow

- Framer Motion is the primary declarative motion library for components (`import { motion, AnimatePresence, useReducedMotion } from "framer-motion"`).
- BEGEC BTP timing curve: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` or `[0.23, 1, 0.32, 1]` for crisp, authoritative engineering UI.
- Never animate `width` or `height` directly; use Framer Motion's GPU-accelerated `layout` prop.

## Steps

1. In `client/src/pages/Home.tsx`, verify `useReducedMotion` is imported from `"framer-motion"` alongside `AnimatePresence`.
2. Inside `export default function Home()`, retrieve the reduced-motion preference:
   ```tsx
   const shouldReduceMotion = useReducedMotion();
   ```
3. Locate lines 407-422 in `client/src/pages/Home.tsx`. Convert the container `<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">` into `<motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">`.
4. Wrap `{filteredProjects?.slice(0, 6).map((project) => ...)}` inside `<AnimatePresence mode="popLayout">`.
5. On the child `<motion.div key={project.id}>`, add `layout`, update `initial`, `animate`, `exit`, and configure the custom `transition` object matching the Target section.
6. Remove `delay: i * 0.1` during interactive filter re-renders so that the user does not wait for a waterfall stagger when filtering.

## Boundaries

- Do NOT alter project card content, layout classes (`aspect-[4/3]`, `rounded-2xl`, etc.), or typography.
- Do NOT touch the `useProjects` query hook or project data pipeline.
- Do NOT modify any other section in `Home.tsx`.

## Verification

- **Mechanical**:
  - Run `npm run check` or `npx tsc --noEmit` to ensure TypeScript compiles without error.
  - Verify that Vite dev server (`npm run dev`) builds the page without runtime warnings.
- **Feel check**:
  - Open the homepage and scroll to "Références Chantiers".
  - Click rapidly between "Tous", "Bâtiment", "Terrassement", and "Ponts & Chaussées".
  - Confirm existing cards glide smoothly to their new slots instead of teleporting.
  - Confirm cards that disappear fade down slightly to `0.96` scale without jumping out of the document flow.
  - In Chrome DevTools Rendering tab, enable "Emulate CSS media feature prefers-reduced-motion". Confirm filtering uses a pure opacity fade with no layout motion.
- **Done when**: Switching filter tabs rearranges cards with zero layout flash or coordinate teleportation.
