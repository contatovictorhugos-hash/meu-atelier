# Feature Specification: Ergonomia e Responsividade Móvel dos Cartões de Prazos Jurídicos

**Feature Branch**: `005-legal-deadlines-responsive-card`  
**Created**: 2026-09-04  
**Status**: Draft  
**Input**: User description: "os Prazos no Modulo Jurídico estao muito pequenos, aumente eles verticamente, e deixe os botoes de deletar e editar um em cima do outro, no lado direito do card (Prazo), basicamento para os celulares nao está muito responsivo"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cartão de Prazo com Altura e Respiro Vertical Aprimorados no Mobile (Priority: P1)

Como estudante de Direito utilizando o Atelier predominantemente pelo celular, desejo que os cartões de prazos acadêmicos possuam maior respiro e altura vertical, para que os títulos das peças, recursos e simulados sejam lidos com conforto sem truncamentos agressivos e sem a sensação de elementos espremidos na tela.

**Why this priority**: A usabilidade móvel diária do módulo jurídico depende da legibilidade imediata das entregas acadêmicas. Um layout excessivamente horizontal e achatado compromete a leitura rápida em dispositivos móveis.

**Independent Test**: Pode ser testado visualizando e interagindo com a lista de prazos em telas móveis estreitas (320px a 390px), confirmando que os cartões possuem altura proporcional, espaçamento interno confortável e títulos claramente legíveis.

**Acceptance Scenarios**:
1. **Given** que o usuário possui prazos com títulos curtos ou médios cadastrados, **When** ele acessa a aba de Prazos em um smartphone, **Then** o cartão apresenta espaçamento vertical generoso, altura ampliada e o título é renderizado com clareza sem colidir com outros controles.
2. **Given** que o usuário possui múltiplos prazos em sua grade, **When** rola a lista na visualização móvel, **Then** a separação vertical entre os cartões mantém a estética harmoniosa e tátil do santuário pessoal.

---

### User Story 2 - Botões de Ação Empilhados no Lado Direito do Cartão (Priority: P2)

Como estudante de Direito interagindo com a interface pelo polegar, desejo que os botões de **Editar** e **Excluir** fiquem organizados verticalmente (um em cima do outro) alinhados à extremidade direita do cartão de prazo, para que eu possa acionar qualquer uma das ações de maneira deliberada, confortável e sem risco de toques acidentais no controle vizinho.

**Why this priority**: O alinhamento horizontal prévio em telas estreitas espremia botões de toque com o seletor de status e com o título, dificultando a precisão ergonômica com uma só mão.

**Independent Test**: Pode ser testado tocando isoladamente no botão superior (Editar) e no botão inferior (Excluir) em um dispositivo móvel, verificando que cada um possui área de acionamento ergonômica (mínimo de 44x44 pontos) e executa sua respectiva ação com precisão.

**Acceptance Scenarios**:
1. **Given** um cartão de prazo renderizado na tela, **When** o usuário observa a extremidade direita do cartão, **Then** o botão de edição e o botão de exclusão aparecem dispostos em uma coluna vertical (empilhados).
2. **Given** que o usuário deseja editar um prazo, **When** ele toca no botão de edição (lápis) na coluna de ações, **Then** o modal de edição é aberto com os dados pré-carregados sem disparar acidentalmente a ação de exclusão.
3. **Given** que o usuário deseja excluir um prazo, **When** ele toca no botão de exclusão (lixeira) posicionado abaixo do botão de edição, **Then** a confirmação de exclusão é solicitada de forma segura.

---

### User Story 3 - Distribuição Harmoniosa de Metadados e Seletor de Status (Priority: P3)

Como estudante de Direito, desejo que a matéria associada (badge), a data de vencimento e o seletor de status do prazo estejam dispostos de forma equilibrada no corpo principal do cartão, para que as informações contextuais complementem o título sem competir pelo espaço horizontal dos botões.

**Why this priority**: Evita que controles interativos (como o menu suspenso de status) fiquem comprimidos contra os botões de gestão ou esturem as margens do cartão em telas pequenas.

**Independent Test**: Pode ser testado alterando o status de um prazo diretamente no cartão e verificando que o menu seletor permanece acessível, legível e não desconfigura a estrutura dos botões laterais.

