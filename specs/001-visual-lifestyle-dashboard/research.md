# Research & Technical Architecture: Atelier Visual Lifestyle Dashboard

## 1. Mobile-First PWA on Next.js App Router

### Decision
Implement as a Progressive Web App (PWA) using Next.js 15 (App Router), `next-pwa` / `@serwist/next` (or standard lightweight service worker with `manifest.json`), viewport configuration with `viewport-fit=cover`, and CSS environment variables for safe areas (`env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`).

### Rationale
- Enables full-screen app installation on Android via Chrome (`display: standalone`) and iOS via Safari with home screen icons (192x192 and 512x512).
- Zero friction: no app store fees ($99/yr Apple Developer fee avoided), instant deployment on Vercel Hobby tier.
- Complete control over HTML/CSS styling for the Y2K Coquette Clean scrapbook aesthetic (custom polaroid drop shadows, borders, sticker overlays).

### Alternatives Considered
- *React Native / Expo*: Exceptional native gestures and haptics, but introduces high build/distribution friction for the MVP (Expo Go requirements or TestFlight limitations), whereas PWA delivers instant updates via web URL.
- *Single Page App (Vite/CRA)*: Lacks native server component optimizations, OpenGraph generation, and effortless Vercel edge deployment provided out of the box by Next.js App Router.

---

## 2. Zero-Cost Media Storage (Cloudflare R2 + Client Compression)

### Decision
Adopt Cloudflare R2 (S3-compatible API) paired with client-side browser image compression (`browser-image-compression` or HTML Canvas) before upload.

### Rationale
- **Zero Egress Fees**: Cloudflare R2 provides 10 GB storage free with 0 egress costs, eliminating billing surprise risks for high-resolution outfit and Vade Mecum photos.
- **Client-Side Optimization**: Pre-compressing images to max 1200px width and WebP format under 300KB before uploading ensures fast mobile transmission and lightweight storage consumption.
- **Direct Pre-signed Uploads**: Next.js Route Handler issues short-lived pre-signed PUT URLs, allowing the browser to stream photos directly to R2 without hitting Vercel serverless payload limits (4.5MB body limit).

### Alternatives Considered
- *Supabase Storage*: 1GB free tier limit can fill quickly with daily photo logs and high-res wardrobe items.
- *Cloudinary Free Tier*: Credit-based usage limits with hard monthly caps that degrade when streaming uncompressed assets.

---

## 3. Database & Row Level Security (Supabase PostgreSQL)

### Decision
Use Supabase PostgreSQL (Free Tier) with `@supabase/supabase-js` and `@supabase/ssr`, enforcing strict Row Level Security (RLS) on all domain tables where `auth.uid() = user_id`.

### Rationale
- 500 MB relational database free tier easily holds tens of thousands of outfit items, meal plans, and study notes.
- Built-in Supabase Auth (Email magic link / Password) provides effortless personal sanctuary security without maintaining bespoke auth servers.
- Row Level Security ensures complete privacy: no user can inspect or mutate another user's outfits, notes, or routine logs.

### Alternatives Considered
- *Local-only SQLite/IndexedDB*: Lacks cross-device synchronization between mobile phone and desktop/notebook.
- *Firebase Firestore*: NoSQL structure makes relational joins (e.g. `outfit_items` linking `wardrobe_items` to `outfits`, or `study_deadlines` to `study_courses`) cumbersome and prone to data denormalization bugs.

---

## 4. UI Design System & Y2K Scrapbook Tokens (Tailwind CSS)

### Decision
Extend Tailwind CSS with dedicated tokens for the Y2K Coquette Clean / Digital Scrapbook aesthetic:
- **Colors**:
  - `atelier-blush-50`: `#FDF2F4` (background surface)
  - `atelier-blush-100`: `#FCE7EC` (card tint)
  - `atelier-blush-300`: `#F472B6` (accent highlight)
  - `atelier-cream`: `#FCFBF7` (paper/polaroid base)
  - `atelier-silver`: `#E2E8F0` / `#94A3B8` (digicam metallic borders)
  - `atelier-bordeaux`: `#4A1525` (rich readable text & buttons)
  - `atelier-charcoal`: `#1E1B1E` (high contrast typography)
- **Shadows**:
  - `shadow-scrapbook`: `0 8px 24px -4px rgba(244, 114, 182, 0.12), 0 4px 8px -2px rgba(30, 27, 30, 0.04)`
  - `shadow-polaroid`: `0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)`
- **Corners & Badges**:
  - `rounded-2xl` (16px) to `rounded-3xl` (24px) for cards; `rounded-full` for stickers and water drops.
- **Ergonomics**:
  - All interactive buttons enforce `min-h-[44px] min-w-[44px]`.

### Rationale
Complies 100% with Constitution Principle I (Aesthetic Dopamine) and Principle II (Mobile Ergonomics).

---

## 5. Offline-First Resilience & Local State Management (Zustand + Persist)

### Decision
Utilize Zustand with `persist` middleware for local-first UI state (active tab, daily water counter, morning habit checks, offline caches of today's schedule).

### Rationale
- Instantaneous optimistic UI updates: tapping a water drop or checking skincare marks immediately without waiting for network round-trips.
- Background sync: local updates are synchronized with Supabase asynchronously; if offline, user experience remains completely fluid and functional.
- Zero state boilerplate compared to Redux or complex query hydration.
