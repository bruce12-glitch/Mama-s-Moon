import {
  DepartmentId,
  FulfillmentCategory,
  MarketplaceProduct,
} from '../data/storeCatalog';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface CatalogFilterCriteria {
  department: DepartmentId;
  fulfillment: FulfillmentCategory;
  maxPrice: number | null;
  query: string;
  savedOnly: boolean;
  savedIds: Set<string>;
}

export function makeCartKey(productId: string, variantId: string): string {
  return `${productId}::${variantId}`;
}

export function parseCartKey(cartKey: string): { productId: string; variantId: string } {
  const sepIdx = cartKey.indexOf('::');
  if (sepIdx === -1) {
    return { productId: cartKey, variantId: '' };
  }
  return {
    productId: cartKey.slice(0, sepIdx),
    variantId: cartKey.slice(sepIdx + 2),
  };
}

export function getStartingPrice(product: MarketplaceProduct): number {
  if (!product.variants.length) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

export function filterMarketplaceProducts(
  products: MarketplaceProduct[],
  criteria: CatalogFilterCriteria
): MarketplaceProduct[] {
  const normalizedQuery = criteria.query.toLowerCase().trim();
  const tokens = normalizedQuery ? normalizedQuery.split(/\s+/).filter(Boolean) : [];

  return products.filter((product) => {
    if (criteria.savedOnly && !criteria.savedIds.has(product.id)) {
      return false;
    }
    if (criteria.department !== 'all' && product.department !== criteria.department) {
      return false;
    }
    if (criteria.fulfillment !== 'all' && product.fulfillmentCategory !== criteria.fulfillment) {
      return false;
    }
    if (criteria.maxPrice !== null) {
      const minPrice = getStartingPrice(product);
      if (minPrice > criteria.maxPrice) {
        return false;
      }
    }
    if (tokens.length > 0) {
      const haystack = `${product.title} ${product.departmentLabel} ${product.fulfillmentType} ${product.bestChannel} ${product.subtitle} ${product.keywords}`.toLowerCase();
      if (!tokens.every((t) => haystack.includes(t))) {
        return false;
      }
    }
    return true;
  });
}

export function sortMarketplaceProducts(
  products: MarketplaceProduct[],
  sortBy: SortOption
): MarketplaceProduct[] {
  const copy = [...products];
  switch (sortBy) {
    case 'price-asc':
      return copy.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
    case 'price-desc':
      return copy.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'featured':
    default:
      return copy;
  }
}

export interface CartLineDetail {
  cartKey: string;
  product: MarketplaceProduct;
  variant: MarketplaceProduct['variants'][number];
  quantity: number;
  lineTotal: number;
}

export interface MarketplaceCartSummary {
  lines: CartLineDetail[];
  totalItems: number;
  physicalSubtotal: number;
  digitalSubtotal: number;
  subtotal: number;
  hasPhysicalItems: boolean;
  qualifiesForFreeShipping: boolean;
  amountToFreeShipping: number;
}

export function calculateMarketplaceCart(
  cartQuantities: Record<string, number>,
  products: MarketplaceProduct[],
  freeShippingThreshold = 25
): MarketplaceCartSummary {
  const productById = new Map<string, MarketplaceProduct>();
  for (const p of products) {
    productById.set(p.id, p);
  }

  const lines: CartLineDetail[] = [];
  let totalItems = 0;
  let physicalSubtotal = 0;
  let digitalSubtotal = 0;

  for (const [key, rawQty] of Object.entries(cartQuantities)) {
    const quantity = Math.max(0, Math.floor(rawQty || 0));
    if (quantity <= 0) continue;

    const { productId, variantId } = parseCartKey(key);
    const product = productById.get(productId);
    if (!product) continue;

    const variant =
      product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    if (!variant) continue;

    const lineTotal = Math.round(variant.price * quantity * 100) / 100;
    totalItems += quantity;

    if (variant.isPhysical) {
      physicalSubtotal += lineTotal;
    } else {
      digitalSubtotal += lineTotal;
    }

    lines.push({
      cartKey: makeCartKey(product.id, variant.id),
      product,
      variant,
      quantity,
      lineTotal,
    });
  }

  const roundedPhysical = Math.round(physicalSubtotal * 100) / 100;
  const roundedDigital = Math.round(digitalSubtotal * 100) / 100;
  const subtotal = Math.round((roundedPhysical + roundedDigital) * 100) / 100;
  const hasPhysicalItems = roundedPhysical > 0;
  const qualifiesForFreeShipping = !hasPhysicalItems || roundedPhysical >= freeShippingThreshold;
  const amountToFreeShipping = hasPhysicalItems
    ? Math.max(0, Math.round((freeShippingThreshold - roundedPhysical) * 100) / 100)
    : 0;

  return {
    lines,
    totalItems,
    physicalSubtotal: roundedPhysical,
    digitalSubtotal: roundedDigital,
    subtotal,
    hasPhysicalItems,
    qualifiesForFreeShipping,
    amountToFreeShipping,
  };
}

export interface CheckoutInput {
  customerName: string;
  customerEmail: string;
  needsShipping: boolean;
  shippingAddress: string;
}

export function validateCheckoutForm(input: CheckoutInput): {
  valid: boolean;
  error: string;
} {
  if (!input.customerName.trim()) {
    return { valid: false, error: 'Please enter a recipient name for your order.' };
  }
  const email = input.customerEmail.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      valid: false,
      error: 'Please enter a valid email address for your digital downloads and receipt.',
    };
  }
  if (input.needsShipping && input.shippingAddress.trim().length < 8) {
    return {
      valid: false,
      error: 'Please enter a street address for your physical POD / Printify items.',
    };
  }
  return { valid: true, error: '' };
}
