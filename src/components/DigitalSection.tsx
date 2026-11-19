import React from 'react';
import { DigitalComboProduct } from '../data/moonMeshData';
import { BrandName } from './BrandName';

interface DigitalSectionProps {
  combos: DigitalComboProduct[];
  totalComboCount: number;
  isExpanded: boolean;
  savedIds: Set<string>;
  onToggleExpand: () => void;
  onToggleSave: (comboId: string) => void;
  onSelectCombo: (combo: DigitalComboProduct) => void;
}

export const DigitalSection: React.FC<DigitalSectionProps> = ({
  combos,
  totalComboCount,
  isExpanded,
  savedIds,
  onToggleExpand,
  onToggleSave,
  onSelectCombo,
}) => {
  return (
    <section className="digital-showcase" id="digital" aria-labelledby="digital-section-title">
      <div className="digital-showcase-shell">
        <div className="digital-showcase-header">
          <h2 id="digital-section-title" className="digital-showcase-heading">
            Digital
          </h2>
          {totalComboCount > 4 && (
            <button
              type="button"
              className="digital-view-more-link"
              aria-expanded={isExpanded}
              onClick={onToggleExpand}
            >
              {isExpanded ? 'View less' : 'View more'}
            </button>
          )}
        </div>

        <div className="digital-combo-grid">
          {combos.map((combo) => {
            const isSaved = savedIds.has(combo.id);
            const topSamples = combo.samplePages.slice(0, 4);
            const bottomSamples = combo.samplePages.slice(4, 8);

            return (
              <article key={combo.id} className="digital-combo-card" id={combo.id}>
                <div className="digital-combo-visual-wrap">
                  <button
                    type="button"
                    className="digital-combo-stage-btn"
                    aria-label={`Preview ${combo.title}, $${combo.price.toFixed(2)}`}
                    onClick={() => onSelectCombo(combo)}
                  >
                    <div className="digital-combo-headline-block">
                      <span
                        className="digital-combo-banner-title"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${combo.headlineColorStart} 0%, ${combo.headlineColorEnd} 100%)`,
                        }}
                      >
                        {combo.comboLabel}: {combo.seriesTitle}
                      </span>
                      <span className="digital-combo-banner-sub">{combo.subtitle}</span>
                    </div>

                    <div className="digital-combo-collage" aria-hidden="true">
                      {/* Fanned background monochrome coloring pages */}
                      <div className="digital-collage-pages-top">
                        {topSamples.map((src, idx) => (
                          <span
                            key={`top-${combo.id}-${idx}`}
                            className={`digital-mini-page mini-page-top-${idx}`}
                          >
                            <img src={src} alt="" loading="lazy" />
                          </span>
                        ))}
                      </div>

                      <div className="digital-collage-pages-bottom">
                        {bottomSamples.map((src, idx) => (
                          <span
                            key={`bot-${combo.id}-${idx}`}
                            className={`digital-mini-page mini-page-bot-${idx}`}
                          >
                            <img src={src} alt="" loading="lazy" />
                          </span>
                        ))}
                      </div>

                      {/* Left square book cover with scalloped 10 Pages badge */}
                      <div
                        className="digital-collage-book"
                        style={{
                          backgroundColor: combo.coverBg,
                          color: combo.coverTextColor,
                        }}
                      >
                        <img
                          src={combo.coverImage}
                          alt=""
                          loading="lazy"
                          className="digital-collage-book-art"
                        />
                        {!combo.hasEmbeddedCoverText && (
                          <div className="digital-collage-book-overlay">
                            <span className="digital-book-brand">Mama&apos;s Moon</span>
                            <strong className="digital-book-series">{combo.seriesTitle}</strong>
                            <span className="digital-book-sub">{combo.pageCount} Digital Coloring Pages</span>
                          </div>
                        )}
                        <span className="digital-pages-scallop" aria-hidden="true">
                          <svg viewBox="0 0 80 80" className="digital-scallop-svg">
                            <path
                              d="M40 4c4.8 0 8.9 3.1 10.4 7.5 4.4-2.1 9.7-.9 12.8 2.9 3.1 3.8 3.2 9.2.2 13.1 4.6 1.2 7.9 5.3 7.9 10.1s-3.3 8.9-7.9 10.1c3 3.9 2.9 9.3-.2 13.1-3.1 3.8-8.4 5-12.8 2.9C48.9 72.9 44.8 76 40 76s-8.9-3.1-10.4-7.5c-4.4 2.1-9.7.9-12.8-2.9-3.1-3.8-3.2-9.2-.2-13.1C12 51.3 8.7 47.2 8.7 42.4s3.3-8.9 7.9-10.1c-3-3.9-2.9-9.3.2-13.1 3.1-3.8 8.4-5 12.8-2.9C31.1 7.1 35.2 4 40 4Z"
                              fill="#F3678B"
                              stroke="#FFFFFF"
                              strokeWidth="3"
                            />
                          </svg>
                          <span className="digital-scallop-label">
                            <strong>{combo.pageCount}</strong>
                            <small>Pages</small>
                          </span>
                        </span>
                      </div>
                    </div>

                    <span className="digital-combo-brand-foot">
                      <BrandName />
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`digital-heart-btn ${isSaved ? 'is-saved' : ''}`}
                    aria-pressed={isSaved}
                    aria-label={
                      isSaved
                        ? `Remove ${combo.title} from wishlist`
                        : `Save ${combo.title} to wishlist`
                    }
                    onClick={() => onToggleSave(combo.id)}
                  >
                    <svg viewBox="0 0 24 24" className="digital-heart-icon" aria-hidden="true">
                      <path
                        d="M12 20.2 4.6 13.1C1 9.6 3.5 3.6 8.3 4.1c1.6.2 3 1.1 3.7 2.4.7-1.3 2.1-2.2 3.7-2.4 4.8-.5 7.3 5.5 3.7 9L12 20.2Z"
                        fill={isSaved ? '#E85B78' : 'none'}
                        stroke={isSaved ? '#E85B78' : '#4A434E'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="digital-combo-meta">
                  <h3>
                    <button
                      type="button"
                      className="digital-combo-title-btn"
                      onClick={() => onSelectCombo(combo)}
                    >
                      {combo.title}
                    </button>
                  </h3>
                  <p className="digital-combo-price tabular-nums">${combo.price.toFixed(2)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
