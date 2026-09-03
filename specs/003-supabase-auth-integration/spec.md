# Feature Specification: Supabase Authentication, Persistent Session & Cloud Media Storage

**Feature Branch**: `feature/supabase-auth-integration`

**Created**: 2026-09-03

**Status**: Draft

**Input**: User description: "Implementar um sistema de autenticação simples, seguro e elegante com Supabase (plano gratuito), conectando os módulos existentes ao banco de dados PostgreSQL e ao Supabase Storage para salvar imagens com URLs permanentes, substituindo o localStorage volátil."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Persistent Authentication & Mobile-First Sanctuary Access (Priority: P1)

Every day, the user opens the Atelier PWA on her mobile phone. Because Atelier is her personal sanctuary, she is presented with a serene, welcoming authentication experience when not logged in, designed in the warm Atelier aesthetic (soft blush `#FDF2F4`, rich bordeaux `#4A1525`, rounded cards). She can switch effortlessly between "Entrar" (Login) and "Criar Conta" (Sign Up) using email and password. Once authenticated, her session persists indefinitely in the PWA so that opening the app from her home screen immediately takes her to her dashboard without re-authenticating. If an unauthenticated visitor attempts to access any internal dashboard route, they are gently redirected to `/login`.

**Why this priority**: Essential foundation for user privacy, multi-device continuity, and personal sanctuary protection. Without secure authentication, user data cannot be safely partitioned or stored permanently in the cloud.

**Independent Test**: Can be tested independently by visiting the app unauthenticated, observing the smooth redirect to `/login`, entering credentials in both sign-up and login tabs, verifying successful entry into the dashboard, restarting the browser/PWA, and confirming persistent automatic access.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user, **When** visiting any dashboard screen (e.g., `/`, `/closet`, `/bento`, `/legal`), **Then** she is redirected smoothly to `/login`.
2. **Given** the `/login` screen, **When** the user toggles between "Entrar" and "Criar Conta", **Then** the interface updates seamlessly with appropriate action labels and input fields.
3. **Given** valid user credentials on "Criar Conta" or "Entrar", **When** submitting the form, **Then** an authentic session is established, and the user is redirected to the home sanctuary dashboard.
4. **Given** an established session, **When** the user closes and re-opens the PWA or refreshes the application, **Then** her session remains valid and active without requiring password re-entry.
5. **Given** an authenticated user, **When** she selects the sign-out option in settings/profile, **Then** the session is cleared, and she is redirected back to the login screen.

---

### User Story 2 - Permanent Media Storage & Cloud Album Sanctuary (Priority: P2)

When adding a new clothing piece, saving an OOTD mirror selfie, capturing a freshly prepped bento lunch, or snapping a photo of a highlighted legal textbook, the user expects her images to be saved permanently and reliably. Instead of stuffing megabytes of volatile base64 strings into the device's browser local storage (which crashes at 5MB), images are compressed locally on the device to a lightweight WebP format (~150KB) and uploaded directly to a dedicated user media folder in cloud storage. The application records only the permanent public URL in the database, preventing local storage bloat and ensuring images load fast and crisp every time.

**Why this priority**: Resolves the critical data corruption bug where local storage 5MB quotas were exceeded, unlocking reliable, unrestricted photo additions across closet, meals, and study notebooks.

**Independent Test**: Can be tested by selecting an image file from the mobile photo gallery in the wardrobe modal or outfit mirror selfie, watching the client-side compression indicator, verifying the cloud upload to the user's storage path, and confirming the saved item references an HTTPS media URL instead of an inline base64 string.

**Acceptance Scenarios**:

1. **Given** an image selected from the device gallery or camera, **When** chosen in the upload widget, **Then** the image is compressed on-device into a lightweight WebP (<200KB) before transmission.
2. **Given** the compressed image blob, **When** uploaded, **Then** it is stored under the authenticated user's dedicated path in cloud storage (e.g., `<user-id>/looks/<timestamp>.webp`).
3. **Given** a successful upload, **When** the entity (wardrobe piece, outfit, meal, study note, daily photo) is saved, **Then** only the permanent public cloud URL is persisted in the database.
4. **Given** any saved item, **When** inspected in browser storage or database, **Then** zero base64 payload exists in local storage or PostgreSQL columns.

---

### User Story 3 - Cloud Database Sync & Sanctuary Data Continuity (Priority: P3)

The user wants all her daily routines, wardrobe catalog, meal plans, grocery shopping lists, and legal study binders saved to a secure cloud database linked to her account. Whether she checks off her morning skincare on her phone, organizes her weekly bento menu on her tablet, or adds a legal study note on her laptop, her records are synchronized in real-time, isolated with strict Row Level Security (RLS) so that no other user can view or alter her personal sanctuary records.

