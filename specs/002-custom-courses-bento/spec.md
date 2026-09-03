# Feature Specification: Personalização Total de Matérias Jurídicas e Cardápio Bento

**Feature Branch**: `002-custom-courses-bento`  
**Created**: 2026-09-02  
**Status**: Draft  
**Input**: User description: "quero que em /legal seja possível editar as materias, adiconar novas, apagar, colocar o nome do professor que dia da semana ocorre, além disso quero que reformule a /bento, acredito que nao está personalizavel está tudo meio mockado"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gestão Completa de Matérias Acadêmicas no Caderno Jurídico (Priority: P1)

Como estudante de Direito e usuária do Atelier, quero poder cadastrar novas disciplinas, editar os dados das matérias existentes (incluindo nome do professor, dia da semana em que a aula ocorre e cor temática) e apagar matérias que já concluí, para que meu caderno reflita fielmente minha grade horária real da faculdade.

**Why this priority**: É o núcleo da personalização do módulo de estudos (`/legal`). Atualmente os dados são fixos com apenas 3 matérias pré-definidas, impedindo que usuárias adaptem a ferramenta à sua realidade acadêmica.

**Independent Test**: Pode ser testado de forma autônoma acessando `/legal`, adicionando uma nova matéria com professor e dia da semana (ex: "Direito Processual Civil", "Prof. Dr. Ricardo", "Quintas-feiras", cor lavanda), editando o percentual de leitura e excluindo uma matéria de teste, verificando a persistência após recarregar a página.

**Acceptance Scenarios**:
1. **Given** que estou na aba `/legal`, **When** clico no botão "+ Nova Matéria", **Then** abre-se um modal permitindo preencher: nome da matéria, nome do professor, seletor de dia da semana (Segunda a Sexta ou Sábado), e seletor de cor pastel de destaque.
2. **Given** uma matéria cadastrada no painel, **When** clico no botão de editar da matéria, **Then** o formulário é carregado com os dados atuais e, ao salvar, o card exibe as novas informações imediatamente.
3. **Given** uma matéria que não curso mais, **When** clico no ícone de exclusão da matéria e confirmo, **Then** a matéria é removida da lista e da grade de progresso.
4. **Given** matérias com dias da semana cadastrados, **When** visualizo os cards na tela, **Then** cada card exibe uma tag elegante com o dia da aula (ex: "📅 Terças-feiras") e o nome do docente com legibilidade impecável.

---

### User Story 2 - Cardápio Semanal Totalmente Personalizável e Interativo no Bento (Priority: P1)

Como usuária que planeja sua alimentação e marmitas da semana, quero poder cadastrar, editar e remover as refeições de cada dia da semana (Segunda a Domingo) em `/bento`, escolhendo o tipo de refeição, título do prato, lista de ingredientes e foto da marmita (via upload da galeria ou link), para que o cardápio não seja uma tela de demonstração mockada, mas sim minha ferramenta de rotina ativa.

**Why this priority**: A aba `/bento` continha dados fixos somente para Segunda a Sexta sem possibilidade de edição pelo usuário. Dar controle total sobre as marmitas semanais transforma a tela em uma experiência viva e indispensável de autocuidado.

**Independent Test**: Pode ser testado acessando `/bento`, clicando em qualquer dia da semana (ou no botão de adicionar refeição), cadastrando uma nova refeição (ex: "Salada Caesar com Frango Grelhado", tipo "Almoço", ingredientes "Frango, Alface, Parmesão, Molho Caesar", importando uma foto) e verificando a renderização imediata do cardápio.

**Acceptance Scenarios**:
1. **Given** que estou na aba de Cardápio Semanal em `/bento`, **When** clico em qualquer dia ou refeição existente, **Then** abre-se um modal de edição com campos para: dia da semana, tipo de refeição (Café, Almoço, Lanche, Jantar), nome do prato, lista de ingredientes e o componente de importação de foto (`ImageUploadField`).
2. **Given** um dia sem refeição planejada, **When** clico em "+ Planejar Refeição", **Then** posso criar uma nova entrada para aquele dia específico.
3. **Given** uma refeição planejada que quero descartar, **When** clico em remover refeição, **Then** o card volta ao estado acolhedor de slot vago ("Toque para planejar o almoço de terça").
4. **Given** o dia atual do calendário, **When** acesso a tela `/bento`, **Then** o dia de hoje recebe destaque visual sutil ("Refeição de Hoje ✨") para facilitar a consulta rápida antes de sair de casa.

---

### User Story 3 - Personalização do Guia de Prep de Domingo & Lista de Compras da Feira (Priority: P2)

Como usuária organizada, quero poder adicionar e gerenciar minhas próprias tarefas de pré-cozimento no "Sunday Prep Guide" e cadastrar/organizar itens na minha "Lista de Feira", para que minhas etapas de cozinha e mercado sejam sob medida para a minha rotina.

**Why this priority**: Complementa o ecossistema do Bento, eliminando tarefas pré-definidas imutáveis e permitindo que a usuária crie suas listas de compras e pré-preparo reais.

**Independent Test**: Pode ser testado na aba `/bento` acessando "Prep de Domingo", adicionando a tarefa "Higienizar morangos e uvas", marcando-a como concluída, e na "Lista de Feira" adicionando "Azeite de Oliva" na categoria "Despensa" e excluindo um item.

