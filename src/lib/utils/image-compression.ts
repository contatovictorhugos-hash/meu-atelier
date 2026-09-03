import imageCompression from 'browser-image-compression';

/**
 * Browser Image Compression Utility
 * Compresses images to ~150KB WebP with max 1200px dimension
 */
export async function compressImageToWebp(file: File): Promise<Blob> {
  // 1. Primary: browser-image-compression (~150KB WebP)
  try {
    const options = {
      maxSizeMB: 0.15, // ~150KB
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.82,
    };
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch (err) {
    console.warn('[Atelier] Fallback para compressão via Canvas:', err);
  }

  // 2. Secondary Fallback: Canvas API
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas context unavailable'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Erro ao converter imagem'));
            }
          },
          'image/webp',
          0.82
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
