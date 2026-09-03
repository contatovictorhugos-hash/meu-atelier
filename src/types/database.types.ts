export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type WardrobeCategory = 'top' | 'bottom' | 'shoes' | 'bag' | 'accessory';
export type OccasionTag = 'Trabalho' | 'Casual' | 'Noite' | 'Frio' | 'Calor';
export type MealType = 'Café' | 'Almoço' | 'Lanche' | 'Jantar';
export type GroceryCategory = 'Hortifrúti' | 'Geladeira' | 'Despensa' | 'Outros';
export type DeadlineStatus = 'Não iniciado' | 'Em rascunho' | 'Finalizado';

export interface WardrobeItem {
  id: string;
  user_id?: string;
  category: WardrobeCategory;
  image_url: string;
  tags: string[];
  created_at?: string;
}

export interface Outfit {
  id: string;
  user_id?: string;
  title?: string;
  occasion: OccasionTag;
  photo_url?: string;
  items?: WardrobeItem[];
  created_at: string;
}

export interface MealPlanItem {
  id: string;
  user_id?: string;
  day_of_week: number; // 1 = Seg ... 5 = Sex
  meal_type: MealType;
  title: string;
  photo_url?: string;
  ingredients: string[];
}

export interface ShoppingItem {
  id: string;
  user_id?: string;
  item_name: string;
  category: GroceryCategory;
  is_completed: boolean;
}

export interface DailyRoutineLog {
  id: string;
  user_id?: string;
  log_date: string;
  water_cups: number;
  morning_habits_completed: string[];
  evening_habits_completed: string[];
  daily_photo_url?: string;
  daily_mood_quote?: string;
}

export interface StudyCourse {
  id: string;
  user_id?: string;
  name: string;
  professor?: string;
  color_accent: string;
  progress_percentage: number;
}

export interface StudyNote {
  id: string;
  course_id: string;
  user_id?: string;
  title: string;
  summary_text: string;
  photo_url?: string;
  tags: string[];
  created_at: string;
}

export interface StudyDeadline {
  id: string;
  course_id: string;
  user_id?: string;
  title: string;
  due_date: string;
  status: DeadlineStatus;
}
