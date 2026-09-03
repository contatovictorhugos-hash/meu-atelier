# Feature Specification: Atelier Visual Lifestyle & Routine Dashboard

**Feature Branch**: `001-visual-lifestyle-dashboard`

**Created**: 2026-09-02

**Status**: Draft

**Input**: User description: "Atelier — Personal Visual Routine & Lifestyle Dashboard: closet inteligente, bento & marmitas, rotina diária glow-up e caderno jurídico de estudos em estética Y2K scrapbook."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Morning Sanctuary & Daily Highlights (Priority: P1)

Every morning, the user opens Atelier on her mobile phone to be welcomed by a warm, aesthetic greeting, view the daily highlight polaroid card, check off her morning wellness and skincare rituals with sticker-like buttons, and log her water intake with interactive drops.

**Why this priority**: Delivers instant emotional connection, habit consistency, and daily aesthetic satisfaction. It establishes Atelier as an indispensable morning ritual.

**Independent Test**: Can be independently verified by loading the dashboard, ticking off skincare/wellness stickers, and tapping hydration drops, ensuring immediate visual state changes and persistent daily progress.

**Acceptance Scenarios**:

1. **Given** the user opens the app in the morning, **When** the dashboard renders, **Then** she sees a personalized greeting, the "Highlight of the Day" polaroid with today's date, and an empty water counter (0/8 drops).
2. **Given** the morning routine list, **When** the user taps a skincare or vitamin item, **Then** the item toggles to a completed state with a gentle visual animation.
3. **Given** the hydration widget, **When** the user taps an unfilled water drop, **Then** the drop fills with a soft pastel tone and increments the daily total.

---

### User Story 2 - Digital Wardrobe & OOTD Look Studio (Priority: P2)

The user wants to organize her clothing pieces into visual categories (top, bottom, shoes, bag, accessories), create stylish outfit combinations for specific occasions (work, casual, evening, rainy days), and save what she wore to an outfit history log with an optional selfie card.

**Why this priority**: Eliminates daily decision fatigue regarding what to wear, turning closet organization into a delightful scrapbook experience reminiscent of Cher Horowitz.

**Independent Test**: Can be tested by adding sample pieces across categories, assembling a multi-piece outfit card with occasion tags, saving it, and verifying its appearance in the look history.

**Acceptance Scenarios**:

1. **Given** registered wardrobe items, **When** the user opens the Look Builder, **Then** she can pick items for top, bottom, shoes, and accessories to compose a unified outfit collage.
2. **Given** a composed outfit, **When** the user assigns the tag "Trabalho" and saves, **Then** the outfit appears in the OOTD showcase and historical look timeline.
3. **Given** an outfit in history, **When** the user attaches a mirror selfie, **Then** the look displays inside a retro polaroid frame with date and occasion badge.

---

### User Story 3 - Bento & Weekly Meal Prep Planner (Priority: P3)

The user wants to plan healthy, practical lunches, snacks, and breakfasts for the work week (Monday to Friday), follow a Sunday meal-prep guide, and maintain a categorized grocery shopping list.

**Why this priority**: Supports healthy nutrition and organized routines, removing the stress of deciding what to cook or pack for work each morning.

**Independent Test**: Can be tested by viewing the Monday-to-Friday meal grid, checking off Sunday prep steps, and adding/checking items on the market list divided by section.

**Acceptance Scenarios**:

1. **Given** the work week, **When** the user inspects the Meal Mural, **Then** cards for Monday through Friday display scheduled lunch, snack, and breakfast with appetizing photos or labels.
2. **Given** the Sunday Prep Guide, **When** the user completes batch-cooking tasks (e.g., roasted vegetables, prepped protein), **Then** she can check them off to track meal-prep readiness.
3. **Given** the shopping list, **When** the user adds ingredients, **Then** items appear sorted by section (Hortifrúti, Geladeira, Despensa) and checking an item marks it as completed.

---

### User Story 4 - Legal Binder & Aesthetic Study Lounge (Priority: P4)

The user studies Law and needs to organize heavy coursework (*Direito Civil, Penal, Constitucional, Trabalho*) in a clean, motivating format: viewing course cards with reading progress, accessing micro-flashcards with photos of marked Vade Mecum pages, tracking practical assignment deadlines, and using a retro digicam Pomodoro timer.

**Why this priority**: Replaces overwhelming, clinical study spreadsheets with an encouraging, light aesthetic lounge tailored specifically for legal studies.

**Independent Test**: Can be tested by opening course cards, adjusting reading progress, viewing a flashcard with an attached page photo, checking upcoming deadlines, and toggling the study timer.

**Acceptance Scenarios**:

1. **Given** active Law courses, **When** the user views the Legal Binder, **Then** each course displays its distinct pastel theme, professor name, and reading progress bar.
2. **Given** a specific course, **When** the user adds a micro-fichamento with a photo of a highlighted article and tags (e.g., `Súmula`, `Art. 5º`), **Then** it is cataloged as a quick review card.
3. **Given** impending assignment dates, **When** the user checks the deadline tracker, **Then** assignments are sorted chronologically with status flags (`Não iniciado`, `Em rascunho`, `Finalizado`).
4. **Given** a study session, **When** the user starts the Focus Lounge, **Then** a retro digicam timer counts down with visual play/pause controls.

---

### Edge Cases

