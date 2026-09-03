'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useClosetStore } from '@/stores/useClosetStore';
import { WardrobeCategory } from '@/types/database.types';
import { compressImageToWebp } from '@/lib/utils/image-compression';
import { Upload, Sparkles } from 'lucide-react';

interface AddWardrobeItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWardrobeItemModal: React.FC<AddWardrobeItemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addWardrobeItem } = useClosetStore();
  const [category, setCategory] = useState<WardrobeCategory>('top');
  const [imageUrl, setImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('Trabalho');
  const [isCompressing, setIsCompressing] = useState(false);

  const categories: { label: string; value: WardrobeCategory; icon: string }[] = [
    { label: 'Cima (Top)', value: 'top', icon: '👚' },
    { label: 'Baixo (Bottom)', value: 'bottom', icon: '👖' },
    { label: 'Sapatos', value: 'shoes', icon: '👠' },
    { label: 'Bolsas', value: 'bag', icon: '👜' },
    { label: 'Acessórios', value: 'accessory', icon: '🎀' },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressedBlob = await compressImageToWebp(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(compressedBlob);
    } catch (err) {
      console.error('Erro na compressão:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSave = () => {
    if (!imageUrl) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addWardrobeItem({
      category,
      image_url: imageUrl,
      tags: tags.length > 0 ? tags : ['Casual'],
    });

    setImageUrl('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Peça no Closet 🎀">
      <div className="space-y-4">
        {/* Category Picker */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Categoria
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={`p-2.5 rounded-2xl border text-xs font-medium flex items-center gap-2 transition-all min-h-[44px] ${
                  category === c.value
                    ? 'bg-pink-100 border-pink-400 text-[#4A1525] font-semibold'
                    : 'bg-white border-pink-100 text-stone-600'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo Upload or URL */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Foto da Peça
          </label>
          <div className="space-y-2">
            <label className="flex items-center justify-center p-4 border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/50 hover:bg-pink-50 cursor-pointer transition-colors min-h-[44px]">
              <div className="flex flex-col items-center text-center">
                <Upload className="w-5 h-5 text-pink-500 mb-1" />
                <span className="text-xs text-stone-600 font-medium">
                  {isCompressing
                    ? 'Otimizando foto em WebP...'
                    : 'Tirar Foto ou Escolher Imagem'}
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5">
                  Compressão automática Y2K (&lt;300KB)
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isCompressing}
              />
            </label>

            {imageUrl && (
              <div className="relative aspect-square w-24 mx-auto overflow-hidden rounded-2xl border border-pink-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Pré-visualização"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-center">
              <span className="text-[10px] text-stone-400">ou cole um link:</span>
            </div>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/foto-peca.jpg"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Tags / Ocasião (separadas por vírgula)
          </label>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Trabalho, Reunião, Inverno"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={!imageUrl || isCompressing}
          className="w-full flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Guardar no Armário
        </Button>
      </div>
    </Modal>
  );
};
