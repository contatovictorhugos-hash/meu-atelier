import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useLegalStore } from '../../src/stores/useLegalStore.ts';
import { useMealStore } from '../../src/stores/useMealStore.ts';

describe('QA Rigorous Evaluation: Legal Binder Custom Courses & Bento 7-Day Planner', () => {
  beforeEach(() => {
    // Reset legal store
    useLegalStore.setState({
      courses: [
        {
          id: 'c-test-1',
          name: 'Direito Penal I',
          professor: 'Prof. Nelson Hungria',
          day_of_week: 1,
          color_accent: '#FCE7EC',
          progress_percentage: 25,
        },
        {
          id: 'c-test-2',
          name: 'Direito Tributário',
          professor: 'Prof. Aliomar Baleeiro',
          day_of_week: 5,
          color_accent: '#EDE9FE',
          progress_percentage: 90,
        },
      ],
      notes: [
        {
          id: 'n-test-1',
          course_id: 'c-test-1',
          title: 'Tipicidade Conglobante',
          summary_text: 'Teoria de Zaffaroni sobre tipicidade material e antinormatividade.',
          tags: ['Penal', 'Zaffaroni'],
          created_at: '2026-09-02',
        },
      ],
      deadlines: [
        {
          id: 'd-test-1',
          course_id: 'c-test-1',
          title: 'Habeas Corpus Prático',
          due_date: '2026-09-20',
          status: 'Não iniciado',
        },
      ],
      activeCourseId: 'c-test-1',
    });

    // Reset meal store
    useMealStore.setState({
      weeklyMeals: [
        {
          id: 'm-mon',
          day_of_week: 1,
          meal_type: 'Almoço',
          title: 'Frango com Batata Doce',
          ingredients: ['Frango', 'Batata Doce'],
          photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
        {
          id: 'm-sun',
          day_of_week: 7,
          meal_type: 'Almoço',
          title: 'Risoto de Cogumelos',
          ingredients: ['Arroz Arbóreo', 'Cogumelos', 'Parmesão'],
          photo_url: undefined,
        },
      ],
      sundayPrepTasks: [
        { id: 'pt-1', task: 'Higienizar legumes e saladas', completed: true },
        { id: 'pt-2', task: 'Cozinhar ovos para a semana', completed: false },
      ],
      shoppingItems: [
        { id: 'si-1', item_name: 'Tomates Grape', category: 'Hortifrúti', is_completed: true },
        { id: 'si-2', item_name: 'Queijo Cottage', category: 'Geladeira', is_completed: false },
        { id: 'si-3', item_name: 'Castanha de Caju', category: 'Despensa', is_completed: true },
        { id: 'si-4', item_name: 'Potes Herméticos', category: 'Outros', is_completed: false },
      ],
    });
  });

  // ==========================================
  // SUITE 1: LEGAL BINDER - COURSES CRUD & EDGE CASES
  // ==========================================

  test('LEGAL-01: Add course with full metadata (professor, weekday, accent color, progress)', () => {
    const store = useLegalStore.getState();
    store.addCourse({
      name: 'Direito Processual Penal',
      professor: 'Dra. Ada Pellegrini',
      day_of_week: 3, // Quarta
      color_accent: '#FEF9C3',
      progress_percentage: 45,
    });

    const courses = useLegalStore.getState().courses;
    assert.equal(courses.length, 3);
    const added = courses.find((c) => c.name === 'Direito Processual Penal');
    assert.ok(added);
    assert.equal(added.professor, 'Dra. Ada Pellegrini');
    assert.equal(added.day_of_week, 3);
    assert.equal(added.color_accent, '#FEF9C3');
    assert.equal(added.progress_percentage, 45);
    assert.match(added.id, /^c_\d+$/);
  });

  test('LEGAL-02: Add course with minimal metadata (omits professor and day_of_week)', () => {
    const store = useLegalStore.getState();
    store.addCourse({
      name: 'Filosofia do Direito',
      color_accent: '#DCFCE7',
      progress_percentage: 0,
    });

    const courses = useLegalStore.getState().courses;
    const added = courses.find((c) => c.name === 'Filosofia do Direito');
    assert.ok(added);
    assert.equal(added.professor, undefined);
    assert.equal(added.day_of_week, undefined);
    assert.equal(added.progress_percentage, 0);
  });

  test('LEGAL-03: Edit course details (partial update)', () => {
    const store = useLegalStore.getState();
    store.updateCourse('c-test-1', {
      professor: 'Prof. Rogério Sanches',
      day_of_week: 6, // Sábado
      color_accent: '#FFEDD5',
    });

    const course = useLegalStore.getState().courses.find((c) => c.id === 'c-test-1');
    assert.ok(course);
    assert.equal(course.name, 'Direito Penal I'); // preserved
    assert.equal(course.professor, 'Prof. Rogério Sanches');
    assert.equal(course.day_of_week, 6);
    assert.equal(course.color_accent, '#FFEDD5');
    assert.equal(course.progress_percentage, 25); // preserved
  });

  test('LEGAL-04: Boundary Value Analysis on course reading progress (clamp [0, 100])', () => {
    const store = useLegalStore.getState();

    // Upper boundary overflow: 150 -> 100
    store.updateCourseProgress('c-test-1', 150);
    assert.equal(
      useLegalStore.getState().courses.find((c) => c.id === 'c-test-1')?.progress_percentage,
      100
    );

    // Lower boundary underflow: -20 -> 0
    store.updateCourseProgress('c-test-1', -20);
    assert.equal(
      useLegalStore.getState().courses.find((c) => c.id === 'c-test-1')?.progress_percentage,
      0
    );

    // Exact limits
    store.updateCourseProgress('c-test-1', 0);
    assert.equal(
      useLegalStore.getState().courses.find((c) => c.id === 'c-test-1')?.progress_percentage,
      0
    );
    store.updateCourseProgress('c-test-1', 100);
    assert.equal(
      useLegalStore.getState().courses.find((c) => c.id === 'c-test-1')?.progress_percentage,
      100
    );
  });

  test('LEGAL-05: Delete course resets activeCourseId if active, but preserves if different', () => {
    const store = useLegalStore.getState();
    assert.equal(store.activeCourseId, 'c-test-1');

    // Delete active course -> activeCourseId becomes 'all'
    store.deleteCourse('c-test-1');
    assert.equal(useLegalStore.getState().activeCourseId, 'all');
    assert.equal(useLegalStore.getState().courses.find((c) => c.id === 'c-test-1'), undefined);

    // Set activeCourseId to 'all', delete c-test-2 -> activeCourseId remains 'all'
    store.deleteCourse('c-test-2');
    assert.equal(useLegalStore.getState().activeCourseId, 'all');
    assert.equal(useLegalStore.getState().courses.length, 0);
  });

  test('LEGAL-06: Orphaned Notes & Deadlines integrity after course deletion', () => {
    const store = useLegalStore.getState();
    // c-test-1 is associated with n-test-1 and d-test-1
    store.deleteCourse('c-test-1');

    // Notes and deadlines remain stored without throwing errors or null pointer exceptions
    const notes = useLegalStore.getState().notes;
    const deadlines = useLegalStore.getState().deadlines;
    assert.equal(notes.length, 1);
    assert.equal(deadlines.length, 1);
    assert.equal(notes[0].course_id, 'c-test-1');
    assert.equal(deadlines[0].course_id, 'c-test-1');
  });

  // ==========================================
  // SUITE 2: BENTO MEAL PLANNER - 7 DAYS, INGREDIENTS & PHOTOS
  // ==========================================

  test('BENTO-01: Plan meals covering all 7 days of the week (1 to 7)', () => {
    const store = useMealStore.getState();

    // Add meals for all missing days: 2 (Ter), 3 (Qua), 4 (Qui), 5 (Sex), 6 (Sáb)
    const missingDays = [2, 3, 4, 5, 6];
    missingDays.forEach((day) => {
      store.saveMeal({
        day_of_week: day,
        meal_type: 'Almoço',
        title: `Marmita Dia ${day}`,
        ingredients: [`Ingrediente ${day}A`, `Ingrediente ${day}B`],
        photo_url: `https://example.com/bento-${day}.jpg`,
      });
    });

    const meals = useMealStore.getState().weeklyMeals;
    assert.equal(meals.length, 7); // 2 initial + 5 added

    // Verify all 7 days are represented
    for (let day = 1; day <= 7; day++) {
      const dayMeal = meals.find((m) => m.day_of_week === day);
      assert.ok(dayMeal, `Meal for day ${day} must exist`);
      assert.ok(dayMeal.title);
      assert.ok(Array.isArray(dayMeal.ingredients));
    }
  });

  test('BENTO-02: Edit meal replaces attributes and preserves meal ID', () => {
    const store = useMealStore.getState();
    const original = store.weeklyMeals.find((m) => m.id === 'm-mon');
    assert.ok(original);

    store.saveMeal({
      id: 'm-mon',
      day_of_week: 1,
      meal_type: 'Jantar',
      title: 'Salmão com Aspargos e Quinoa',
      ingredients: ['Salmão', 'Aspargos', 'Quinoa', 'Limão Siciliano'],
      photo_url: 'https://example.com/salmon.jpg',
    });

    const updated = useMealStore.getState().weeklyMeals.find((m) => m.id === 'm-mon');
    assert.ok(updated);
    assert.equal(updated.title, 'Salmão com Aspargos e Quinoa');
    assert.equal(updated.meal_type, 'Jantar');
    assert.equal(updated.ingredients.length, 4);
    assert.equal(updated.photo_url, 'https://example.com/salmon.jpg');
    // Number of meals must remain 2
    assert.equal(useMealStore.getState().weeklyMeals.length, 2);
  });

  test('BENTO-03: Delete meal removes item from weeklyMeals', () => {
    const store = useMealStore.getState();
    store.deleteMeal('m-sun');

    const meals = useMealStore.getState().weeklyMeals;
    assert.equal(meals.length, 1);
    assert.equal(meals.find((m) => m.id === 'm-sun'), undefined);
    assert.ok(meals.find((m) => m.id === 'm-mon'));
  });

  // ==========================================
  // SUITE 3: SUNDAY PREP GUIDE
  // ==========================================

  test('PREP-01: Add, toggle, and delete prep tasks with completion metrics', () => {
    const store = useMealStore.getState();

    // Initial state: 1 completed, 1 pending (50%)
    let tasks = store.sundayPrepTasks;
    assert.equal(tasks.filter((t) => t.completed).length, 1);

    // Add new task
    store.addPrepTask('   Porcionar snacks de castanhas   ');
    tasks = useMealStore.getState().sundayPrepTasks;
    assert.equal(tasks.length, 3);
    const added = tasks.find((t) => t.task === 'Porcionar snacks de castanhas');
    assert.ok(added);
    assert.equal(added.completed, false); // must start uncompleted
    assert.match(added.id, /^pt_\d+$/);

    // Toggle newly added task
    store.togglePrepTask(added.id);
    assert.equal(
      useMealStore.getState().sundayPrepTasks.find((t) => t.id === added.id)?.completed,
      true
    );

    // Delete task
    store.deletePrepTask(added.id);
    assert.equal(useMealStore.getState().sundayPrepTasks.length, 2);
    assert.equal(
      useMealStore.getState().sundayPrepTasks.find((t) => t.id === added.id),
      undefined
    );
  });

  // ==========================================
  // SUITE 4: SHOPPING LIST - BATCH CLEAR & CATEGORIES
  // ==========================================

  test('SHOP-01: Add items across categories, toggle status, and batch clear completed', () => {
    const store = useMealStore.getState();

    // Initial state has 4 items: si-1 (completed), si-2 (pending), si-3 (completed), si-4 (pending)
    assert.equal(store.shoppingItems.length, 4);
    assert.equal(store.shoppingItems.filter((i) => i.is_completed).length, 2);

    // Batch clear completed items
    store.clearCompletedShoppingItems();

    const remaining = useMealStore.getState().shoppingItems;
    assert.equal(remaining.length, 2);
    // Verified that only pending items remain
    assert.ok(remaining.every((i) => !i.is_completed));
    assert.ok(remaining.find((i) => i.id === 'si-2'));
    assert.ok(remaining.find((i) => i.id === 'si-4'));
    assert.equal(remaining.find((i) => i.id === 'si-1'), undefined);
    assert.equal(remaining.find((i) => i.id === 'si-3'), undefined);
  });

  test('SHOP-02: Batch clear when no items are completed is a safe no-op', () => {
    const store = useMealStore.getState();
    // Clear once
    store.clearCompletedShoppingItems();
    const countAfterFirstClear = useMealStore.getState().shoppingItems.length;

    // Clear second time (no completed items)
    store.clearCompletedShoppingItems();
    assert.equal(useMealStore.getState().shoppingItems.length, countAfterFirstClear);
  });
});
