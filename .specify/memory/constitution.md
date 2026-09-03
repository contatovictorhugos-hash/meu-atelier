<!--
Sync Impact Report:
- Version Change: 1.0.0 → 1.1.0
- Modified Principles:
  - [NOVA ADIÇÃO] → VI. Custo Financeiro Zero & Uso Exclusivo de Recursos Gratuitos / Bônus Pré-existentes (NON-NEGOTIABLE)
- Added Sections:
  - Atualização dos Padrões Técnicos com restrição estrita de custo zero (Vercel Hobby, Supabase Free, Cloudflare R2 e bônus Google Pro)
- Removed Sections: None
- Follow-up TODOs: None
-->

# Atelier Constitution

## Core Principles

### I. Dopamina Estética & Santuário Visual (Digital Scrapbook / Y2K Clean)
Toda tela, módulo e micro-interação DEVE proporcionar prazer visual e sensação de santuário pessoal, seguindo a linguagem visual Digital Scrapbook / Y2K Coquette Clean.
- Componentes visuais DEVEM incorporar elementos táteis e nostálgicos: molduras polaroid, visor de câmera digital retrô (digicam LCD), cartões com cantos arredondados (`rounded-2xl` a `rounded-3xl`), sombras suaves estilo adesivos/recortes de revista e ícones delicados (lacinhos, estrelinhas, mini cabides, marmitas).
- A paleta de cores DEVE priorizar tons pastéis harmônicos: rosa blush (`#FDF2F4`, `#F8D7DA`), off-white/creme (`#FCFBF7`), toques metálicos prateados estilo cyber/digicam (`#E2E8F0`, `#94A3B8`) e acentos de contraste em bordô suave ou carvão (`#4A1525`, `#1E1B1E`).
- É TERMINANTEMENTE PROIBIDO adotar interfaces corporativas frias, tabelas densas monocromáticas ou formulários puramente textuais desprovidos de identidade estética.
*Racional*: O diferencial do Atelier é transformar o planejamento diário em um ritual de autocuidado e inspiração estética diária, combatendo a frieza dos aplicativos tradicionais.

### II. Ergonomia Móvel & Micro-Interações Táteis (Thumb-Zone & 60 FPS)
A experiência móvel DEVE ser prioritária (Mobile-First) e ergonômica, otimizada para operação com uma mão (Thumb-Zone).
- Todo elemento interativo DEVE ter área de toque mínima de 44x44 pontos (`hitSlop` no React Native ou `min-h-[44px] min-w-[44px]` no Tailwind).
- Ações críticas e frequentes (troca de abas, registro de hidratação, seleção de looks, timer) DEVEM situar-se na metade inferior da tela para alcance natural do polegar.
- Suporte a Safe Areas (`SafeAreaProvider`, `useSafeAreaInsets` ou `env(safe-area-inset-*)`) é OBRIGATÓRIO em todas as telas; espaçamentos fixos arbitrários no topo ou rodapé são estritamente proibidos.
- Transições, stickers clicáveis e seletores DEVEM oferecer feedback tátil (`expo-haptics` ou animações táteis imediatas) e manter taxa fluida de 60 a 120 FPS sem travamentos de thread.
*Racional*: Uma experiência visual rica perde o encanto se a usabilidade móvel for frustrante, inacessível ou lenta.

### III. Arquitetura Modular & Orientada a Configuração (Config-Driven)
A aplicação DEVE desacoplar rigidamente os dados de domínio da camada de apresentação visual através de esquemas tipados (`portfolio.config.ts`, stores locais ou tabelas Supabase).
- Módulos centrais (Closet Inteligente / OOTD, Bento & Meal Prep, Daily Glow-up / Rotina, Notas & Estudos) DEVEM ser autocontidos, desacoplados e operáveis independentemente.
- Modificações de conteúdo, temas, checklists ou itens da rotina DEVEM ser possíveis via configuração estruturada sem necessidade de refatorar componentes visuais de layout.
- Novos recursos DEVEM começar como componentes reutilizáveis e esquemas bem definidos antes de serem integrados ao fluxo central.
*Racional*: Garante escalabilidade ágil, facilidade de personalização e manutenção limpa entre as fases do produto (do MVP inicial até integrações completas de backend).