**Acceptance Scenarios**:
1. **Given** a aba "Prep de Domingo", **When** digito uma nova tarefa e clico em "+ Adicionar", **Then** a tarefa é inserida na lista de checklist interativo e o percentual de conclusão é recalculado automaticamente.
2. **Given** qualquer tarefa do Sunday Prep, **When** clico no ícone de exclusão da tarefa, **Then** a tarefa é removida da lista.
3. **Given** a "Lista de Feira", **When** adiciono um item selecionando sua categoria (Hortifrúti, Geladeira, Despensa, Outros), **Then** ele é agrupado corretamente e pode ser alternado entre pendente e concluído com um toque.
4. **Given** itens concluídos na lista de compras, **When** clico no botão "Limpar Concluídos", **Then** todos os itens já comprados são removidos em lote.

---

### Edge Cases

- **Exclusão de matéria com fichamentos vinculados**: Se o usuário excluir uma matéria de Direito que possui fichamentos ou anotações, os fichamentos associados devem permanecer acessíveis sob uma identificação neutra ou o usuário deve ser alertado antes de confirmar a exclusão.
- **Cardápio com múltiplos itens no mesmo dia**: O usuário pode querer cadastrar tanto o "Almoço" quanto o "Lanche" para a Quarta-feira. O sistema deve suportar múltiplas refeições no mesmo dia ou permitir seleção por tipo de refeição.
- **Valores vazios ou com espaços em branco**: Tentativas de salvar matérias ou refeições com títulos vazios devem ser bloqueadas com feedback visual acessível sem fechar o modal.
- **Uso offline sem conexão**: Todas as criações, edições e exclusões devem operar instantaneamente no navegador do usuário e persistir localmente via `localStorage`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir a criação de novas matérias acadêmicas em `/legal`, coletando obrigatoriamente nome da disciplina e facultativamente nome do professor, dia da semana (Segunda a Sábado), percentual inicial de leitura e cor temática.
- **FR-002**: O sistema DEVE permitir a edição integral de qualquer matéria existente (nome, professor, dia da semana, cor de destaque e barra deslizante de leitura).
- **FR-003**: O sistema DEVE permitir a exclusão de matérias em `/legal` com confirmação direta de ação pelo usuário.
- **FR-004**: Os cards de matéria no componente `CourseCards` DEVEM exibir visualmente o nome do professor e o dia da semana com estética Y2K e tipografia de alto contraste.
- **FR-005**: O sistema DEVE permitir adicionar, editar e excluir refeições no cardápio de `/bento` para todos os dias da semana (Segunda a Domingo).
- **FR-006**: Cada item de refeição DEVE suportar: dia da semana, tipo de refeição (Café, Almoço, Lanche, Jantar), título do prato, lista de ingredientes e foto importada via galeria do celular ou link web.
- **FR-007**: O sistema DEVE permitir adicionar novas tarefas personalizadas no "Guia de Prep de Domingo" (`SundayPrepGuide`) e excluir tarefas existentes.
- **FR-008**: O sistema DEVE permitir adicionar, marcar como concluído, excluir individualmente e limpar em lote itens da "Lista de Feira" (`ShoppingList`).
- **FR-009**: Todas as alterações realizadas pelo usuário DEVEM ser persistidas de forma autônoma e imediata no armazenamento local (`localStorage`), sobrevivendo a recarregamentos de página (F5) e funcionando em modo offline.
- **FR-010**: Todos os botões, interruptores e seletores DEVEM respeitar o alvo de toque móvel mínimo de 44x44 pontos e a paleta de cores oficial da Constituição do Atelier.

### Key Entities

- **StudyCourse**: Representa uma disciplina cursada no semestre. Atributos: `id`, `name`, `professor` (opcional), `day_of_week` (ex: "Segunda-feira" ou 1-6), `color_accent` (hexadecimal/classe pastel), `progress_percentage` (0-100%).
- **MealPlanItem**: Representa uma refeição planejada no cardápio. Atributos: `id`, `day_of_week` (1-7 para Seg-Dom), `meal_type` ('Café' | 'Almoço' | 'Lanche' | 'Jantar'), `title`, `ingredients` (array de strings), `photo_url` (opcional, DataURL ou URL web).
- **PrepTask**: Tarefa de pré-cozimento semanal. Atributos: `id`, `task`, `completed` (booleano).
- **ShoppingItem**: Item de suprimentos para o mercado/feira. Atributos: `id`, `item_name`, `category` ('Hortifrúti' | 'Geladeira' | 'Despensa' | 'Outros'), `is_completed` (booleano).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue adicionar uma nova matéria acadêmica completa (com professor e dia da semana) em menos de 30 segundos.
- **SC-002**: O usuário consegue personalizar uma refeição do cardápio semanal (título, foto e ingredientes) em menos de 45 segundos.
- **SC-003**: 100% dos dados cadastrados ou editados persistem intactos após recarregamento de aba ou fechamento do navegador.
- **SC-004**: 100% das áreas de clique e toque nos formulários de cadastro e botões de ação cumprem o padrão ergonômico móvel de 44x44 pontos.
- **SC-005**: Zero erros de compilação TypeScript (`tsc --noEmit`) e zero avisos de linter em todas as novas rotinas.

---

## Assumptions

- **Persistência Local Primária**: Como preconizado na Constituição (Princípios V e VI), a persistência primária e imediata é offline-first via Zustand + `localStorage`, sem depender de conexões com servidor ou bancos pagos.
- **Grade Horária Flexível**: O seletor de dias da semana para matérias contempla os dias úteis (Segunda a Sexta) e Sábado letivo, atendendo a rotina típica de cursos universitários de Direito.
- **Suporte Multimídia do Bento**: A inclusão de fotos nas refeições utiliza o mesmo componente padronizado `ImageUploadField.tsx`, reaproveitando a compressão WebP leve.
- **Manutenção de Dados Padrão**: Na primeira inicialização, se o usuário ainda não tiver customizado nada, o sistema oferece sugestões delicadas de exemplo como ponto de partida (que podem ser editadas ou excluídas a qualquer momento).
