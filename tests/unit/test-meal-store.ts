import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useMealStore } from '../../src/stores/useMealStore.ts';

describe('Unit Tests: MealStore (Weekly Meals, Sunday Prep & Shopping List)', () => {
  beforeEach(() => {
    useMealStore.setState({
      sundayPrepTasks: [
        { id: 'prep-1', task: 'Assar legumes', completed: false },
        { id: 'prep-2', task: 'Grelhar frango', completed: true },
      ],
      shoppingItems: [
        { id: 'item-1', item_name: 'Cenoura', category: 'Hortifrúti', is_completed: false },
        { id: 'item-2', item_name: 'Iogurte', category: 'Geladeira', is_completed: true },
      ],
    });
  });

  test('toggles Sunday meal prep task completion', () => {
    const store = useMealStore.getState();

    store.togglePrepTask('prep-1');
    assert.equal(useMealStore.getState().sundayPrepTasks.find((t) => t.id === 'prep-1')?.completed, true);

    store.togglePrepTask('prep-1');
    assert.equal(useMealStore.getState().sundayPrepTasks.find((t) => t.id === 'prep-1')?.completed, false);
  });

  test('toggles grocery shopping item completion', () => {
    const store = useMealStore.getState();

    store.toggleShoppingItem('item-1');
    assert.equal(useMealStore.getState().shoppingItems.find((i) => i.id === 'item-1')?.is_completed, true);

    store.toggleShoppingItem('item-1');
    assert.equal(useMealStore.getState().shoppingItems.find((i) => i.id === 'item-1')?.is_completed, false);
  });

  test('adds a new shopping item with category', () => {
    const store = useMealStore.getState();
    const initialCount = store.shoppingItems.length;

    store.addShoppingItem('Aveia em flocos', 'Despensa');
    const updated = useMealStore.getState().shoppingItems;

    assert.equal(updated.length, initialCount + 1);
    const added = updated.find((i) => i.item_name === 'Aveia em flocos');
    assert.ok(added);
    assert.equal(added?.category, 'Despensa');
    assert.equal(added?.is_completed, false);
    assert.match(added?.id || '', /^s_/);
  });

  test('deletes a shopping item by id', () => {
    const store = useMealStore.getState();
    store.deleteShoppingItem('item-1');

    const remaining = useMealStore.getState().shoppingItems;
    assert.equal(remaining.length, 1);
    assert.equal(remaining.find((i) => i.id === 'item-1'), undefined);
  });
});
