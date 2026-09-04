import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { useLegalStore } from '../../src/stores/useLegalStore.ts';

describe('Unit Tests: LegalStore (Law Courses, Fichamentos & Deadlines)', () => {
  beforeEach(() => {
    useLegalStore.setState({
      courses: [
        { id: 'c1', name: 'Direito Constitucional', color_accent: '#FCE7EC', progress_percentage: 50 },
        { id: 'c2', name: 'Direito Civil', color_accent: '#EDE9FE', progress_percentage: 20 },
      ],
      notes: [
        { id: 'n1', course_id: 'c1', title: 'Controle Difuso', summary_text: 'Súmula Vinculante 10', tags: ['STF'], created_at: '2026-09-01' },
      ],
      deadlines: [
        { id: 'd1', course_id: 'c1', title: 'Peça Inicial', due_date: '2026-09-15', status: 'Não iniciado' },
      ],
      activeCourseId: 'all',
    });
  });

  test('updates course reading progress percentage', () => {
    const store = useLegalStore.getState();

    store.updateCourseProgress('c1', 75);
    const updated = useLegalStore.getState().courses.find((c) => c.id === 'c1');
    assert.equal(updated?.progress_percentage, 75);
  });

  test('adds a micro-fichamento with tags and date', () => {
    const store = useLegalStore.getState();

    store.addStudyNote({
      course_id: 'c2',
      title: 'Cláusula Penal no Código Civil',
      summary_text: 'Artigo 408 e seguintes.',
      photo_url: 'https://example.com/art408.jpg',
      tags: ['Art. 408', 'CC'],
    });

    const notes = useLegalStore.getState().notes;
    assert.equal(notes.length, 2);
    const newNote = notes[0];
    assert.equal(newNote.title, 'Cláusula Penal no Código Civil');
    assert.equal(newNote.course_id, 'c2');
    assert.match(newNote.id, /^n_/);
  });

  test('updates an existing study note', () => {
    const store = useLegalStore.getState();
    store.updateStudyNote('n1', {
      title: 'Controle Difuso e Reclamação Constitucional',
      summary_text: 'Atualização pós-aula com novas súmulas.',
      tags: ['STF', 'Reclamação'],
    });

    const updated = useLegalStore.getState().notes.find((n) => n.id === 'n1');
    assert.equal(updated?.title, 'Controle Difuso e Reclamação Constitucional');
    assert.equal(updated?.summary_text, 'Atualização pós-aula com novas súmulas.');
    assert.deepEqual(updated?.tags, ['STF', 'Reclamação']);
  });

  test('deletes a micro-fichamento by id', () => {
    const store = useLegalStore.getState();
    store.deleteStudyNote('n1');

    const remaining = useLegalStore.getState().notes;
    assert.equal(remaining.length, 0);
  });

  test('adds a study deadline and updates its status', () => {
    const store = useLegalStore.getState();

    store.addDeadline({
      course_id: 'c2',
      title: 'Simulado OAB Civil',
      due_date: '2026-09-25',
      status: 'Não iniciado',
    });

    const deadlines = useLegalStore.getState().deadlines;
    assert.equal(deadlines.length, 2);

    const newDeadlineId = deadlines[0].id;
    store.updateDeadlineStatus(newDeadlineId, 'Em rascunho');
    assert.equal(useLegalStore.getState().deadlines.find((d) => d.id === newDeadlineId)?.status, 'Em rascunho');

    store.updateDeadlineStatus(newDeadlineId, 'Finalizado');
    assert.equal(useLegalStore.getState().deadlines.find((d) => d.id === newDeadlineId)?.status, 'Finalizado');
  });

  test('updates an existing study deadline fields', () => {
    const store = useLegalStore.getState();
    store.updateDeadline('d1', {
      title: 'Peça Inicial - Mandado de Segurança',
      due_date: '2026-09-30',
      status: 'Em rascunho',
      course_id: 'c2',
    });

    const updated = useLegalStore.getState().deadlines.find((d) => d.id === 'd1');
    assert.equal(updated?.title, 'Peça Inicial - Mandado de Segurança');
    assert.equal(updated?.due_date, '2026-09-30');
    assert.equal(updated?.status, 'Em rascunho');
    assert.equal(updated?.course_id, 'c2');
  });

  test('deletes a deadline by id', () => {
    const store = useLegalStore.getState();
    store.deleteDeadline('d1');

    const remaining = useLegalStore.getState().deadlines;
    assert.equal(remaining.length, 0);
  });

  test('adds a new study course with professor and day of week', () => {
    const store = useLegalStore.getState();
    store.addCourse({
      name: 'Direito Processual Civil',
      professor: 'Prof. Dr. Ricardo',
      day_of_week: 4,
      color_accent: '#FDF2F4',
      progress_percentage: 10,
    });

    const courses = useLegalStore.getState().courses;
    assert.equal(courses.length, 3);
    const created = courses.find((c) => c.name === 'Direito Processual Civil');
    assert.ok(created);
    assert.equal(created.professor, 'Prof. Dr. Ricardo');
    assert.equal(created.day_of_week, 4);
    assert.match(created.id, /^c_/);
  });

  test('updates an existing course details', () => {
    const store = useLegalStore.getState();
    store.updateCourse('c1', {
      name: 'Direito Constitucional Avançado',
      professor: 'Prof. Titular Helena',
      day_of_week: 2,
    });

    const updated = useLegalStore.getState().courses.find((c) => c.id === 'c1');
    assert.equal(updated?.name, 'Direito Constitucional Avançado');
    assert.equal(updated?.professor, 'Prof. Titular Helena');
    assert.equal(updated?.day_of_week, 2);
  });

  test('deletes a course by id and resets activeCourseId if matching', () => {
    const store = useLegalStore.getState();
    store.setActiveCourseId('c2');
    assert.equal(useLegalStore.getState().activeCourseId, 'c2');

    store.deleteCourse('c2');
    const remaining = useLegalStore.getState().courses;
    assert.equal(remaining.length, 1);
    assert.equal(remaining.find((c) => c.id === 'c2'), undefined);
    assert.equal(useLegalStore.getState().activeCourseId, 'all');
  });

  test('partially updates a study note preserving untouched fields', () => {
    const store = useLegalStore.getState();

    // Partial update 1: only summary_text
    store.updateStudyNote('n1', {
      summary_text: 'Novo resumo apenas, sem alterar o resto.',
    });

    let note = useLegalStore.getState().notes.find((n) => n.id === 'n1');
    assert.equal(note?.summary_text, 'Novo resumo apenas, sem alterar o resto.');
    assert.equal(note?.title, 'Controle Difuso'); // preserved
    assert.deepEqual(note?.tags, ['STF']); // preserved
    assert.equal(note?.created_at, '2026-09-01'); // preserved
    assert.equal(note?.course_id, 'c1'); // preserved

    // Partial update 2: only tags
    store.updateStudyNote('n1', {
      tags: ['STF', 'Repercussão Geral'],
    });

    note = useLegalStore.getState().notes.find((n) => n.id === 'n1');
    assert.deepEqual(note?.tags, ['STF', 'Repercussão Geral']);
    assert.equal(note?.summary_text, 'Novo resumo apenas, sem alterar o resto.'); // preserved
    assert.equal(note?.title, 'Controle Difuso'); // preserved
  });

  test('partially updates a study deadline preserving untouched fields', () => {
    const store = useLegalStore.getState();

    // Partial update 1: only due_date
    store.updateDeadline('d1', {
      due_date: '2026-09-30',
    });

    let deadline = useLegalStore.getState().deadlines.find((d) => d.id === 'd1');
    assert.equal(deadline?.due_date, '2026-09-30');
    assert.equal(deadline?.title, 'Peça Inicial'); // preserved
    assert.equal(deadline?.status, 'Não iniciado'); // preserved
    assert.equal(deadline?.course_id, 'c1'); // preserved

    // Partial update 2: only status
    store.updateDeadline('d1', {
      status: 'Em rascunho',
    });

    deadline = useLegalStore.getState().deadlines.find((d) => d.id === 'd1');
    assert.equal(deadline?.status, 'Em rascunho');
    assert.equal(deadline?.due_date, '2026-09-30'); // preserved
    assert.equal(deadline?.title, 'Peça Inicial'); // preserved
  });

  test('handles update or deletion of non-existent items gracefully without mutating store', () => {
    const store = useLegalStore.getState();
    const initialCourses = [...store.courses];
    const initialNotes = [...store.notes];
    const initialDeadlines = [...store.deadlines];

    // Course operations on non-existent ID
    assert.doesNotThrow(() => {
      store.updateCourse('c-nonexistent', { name: 'Curso Fantasma' });
      store.updateCourseProgress('c-nonexistent', 80);
      store.deleteCourse('c-nonexistent');
    });
    assert.deepEqual(useLegalStore.getState().courses, initialCourses);

    // Note operations on non-existent ID
    assert.doesNotThrow(() => {
      store.updateStudyNote('n-nonexistent', { title: 'Nota Fantasma' });
      store.deleteStudyNote('n-nonexistent');
    });
    assert.deepEqual(useLegalStore.getState().notes, initialNotes);

    // Deadline operations on non-existent ID
    assert.doesNotThrow(() => {
      store.updateDeadline('d-nonexistent', { title: 'Prazo Fantasma' });
      store.updateDeadlineStatus('d-nonexistent', 'Finalizado');
      store.deleteDeadline('d-nonexistent');
    });
    assert.deepEqual(useLegalStore.getState().deadlines, initialDeadlines);
  });

  test('maintains strict integrity of remaining notes and deadlines during item modifications', () => {
    const store = useLegalStore.getState();

    // Populate with multiple notes and deadlines
    store.addStudyNote({
      course_id: 'c2',
      title: 'Responsabilidade Civil Subjetiva',
      summary_text: 'Dolo, culpa e nexo de causalidade.',
      tags: ['Civil', 'CC/02'],
    });

    const notes = useLegalStore.getState().notes;
    assert.equal(notes.length, 2);
    const originalSecondNote = { ...notes[1] }; // n1

    // Update first note (the newly added one)
    const newNoteId = notes[0].id;
    store.updateStudyNote(newNoteId, { title: 'Responsabilidade Civil Objetiva' });

    // Assert second note remained completely untouched
    const secondNoteAfter = useLegalStore.getState().notes.find((n) => n.id === originalSecondNote.id);
    assert.deepEqual(secondNoteAfter, originalSecondNote);

    // Delete newly added note
    store.deleteStudyNote(newNoteId);
    const notesAfterDelete = useLegalStore.getState().notes;
    assert.equal(notesAfterDelete.length, 1);
    assert.deepEqual(notesAfterDelete[0], originalSecondNote);
  });
});

