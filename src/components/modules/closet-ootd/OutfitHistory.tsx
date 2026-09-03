'use client';

import React from 'react';
import { useClosetStore } from '@/stores/useClosetStore';
import { PolaroidFrame } from '@/components/layout/PolaroidFrame';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/utils';

export const OutfitHistory: React.FC = () => {
  const { outfits } = useClosetStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[#4A1525]">
        Histórico de Looks Usados 📸
      </h3>

      <div className="space-y-4">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-[#FCFBF7] rounded-3xl p-4 border border-pink-200/60 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#4A1525]">
                {outfit.title || `Look ${outfit.occasion}`}
              </span>
              <Badge variant="bordeaux">{outfit.occasion}</Badge>
            </div>

            {/* Selfie or collage thumbnails */}
            {outfit.photo_url ? (
              <PolaroidFrame
                imageUrl={outfit.photo_url}
                caption={outfit.title}
                date={formatDate(outfit.created_at)}
              />
            ) : (
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
            )}
            <p className="text-[10px] text-stone-400 font-mono mt-2 text-right">
              {formatDate(outfit.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
