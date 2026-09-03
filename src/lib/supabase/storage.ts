import { createClient } from './client.ts';

export interface UploadMediaOptions {
  file: Blob | File;
  userId?: string;
  folder?: 'looks' | 'wardrobe' | 'meals' | 'daily' | 'study';
}

/**
 * Uploads a compressed binary image blob directly to the public 'atelier-media' Supabase Storage bucket.
 * The file is placed in ${userId}/${folder}/${timestamp}.webp.
 * Returns the permanent public HTTPS URL.
 * NEVER returns base64.
 */
export async function uploadMediaToSupabase({
  file,
  userId,
  folder = 'looks',
}: UploadMediaOptions): Promise<string> {
  const supabase = createClient();

  // 1. Resolve User ID
  let activeUserId = userId;
  if (!activeUserId) {
    const { data: userData } = await supabase.auth.getUser();
    activeUserId = userData.user?.id;
  }

  // Fallback identifier if not authenticated in offline/dev mode
  const effectiveUserId = activeUserId || 'anonymous';
  const timestamp = Date.now();
  const filePath = `${effectiveUserId}/${folder}/${timestamp}.webp`;

  // 2. Check if using placeholder credentials
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isPlaceholder =
    !url ||
    url.includes('placeholder.supabase.co') ||
    url.includes('sua_url_aqui');

  if (isPlaceholder) {
    console.warn(
      '[Atelier Storage] Utilizando chaves mock/placeholder do Supabase. Configure .env.local para uploads reais.'
    );
    // In mock mode, return an aesthetic placeholder image so tests and UI previews never break or use base64
    return `https://media.atelier.app/${filePath}`;
  }

  // 3. Upload binary WebP directly to Supabase Storage
  const { data, error } = await supabase.storage
    .from('atelier-media')
    .upload(filePath, file, {
      contentType: 'image/webp',
      cacheControl: '31536000', // 1 year cache
      upsert: false,
    });

  if (error) {
    console.error('[Atelier Storage] Erro no upload Supabase Storage:', error);
    throw new Error(`Falha no upload para o Supabase Storage: ${error.message}`);
  }

  // 4. Retrieve permanent public URL
  const { data: publicUrlData } = supabase.storage
    .from('atelier-media')
    .getPublicUrl(data.path);

  if (!publicUrlData.publicUrl) {
    throw new Error('Não foi possível obter a URL pública permanente do arquivo enviado.');
  }

  return publicUrlData.publicUrl;
}
