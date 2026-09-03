'use client';

import React, { useState, useEffect } from 'react';
import { WardrobeGrid } from '@/components/modules/closet-ootd/WardrobeGrid';
import { LookBuilder } from '@/components/modules/closet-ootd/LookBuilder';
import { OutfitHistory } from '@/components/modules/closet-ootd/OutfitHistory';
import { AddWardrobeItemModal } from '@/components/modules/closet-ootd/AddWardrobeItemModal';
import { Button } from '@/components/ui/Button';
import { useClosetStore } from '@/stores/useClosetStore';
import { Plus, Sparkles } from 'lucide-react';

export default function ClosetPage() {
  const { fetchCloset } = useClosetStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewTab, setViewTab] = useState<'builder' | 'wardrobe' | 'history'>('builder');

  useEffect(() => {
    fetchCloset();
  }, [fetchCloset]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <span className="text-xs font-semibold text-pink-600/80 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> OOTD Studio
          </span>
          <h1 className="text-2xl font-bold text-[#4A1525]">Meu Closet</h1>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Adicionar Peça
        </Button>
      </div>

      {/* Sub-tabs */}
      <div className="flex p-1 bg-pink-100/60 rounded-full border border-pink-200/50">
        <button
          onClick={() => setViewTab('builder')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            viewTab === 'builder'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Look Builder
        </button>
        <button
          onClick={() => setViewTab('wardrobe')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            viewTab === 'wardrobe'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Peças Salvas
        </button>
        <button
          onClick={() => setViewTab('history')}
          className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
            viewTab === 'history'
              ? 'bg-[#4A1525] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Histórico
        </button>
      </div>

      {/* Tab Views */}
      {viewTab === 'builder' && <LookBuilder />}
      {viewTab === 'wardrobe' && <WardrobeGrid />}
      {viewTab === 'history' && <OutfitHistory />}

      {/* Add Item Modal */}
      <AddWardrobeItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
