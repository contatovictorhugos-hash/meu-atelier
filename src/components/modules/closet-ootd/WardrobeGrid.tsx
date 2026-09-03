'use client';

import React from 'react';
import { useClosetStore } from '@/stores/useClosetStore';
import { WardrobeCategory } from '@/types/database.types';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const WardrobeGrid: React.FC = () => {
  const { wardrobeItems, selectedCategory, setSelectedCategory, deleteWardrobeItem, isLoading } =
    useClosetStore();

  const categories: { label: string; value: WardrobeCategory | 'all'; icon: string }[] = [
    { label: 'Tudo', value: 'all', icon: '✨' },
    { label: 'Top', value: 'top', icon: '👚' },
    { label: 'Bottom', value: 'bottom', icon: '👖' },
    { label: 'Sapatos', value: 'shoes', icon: '👠' },
    { label: 'Bolsas', value: 'bag', icon: '👜' },
    { label: 'Acessórios', value: 'accessory', icon: '🎀' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? wardrobeItems
      : wardrobeItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-3">
      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setSelectedCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 min-h-[44px] ${
              selectedCategory === c.value
                ? 'bg-[#4A1525] text-white shadow-sm'
                : 'bg-white border border-pink-200 text-stone-600 hover:bg-pink-50'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white/70 rounded-2xl p-2 border border-pink-100 animate-pulse space-y-2"
            >
              <div className="aspect-[3/4] bg-pink-100/60 rounded-xl" />
              <div className="h-4 bg-pink-100/50 rounded-md w-3/4" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredItems.length === 0 && (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-dashed border-pink-200 space-y-2">
          <span className="text-3xl block mb-1">👚</span>
          <h3 className="text-sm font-semibold text-[#4A1525]">
            Nenhuma peça cadastrada ainda
          </h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Adicione sua primeira roupa ou acessório ao closet do Atelier usando o botão acima.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && filteredItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#FCFBF7] rounded-2xl overflow-hidden border border-pink-200/60 shadow-sm transition-transform hover:scale-102"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt="Peça"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2 flex items-center justify-between gap-1">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="blush">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <button
                  onClick={() => deleteWardrobeItem(item.id)}
                  className="p-2 text-stone-300 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Excluir peça"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
