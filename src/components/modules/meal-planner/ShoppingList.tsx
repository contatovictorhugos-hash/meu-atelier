'use client';

import React, { useState } from 'react';
import { useMealStore } from '@/stores/useMealStore';
import { GroceryCategory, ShoppingItem } from '@/types/database.types';
import { Plus, Trash2, Check, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils/utils';

export const ShoppingList: React.FC = () => {
  const {
    shoppingItems,
    toggleShoppingItem,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    clearCompletedShoppingItems,
  } = useMealStore();

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<GroceryCategory>('Hortifrúti');

  // Estado de Edição
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<GroceryCategory>('Hortifrúti');

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

  const handleOpenEdit = (item: ShoppingItem) => {
    setEditingItem(item);
    setEditName(item.item_name);
    setEditCategory(item.category);
  };

  const handleCloseEdit = () => {
    setEditingItem(null);
    setEditName('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && editName.trim()) {
      updateShoppingItem(editingItem.id, {
        item_name: editName.trim(),
        category: editCategory,
      });
      handleCloseEdit();
    }
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
      <form onSubmit={handleAdd} className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Adicionar ingrediente ou produto..."
            className="min-h-[44px]"
            aria-label="Novo item de compra"
          />
          <Button type="submit" className="shrink-0 flex items-center gap-1 min-h-[44px]">
            <Plus className="w-3.5 h-3.5" /> Adicionar
          </Button>
        </div>

        {/* Category Selector for New Item */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
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

      {/* Empty State */}
      {shoppingItems.length === 0 && (
        <div className="p-8 text-center bg-[#FCFBF7] rounded-3xl border border-dashed border-pink-200 text-stone-500 text-xs">
          Sua lista de compras está vazia! 🛒 Adicione ingredientes e itens para sua próxima ida à feira ou mercado.
        </div>
      )}

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
                      className="flex items-center gap-2.5 flex-1 text-left min-h-[36px]"
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

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-stone-400 hover:text-[#4A1525] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Editar item ${item.item_name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteShoppingItem(item.id)}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Remover item ${item.item_name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Edição */}
      <Modal
        isOpen={!!editingItem}
        onClose={handleCloseEdit}
        title="Editar Item de Compra 🛒"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Nome do Ingrediente ou Produto
            </label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Ex: Cenoura ralada"
              className="min-h-[44px]"
              aria-label="Nome do item de compra"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Categoria / Corredor
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setEditCategory(cat)}
                  className={cn(
                    'p-2.5 rounded-2xl text-xs font-medium border text-center transition-all min-h-[44px]',
                    editCategory === cat
                      ? 'bg-[#4A1525] text-white border-[#4A1525] shadow-xs'
                      : 'bg-white border-pink-200 text-stone-700 hover:bg-pink-50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full min-h-[44px]">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
