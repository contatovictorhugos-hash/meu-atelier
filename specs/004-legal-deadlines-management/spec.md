# Feature Specification: Gestão Completa (Edição e Exclusão) de Prazos e Itens no Caderno Jurídico e Módulos do Atelier

**Feature Branch**: `004-legal-deadlines-management`

**Created**: 2026-09-03

**Status**: Draft

**Input**: User description: "a aba de Prazos no Modulo Jurídico nao permite excluir ou editar prazos já criados, limitando as acoes do usuário, precisamos de um forma clean, facil e que nao quebre a tela e a experiencia já estabelecida. Verifique outros pontos que pode ter problema similar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gestão Completa de Prazos Acadêmicos e Práticos: Edição e Exclusão Segura (Priority: P1)

A estudante de Direito ou profissional jurídica acessa a aba "Prazos" no Módulo Jurídico do Atelier em seu celular. Ao visualizar sua lista de prazos e tarefas práticas (peças, recursos, simulados, entregas), ela precisa de autonomia total para ajustar detalhes quando uma data de entrega é prorrogada, quando comete um erro de digitação no título, quando precisa reatribuir o prazo para outra disciplina ou quando um prazo foi cancelado ou cumprido e não precisa mais poluir seu santuário visual.

Atualmente, o cartão de prazo só permite alterar o status ("Não iniciado", "Em rascunho", "Finalizado") e não possui opções de exclusão nem de edição dos dados estruturais.

Com esta nova experiência:
- Cada cartão de prazo mantém uma apresentação limpa e ergonômica, exibindo botões de ação intuitivos com alvos de toque acessíveis (mínimo de 44x44 pontos): um botão de Edição (ícone discreto de lápis) e um botão de Exclusão (ícone suave de lixeira).
- Ao acionar a Edição, um modal delicado e coerente com a estética Atelier (tons blush `#FDF2F4`, tipografia acolhedora e cantos arredondados) é aberto com todos os campos do prazo pré-preenchidos (disciplina associada, título da peça/prazo, data limite e status atual). A usuária faz os ajustes necessários e salva instantaneamente.
- Ao acionar a Exclusão, o sistema solicita uma confirmação suave e preventiva antes de remover permanentemente o registro, evitando toques acidentais durante a rolagem com o polegar.
- Caso todos os prazos sejam concluídos ou excluídos, a interface exibe um estado vazio acolhedor e encorajador com ilustração e botão para cadastrar um novo prazo.

**Why this priority**: É o cerne da solicitação da usuária. O bloqueio na edição e exclusão de prazos gera acúmulo de dados incorretos ou obsoletos, gerando ansiedade em vez de tranquilidade no santuário de estudos jurídicos.

**Independent Test**: Pode ser testado de forma isolada criando um prazo na aba "Prazos", tocando no botão de editar, alterando título, disciplina e data, confirmando a atualização imediata no cartão, e em seguida acionando a exclusão com confirmação e constatando a remoção limpa do item e atualização do contador/estado.

**Acceptance Scenarios**:

1. **Given** um prazo existente na listagem de Prazos, **When** a usuária visualiza o cartão no celular, **Then** o cartão apresenta ações claras e táteis de edição e exclusão sem quebrar o alinhamento de texto nem sobrepor a tag de disciplina ou o seletor de status.
2. **Given** um prazo existente, **When** a usuária toca no botão de edição, **Then** um modal de edição é apresentado com os dados atuais (disciplina, título, data e status) devidamente carregados nos campos.
3. **Given** o modal de edição aberto, **When** a usuária altera o título para um novo texto válido e confirma o salvamento, **Then** as alterações são refletidas imediatamente na listagem sem recarregar a tela.
4. **Given** um prazo na listagem, **When** a usuária toca no botão de exclusão, **Then** o sistema solicita confirmação explícita da remoção.
5. **Given** a solicitação de confirmação de exclusão, **When** a usuária confirma, **Then** o prazo é removido instantaneamente da tela e da persistência de dados.
6. **Given** a exclusão do último prazo da lista, **When** a lista fica vazia, **Then** um estado vazio ilustrado e acolhedor é exibido com orientação para cadastrar novo prazo.

---

### User Story 2 - Edição Completa de Micro-Fichamentos e Resumos Jurídicos (Priority: P2)

