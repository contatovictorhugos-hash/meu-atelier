# Teste de Mesa Formal (Desk Checking & Algorithmic Trace)

Este documento registra a execução do **Teste de Mesa** analítico sobre as rotinas e algoritmos centrais do **Atelier**, mapeando o fluxo de variáveis, condições lógicas, limites de fronteira e estados finais.

---

## 1. Algoritmo: Rastreador de Hidratação (`useDailyGlowStore`)

### Código Analisado:
```typescript
incrementWater: () =>
  set((state) => ({
    waterCups: Math.min(state.waterCups + 1, state.waterGoal),
  })),

decrementWater: () =>
  set((state) => ({
    waterCups: Math.max(state.waterCups - 1, 0),
  }))
```

### Rastreamento de Estados (Tabela de Simulação):
| Passo | Ação | `state.waterCups` (Antes) | `state.waterGoal` | Expressão Avaliada | `state.waterCups` (Depois) | Status |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: |
| 1 | `incrementWater()` | 0 | 8 | `Math.min(0 + 1, 8) = 1` | 1 | ✓ Válido |
| 2 | `incrementWater()` | 1 | 8 | `Math.min(1 + 1, 8) = 2` | 2 | ✓ Válido |
| 3 | `incrementWater() x6` | 2 | 8 | `Math.min(2 + 6, 8) = 8` | 8 | ✓ Válido (Limite atingido) |
| 4 | `incrementWater()` | 8 | 8 | `Math.min(8 + 1, 8) = 8` | 8 | ✓ **Travamento de Fronteira Superior** |
| 5 | `decrementWater()` | 8 | 8 | `Math.max(8 - 1, 0) = 7` | 7 | ✓ Válido |
| 6 | `decrementWater() x7` | 7 | 8 | `Math.max(7 - 7, 0) = 0` | 0 | ✓ Válido (Zero absoluto) |
| 7 | `decrementWater()` | 0 | 8 | `Math.max(0 - 1, 0) = 0` | 0 | ✓ **Travamento de Fronteira Inferior** |

**Conclusão**: O algoritmo é à prova de transbordamento (overflow > 8) e subdimensionamento (underflow < 0).

---

## 2. Algoritmo: Carrossel Modular de Looks Cher Horowitz (`cycleSlot`)

### Código Analisado:
```typescript
const cycleSlot = (
  current: number,
  total: number,
  direction: 1 | -1,
  setter: (n: number) => void
) => {
  if (total === 0) return;
  const next = (current + direction + total) % total;
  setter(next);
};
```

### Rastreamento com `total = 3` (Índices: 0, 1, 2):
| Passo | `current` | `direction` | `total` | Expressão: `(current + direction + total) % total` | `next` | Efeito |
| :---: | :---: | :---: | :---: | :--- | :---: | :--- |
| 1 | 0 | +1 (Avançar) | 3 | `(0 + 1 + 3) % 3 = 4 % 3` | **1** | Avança para o 2º item |
| 2 | 1 | +1 (Avançar) | 3 | `(1 + 1 + 3) % 3 = 5 % 3` | **2** | Avança para o 3º item |
| 3 | 2 | +1 (Avançar) | 3 | `(2 + 1 + 3) % 3 = 6 % 3` | **0** | **Wrap-around para o início** |
| 4 | 0 | -1 (Voltar) | 3 | `(0 - 1 + 3) % 3 = 2 % 3` | **2** | **Wrap-around para o final** (sem índice negativo) |
| 5 | 0 | +1 | 0 | `if (total === 0) return;` | 0 | **Proteção contra Divisão por Zero** |

**Conclusão**: A fórmula aritmética `(current + direction + total) % total` impede índices negativos (`-1`) no JavaScript e garante rotação infinita suave em ambas as direções.

---

## 3. Algoritmo: Redimensionamento e Proporção de Imagens (`compressImageToWebp`)

### Código Analisado:
```typescript
const maxDimension = 1200;
let width = img.width;
let height = img.height;

if (width > height && width > maxDimension) {
  height = Math.round((height * maxDimension) / width);
  width = maxDimension;
} else if (height > maxDimension) {
  width = Math.round((width * maxDimension) / height);
  height = maxDimension;
}
```

### Casos de Teste de Mesa:
1. **Foto em Paisagem (Landscape 4000 x 3000 px)**:
   - `width (4000) > height (3000) && width > 1200` → Verdadeiro.
   - `height = Math.round((3000 * 1200) / 4000) = Math.round(900) = 900 px`.
   - `width = 1200 px`.
   - Proporção Original: `4000 / 3000 = 1.3333...` (4:3).
   - Proporção Redimensionada: `1200 / 900 = 1.3333...` (4:3).
   - **Resultado**: Dimensões reduzidas em 70% preservando 100% do aspect ratio sem distorção.

2. **Selfie em Retrato (Portrait 3000 x 4000 px)**:
   - `width > height` → Falso.
   - `height (4000) > 1200` → Verdadeiro.
   - `width = Math.round((3000 * 1200) / 4000) = 900 px`.
   - `height = 1200 px`.
   - **Resultado**: Proporção 3:4 perfeita.

3. **Foto Pequena / Sticker (600 x 600 px)**:
   - Ambas as condições falsas.
   - `width = 600 px`, `height = 600 px`.
   - **Resultado**: Não sofre upscale desnecessário que causaria pixelização.

---

## 4. Algoritmo: Sanitização de Nome de Arquivo para Cloudflare R2

### Código Analisado:
```typescript
const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
```

### Rastreamento de Entrada e Saída:
| Entrada (`filename`) | Regex: `[^a-zA-Z0-9.-] -> '_'` | Saída Sanitizada (`cleanFilename`) |
| :--- | :--- | :--- |
| `look de trabalho (1).jpg` | Substitui espaços e parênteses por `_` | `1772580000000-look_de_trabalho__1_.jpg` |
| `café_da_manhã#verão@2026.png` | Substitui acentos e caracteres especiais | `1772580000000-caf__da_manh__ver_o_2026.png` |
| `normal-photo.webp` | Caracteres válidos preservados | `1772580000000-normal-photo.webp` |

**Conclusão**: Elimina qualquer risco de quebra de URI no Cloudflare R2 ou caracteres inseguros em cabeçalhos HTTP.
