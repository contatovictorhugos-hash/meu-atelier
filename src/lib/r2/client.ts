/**
 * Cloudflare R2 Client Configuration & Helper (Zero Egress Fees)
 */

export interface PresignedUploadResponse {
  uploadUrl: string;
  publicUrl: string;
}

export async function requestPresignedUpload(
  filename: string,
  contentType: string,
  module: 'wardrobe' | 'outfits' | 'meals' | 'daily' | 'study'
): Promise<PresignedUploadResponse> {
  const response = await fetch('/api/upload/presigned', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, contentType, module }),
  });

  if (!response.ok) {
    throw new Error('Falha ao solicitar URL de upload para Cloudflare R2');
  }

  return response.json();
}
