-- ==============================================================================
-- ATELIER PWA — SCHEMA POSTGRESQL COM ROW LEVEL SECURITY (RLS) & STORAGE
-- ==============================================================================

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABELAS DE DOMÍNIO
-- ==============================================================================

-- 2.1 DAILY GLOW (Hábitos, Hidratação, Foto & Frase do Dia)
CREATE TABLE IF NOT EXISTS public.daily_routine_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    water_cups INTEGER NOT NULL DEFAULT 0 CHECK (water_cups >= 0),
    morning_habits_completed TEXT[] NOT NULL DEFAULT '{}',
    evening_habits_completed TEXT[] NOT NULL DEFAULT '{}',
    daily_photo_url TEXT,
    daily_mood_quote TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT daily_routine_logs_user_date_key UNIQUE (user_id, log_date)
);

-- 2.2 CLOSET — ITENS DE GUARDA-ROUPA
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    category TEXT NOT NULL CHECK (category IN ('top', 'bottom', 'shoes', 'bag', 'accessory')),
    image_url TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 CLOSET — LOOKS & OUTFITS
CREATE TABLE IF NOT EXISTS public.outfits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    title TEXT,
    occasion TEXT NOT NULL,
    photo_url TEXT,
    item_ids UUID[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4 BENTO — REFEIÇÕES DA SEMANA
CREATE TABLE IF NOT EXISTS public.weekly_meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    meal_type TEXT NOT NULL CHECK (meal_type IN ('Café', 'Almoço', 'Lanche', 'Jantar')),
    title TEXT NOT NULL,
    photo_url TEXT,
    ingredients TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.5 BENTO — TAREFAS DE PREPARO DE DOMINGO (MEAL PREP)
CREATE TABLE IF NOT EXISTS public.prep_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.6 BENTO — LISTA DE COMPRAS DO MERCADO
CREATE TABLE IF NOT EXISTS public.shopping_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    item_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Hortifrúti', 'Geladeira', 'Despensa', 'Outros')),
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.7 LEGAL BINDER — MATÉRIAS / CURSOS JURÍDICOS
CREATE TABLE IF NOT EXISTS public.study_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    name TEXT NOT NULL,
    professor TEXT,
    day_of_week SMALLINT CHECK (day_of_week BETWEEN 1 AND 7),
    color_accent TEXT NOT NULL DEFAULT '#FCE7EC',
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.8 LEGAL BINDER — MICRO-FICHAMENTOS & ANOTAÇÕES
CREATE TABLE IF NOT EXISTS public.study_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.study_courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    title TEXT NOT NULL,
    summary_text TEXT NOT NULL DEFAULT '',
    photo_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.9 LEGAL BINDER — PRAZOS & ENTREGAS
CREATE TABLE IF NOT EXISTS public.study_deadlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.study_courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    title TEXT NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Não iniciado', 'Em rascunho', 'Finalizado')) DEFAULT 'Não iniciado',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. HABILITAÇÃO DO ROW LEVEL SECURITY (RLS) EM 100% DAS TABELAS
-- ==============================================================================

ALTER TABLE public.daily_routine_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prep_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_deadlines ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 4. POLÍTICAS DE RLS (ISOLAMENTO ESTRITO POR USUÁRIO: SELECT, INSERT, UPDATE, DELETE)
-- ==============================================================================

-- 4.1 daily_routine_logs
CREATE POLICY "daily_routine_logs_select" ON public.daily_routine_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "daily_routine_logs_insert" ON public.daily_routine_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "daily_routine_logs_update" ON public.daily_routine_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "daily_routine_logs_delete" ON public.daily_routine_logs FOR DELETE USING (auth.uid() = user_id);

-- 4.2 wardrobe_items
CREATE POLICY "wardrobe_items_select" ON public.wardrobe_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wardrobe_items_insert" ON public.wardrobe_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wardrobe_items_update" ON public.wardrobe_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "wardrobe_items_delete" ON public.wardrobe_items FOR DELETE USING (auth.uid() = user_id);

-- 4.3 outfits
CREATE POLICY "outfits_select" ON public.outfits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "outfits_insert" ON public.outfits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "outfits_update" ON public.outfits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "outfits_delete" ON public.outfits FOR DELETE USING (auth.uid() = user_id);

-- 4.4 weekly_meals
CREATE POLICY "weekly_meals_select" ON public.weekly_meals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "weekly_meals_insert" ON public.weekly_meals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "weekly_meals_update" ON public.weekly_meals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "weekly_meals_delete" ON public.weekly_meals FOR DELETE USING (auth.uid() = user_id);

-- 4.5 prep_tasks
CREATE POLICY "prep_tasks_select" ON public.prep_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "prep_tasks_insert" ON public.prep_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "prep_tasks_update" ON public.prep_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "prep_tasks_delete" ON public.prep_tasks FOR DELETE USING (auth.uid() = user_id);

-- 4.6 shopping_items
CREATE POLICY "shopping_items_select" ON public.shopping_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "shopping_items_insert" ON public.shopping_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "shopping_items_update" ON public.shopping_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "shopping_items_delete" ON public.shopping_items FOR DELETE USING (auth.uid() = user_id);

-- 4.7 study_courses
CREATE POLICY "study_courses_select" ON public.study_courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_courses_insert" ON public.study_courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_courses_update" ON public.study_courses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "study_courses_delete" ON public.study_courses FOR DELETE USING (auth.uid() = user_id);

-- 4.8 study_notes
CREATE POLICY "study_notes_select" ON public.study_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_notes_insert" ON public.study_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_notes_update" ON public.study_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "study_notes_delete" ON public.study_notes FOR DELETE USING (auth.uid() = user_id);

-- 4.9 study_deadlines
CREATE POLICY "study_deadlines_select" ON public.study_deadlines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_deadlines_insert" ON public.study_deadlines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_deadlines_update" ON public.study_deadlines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "study_deadlines_delete" ON public.study_deadlines FOR DELETE USING (auth.uid() = user_id);

-- ==============================================================================
-- 5. CONFIGURAÇÃO DO SUPABASE STORAGE (BUCKET 'atelier-media')
-- ==============================================================================

-- 5.1 Criação do Bucket Público com restrições de segurança (caso não exista)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'atelier-media',
    'atelier-media',
    true,
    5242880, -- 5MB máx por arquivo
    ARRAY['image/webp', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/webp', 'image/jpeg', 'image/png'];

-- 5.2 Políticas de Acesso ao Storage (Isolamento por pasta de usuário: {user_id}/*)
CREATE POLICY "atelier_media_public_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'atelier-media');

CREATE POLICY "atelier_media_user_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'atelier-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "atelier_media_user_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'atelier-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
    bucket_id = 'atelier-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "atelier_media_user_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'atelier-media'
    AND (storage.foldername(name))[1] = auth.uid()::text
);
