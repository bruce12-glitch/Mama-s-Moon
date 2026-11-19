import React from 'react';
import { LaptopStickerFinish, LaptopStickerProduct } from '../data/moonMeshData';
import { BrandName } from './BrandName';
import { WishlistHeartButton } from './WishlistHeartButton';

const LAPTOP_FINISH_TABS: { id: LaptopStickerFinish; label: string }[] = [
  { id: 'all', label: 'All Decals (4)' },
  { id: 'matte', label: 'Matte Vinyl' },
  { id: 'holographic', label: 'Holographic' },
  { id: 'lid-set', label: 'Laptop Lid Sets' },
];

interface LaptopStickersSectionProps {
  packs: LaptopStickerProduct[];
  selectedFinish: LaptopStickerFinish;
  bagQuantities: Record<string, number>;
  wishlistIds: Set<string>;
  recentlyAddedId: string | null;
  onSelectFinish: (finish: LaptopStickerFinish) => void;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (productId: string) => void;
  onPreviewPack: (pack: LaptopStickerProduct) => void;
  onOpenBag: () => void;
  totalBagItems: number;
}

export const LaptopStickersSection: React.FC<LaptopStickersSectionProps> = ({
  packs,
  selectedFinish,
  bagQuantities,
  wishlistIds,
  recentlyAddedId,
  onSelectFinish,
  onToggleWishlist,
  onAddToBag,
  onPreviewPack,
  onOpenBag,
  totalBagItems,
}) => {
  return (
    <section
      className="laptop-stickers-section"
      id="laptop-stickers"
      aria-labelledby="laptop-stickers-title"
    >
      <div className="shell">
        <div className="store-section-header">
          <div>
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              <BrandName /> Laptop Decals
            </p>
            <h2 id="laptop-stickers-title">Laptop stickers that peel clean.</h2>
            <p className="store-section-lead">
              Oversized 3&ndash;4&Prime; waterproof vinyl decals crafted for aluminum laptop lids,
              iPad folios, and travel sleeves. Scratch-proof UV laminate with zero sticky residue
              when you swap styles.
            </p>
          </div>

          <div
            className="store-filter-bar"
            role="tablist"
            aria-label="Filter laptop stickers by finish"
          >
            {LAPTOP_FINISH_TABS.map((tab) => {
              const isActive = selectedFinish === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`store-filter-btn whitespace-nowrap shrink-0 ${
                    isActive ? 'is-active' : ''
                  }`}
                  onClick={() => onSelectFinish(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="laptop-stickers-grid">
          {packs.map((pack) => {
            const isAdded = recentlyAddedId === pack.id;
            const inBagCount = bagQuantities[pack.id] || 0;

            return (
              <article key={pack.id} className="laptop-sticker-card" id={pack.id}>
                <div className="card-stage-wrap">
                  <button
                    type="button"
                    className="laptop-sticker-stage"
                    style={{ backgroundColor: pack.bgTint }}
                    aria-label={`Preview ${pack.title} on laptop lid`}
                    onClick={() => onPreviewPack(pack)}
                  >
                    {pack.badge && <span className="store-corner-tag">{pack.badge}</span>}
                    <div className="laptop-sticker-photo-wrap">
                      <img
                        src={pack.image}
                        width={800}
                        height={600}
                        alt={pack.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="laptop-sticker-img"
                      />
                    </div>
                  </button>
                  <WishlistHeartButton
                    itemId={pack.id}
                    itemTitle={pack.title}
                    isSaved={wishlistIds.has(pack.id)}
                    onToggle={onToggleWishlist}
                  />
                </div>

                <div className="laptop-sticker-body">
                  <p className="store-meta-line">
                    {pack.finishLabel} &middot; {pack.decalCount} decals &middot; {pack.sizeSpec}
                  </p>

                  <div className="laptop-sticker-title-row">
                    <h3>
                      <button
                        type="button"
                        className="store-card-title-btn"
                        onClick={() => onPreviewPack(pack)}
                      >
                        {pack.title}
                      </button>
                    </h3>
                    <span className="laptop-sticker-price tabular-nums">
                      ${pack.price.toFixed(2)}
                      {pack.compareAtPrice && (
                        <small className="store-compare-price">
                          ${pack.compareAtPrice.toFixed(2)}
                        </small>
                      )}
                    </span>
                  </div>

                  <p className="laptop-sticker-desc">{pack.subtitle}</p>
                  <p className="laptop-sticker-spec-line">{pack.fitDevices}</p>

                  <div className="laptop-sticker-actions">
                    <button
                      type="button"
                      className={`button ${
                        isAdded ? 'button-yellow' : 'button-ink'
                      } whitespace-nowrap shrink-0`}
                      onClick={() => onAddToBag(pack.id)}
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
                      onClick={() => onPreviewPack(pack)}
                    >
                      Lid Preview
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="store-section-foot">
          <p>
            Residue-free low-tack vinyl &middot; Weatherproof UV laminate &middot; Qualifies for free
            studio shipping over <strong className="tabular-nums">$25.00</strong>
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