No mesmo Módulo Jurídico, a aba "Fichamentos" permite catalogar resumos rápidos, artigos do Vade Mecum, jurisprudência e fotos de páginas grifadas. Embora o componente já possua exclusão via ícone de lixeira, ele carece de qualquer capacidade de **edição**: se a usuária quiser corrigir uma síntese doutrinária após a aula, complementar as tags da súmula, atualizar a foto do livro ou corrigir a matéria vinculada, ela é obrigada a apagar o fichamento inteiro e redigitá-lo do zero.

Com esta funcionalidade:
- Cada cartão de micro-fichamento passa a exibir um botão de Edição junto ao botão de exclusão já existente no topo do cartão, preservando a harmonia visual.
- Ao tocar em Editar, o modal de fichamento abre em modo de edição, pré-carregando disciplina, título/artigo, texto de resumo, foto associada e tags.
- Ao salvar, o fichamento é atualizado in-place mantendo sua data original de criação ou marcando a revisão, preservando fotos existentes sem uploads redundantes.

**Why this priority**: Identificado como ponto crítico idêntico de limitação do usuário dentro do próprio Caderno Jurídico. Fichamentos representam o maior investimento intelectual da usuária; a impossibilidade de editá-los causa frustração severa se houver qualquer erro de digitação.

**Independent Test**: Pode ser testado criando um fichamento com foto e tags, tocando no novo botão de edição, alterando o resumo e adicionando uma tag, salvando e verificando a atualização imediata no cartão sem perda da imagem ou duplicação de dados.

**Acceptance Scenarios**:

1. **Given** um fichamento existente na aba "Fichamentos", **When** a usuária visualiza o cartão, **Then** há um botão de edição perfeitamente alinhado ao lado da data e da lixeira de exclusão.
2. **Given** o toque no botão de editar fichamento, **When** o modal abre, **Then** todos os campos (matéria, conceito central, texto de síntese, URL da foto e tags) estão preenchidos com os dados existentes.
3. **Given** alterações realizadas no texto do resumo ou tags, **When** a usuária salva, **Then** o cartão exibe os novos dados instantaneamente.
4. **Given** a exclusão de um fichamento, **When** confirmada pela usuária, **Then** o item é excluído mantendo a estabilidade da rolagem.

---

### User Story 3 - Edição e Gestão Fluida no Guia de Prep de Domingo do Bento (Priority: P3)

No Módulo de Marmitas e Bento (`bento/page.tsx`), a seção "Guia de Prep de Domingo" organiza tarefas de pré-cozimento semanal (ex: "assar legumes", "cozinhar quinoa"). Atualmente, a usuária pode marcar como feito ou excluir tarefas, mas não pode renomear uma tarefa existente caso queira adicionar instruções (ex: adicionar tempo ou quantidade) sem ter que deletar e reinserir no final da lista.

Com esta melhoria:
- A usuária pode tocar no texto ou em um botão discreto de ação para editar a descrição da tarefa de preparação diretamente ou via diálogo rápido.
- O percentual de progresso de prep e o estado de conclusão permanecem intactos durante e após a edição.

**Why this priority**: Harmoniza a usabilidade entre os módulos do Atelier, garantindo que o usuário tenha poder consistente de CRUD (criar, ler, atualizar, apagar) em todas as listas operacionais do aplicativo.

**Independent Test**: Pode ser testado navegando até o Módulo Bento, selecionando uma tarefa de prep existente, editando seu texto, e conferindo que a alteração foi persistida mantendo o status de concluído/pendente e a porcentagem global calculada.

**Acceptance Scenarios**:

1. **Given** uma tarefa de pré-preparo cadastrada, **When** a usuária solicita edição do texto, **Then** um campo de edição com o texto atual é exibido com alvos de toque adequados.
2. **Given** o texto modificado, **When** a usuária confirma, **Then** a tarefa é atualizada mantendo seu status atual de conclusão e sem alterar a ordem das demais etapas.

---

### User Story 4 - Edição Rápida de Itens na Lista de Feira & Mercado (Priority: P4)

Ainda no Módulo Bento, a "Lista de Feira & Mercado" categoriza ingredientes em Hortifrúti, Geladeira, Despensa e Outros. Atualmente, os itens só podem ser marcados como comprados ou excluídos. Caso a usuária cadastre um item na categoria errada (ex: colocou morangos em "Despensa" por engano) ou queira ajustar a quantidade ou marca no nome do item, ela é obrigada a excluir e criar de novo.

