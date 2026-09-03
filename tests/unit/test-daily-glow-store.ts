import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useDailyGlowStore } from '../../src/stores/useDailyGlowStore.ts';

describe('Unit Tests: DailyGlowStore (Habits, Hydration & Mood)', () => {
  beforeEach(() => {
    // Reset store state
    useDailyGlowStore.setState({
      waterCups: 0,
      waterGoal: 8,
      dailyPhotoUrl: 'https://example.com/initial.jpg',
      dailyQuote: 'Initial Quote',
      todayDate: '2026-09-02',
    });
  });

  test('increments hydration water cups correctly within goal', () => {
    const store = useDailyGlowStore.getState();
    assert.equal(store.waterCups, 0);

    store.incrementWater();
    assert.equal(useDailyGlowStore.getState().waterCups, 1);

    store.incrementWater();
    assert.equal(useDailyGlowStore.getState().waterCups, 2);
  });

  test('does not increment water beyond the waterGoal boundary', () => {
    useDailyGlowStore.setState({ waterCups: 8, waterGoal: 8 });
    const store = useDailyGlowStore.getState();

    store.incrementWater();
    assert.equal(useDailyGlowStore.getState().waterCups, 8);
  });

  test('does not decrement water below zero', () => {
    useDailyGlowStore.setState({ waterCups: 0 });
    const store = useDailyGlowStore.getState();

    store.decrementWater();
    assert.equal(useDailyGlowStore.getState().waterCups, 0);
  });

  test('toggles morning habits on and off', () => {
    const store = useDailyGlowStore.getState();
    const habitId = 'cleanser';

    const before = store.morningHabits.find((h) => h.id === habitId);
    assert.equal(before?.completed, false);

    store.toggleMorningHabit(habitId);
    const afterFirstToggle = useDailyGlowStore.getState().morningHabits.find((h) => h.id === habitId);
    assert.equal(afterFirstToggle?.completed, true);

    store.toggleMorningHabit(habitId);
    const afterSecondToggle = useDailyGlowStore.getState().morningHabits.find((h) => h.id === habitId);
    assert.equal(afterSecondToggle?.completed, false);
  });

  test('toggles evening habits on and off', () => {
    const store = useDailyGlowStore.getState();
    const habitId = 'reading';

    store.toggleEveningHabit(habitId);
    const after = useDailyGlowStore.getState().eveningHabits.find((h) => h.id === habitId);
    assert.equal(after?.completed, true);
  });

  test('updates daily photo URL and quote', () => {
    const store = useDailyGlowStore.getState();

    store.setDailyPhotoUrl('https://example.com/new-polaroid.webp');
    assert.equal(useDailyGlowStore.getState().dailyPhotoUrl, 'https://example.com/new-polaroid.webp');

    store.setDailyQuote('Dias floridos e mente em paz. 🌸');
    assert.equal(useDailyGlowStore.getState().dailyQuote, 'Dias floridos e mente em paz. 🌸');
  });

  test('resetDailyIfNewDay resets water and habits when date rolls over', () => {
    useDailyGlowStore.setState({
      todayDate: '2026-09-01', // Yesterday
      waterCups: 6,
    });

    const store = useDailyGlowStore.getState();
    store.resetDailyIfNewDay();

    const todayStr = new Date().toISOString().split('T')[0];
    const updated = useDailyGlowStore.getState();
    assert.equal(updated.todayDate, todayStr);
    assert.equal(updated.waterCups, 0);
  });
});