### IV. Tipagem Estrita & Otimização Rigorosa de Mídia (NON-NEGOTIABLE)
TypeScript estrito DEVE ser adotado em 100% da base de código, com tolerância zero para o tipo `any` ou type assertions perigosas.
- O uso de `any` para contornar verificações do compilador é TERMINANTEMENTE PROIBIDO; interfaces e tipos discriminados DEVEM modelar todas as entidades (looks, refeições, hábitos, notas).
- Como o produto é intensivo em imagens (scrapbook, fotos de roupas, fotos de marmitas, polaroids), TODA mídia DEVE utilizar proporções fixas (`aspectRatio`), placeholders com blurhash/skeletons, carregamento preguiçoso (lazy loading) e redimensionamento adequado antes da renderização.
- Imagens em alta resolução nunca DEVEM bloquear a renderização inicial da interface ou comprometer o consumo de memória móvel.
*Racional*: Estabilidade técnica e performance de renderização impecável são fundamentais para sustentar uma interface rica em mídia e micro-interações sem degradação no dispositivo do usuário.

### V. Privacidade do Santuário Pessoal & Resiliência Offline
O Atelier é um espaço íntimo e pessoal; a segurança, privacidade e disponibilidade contínua dos dados do usuário DEVEM ser invioláveis.
- Toda persistência em nuvem (Supabase) DEVE aplicar Row Level Security (RLS) estrito: leitura e escrita pertencem exclusivamente ao usuário autenticado (`auth.uid() = user_id`).
- Credenciais sensíveis, chaves de serviço ou segredos de API NUNCA DEVEM ser expostos no bundle de cliente ou versionados no Git.
- A aplicação DEVE manter resiliência offline (offline-first com cache local/Zustand persistido ou SQLite/AsyncStorage), garantindo que consultas a rotinas, looks e checklists funcionem sem interrupção mesmo na ausência de conexão.
- Todas as operações de rede DEVEM possuir estados visuais explícitos de carregamento (skeletons delicados), erro amigável e estado vazio acolhedor (empty state ilustrado).
*Racional*: Um santuário pessoal exige confiança absoluta de que registros, fotos íntimas e anotações estão protegidos e acessíveis a qualquer momento.

### VI. Custo Financeiro Zero & Uso Exclusivo de Recursos Gratuitos / Bônus Pré-existentes (NON-NEGOTIABLE)
O custo financeiro operacional contínuo do projeto DEVE ser estritamente ZERO (R$ 0,00). É terminantemente PROIBIDO adotar ferramentas, bancos de dados, APIs ou serviços de nuvem pagos ou que gerem cobranças variáveis não limitadas (*pay-as-you-go* sem teto rígido garantido de zero).
- Toda a infraestrutura DEVE operar exclusivamente dentro de camadas perpétuas gratuitas (*Free Tiers* generosos: Vercel Hobby para hospedagem/CI-CD, Supabase Free Tier para PostgreSQL/Auth, Cloudflare R2 com 10GB de storage e zero custo de saída/egress).
- Caso sejam incorporadas inteligências artificiais ou serviços cognitivos auxiliares, DEVE-SE utilizar no máximo cotas, créditos e bônus já inclusos na assinatura pré-existente do Google (Google Pro / Google One / Google AI Studio) do mantenedor, sem criar novas assinaturas ou custos extras.
- O sistema DEVE adotar salvaguardas técnicas preventivas: compressão rigorosa de imagens no navegador antes do upload, cache local agressivo via Zustand e limites de requisição para assegurar que as cotas gratuitas jamais sejam violadas.
*Racional*: O Atelier é um santuário pessoal e um presente; sob hipótese alguma deve se tornar um vetor de custos fixos recorrentes, faturas surpresa no cartão de crédito ou estresse financeiro.

## Padrões Técnicos & Restrições Estéticas

