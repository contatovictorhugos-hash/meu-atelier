import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  fetchUserDailyGlow,
  saveUserDailyGlow,
  fetchUserWardrobe,
  insertUserWardrobe,
  fetchUserMeals,
  fetchUserCourses,
} from '../../src/lib/supabase/sync.ts';

describe('Unit Tests: Supabase Sync Layer (Offline / Graceful Degradation)', () => {
  test('fetchUserDailyGlow returns null gracefully in mock/offline mode', async () => {
    const result = await fetchUserDailyGlow('2026-09-03');
    assert.equal(result, null);
  });

  test('saveUserDailyGlow executes without throwing unhandled rejection', async () => {
    await assert.doesNotReject(async () => {
      await saveUserDailyGlow({
        log_date: '2026-09-03',
        water_cups: 4,
        morning_habits_completed: ['cleanser', 'vitc'],
        evening_habits_completed: ['reading'],
        daily_photo_url: 'https://example.com/photo.webp',
        daily_mood_quote: 'Dia sereno 🌸',
      });
    });
  });

  test('fetchUserWardrobe and insertUserWardrobe handle mock mode safely', async () => {
    const items = await fetchUserWardrobe();
    assert.equal(items, null);

    const insertedId = await insertUserWardrobe({
      category: 'top',
      image_url: 'https://example.com/top.webp',
      tags: ['Trabalho'],
    });
    assert.equal(insertedId, null);
  });

  test('fetchUserMeals and fetchUserCourses return null in placeholder mode', async () => {
    const meals = await fetchUserMeals();
    assert.equal(meals, null);

    const courses = await fetchUserCourses();
    assert.equal(courses, null);
  });
});
