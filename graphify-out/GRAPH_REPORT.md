# Graph Report - site-begec-btp_2  (2026-10-30)

## Corpus Check
- 163 files · ~1,054,156 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 5, .css 2, .cmd 1)

## Summary
- 2115 nodes · 4699 edges · 112 communities (107 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 89 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c4a1724`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 001 — Smooth Layout Transition and AnimatePresence on Project Filtering
- dependencies
- react
- cn
- package.json
- sidebar.tsx
- input-otp.tsx
- use-toast.ts
- button.tsx
- devDependencies
- live-browser.js
- connectSSE
- compilerOptions
- el
- components.json
- DatabaseStorage
- index.ts
- modern-screenshot.umd.js
- carousel.tsx
- setLiveState
- chart.tsx
- command.tsx
- initPageChat
- navigation-menu.tsx
- refreshParamsPanel
- drawer.tsx
- actOnAgentTarget
- Project
- Quote.tsx
- scripts
- initGlobalBar
- Admin.tsx
- SKILL.md
- live.md
- createLiveBrowserDomHelpers
- new-work.md
- onboard.md
- The Toolkit
- showToast
- BEGEC TP
- requirements.md
- Design System: BEGEC TP
- captureElementToBlob
- schema.ts
- orbit-images.tsx
- createLiveBrowserSessionState
- resolveLiveInjectionAnchor
- adapt.md
- animate.md
- Handle `generate`
- mountSvelteComponentVariant
- Generate Report
- syncPageChatFocus
- New visual work
- optimize.md
- navigation-menu.tsx
- server/routes.ts
- Impeccable Asset Producer
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- critique.md
- Simplify the Design
- Product
- clarify.md
- Nielsen's 10 Heuristics
- document.md
- Hardening Dimensions
- polish.md
- quieter.md
- react
- Portfolio.tsx
- scheduleAcceptCleanup
- Home.tsx
- Generate Combined Critique Report
- Init flow
- Critique de Design : Page d'Accueil (`client/src/pages/Home.tsx`)
- IStorage
- Responsive Design
- shared/routes.ts
- Common Cognitive Load Violations
- iOS platform
- Operate mode depth (and Read notes)
- Shape
- Android platform
- colorize.md
- Persona-Based Design Testing
- Extract Flow
- syncEditBadgeHitProxies
- Generate Report
- Cognitive Load Assessment
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- live-browser-ignores.js
- Implement Adaptations
- Diagnostic Scan
- typeset.md
- Visualize: Direction Comps & Asset Production
- 1. Conformité Absolue au Système de Design
- Impeccable Documenter
- Region map
- Heuristics Scoring Guide
- Persuade and Experience
- Conformité Stricte au Système de Design (DESIGN.md)
- Adaptation Strategies
- avatar.tsx
- Operate
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- popover.tsx
- QuoteRequest

## God Nodes (most connected - your core abstractions)
1. `cn()` - 231 edges
2. `react` - 57 edges
3. `connectSSE()` - 34 edges
4. `setLiveState()` - 33 edges
5. `resumeSession()` - 33 edges
6. `lucide-react` - 32 edges
7. `showToast()` - 31 edges
8. `initGlobalBar()` - 30 edges
9. `el()` - 29 edges
10. `Button` - 29 edges

## Surprising Connections (you probably didn't know these)
- `[P2] Encombrement et manipulation tactile de l'Orbit 3D sur mobile` --references--> `OrbitImages()`  [INFERRED]
  .impeccable/critique/2026-10-30T17-11-39Z__client-src-pages-home-tsx.md → client/src/components/ui/orbit-images.tsx
- `Boundaries` --references--> `useProjects()`  [INFERRED]
  plans/001-project-grid-filter-transitions.md → client/src/hooks/use-projects.ts
- `Breakpoints: Content-Driven` --references--> `clamp()`  [INFERRED]
  .agent/skills/impeccable/reference/adapt.md → client/src/components/ui/orbit-images.tsx
- `Layout Adaptation Techniques` --references--> `clamp()`  [INFERRED]
  .agent/skills/impeccable/reference/adapt.md → client/src/components/ui/orbit-images.tsx
- `Text Overflow & Wrapping` --references--> `clamp()`  [INFERRED]
  .agent/skills/impeccable/reference/harden.md → client/src/components/ui/orbit-images.tsx

## Import Cycles
- None detected.

## Communities (112 total, 5 thin omitted)

### Community 0 - "001 — Smooth Layout Transition and AnimatePresence on Project Filtering"
Cohesion: 0.04
Nodes (39): 001 — Smooth Layout Transition and AnimatePresence on Project Filtering, Boundaries, Problem, Repo conventions to follow, Steps, Target, Verification, 002 — Sliding Active Pill and Tactile Press Feedback on Category Filter Tabs (+31 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (68): dependencies, class-variance-authority, clsx, cmdk, connect-pg-simple, date-fns, drizzle-orm, drizzle-zod (+60 more)

### Community 2 - "react"
Cohesion: 0.13
Nodes (16): App(), AppContent(), pageVariants, ScrollToTop(), Footer(), Loader(), Navbar(), useSetting() (+8 more)

### Community 3 - "cn"
Cohesion: 0.06
Nodes (52): AccordionContent, AccordionItem, AccordionTrigger, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList (+44 more)

### Community 4 - "package.json"
Cohesion: 0.03
Nodes (57): HoverCardContent, Slider, Switch, @esbuild-kit/esm-loader, license, name, optionalDependencies, bufferutil (+49 more)

### Community 5 - "sidebar.tsx"
Cohesion: 0.06
Nodes (41): Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+33 more)

### Community 6 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, input-otp

### Community 7 - "use-toast.ts"
Cohesion: 0.12
Nodes (24): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+16 more)

