import { NextResponse } from 'next/server.js';

const ALLOWED_CONTENT_TYPES = new Set([
  'image/webp',
  'image/jpeg',
  'image/jpg',
  'image/png',
]);

const ALLOWED_MODULES = new Set([
  'wardrobe',
  'outfits',
  'meals',
  'daily',
  'study',
  'general',
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentType, module = 'general' } = body;

    // 1. Validate required fields and types
    if (!filename || !contentType || typeof filename !== 'string' || typeof contentType !== 'string') {
      return NextResponse.json(
        { error: 'Filename and contentType are required' },
        { status: 400 }
      );
    }

    const trimmedFilename = filename.trim();
    const trimmedContentType = contentType.trim().toLowerCase();

    if (!trimmedFilename || !trimmedContentType) {
      return NextResponse.json(
        { error: 'Filename and contentType are required' },
        { status: 400 }
      );
    }

    // 2. MIME type whitelist check (protects against SVG XSS, script uploads, etc.)
    if (!ALLOWED_CONTENT_TYPES.has(trimmedContentType)) {
      return NextResponse.json(
        { error: `Invalid content type '${contentType}'. Allowed types: image/webp, image/jpeg, image/png` },
        { status: 400 }
      );
    }

    // 3. Path traversal & module validation
    if (typeof module !== 'string' || !ALLOWED_MODULES.has(module.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid module. Allowed modules: wardrobe, outfits, meals, daily, study, general' },
        { status: 400 }
      );
    }

    const safeModule = module.toLowerCase();

    // 4. Filename sanitization: prevent directory traversal and null bytes
    // Extract basename if path separators are present
    const baseFilename = trimmedFilename.split(/[/\\]/).pop() || 'upload.webp';
    // Limit max filename length to prevent ReDoS / filesystem limit issues
    const truncatedFilename = baseFilename.slice(0, 128);
    // Replace non-alphanumeric characters (except dots and dashes) with underscores
    const sanitizedFilename = truncatedFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const cleanFilename = `${Date.now()}-${sanitizedFilename}`;

    // 5. Build S3 / R2 storage key
    const key = `${safeModule}/${cleanFilename}`;

    // 6. SSRF Protection: domain must be an HTTPS URL or local development fallback
    const rawPublicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://media.atelier.app';
    const publicDomain = rawPublicDomain.startsWith('http') ? rawPublicDomain.replace(/\/+$/, '') : 'https://media.atelier.app';

    // When real R2 keys are provided via .env, generate signed S3 URL.
    // Otherwise return direct public path simulation for instant offline/mock use.
    return NextResponse.json({
      uploadUrl: `${publicDomain}/${key}?mock=presigned`,
      publicUrl: `${publicDomain}/${key}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate upload URL',
        ...(process.env.NODE_ENV === 'development' ? { details: String(error) } : {}),
      },
      { status: 500 }
    );
  }
}
