import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WardrobeItem, Outfit, WardrobeCategory, OccasionTag } from '../types/database.types.ts';
import {
  fetchUserWardrobe,
  insertUserWardrobe,
  deleteUserWardrobe,
  fetchUserOutfits,
  insertUserOutfit,
  deleteUserOutfit,
} from '../lib/supabase/sync.ts';

interface ClosetState {
  wardrobeItems: WardrobeItem[];
  outfits: Outfit[];
  selectedCategory: WardrobeCategory | 'all';
  isLoading: boolean;

  setSelectedCategory: (category: WardrobeCategory | 'all') => void;
  addWardrobeItem: (item: Omit<WardrobeItem, 'id'>) => void;
  deleteWardrobeItem: (id: string) => void;
  saveOutfit: (outfit: Omit<Outfit, 'id' | 'created_at'>) => void;
  attachSelfieToOutfit: (outfitId: string, selfieUrl: string) => void;
  deleteOutfit: (id: string) => void;
  fetchCloset: () => Promise<void>;
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
      isLoading: false,

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      fetchCloset: async () => {
        set({ isLoading: true });
        try {
          const [cloudItems, cloudOutfits] = await Promise.all([
            fetchUserWardrobe(),
            fetchUserOutfits(),
          ]);

          if (cloudItems !== null) {
            set({ wardrobeItems: cloudItems });
          }
          if (cloudOutfits !== null) {
            set({ outfits: cloudOutfits });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      addWardrobeItem: (item) => {
        const tempId = `w_${Date.now()}`;
        set((state) => ({
          wardrobeItems: [{ ...item, id: tempId }, ...state.wardrobeItems],
        }));

        insertUserWardrobe(item)
          .then((realId) => {
            if (realId) {
              set((state) => ({
                wardrobeItems: state.wardrobeItems.map((w) =>
                  w.id === tempId ? { ...w, id: realId } : w
                ),
              }));
            }
          })
          .catch(() => {});
      },

      deleteWardrobeItem: (id) => {
        set((state) => ({
          wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
        }));
        deleteUserWardrobe(id).catch(() => {});
      },

      saveOutfit: (outfitData) => {
        const tempId = `o_${Date.now()}`;
        const createdAt = new Date().toISOString().split('T')[0];
        set((state) => ({
          outfits: [
            {
              ...outfitData,
              id: tempId,
              created_at: createdAt,
            },
            ...state.outfits,
          ],
        }));

        insertUserOutfit(outfitData)
          .then((realId) => {
            if (realId) {
              set((state) => ({
                outfits: state.outfits.map((o) =>
                  o.id === tempId ? { ...o, id: realId } : o
                ),
              }));
            }
          })
          .catch(() => {});
      },

      attachSelfieToOutfit: (outfitId, selfieUrl) =>
        set((state) => ({
          outfits: state.outfits.map((o) =>
            o.id === outfitId ? { ...o, photo_url: selfieUrl } : o
          ),
        })),

      deleteOutfit: (id) => {
        set((state) => ({
          outfits: state.outfits.filter((o) => o.id !== id),
        }));
        deleteUserOutfit(id).catch(() => {});
      },
    }),
    {
      name: 'atelier-closet-storage',
    }
  )
);