### Community 8 - "button.tsx"
Cohesion: 0.12
Nodes (20): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+12 more)

### Community 9 - "devDependencies"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, drizzle-kit, esbuild, postcss, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner, @replit/vite-plugin-runtime-error-modal (+16 more)

### Community 10 - "live-browser.js"
Cohesion: 0.03
Nodes (116): addManualContextText(), applyPlaceholderDimensions(), applyPlaceholderSizingStyles(), bufferToBase64(), buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml() (+108 more)

### Community 11 - "connectSSE"
Cohesion: 0.06
Nodes (81): applySavedSessionMeta(), buildInsertPlaceholderSnapshotFromDom(), captureAndEmit(), checkpointPayload(), clampVariantIndex(), clearHandled(), commitAcceptedVariantToDom(), compileShader() (+73 more)

### Community 12 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, baseUrl, esModuleInterop, incremental, jsx, lib, module (+10 more)

### Community 13 - "el"
Cohesion: 0.08
Nodes (49): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+41 more)

### Community 14 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 15 - "DatabaseStorage"
Cohesion: 0.15
Nodes (3): DatabaseStorage, InsertTeamMember, TeamMember

### Community 16 - "index.ts"
Cohesion: 0.11
Nodes (12): esbuild, @replit/vite-plugin-runtime-error-modal, vite, @vitejs/plugin-react, allowlist, app, http, httpServer (+4 more)

### Community 17 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 18 - "carousel.tsx"
Cohesion: 0.17
Nodes (14): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+6 more)

### Community 19 - "setLiveState"
Cohesion: 0.11
Nodes (58): abortSvelteComponentInjection(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup(), cleanupAcceptedSession(), clearAnnotations() (+50 more)

### Community 20 - "chart.tsx"
Cohesion: 0.24
Nodes (11): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent, getPayloadConfigFromPayload() (+3 more)

### Community 21 - "command.tsx"
Cohesion: 0.18
Nodes (10): Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+2 more)

