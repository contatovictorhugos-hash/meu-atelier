# 🎀 Atelier — Santuário Pessoal & Dashboard de Estilo de Vida

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.2.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-brown?style=for-the-badge)
![CI Status](https://img.shields.io/badge/CI-Passing_(64_tests)-brightgreen?style=for-the-badge)
![Cost](https://img.shields.io/badge/Custo-R%24_0%2C00_(Zero)-pink?style=for-the-badge)

<p align="center">
  <b>Um santuário visual e tátil para organizar rotinas, planejar refeições, montar looks e dominar os estudos jurídicos.</b><br>
  Inspirado na estética <i>Digital Scrapbook / Y2K Coquette Clean</i>, com foco em ergonomia móvel, fluidez a 60 FPS e privacidade offline-first.
</p>

[✨ Funcionalidades](#-funcionalidades-principais) •
[🏛️ Arquitetura](#-arquitetura--tecnologias) •
[🚀 Como Rodar](#-como-rodar-o-projeto) •
[🧪 Testes & Qualidade](#-testes--qualidade) •
[📜 Constituição](#-governança--constituição)

---

</div>

## 💖 Visão Geral

O **Atelier** nasceu para combater a frieza dos aplicativos corporativos tradicionais de produtividade, transformando o planejamento diário em um ritual de autocuidado, dopamina visual e acolhimento estético.

Combinando estética nostálgica (molduras polaroid, tons pastéis de blush e creme, acabamentos metálicos estilo digicam) com rigor técnico contemporâneo (arquitetura desacoplada, tipagem estrita sem `any`, 100% de disponibilidade offline e zero custo contínuo).

---

## ✨ Funcionalidades Principais

### 🎀 1. Daily Glow (Rotina & Autocuidado)
- **Controle de Hidratação Interativo**: Registro copo a copo com animação fluida e meta diária.
- **Rituais Matinais & Noturnos**: Checklists delicados para hábitos diários essenciais.
- **Destaque do Dia / Polaroid**: Capture ou cole o momento especial de hoje com suporte universal a fotos da câmera/galeria ou links web.
- **Frase Inspiradora**: Frase diária de acolhimento e foco.
- **Reset Diário Inteligente**: Detecção automática de virada de dia baseada no relógio local.

### 👗 2. Closet Inteligente & Look do Dia (OOTD)
- **Guarda-Roupa Cápsula Digital**: Peças categorizadas (Partes de Cima, Partes de Baixo, Calçados e Acessórios).
- **Montador de Looks Estilo Cher Horowitz**: Interface lúdica inspirada em *As Patricinhas de Beverly Hills*, com carrossel tátil para combinar peças instantaneamente.
- **Histórico de Looks com Selfies**: Salve os looks do dia com selfies reais comprimidas em WebP leve e persistência permanente em DataURL (sobrevive a F5 e funciona offline).

### 🏛️ 3. Caderno Jurídico & Estudos (`/legal`)
- **Matérias 100% Personalizáveis**: Cadastre, edite e organize suas disciplinas da faculdade.
  - Nome da matéria e docente responsável.
  - Seleção do dia da semana da aula (Segunda a Sábado).
  - Cores pastéis temáticas para cada disciplina (Blush, Lavanda, Manteiga, Menta, Céu, Pêssego).
  - Barra deslizante de progresso de leitura do semestre (0 a 100%).
- **Micro-Fichamentos Ilustrados**: Cadastre resumos com tags de matérias e fotos do Vade Mecum / anotações.
- **Rastreador de Prazos Processuais**: Gerencie prazos com tags de status (*Não iniciado*, *Em rascunho*, *Finalizado*).
- **Focus Timer (Pomodoro)**: Cronômetro integrado para ciclos de foco profundo nos estudos.

### 🍱 4. Planejador Bento & Marmitas (`/bento`)
- **Cardápio Semanal Interativo (7 Dias)**: Planejamento alimentar completo de Segunda a Domingo.
  - Suporte a múltiplos tipos de refeição (*Café da Manhã*, *Almoço*, *Lanche*, *Jantar*).
  - Suporte a múltiplas refeições no mesmo dia.
  - Foto da marmita/prato via upload do celular ou link web.
  - Tags de ingredientes principais.
  - Destaque automático para a refeição de **Hoje ✨**.
- **Guia de Prep de Domingo (Sunday Prep)**: Checklist dinâmico de pré-cozimento semanal, permitindo adicionar, concluir e excluir etapas.
- **Lista de Feira & Mercado**: Organização por categoria (*Hortifrúti*, *Geladeira*, *Despensa*, *Outros*) com botão de limpeza em lote dos itens comprados no carrinho.

---

## 🏛️ Arquitetura & Tecnologias

O projeto adota uma arquitetura **Offline-First**, **Modular** e **Config-Driven**:

```text
src/
├── app/                           # Next.js 15 App Router
│   ├── (dashboard)/
│   │   ├── page.tsx               # Home: Hero, Daily Glow & Closet Quickview
│   │   ├── closet/page.tsx        # Módulo Closet Inteligente & Look Builder
│   │   ├── legal/page.tsx         # Caderno Jurídico & Matérias
│   │   ├── bento/page.tsx         # Planejador Bento & Marmitas
│   │   └── layout.tsx             # Layout persistente com BottomNav
│   ├── api/upload/presigned/      # Endpoint seguro para upload de mídia
│   └── layout.tsx                 # Root layout com Safe Area e PWA metadata
├── components/
│   ├── layout/                    # BottomNav, PolaroidFrame, ScrapbookCard
│   ├── modules/
│   │   ├── closet-ootd/           # LookBuilder, WardrobeManager, OutfitHistory
│   │   ├── daily-glow/            # DailyGlowWidget, WaterTracker, HabitsChecklist
│   │   ├── legal-binder/          # CourseCards, CourseModal, StudyNotes, FocusTimer
│   │   └── meal-planner/          # WeeklyMealGrid, MealModal, SundayPrep, ShoppingList
│   └── ui/                        # Button, Input, Modal, Badge, ImageUploadField
├── stores/                        # Stores reativas Zustand com persistência local
│   ├── useClosetStore.ts
│   ├── useDailyGlowStore.ts
│   ├── useLegalStore.ts
│   └── useMealStore.ts
├── lib/
│   ├── utils/                     # image-compression, utils (cn, formatDate)
│   └── supabase/                  # Clientes SSR/Client tipados
└── types/
    └── database.types.ts          # Interfaces TypeScript canônicas (Zero 'any')
```

### Stack Tecnológica
- **Framework**: Next.js 15.2.0 (App Router, React 19)
- **Linguagem**: TypeScript 5.7.3 estrito
- **Estilização**: Tailwind CSS 3.4 com tokens customizados Y2K
- **Gerenciamento de Estado**: Zustand 5 com middleware `persist` (`localStorage`)
- **Ícones**: Lucide React
- **Processamento de Mídia**: Compressão client-side em WebP via HTML5 Canvas
- **Infraestrutura & Deploy**: Vercel (Hobby Tier com Preview Deployments)
- **CI/CD**: GitHub Actions (Lint, Typecheck, Testes e Build)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 22 ou superior instalado.
- npm, pnpm ou yarn.

### 1. Clonar o Repositório
```bash
git clone https://github.com/contatovictorhugos-hash/meu-atelier.git
cd meu-atelier
```

### 2. Instalar as Dependências
```bash
npm install
# ou com lockfile determinístico:
npm ci
```

### 3. Configurar Variáveis de Ambiente (Opcional)
Copie o arquivo de exemplo para rodar com recursos de nuvem se desejar:
```bash
cp .env.example .env.local
```
*(Nota: A aplicação funciona 100% em modo offline local sem necessidade de preencher chaves de nuvem).*

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
# ou use o atalho:
./dev
```
Acesse **[http://localhost:3000](http://localhost:3000)** no seu navegador.

---

## 🧪 Testes & Qualidade

O projeto possui uma cultura inegociável de qualidade de software, auditada por agentes especializados de **QA (SDET)** e **Segurança (AppSec)**.

### Executar a Suíte Completa de Testes
```bash
npm run test
# ou use o atalho da suite completa:
./test-app
```
> **64 testes automatizados (100% PASS)** cobrindo:
> - Testes Unitários de Estado Zustand (Closet, Glow, Legal, Bento)
> - Testes de Integração de Rotas de API e Manifest PWA
> - Testes de Caixa Branca (Branch & Decision Coverage)
> - Testes de Caixa Preta (Cenários ponta a ponta)

### Checagem Rigorosa de Tipos TypeScript
```bash
npm run typecheck
```

### Análise Estática com ESLint
```bash
npm run lint
```

### Build de Produção
```bash
npm run build
```

---

## 🛡️ Fluxo de Branches & CI/CD

O Atelier adota um fluxo de integração contínua protegido:

- **`main`**: Branch de produção oficial. Qualquer merge nesta branch atualiza o site no ar na Vercel.
- **`dev`**: Branch de testes / staging. Cada push gera um **Preview Deployment** na Vercel com uma URL exclusiva para validação no celular antes de ir para a `main`.
- **GitHub Actions (`.github/workflows/ci.yml`)**: Executa automaticamente em todo push e Pull Request:
  1. Instalação limpa (`npm ci`).
  2. Checagem de tipos (`tsc --noEmit`).
  3. Linter (`next lint`).
  4. Execução dos 64 testes automatizados.
  5. Dry-run da compilação de produção (`next build`).

---

## 📜 Governança & Constituição

O projeto é regido pela [**Constituição do Atelier**](file:///.specify/memory/constitution.md) (v1.1.0), com destaque para os princípios soberanos:

1. **I. Dopamina Estética Y2K**: Interfaces aconchegantes, scrapbooks digitais e sensação de santuário pessoal.
2. **II. Ergonomia Móvel**: Alvos de toque mínimos de 44x44 pontos, respeito rigoroso a Safe Areas e thumb-zone.
3. **III. Config-Driven**: Desacoplamento entre dados de domínio e camada visual.
4. **IV. Tipagem Estrita Sem `any`**: 100% de cobertura tipada.
5. **V. Privacidade & Offline-First**: Dados persistidos localmente sem dependência obrigatória de conexão.
6. **VI. Custo Financeiro Zero (R$ 0,00)**: Infraestrutura perpétua em camadas gratuitas (Vercel Hobby, Supabase Free Tier, Cloudflare R2), sem serviços pagos ou faturas surpresa.

---

<div align="center">

Feito com 💖, muito café e carinho estético.  
*Atelier © 2026 — Seu santuário digital diário.*

</div>
