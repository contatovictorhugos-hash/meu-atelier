import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { useDailyGlowStore } from '../../src/stores/useDailyGlowStore.ts';
import { useClosetStore } from '../../src/stores/useClosetStore.ts';
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
});
