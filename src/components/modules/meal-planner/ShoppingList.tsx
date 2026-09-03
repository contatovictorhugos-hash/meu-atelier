'use client';

import React, { useState } from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { GroceryCategory } from '@/types/database.types';
import { Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/utils';

export const ShoppingList: React.FC = () => {
  const {
    shoppingItems,
    toggleShoppingItem,
    addShoppingItem,
    deleteShoppingItem,
    clearCompletedShoppingItems,
  } = useMealStore();

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<GroceryCategory>('Hortifrúti');

  const completedCount = shoppingItems.filter((i) => i.is_completed).length;

  const categories: GroceryCategory[] = [
    'Hortifrúti',
    'Geladeira',
    'Despensa',
    'Outros',
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    addShoppingItem(itemName.trim(), category);
    setItemName('');
  };

  return (
    <div className="space-y-4">
      {/* Header com Ação em Lote */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#4A1525]">Lista de Feira & Mercado 🛒</h3>
          <p className="text-[11px] text-stone-500">
            {shoppingItems.length - completedCount} itens pendentes • {completedCount} no carrinho
          </p>
        </div>
        {completedCount > 0 && (
          <button
            type="button"
            onClick={clearCompletedShoppingItems}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-pink-700 bg-pink-100/70 hover:bg-pink-200/80 transition-colors min-h-[44px]"
          >
            <Trash2 className="w-3 h-3" /> Limpar Concluídos ({completedCount})
          </button>
        )}
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAdd} className="p-3 bg-white rounded-3xl border border-pink-200/70 shadow-sm space-y-2">
        <div className="flex gap-2">
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Adicionar item à feira..."
            className="flex-1 text-xs"
          />
          <Button type="submit" className="shrink-0">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap min-h-[36px] transition-colors',
                category === cat
                  ? 'bg-[#4A1525] text-white'
                  : 'bg-pink-50 text-stone-600 hover:bg-pink-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </form>

      {/* Sections */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const items = shoppingItems.filter((i) => i.category === cat);
          if (items.length === 0) return null;

          return (
            <div
              key={cat}
              className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/60 shadow-sm"
            >
              <h4 className="text-xs font-bold text-[#4A1525] uppercase tracking-wider mb-2">
                {cat} ({items.length})
              </h4>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-2xl bg-white border border-pink-100 hover:border-pink-200 min-h-[44px]"
                  >
                    <button
                      onClick={() => toggleShoppingItem(item.id)}
                      className="flex items-center gap-2.5 flex-1 text-left"
                    >
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                          item.is_completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-pink-200 bg-white'
                        )}
                      >
                        {item.is_completed && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          item.is_completed &&
                            'line-through text-stone-400'
                        )}
                      >
                        {item.item_name}
                      </span>
                    </button>
                    <button
                      onClick={() => deleteShoppingItem(item.id)}
                      className="p-2 text-stone-300 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
