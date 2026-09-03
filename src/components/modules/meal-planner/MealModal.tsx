'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ImageUploadField } from '@/components/ui/ImageUploadField';
import { useMealStore } from '@/stores/useMealStore';
import type { MealPlanItem, MealType } from '@/types/database.types';
import { Trash2 } from 'lucide-react';

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealToEdit?: MealPlanItem | null;
  defaultDayOfWeek?: number;
}

const WEEKDAYS = [
  { num: 1, label: 'Segunda', short: 'Seg' },
  { num: 2, label: 'Terça', short: 'Ter' },
  { num: 3, label: 'Quarta', short: 'Qua' },
  { num: 4, label: 'Quinta', short: 'Qui' },
  { num: 5, label: 'Sexta', short: 'Sex' },
  { num: 6, label: 'Sábado', short: 'Sáb' },
  { num: 7, label: 'Domingo', short: 'Dom' },
];

const MEAL_TYPES: MealType[] = ['Café', 'Almoço', 'Lanche', 'Jantar'];

export const MealModal: React.FC<MealModalProps> = ({
  isOpen,
  onClose,
  mealToEdit,
  defaultDayOfWeek = 1,
}) => {
  const { saveMeal, deleteMeal } = useMealStore();

  const [dayOfWeek, setDayOfWeek] = useState<number>(defaultDayOfWeek);
  const [mealType, setMealType] = useState<MealType>('Almoço');
  const [title, setTitle] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mealToEdit) {
      setDayOfWeek(mealToEdit.day_of_week);
      setMealType(mealToEdit.meal_type);
      setTitle(mealToEdit.title);
      setIngredientsText(mealToEdit.ingredients.join(', '));
      setPhotoUrl(mealToEdit.photo_url || '');
    } else {
      setDayOfWeek(defaultDayOfWeek);
      setMealType('Almoço');
      setTitle('');
      setIngredientsText('');
      setPhotoUrl('');
    }
    setError('');
  }, [mealToEdit, defaultDayOfWeek, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Por favor, informe o nome do prato ou marmita.');
      return;
    }

    const ingredients = ingredientsText
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    saveMeal({
      id: mealToEdit?.id,
      day_of_week: dayOfWeek,
      meal_type: mealType,
      title: title.trim(),
      ingredients,
      photo_url: photoUrl.trim() || undefined,
    });

    onClose();
  };

  const handleDelete = () => {
    if (mealToEdit) {
      if (window.confirm(`Deseja remover a refeição "${mealToEdit.title}"?`)) {
        deleteMeal(mealToEdit.id);
        onClose();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mealToEdit ? 'Editar Refeição 🍱' : 'Planejar Refeição 🥗'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Dia da Semana */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1.5">
            Dia da Semana
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => {
              const isSelected = dayOfWeek === w.num;
              return (
                <button
                  key={w.num}
                  type="button"
                  onClick={() => setDayOfWeek(w.num)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all min-h-[44px] flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#4A1525] text-white border-[#4A1525] shadow-xs'
                      : 'bg-white text-stone-600 border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {w.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tipo de Refeição */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1.5">
            Tipo de Refeição
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {MEAL_TYPES.map((type) => {
              const isSelected = mealType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMealType(type)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all min-h-[44px] flex items-center justify-center border ${
                    isSelected
                      ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                      : 'bg-white text-stone-600 border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nome do Prato */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1">
            Nome do Prato / Marmita *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Bowl de Frango Grelhado e Quinoa"
            className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 bg-white"
          />
        </div>

        {/* Ingredientes */}
        <div>
          <label className="block text-xs font-semibold text-[#4A1525] mb-1">
            Ingredientes Principais (separados por vírgula)
          </label>
          <input
            type="text"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="Ex: Frango grelhado, Quinoa, Abobrinha, Molho de mostarda"
            className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/20 bg-white"
          />
        </div>

        {/* Foto da Marmita */}
        <div>
          <ImageUploadField
            value={photoUrl}
            onChange={setPhotoUrl}
            label="Foto da Marmita ou Inspiração"
            folder="meals"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-3 border-t border-pink-100">
          {mealToEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 min-h-[44px] px-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remover
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={onClose} size="sm">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {mealToEdit ? 'Salvar Refeição' : 'Adicionar ao Cardápio'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
