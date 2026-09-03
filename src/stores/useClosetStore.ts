import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WardrobeItem, Outfit, WardrobeCategory, OccasionTag } from '@/types/database.types';

interface ClosetState {
  wardrobeItems: WardrobeItem[];
  outfits: Outfit[];
  selectedCategory: WardrobeCategory | 'all';

  setSelectedCategory: (category: WardrobeCategory | 'all') => void;
  addWardrobeItem: (item: Omit<WardrobeItem, 'id'>) => void;
  deleteWardrobeItem: (id: string) => void;
  saveOutfit: (outfit: Omit<Outfit, 'id' | 'created_at'>) => void;
  attachSelfieToOutfit: (outfitId: string, selfieUrl: string) => void;
}

const defaultWardrobe: WardrobeItem[] = [
  {
    id: 'w1',
    category: 'top',
    image_url:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop',
    tags: ['Trabalho', 'Blazer'],
  },
  {
    id: 'w2',
    category: 'top',
    image_url:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop',
    tags: ['Casual', 'Camiseta'],
  },
  {
    id: 'w3',
    category: 'bottom',
    image_url:
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=400&auto=format&fit=crop',
    tags: ['Trabalho', 'Alfaiataria'],
  },
  {
    id: 'w4',
    category: 'shoes',
    image_url:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop',
    tags: ['Trabalho', 'Mocassim'],
  },
  {
    id: 'w5',
    category: 'bag',
    image_url:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
    tags: ['Trabalho', 'Bolsa'],
  },
];

const defaultOutfits: Outfit[] = [
  {
    id: 'o1',
    title: 'Look Segunda de Reuniões',
    occasion: 'Trabalho',
    photo_url:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    items: [defaultWardrobe[0], defaultWardrobe[2], defaultWardrobe[3]],
    created_at: '2026-09-01',
  },
];

export const useClosetStore = create<ClosetState>()(
  persist(
    (set) => ({
      wardrobeItems: defaultWardrobe,
      outfits: defaultOutfits,
      selectedCategory: 'all',

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      addWardrobeItem: (item) =>
        set((state) => ({
          wardrobeItems: [
            { ...item, id: `w_${Date.now()}` },
            ...state.wardrobeItems,
          ],
        })),

      deleteWardrobeItem: (id) =>
        set((state) => ({
          wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
        })),

      saveOutfit: (outfitData) =>
        set((state) => ({
          outfits: [
            {
              ...outfitData,
              id: `o_${Date.now()}`,
              created_at: new Date().toISOString().split('T')[0],
            },
            ...state.outfits,
          ],
        })),

      attachSelfieToOutfit: (outfitId, selfieUrl) =>
        set((state) => ({
          outfits: state.outfits.map((o) =>
            o.id === outfitId ? { ...o, photo_url: selfieUrl } : o
          ),
        })),
    }),
    {
      name: 'atelier-closet-storage',
    }
  )
);
