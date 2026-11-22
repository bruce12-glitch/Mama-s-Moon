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
  getVisibleDigitalCombos,
  filterLaptopStickers,
  filterKidsBeddingProducts,
  parseWishlistIds,
  isNewArrival,
  getHeroTrimPalette,
  getHeroSlideTransitionState,
  getActiveNavSection,
  getPrintFriendlyStudioConfig,
} from './moonMeshLogic';
import {
  HERO_SLIDES,
  BOOKS,
  STICKER_COLLECTIONS,
  LAPTOP_STICKER_PACKS,
  KIDS_BEDDING_COLLECTION,
  DIGITAL_PDF_BOOKS,
  DIGITAL_COMBO_PACKS,
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

test('HERO_SLIDES includes Christmas, Winter Village Tabletop, Winter Village Editorial, and Grand Opening book showcase slides', () => {
  assert.equal(HERO_SLIDES[0].id, 'christmas-book-showcase');
  assert.equal(HERO_SLIDES[0].image, './assets/aistudio/image_ae411272.png');
  assert.equal(HERO_SLIDES[0].layout, 'book-showcase');
  assert.equal(HERO_SLIDES[1].id, 'winter-village-full-banner');
  assert.equal(HERO_SLIDES[1].image, './assets/hero-winter-village-panoramic.jpg');
  assert.equal(HERO_SLIDES[2].id, 'winter-village-showcase');
  assert.ok(HERO_SLIDES[2].image.startsWith('./assets/hero-winter-village.jpg'));
  assert.equal(HERO_SLIDES[3].id, 'book-showcase');
  assert.ok(HERO_SLIDES[3].image.startsWith('./assets/hero-book-showcase.png'));
});

test('BOOKS catalog contains The Little Moon Picnic and Christmas & New Year with valid cover paths', () => {
  assert.equal(BOOKS.length, 2);
  assert.equal(BOOKS[0].id, 'little-moon-picnic');
  assert.ok(BOOKS[0].coverImage.startsWith('./assets/the-little-moon-picnic-book.png'));
  assert.equal(BOOKS[1].id, 'christmas-new-year');
  assert.ok(BOOKS[1].coverImage.startsWith('./assets/christmas-new-year-book.png'));
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

test('DIGITAL_COMBO_PACKS starts with Combo 1-4 Little Cuddles at $2.99 and expands with View more', () => {
  assert.ok(DIGITAL_COMBO_PACKS.length >= 4);
  const initialFour = getVisibleDigitalCombos(DIGITAL_COMBO_PACKS, false, 4);
  assert.equal(initialFour.length, 4);
  assert.deepEqual(
    initialFour.map((c) => c.title),
    [
      'Combo 1: Little Cuddles',
      'Combo 2: Little Cuddles',
      'Combo 3: Little Cuddles',
      'Combo 4: Little Cuddles',
    ]
  );
  assert.ok(initialFour.every((c) => c.price === 2.99 && c.pageCount === 10));

  const expanded = getVisibleDigitalCombos(DIGITAL_COMBO_PACKS, true, 4);
  assert.equal(expanded.length, DIGITAL_COMBO_PACKS.length);
});

test('calculateStudioBagSummary includes Digital Combo packs accurately', () => {
  const priceMap: Record<string, number> = {};
  for (const c of DIGITAL_COMBO_PACKS) priceMap[c.id] = c.price;

  const summary = calculateStudioBagSummary(
    {
      'digital-combo-1-little-cuddles': 2,
      'digital-combo-3-little-cuddles': 1,
    },
    priceMap,
    25
  );
  assert.equal(summary.totalItems, 3);
  assert.equal(summary.subtotal, 8.97);
  assert.equal(summary.qualifiesForFreeShipping, false);
});

test('filterLaptopStickers filters LAPTOP_STICKER_PACKS by finish accurately', () => {
  assert.equal(LAPTOP_STICKER_PACKS.length, 4);
  assert.equal(filterLaptopStickers(LAPTOP_STICKER_PACKS, 'all').length, 4);

  const matte = filterLaptopStickers(LAPTOP_STICKER_PACKS, 'matte');
  assert.equal(matte.length, 2);
  assert.ok(matte.every((p) => p.finish === 'matte'));

  const holo = filterLaptopStickers(LAPTOP_STICKER_PACKS, 'holographic');
  assert.equal(holo.length, 1);
  assert.equal(holo[0].id, 'laptop-sticker-moon-desk');

  const lidSets = filterLaptopStickers(LAPTOP_STICKER_PACKS, 'lid-set');
  assert.equal(lidSets.length, 1);
  assert.equal(lidSets[0].id, 'laptop-sticker-full-crew-lid');
});

test('calculateStudioBagSummary includes Laptop Sticker packs accurately', () => {
  const priceMap: Record<string, number> = {};
  for (const p of LAPTOP_STICKER_PACKS) priceMap[p.id] = p.price;

  const summary = calculateStudioBagSummary(
    {
      'laptop-sticker-cozy-miso': 2, // 17.00
      'laptop-sticker-moon-desk': 1, // 9.50
    },
    priceMap,
    25
  );
  assert.equal(summary.totalItems, 3);
  assert.equal(summary.subtotal, 26.5);
  assert.equal(summary.qualifiesForFreeShipping, true);
  assert.equal(summary.amountToFreeShipping, 0);
});

test('filterKidsBeddingProducts filters KIDS_BEDDING_COLLECTION by category accurately', () => {
  assert.equal(KIDS_BEDDING_COLLECTION.length, 4);
  assert.equal(filterKidsBeddingProducts(KIDS_BEDDING_COLLECTION, 'all').length, 4);

  const sheets = filterKidsBeddingProducts(KIDS_BEDDING_COLLECTION, 'sheet-set');
  assert.equal(sheets.length, 2);
  assert.ok(sheets.every((item) => item.category === 'sheet-set'));

  const quilts = filterKidsBeddingProducts(KIDS_BEDDING_COLLECTION, 'quilt');
  assert.equal(quilts.length, 1);
  assert.equal(quilts[0].id, 'bedding-midnight-kittens-quilt');

  const bundles = filterKidsBeddingProducts(KIDS_BEDDING_COLLECTION, 'room-bundle');
  assert.equal(bundles.length, 1);
  assert.equal(bundles[0].id, 'bedding-cozy-crew-room-bundle');
});

test('calculateStudioBagSummary includes Kids Bedding items accurately', () => {
  const priceMap: Record<string, number> = {};
  for (const item of KIDS_BEDDING_COLLECTION) priceMap[item.id] = item.price;

  const summary = calculateStudioBagSummary(
    {
      'bedding-moon-picnic-sheets': 1, // 48.00
      'bedding-starlight-garden-sheets': 1, // 42.00
    },
    priceMap,
    25
  );
  assert.equal(summary.totalItems, 2);
  assert.equal(summary.subtotal, 90);
  assert.equal(summary.qualifiesForFreeShipping, true);
  assert.equal(summary.amountToFreeShipping, 0);
});

test('parseWishlistIds hydrates valid product IDs across Books, Stickers, Bedding, and filters invalid entries', () => {
  const validIds = new Set<string>([
    ...BOOKS.map((b) => b.id),
    ...STICKER_COLLECTIONS.map((s) => s.id),
    ...LAPTOP_STICKER_PACKS.map((l) => l.id),
    ...KIDS_BEDDING_COLLECTION.map((k) => k.id),
    ...DIGITAL_PDF_BOOKS.map((d) => d.id),
    ...DIGITAL_COMBO_PACKS.map((c) => c.id),
  ]);

  const parsed = parseWishlistIds(
    JSON.stringify([
      'little-moon-picnic',
      'sticker-miso-crew-pack',
      'bedding-moon-picnic-sheets',
      'non-existent-item',
      42,
    ]),
    validIds
  );
  assert.deepEqual([...parsed], [
    'little-moon-picnic',
    'sticker-miso-crew-pack',
    'bedding-moon-picnic-sheets',
  ]);

  const migrated = parseWishlistIds(
    null,
    validIds,
    JSON.stringify(['digital-combo-1-little-cuddles'])
  );
  assert.deepEqual([...migrated], ['digital-combo-1-little-cuddles']);

  assert.equal(parseWishlistIds('not-valid-json{', validIds).size, 0);
});

test('isNewArrival highlights products added within the last 30 days only', () => {
  const refDate = '2026-11-18';
  assert.equal(isNewArrival('2026-11-18', refDate, 30), true);
  assert.equal(isNewArrival('2026-10-19', refDate, 30), true);
  assert.equal(isNewArrival('2026-10-18', refDate, 30), false);
  assert.equal(isNewArrival('2026-11-19', refDate, 30), false);
  assert.equal(isNewArrival(undefined, refDate, 30), false);
  assert.equal(isNewArrival('not-a-date', refDate, 30), false);

  const newStickers = STICKER_COLLECTIONS.filter((s) => isNewArrival(s.addedAt, refDate, 30));
  assert.equal(newStickers.length, 2);

  const newLaptopDecals = LAPTOP_STICKER_PACKS.filter((p) => isNewArrival(p.addedAt, refDate, 30));
  assert.equal(newLaptopDecals.length, 2);

  const newBedding = KIDS_BEDDING_COLLECTION.filter((b) => isNewArrival(b.addedAt, refDate, 30));
  assert.equal(newBedding.length, 2);
});

test('getHeroTrimPalette returns warm Mama’s Moon woven trim colors for every hero slide', () => {
  const hexRegex = /^#[0-9a-f]{6}$/i;
  for (const slide of HERO_SLIDES) {
    const palette = getHeroTrimPalette(slide.id);
    assert.match(palette.base, hexRegex);
    assert.match(palette.dark, hexRegex);
    assert.match(palette.light, hexRegex);
    assert.notEqual(palette.base.toLowerCase(), '#1c2e4a');
  }
  const fallback = getHeroTrimPalette('unknown-slide');
  assert.equal(fallback.base, getHeroTrimPalette('christmas-book-showcase').base);
});

test('getHeroSlideTransitionState returns active, exiting, and inactive states cleanly', () => {
  assert.equal(getHeroSlideTransitionState(2, 2, 1), 'active');
  assert.equal(getHeroSlideTransitionState(1, 2, 1), 'exiting');
  assert.equal(getHeroSlideTransitionState(0, 2, 1), 'inactive');
  assert.equal(getHeroSlideTransitionState(1, 1, 1), 'active');
  assert.equal(getHeroSlideTransitionState(0, 1, null), 'inactive');
});

test('getActiveNavSection resolves the current visible section based on scroll position', () => {
  const sections = [
    { id: 'books', top: 600 },
    { id: 'digital', top: 1400 },
    { id: 'collections', top: 2200 },
  ];
  assert.equal(getActiveNavSection(100, sections, 180), null);
  assert.equal(getActiveNavSection(450, sections, 180), 'books');
  assert.equal(getActiveNavSection(1250, sections, 180), 'digital');
  assert.equal(getActiveNavSection(2500, sections, 180), 'collections');
  assert.equal(getActiveNavSection(500, [], 180), null);
});

test('getPrintFriendlyStudioConfig switches digital SVG coloring studio to pure white B&W ink-saver mode', () => {
  const standard = getPrintFriendlyStudioConfig(false);
  assert.equal(standard.enabled, false);
  assert.equal(standard.canvasBackground, '#FFFDF7');
  assert.equal(standard.svgPartFill, null);
  assert.equal(standard.pngFilename, 'miso-and-the-moon.png');

  const printFriendly = getPrintFriendlyStudioConfig(true);
  assert.equal(printFriendly.enabled, true);
  assert.equal(printFriendly.canvasBackground, '#FFFFFF');
  assert.equal(printFriendly.canvasBorderColor, '#000000');
  assert.equal(printFriendly.svgBackgroundFill, '#FFFFFF');
  assert.equal(printFriendly.svgPartFill, '#FFFFFF');
  assert.equal(printFriendly.svgOutlineFill, '#000000');
  assert.equal(printFriendly.pngFilename, 'miso-and-the-moon-print-friendly.png');
});

test('HERO_SLIDES includes the dedicated Winter Village tabletop banner slide with its local asset', () => {
  const bannerSlide = HERO_SLIDES.find((s) => s.id === 'winter-village-full-banner');
  assert.ok(bannerSlide, 'Expected winter-village-full-banner slide in HERO_SLIDES');
  assert.equal(bannerSlide?.image, './assets/hero-winter-village-panoramic.jpg');
  assert.equal(bannerSlide?.bookId, 'christmas-new-year');
  const trim = getHeroTrimPalette('winter-village-full-banner');
  assert.equal(trim.base, '#8a5934');
});
