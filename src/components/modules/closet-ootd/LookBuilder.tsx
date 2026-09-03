'use client';

import React, { useState } from 'react';
import { useClosetStore } from '@/stores/useClosetStore';
import { WardrobeItem, OccasionTag } from '@/types/database.types';
import { Button } from '@/components/ui/Button';
import { Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export const LookBuilder: React.FC = () => {
  const { wardrobeItems, saveOutfit } = useClosetStore();
  const [occasion, setOccasion] = useState<OccasionTag>('Trabalho');
  const [lookTitle, setLookTitle] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Group wardrobe items by slot
  const tops = wardrobeItems.filter((i) => i.category === 'top');
  const bottoms = wardrobeItems.filter((i) => i.category === 'bottom');
  const shoes = wardrobeItems.filter((i) => i.category === 'shoes');
  const accessories = wardrobeItems.filter(
    (i) => i.category === 'accessory' || i.category === 'bag'
  );

  const [selectedTopIdx, setSelectedTopIdx] = useState(0);
  const [selectedBottomIdx, setSelectedBottomIdx] = useState(0);
  const [selectedShoesIdx, setSelectedShoesIdx] = useState(0);
  const [selectedAccIdx, setSelectedAccIdx] = useState(0);

  const selectedTop = tops[selectedTopIdx];
  const selectedBottom = bottoms[selectedBottomIdx];
  const selectedShoes = shoes[selectedShoesIdx];
  const selectedAcc = accessories[selectedAccIdx];

  const occasions: OccasionTag[] = ['Trabalho', 'Casual', 'Noite', 'Frio', 'Calor'];

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

  const handleSaveCurrentLook = () => {
    const items: WardrobeItem[] = [];
    if (selectedTop) items.push(selectedTop);
    if (selectedBottom) items.push(selectedBottom);
    if (selectedShoes) items.push(selectedShoes);
    if (selectedAcc) items.push(selectedAcc);

    if (items.length === 0) return;

    saveOutfit({
      title: lookTitle.trim() || `Look ${occasion}`,
      occasion,
      items,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const renderSlotCarousel = (
    label: string,
    item: WardrobeItem | undefined,
    currentIdx: number,
    totalCount: number,
    setter: (n: number) => void
  ) => (
    <div className="relative flex flex-col items-center bg-[#FCFBF7] rounded-2xl p-2 border border-pink-200/60 shadow-sm">
      <span className="text-[10px] font-semibold text-stone-500 uppercase mb-1">
        {label}
      </span>
      <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-stone-100">
        {item ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_url}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-stone-400">Vazio</span>
        )}

        {totalCount > 1 && (
          <>
            <button
              onClick={() => cycleSlot(currentIdx, totalCount, -1, setter)}
              className="absolute left-1 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 shadow-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Item anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => cycleSlot(currentIdx, totalCount, 1, setter)}
              className="absolute right-1 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 shadow-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Próximo item"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-pink-200/70 shadow-scrapbook space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#4A1525] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500" /> Montador de Looks (OOTD)
        </h3>
        <span className="text-[10px] font-mono text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full">
          Estilo Cher Y2K ✨
        </span>
      </div>

      {/* Occasion Selector */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {occasions.map((occ) => (
          <button
            key={occ}
            onClick={() => setOccasion(occ)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap min-h-[44px] ${
              occasion === occ
                ? 'bg-[#4A1525] text-white'
                : 'bg-pink-50 text-[#4A1525] hover:bg-pink-100/70'
            }`}
          >
            {occ}
          </button>
        ))}
      </div>

      {/* Visual Collages Carousel */}
      <div className="grid grid-cols-2 gap-2">
        {renderSlotCarousel('Top (Cima)', selectedTop, selectedTopIdx, tops.length, setSelectedTopIdx)}
        {renderSlotCarousel('Bottom (Baixo)', selectedBottom, selectedBottomIdx, bottoms.length, setSelectedBottomIdx)}
        {renderSlotCarousel('Calçado', selectedShoes, selectedShoesIdx, shoes.length, setSelectedShoesIdx)}
        {renderSlotCarousel('Acessório / Bolsa', selectedAcc, selectedAccIdx, accessories.length, setSelectedAccIdx)}
      </div>

      {/* Title & Save Button */}
      <div className="pt-1 flex gap-2">
        <input
          type="text"
          value={lookTitle}
          onChange={(e) => setLookTitle(e.target.value)}
          placeholder="Nome do look (opcional)..."
          className="flex-1 text-xs px-3 py-2 bg-white rounded-2xl border border-pink-200 text-stone-700 min-h-[44px] focus:outline-none"
        />
        <Button
          onClick={handleSaveCurrentLook}
          className="flex items-center gap-1.5 shrink-0"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              Salvo!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Salvar Look
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
