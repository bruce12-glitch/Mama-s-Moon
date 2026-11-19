/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  DepartmentId,
  FulfillmentCategory,
  MARKETPLACE_PRODUCTS,
  MarketplaceProduct,
} from './data/storeCatalog';
import {
  calculateMarketplaceCart,
  filterMarketplaceProducts,
  makeCartKey,
  sortMarketplaceProducts,
  SortOption,
} from './utils/storeLogic';
import { StoreHeader } from './components/StoreHeader';
import { MarketplaceHero } from './components/MarketplaceHero';
import { DepartmentGrid } from './components/DepartmentGrid';
import { CatalogSection } from './components/CatalogSection';
import { ProductMatrixSection } from './components/ProductMatrixSection';
import {
  CartModal,
  ProductDetailModal,
  WishlistModal,
} from './components/StoreModals';
import { ColoringStudioModal } from './components/ColoringStudioModal';

const CART_STORAGE_KEY = 'mamas-moon-kids-cart-v1';
const WISHLIST_STORAGE_KEY = 'mamas-moon-kids-saved-v1';
const VALID_PRODUCT_IDS = new Set(MARKETPLACE_PRODUCTS.map((p) => p.id));

export default function App() {
  // Storefront filters & sort state
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentId>('all');
  const [selectedFulfillment, setSelectedFulfillment] =
    useState<FulfillmentCategory>('all');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Modals state
  const [inspectedProduct, setInspectedProduct] =
    useState<MarketplaceProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Persisted Cart state (composite keys productId::variantId -> quantity)
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    () => {
      try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartQuantities));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartQuantities]);

  // Persisted Wishlist state
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!raw) return new Set<string>();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? new Set(
            parsed.filter(
              (id): id is string =>
                typeof id === 'string' && VALID_PRODUCT_IDS.has(id)
            )
          )
        : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([...savedIds]));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of MARKETPLACE_PRODUCTS) {
      counts[p.department] = (counts[p.department] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = filterMarketplaceProducts(MARKETPLACE_PRODUCTS, {
      department: selectedDepartment,
      fulfillment: selectedFulfillment,
      maxPrice,
      query: searchQuery,
      savedOnly,
      savedIds,
    });
    return sortMarketplaceProducts(filtered, sortBy);
  }, [
    selectedDepartment,
    selectedFulfillment,
    maxPrice,
    searchQuery,
    savedOnly,
    savedIds,
    sortBy,
  ]);

  const cartSummary = useMemo(
    () => calculateMarketplaceCart(cartQuantities, MARKETPLACE_PRODUCTS, 25),
    [cartQuantities]
  );

  const savedProducts = useMemo(
    () => MARKETPLACE_PRODUCTS.filter((p) => savedIds.has(p.id)),
    [savedIds]
  );

  const scrollToCatalog = () => {
    document
      .getElementById('catalog')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectDepartment = (dept: DepartmentId, shouldScroll = true) => {
    setSelectedDepartment(dept);
    if (shouldScroll) scrollToCatalog();
  };

  const handleClearFilters = () => {
    setSelectedDepartment('all');
    setSelectedFulfillment('all');
    setMaxPrice(null);
    setSearchQuery('');
    setSavedOnly(false);
    setSortBy('featured');
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else if (VALID_PRODUCT_IDS.has(productId)) {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddToCart = (
    productId: string,
    variantId: string,
    qty = 1
  ) => {
    const key = makeCartKey(productId, variantId);
    setCartQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + qty,
    }));
    setRecentlyAddedId(productId);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === productId ? null : curr));
    }, 1500);
  };

  const handleQuickAdd = (product: MarketplaceProduct) => {
    const defaultVariant = product.variants[0];
    if (!defaultVariant) return;
    handleAddToCart(product.id, defaultVariant.id, 1);
  };

  const handleUpdateCartQty = (cartKey: string, delta: number) => {
    setCartQuantities((prev) => {
      const nextQty = Math.max(0, (prev[cartKey] || 0) + delta);
      const next = { ...prev };
      if (nextQty === 0) {
        delete next[cartKey];
      } else {
        next[cartKey] = nextQty;
      }
      return next;
    });
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to catalog
      </a>

      {/* SVG Symbols used by ColoringStudioModal */}
      <svg className="symbols" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <symbol id="spark" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 0c1.8 7.2 4.8 10.2 12 12-7.2 1.8-10.2 4.8-12 12C10.2 16.8 7.2 13.8 0 12 7.2 10.2 10.2 7.2 12 0Z"
          />
        </symbol>
        <symbol id="download" viewBox="0 0 24 24">
          <path
            d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="close" viewBox="0 0 24 24">
          <path
            d="m6 6 12 12M18 6 6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </symbol>
      </svg>

      <StoreHeader
        selectedDepartment={selectedDepartment}
        searchQuery={searchQuery}
        cartCount={cartSummary.totalItems}
        savedCount={savedIds.size}
        onSelectDepartment={handleSelectDepartment}
        onSearchChange={setSearchQuery}
        onSearchSubmit={scrollToCatalog}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      <main id="main">
        <MarketplaceHero
          onShopCatalog={scrollToCatalog}
          onSelectDepartment={(dept) => handleSelectDepartment(dept, true)}
          onOpenStudio={() => setIsStudioOpen(true)}
        />

        <DepartmentGrid
          selectedDepartment={selectedDepartment}
          onSelectDepartment={(dept) => handleSelectDepartment(dept, true)}
        />

        <CatalogSection
          products={visibleProducts}
          totalCatalogCount={MARKETPLACE_PRODUCTS.length}
          selectedDepartment={selectedDepartment}
          selectedFulfillment={selectedFulfillment}
          maxPrice={maxPrice}
          searchQuery={searchQuery}
          savedOnly={savedOnly}
          sortBy={sortBy}
          savedIds={savedIds}
          recentlyAddedId={recentlyAddedId}
          departmentCounts={departmentCounts}
          onSelectDepartment={setSelectedDepartment}
          onSelectFulfillment={setSelectedFulfillment}
          onSelectMaxPrice={setMaxPrice}
          onToggleSavedOnly={setSavedOnly}
          onChangeSort={setSortBy}
          onClearFilters={handleClearFilters}
          onToggleSave={handleToggleSave}
          onQuickAdd={handleQuickAdd}
          onInspectProduct={setInspectedProduct}
        />

        <ProductMatrixSection
          onSelectDepartment={(dept) => handleSelectDepartment(dept, true)}
          onOpenStudio={() => setIsStudioOpen(true)}
        />
      </main>

      <ProductDetailModal
        product={inspectedProduct}
        isSaved={inspectedProduct ? savedIds.has(inspectedProduct.id) : false}
        onClose={() => setInspectedProduct(null)}
        onToggleSave={handleToggleSave}
        onAddToCart={handleAddToCart}
      />

      <CartModal
        isOpen={isCartOpen}
        summary={cartSummary}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={() => setCartQuantities({})}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        savedProducts={savedProducts}
        onClose={() => setIsWishlistOpen(false)}
        onInspect={setInspectedProduct}
        onQuickAdd={handleQuickAdd}
        onRemoveSaved={handleToggleSave}
      />

      <ColoringStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />
    </>
  );
}