### Community 22 - "initPageChat"
Cohesion: 0.11
Nodes (39): applyGlobalBarLabelState(), armPageChatForTyping(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat(), finishVoiceSession() (+31 more)

### Community 23 - "navigation-menu.tsx"
Cohesion: 0.18
Nodes (12): Alert, AlertDescription, AlertTitle, alertVariants, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle (+4 more)

### Community 24 - "refreshParamsPanel"
Cohesion: 0.11
Nodes (27): applyParamDefaults(), applyParamValue(), applySavedParamValues(), buildCyclingRow(), closedClipPath(), cycleVariant(), cyclingCounterText(), cyclingShownVariant() (+19 more)

### Community 25 - "drawer.tsx"
Cohesion: 0.25
Nodes (7): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle, vaul

### Community 26 - "actOnAgentTarget"
Cohesion: 0.11
Nodes (41): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy() (+33 more)

### Community 27 - "Project"
Cohesion: 0.27
Nodes (4): DossierModalProps, ProjectCardProps, InsertProject, Project

### Community 28 - "Quote.tsx"
Cohesion: 0.10
Nodes (33): Direction, ScrollReveal(), ScrollRevealProps, variants, FormControl, FormDescription, FormField(), FormFieldContext (+25 more)

### Community 29 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, check, db:push, dev, start

### Community 30 - "initGlobalBar"
Cohesion: 0.11
Nodes (27): agentHasWorkInFlight(), agentStatusText(), applyLiveBarPreference(), barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), detectPageTheme(), ensureAgentPollTooltip() (+19 more)

### Community 31 - "Admin.tsx"
Cohesion: 0.19
Nodes (29): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DialogContent, DialogFooter() (+21 more)

### Community 32 - "SKILL.md"
Cohesion: 0.10
Nodes (15): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat, Monorepo notes, Opting out of the boot check, Step 1: Run the pass (+7 more)

### Community 33 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 34 - "createLiveBrowserDomHelpers"
Cohesion: 0.11
Nodes (23): collectEditableTextRows(), visit(), createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot() (+15 more)

### Community 35 - "new-work.md"
Cohesion: 0.11
Nodes (17): Assess Adaptation Challenge, Implement & Verify, Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments (+9 more)

### Community 36 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 37 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 38 - "showToast"
Cohesion: 0.13
Nodes (23): abandonForeignSession(), abandonSupersededGo(), applyEditing(), buildLocatorForLeaf(), copyEditContainerContext(), copyEditLeafContext(), cssIdent(), discardOrphanedSession() (+15 more)

### Community 40 - "BEGEC TP"
Cohesion: 0.33
Nodes (5): BEGEC TP, Installation et lancement en local, Prérequis, Supabase, Étapes

### Community 42 - "Design System: BEGEC TP"
Cohesion: 0.07
Nodes (26): Badges / Chips, Buttons, Cards / Containers, Colors, Components, Design System: BEGEC TP, Do:, Do's and Don'ts (+18 more)

