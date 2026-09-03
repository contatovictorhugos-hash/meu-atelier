'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { compressImageToWebp } from '@/lib/utils/image-compression';
import { uploadMediaToSupabase } from '@/lib/supabase/storage';
import { Input } from './Input';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholderLink?: string;
  description?: string;
  folder?: 'looks' | 'wardrobe' | 'meals' | 'daily' | 'study';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Foto',
  placeholderLink = 'https://exemplo.com/imagem.jpg',
  description = 'WebP permanente no Supabase Storage',
  folder = 'looks',
}) => {
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Defense-in-depth: validate MIME type matches image
    if (!file.type.startsWith('image/')) {
      console.warn('Arquivo ignorado: apenas imagens são suportadas.');
      return;
    }

    try {
      setIsCompressing(true);
      const compressedBlob = await compressImageToWebp(file);
      const publicUrl = await uploadMediaToSupabase({
        file: compressedBlob,
        folder,
      });
      onChange(publicUrl);
    } catch (err) {
      console.error('Erro no upload de imagem:', err);
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-stone-700">
          {label}
        </label>
      )}

      {/* Upload button area */}
      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-pink-200 rounded-3xl bg-pink-50/40 hover:bg-pink-50/70 transition-colors cursor-pointer min-h-[90px]">
        <Upload className="w-5 h-5 text-pink-500 mb-1" />
        <span className="text-xs font-medium text-stone-700 text-center">
          {isCompressing ? 'Otimizando foto...' : 'Escolher foto do celular / galeria'}
        </span>
        <span className="text-[10px] text-stone-400 mt-0.5">
          {description}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isCompressing}
        />
      </label>

      {/* Preview if image is chosen */}
      {value && (
        <div className="relative aspect-square w-28 mx-auto overflow-hidden rounded-2xl border border-pink-200 shadow-sm group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Pré-visualização"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
            title="Remover foto"
            aria-label="Remover foto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Link alternative */}
      <div className="text-center">
        <span className="text-[10px] text-stone-400">ou cole um link:</span>
      </div>
      <Input
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          if (val.trim().toLowerCase().startsWith('javascript:')) return;
          onChange(val);
        }}
        placeholder={placeholderLink}
      />
    </div>
  );
};
