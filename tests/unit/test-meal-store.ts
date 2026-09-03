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

  test('saves a new meal plan item and updates an existing one', () => {
    const store = useMealStore.getState();
    store.saveMeal({
      day_of_week: 1,
      meal_type: 'Almoço',
      title: 'Salada Caesar com Frango',
      ingredients: ['Frango', 'Alface', 'Molho'],
    });

    const meals = useMealStore.getState().weeklyMeals;
    const mondayLunch = meals.find((m) => m.day_of_week === 1 && m.meal_type === 'Almoço');
    assert.ok(mondayLunch);
    assert.equal(mondayLunch.title, 'Salada Caesar com Frango');

    // Update the same slot
    store.saveMeal({
      id: mondayLunch.id,
      day_of_week: 1,
      meal_type: 'Almoço',
      title: 'Poke Bowl de Salmão',
      ingredients: ['Salmão', 'Arroz', 'Manga'],
    });

    const updatedMeals = useMealStore.getState().weeklyMeals;
    const updatedSlot = updatedMeals.find((m) => m.id === mondayLunch.id);
    assert.equal(updatedSlot?.title, 'Poke Bowl de Salmão');
  });

  test('deletes a meal plan item by id', () => {
    const store = useMealStore.getState();
    const firstMeal = store.weeklyMeals[0];
    assert.ok(firstMeal);

    store.deleteMeal(firstMeal.id);
    const remaining = useMealStore.getState().weeklyMeals.find((m) => m.id === firstMeal.id);
    assert.equal(remaining, undefined);
  });

  test('adds and deletes a Sunday prep task', () => {
    const store = useMealStore.getState();
    store.addPrepTask('Higienizar morangos e uvas');

    const tasks = useMealStore.getState().sundayPrepTasks;
    const added = tasks.find((t) => t.task === 'Higienizar morangos e uvas');
    assert.ok(added);
    assert.equal(added.completed, false);
    assert.match(added.id, /^pt_/);

    store.deletePrepTask(added.id);
    assert.equal(useMealStore.getState().sundayPrepTasks.find((t) => t.id === added.id), undefined);
  });

  test('clears completed shopping items in batch', () => {
    const store = useMealStore.getState();
    assert.equal(store.shoppingItems.filter((i) => i.is_completed).length, 1);

    store.clearCompletedShoppingItems();
    const remaining = useMealStore.getState().shoppingItems;
    assert.equal(remaining.every((i) => !i.is_completed), true);
  });
});