### Community 43 - "captureElementToBlob"
Cohesion: 0.09
Nodes (34): averageRgb01(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob() (+26 more)

### Community 44 - "schema.ts"
Cohesion: 0.15
Nodes (19): drizzle-orm, drizzle-zod, pg, db, pool, ContactMessage, contactMessages, insertPartnerSchema (+11 more)

### Community 45 - "orbit-images.tsx"
Cohesion: 0.12
Nodes (25): createEngine(), easeOutQuint(), EASINGS, EngineDrag, EngineItem, EngineSeek, estimateAspect(), EstimateAspectProps (+17 more)

### Community 46 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 47 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 48 - "adapt.md"
Cohesion: 0.20
Nodes (9): Assess Adaptation Challenge, Desktop Adaptation (Mobile → Desktop), Email Adaptation (Web → Email), Mobile Adaptation (Desktop → Mobile), Plan Adaptation Strategy, Print Adaptation (Screen → Print), Reference Material, Tablet Adaptation (Hybrid Approach) (+1 more)

### Community 49 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 50 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 51 - "mountSvelteComponentVariant"
Cohesion: 0.15
Nodes (19): applyOriginalAttrsToSvelteAnchor(), clearMountErrorCard(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), importFirstReachable(), loadSvelteRuntime() (+11 more)

### Community 52 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 53 - "syncPageChatFocus"
Cohesion: 0.20
Nodes (16): attachSteerFocusDebug(), attachSteerFocusGuard(), clearSteerFocusRecoverTimer(), focusConfigureInput(), focusSteerChat(), isInlineEditActive(), isPageEditableActive(), isPageEditableElement() (+8 more)

### Community 54 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 55 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 56 - "navigation-menu.tsx"
Cohesion: 0.28
Nodes (8): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport, @radix-ui/react-navigation-menu

### Community 57 - "server/routes.ts"
Cohesion: 0.19
Nodes (11): express, multer, nodemailer, zod, registerRoutes(), requireAdmin(), runSeedData(), upload (+3 more)

### Community 58 - "Impeccable Asset Producer"
Cohesion: 0.15
Nodes (11): Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve, Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract (+3 more)

### Community 59 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 60 - "critique.md"
Cohesion: 0.17
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 61 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 62 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 63 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 64 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 65 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 66 - "Hardening Dimensions"
Cohesion: 0.18
Nodes (10): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+2 more)

### Community 67 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 68 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 69 - "react"
Cohesion: 0.12
Nodes (16): CalendarProps, labelVariants, Button(), MovingBorder(), MovingBorderButtonProps, TabsContent, TabsList, TabsTrigger (+8 more)

### Community 70 - "Portfolio.tsx"
Cohesion: 0.22
Nodes (18): Badge(), BadgeProps, badgeVariants, Button, MovingBorderButton, Skeleton(), useProjects(), useTeam() (+10 more)

### Community 71 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 72 - "Home.tsx"
Cohesion: 0.17
Nodes (14): StickyContentWrapperDemo(), DialogDescription, defaultDemoItems, StickyContentItem, StickyContentLink, StickyContentWrapper(), StickyContentWrapperProps, usePartners() (+6 more)

### Community 73 - "Generate Combined Critique Report"
Cohesion: 0.20
Nodes (10): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+2 more)

### Community 74 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 75 - "Critique de Design : Page d'Accueil (`client/src/pages/Home.tsx`)"
Cohesion: 0.15
Nodes (12): Alertes par Persona, Critique de Design : Page d'Accueil (`client/src/pages/Home.tsx`), Design Health Score, Impression Générale, Observations Mineures, [P1] Incohérence des rayons de courbure et formes molles, [P1] Violation de la règle des 10% d'orange chantier sur les grands titres, [P2] Encombrement et manipulation tactile de l'Orbit 3D sur mobile (+4 more)

### Community 77 - "IStorage"
Cohesion: 0.15
Nodes (3): IStorage, InsertPartner, Partner

### Community 78 - "Responsive Design"
Cohesion: 0.22
Nodes (9): Detect Input Method, Not Just Screen Size, Layout Adaptation Patterns, Mobile-First: Write It Right, Picture Element for Art Direction, Responsive Design, Responsive Images: Get It Right, Safe Areas: Handle the Notch, srcset with Width Descriptors (+1 more)

### Community 79 - "shared/routes.ts"
Cohesion: 0.30
Nodes (6): @tanstack/react-query, api, errorSchemas, InsertContactMessage, insertContactSchema, InsertQuoteRequest

### Community 80 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 81 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 82 - "Operate mode depth (and Read notes)"
Cohesion: 0.10
Nodes (18): Craft floor, Refuse, Verify, Constraints, Failure modes, Flow, /impeccable hooks, Routing (+10 more)

### Community 83 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 84 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 85 - "colorize.md"
Cohesion: 0.25
Nodes (7): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode

