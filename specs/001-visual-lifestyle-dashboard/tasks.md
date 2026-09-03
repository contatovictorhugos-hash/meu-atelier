# Tasks: Atelier Visual Lifestyle & Routine Dashboard

**Branch**: `001-visual-lifestyle-dashboard` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependency configuration, and base styling tokens.

- [ ] T001 Initialize Next.js 15 project structure with TypeScript, App Router, and Tailwind CSS in package.json
- [ ] T002 Configure production dependencies (lucide-react, framer-motion, zustand, @supabase/supabase-js, @supabase/ssr, browser-image-compression) in package.json
- [ ] T003 [P] Configure Tailwind CSS with custom Y2K Coquette Clean design tokens (blush, cream, silver, bordeaux, soft shadows) in tailwind.config.ts
- [ ] T004 [P] Setup PWA manifest, viewport configuration (viewport-fit=cover), and mobile icons in src/app/manifest.ts and src/app/layout.tsx
- [ ] T005 [P] Configure strict TypeScript compilation and lint rules in tsconfig.json and eslint.config.mjs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data layer, cloud clients, and mobile shell that MUST be complete before user stories can be built.

- [ ] T006 [P] Setup Supabase browser and server client helpers in src/lib/supabase/client.ts and src/lib/supabase/server.ts
- [ ] T007 [P] Define complete TypeScript database schemas and domain DTOs in src/types/database.types.ts
- [ ] T008 [P] Setup Cloudflare R2 S3-compatible client helper in src/lib/r2/client.ts
- [ ] T009 Implement client-side image compression and WebP formatting utility in src/lib/utils/image-compression.ts
- [ ] T010 Implement pre-signed image upload Route Handler for Cloudflare R2 in src/app/api/upload/presigned/route.ts
- [ ] T011 [P] Build reusable UI primitives (Button, Card, Badge, Modal, Input) with 44x44pt touch targets in src/components/ui/
- [ ] T012 Build mobile shell layout with Safe Area insets and persistent thumb-zone navigation bar in src/components/layout/BottomNav.tsx and src/app/(dashboard)/layout.tsx

---

## Phase 3: User Story 1 - Visual Morning Sanctuary & Daily Highlights (Priority: P1) 🎯 MVP

**Goal**: Deliver the core morning ritual: personalized greeting, "Highlight of the Day" polaroid frame, interactive tap-to-fill water drops, and tactile morning/evening skincare habit stickers.

**Independent Test**: Load the dashboard, tap hydration drops to increment water count, toggle skincare items with animated micro-feedback, and verify state persists in local storage across refreshes.

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create persistent local store for daily routine, hydration, and mood quote in src/stores/useDailyGlowStore.ts
- [ ] T014 [P] [US1] Build PolaroidFrame and Digicam LCD visual wrapper components in src/components/layout/PolaroidFrame.tsx and src/components/layout/DigicamLCD.tsx
- [ ] T015 [P] [US1] Build tactile sticker checklist component for morning and evening routines in src/components/modules/daily-glow/HabitStickers.tsx
- [ ] T016 [P] [US1] Build interactive tap-to-fill water drops widget in src/components/modules/daily-glow/HydrationTracker.tsx
- [ ] T017 [US1] Build composite DailyGlowWidget with highlight photo and affirmation card in src/components/modules/daily-glow/DailyGlowWidget.tsx
- [ ] T018 [US1] Integrate DailyGlowWidget into the primary mobile dashboard page at src/app/(dashboard)/page.tsx

**Checkpoint**: User Story 1 is fully functional and testable as an independent MVP.

---

## Phase 4: User Story 2 - Digital Wardrobe & OOTD Look Studio (Priority: P2)

**Goal**: Enable visual clothing cataloging by category, assembly of multi-piece outfit collages with occasion tags, and outfit history timeline with mirror selfies.

**Independent Test**: Add wardrobe items across categories, compose an outfit with occasion "Trabalho", save it, and verify it displays in the OOTD gallery.

### Implementation for User Story 2

- [ ] T019 [P] [US2] Create persistent store for wardrobe catalog and outfit builder in src/stores/useClosetStore.ts
- [ ] T020 [P] [US2] Build wardrobe item card and category filter grid (top, bottom, shoes, bag, accessory) in src/components/modules/closet-ootd/WardrobeGrid.tsx
- [ ] T021 [P] [US2] Build modal for adding wardrobe items with camera/file picker and image compression in src/components/modules/closet-ootd/AddWardrobeItemModal.tsx
- [ ] T022 [US2] Build visual Cher Horowitz-style Look Builder component with occasion tags in src/components/modules/closet-ootd/LookBuilder.tsx
- [ ] T023 [US2] Build OOTD look history timeline with polaroid selfie cards in src/components/modules/closet-ootd/OutfitHistory.tsx
- [ ] T024 [US2] Integrate closet catalog, look builder, and history into the closet view at src/app/(dashboard)/closet/page.tsx

**Checkpoint**: User Stories 1 and 2 operate smoothly and independently.

