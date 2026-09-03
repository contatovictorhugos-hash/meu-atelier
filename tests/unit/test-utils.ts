import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { cn, formatDate } from '../../src/lib/utils/utils.ts';

describe('Unit Tests: Utils (cn & formatDate)', () => {
  test('cn merges classes and resolves tailwind conflicts', () => {
    const result = cn('px-2 py-1', 'bg-red-500', 'px-4');
    assert.match(result, /px-4/);
    assert.doesNotMatch(result, /px-2/);
    assert.match(result, /bg-red-500/);
  });

  test('cn handles conditional and falsy values gracefully', () => {
    const isFalse = false;
    const isNull = null;
    const isUndefined = undefined;
    const result = cn('base', isFalse && 'extra', isNull, isUndefined, 'active');
    assert.equal(result, 'base active');
  });

  test('formatDate correctly formats YYYY-MM-DD to DD/MM/YYYY', () => {
    assert.equal(formatDate('2026-09-02'), '02/09/2026');
    assert.equal(formatDate('2025-12-31'), '31/12/2025');
  });

  test('formatDate handles unexpected strings without crashing', () => {
    assert.equal(formatDate('invalid-date'), 'invalid-date');
    assert.equal(formatDate(''), '');
  });
});
