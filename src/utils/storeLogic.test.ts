import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCT_DEPARTMENTS,
  MARKETPLACE_PRODUCTS,
} from '../data/storeCatalog';
import {
  filterMarketplaceProducts,
  sortMarketplaceProducts,
  makeCartKey,
  parseCartKey,
  calculateMarketplaceCart,
  validateCheckoutForm,
  getStartingPrice,
} from './storeLogic';

test('PRODUCT_DEPARTMENTS covers all 6 requested product formats and price ranges', () => {
  assert.equal(PRODUCT_DEPARTMENTS.length, 6);
  assert.deepEqual(
    PRODUCT_DEPARTMENTS.map((d) => d.name),
    [
      'Colouring & Activity Book (40 Pages)',
      'Nursery Gallery Wall Set (Set of 4)',
      'Die-Cut Sticker Sheet / Printable Stickers',
      'Bedtime Affirmation / Milestone Card Deck',
      'Seamless Pattern Tote Bag or Baby Blanket',
      '25-Piece Clipart & SVG Craft Bundle',
    ]
  );

  for (const dept of PRODUCT_DEPARTMENTS) {
    const items = MARKETPLACE_PRODUCTS.filter((p) => p.department === dept.id);
    assert.ok(items.length >= 2, `Expected >=2 products in ${dept.id}`);
    for (const item of items) {
      for (const variant of item.variants) {
        assert.ok(
          variant.price >= dept.minPrice - 0.001 && variant.price <= dept.maxPrice + 0.001,
          `Expected ${item.id}/${variant.id} price (${variant.price}) in [${dept.minPrice}, ${dept.maxPrice}]`
        );
      }
    }
  }
});

test('filterMarketplaceProducts filters by department, fulfillment, maxPrice, query, and wishlist', () => {
  const saved = new Set(['textile-muslin-baby-blanket', 'deck-bedtime-affirmations']);

  const all = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'all',
    fulfillment: 'all',
    maxPrice: null,
    query: '',
    savedOnly: false,
    savedIds: saved,
  });
  assert.equal(all.length, MARKETPLACE_PRODUCTS.length);

  const nurseryOnly = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'nursery',
    fulfillment: 'all',
    maxPrice: null,
    query: '',
    savedOnly: false,
    savedIds: saved,
  });
  assert.equal(nurseryOnly.length, 3);
  assert.ok(nurseryOnly.every((p) => p.department === 'nursery'));

  const printifyOnly = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'all',
    fulfillment: 'printify-pod',
    maxPrice: null,
    query: '',
    savedOnly: false,
    savedIds: saved,
  });
  assert.equal(printifyOnly.length, 2);

  const under7 = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'all',
    fulfillment: 'all',
    maxPrice: 7,
    query: '',
    savedOnly: false,
    savedIds: saved,
  });
  assert.ok(under7.every((p) => getStartingPrice(p) <= 7));

  const queryMatch = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'all',
    fulfillment: 'all',
    maxPrice: null,
    query: 'cricut miso',
    savedOnly: false,
    savedIds: saved,
  });
  assert.ok(queryMatch.some((p) => p.id === 'sticker-cozy-miso-sheet'));

  const savedOnly = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
    department: 'all',
    fulfillment: 'all',
    maxPrice: null,
    query: '',
    savedOnly: true,
    savedIds: saved,
  });
  assert.equal(savedOnly.length, 2);
});

test('sortMarketplaceProducts orders by starting price and rating cleanly', () => {
  const asc = sortMarketplaceProducts(MARKETPLACE_PRODUCTS, 'price-asc');
  for (let i = 1; i < asc.length; i++) {
    assert.ok(getStartingPrice(asc[i - 1]) <= getStartingPrice(asc[i]));
  }

  const desc = sortMarketplaceProducts(MARKETPLACE_PRODUCTS, 'price-desc');
  for (let i = 1; i < desc.length; i++) {
    assert.ok(getStartingPrice(desc[i - 1]) >= getStartingPrice(desc[i]));
  }

  const top = sortMarketplaceProducts(MARKETPLACE_PRODUCTS, 'rating');
  assert.equal(top[0].rating, 5.0);
});

