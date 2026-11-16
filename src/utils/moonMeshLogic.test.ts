import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextSlideIndex,
  filterCatalogItems,
  toggleSavedBookId,
  validateMoonMailEmail,
  computeBookTiltAngles,
  dampValue,
  isEraserSwatch,
  getForestAudioUiState,
  getDioramaLightMood,
  computeGroundedCharacterY,
  filterStickerProducts,
  calculateStudioBagSummary,
} from './moonMeshLogic';
import {
  HERO_SLIDES,
  BOOKS,
  STICKER_COLLECTIONS,
  DIGITAL_PDF_BOOKS,
} from '../data/moonMeshData';

test('getNextSlideIndex wraps around forward and backward', () => {
  assert.equal(getNextSlideIndex(0, 4, 1), 1);
  assert.equal(getNextSlideIndex(3, 4, 1), 0);
  assert.equal(getNextSlideIndex(0, 4, -1), 3);
  assert.equal(getNextSlideIndex(2, 4, -1), 1);
});

test('filterCatalogItems filters by multiple search tokens and saved mode', () => {
  const items = [
    {
      id: 'midnight-kittens',
      title: 'Midnight Kittens',
      theme: 'Cozy nights',
      keywords: 'rooftop moon lantern',
      image: '/a.webp',
    },
    {
      id: 'starlight-garden',
      title: 'Starlight Garden',
      theme: 'Nature magic',
      keywords: 'flowers snail sprout',
      image: '/b.webp',
    },
  ];
  const saved = new Set(['starlight-garden']);

  const searchRes = filterCatalogItems(items, 'midnight moon', 'search', saved);
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].id, 'midnight-kittens');

  const savedRes = filterCatalogItems(items, '', 'saved', saved);
  assert.equal(savedRes.length, 1);
  assert.equal(savedRes[0].id, 'starlight-garden');
});

test('toggleSavedBookId adds and removes valid book IDs immutably', () => {
  const valid = new Set(['midnight-kittens', 'starlight-garden']);
  const s0 = new Set<string>();
  const s1 = toggleSavedBookId(s0, 'midnight-kittens', valid);
  assert.equal(s1.has('midnight-kittens'), true);
  assert.equal(s0.has('midnight-kittens'), false);

  const s2 = toggleSavedBookId(s1, 'midnight-kittens', valid);
  assert.equal(s2.has('midnight-kittens'), false);

  const sInvalid = toggleSavedBookId(s0, 'unknown-book', valid);
  assert.equal(sInvalid.size, 0);
});

test('validateMoonMailEmail rejects empty or malformed emails and accepts valid ones', () => {
  assert.deepEqual(validateMoonMailEmail('   '), {
    valid: false,
    error: 'Add an email so we know where to send the moon.',
  });
  assert.deepEqual(validateMoonMailEmail('miso-at-moon'), {
    valid: false,
    error: 'That email looks a little lost in space. Try again?',
  });
  assert.deepEqual(validateMoonMailEmail('miso@mamasmoon.com'), {
    valid: true,
    error: '',
  });
});

test('computeBookTiltAngles calculates bounded tilt degrees', () => {
  const center = computeBookTiltAngles(0, 0);
  assert.equal(center.rx, '0.00deg');
  assert.equal(center.ry, '0.00deg');

  const corner = computeBookTiltAngles(0.5, -0.5, 6, 8);
  assert.equal(corner.rx, '3.00deg');
  assert.equal(corner.ry, '4.00deg');
});

test('dampValue smoothly interpolates toward target', () => {
  const half = dampValue(0, 10, 8, 0.1);
  assert.ok(half > 5 && half < 6);
  assert.equal(dampValue(5, 10, 8, 0), 5);
});

test('isEraserSwatch identifies eraser hex codes', () => {
  assert.equal(isEraserSwatch('#FFFFFF'), true);
  assert.equal(isEraserSwatch('#fffdf7'), true);
  assert.equal(isEraserSwatch('#FFC81E'), false);
});

test('HERO_SLIDES includes Christmas, Winter Village, and Grand Opening book showcase slides', () => {
  assert.equal(HERO_SLIDES[0].id, 'christmas-book-showcase');
  assert.equal(HERO_SLIDES[0].image, '/assets/aistudio/image_ae411272.png');
  assert.equal(HERO_SLIDES[0].layout, 'book-showcase');
  assert.equal(HERO_SLIDES[1].id, 'winter-village-showcase');
  assert.ok(HERO_SLIDES[1].image.startsWith('/assets/hero-winter-village.jpg'));
  assert.equal(HERO_SLIDES[2].id, 'book-showcase');
  assert.ok(HERO_SLIDES[2].image.startsWith('/assets/hero-book-showcase.png'));
});

