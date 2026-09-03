import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import manifest from '../../src/app/manifest.ts';

describe('Integration Tests: PWA Manifest Spec Compliance', () => {
  test('manifest contains required W3C PWA standalone fields', () => {
    const config = manifest();

    assert.equal(config.display, 'standalone');
    assert.equal(config.start_url, '/');
    assert.equal(config.background_color, '#FDF2F4');
    assert.equal(config.theme_color, '#FDF2F4');
    assert.match(config.name || '', /Atelier/);
    assert.equal(config.short_name, 'Atelier');
  });

  test('manifest provides 192x192 and 512x512 app icons', () => {
    const config = manifest();
    const icons = config.icons || [];

    assert.ok(icons.length >= 2);
    const icon192 = icons.find((i) => i.sizes === '192x192');
    const icon512 = icons.find((i) => i.sizes === '512x512');

    assert.ok(icon192, 'Missing 192x192 icon');
    assert.ok(icon512, 'Missing 512x512 icon');
    assert.equal(icon192?.type, 'image/png');
    assert.equal(icon512?.type, 'image/png');
  });
});
