import { createClient } from './client.ts';
import type {
  DailyRoutineLog,
  WardrobeItem,
  Outfit,
  MealPlanItem,
  PrepTask,
  ShoppingItem,
  StudyCourse,
  StudyNote,
  StudyDeadline,
  DeadlineStatus,
  GroceryCategory,
  WardrobeCategory,
  OccasionTag,
  MealType,
} from '../../types/database.types.ts';

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return Boolean(
    url &&
    !url.includes('placeholder.supabase.co') &&
    !url.includes('sua_url_aqui')
  );
}

// ==============================================================================
// 1. DAILY GLOW SYNC
// ==============================================================================

export async function fetchUserDailyGlow(
  dateStr: string
): Promise<DailyRoutineLog | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('daily_routine_logs')
    .select('*')
    .eq('user_id', userData.user.id)
    .eq('log_date', dateStr)
    .maybeSingle();

  if (error) {
    console.warn('[Sync] Erro ao buscar Daily Glow:', error.message);
    return null;
  }
  return data as DailyRoutineLog | null;
}

export async function saveUserDailyGlow(
  log: Omit<DailyRoutineLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const payload = {
    user_id: userData.user.id,
    log_date: log.log_date,
    water_cups: log.water_cups,
    morning_habits_completed: log.morning_habits_completed,
    evening_habits_completed: log.evening_habits_completed,
    daily_photo_url: log.daily_photo_url,
    daily_mood_quote: log.daily_mood_quote,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('daily_routine_logs')
    .upsert(payload, { onConflict: 'user_id,log_date' });

  if (error) {
    console.warn('[Sync] Erro ao salvar Daily Glow:', error.message);
  }
}

// ==============================================================================
// 2. CLOSET & OUTFITS SYNC
// ==============================================================================

export async function fetchUserWardrobe(): Promise<WardrobeItem[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[Sync] Erro ao buscar guarda-roupa:', error.message);
    return null;
  }
  return data as WardrobeItem[];
}

export async function insertUserWardrobe(
  item: Omit<WardrobeItem, 'id' | 'user_id' | 'created_at'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('wardrobe_items')
    .insert({
      user_id: userData.user.id,
      category: item.category,
      image_url: item.image_url,
      tags: item.tags,
    })
    .select('id')
    .single();

  if (error) {
    console.warn('[Sync] Erro ao inserir peça no closet:', error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function deleteUserWardrobe(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('wardrobe_items')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) {
    console.warn('[Sync] Erro ao excluir peça do closet:', error.message);
  }
}

export async function fetchUserOutfits(): Promise<Outfit[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[Sync] Erro ao buscar looks:', error.message);
    return null;
  }
  return data as Outfit[];
}

export async function insertUserOutfit(
  outfit: Omit<Outfit, 'id' | 'user_id' | 'created_at'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('outfits')
    .insert({
      user_id: userData.user.id,
      title: outfit.title,
      occasion: outfit.occasion,
      photo_url: outfit.photo_url,
      item_ids: outfit.items?.map((i) => i.id) || [],
    })
    .select('id')
    .single();

  if (error) {
    console.warn('[Sync] Erro ao salvar look:', error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function deleteUserOutfit(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('outfits')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) {
    console.warn('[Sync] Erro ao excluir look:', error.message);
  }
}

// ==============================================================================
// 3. MEALS, PREP & SHOPPING SYNC
// ==============================================================================

export async function fetchUserMeals(): Promise<MealPlanItem[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('weekly_meals')
    .select('*')
    .eq('user_id', userData.user.id);

  if (error) {
    console.warn('[Sync] Erro ao buscar cardápio:', error.message);
    return null;
  }
  return data as MealPlanItem[];
}

export async function saveUserMeal(
  meal: Omit<MealPlanItem, 'user_id'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const payload = {
    user_id: userData.user.id,
    day_of_week: meal.day_of_week,
    meal_type: meal.meal_type,
    title: meal.title,
    photo_url: meal.photo_url,
    ingredients: meal.ingredients,
  };

  if (meal.id && !meal.id.startsWith('m_')) {
    const { error } = await supabase
      .from('weekly_meals')
      .update(payload)
      .eq('id', meal.id)
      .eq('user_id', userData.user.id);
    if (error) console.warn('[Sync] Erro ao atualizar refeição:', error.message);
    return meal.id;
  } else {
    const { data, error } = await supabase
      .from('weekly_meals')
      .insert(payload)
      .select('id')
      .single();
    if (error) console.warn('[Sync] Erro ao criar refeição:', error.message);
    return data?.id ?? null;
  }
}

export async function deleteUserMeal(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('weekly_meals')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar refeição:', error.message);
}

export async function fetchUserPrepTasks(): Promise<PrepTask[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('prep_tasks')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[Sync] Erro ao buscar prep tasks:', error.message);
    return null;
  }
  return data as PrepTask[];
}

export async function insertUserPrepTask(task: string): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('prep_tasks')
    .insert({ user_id: userData.user.id, task, completed: false })
    .select('id')
    .single();

  if (error) console.warn('[Sync] Erro ao inserir prep task:', error.message);
  return data?.id ?? null;
}

export async function toggleUserPrepTask(
  id: string,
  completed: boolean
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('prep_tasks')
    .update({ completed })
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar prep task:', error.message);
}

export async function updateUserPrepTask(
  id: string,
  task: string
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('prep_tasks')
    .update({ task })
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar texto da prep task:', error.message);
}

export async function deleteUserPrepTask(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('prep_tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar prep task:', error.message);
}

export async function fetchUserShoppingItems(): Promise<ShoppingItem[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('shopping_items')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[Sync] Erro ao buscar lista de compras:', error.message);
    return null;
  }
  return data as ShoppingItem[];
}

