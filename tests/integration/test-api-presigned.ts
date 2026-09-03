import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../../src/app/api/upload/presigned/route.ts';

describe('Integration Tests: Presigned Upload Route Handler', () => {
  test('returns 200 with presigned and public URLs for valid payload', async () => {
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: 'look-outfit-1.webp',
        contentType: 'image/webp',
        module: 'outfits',
      }),
    });

    const response = await POST(fakeRequest);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.ok(data.uploadUrl);
    assert.ok(data.publicUrl);
    assert.match(data.publicUrl, /outfits\/\d+-look-outfit-1\.webp/);
  });

  test('returns 400 Bad Request when filename or contentType is missing', async () => {
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: '',
        contentType: 'image/webp',
      }),
    });

    const response = await POST(fakeRequest);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.match(data.error, /Filename and contentType are required/);
  });

  test('defaults to module general when module is omitted', async () => {
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: 'foto.jpg',
        contentType: 'image/jpeg',
      }),
    });

    const response = await POST(fakeRequest);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.match(data.publicUrl, /general\/\d+-foto\.jpg/);
  });

  test('security: rejects disallowed content types (HTML, SVG, JS) with 400', async () => {
    const dangerousTypes = ['text/html', 'image/svg+xml', 'application/javascript', 'application/x-sh'];

    for (const contentType of dangerousTypes) {
      const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'payload.svg',
          contentType,
          module: 'outfits',
        }),
      });

      const response = await POST(fakeRequest);
      assert.equal(response.status, 400);
      const data = await response.json();
      assert.match(data.error, /Invalid content type/);
    }
  });

  test('security: rejects path traversal attempts in module parameter with 400', async () => {
    const traversalPayloads = ['../../system', '../secrets', 'outfits/../../etc', '..'];

    for (const module of traversalPayloads) {
      const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'photo.webp',
          contentType: 'image/webp',
          module,
        }),
      });

      const response = await POST(fakeRequest);
      assert.equal(response.status, 400);
      const data = await response.json();
      assert.match(data.error, /Invalid module/);
    }
  });

  test('security: sanitizes path traversal in filename parameter', async () => {
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: '../../../../etc/passwd/image.webp',
        contentType: 'image/webp',
        module: 'wardrobe',
      }),
    });

    const response = await POST(fakeRequest);
    assert.equal(response.status, 200);
    const data = await response.json();
    // Directory separators must not be preserved in filename
    assert.doesNotMatch(data.publicUrl, /\.\.\//);
    assert.match(data.publicUrl, /wardrobe\/\d+-image\.webp/);
  });

  test('security: rejects non-string types for filename and contentType with 400', async () => {
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: 12345,
        contentType: true,
      }),
    });

    const response = await POST(fakeRequest);
    assert.equal(response.status, 400);
  });
});
