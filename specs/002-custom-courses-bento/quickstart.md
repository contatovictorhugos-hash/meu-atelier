# Quickstart Validation Guide: Personalização de Matérias e Bento

**Feature**: `002-custom-courses-bento`  
**Date**: 2026-09-02  
**Status**: Completed

---

## Cenários de Validação Ponta a Ponta

Este guia orienta a verificação prática de que todas as capacidades da feature foram entregues e funcionam perfeitamente no ambiente local e móvel.

---

### Cenário 1: Gestão Completa de Disciplinas em `/legal`

1. **Acesse** a rota `http://localhost:3000/legal`.
2. **Adicione uma nova matéria**:
   - Clique no botão `+ Nova Matéria`.
   - Preencha:
     - Nome: *"Direito Penal — Teoria do Delito"*
     - Professor: *"Prof. Dr. Alexandre Morais"*
     - Dia da Semana: *"Quintas-feiras"*
     - Cor: Tom Lavanda
   - Clique em `Salvar Matéria`.
   - **Resultado esperado**: Um novo card com a cor escolhida é renderizado com a tag `"📅 Quintas-feiras"` e o nome do professor.
3. **Edite a matéria criada**:
   - Clique no ícone de lápis (`Editar`) no card.
   - Altere o nome do professor para *"Prof. Dra. Clarice"* e o dia para *"Sextas-feiras"*.
   - Salve.
   - **Resultado esperado**: As alterações refletem no card instantaneamente.
4. **Exclua a matéria**:
   - Clique no ícone de lixeira (`Excluir`) e confirme.
   - **Resultado esperado**: O card é removido da lista e o progresso geral é recalculado.
5. **Teste de Persistência**:
   - Recarregue a página com F5.
   - **Resultado esperado**: Os dados permanecem exatamente como salvos (sem reset para os dados iniciais).

---

### Cenário 2: Personalização do Cardápio Semanal em `/bento`

1. **Acesse** a rota `http://localhost:3000/bento`.
2. **Edite uma refeição existente**:
   - Clique em qualquer refeição do cardápio.
   - Modifique o título para *"Bowl Tropical de Salmão e Manga"*.
   - Adicione ingredientes: *"Salmão, Manga, Arroz Japonês, Edamame, Gergelim"*.
   - Use o campo de foto (`ImageUploadField`) para subir uma foto do seu dispositivo ou colar um link.
   - Salve.
   - **Resultado esperado**: O card exibe a foto atualizada, o novo título e as tags dos ingredientes.
3. **Adicione uma refeição para o fim de semana (Sábado ou Domingo)**:
   - Clique em um dia ainda não preenchido.
   - Selecione tipo *"Almoço"*, nome *"Risoto de Cogumelos Frescos"* e salve.
   - **Resultado esperado**: O dia agora exibe o prato planejado.
4. **Exclua uma refeição**:
   - Abra o modal da refeição e clique em `Remover Refeição`.
   - **Resultado esperado**: O dia volta ao estado de slot vago amigável.

---

### Cenário 3: Customização do Sunday Prep e Lista de Feira em `/bento`

1. Na aba **Prep de Domingo**:
   - Digite *"Porcionar castanhas e frutas secas"* e clique em `+ Adicionar`.
   - **Resultado esperado**: A nova tarefa surge na lista interativa.
   - Clique nela para marcar como concluída. O percentual do topo aumenta.
   - Clique no ícone de lixeira ao lado da tarefa para removê-la.
2. Na aba **Lista de Feira**:
   - Adicione *"Iogurte Grego Natural"* na categoria *"Geladeira"*.
   - Marque-o como comprado.
   - Clique no botão `Limpar Concluídos`.
   - **Resultado esperado**: O item comprado é removido da lista.

---

## Comandos de Verificação Automatizada

Execute no terminal:

```bash
# 1. Bateria completa de testes unitários e de integração
./test-app

# 2. Verificação estrita de tipos TypeScript (sem erros)
export PATH="$PWD/.node/bin:$PATH" && npm run typecheck

# 3. Análise estática do linter Next.js
export PATH="$PWD/.node/bin:$PATH" && npm run lint

# 4. Compilação completa de produção
export PATH="$PWD/.node/bin:$PATH" && npm run build
```
