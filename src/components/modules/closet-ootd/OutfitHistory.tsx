'use client';

import React, { useState } from 'react';
import { useClosetStore } from '@/stores/useClosetStore';
import { PolaroidFrame } from '@/components/layout/PolaroidFrame';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ImageUploadField } from '@/components/ui/ImageUploadField';
import { formatDate } from '@/lib/utils/utils';
import { Camera, Sparkles, Trash2 } from 'lucide-react';

export const OutfitHistory: React.FC = () => {
  const { outfits, attachSelfieToOutfit, deleteOutfit } = useClosetStore();
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoInput, setPhotoInput] = useState('');

  const handleOpenPhotoModal = (outfitId: string, currentPhotoUrl?: string) => {
    setSelectedOutfitId(outfitId);
    setPhotoInput(currentPhotoUrl || '');
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = () => {
    if (selectedOutfitId && photoInput.trim()) {
      attachSelfieToOutfit(selectedOutfitId, photoInput.trim());
      setIsPhotoModalOpen(false);
      setSelectedOutfitId(null);
      setPhotoInput('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525]">
          Histórico de Looks Usados 📸
        </h3>
        <span className="text-[11px] text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full font-medium">
          {outfits.length} {outfits.length === 1 ? 'look salvo' : 'looks salvos'}
        </span>
      </div>

      <div className="space-y-4">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/60 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#4A1525] truncate max-w-[65%]">
                {outfit.title || `Look ${outfit.occasion}`}
              </span>
              <div className="flex items-center gap-1.5">
                <Badge variant="bordeaux">{outfit.occasion}</Badge>
                <button
                  onClick={() => deleteOutfit(outfit.id)}
                  className="p-1.5 text-stone-300 hover:text-red-500 transition-colors rounded-full"
                  title="Excluir look"
                  aria-label="Excluir look"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Selfie or collage thumbnails */}
            {outfit.photo_url ? (
              <div>
                <PolaroidFrame
                  imageUrl={outfit.photo_url}
                  caption={outfit.title}
                  date={formatDate(outfit.created_at)}
                  onClick={() => handleOpenPhotoModal(outfit.id, outfit.photo_url)}
                />
                <div className="flex justify-between items-center mt-2 px-1">
                  <button
                    onClick={() => handleOpenPhotoModal(outfit.id, outfit.photo_url)}
                    className="text-[11px] text-pink-600 hover:text-pink-800 font-medium flex items-center gap-1 min-h-[36px]"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Trocar foto do look
                  </button>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatDate(outfit.created_at)}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-1.5 p-2 bg-stone-50 rounded-2xl border border-stone-200/50">
                  {outfit.items?.map((item) => (
                    <div
                      key={item.id}
                      className="aspect-square rounded-xl overflow-hidden bg-stone-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image_url}
                        alt="Peça"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 pt-1">
                  <button
                    onClick={() => handleOpenPhotoModal(outfit.id)}
                    className="py-2 px-3 rounded-2xl border border-dashed border-pink-300 text-pink-700 bg-pink-50/60 hover:bg-pink-100/70 text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
                  >
                    <Camera className="w-4 h-4 text-pink-500" />
                    Adicionar Selfie do Look
                  </button>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatDate(outfit.created_at)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for adding/updating outfit selfie */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Foto do Look (Selfie OOTD) 📸"
      >
        <div className="space-y-4">
          <ImageUploadField
            label="Foto do Look"
            value={photoInput}
            onChange={setPhotoInput}
            placeholderLink="https://exemplo.com/minha-selfie.jpg"
            description="WebP leve para registrar o look usado"
          />
          <Button
            onClick={handleSavePhoto}
            disabled={!photoInput.trim()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Salvar Foto do Look
          </Button>
        </div>
      </Modal>
    </div>
  );
};