Com esta melhoria:
- A usuária pode editar o nome do item e/ou transferi-lo de categoria de forma simples e direta.
- A experiência permanece leve, ágil e focada em compras presenciais no mercado.

**Why this priority**: Garante simetria e consistência de experiência em todo o aplicativo, eliminando qualquer ponto residual onde o usuário se sinta "preso" por não conseguir retificar uma informação digitada.

**Independent Test**: Pode ser testado selecionando um item da lista de compras, editando seu nome e trocando sua categoria, verificando que o item se move para o grupo correto sem perder seu status de pendente/carrinho.

**Acceptance Scenarios**:

1. **Given** um item existente na lista de compras, **When** a usuária seleciona a opção de edição, **Then** ela pode alterar o nome e a categoria do item.
2. **Given** a alteração de categoria confirmada, **When** salva, **Then** o item é reordenado sob o cabeçalho da nova categoria correspondente.

---

### Edge Cases

- **Telas móveis ultracompactas (largura < 360px)**: Em aparelhos menores, a exibição simultânea de badge de matéria, data, status dropdown, botão de editar e botão de excluir não deve sofrer quebra de linha desordenada ou corte de texto ilegível. As ações devem se reorganizar harmonicamente em grade flexível com espaçamento mínimo de 8px.
- **Títulos de prazos excessivamente longos**: Prazos com nomes longos (ex: "Entrega de Petição Inicial em Ação de Obrigação de Fazer c/c Pedido de Tutela Provisória de Urgência") devem sofrer truncamento visual elegante com reticências (`truncate`), mantendo os botões de ação sempre acessíveis à direita.
- **Prazos vencidos ou data passada**: A edição deve aceitar datas passadas caso a usuária esteja registrando um histórico retroativo, porém a interface deve sinalizar visualmente prazos atrasados (ex: destaque sutil em tom rosado de alerta) sem bloquear a gravação.
- **Exclusão de matéria vinculada a prazos**: Caso a usuária tente excluir uma matéria na aba "Matérias", o sistema já avisa a quantidade de prazos e fichamentos vinculados; a exclusão deve manter a integridade referencial ou reatribuir prazos para disciplina genérica.
- **Sincronização em nuvem e modo offline**: Toda alteração (edição ou exclusão) de prazos ou fichamentos deve atualizar o armazenamento local imediatamente (zero latência percebida) e propagar para o banco de dados em segundo plano, sem travar a interface do usuário se a conexão oscilar.
- **Confirmação preventiva sem bloqueio irritante**: A confirmação de exclusão deve ser clara e rápida, evitando múltiplos diálogos confirmatórios em cascata.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Prazos no Módulo Jurídico
- **FR-001**: O sistema DEVE permitir a edição de qualquer prazo previamente cadastrado, possibilitando alterar título, matéria vinculada, data de entrega e status.
- **FR-002**: O sistema DEVE disponibilizar um botão de edição com área de toque mínima de 44x44 pontos em cada cartão de prazo na visualização mobile.
- **FR-003**: O sistema DEVE carregar um modal de edição pré-preenchido com os dados atuais do prazo ao acionar a ação de editar.
- **FR-004**: O sistema DEVE permitir a exclusão individual de qualquer prazo na listagem através de botão de exclusão dedicado.
- **FR-005**: O sistema DEVE solicitar confirmação preventiva da usuária antes de efetivar a exclusão definitiva de um prazo.
- **FR-006**: O sistema DEVE atualizar imediatamente a interface e o estado persistido após qualquer operação de edição ou exclusão de prazo.
- **FR-007**: O sistema DEVE manter a seleção e alteração rápida de status do prazo ("Não iniciado", "Em rascunho", "Finalizado") acessível diretamente no cartão ou no modal de edição.
- **FR-008**: O sistema DEVE exibir um estado vazio acolhedor quando nenhum prazo estiver cadastrado ou todos forem excluídos.

