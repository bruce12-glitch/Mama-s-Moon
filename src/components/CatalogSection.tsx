import React, { useState } from 'react';
import { Heart, SlidersHorizontal, Star, Check, ShoppingBag } from 'lucide-react';
import {
  DepartmentId,
  FulfillmentCategory,
  MarketplaceProduct,
  PRODUCT_DEPARTMENTS,
} from '../data/storeCatalog';
import { getStartingPrice, SortOption } from '../utils/storeLogic';

interface CatalogSectionProps {
  products: MarketplaceProduct[];
  totalCatalogCount: number;
  selectedDepartment: DepartmentId;
  selectedFulfillment: FulfillmentCategory;
  maxPrice: number | null;
  searchQuery: string;
  savedOnly: boolean;
  sortBy: SortOption;
  savedIds: Set<string>;
  recentlyAddedId: string | null;
  departmentCounts: Record<string, number>;
  onSelectDepartment: (dept: DepartmentId) => void;
  onSelectFulfillment: (f: FulfillmentCategory) => void;
  onSelectMaxPrice: (p: number | null) => void;
  onToggleSavedOnly: (v: boolean) => void;
  onChangeSort: (s: SortOption) => void;
  onClearFilters: () => void;
  onToggleSave: (productId: string) => void;
  onQuickAdd: (product: MarketplaceProduct) => void;
  onInspectProduct: (product: MarketplaceProduct) => void;
}

const FULFILLMENT_OPTIONS: { id: FulfillmentCategory; label: string }[] = [
  { id: 'all', label: 'All Fulfillment Types' },
  { id: 'physical-digital', label: 'Physical POD + Digital PDF' },
  { id: 'instant-digital', label: 'Instant Digital Download' },
  { id: 'pod-cricut', label: 'POD Kiss-Cut + Cricut PDF' },
  { id: 'printable-pdf', label: 'Printable PDF' },
  { id: 'printify-pod', label: 'Print-on-Demand (Printify)' },
  { id: 'zip-digital', label: 'ZIP Digital Download' },
];