---

## Phase 5: User Story 3 - Bento & Weekly Meal Prep Planner (Priority: P3)

**Goal**: Provide Monday-to-Friday meal grid (lunch, snack, breakfast), interactive Sunday prep checklist, and smart categorized grocery shopping list.

**Independent Test**: Inspect the weekly meal cards, check off Sunday prep cooking tasks, and check/uncheck items on the market list divided by sections.

### Implementation for User Story 3

- [ ] T025 [P] [US3] Create persistent store for meal plans, Sunday prep, and shopping list in src/stores/useMealStore.ts
- [ ] T026 [P] [US3] Build weekly Monday-to-Friday meal schedule grid cards in src/components/modules/meal-planner/WeeklyMealGrid.tsx
- [ ] T027 [P] [US3] Build interactive Sunday Meal Prep checklist in src/components/modules/meal-planner/SundayPrepGuide.tsx
- [ ] T028 [P] [US3] Build categorized shopping list (Hortifrúti, Geladeira, Despensa) with one-touch checkboxes in src/components/modules/meal-planner/ShoppingList.tsx
- [ ] T029 [US3] Integrate meal grid, prep guide, and shopping list into the bento page at src/app/(dashboard)/bento/page.tsx

**Checkpoint**: User Stories 1, 2, and 3 are functional.

---

## Phase 6: User Story 4 - Legal Binder & Aesthetic Study Lounge (Priority: P4)

**Goal**: Organize Law courses with pastel palettes, reading progress sliders, micro-fichamentos with attached Vade Mecum photos, deadline tracker, and retro digicam Pomodoro timer.

**Independent Test**: Open a course card, adjust reading progress, add a study flashcard with photo reference, view deadlines chronologically, and start the retro focus timer.

### Implementation for User Story 4

- [ ] T030 [P] [US4] Create persistent store for law courses, flashcards, deadlines, and study timer in src/stores/useLegalStore.ts
- [ ] T031 [P] [US4] Build course overview cards with reading progress indicators and pastel accents in src/components/modules/legal-binder/CourseCards.tsx
- [ ] T032 [P] [US4] Build micro-fichamentos flashcard review component with image attachment in src/components/modules/legal-binder/StudyNotes.tsx
- [ ] T033 [P] [US4] Build academic assignment and exam deadline tracker in src/components/modules/legal-binder/DeadlineTracker.tsx
- [ ] T034 [US4] Build retro digital camera viewfinder Pomodoro timer in src/components/modules/legal-binder/FocusTimer.tsx
- [ ] T035 [US4] Integrate courses, flashcards, deadlines, and focus lounge into the legal studies view at src/app/(dashboard)/legal/page.tsx

**Checkpoint**: All 4 user stories are fully implemented.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Aesthetics hardening, seed data, responsive ergonomics, and zero-cost audits.

- [ ] T036 [P] Seed default demo data (initial wardrobe, meals, habits, and law courses) in src/config/portfolio.config.ts
- [ ] T037 [P] Implement empty state illustrations with welcoming Y2K stickers across all modules in src/components/ui/EmptyState.tsx
- [ ] T038 Mobile ergonomics and safe-area audit on 360px-430px viewports (notch / dynamic island) in src/app/globals.css
- [ ] T039 Zero-cost compliance and bundle size audit verifying no billable API calls or unbounded egress
- [ ] T040 Execute end-to-end quickstart validation scenarios per specs/001-visual-lifestyle-dashboard/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - Sequentially in priority order: P1 (Daily Glow) → P2 (Closet & OOTD) → P3 (Bento & Meals) → P4 (Legal Binder).
- **Polish (Phase 7)**: Depends on desired user stories being completed.

### Parallel Opportunities

- **Phase 1 (Setup)**: T003, T004, and T005 can run in parallel.
- **Phase 2 (Foundational)**: T006, T007, T008, and T011 can run in parallel once dependencies are installed.
- **Phase 3 (User Story 1)**: T013, T014, T015, and T016 can run in parallel before composite integration in T017.
- **Phase 4 (User Story 2)**: T019, T020, and T021 can run in parallel before Look Builder in T022.
- **Phase 5 (User Story 3)**: T025, T026, T027, and T028 can run in parallel before bento page integration in T029.
- **Phase 6 (User Story 4)**: T030, T031, T032, and T033 can run in parallel before timer in T034.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (Blocking prerequisites).
3. Complete Phase 3: User Story 1 (Daily Glow).
4. **STOP and VALIDATE**: Verify morning habits, hydration counter, and polaroid frame on mobile Chrome/Safari.
5. Deploy to Vercel and deliver MVP for immediate personal use.

### Incremental Delivery
1. Add Phase 4 (User Story 2: Closet & OOTD Look Studio).
2. Add Phase 5 (User Story 3: Bento & Meal Planner).
3. Add Phase 6 (User Story 4: Legal Binder & Pomodoro Focus).
4. Apply Phase 7 (Polish, Seed Data, Zero-Cost Verification).