### Community 86 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 87 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 88 - "syncEditBadgeHitProxies"
Cohesion: 0.27
Nodes (10): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), positionEditBadge(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy() (+2 more)

### Community 89 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 90 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 91 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 92 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 93 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 94 - "Implement Adaptations"
Cohesion: 0.20
Nodes (10): Breakpoints: Content-Driven, Content Adaptation, Implement Adaptations, Layout Adaptation Techniques, Navigation Adaptation, Responsive Breakpoints, Touch Adaptation, Text Overflow & Wrapping (+2 more)

### Community 95 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 96 - "typeset.md"
Cohesion: 0.25
Nodes (7): Apply, Line breaks, Live-mode signature params, Set the system, Two isolated assessments, Verify, Visitor mode

### Community 97 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 98 - "1. Conformité Absolue au Système de Design"
Cohesion: 0.25
Nodes (7): 1. Conformité Absolue au Système de Design, 2. Intégrité des Données et Preuves Métier, 3. Base de Connaissances Graphify, Consignes et Règles du Projet BEGEC TP, Règles Colorimétriques Non-Négociables :, Règles de Formes & Géométrie :, Règles Typographiques :

### Community 99 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 100 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 101 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 102 - "Persuade and Experience"
Cohesion: 0.50
Nodes (3): Comps, Directions, Persuade and Experience

### Community 103 - "Conformité Stricte au Système de Design (DESIGN.md)"
Cohesion: 0.25
Nodes (7): 1. Palette Colorimétrique et Contrastes (Non-Négociables), 2. Typographie et Hiérarchie, 3. Géométrie et Formes Industrielles (Angles Solides), 4. Élévation et Mouvements, 5. Intégrité des Preuves et Données, Conformité Stricte au Système de Design (DESIGN.md), Directive Absolue et Inviolable

### Community 104 - "Adaptation Strategies"
Cohesion: 0.40
Nodes (5): Adaptation Strategies, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

### Community 105 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): Avatar, AvatarFallback, AvatarImage, @radix-ui/react-avatar

### Community 106 - "Operate"
Cohesion: 0.50
Nodes (3): Comps, Directions, Operate

### Community 107 - "radio-group.tsx"
Cohesion: 0.50
Nodes (3): RadioGroup, RadioGroupItem, @radix-ui/react-radio-group

### Community 108 - "resizable.tsx"
Cohesion: 0.50
Nodes (3): ResizableHandle(), ResizablePanelGroup(), react-resizable-panels

### Community 109 - "scroll-area.tsx"
Cohesion: 0.67
Nodes (3): ScrollArea, ScrollBar, @radix-ui/react-scroll-area

## Knowledge Gaps
- **32 isolated node(s):** `@jridgewell/trace-mapping`, `@types/multer`, `connect-pg-simple`, `date-fns`, `express-session` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 784 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `clamp()` connect `Implement Adaptations` to `orbit-images.tsx`?**
  _High betweenness centrality (0.393) - this node is a cross-community bridge._
- **What connects `@jridgewell/trace-mapping`, `@types/multer`, `connect-pg-simple` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `001 — Smooth Layout Transition and AnimatePresence on Project Filtering` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Why does `init()` connect `setLiveState` to `SKILL.md`, `live.md`, `new-work.md`, `Init flow`, `live-browser.js`, `connectSSE`, `captureElementToBlob`, `syncPageChatFocus`, `syncEditBadgeHitProxies`, `actOnAgentTarget`, `initGlobalBar`?**
  _High betweenness centrality (0.366) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.029411764705882353 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `react`, `cn`, `package.json`, `sidebar.tsx`, `input-otp.tsx`, `use-toast.ts`, `button.tsx`, `carousel.tsx`, `chart.tsx`, `command.tsx`, `navigation-menu.tsx`, `drawer.tsx`, `Quote.tsx`, `Admin.tsx`, `orbit-images.tsx`, `navigation-menu.tsx`, `Portfolio.tsx`, `Home.tsx`, `avatar.tsx`, `radio-group.tsx`, `scroll-area.tsx`, `popover.tsx`?**
  _High betweenness centrality (0.308) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.12535612535612536 - nodes in this community are weakly interconnected._