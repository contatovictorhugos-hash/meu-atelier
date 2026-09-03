import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useClosetStore } from '../../src/stores/useClosetStore.ts';

describe('Unit Tests: ClosetStore (Wardrobe, Outfits & OOTD)', () => {
  beforeEach(() => {
    useClosetStore.setState({
      wardrobeItems: [
        { id: 'item-1', category: 'top', image_url: 'https://example.com/top1.jpg', tags: ['Trabalho'] },
        { id: 'item-2', category: 'bottom', image_url: 'https://example.com/bot1.jpg', tags: ['Trabalho'] },
      ],
      outfits: [],
      selectedCategory: 'all',
    });
  });

  test('filters wardrobe items by category', () => {
    const store = useClosetStore.getState();
    assert.equal(store.selectedCategory, 'all');

    store.setSelectedCategory('top');
    assert.equal(useClosetStore.getState().selectedCategory, 'top');
  });

  test('adds a new wardrobe item with auto-generated id', () => {
    const store = useClosetStore.getState();
    const initialCount = store.wardrobeItems.length;

    store.addWardrobeItem({
      category: 'shoes',
      image_url: 'https://example.com/loafer.jpg',
      tags: ['Trabalho', 'Couro'],
    });

    const updated = useClosetStore.getState().wardrobeItems;
    assert.equal(updated.length, initialCount + 1);
    assert.equal(updated[0].category, 'shoes');
    assert.equal(updated[0].image_url, 'https://example.com/loafer.jpg');
    assert.match(updated[0].id, /^w_/);
  });

  test('deletes a wardrobe item by id', () => {
    const store = useClosetStore.getState();
    store.deleteWardrobeItem('item-1');

    const remaining = useClosetStore.getState().wardrobeItems;
    assert.equal(remaining.length, 1);
    assert.equal(remaining.find((i) => i.id === 'item-1'), undefined);
  });

  test('saves a new outfit and stores it in outfit history', () => {
    const store = useClosetStore.getState();
    const items = store.wardrobeItems;

    store.saveOutfit({
      title: 'Look Reunião Executiva',
      occasion: 'Trabalho',
      items,
    });

    const outfits = useClosetStore.getState().outfits;
    assert.equal(outfits.length, 1);
    assert.equal(outfits[0].title, 'Look Reunião Executiva');
    assert.equal(outfits[0].occasion, 'Trabalho');
    assert.equal(outfits[0].items?.length, 2);
    assert.match(outfits[0].id, /^o_/);
  });

  test('attaches a selfie photo to an existing outfit', () => {
    const store = useClosetStore.getState();
    store.saveOutfit({
      title: 'Look Casual Sexta',
      occasion: 'Casual',
      items: [],
    });

    const outfitId = useClosetStore.getState().outfits[0].id;
    store.attachSelfieToOutfit(outfitId, 'https://example.com/selfie.jpg');

    const updatedOutfit = useClosetStore.getState().outfits.find((o) => o.id === outfitId);
    assert.equal(updatedOutfit?.photo_url, 'https://example.com/selfie.jpg');
  });

  test('deletes an outfit by id', () => {
    const store = useClosetStore.getState();
    store.saveOutfit({
      title: 'Look Deletar',
      occasion: 'Casual',
      items: [],
    });

    const outfitId = useClosetStore.getState().outfits[0].id;
    assert.ok(outfitId);

    store.deleteOutfit(outfitId);
    const remaining = useClosetStore.getState().outfits.find((o) => o.id === outfitId);
    assert.equal(remaining, undefined);
  });
});
