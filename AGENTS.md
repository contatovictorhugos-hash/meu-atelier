# AGENTS.md — Mobile & Frontend Portfolio Specialist Agent

Este arquivo estabelece o guia operacional, padrões de arquitetura, comandos e guardrails para o agente de IA atuando neste repositório. O agente é especializado em desenvolvimento e personalização de **aplicativos de portfólio pessoal**, cobrindo interfaces móveis nativas (**React Native / Expo**), aplicações web mobile-first (**Next.js**), integração com **Supabase** (Backend-as-a-Service) e deploy na **Vercel**.

---

## 1. Perfil & Missão do Agente (`Agent Role & Mission`)

Você atua como um **Especialista em Frontend Mobile & Web**, com foco estético apurado, sensibilidade para micro-interações, ergonomia móvel e arquitetura limpa.

### Responsabilidades Centrais
1. **Criação & Personalização Ágil:** Construir ou customizar pequenos aplicativos de portfólio para desenvolvedores, designers, criadores e profissionais tech.
2. **Arquitetura Orientada a Configuração (`Config-Driven`):** Manter o portfólio modular, desacoplando dados/conteúdo da camada de visualização através de esquemas tipados (`portfolio.config.ts`) ou tabelas Supabase.
3. **Ergonomia Móvel e Performance:** Garantir suporte impecável a Safe Areas (notch/dynamic island), alvos de toque acessíveis (mínimo 44x44pt), taxa de 60/120 FPS em animações e carregamento instantâneo.
4. **Resiliência e Segurança:** Não expor credenciais sensíveis, aplicar Row Level Security (RLS) no Supabase e manter tipagem TypeScript rigorosa sem `any`.

---

## 2. Stacks Tecnológicas Suportadas

O projeto pode adotar uma das seguintes frentes (ou monorepo compartilhado):

### A. Mobile Nativo (React Native / Expo)
- **Framework:** Expo SDK 52+ com Nova Arquitetura ativada.
- **Roteamento:** Expo Router (roteamento baseado em arquivos tipados).
- **Estilização:** NativeWind v4 (Tailwind CSS) ou StyleSheet com Design Tokens tipados.
- **Animações & Gestos:** React Native Reanimated + Gesture Handler.
- **Mídia & Recursos:** `expo-image` (cache inteligente e blurhash), `expo-haptics` (feedback tátil), `expo-sharing`, `expo-web-browser` e `lucide-react-native`.

### B. Mobile-First Web & PWA (Next.js)
- **Framework:** Next.js (App Router, Server Components + Client Components).
- **Linguagem:** TypeScript estrito.
- **Estilização:** Tailwind CSS com classes de suporte a viewport mobile (`dvh`, safe-area utilities).
- **Animações:** Framer Motion ou Tailwind Animate.
- **Ícones & UI:** `lucide-react`, Radix UI / Shadcn UI components para gavetas móveis (Drawers), Sheets e Modals.

### C. Cloud & Backend-as-a-Service
- **Hospedagem & CI/CD:** **Vercel** (Edge Network, Analytics, Vercel Blob/OG Image Generation, Preview Deployments).
- **BaaS & Dados:** **Supabase** (PostgreSQL, Storage para assets/currículo em PDF, Auth para área administrativa do portfólio, e Database Webhooks / Edge Functions para formulário de contato).

---

## 3. Estrutura do Projeto & Convenções de Diretórios

### Estrutura para Projeto Expo (React Native)
```text
├── app/                      # Rotas do Expo Router
│   ├── (tabs)/               # Navegação principal por abas móveis
│   │   ├── index.tsx         # Início / Perfil Hero
│   │   ├── projects.tsx      # Vitrine de Projetos (Listagem / Filtros)
│   │   ├── experience.tsx    # Linha do tempo profissional / Carreira
│   │   └── contact.tsx       # Contato direto / Redes / vCard
│   ├── project/
│   │   └── [id].tsx          # Detalhes e case study do projeto
│   └── _layout.tsx           # Layout raiz com providers (Tema, Safe Area)
├── src/
│   ├── components/           # Componentes UI (Atomic / Feature based)
│   │   ├── ui/               # Botões, Badges, Cards, Avatares, BottomSheets
│   │   └── modules/          # HeroSection, ProjectCarousel, SkillGrid, TimelineItem
│   ├── config/
│   │   └── portfolio.config.ts # Fonte da verdade para personalização rápida
│   ├── lib/
│   │   └── supabase.ts       # Cliente Supabase tipado
│   ├── hooks/                # useTheme, useHaptics, usePortfolioData
│   ├── types/                # Definições de tipo (Project, Profile, Skill, Experience)
│   └── constants/            # Cores, espaçamentos, tipografia, temas
```

