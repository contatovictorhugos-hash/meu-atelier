import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { uploadMediaToSupabase } from '../../src/lib/supabase/storage.ts';

describe('Unit Tests: Supabase Storage Integration', () => {
  test('uploadMediaToSupabase returns a permanent HTTPS URL without base64', async () => {
    const dummyBlob = new Blob(['dummy image data'], { type: 'image/webp' });
    const url = await uploadMediaToSupabase({
      file: dummyBlob,
      userId: 'test-user-uuid',
      folder: 'looks',
    });

    assert.ok(url.startsWith('https://'), 'URL must be permanent HTTPS');
    assert.ok(!url.startsWith('data:'), 'URL must NEVER be a base64 data URL');
    assert.match(url, /test-user-uuid\/looks\/\d+\.webp/);
  });

  test('uploadMediaToSupabase correctly partitions folders per module', async () => {
    const dummyBlob = new Blob(['dummy wardrobe data'], { type: 'image/webp' });
    const wardrobeUrl = await uploadMediaToSupabase({
      file: dummyBlob,
      userId: 'user-123',
      folder: 'wardrobe',
    });
    assert.match(wardrobeUrl, /user-123\/wardrobe\/\d+\.webp/);

    const mealUrl = await uploadMediaToSupabase({
      file: dummyBlob,
      userId: 'user-123',
      folder: 'meals',
    });
    assert.match(mealUrl, /user-123\/meals\/\d+\.webp/);

    const studyUrl = await uploadMediaToSupabase({
      file: dummyBlob,
      userId: 'user-123',
      folder: 'study',
    });
    assert.match(studyUrl, /user-123\/study\/\d+\.webp/);
  });
});
