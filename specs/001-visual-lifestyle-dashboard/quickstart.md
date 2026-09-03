# Quickstart & End-to-End Validation Guide: Atelier Dashboard

This guide describes how to run and validate the Atelier Visual Lifestyle Dashboard across mobile and desktop environments.

## 1. Prerequisites & Environment Setup

- Node.js 20+ installed.
- Supabase project URL and anon public key configured in `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  CLOUDFLARE_R2_PUBLIC_DOMAIN=https://media.atelier.app
  ```

## 2. Dev Server & Launch

```bash
# Install dependencies
npm install

# Run TypeScript typecheck
npx tsc --noEmit

# Start development server
npm run dev
```

The application will be accessible locally at `http://localhost:3000`.

---

## 3. End-to-End Validation Scenarios

### Scenario 1: PWA Mobile Installation & Safe Area Audit
1. Open Chrome on Android (or Safari on iOS) and navigate to the application URL.
2. Verify banner or prompt to "Install app" / "Add to Home screen".
3. Tap Install and launch from the home screen.
4. **Expected Outcome**:
   - Application launches in standalone mode (no browser address bar).
   - Top notch / Dynamic Island is respected with safe-area spacing.
   - Bottom home bar does not obscure primary thumb-zone actions.

### Scenario 2: Morning Glow Ritual (Hydration & Habits)
1. In the `Daily Glow` top section, tap the first three water drops.
2. **Expected Outcome**: Water drops fill with soft pastel color; count shows "3/8".
3. Check the "Skincare Matinal" sticker button.
4. **Expected Outcome**: Button emits micro-animation and stays marked.
5. Reload the page (or disconnect network).
6. **Expected Outcome**: State remains preserved from local Zustand storage.

### Scenario 3: OOTD Look Creation
1. Navigate to the `OOTD Studio` tab.
2. Select a registered blouse (top), skirt (bottom), and loafers (shoes).
3. Choose the "Trabalho" occasion tag and tap "Salvar Look".
4. **Expected Outcome**: The outfit collage card appears immediately in the weekly look gallery.

### Scenario 4: Meal Plan & Sunday Prep
1. Switch to `Bento & Marmitas`.
2. Inspect Monday through Friday cards; toggle a Sunday batch-cook task (e.g., "Legumes assados").
3. Switch to the grocery shopping list; tap "Abobrinha" to complete.
4. **Expected Outcome**: The item is crossed out in real-time.

### Scenario 5: Legal Binder & Pomodoro Focus
1. Open `Caderno Jurídico`.
2. Select "Direito Constitucional"; verify reading progress slider updates without lag.
3. Open the Focus Lounge and tap "Iniciar Foco" (25m timer).
4. **Expected Outcome**: Retro digicam LCD viewfinder counts down seconds accurately.
