import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { useDailyGlowStore } from '../../src/stores/useDailyGlowStore.ts';
import { useClosetStore } from '../../src/stores/useClosetStore.ts';
import { useLegalStore } from '../../src/stores/useLegalStore.ts';
import { useMealStore } from '../../src/stores/useMealStore.ts';
import { formatDate, cn } from '../../src/lib/utils/utils.ts';
import { POST } from '../../src/app/api/upload/presigned/route.ts';

describe('White-Box Tests: Statement, Branch & Decision Paths', () => {
  test('Branch Coverage in formatDate: all 4 branches', () => {
    // Branch 1: falsy or non-string input
    assert.equal(formatDate(''), '');
    // @ts-expect-error testing invalid type input branch
    assert.equal(formatDate(null), '');

    // Branch 2: valid 3 parts format
    assert.equal(formatDate('2026-09-02'), '02/09/2026');

    // Branch 3: partial or non-conforming string
    assert.equal(formatDate('2026-09'), '2026-09');
    assert.equal(formatDate('random-string-without-numbers'), 'random-string-without-numbers');
  });

  test('Branch Coverage in cn: empty and conflict branches', () => {
    // Branch: empty inputs
    assert.equal(cn(), '');
    // Branch: multiple conflicts
    assert.equal(cn('text-red-500', 'text-blue-500'), 'text-blue-500');
  });

  test('Branch Coverage in useDailyGlowStore.resetDailyIfNewDay', () => {
    const store = useDailyGlowStore.getState();
    const today = new Date().toISOString().split('T')[0];

    // Branch 1: todayDate matches current date -> does NOT reset
    useDailyGlowStore.setState({ todayDate: today, waterCups: 5 });
    store.resetDailyIfNewDay();
    assert.equal(useDailyGlowStore.getState().waterCups, 5);

    // Branch 2: todayDate is different -> DOES reset
    useDailyGlowStore.setState({ todayDate: '2020-01-01', waterCups: 5 });
    store.resetDailyIfNewDay();
    assert.equal(useDailyGlowStore.getState().waterCups, 0);
    assert.equal(useDailyGlowStore.getState().todayDate, today);
  });

  test('Branch Coverage in useClosetStore.attachSelfieToOutfit', () => {
    const store = useClosetStore.getState();
    useClosetStore.setState({
      outfits: [
        { id: 'o-target', title: 'Target', occasion: 'Trabalho', created_at: '2026-09-02' },
        { id: 'o-other', title: 'Other', occasion: 'Casual', created_at: '2026-09-02' },
      ],
    });

    // Branch match (o.id === outfitId) vs branch non-match (o.id !== outfitId)
    store.attachSelfieToOutfit('o-target', 'https://example.com/target-selfie.jpg');

    const target = useClosetStore.getState().outfits.find((o) => o.id === 'o-target');
    const other = useClosetStore.getState().outfits.find((o) => o.id === 'o-other');

    assert.equal(target?.photo_url, 'https://example.com/target-selfie.jpg');
    assert.equal(other?.photo_url, undefined);
  });

  test('Branch Coverage in presigned Route Handler regex filename sanitization', async () => {
    // Verify special characters in filename get sanitized by regex [^a-zA-Z0-9.-] -> _
    const fakeRequest = new Request('http://localhost:3000/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: 'foto com espaços & símbolos!#$.jpg',
        contentType: 'image/jpeg',
      }),
    });

    const response = await POST(fakeRequest);
    const data = await response.json();

    assert.doesNotMatch(data.publicUrl, /[\s&!#$]/);
    assert.match(data.publicUrl, /foto_com_espa_os___s_mbolos___\.jpg/);
  });

  test('Branch Coverage in useLegalStore: deleteCourse activeCourseId and updateCourseProgress clamping', () => {
    useLegalStore.setState({
      courses: [
        { id: 'c-branch-1', name: 'Course 1', color_accent: '#fff', progress_percentage: 10 },
        { id: 'c-branch-2', name: 'Course 2', color_accent: '#fff', progress_percentage: 20 },
      ],
      activeCourseId: 'c-branch-1',
    });

    const store = useLegalStore.getState();

    // Branch: delete matching active course -> resets to 'all'
    store.deleteCourse('c-branch-1');
    assert.equal(useLegalStore.getState().activeCourseId, 'all');

    // Branch: delete non-matching active course -> preserves activeCourseId
    useLegalStore.setState({ activeCourseId: 'c-branch-2' });
    store.deleteCourse('non-existent');
    assert.equal(useLegalStore.getState().activeCourseId, 'c-branch-2');

    // Branch clamping in updateCourseProgress: < 0, > 100, and valid
    store.updateCourseProgress('c-branch-2', -50);
    assert.equal(useLegalStore.getState().courses.find((c) => c.id === 'c-branch-2')?.progress_percentage, 0);

    store.updateCourseProgress('c-branch-2', 150);
    assert.equal(useLegalStore.getState().courses.find((c) => c.id === 'c-branch-2')?.progress_percentage, 100);

    store.updateCourseProgress('c-branch-2', 65);
    assert.equal(useLegalStore.getState().courses.find((c) => c.id === 'c-branch-2')?.progress_percentage, 65);
  });

  test('Branch Coverage in useMealStore.saveMeal: id match, day/type match, and new meal insertion', () => {
    useMealStore.setState({
      weeklyMeals: [
        {
          id: 'meal-branch-1',
          day_of_week: 1,
          meal_type: 'Almoço',
          title: 'Existing Monday Lunch',
          ingredients: ['Ing 1'],
        },
      ],
    });

    const store = useMealStore.getState();

    // Branch 1: Match by ID explicitly
    store.saveMeal({
      id: 'meal-branch-1',
      day_of_week: 1,
      meal_type: 'Almoço',
      title: 'Updated Monday Lunch by ID',
      ingredients: ['Ing 1 Updated'],
    });
    assert.equal(useMealStore.getState().weeklyMeals.length, 1);
    assert.equal(useMealStore.getState().weeklyMeals[0].title, 'Updated Monday Lunch by ID');

    // Branch 2: Match by day_of_week + meal_type (without ID or different ID)
    store.saveMeal({
      day_of_week: 1,
      meal_type: 'Almoço',
      title: 'Updated Monday Lunch by Slot',
      ingredients: ['Ing 1 Slot'],
    });
    assert.equal(useMealStore.getState().weeklyMeals.length, 1);
    assert.equal(useMealStore.getState().weeklyMeals[0].id, 'meal-branch-1');
    assert.equal(useMealStore.getState().weeklyMeals[0].title, 'Updated Monday Lunch by Slot');

    // Branch 3: No match on ID or day/type -> creates new meal with generated temp ID
    store.saveMeal({
      day_of_week: 2,
      meal_type: 'Jantar',
      title: 'New Tuesday Dinner',
      ingredients: ['Ing 2'],
    });
    assert.equal(useMealStore.getState().weeklyMeals.length, 2);
    const newMeal = useMealStore.getState().weeklyMeals.find((m) => m.day_of_week === 2);
    assert.ok(newMeal);
    assert.match(newMeal.id, /^m_/);
  });
});
