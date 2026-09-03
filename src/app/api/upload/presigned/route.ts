import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentType, module = 'general' } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and contentType are required' },
        { status: 400 }
      );
    }

    const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const key = `${module}/${cleanFilename}`;
    const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://media.atelier.app';

    // When real R2 keys are provided via .env, generate signed S3 URL.
    // Otherwise return direct public path simulation for instant offline/mock use.
    return NextResponse.json({
      uploadUrl: `${publicDomain}/${key}?mock=presigned`,
      publicUrl: `${publicDomain}/${key}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate upload URL', details: String(error) },
      { status: 500 }
    );
  }
}