test('makeCartKey, parseCartKey, and calculateMarketplaceCart handle mixed digital + physical POD items', () => {
  const key = makeCartKey('book-little-moon-picnic', 'pod-paperback');
  assert.deepEqual(parseCartKey(key), {
    productId: 'book-little-moon-picnic',
    variantId: 'pod-paperback',
  });

  // Digital only: always qualifies for free shipping
  const digitalSummary = calculateMarketplaceCart(
    {
      [makeCartKey('book-little-moon-picnic', 'digital-pdf')]: 1, // $6.99
      [makeCartKey('clipart-25pc-kawaii-svg', 'personal-zip')]: 1, // $5.99
    },
    MARKETPLACE_PRODUCTS,
    25
  );
  assert.equal(digitalSummary.totalItems, 2);
  assert.equal(digitalSummary.digitalSubtotal, 12.98);
  assert.equal(digitalSummary.physicalSubtotal, 0);
  assert.equal(digitalSummary.hasPhysicalItems, false);
  assert.equal(digitalSummary.qualifiesForFreeShipping, true);

  // Mixed cart below $25 physical shipping threshold
  const mixedPartial = calculateMarketplaceCart(
    {
      [makeCartKey('book-little-moon-picnic', 'pod-paperback')]: 2, // $23.98 physical
      [makeCartKey('deck-bedtime-affirmations', 'standard-pdf')]: 1, // $4.99 digital
    },
    MARKETPLACE_PRODUCTS,
    25
  );
  assert.equal(mixedPartial.totalItems, 3);
  assert.equal(mixedPartial.physicalSubtotal, 23.98);
  assert.equal(mixedPartial.digitalSubtotal, 4.99);
  assert.equal(mixedPartial.subtotal, 28.97);
  assert.equal(mixedPartial.hasPhysicalItems, true);
  assert.equal(mixedPartial.qualifiesForFreeShipping, false);
  assert.equal(mixedPartial.amountToFreeShipping, 1.02);

  // Crossing $25 physical threshold unlocks free shipping
  const mixedFree = calculateMarketplaceCart(
    {
      [makeCartKey('book-little-moon-picnic', 'pod-paperback')]: 3, // $35.97 physical
    },
    MARKETPLACE_PRODUCTS,
    25
  );
  assert.equal(mixedFree.qualifiesForFreeShipping, true);
  assert.equal(mixedFree.amountToFreeShipping, 0);
});

test('validateCheckoutForm enforces required customer details and physical shipping address when needed', () => {
  assert.equal(
    validateCheckoutForm({
      customerName: '',
      customerEmail: 'parent@example.com',
      needsShipping: false,
      shippingAddress: '',
    }).valid,
    false
  );
  assert.equal(
    validateCheckoutForm({
      customerName: 'Maya Lin',
      customerEmail: 'not-an-email',
      needsShipping: false,
      shippingAddress: '',
    }).valid,
    false
  );
  assert.equal(
    validateCheckoutForm({
      customerName: 'Maya Lin',
      customerEmail: 'maya@example.com',
      needsShipping: true,
      shippingAddress: '123',
    }).valid,
    false
  );
  assert.equal(
    validateCheckoutForm({
      customerName: 'Maya Lin',
      customerEmail: 'maya@example.com',
      needsShipping: false,
      shippingAddress: '',
    }).valid,
    true
  );
  assert.equal(
    validateCheckoutForm({
      customerName: 'Maya Lin',
      customerEmail: 'maya@example.com',
      needsShipping: true,
      shippingAddress: '742 Evergreen Terrace, Apt 4B',
    }).valid,
    true
  );
});