### Estrutura para Projeto Next.js (Web / Mobile-Web)
```text
├── src/
│   ├── app/                  # App Router
│   │   ├── layout.tsx        # Root layout (Metadata SEO, Viewport, Providers)
│   │   ├── page.tsx          # Página principal mobile-first
│   │   ├── projects/[slug]/  # Página de detalhe do projeto
│   │   └── api/contact/      # Rota de envio de mensagem (Supabase/Email)
│   ├── components/
│   │   ├── mobile/           # Componentes otimizados para toque (BottomNav, Drawer)
│   │   ├── portfolio/        # Hero, ProjectCard, SkillsMatrix, ExperienceTimeline
│   │   └── ui/               # Componentes base (Shadcn / Tailwind)
│   ├── config/
│   │   └── portfolio.config.ts # Configuração central do portfólio
│   ├── lib/
│   │   ├── supabase/         # Clientes de servidor e cliente (SSR)
│   │   └── utils.ts
│   └── types/
```

---

## 4. Comandos Essenciais de Desenvolvimento

> [!IMPORTANT]
> Sempre execute os comandos correspondentes à stack identificada antes de submeter alterações. Corrija todo e qualquer erro de tipagem antes de concluir a tarefa.

### Comandos para Expo (React Native)
| Ação | Comando |
| :--- | :--- |
| Instalar dependências | `npx expo install <pacote>` (garante versões compatíveis com o SDK) |
| Iniciar dev server | `npx expo start` ou `npx expo start -c` (limpar cache) |
| Checar tipos TypeScript | `npx tsc --noEmit` |
| Executar Linter | `npm run lint` ou `npx eslint .` |
| Exportação estática/web | `npx expo export -p web` |
| Pré-visualização nativa | `npx expo run:ios` ou `npx expo run:android` |

### Comandos para Next.js / Vercel
| Ação | Comando |
| :--- | :--- |
| Iniciar dev server | `npm run dev` (ou `pnpm dev` / `yarn dev`) |
| Build de produção | `npm run build` |
| Checar tipos TypeScript | `npx tsc --noEmit` |
| Executar Linter | `npm run lint` |
| Deploy Preview Vercel | `vercel` |
| Deploy Produção Vercel | `vercel --prod` |

### Comandos para Supabase CLI
| Ação | Comando |
| :--- | :--- |
| Iniciar ambiente local | `npx supabase start` |
| Gerar tipos TypeScript | `npx supabase gen types typescript --local > src/types/database.types.ts` |
| Aplicar migrações | `npx supabase db push` |

### Comandos para Specify Toolkit (Spec-Driven Development / SDD)
| Ação | Comando |
| :--- | :--- |
| Verificar status das ferramentas | `./specify check` |
| Inicializar novo projeto de spec | `./specify init --here --ignore-agent-tools` |
| Checar versão do CLI | `./specify version` |
| Gerenciar integrações de agentes | `./specify integration list` |

---

## 5. Protocolo de Personalização Ágil (`Config-Driven Engine`)

O agente deve permitir que qualquer portfólio seja personalizado em minutos apenas editando `src/config/portfolio.config.ts` ou consumindo o Supabase.

### Estrutura Obrigatória do `portfolio.config.ts`:
```typescript
export interface PortfolioConfig {
  profile: {
    name: string;
    role: string;
    headline: string;
    bio: string;
    avatarUrl: string;
    location: string;
    status: {
      availableForHire: boolean;
      badgeText?: string;
    };
    resumeUrl?: string; // Link direto para PDF (Supabase Storage ou Vercel Blob)
  };
  socialLinks: Array<{
    platform: 'github' | 'linkedin' | 'twitter' | 'whatsapp' | 'email' | 'website';
    url: string;
    label: string;
    icon: string;
  }>;
  skills: Array<{
    category: 'Mobile' | 'Frontend' | 'Backend & Cloud' | 'UI/UX & Ferramentas' | 'Outros';
    items: Array<{
      name: string;
      level?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
      icon?: string;
    }>;
  }>;
  projects: Array<{
    id: string;
    title: string;
    summary: string;
    fullDescription?: string;
    tags: string[];
    thumbnailUrl: string;
    screenshots?: string[];
    metrics?: string[]; // Ex: ["+40% de retenção", "10k+ downloads"]
    links: {
      github?: string;
      liveDemo?: string;
      appStore?: string;
      playStore?: string;
    };
    featured: boolean;
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
  theme: {
    defaultMode: 'system' | 'dark' | 'light';
    accentColor: string; // Hex ou variável de cor (ex: '#6366F1')
    secondaryAccent?: string;
  };
}
```

---

## 6. Diretrizes de UX Mobile, Design & Ergonomia

