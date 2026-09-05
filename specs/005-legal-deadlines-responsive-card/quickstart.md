# Quickstart & Verification Guide: Ergonomia dos Cartões de Prazos

**Feature**: `005-legal-deadlines-responsive-card`  
**Phase**: Phase 1 (Design & Contracts)

---

## 1. Pré-Requisitos de Ambiente

- Ambiente local com Node.js v22 em `$PWD/.node/bin`.
- Exportar o caminho de execução:
  ```bash
  export PATH="$PWD/.node/bin:$PATH"
  ```

---

## 2. Comandos de Verificação Rápida

### A. Checagem Estrita de Tipos TypeScript (Zero `any`)
```bash
export PATH="$PWD/.node/bin:$PATH" && npm run typecheck
```
*Resultado Esperado:* 0 erros de compilação.

### B. Checagem de Linter (ESLint)
```bash
export PATH="$PWD/.node/bin:$PATH" && npm run lint
```
*Resultado Esperado:* 0 warnings e 0 erros.

### C. Execução da Suíte Completa de Testes
```bash
export PATH="$PWD/.node/bin:$PATH" && npm test
```
*Resultado Esperado:* 12/12 suítes aprovadas, 84/84 testes passando.

### D. Verificação de Build de Produção
```bash
export PATH="$PWD/.node/bin:$PATH" && npm run build
```
*Resultado Esperado:* Build estática Next.js 15 compilada com sucesso.

---

## 3. Roteiro de Teste Manual na Interface (Mobile Viewport)

1. Iniciar servidor de desenvolvimento: `npm run dev`.
2. Abrir o navegador em modo de emulação móvel (ex: iPhone SE 375x667 ou iPhone 14 Pro 393x852) em `http://localhost:3000/legal`.
3. Navegar até a aba **Prazos & Casos Práticos**:
   - Verificar se o cartão possui altura vertical generosa com respiro (`min-h-[96px]`, padding `p-3.5`).
   - Verificar se o título do prazo quebra a linha confortavelmente sem truncamento ilegível.
   - Constatar que os botões de ação estão empilhados no lado direito: **Editar** em cima e **Excluir** embaixo.
   - Clicar no botão **Editar** e constatar abertura suave do modal com dados pré-carregados.
   - Clicar no botão **Excluir** e verificar solicitação de confirmação.
   - Alterar o status do prazo no dropdown e confirmar atualização instantânea.