### 1. Pilha Tecnológica Aprovada (Conformidade com Custo Zero)
- **Frontend Móvel / Web**: React Native com Expo (SDK 52+, Nova Arquitetura, Expo Router) e/ou Next.js (App Router, Server + Client Components, Tailwind CSS) com deploy gratuito na Vercel (Hobby Tier).
- **Estilização**: Tailwind CSS / NativeWind com tokens de design estendidos (cores pastéis, bordas personalizadas, sombras scrapbook).
- **Animações & Gestos**: Framer Motion (Web) / React Native Reanimated + Gesture Handler (Mobile).
- **Backend & Armazenamento**: Supabase (PostgreSQL 500MB Free Tier, Auth, RLS) + Cloudflare R2 (10GB Free Tier com zero taxa de tráfego de saída).
- **Inteligência / APIs Auxiliares**: Exclusivamente limites e bônus da assinatura pré-existente do Google Pro.

### 2. Design Tokens Oficiais (Tema Y2K Coquette Clean)
- `palette.blush`: `#FDF2F4` (fundo suave), `#F8D7DA` (card/hover), `#F472B6` (destaque primário).
- `palette.cream`: `#FCFBF7` (área de conteúdo limpa e aconchegante).
- `palette.silver`: `#E2E8F0` / `#94A3B8` (bordas metálicas, chassi digicam Y2K).
- `palette.accent`: `#4A1525` (bordô suave para botões principais), `#1E1B1E` (texto de alta legibilidade).
- `radius`: Cartões em `rounded-2xl` (16px) a `rounded-3xl` (24px); stickers e badges em `rounded-full`.
- `shadow`: Sombras difusas e leves com leve dispersão rosada/neutra simulando recortes colados.

## Fluxo de Desenvolvimento & Quality Gates

### 1. Governança Orientada a Especificação (Spec-Driven Development)
- Todo novo módulo ou funcionalidade DEVE ser previamente especificado (`/speckit-specify`), planejado tecnicamente (`/speckit-plan`) e decomposto em tarefas atômicas (`/speckit-tasks`) antes da implementação (`/speckit-implement`).
- Modificações de comportamento ou adições ao escopo não documentadas são proibidas.

### 2. Quality Gates Obrigatórios Pré-Merge/Entrega
1. **Verificação de Tipos**: `npx tsc --noEmit` DEVE passar com zero erros.
2. **Linting Rigoroso**: `npm run lint` ou `npx eslint .` DEVE passar sem advertências bloqueantes.
3. **Auditoria de Custo Zero**: Nenhum componente ou biblioteca que exija chave de API com tarifação ativa ou cartão cadastrado para cobrança pode ser introduzido.
4. **Ergonomia & Safe Area**: Layout DEVE ser verificado em dispositivos móveis reais ou simulados (Dynamic Island, notches e barras inferiores de navegação).
5. **Estados de Interface**: Todo componente conectado a dados DEVE implementar estados visuais de `loading`, `error` e `empty state`.
6. **Auditoria de Performance de Mídia**: Nenhuma imagem desotimizada ou sem placeholder pode ser entregue em produção.

## Governance

- **Autoridade**: Esta Constituição é o documento soberano que rege a arquitetura, padrões estéticos, ergonomia e decisões técnicas do projeto Atelier. Suas diretrizes sobrepõem-se a quaisquer preferências pontuais ou convenções não documentadas.
- **Procedimento de Emenda**: Qualquer alteração, inclusão ou remoção de princípios exige proposta formal documentada, justificativa detalhada de impacto, plano de migração para componentes afetados e aprovação explícita.
- **Versionamento Semântico**:
  - `MAJOR` (X.0.0): Quebra ou redefinição incompatível de princípios de governança, arquitetura ou design.
  - `MINOR` (0.X.0): Adição de novos princípios, seções ou diretrizes substantivas sem revogar as anteriores.
  - `PATCH` (0.0.X): Ajustes de redação, correções tipográficas ou esclarecimentos contextuais não normativos.
- **Revisão de Conformidade**: Todas as especificações, planos de implementação e Pull Requests DEVEM validar conformidade direta com os 6 princípios centrais antes de serem aprovados.

**Version**: 1.1.0 | **Ratified**: 2026-09-02 | **Last Amended**: 2026-09-02