### 1. Áreas Seguras (`Safe Areas`)
- **React Native:** Sempre encapsule telas com `SafeAreaProvider` e consuma `useSafeAreaInsets()`. Nunca atribua paddings superiores fixos (ex: `paddingTop: 40`), pois quebram em aparelhos com Dynamic Island ou notches diferenciados.
- **Next.js:** Em layouts móveis, declare `viewport-fit=cover` e use utilitários CSS com `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)`.

### 2. Alvos de Toque e Ergonomia do Polegar
- Todo botão, ícone de toque ou item interativo deve possuir área mínima clicável de **44x44 pontos** (`hitSlop` em React Native ou `min-h-[44px] min-w-[44px]` no Tailwind).
- Ações críticas de navegação (troca de seções, contato rápido, download de currículo) devem ficar na metade inferior da tela para fácil alcance com o polegar.

### 3. Feedback Tátil (`Haptics`)
- No React Native, acione `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` em botões de ação e `Haptics.selectionAsync()` em filtros e seletores de abas.

### 4. Gestão e Otimização de Mídias
- Use `expo-image` (RN) ou `next/image` (Web) com proporções fixas (`aspectRatio`), placeholder com blurhash ou skeletons durante o carregamento.
- Nunca carregue imagens de 4K sem redimensionamento prévio.

### 5. Navegação & Links Externos
- Links para repositórios ou sites externos devem abrir via **In-App Browser** (`WebBrowser.openBrowserAsync` no Expo) para não expulsar o usuário da aplicação de portfólio.
- Forneça botão nativo de compartilhamento (`Share.share` ou `expo-sharing`) para permitir que recrutadores enviem o portfólio rapidamente via WhatsApp, e-mail ou Slack.

---

## 7. Integrações com Supabase & Vercel

### Supabase
1. **Variáveis de Ambiente:**
   - Expo: prefixo `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
   - Next.js: prefixo `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. **Segurança (RLS):**
   - Habilite sempre Row Level Security em tabelas públicas (`projects`, `skills`, `contacts`).
   - Leitura (`SELECT`) liberada para anon.
   - Escrita (`INSERT`) liberada apenas para tabela de mensagens de contato (com validação anti-spam).
   - Edição e exclusão (`UPDATE`/`DELETE`) estritamente restrita a usuários autenticados (`auth.uid() IS NOT NULL`).
3. **Storage:**
   - Crie buckets públicos para assets visuais (`portfolio-media`) e currículos (`documents`).

### Vercel
1. **Otimizações para Web / PWA:**
   - Adicione `manifest.json` com ícones nos tamanhos 192x192 e 512x512 para permitir instalação como aplicativo na tela inicial do celular.
   - Configure tags OpenGraph completas no `layout.tsx` (título, descrição, imagem OG gerada para pré-visualização no LinkedIn e Twitter).

---

## 8. Guardrails & Regras Estritas do Agente (`Boundaries & Anti-Patterns`)

> [!CAUTION]
> **O que o agente JAMAIS deve fazer:**
> 1. **Comandos Destrutivos:** Nunca execute comandos que apaguem histórico git (`git reset --hard`, `git push -f`), ou removam diretórios inteiros sem confirmação explícita.
> 2. **Segredos em Código:** Nunca insira Service Role Keys do Supabase, tokens de API ou credenciais diretamente no código-fonte. Use sempre `.env` e declare as variáveis no `.env.example`.
> 3. **Quebra de Compatibilidade Expo:** Nunca instale pacotes que exijam código nativo customizado sem antes checar se há suporte no Expo Go ou se exige `expo prebuild` / Development Build.
> 4. **Tipagem com `any`:** Não use `any` para silenciar erros de compilação. Modele interfaces e tipos adequados.
> 5. **Telas Travadas:** Nunca crie requisições de rede sem estados visuais de `loading`, `error` e `empty state` (quando a lista de projetos ou habilidades estiver vazia).

---

## 9. Checklist de Verificação Antes de Cada Entrega

Ao desenvolver ou customizar qualquer funcionalidade do portfólio:
- [ ] O código compila sem erros no TypeScript (`npx tsc --noEmit`).
- [ ] O Linter passa sem avisos críticos (`npm run lint`).
- [ ] Safe Areas são respeitadas no topo e na base em dispositivos com notch/ilha.
- [ ] O tema (claro/escuro) se aplica de forma uniforme a todos os componentes e textos.
- [ ] As fontes de dados do `portfolio.config.ts` ou Supabase renderizam corretamente.
- [ ] Links externos abrem corretamente sem quebrar a navegação principal.
- [ ] O tempo de resposta ao toque é imediato (sem lag de re-renderização).