test('BOOKS catalog contains The Little Moon Picnic and Christmas & New Year with valid cover paths', () => {
  assert.equal(BOOKS.length, 2);
  assert.equal(BOOKS[0].id, 'little-moon-picnic');
  assert.ok(BOOKS[0].coverImage.startsWith('/assets/the-little-moon-picnic-book.png'));
  assert.equal(BOOKS[1].id, 'christmas-new-year');
  assert.ok(BOOKS[1].coverImage.startsWith('/assets/christmas-new-year-book.png'));
});

test('getForestAudioUiState switches between speaker and muted states accurately', () => {
  const mutedState = getForestAudioUiState(false);
  assert.equal(mutedState.iconState, 'muted');
  assert.equal(mutedState.statusBadge, 'Muted');
  assert.ok(mutedState.ariaLabel.toLowerCase().includes('play ambient forest sound'));

  const playingState = getForestAudioUiState(true);
  assert.equal(playingState.iconState, 'speaker');
  assert.equal(playingState.statusBadge, 'On');
  assert.ok(playingState.ariaLabel.toLowerCase().includes('mute ambient forest sound'));
});

test('getDioramaLightMood returns valid lighting configuration for all presets', () => {
  const moonlit = getDioramaLightMood('moonlit-night');
  assert.equal(moonlit.label, 'Moonlit Night');
  assert.ok(moonlit.keyLightIntensity > 0);

  const dusk = getDioramaLightMood('golden-dusk');
  assert.equal(dusk.label, 'Golden Dusk');
  assert.ok(dusk.moonGlowIntensity > moonlit.moonGlowIntensity);
});

test('computeGroundedCharacterY keeps Pip the Star and characters strictly at or above baseY', () => {
  const floorY = -0.58;
  const pipBaseY = floorY + 0.6;
  for (let t = 0; t <= 10; t += 0.17) {
    const y = computeGroundedCharacterY(pipBaseY, t, 3.0, 0.11, 0);
    assert.ok(y >= pipBaseY - 1e-9, `Expected y (${y}) >= pipBaseY (${pipBaseY}) at t=${t}`);
    assert.ok(y - 0.58 >= floorY, `Expected Pip bottom (${y - 0.58}) >= floorY (${floorY})`);
  }
});

test('filterStickerProducts filters STICKER_COLLECTIONS by category accurately', () => {
  assert.equal(filterStickerProducts(STICKER_COLLECTIONS, 'all').length, 4);
  const dieCut = filterStickerProducts(STICKER_COLLECTIONS, 'die-cut');
  assert.equal(dieCut.length, 2);
  assert.ok(dieCut.every((s) => s.category === 'die-cut'));

  const sheets = filterStickerProducts(STICKER_COLLECTIONS, 'sheet');
  assert.equal(sheets.length, 1);
  assert.equal(sheets[0].id, 'sticker-strawberry-beret-sheet');

  const bundles = filterStickerProducts(STICKER_COLLECTIONS, 'bundle');
  assert.equal(bundles.length, 1);
  assert.equal(bundles[0].id, 'sticker-complete-collector-bundle');
});

test('calculateStudioBagSummary computes item count, subtotal, and free shipping threshold', () => {
  const priceMap: Record<string, number> = {};
  for (const s of STICKER_COLLECTIONS) priceMap[s.id] = s.price;
  for (const d of DIGITAL_PDF_BOOKS) priceMap[d.id] = d.price;

  const empty = calculateStudioBagSummary({}, priceMap, 25);
  assert.equal(empty.totalItems, 0);
  assert.equal(empty.subtotal, 0);
  assert.equal(empty.qualifiesForFreeShipping, false);
  assert.equal(empty.amountToFreeShipping, 25);

  const partial = calculateStudioBagSummary(
    {
      'sticker-miso-crew-pack': 1, // 9.50
      'pdf-little-moon-picnic': 1, // 6.50
    },
    priceMap,
    25
  );
  assert.equal(partial.totalItems, 2);
  assert.equal(partial.subtotal, 16);
  assert.equal(partial.qualifiesForFreeShipping, false);
  assert.equal(partial.amountToFreeShipping, 9);

  const full = calculateStudioBagSummary(
    {
      'sticker-complete-collector-bundle': 1, // 22.00
      'pdf-little-moon-picnic': 1, // 6.50
    },
    priceMap,
    25
  );
  assert.equal(full.totalItems, 2);
  assert.equal(full.subtotal, 28.5);
  assert.equal(full.qualifiesForFreeShipping, true);
  assert.equal(full.amountToFreeShipping, 0);
});

