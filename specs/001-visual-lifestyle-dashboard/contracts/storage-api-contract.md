# Storage & Media API Contract

## 1. POST `/api/upload/presigned`

Generates a direct pre-signed PUT URL for uploading optimized images directly from the browser to Cloudflare R2 / Supabase Storage without burdening the serverless function memory.

### Request

```json
{
  "filename": "ootd-20260902-1200.webp",
  "contentType": "image/webp",
  "module": "wardrobe" // "wardrobe" | "outfits" | "meals" | "daily" | "study"
}
```

### Response (200 OK)

```json
{
  "uploadUrl": "https://<account-id>.r2.cloudflarestorage.com/atelier-media/wardrobe/ootd-20260902-1200.webp?X-Amz-Signature=...",
  "publicUrl": "https://media.atelier.app/wardrobe/ootd-20260902-1200.webp"
}
```

### Error Responses
- `400 Bad Request`: Invalid content type (only `image/webp`, `image/jpeg`, `image/png` allowed).
- `401 Unauthorized`: Missing or invalid user session.
- `413 Payload Too Large`: Original file exceeds 15 MB limit prior to client compression.

---

## 2. Client-Side Image Pre-Processing Contract

Before invoking the upload contract, the client MUST execute compression:
- Max dimension: `1200px` (width or height).
- Format: `image/webp` (fallback: `image/jpeg` with quality `0.82`).
- Max payload size target: `< 350 KB`.
- Aspect ratio preservation: Mandatory.
