# Implementation Plan: Atelier Visual Lifestyle & Routine Dashboard

**Branch**: `001-visual-lifestyle-dashboard` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-visual-lifestyle-dashboard/spec.md`

## Summary

Build the mobile-first Progressive Web App (PWA) for Atelier, delivering a personalized aesthetic sanctuary (*Digital Scrapbook / Y2K Coquette Clean*) that integrates four core lifestyle modules: **Daily Glow** (morning habits, hydration drops, daily polaroid), **OOTD Studio** (visual closet & look builder), **Bento & Meal Planner** (weekly menu, Sunday prep & smart market list), and **Legal Binder** (law course cards, flashcards with photo attachments, deadline tracker & retro digicam Pomodoro).

The architecture leverages Next.js 15 (App Router) + Tailwind CSS deployed on Vercel, Supabase PostgreSQL with strict Row Level Security for data, Cloudflare R2 for zero-egress media storage, and Zustand with local persistence for instantaneous offline-first responsiveness.

## Technical Context

**Language/Version**: TypeScript 5.6+ / Node.js 20+

**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide React, Radix UI / shadcn/ui primitives, Framer Motion, Zustand (`persist` middleware), `browser-image-compression`

**Storage**: Supabase PostgreSQL (Free Tier) + Cloudflare R2 (10GB Free Tier, S3-compatible, zero egress fees)

**Testing**: Vitest, Playwright (Mobile viewport emulation), TypeScript strict type-checking (`npx tsc --noEmit`)

**Target Platform**: Mobile Web PWA (Chrome Android standalone `display: standalone` & Safari iOS) + Responsive Desktop

**Project Type**: Mobile-First Progressive Web Application

**Performance Goals**: < 1.5s cold mobile launch, 60 FPS micro-animations, < 350 KB per compressed photo upload, instant optimistic UI state updates

**Constraints**: Mobile safe-area compliance (`viewport-fit=cover`, `env(safe-area-inset-*)`), minimum 44x44pt touch targets, offline resilience for daily checklists/habits, zero recurring infrastructure costs

**Scale/Scope**: Personal private sanctuary (single authenticated user account), ~100-300 wardrobe items, weekly meal planning, 4-8 law school courses

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Dopamina Estética & Santuário Visual (Y2K Clean / Digital Scrapbook)**: **PASS**. Interface adopts custom pastel palette (blush `#FDF2F4`, cream `#FCFBF7`, silver `#E2E8F0`, bordeaux `#4A1525`), rounded cards, polaroid frames, and tactile sticker badges. No corporate or dry tabular views.
- **Principle II: Ergonomia Móvel & Micro-Interações Táteis (Thumb-Zone & 60 FPS)**: **PASS**. Navigation and primary action buttons reside in the lower thumb zone with `min-h-[44px] min-w-[44px]`. Full Safe Area integration.
- **Principle III: Arquitetura Modular & Orientada a Configuração**: **PASS**. The 4 core modules are strictly decoupled and export typed contracts. Config-driven defaults allow instant theming and customization.
- **Principle IV: Tipagem Estrita & Otimização Rigorosa de Mídia**: **PASS**. 100% strict TypeScript without `any`. Images are compressed on client side before upload to Cloudflare R2 and rendered with fixed aspect ratios and blur placeholders.
- **Principle V: Privacidade do Santuário Pessoal & Resiliência Offline**: **PASS**. Supabase Row Level Security (RLS) is enabled across all tables (`auth.uid() = user_id`). Zustand local persistence ensures core routines and habits work offline.
- **Principle VI: Custo Financeiro Zero & Recursos Gratuitos / Bônus Pré-existentes (NON-NEGOTIABLE)**: **PASS**. A arquitetura opera 100% dentro dos limites perpétuos gratuitos (Vercel Hobby, Supabase Free Tier, Cloudflare R2 com 10GB e zero egress fee). Qualquer serviço cognitivo/IA utiliza estritamente cotas e bônus da assinatura pré-existente do Google Pro do usuário, sem novos custos ou assinaturas.

## Project Structure

### Documentation (this feature)

```text
specs/001-visual-lifestyle-dashboard/
├── plan.md              # This file (Technical implementation plan)
├── research.md          # Technical research and architecture decisions
├── data-model.md        # Database schema, entities & RLS policies
├── quickstart.md        # End-to-end testing and validation scenarios
├── checklists/
│   └── requirements.md  # Quality gate checklist
└── contracts/           # Component and API contracts
    ├── ui-modules-contract.md
    └── storage-api-contract.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── presigned/route.ts  # Pre-signed upload generator for Cloudflare R2
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Mobile shell with Safe Areas & BottomNav
│   │   ├── page.tsx                # Unified Daily Life Dashboard
│   │   ├── closet/page.tsx         # OOTD Studio & Wardrobe Catalog
│   │   ├── bento/page.tsx          # Weekly Meal Planner & Shopping List
│   │   └── legal/page.tsx          # Law Studies Binder & Focus Lounge
│   ├── globals.css                 # Custom scrapbook styles & Y2K tokens
│   └── layout.tsx                  # Root layout, PWA viewport & meta tags
├── components/
│   ├── ui/                         # Base buttons, badges, modals, sliders
│   ├── layout/                     # BottomNav, PolaroidFrame, DigicamLCDHeader
│   └── modules/
│       ├── daily-glow/             # Morning habits, water tracker, mood card
│       ├── closet-ootd/            # Wardrobe grid, outfit builder, history
│       ├── meal-planner/           # Meal cards, Sunday prep, market list
│       └── legal-binder/           # Course cards, flashcards, deadlines, pomodoro
├── config/
│   └── portfolio.config.ts         # Central config & default seed data
├── lib/
│   ├── supabase/                   # Supabase browser & server clients
│   ├── r2/                         # Cloudflare R2 S3-compatible client
│   └── utils/                      # Image compression, date helpers, formatting
├── stores/                         # Zustand local-first persistent stores
│   ├── useDailyGlowStore.ts
│   ├── useClosetStore.ts
│   ├── useMealStore.ts
│   └── useLegalStore.ts
└── types/                          # TypeScript DTOs and Database models
    └── database.types.ts
```

**Structure Decision**: Selected the Web Application structure utilizing Next.js 15 App Router. All routes are mobile-first, styled via Tailwind CSS, and optimized for standalone PWA installation.

## Complexity Tracking

> **No Constitution violations detected.** All architectural choices strictly conform to the 5 sovereign principles.