#### Fichamentos no Módulo Jurídico
- **FR-009**: O sistema DEVE permitir a edição completa de fichamentos existentes, incluindo disciplina, conceito central (título), texto de resumo, foto associada e etiquetas/tags.
- **FR-010**: O sistema DEVE disponibilizar um botão de edição com área de toque de 44x44 pontos no cabeçalho de cada cartão de fichamento.
- **FR-011**: O sistema DEVE preservar a URL permanente da imagem do fichamento caso a usuária edite apenas os textos ou tags, evitando re-upload desnecessário.
- **FR-012**: O sistema DEVE manter a funcionalidade existente de exclusão de fichamentos com feedback tátil e atualização instantânea.

#### Módulos de Apoio (Bento Prep & Feira)
- **FR-013**: O sistema DEVE permitir a edição do texto descritivo das tarefas de pré-cozimento no Guia de Prep de Domingo sem alterar seu status de conclusão.
- **FR-014**: O sistema DEVE permitir a edição do nome e da categoria dos itens da Lista de Feira & Mercado.
- **FR-015**: O sistema DEVE garantir que todos os botões de ação e campos editáveis cumpram a exigência de ergonomia móvel com alvos mínimos de 44x44 pontos.
- **FR-016**: O sistema DEVE sincronizar as edições e exclusões no banco de dados e no cache local respeitando o isolamento estrito por usuário (RLS).

---

### Key Entities *(include if feature involves data)*

- **StudyDeadline (Prazo Jurídico)**:
  - `id`: Identificador único do prazo.
  - `course_id`: Identificador da disciplina jurídica associada.
  - `title`: Descrição textual do prazo, peça ou tarefa prática.
  - `due_date`: Data limite de entrega ou cumprimento (formato YYYY-MM-DD).
  - `status`: Estado atual do prazo (`'Não iniciado'` | `'Em rascunho'` | `'Finalizado'`).
- **StudyNote (Fichamento Jurídico)**:
  - `id`: Identificador único do fichamento.
  - `course_id`: Identificador da disciplina associada.
  - `title`: Título do conceito central, súmula ou artigo.
  - `summary_text`: Síntese textual da doutrina ou anotação de aula.
  - `photo_url`: URL opcional de imagem em armazenamento permanente.
  - `tags`: Lista de etiquetas temáticas.
  - `created_at`: Data original de registro.
- **PrepTask (Tarefa de Prep de Domingo)**:
  - `id`: Identificador único da etapa de preparo.
  - `task`: Descrição da tarefa culinária.
  - `completed`: Indicador booleano de conclusão.
- **ShoppingItem (Item de Lista de Compras)**:
  - `id`: Identificador único do item.
  - `item_name`: Nome do ingrediente ou produto.
  - `category`: Categoria de compra (`'Hortifrúti'` | `'Geladeira'` | `'Despensa'` | `'Outros'`).
  - `is_completed`: Indicador booleano de presença no carrinho.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O tempo necessário para a usuária abrir o modal de edição, alterar uma data ou título de prazo e salvar com sucesso na tela é inferior a 10 segundos.
- **SC-002**: Ação de exclusão de prazo ou fichamento remove visualmente o item em menos de 100 milissegundos na tela móvel, sem travamento de rolagem.
- **SC-003**: 100% dos botões de toque para editar e excluir possuem dimensão interativa mínima comprovada de 44x44 pontos no layout responsivo móvel.
- **SC-004**: Zero ocorrências de quebra de layout, sobreposição de texto ou deslocamento horizontal indesejado (overflow) em telas com larguras a partir de 320px.
- **SC-005**: 100% das operações de edição de prazos e fichamentos mantêm os dados sincronizados entre a camada de armazenamento local e a nuvem sem perda de informações.
- **SC-006**: A taxa de sucesso em testes de usabilidade para tarefas de correção de prazos e fichamentos atinge 100% no primeiro fluxo de tentativa.

---

## Assumptions

- A usuária utiliza predominantemente smartphones ou dispositivos móveis com polegar como cursor principal, exigindo elementos confortavelmente espaçados e alvos de toque de fácil alcance.
- A paleta visual e os componentes de modais já estabelecidos no Atelier (`Modal`, `Input`, `Badge`, `Button`, `PolaroidFrame`) serão reaproveitados para manter consistência estética absoluta.
- A edição de prazos e fichamentos opera sob a mesma política de privacidade e segurança onde cada usuário só manipula seus próprios registros via autenticação e RLS.
- A navegação entre as abas do Módulo Jurídico ("Matérias", "Fichamentos", "Prazos", "Focus") continuará preservando seu estado durante a navegação sem recarregar desnecessariamente a página.

