# UI Contracts & Accessibility Specifications: Cartão de Prazo Jurídico

**Feature**: `005-legal-deadlines-responsive-card`  
**Phase**: Phase 1 (Design & Contracts)

---

## 1. Contrato Visual do Cartão de Prazo (`DeadlineTracker.tsx`)

### Estrutura de Classes Tailwind e Ergonomia

```tsx
<div
  key={d.id}
  className="p-3.5 sm:p-4 bg-[#FCFBF7] rounded-2xl border border-pink-200/60 shadow-sm flex items-stretch justify-between gap-3 min-h-[96px] transition-all hover:border-pink-300/80"
>
  {/* Coluna Principal: Metadados, Título e Seletor de Status */}
  <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5 space-y-2">
    <div>
      {/* Badge e Data */}
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <Badge variant="blush" className="text-[10px] sm:text-xs">
          {course?.name || 'Direito'}
        </Badge>
        <span className="text-[11px] font-mono text-stone-500 font-medium">
          {formatDate(d.due_date)}
        </span>
      </div>

      {/* Título com Respiro Vertical e Quebra Delicada */}
      <h4 className="text-xs sm:text-sm font-semibold text-[#1E1B1E] leading-snug break-words">
        {d.title}
      </h4>
    </div>

    {/* Seletor de Status Ergonômico */}
    <div className="pt-1">
      <select
        value={d.status}
        onChange={(e) => updateDeadlineStatus(d.id, e.target.value as DeadlineStatus)}
        className="text-[11px] font-semibold bg-white border border-pink-200/80 rounded-xl px-2.5 py-1 text-stone-700 min-h-[36px] shadow-xs focus:ring-1 focus:ring-pink-300 focus:outline-hidden"
        aria-label={`Status do prazo ${d.title}`}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Coluna Lateral Direita: Ações Empilhadas (Editar + Excluir) */}
  <div className="flex flex-col items-center justify-center gap-1 shrink-0 pl-2 sm:pl-3 border-l border-pink-100/70">
    {/* Botão Editar (Topo) */}
    <button
      onClick={() => handleOpenEdit(d)}
      className="p-2 text-stone-500 hover:text-[#4A1525] hover:bg-pink-100/50 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
      aria-label={`Editar ${d.title}`}
      title="Editar prazo"
    >
      <Pencil className="w-4 h-4" />
    </button>

    {/* Botão Excluir (Base) */}
    <button
      onClick={() => handleDelete(d)}
      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
      aria-label={`Excluir ${d.title}`}
      title="Excluir prazo"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</div>
```

---

## 2. Garantias de Acessibilidade & Touch Targets

1. **Alvos de Toque:**
   - Botão Editar: `min-h-[44px] min-w-[44px]`.
   - Botão Excluir: `min-h-[44px] min-w-[44px]`.
   - Ambos cumprem a especificação WCAG e Princípio II da Constituição do Atelier.
2. **Divisão Visual Tátil:**
   - Uma divisória sutil `border-l border-pink-100/70` separa o corpo informativo das ferramentas laterais, eliminando confusão de toque.
3. **Dispositivos Móveis Ultracompactos (320px):**
   - O flexbox com `min-w-0 flex-1` e `break-words` assegura que nenhum conteúdo transborde horizontalmente a viewport móvel.