export async function insertUserShoppingItem(
  name: string,
  category: GroceryCategory
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('shopping_items')
    .insert({
      user_id: userData.user.id,
      item_name: name,
      category,
      is_completed: false,
    })
    .select('id')
    .single();

  if (error) console.warn('[Sync] Erro ao inserir item de compra:', error.message);
  return data?.id ?? null;
}

export async function toggleUserShoppingItem(
  id: string,
  is_completed: boolean
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('shopping_items')
    .update({ is_completed })
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar item de compra:', error.message);
}

export async function deleteUserShoppingItem(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('shopping_items')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar item de compra:', error.message);
}

export async function updateUserShoppingItem(
  id: string,
  updates: { item_name?: string; category?: GroceryCategory }
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('shopping_items')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar item de compra:', error.message);
}

export async function clearCompletedUserShoppingItems(): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('shopping_items')
    .delete()
    .eq('is_completed', true)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao limpar itens concluídos:', error.message);
}

// ==============================================================================
// 4. LEGAL BINDER SYNC
// ==============================================================================

export async function fetchUserCourses(): Promise<StudyCourse[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_courses')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[Sync] Erro ao buscar cursos de Direito:', error.message);
    return null;
  }
  return data as StudyCourse[];
}

export async function insertUserCourse(
  course: Omit<StudyCourse, 'id' | 'user_id'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_courses')
    .insert({
      user_id: userData.user.id,
      name: course.name,
      professor: course.professor,
      day_of_week: course.day_of_week,
      color_accent: course.color_accent,
      progress_percentage: course.progress_percentage,
    })
    .select('id')
    .single();

  if (error) console.warn('[Sync] Erro ao inserir matéria:', error.message);
  return data?.id ?? null;
}

export async function updateUserCourse(
  id: string,
  updates: Partial<Omit<StudyCourse, 'id' | 'user_id'>>
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_courses')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar matéria:', error.message);
}

export async function deleteUserCourse(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_courses')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar matéria:', error.message);
}

export async function fetchUserNotes(): Promise<StudyNote[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_notes')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[Sync] Erro ao buscar fichamentos:', error.message);
    return null;
  }
  return data as StudyNote[];
}

export async function insertUserNote(
  note: Omit<StudyNote, 'id' | 'user_id' | 'created_at'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_notes')
    .insert({
      user_id: userData.user.id,
      course_id: note.course_id,
      title: note.title,
      summary_text: note.summary_text,
      photo_url: note.photo_url,
      tags: note.tags,
    })
    .select('id')
    .single();

  if (error) console.warn('[Sync] Erro ao inserir fichamento:', error.message);
  return data?.id ?? null;
}

export async function deleteUserNote(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_notes')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar fichamento:', error.message);
}

export async function updateUserNote(
  id: string,
  updates: Partial<Omit<StudyNote, 'id' | 'user_id' | 'created_at'>>
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_notes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar fichamento:', error.message);
}

export async function fetchUserDeadlines(): Promise<StudyDeadline[] | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_deadlines')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('due_date', { ascending: true });

  if (error) {
    console.warn('[Sync] Erro ao buscar prazos:', error.message);
    return null;
  }
  return data as StudyDeadline[];
}

export async function insertUserDeadline(
  deadline: Omit<StudyDeadline, 'id' | 'user_id'>
): Promise<string | null> {
  if (!isConfigured()) return null;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('study_deadlines')
    .insert({
      user_id: userData.user.id,
      course_id: deadline.course_id,
      title: deadline.title,
      due_date: deadline.due_date,
      status: deadline.status,
    })
    .select('id')
    .single();

  if (error) console.warn('[Sync] Erro ao inserir prazo:', error.message);
  return data?.id ?? null;
}

export async function updateUserDeadlineStatus(
  id: string,
  status: DeadlineStatus
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_deadlines')
    .update({ status })
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar status do prazo:', error.message);
}

export async function updateUserDeadline(
  id: string,
  updates: Partial<Omit<StudyDeadline, 'id' | 'user_id'>>
): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_deadlines')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao atualizar prazo:', error.message);
}

export async function deleteUserDeadline(id: string): Promise<void> {
  if (!isConfigured()) return;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { error } = await supabase
    .from('study_deadlines')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);

  if (error) console.warn('[Sync] Erro ao deletar prazo:', error.message);
}
