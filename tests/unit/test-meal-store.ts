import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useMealStore } from '../../src/stores/useMealStore.ts';

describe('Unit Tests: MealStore (Weekly Meals, Sunday Prep & Shopping List)', () => {
  beforeEach(() => {
    useMealStore.setState({
      weeklyMeals: [
        {
          id: 'm1',
          day_of_week: 1,
          meal_type: 'Almoço',
          title: 'Bowl de Frango Grelhado com Legumes e Quinoa',
          ingredients: ['Peito de frango', 'Abobrinha', 'Quinoa', 'Cenoura'],
        },
        {
          id: 'm2',
          day_of_week: 2,
          meal_type: 'Almoço',
          title: 'Salmão Grelhado com Aspargos e Purê de Mandioquinha',
          ingredients: ['Salmão', 'Aspargos', 'Mandioquinha'],
        },
      ],
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

  test('updates an existing Sunday prep task description', () => {
    const store = useMealStore.getState();
    store.updatePrepTask('prep-1', 'Assar abóbora e legumes por 25min');

    const updated = useMealStore.getState().sundayPrepTasks.find((t) => t.id === 'prep-1');
    assert.equal(updated?.task, 'Assar abóbora e legumes por 25min');
    assert.equal(updated?.completed, false); // retains status
  });

  test('updates an existing shopping item name and category', () => {
    const store = useMealStore.getState();
    store.updateShoppingItem('item-1', {
      item_name: 'Cenoura Orgânica Ralada',
      category: 'Geladeira',
    });

    const updated = useMealStore.getState().shoppingItems.find((i) => i.id === 'item-1');
    assert.equal(updated?.item_name, 'Cenoura Orgânica Ralada');
    assert.equal(updated?.category, 'Geladeira');
  });

  test('clears completed shopping items in batch', () => {
    const store = useMealStore.getState();
    assert.equal(store.shoppingItems.filter((i) => i.is_completed).length, 1);

    store.clearCompletedShoppingItems();
    const remaining = useMealStore.getState().shoppingItems;
    assert.equal(remaining.every((i) => !i.is_completed), true);
  });

  test('partially updates a shopping item preserving untouched fields', () => {
    const store = useMealStore.getState();

    // Partial update 1: only item_name
    store.updateShoppingItem('item-1', {
      item_name: 'Cenoura Baby Orgânica',
    });

    let item = useMealStore.getState().shoppingItems.find((i) => i.id === 'item-1');
    assert.equal(item?.item_name, 'Cenoura Baby Orgânica');
    assert.equal(item?.category, 'Hortifrúti'); // preserved
    assert.equal(item?.is_completed, false); // preserved

    // Partial update 2: only category
    store.updateShoppingItem('item-1', {
      category: 'Geladeira',
    });

    item = useMealStore.getState().shoppingItems.find((i) => i.id === 'item-1');
    assert.equal(item?.category, 'Geladeira');
    assert.equal(item?.item_name, 'Cenoura Baby Orgânica'); // preserved
    assert.equal(item?.is_completed, false); // preserved
  });

  test('gracefully handles operations on non-existent prep tasks, shopping items, and meals', () => {
    const store = useMealStore.getState();
    const initialPrepTasks = [...store.sundayPrepTasks];
    const initialShoppingItems = [...store.shoppingItems];
    const initialMeals = [...store.weeklyMeals];

    // Non-existent prep task
    assert.doesNotThrow(() => {
      store.togglePrepTask('prep-ghost');
      store.updatePrepTask('prep-ghost', 'Tarefa Inexistente');
      store.deletePrepTask('prep-ghost');
    });
    assert.deepEqual(useMealStore.getState().sundayPrepTasks, initialPrepTasks);

    // Non-existent shopping item
    assert.doesNotThrow(() => {
      store.toggleShoppingItem('item-ghost');
      store.updateShoppingItem('item-ghost', { item_name: 'Item Fantasma' });
      store.deleteShoppingItem('item-ghost');
    });
    assert.deepEqual(useMealStore.getState().shoppingItems, initialShoppingItems);

    // Non-existent meal
    assert.doesNotThrow(() => {
      store.deleteMeal('meal-ghost');
    });
    assert.deepEqual(useMealStore.getState().weeklyMeals, initialMeals);
  });

  test('maintains strict integrity of remaining prep tasks and shopping items during modifications', () => {
    const store = useMealStore.getState();

    // Verify initial items
    const originalItem2 = { ...store.shoppingItems.find((i) => i.id === 'item-2')! };
    const originalPrep2 = { ...store.sundayPrepTasks.find((t) => t.id === 'prep-2')! };

    // Update item-1
    store.updateShoppingItem('item-1', { item_name: 'Cenouras Roxas' });
    assert.deepEqual(
      useMealStore.getState().shoppingItems.find((i) => i.id === 'item-2'),
      originalItem2
    );

    // Delete item-1
    store.deleteShoppingItem('item-1');
    const remainingItems = useMealStore.getState().shoppingItems;
    assert.equal(remainingItems.length, 1);
    assert.deepEqual(remainingItems[0], originalItem2);

    // Update prep-1
    store.updatePrepTask('prep-1', 'Cozinhar feijão preto');
    assert.deepEqual(
      useMealStore.getState().sundayPrepTasks.find((t) => t.id === 'prep-2'),
      originalPrep2
    );

    // Toggle prep-1
    store.togglePrepTask('prep-1');
    assert.deepEqual(
      useMealStore.getState().sundayPrepTasks.find((t) => t.id === 'prep-2'),
      originalPrep2
    );

    // Delete prep-1
    store.deletePrepTask('prep-1');
    const remainingTasks = useMealStore.getState().sundayPrepTasks;
    assert.equal(remainingTasks.length, 1);
    assert.deepEqual(remainingTasks[0], originalPrep2);
  });

  test('saveMeal matches and updates existing slot by day_of_week and meal_type without duplicate entries', () => {
    const store = useMealStore.getState();
    const initialMealCount = store.weeklyMeals.length;

    // First meal in defaults is Monday Lunch (id: 'm1', day_of_week: 1, meal_type: 'Almoço')
    const mondayMeal = store.weeklyMeals.find((m) => m.day_of_week === 1 && m.meal_type === 'Almoço');
    assert.ok(mondayMeal);
    const originalId = mondayMeal.id;

    // Save meal for Monday Lunch WITHOUT passing id
    store.saveMeal({
      day_of_week: 1,
      meal_type: 'Almoço',
      title: 'Bowl Detox de Verão',
      ingredients: ['Mix de folhas', 'Grão de bico'],
    });

    const mealsAfter = useMealStore.getState().weeklyMeals;
    assert.equal(mealsAfter.length, initialMealCount); // No duplicate created
    const updatedSlot = mealsAfter.find((m) => m.day_of_week === 1 && m.meal_type === 'Almoço');
    assert.ok(updatedSlot);
    assert.equal(updatedSlot.id, originalId); // Retained original ID
    assert.equal(updatedSlot.title, 'Bowl Detox de Verão');
    assert.deepEqual(updatedSlot.ingredients, ['Mix de folhas', 'Grão de bico']);
  });
});