**Acceptance Scenarios**:
1. **Given** um prazo cadastrado, **When** renderizado em tela mobile, **Then** o badge da matéria, a data e o status são apresentados de forma organizada no corpo do cartão.
2. **Given** que o usuário altera o status de "Não iniciado" para "Em rascunho" ou "Finalizado", **When** a seleção é efetuada, **Then** o estado é atualizado imediatamente sem quebrar a altura ou a harmonia visual do cartão.

---

### Edge Cases

- **Títulos muito longos de prazos**: Prazos com nomes extensos (ex: *"Elaboração de Recurso Especial Cível - Caso Simulado OAB 2ª Fase"*) devem quebrar em múltiplas linhas harmoniosamente sem sobrepor os botões laterais nem transbordar a largura da tela.
- **Nomes longos de matérias acadêmicas**: Quando o nome da matéria for extenso, o badge deve conter truncamento suave com reticências para não empurrar a data para fora do campo de visão.
- **Telas ultracompactas (320px de largura - iPhone SE / Galaxy Mini)**: A coluna lateral de botões empilhados e o corpo de conteúdo não devem causar rolagem horizontal (overflow-x) indesejada.
- **Lista vazia (Zero prazos)**: O estado vazio acolhedor (*empty state*) deve continuar centralizado, convidativo e esteticamente alinhado.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir os cartões de prazos com padding e altura vertical ampliados, garantindo respiro visual e sensação de santuário pessoal.
- **FR-002**: O sistema DEVE organizar os botões de ação do prazo (**Editar** e **Excluir**) em uma disposição vertical empilhada (um sobre o outro) na extremidade direita do cartão.
- **FR-003**: Cada botão de ação (Editar e Excluir) DEVE manter área mínima de toque acessível de 44x44 pontos para plena conformidade com a ergonomia móvel e alcance do polegar.
- **FR-004**: O corpo do cartão DEVE reservar a área esquerda e central para exibição do badge da matéria, data de vencimento formatada, título do prazo e seletor de status.
- **FR-005**: O título do prazo NÃO DEVE sobrepor ou empurrar a coluna lateral de ações, permitindo quebra de linha adequada ou controle rigoroso de largura máxima.
- **FR-006**: O seletor de status DEVE ser operável pelo toque sem interferir no acionamento dos botões de editar e excluir empilhados.
- **FR-007**: A transição e a resposta ao toque em qualquer um dos controles do cartão DEVEM ser imediatas, preservando taxa de 60 FPS e ausência de layout shift.
- **FR-008**: A estética visual dos cartões DEVE seguir estritamente o tema *Y2K Coquette Clean* do Atelier (paleta blush `#FDF2F4`, creme `#FCFBF7`, bordas delicadas `#F8D7DA` / `pink-200`, cantos arredondados `rounded-2xl`).

### Key Entities

- **StudyDeadline (Prazo de Estudo)**:
  - `id`: Identificador único do prazo.
  - `course_id`: Matéria jurídica vinculada.
  - `title`: Título descritivo da entrega acadêmica ou caso prático.
  - `due_date`: Data de vencimento no formato textual YYYY-MM-DD.
  - `status`: Estado atual da atividade (`Não iniciado`, `Em rascunho`, `Finalizado`).
- **DeadlineActionsColumn (Coluna de Ações do Cartão)**:
  - Ação superior: Edição rápida do prazo (abre o `DeadlineModal`).
  - Ação inferior: Exclusão do prazo (com confirmação protetiva em duas etapas).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos cartões de prazos em visualização móvel (320px a 430px de largura) mantêm zero transbordo horizontal (zero horizontal scroll).
- **SC-002**: O tempo para tocar intencionalmente no botão de editar ou excluir sem acionamentos acidentais é imediato, com área de toque mínima garantida de 44x44 pontos por botão.
- **SC-003**: Usuários em dispositivos móveis conseguem visualizar títulos de até 60 caracteres sem truncamento ilegível graças à expansão vertical do cartão.
- **SC-004**: A suíte de testes automatizados permanece com 100% de aprovação (0 regressões em testes unitários, integração e renderização).

---

## Assumptions

- A fonte de dados, o armazenamento em estado via `useLegalStore` e a sincronização em nuvem com o Supabase permanecem inalterados e plenamente compatíveis com as entidades já vigentes.
- O componente reutilizável `DeadlineModal.tsx` continuará sendo acionado pelo botão de edição do cartão.
- A exclusão continuará solicitando confirmação prévia para evitar deleções acidentais em ambiente móvel.