- **Offline / Low-Connectivity Access**: If the user opens the application with poor or no internet connection, previously cached routines, outfits, and study notes must render gracefully without error screens or data loss.
- **Large Image Uploads**: When uploading high-resolution photos from a smartphone camera (5-15 MB), the client must resize and optimize the image before transmission to prevent memory issues or viewport stutter.
- **Partial Outfits**: If an outfit is assembled with only top and bottom (omitting accessories or shoes), the collage layout must rebalance harmoniously without empty placeholder holes.
- **Day and Week Rollover**: At midnight, daily routine checkboxes and hydration counters reset for the new day, while past outfit logs, meal history, and completed study tasks remain preserved.
- **Empty State Delight**: When a module has no registered entries (e.g., newly initialized closet or study section), the interface must present warm, welcoming scrapbook stickers and clear prompts rather than barren blank spaces.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present a mobile-first responsive interface embracing the Y2K Coquette Clean / Digital Scrapbook aesthetic (pastel pinks, cream off-white, soft silver metallic accents, rounded cards, and polaroid frames).
- **FR-002**: System MUST allow the user to toggle daily morning and evening wellness habits with tactile visual feedback.
- **FR-003**: System MUST provide a daily hydration tracker with interactive individual drop counters up to a customizable daily goal (default: 8 cups/drops).
- **FR-004**: System MUST display a "Highlight of the Day" polaroid widget supporting photo display and daily motivational affirmations.
- **FR-005**: System MUST allow cataloging wardrobe items across 5 core categories (`top`, `bottom`, `shoes`, `bag`, `accessory`) with photo references and descriptive tags.
- **FR-006**: System MUST enable visual composition of outfits by selecting items from the catalog, tagging with occasion types (`Trabalho`, `Casual`, `Noite`, `Frio`, `Calor`).
- **FR-007**: System MUST maintain an outfit history timeline showing previously worn looks with date stamps and optional look selfies.
- **FR-008**: System MUST display a Monday-through-Friday meal planning grid detailing lunch, snack, and breakfast entries with photos and titles.
- **FR-009**: System MUST provide a Sunday Meal Prep checklist to organize weekend batch-cooking steps.
- **FR-010**: System MUST provide a categorized grocery list grouped by department (`Hortifrúti`, `Geladeira`, `Despensa`, `Outros`) with one-touch completion toggles.
- **FR-011**: System MUST present Law course cards displaying course title, instructor, custom pastel accent color, and reading progress indicators.
- **FR-012**: System MUST allow the creation of study flashcards/fichamentos containing key concepts, legal article references, and attached photo excerpts (e.g., marked Vade Mecum or lecture slides).
- **FR-013**: System MUST track academic deadlines and practical legal assignments, displaying due dates, completion status, and course associations.
- **FR-014**: System MUST provide an integrated study timer (Pomodoro) styled with a retro digital camera viewfinder aesthetic.
- **FR-015**: System MUST adhere to mobile ergonomics, guaranteeing minimum 44x44pt touch targets, bottom thumb-zone primary controls, and full Safe Area compliance across mobile viewports.

### Key Entities

- **Wardrobe Item**: A personal clothing piece or accessory with category, photo reference, style tags, and creation date.
- **Outfit**: A curated combination of wardrobe items assembled for a specific occasion or calendar day, optionally linked to a mirror selfie photo.
- **Daily Glow Entry**: Daily record tracking the completion status of morning habits, evening skincare, and water drop count.
- **Meal Plan Entry**: A planned meal assigned to a specific day of the work week (Monday-Friday) and meal type (Almoço, Lanche, Café) with photo and ingredient notes.
- **Shopping Item**: A grocery item belonging to a store category (Hortifrúti, Geladeira, Despensa) with boolean completion status.
- **Study Course**: An academic Law discipline with title, instructor, pastel accent token, and reading completion metrics.
- **Study Note (Fichamento)**: A concise study summary linked to a course, featuring legal tags, key takeaway text, and optional photo reference.
- **Study Deadline**: An academic exam, practical brief, or internship milestone with target date, status flag, and associated course.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can review and check off daily morning wellness tasks and log water intake in under 30 seconds on a smartphone.
- **SC-002**: User can create, preview, and save a complete outfit combination in under 60 seconds.
- **SC-003**: 100% of interactive controls (buttons, checkboxes, navigation items) provide a touch area of at least 44x44 points and respect device safe areas.
- **SC-004**: Initial dashboard load and cached card presentation completes in under 1.5 seconds on mobile networks.
- **SC-005**: User can review the weekly meal plan and check off Sunday prep tasks in under 2 minutes.
- **SC-006**: User can log a study flashcard with an attached photo in under 45 seconds.
- **SC-007**: Application functions without UI clipping or horizontal scrollbars across screen widths from 360px (compact mobile) to 1440px (desktop).

## Assumptions

- The primary user environment is a smartphone browser running in full-screen standalone PWA mode (e.g., Chrome on Android or Safari on iOS), with responsive desktop compatibility.
- User data is secured within an authenticated personal user space where all records, photos, and notes are private to the account holder.
- Photo uploads are automatically compressed on the client side prior to storage to maintain lightweight bandwidth usage and fast rendering.
- The standard weekly meal planning scope focuses on Monday through Friday, with Sunday designated for preparation tasks.
