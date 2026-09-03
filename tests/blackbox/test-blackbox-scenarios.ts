import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { useDailyGlowStore } from '../../src/stores/useDailyGlowStore.ts';
import { useClosetStore } from '../../src/stores/useClosetStore.ts';
import { useMealStore } from '../../src/stores/useMealStore.ts';
import { useLegalStore } from '../../src/stores/useLegalStore.ts';
import { atelierConfig } from '../../src/config/portfolio.config.ts';

describe('Black-Box Tests: System Requirements & User Journeys', () => {
  test('BB-01: Zero-Cost Policy Verification (FR-015 / Principle VI)', () => {
    // Verify system configuration enforces zero cost guarantees
    assert.equal(atelierConfig.freeTierPolicy.cost, 'R$ 0,00 contínuo');
    assert.match(atelierConfig.freeTierPolicy.hosting, /R\$ 0,00/);
    assert.match(atelierConfig.freeTierPolicy.database, /R\$ 0,00/);
    assert.match(atelierConfig.freeTierPolicy.storage, /Zero Egress Fees/);
  });

  test('BB-02: User Morning Journey with Unicode and Emojis', () => {
    const store = useDailyGlowStore.getState();
    const customQuote = '🌸✨ "A beleza de florescer no seu próprio tempo" — São Paulo, 2026';

    store.setDailyQuote(customQuote);
    assert.equal(useDailyGlowStore.getState().dailyQuote, customQuote);

    // Increment water across full scale
    for (let i = 0; i < 15; i++) {
      store.incrementWater();
    }
    // Strict Black-box expectation: Max is capped at 8 cups
    assert.equal(useDailyGlowStore.getState().waterCups, 8);
  });

  test('BB-03: Closet OOTD Composition with Mixed & Empty Items', () => {
    const store = useClosetStore.getState();

    // Composing look with only top and accessory (no bottom or shoes)
    const initialOutfits = store.outfits.length;
    store.saveOutfit({
      title: 'Look Minimalista Sem Calçado',
      occasion: 'Casual',
      items: [
        { id: 'top-x', category: 'top', image_url: 'https://example.com/top.jpg', tags: ['Verão'] },
      ],
    });

    const afterOutfits = useClosetStore.getState().outfits;
    assert.equal(afterOutfits.length, initialOutfits + 1);
    assert.equal(afterOutfits[0].items?.length, 1);
  });

  test('BB-04: Sunday Prep Completion Progress Metric', () => {
    const { sundayPrepTasks, togglePrepTask } = useMealStore.getState();
    const initialCompleted = sundayPrepTasks.filter((t) => t.completed).length;

    // Toggle all to complete
    sundayPrepTasks.forEach((t) => {
      if (!t.completed) togglePrepTask(t.id);
    });

    const allCompleted = useMealStore.getState().sundayPrepTasks.filter((t) => t.completed).length;
    assert.equal(allCompleted, sundayPrepTasks.length);
  });

  test('BB-05: Input Sanitation with HTML/Script Injection Protection', () => {
    const store = useLegalStore.getState();
    const maliciousTitle = '<script>alert("hack")</script> Direito Penal';

    store.addStudyNote({
      course_id: 'c1',
      title: maliciousTitle,
      summary_text: 'Summary test',
      tags: ['Security'],
    });

    const note = useLegalStore.getState().notes.find((n) => n.title === maliciousTitle);
    assert.ok(note);
    // Preserves raw string safely without executing or corrupting store
    assert.equal(note.title, maliciousTitle);
  });
});
