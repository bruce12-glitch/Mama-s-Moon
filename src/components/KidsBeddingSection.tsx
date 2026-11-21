import React, { useState } from 'react';
import {
  KidsBeddingCategory,
  KidsBeddingProduct,
  KidsBeddingSize,
} from '../data/moonMeshData';
import { BrandName } from './BrandName';
import { WishlistHeartButton } from './WishlistHeartButton';
import { isNewArrival } from '../utils/moonMeshLogic';

const BEDDING_CATEGORY_TABS: { id: KidsBeddingCategory; label: string }[] = [
  { id: 'all', label: 'All Bedding (4)' },
  { id: 'sheet-set', label: 'Sheet Sets' },
  { id: 'quilt', label: 'Blankets & Quilts' },
  { id: 'room-bundle', label: 'Room Bundles' },
];

interface KidsBeddingSectionProps {
  items: KidsBeddingProduct[];
  selectedCategory: KidsBeddingCategory;
  selectedSizes: Record<string, KidsBeddingSize>;
  bagQuantities: Record<string, number>;
  wishlistIds: Set<string>;
  recentlyAddedId: string | null;
  onSelectCategory: (category: KidsBeddingCategory) => void;
  onSelectSize: (productId: string, size: KidsBeddingSize) => void;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (productId: string) => void;
  onPreviewItem: (item: KidsBeddingProduct) => void;
  onOpenBag: () => void;
  totalBagItems: number;
}

export const KidsBeddingSection: React.FC<KidsBeddingSectionProps> = ({
  items,
  selectedCategory,
  selectedSizes,
  bagQuantities,
  wishlistIds,
  recentlyAddedId,
  onSelectCategory,
  onSelectSize,
  onToggleWishlist,
  onAddToBag,
  onPreviewItem,
  onOpenBag,
  totalBagItems,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      className="kids-bedding-section"
      id="kids-bedding"
      aria-labelledby="kids-bedding-title"
    >
      <div className="shell">
        <div className="store-section-header">
          <div>
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              <BrandName /> Cozy Kids Room
            </p>
            <h2 id="kids-bedding-title">Kids bedsheets &amp; storybook bedding.</h2>
            <p className="store-section-lead">
              Breathable 100% organic cotton bedsheets, reversible quilts, and nursery room bundles
              adorned with Miso, Plum, and Sprout prints. Gentle on sensitive skin and pre-washed
              for soft, sleepy storytimes.
            </p>
          </div>

          <div
            className="store-filter-bar"
            role="tablist"
            aria-label="Filter kids bedding collections"
          >
            {BEDDING_CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`store-filter-btn whitespace-nowrap shrink-0 ${
                    isActive ? 'is-active' : ''
                  }`}
                  onClick={() => onSelectCategory(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="kids-bedding-grid">
          {items.map((item) => {
            const isAdded = recentlyAddedId === item.id;
            const inBagCount = bagQuantities[item.id] || 0;
            const activeSize = selectedSizes[item.id] || item.defaultSize;
            const imageFailed = Boolean(failedImages[item.id]);
            const isNew = isNewArrival(item.addedAt);

            return (
              <article key={item.id} className="kids-bedding-card" id={item.id}>
                <div className="card-stage-wrap">
                  <button
                    type="button"
                    className="kids-bedding-stage"
                    style={{ backgroundColor: item.bgTint }}
                    aria-label={`Inspect ${item.title}`}
                    onClick={() => onPreviewItem(item)}
                  >
                    {(isNew || item.badge) && (
                      <div className="store-corner-tag-row">
                        {isNew && <span className="store-new-tag">New</span>}
                        {item.badge && <span className="store-corner-tag">{item.badge}</span>}
                      </div>
                    )}
                    <div className="kids-bedding-photo-wrap">
                      {!imageFailed ? (
                        <img
                          src={item.image}
                          width={800}
                          height={600}
                          alt={item.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="kids-bedding-img"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                        />
                      ) : (
                        <div className="kids-bedding-fallback" aria-label={item.title}>
                          <span>{item.categoryLabel}</span>
                          <strong>{item.title}</strong>
                        </div>
                      )}
                    </div>
                  </button>
                  <WishlistHeartButton
                    itemId={item.id}
                    itemTitle={item.title}
                    isSaved={wishlistIds.has(item.id)}
                    onToggle={onToggleWishlist}
                  />
                </div>

                <div className="kids-bedding-body">
                  <p className="store-meta-line">
                    {item.categoryLabel} &middot; {item.pieceCount}
                  </p>

                  <div className="kids-bedding-title-row">
                    <h3>
                      <button
                        type="button"
                        className="store-card-title-btn"
                        onClick={() => onPreviewItem(item)}
                      >
                        {item.title}
                      </button>
                    </h3>
                    <span className="kids-bedding-price tabular-nums">
                      ${item.price.toFixed(2)}
                      {item.compareAtPrice && (
                        <small className="store-compare-price">
                          ${item.compareAtPrice.toFixed(2)}
                        </small>
                      )}
                    </span>
                  </div>

                  <p className="kids-bedding-desc">{item.subtitle}</p>
                  <p className="kids-bedding-spec-line">
                    {item.fabricSpec} &middot; {item.threadCount}
                  </p>

                  <div
                    className="kids-bedding-size-row"
                    role="group"
                    aria-label={`Select bed size for ${item.title}`}
                  >
                    {item.availableSizes.map((size) => {
                      const isSizeActive = activeSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={isSizeActive}
                          className={`kids-bedding-size-btn whitespace-nowrap shrink-0 ${
                            isSizeActive ? 'is-selected' : ''
                          }`}
                          onClick={() => onSelectSize(item.id, size)}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  <div className="kids-bedding-actions">
                    <button
                      type="button"
                      className={`button ${
                        isAdded ? 'button-yellow' : 'button-ink'
                      } whitespace-nowrap shrink-0`}
                      onClick={() => onAddToBag(item.id)}
                    >
                      {isAdded
                        ? 'Added ✓'
                        : inBagCount > 0
                        ? `In Bag (${inBagCount}) · +1`
                        : 'Add to Bag'}
                    </button>
                    <button
                      type="button"
                      className="button button-outline whitespace-nowrap shrink-0"
                      onClick={() => onPreviewItem(item)}
                    >
                      Inspect Set
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="store-section-foot">
          <p>
            100% GOTS organic cotton &middot; Deep 14&Prime; fitted pockets &middot; Qualifies for
            free studio shipping over <strong className="tabular-nums">$25.00</strong>
          </p>
          <button type="button" className="text-link whitespace-nowrap" onClick={onOpenBag}>
            View Studio Bag ({totalBagItems}){' '}
            <svg className="icon" aria-hidden="true">
              <use href="#arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