const PRICE_CEILINGS: { value: number | null; label: string }[] = [
  { value: null, label: 'Any price ($3.99 – $39.99)' },
  { value: 7, label: 'Under $7.00' },
  { value: 10, label: 'Under $10.00' },
  { value: 15, label: 'Under $15.00' },
  { value: 25, label: 'Under $25.00' },
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  totalCatalogCount,
  selectedDepartment,
  selectedFulfillment,
  maxPrice,
  searchQuery,
  savedOnly,
  sortBy,
  savedIds,
  recentlyAddedId,
  departmentCounts,
  onSelectDepartment,
  onSelectFulfillment,
  onSelectMaxPrice,
  onToggleSavedOnly,
  onChangeSort,
  onClearFilters,
  onToggleSave,
  onQuickAdd,
  onInspectProduct,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters =
    selectedDepartment !== 'all' ||
    selectedFulfillment !== 'all' ||
    maxPrice !== null ||
    Boolean(searchQuery.trim()) ||
    savedOnly;

  const activeDeptName =
    selectedDepartment === 'all'
      ? 'All Kids Products'
      : PRODUCT_DEPARTMENTS.find((d) => d.id === selectedDepartment)?.name ??
        'Filtered Products';

  return (
    <section
      className="catalog-section"
      id="catalog"
      aria-labelledby="catalog-heading"
    >
      <div className="shell catalog-layout">
        <aside
          className={`catalog-sidebar ${mobileFiltersOpen ? 'is-open' : ''}`}
          aria-label="Filter products"
        >
          <div className="sidebar-header">
            <h2>Filter Catalog</h2>
            {hasActiveFilters && (
              <button
                type="button"
                className="sidebar-clear-btn"
                onClick={onClearFilters}
              >
                Reset all
              </button>
            )}
          </div>

          <div className="filter-group">
            <h3>Product Format</h3>
            <ul className="filter-radio-list">
              <li>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="dept-filter"
                    checked={selectedDepartment === 'all'}
                    onChange={() => onSelectDepartment('all')}
                  />
                  <span>All Departments</span>
                  <span className="filter-count tabular-nums">{totalCatalogCount}</span>
                </label>
              </li>
              {PRODUCT_DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="dept-filter"
                      checked={selectedDepartment === dept.id}
                      onChange={() => onSelectDepartment(dept.id)}
                    />
                    <span>{dept.shortName}</span>
                    <span className="filter-count tabular-nums">
                      {departmentCounts[dept.id] || 0}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Fulfillment Type</h3>
            <ul className="filter-radio-list">
              {FULFILLMENT_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="fulfillment-filter"
                      checked={selectedFulfillment === opt.id}
                      onChange={() => onSelectFulfillment(opt.id)}
                    />
                    <span>{opt.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Starting Price</h3>
            <ul className="filter-radio-list">
              {PRICE_CEILINGS.map((tier) => (
                <li key={String(tier.value)}>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={maxPrice === tier.value}
                      onChange={() => onSelectMaxPrice(tier.value)}
                    />
                    <span>{tier.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group filter-group-last">
            <label className="filter-option filter-checkbox">
              <input
                type="checkbox"
                checked={savedOnly}
                onChange={(e) => onToggleSavedOnly(e.target.checked)}
              />
              <span>Saved wishlist only ({savedIds.size})</span>
            </label>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-toolbar">
            <div>
              <h2 id="catalog-heading">{activeDeptName}</h2>
              <p className="catalog-results-meta">
                Showing <strong className="tabular-nums">{products.length}</strong> of{' '}
                <span className="tabular-nums">{totalCatalogCount}</span> items
                {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
              </p>
            </div>

            <div className="catalog-toolbar-controls">
              <button
                type="button"
                className="mobile-filter-toggle"
                aria-expanded={mobileFiltersOpen}
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filters'}</span>
              </button>

              <div className="sort-select-wrap">
                <label htmlFor="catalog-sort-select">Sort by:</label>
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e) => onChangeSort(e.target.value as SortOption)}
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="catalog-empty">
              <h3>No matching kids items found</h3>
              <p>
                Try clearing your search terms or switching back to all product formats and price
                tiers.
              </p>
              <button
                type="button"
                className="btn-store-primary"
                onClick={onClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="catalog-product-grid">
              {products.map((product) => {
                const startPrice = getStartingPrice(product);
                const maxVarPrice = Math.max(...product.variants.map((v) => v.price));
                const isSaved = savedIds.has(product.id);
                const isJustAdded = recentlyAddedId === product.id;

                return (
                  <article key={product.id} className="product-card" id={product.id}>
                    <div
                      className="product-card-media"
                      onClick={() => onInspectProduct(product)}
                    >
                      {product.tagText && (
                        <span className="product-corner-tag">{product.tagText}</span>
                      )}
                      <button
                        type="button"
                        className={`product-wish-btn ${isSaved ? 'is-saved' : ''}`}
                        aria-label={
                          isSaved
                            ? `Remove ${product.title} from wishlist`
                            : `Save ${product.title} to wishlist`
                        }
                        aria-pressed={isSaved}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(product.id);
                        }}
                      >
                        <Heart
                          size={17}
                          fill={isSaved ? 'currentColor' : 'none'}
                          aria-hidden="true"
                        />
                      </button>
                      <img
                        src={product.image}
                        alt={product.title}
                        width={480}
                        height={360}
                      />
                    </div>

                    <div className="product-card-body">
                      <p className="product-meta-line">
                        {product.fulfillmentType} · {product.ageRange}
                      </p>
                      <h3 className="product-card-title">
                        <button
                          type="button"
                          onClick={() => onInspectProduct(product)}
                        >
                          {product.title}
                        </button>
                      </h3>

                      <div className="product-rating-row">
                        <span className="product-stars" aria-label={`Rated ${product.rating} out of 5`}>
                          <Star size={14} fill="#F59E0B" stroke="#F59E0B" aria-hidden="true" />
                          <strong className="tabular-nums">{product.rating.toFixed(1)}</strong>
                        </span>
                        <span className="product-reviews tabular-nums">
                          ({product.reviewCount} parent reviews)
                        </span>
                      </div>

                      <p className="product-subtitle">{product.subtitle}</p>

                      <div className="product-price-channel-row">
                        <div className="product-price-block">
                          <span className="product-price tabular-nums">
                            {startPrice === maxVarPrice
                              ? `$${startPrice.toFixed(2)}`
                              : `$${startPrice.toFixed(2)} – $${maxVarPrice.toFixed(2)}`}
                          </span>
                          <span className="product-channel-note">
                            {product.bestChannel}
                          </span>
                        </div>
                      </div>

                      <div className="product-card-actions">
                        <button
                          type="button"
                          className={`btn-card-add whitespace-nowrap ${
                            isJustAdded ? 'is-added' : ''
                          }`}
                          onClick={() => onQuickAdd(product)}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={15} aria-hidden="true" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={15} aria-hidden="true" />
                              <span>Quick Add</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn-card-options whitespace-nowrap"
                          onClick={() => onInspectProduct(product)}
                        >
                          Options ({product.variants.length})
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
