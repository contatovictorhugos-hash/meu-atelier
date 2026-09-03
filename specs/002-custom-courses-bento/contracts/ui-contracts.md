# UI & Component Contracts: Personalização de Matérias e Bento

**Feature**: `002-custom-courses-bento`  
**Date**: 2026-09-02  
**Status**: Completed

---

## 1. Módulo Jurídico (`/legal`)

### Componente: `CourseModal.tsx` (`src/components/modules/legal-binder/CourseModal.tsx`)
Modal de criação e edição de matérias acadêmicas.

#### Props:
```typescript
interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: StudyCourse | null; // null = Modo Criação; StudyCourse = Modo Edição
}
```

#### Eventos e Comportamentos:
- **Salvar**: Invoca `addCourse` ou `updateCourse` com dados sanitizados e fecha o modal.
- **Seletor de Dia da Semana**: Chips interativos clicáveis de Segunda a Sábado com área de toque de 44px.
- **Seletor de Cor**: Paleta com 6 opções de tons pastéis suaves (Blush, Creme, Alfazema, Menta, Manteiga, Céu).

---

### Componente: `CourseCards.tsx` (`src/components/modules/legal-binder/CourseCards.tsx`)
Card list de disciplinas com exibição de professor, dia da semana e controles de ação.

#### Contrato Visual:
- Botão no cabeçalho: `+ Nova Matéria` abre `CourseModal` em modo criação.
- Cada card exibe:
  - Nome da disciplina (`font-bold`).
  - Docente: `Prof. Dra. Juliana Paes` ou similar.
  - Tag estilizada de dia da semana: `📅 Terças-feiras`.
  - Botão de edição (`Pencil`) e exclusão (`Trash2`) com confirmação.
  - Slider deslizante de leitura com percentual em tempo real.

---

## 2. Módulo Bento & Marmitas (`/bento`)

### Componente: `MealModal.tsx` (`src/components/modules/meal-planner/MealModal.tsx`)
Modal para planejar, alterar ou adicionar foto à refeição do dia.

#### Props:
```typescript
interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealToEdit?: MealPlanItem | null;
  defaultDayOfWeek?: number; // Preenche o dia selecionado (1 a 7)
}
```

#### Elementos do Formulário:
- Seletor do dia da semana (Segunda a Domingo).
- Seletor do tipo de refeição (`Café`, `Almoço`, `Lanche`, `Jantar`).
- Campo de texto para o nome do prato.
- Campo para ingredientes (separados por vírgula).
- Campo multimídia: `<ImageUploadField />` com câmera/galeria e link web.

---

### Componente: `WeeklyMealGrid.tsx` (`src/components/modules/meal-planner/WeeklyMealGrid.tsx`)
Grade visual interativa da semana.

#### Contrato Visual:
- Suporta 7 dias da semana (Segunda a Domingo).
- Destaque no card do dia atual ("Hoje ✨").
- Ações no card:
  - Se tem refeição: exibe foto, título, tags de ingredientes e botão de editar/trocar.
  - Se está vazio: exibe estado amigável ("Toque para planejar o almoço de quarta").

---

### Componente: `SundayPrepGuide.tsx` (`src/components/modules/meal-planner/SundayPrepGuide.tsx`)
Guia de preparo do domingo customizável.

#### Contrato Visual:
- Input inline com botão `+ Adicionar` para criar novas tarefas de pré-cozimento.
- Cada item tem botão de alternar conclusão (`togglePrepTask`) e botão de remover tarefa (`deletePrepTask`).

---

### Componente: `ShoppingList.tsx` (`src/components/modules/meal-planner/ShoppingList.tsx`)
Lista de suprimentos da feira e supermercado.

#### Contrato Visual:
- Input inline de novo item com seletor de categoria (`Hortifrúti`, `Geladeira`, `Despensa`, `Outros`).
- Botão destacado no topo: `Limpar Concluídos` para descarte rápido em lote dos itens já colocados no carrinho.