**Why this priority**: Liberates user data from device-only sandbox boundaries, ensuring that clearing browser cache or switching phones never causes heart-wrenching loss of curated looks, habits, or notes.

**Independent Test**: Can be tested by logging into the app on two different browser sessions or devices with the same account, creating or updating records in each module (habits, clothes, meals, notes), and verifying that data loads and synchronizes accurately without cross-user leakage.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** navigating between modules (Daily Glow, Closet, Bento, Legal Binder), **Then** data is fetched from the cloud database filtered strictly by her user identity.
2. **Given** two distinct user accounts (User A and User B), **When** User A creates a wardrobe item or habit log, **Then** User B cannot view, query, update, or delete User A's data under any circumstance (enforced by RLS).
3. **Given** a new daily glow ritual completed, a wardrobe item created, or a shopping item checked, **When** action occurs, **Then** changes are committed to the cloud database and reflected instantly in the UI.

---

### User Story 4 - Welcoming Empty States & Graceful Loading (Priority: P4)

When a user creates a brand new account or opens a module that has no records yet, the experience must remain encouraging, delightful, and warm. Instead of empty white voids or abrupt layout shifts, she sees aesthetic empty states with gentle sticker icons, inspiring copy, and inviting action buttons to add her first look, plan her first bento, or create her first legal study card. While data is being retrieved from the cloud, elegant, subtle skeleton placeholders prevent visual stutter.

**Why this priority**: Sustains the Y2K Coquette / Digital Scrapbook emotional sanctuary aesthetic, ensuring new users feel embraced rather than confused by blank screens.

**Independent Test**: Can be tested by creating a brand-new account, logging in, visiting each of the four main modules, and verifying that beautiful empty states render gracefully, followed by smooth transitions when the first item is created.

**Acceptance Scenarios**:

1. **Given** a new account with zero wardrobe items, outfits, meals, or notes, **When** visiting those sections, **Then** welcoming empty states with gentle pastel cards and call-to-action buttons are displayed.
2. **Given** a network request in progress, **When** loading records from the cloud, **Then** gentle skeleton pulses in blush tones display without shifting layout.
3. **Given** an error in communication or offline state, **When** a request fails, **Then** a friendly, non-technical notification appears with a retry option.

---

### Edge Cases

- **Flaky or Interrupted Mobile Network**: If connection drops during photo upload, the system must abort gracefully, present a clear retry prompt, and prevent half-committed records.
- **Large High-Resolution Camera Photos**: If a modern smartphone camera captures a 48MP raw image (15MB+), client-side compression must handle memory constraints safely without crashing the browser tab, scaling to max 1200px before WebP conversion.
- **Session Expiration or Invalid Token**: If a user's session token is revoked or invalidated server-side, the next data request must catch the 401 error, clear invalid local state, and smoothly redirect to `/login` without looping.
- **Unverified / First-time Accounts**: If email confirmation is enabled or disabled in Supabase, the UI must give clear, non-technical instructions (e.g., "Conta criada com sucesso! Verifique seu e-mail" or immediate dashboard redirect if auto-confirmed).
- **Rapid Habit Toggling**: When tapping water drops or habit checkmarks in quick succession, local optimistic updates ensure zero latency for the user while debouncing or queueing database sync.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a dedicated mobile-first `/login` screen adhering strictly to the Atelier visual palette (`#FDF2F4` background, `#4A1525` accents, `rounded-2xl`/`rounded-3xl` cards).
- **FR-002**: System MUST support email and password authentication with distinct tabs for "Entrar" and "Criar Conta".
- **FR-003**: System MUST maintain long-lived persistent sessions stored securely in cookies/storage via `@supabase/ssr` so PWA users remain authenticated across launches.
- **FR-004**: System MUST enforce route protection, redirecting unauthenticated users to `/login` and authenticated users attempting to access `/login` back to `/`.
- **FR-005**: System MUST provide a clear, accessible sign-out mechanism that invalidates the session and redirects to `/login`.
- **FR-006**: System MUST compress all user-selected images in the browser to WebP format with maximum dimension 1200px and target size under 200KB before uploading.
- **FR-007**: System MUST upload compressed image blobs directly to the public `atelier-media` cloud storage bucket under the user's isolated folder path (`${userId}/looks/${timestamp}.webp`).
- **FR-008**: System MUST persist only the permanent public URL returned from cloud storage in database records, strictly prohibiting base64 storage in database columns or local state.
- **FR-009**: System MUST synchronize Daily Glow records (`daily_glow` / `daily_routine_logs`) with PostgreSQL, tracking water intake, morning/evening habits, daily photo URL, and daily mood quote.
- **FR-010**: System MUST synchronize Wardrobe items (`wardrobe_items`) with PostgreSQL, tracking categories, tags, and permanent image URLs.
- **FR-011**: System MUST synchronize Outfits (`outfits`) with PostgreSQL, tracking title, occasion, selfie/look photo URL, and linked wardrobe item IDs.
- **FR-012**: System MUST synchronize Bento & Meal plans (`meals`), preparation tasks (`prep_tasks`), and grocery lists (`shopping_items`) with PostgreSQL.
- **FR-013**: System MUST synchronize Legal Binder courses (`study_courses`), micro-fichamentos (`study_notes`), and deadlines (`study_deadlines`) with PostgreSQL.
- **FR-014**: System MUST enforce Row Level Security (RLS) on 100% of tables and storage objects, requiring `user_id UUID REFERENCES auth.users(id) NOT NULL DEFAULT auth.uid()` and policies restricting `SELECT`, `INSERT`, `UPDATE`, and `DELETE` to `auth.uid() = user_id`.
- **FR-015**: System MUST render gentle loading skeletons during data fetches and welcoming, aesthetically coherent empty states when collections contain zero records.
- **FR-016**: System MUST never expose secret service role keys or sensitive credentials in client-side bundles, using strictly public environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

