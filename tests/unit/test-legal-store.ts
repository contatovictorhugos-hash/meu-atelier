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

  test('deletes a deadline by id', () => {
    const store = useLegalStore.getState();
    store.deleteDeadline('d1');

    const remaining = useLegalStore.getState().deadlines;
    assert.equal(remaining.length, 0);
  });
});
