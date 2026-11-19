import React from 'react';
import { ArrowRight, Sparkles, Truck, Zap, ShieldCheck } from 'lucide-react';
import { DepartmentId } from '../data/storeCatalog';

interface MarketplaceHeroProps {
  onShopCatalog: () => void;
  onSelectDepartment: (dept: DepartmentId) => void;
  onOpenStudio: () => void;
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  onShopCatalog,
  onSelectDepartment,
  onOpenStudio,
}) => {
  return (
    <section className="store-hero" aria-labelledby="hero-title">
      <div className="shell store-hero-grid">
        <div className="store-hero-copy">
          <p className="store-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            Mama&apos;s Moon Kids Storefront · 6 Creative Formats
          </p>
          <h1 id="hero-title">
            The cozy kids marketplace for colouring books, nursery art &amp; crafts.
          </h1>
          <p className="store-hero-lead">
            Shop curated screen-free storybooks, instant nursery wall prints, kiss-cut stickers,
            bedtime affirmation decks, organic Printify totes &amp; blankets, and SVG craft bundles
            — all priced from <strong>$3.99</strong>.
          </p>

          <div className="store-hero-actions">
            <button
              type="button"
              className="btn-store-primary whitespace-nowrap"
              onClick={onShopCatalog}
            >
              <span>Shop All Products</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-store-secondary whitespace-nowrap"
              onClick={onOpenStudio}
            >
              Try Free Coloring Studio
            </button>
          </div>

          <div className="store-trust-row" aria-label="Marketplace highlights">
            <div className="store-trust-item">
              <Zap size={16} aria-hidden="true" />
              <span>Instant PDF &amp; ZIP downloads</span>
            </div>
            <div className="store-trust-item">
              <Truck size={16} aria-hidden="true" />
              <span>Free POD shipping over $25</span>
            </div>
            <div className="store-trust-item">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Amazon KDP, Etsy &amp; Printify verified</span>
            </div>
          </div>
        </div>

        <div className="store-hero-showcase">
          <button
            type="button"
            className="hero-featured-spotlight"
            onClick={() => onSelectDepartment('books')}
            aria-label="Shop 40-page Colouring and Activity Books"
          >
            <div className="hero-spotlight-media">
              <img
                src="/assets/hero-book-showcase.png"
                alt="Mama's Moon 40-page Colouring & Activity Books showcase"
                width={720}
                height={520}
              />
            </div>
            <div className="hero-spotlight-footer">
              <div>
                <p className="spotlight-label">Featured Department</p>
                <strong>Colouring &amp; Activity Books (40 Pages)</strong>
              </div>
              <span className="spotlight-price tabular-nums">$6.99 – $11.99</span>
            </div>
          </button>

          <div className="hero-mini-picks">
            <button
              type="button"
              className="hero-mini-card"
              onClick={() => onSelectDepartment('nursery')}
            >
              <img
                src="/assets/product-nursery-wall-set.jpg"
                alt="Nursery Gallery Wall Set"
                width={280}
                height={210}
              />
              <div>
                <strong>Nursery Wall Sets</strong>
                <span className="tabular-nums">$7.99 – $14.99</span>
              </div>
            </button>

            <button
              type="button"
              className="hero-mini-card"
              onClick={() => onSelectDepartment('stickers')}
            >
              <img
                src="/assets/laptop-sticker-cozy-coder.jpg"
                alt="Die-Cut Sticker Sheet & Cricut Pack"
                width={280}
                height={210}
              />
              <div>
                <strong>Stickers &amp; Cricut PDF</strong>
                <span className="tabular-nums">$3.99 – $6.99</span>
              </div>
            </button>

            <button
              type="button"
              className="hero-mini-card"
              onClick={() => onSelectDepartment('textiles')}
            >
              <img
                src="/assets/product-tote-baby-blanket.jpg"
                alt="Seamless Pattern Tote Bag & Baby Blanket"
                width={280}
                height={210}
              />
              <div>
                <strong>Totes &amp; Baby Blankets</strong>
                <span className="tabular-nums">$18.99 – $39.99</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