### Key Entities

- **User Profile / Session**: Represents the authenticated owner of the personal sanctuary (`id: UUID`, `email: string`, active auth session).
- **Daily Glow Log**: Daily snapshot of self-care (`user_id: UUID`, `log_date: DATE`, `water_cups: INTEGER`, `morning_habits: TEXT[]`, `evening_habits: TEXT[]`, `daily_photo_url: TEXT`, `daily_mood_quote: TEXT`).
- **Wardrobe Item**: Digital closet item (`user_id: UUID`, `category: TEXT`, `image_url: TEXT`, `tags: TEXT[]`, `created_at: TIMESTAMPTZ`).
- **Outfit Composition**: Curated look for occasions (`user_id: UUID`, `title: TEXT`, `occasion: TEXT`, `photo_url: TEXT`, `item_ids: UUID[]`, `created_at: TIMESTAMPTZ`).
- **Weekly Meal**: Planned recipe/dish (`user_id: UUID`, `day_of_week: INTEGER`, `meal_type: TEXT`, `title: TEXT`, `photo_url: TEXT`, `ingredients: TEXT[]`).
- **Prep Task & Shopping Item**: Sunday meal prep step and categorized grocery item (`user_id: UUID`, `item_name / task: TEXT`, `category: TEXT`, `completed / is_completed: BOOLEAN`).
- **Legal Course, Note & Deadline**: Law student academic tracker (`user_id: UUID`, `course_id: UUID`, `name: TEXT`, `title: TEXT`, `summary_text: TEXT`, `photo_url: TEXT`, `due_date: DATE`, `status: TEXT`).
- **Media Asset**: Public cloud storage object stored in bucket `atelier-media` partitioned by `${userId}/...` containing optimized WebP image files.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete account registration or login in under 10 seconds with clear visual confirmation and zero page reloads.
- **SC-002**: PWA retains authenticated session for at least 30 consecutive days of inactivity without prompting the user for re-authentication.
- **SC-003**: 100% of uploaded gallery or camera images are compressed on-device to under 200KB before transmission, completing cloud upload in under 2.5 seconds on a standard 4G mobile connection.
- **SC-004**: Browser localStorage consumption attributable to images is reduced to 0MB, with 100% of media saved as permanent HTTPS cloud URLs.
- **SC-005**: 100% of database tables and storage folders enforce Row Level Security, with zero cross-tenant data leakage verifiable via automated RLS policies.
- **SC-006**: Initial dashboard page load displays visual content or skeleton feedback within 600ms on mobile devices.
- **SC-007**: 100% of validation pipeline commands (`npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`) pass cleanly with zero errors.

## Assumptions

- **Zero Financial Cost**: The solution operates strictly within the perpetual Supabase Free Tier (500MB PostgreSQL, 1GB Storage, 50,000 monthly active auth users), guaranteeing R$ 0,00 operational costs.
- **Browser Capabilities**: Target mobile browsers (Safari on iOS 16+, Chrome on Android 12+) support modern Canvas API `toBlob` with `image/webp` format and ES2022 features.
- **Storage Bucket Configuration**: The Supabase Storage bucket `atelier-media` is configured as public for reads so that image URLs can be rendered directly by browser `<img />` tags without expensive signed URL roundtrips.
- **PWA Installation**: Persistent cookies and browser storage survive PWA home-screen app launches in iOS WebKit and Android Chromium environments.
- **Network Requirement**: Initial authentication, data sync, and photo uploads require an active internet connection; cached local states remain viewable when connectivity is unavailable.
