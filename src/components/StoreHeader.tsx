import React from 'react';
import {
  Palette,
  Heart,
  ShoppingCart,
  Search,
  X,
  BookOpen,
} from 'lucide-react';
import {
  DepartmentId,
  PRODUCT_DEPARTMENTS,
} from '../data/storeCatalog';
import { BrandName } from './BrandName';

interface StoreHeaderProps {
  selectedDepartment: DepartmentId;
  searchQuery: string;
  cartCount: number;
  savedCount: number;
  onSelectDepartment: (dept: DepartmentId, scrollToCatalog?: boolean) => void;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStudio: () => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  selectedDepartment,
  searchQuery,
  cartCount,
  savedCount,
  onSelectDepartment,
  onSearchChange,
  onSearchSubmit,
  onOpenCart,
  onOpenWishlist,
  onOpenStudio,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="store-header" id="top">
      <div className="store-promo-strip">
        <div className="shell store-promo-inner">
          <span>
            Instant Digital PDF &amp; ZIP Downloads · Amazon KDP Books · Printify Organic Totes &amp; Blankets
          </span>
          <span className="store-promo-highlight">
            Free Physical Shipping Over $25.00
          </span>
        </div>
      </div>

      <div className="store-topbar">
        <div className="shell store-topbar-inner">
          <a
            href="#top"
            className="store-brand-link"
            aria-label="Mama's Moon Kids Store Home"
            onClick={(e) => {
              e.preventDefault();
              onSelectDepartment('all', false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <BrandName className="store-header-brand" />
            <span className="store-brand-sub">Kids Marketplace</span>
          </a>

          <form
            className="store-search-bar"
            role="search"
            aria-label="Search Mama's Moon Kids Store"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="header-dept-select" className="visually-hidden">
              Department
            </label>
            <select
              id="header-dept-select"
              className="store-search-select"
              value={selectedDepartment}
              onChange={(e) =>
                onSelectDepartment(e.target.value as DepartmentId, true)
              }
            >
              <option value="all">All Formats</option>
              {PRODUCT_DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.shortName}
                </option>
              ))}
            </select>

            <div className="store-search-input-wrap">
              <label htmlFor="header-search-input" className="visually-hidden">
                Search products
              </label>
              <input
                id="header-search-input"
                type="search"
                className="store-search-input"
                placeholder="Search 40-page books, nursery sets, Cricut stickers, blankets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="store-search-clear"
                  aria-label="Clear search query"
                  onClick={() => onSearchChange('')}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="store-search-submit"
              aria-label="Search marketplace"
            >
              <Search size={18} aria-hidden="true" />
              <span className="store-search-btn-label">Search</span>
            </button>
          </form>

          <div className="store-header-actions">
            <button
              type="button"
              className="store-header-action-btn store-studio-btn whitespace-nowrap shrink-0"
              onClick={onOpenStudio}
            >
              <Palette size={17} aria-hidden="true" />
              <span>Coloring Studio</span>
            </button>

            <button
              type="button"
              id="header-wishlist-btn"
              className="store-header-action-btn whitespace-nowrap shrink-0"
              aria-label={`Open saved wishlist, ${savedCount} items`}
              onClick={onOpenWishlist}
            >
              <Heart size={17} aria-hidden="true" />
              <span className="action-text">Saved</span>
              <span className="action-count tabular-nums">{savedCount}</span>
            </button>

            <button
              type="button"
              id="header-cart-btn"
              className="store-cart-btn whitespace-nowrap shrink-0"
              aria-label={`Open shopping cart, ${cartCount} items`}
              onClick={onOpenCart}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              <span>Cart</span>
              <span className="cart-count-pill tabular-nums">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="store-dept-nav" aria-label="Product departments">
        <div className="shell store-dept-nav-inner">
          <button
            type="button"
            className={`store-dept-link whitespace-nowrap ${
              selectedDepartment === 'all' ? 'is-active' : ''
            }`}
            onClick={() => onSelectDepartment('all', true)}
          >
            All Products (15)
          </button>
          {PRODUCT_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              className={`store-dept-link whitespace-nowrap ${
                selectedDepartment === dept.id ? 'is-active' : ''
              }`}
              onClick={() => onSelectDepartment(dept.id, true)}
            >
              {dept.shortName}
            </button>
          ))}
          <a href="#format-guide" className="store-dept-link store-dept-guide-link whitespace-nowrap">
            <BookOpen size={14} aria-hidden="true" />
            <span>Fulfillment Guide</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
