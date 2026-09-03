'use client';

import React, { useState } from 'react';
import { useDailyGlowStore } from '@/stores/useDailyGlowStore';
import { PolaroidFrame } from '@/components/layout/PolaroidFrame';
import { HydrationTracker } from './HydrationTracker';
import { HabitStickers } from './HabitStickers';
import { Sparkles, Camera, Heart } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const DailyGlowWidget: React.FC = () => {
  const { dailyPhotoUrl, dailyQuote, setDailyPhotoUrl, setDailyQuote } =
    useDailyGlowStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoInput, setPhotoInput] = useState('');
  const [quoteInput, setQuoteInput] = useState('');

  const handleSaveHighlights = () => {
    if (photoInput.trim()) setDailyPhotoUrl(photoInput.trim());
    if (quoteInput.trim()) setDailyQuote(quoteInput.trim());
    setIsModalOpen(false);
  };

  const todayFormatted = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="space-y-4">
      {/* Header Greeting */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <span className="text-xs font-semibold text-pink-600/80 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Meu Santuário Pessoal
          </span>
          <h1 className="text-2xl font-bold text-[#4A1525] capitalize">
            {todayFormatted}
          </h1>
        </div>
        <button
          onClick={() => {
            setPhotoInput(dailyPhotoUrl);
            setQuoteInput(dailyQuote);
            setIsModalOpen(true);
          }}
          className="p-2.5 rounded-full bg-white border border-pink-200 shadow-sticker text-[#4A1525] hover:bg-pink-50 min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform active:scale-95"
          aria-label="Personalizar Foto e Afirmação"
        >
          <Camera className="w-4 h-4 text-pink-500" />
        </button>
      </div>

      {/* Polaroid Highlight of the Day */}
      <PolaroidFrame
        imageUrl={dailyPhotoUrl}
        caption="Mood do Dia ✨"
        date={new Date().toLocaleDateString('pt-BR')}
        onClick={() => {
          setPhotoInput(dailyPhotoUrl);
          setQuoteInput(dailyQuote);
          setIsModalOpen(true);
        }}
      />

      {/* Daily Affirmation Card */}
      <div className="bg-gradient-to-r from-pink-50/90 via-[#FCFBF7] to-pink-50/90 p-4 rounded-3xl border border-pink-200/60 shadow-sm flex items-start gap-3">
        <div className="p-2 bg-pink-100 rounded-full text-pink-600 shrink-0 mt-0.5">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#4A1525]/70">
            Afirmação do Dia
          </h4>
          <p className="text-xs text-stone-700 font-medium italic mt-0.5">
            &ldquo;{dailyQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Hydration Tracker */}
      <HydrationTracker />

      {/* Habits & Skincare Stickers */}
      <HabitStickers />

      {/* Modal for editing photo & quote */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Destaque de Hoje 🎀"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              URL da Foto do Dia (Polaroid)
            </label>
            <Input
              value={photoInput}
              onChange={(e) => setPhotoInput(e.target.value)}
              placeholder="https://exemplo.com/minha-foto.jpg"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Frase ou Afirmação de Hoje
            </label>
            <Input
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              placeholder="O que te inspira hoje?"
            />
          </div>
          <Button onClick={handleSaveHighlights} className="w-full">
            Salvar Destaque
          </Button>
        </div>
      </Modal>
    </div>
  );
};
