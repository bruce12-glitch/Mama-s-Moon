import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BOOKS, HERO_SLIDES, BookItem, HeroSlide } from '../data/moonMeshData';
import {
  getNextSlideIndex,
  getHeroTrimPalette,
  getHeroSlideTransitionState,
} from '../utils/moonMeshLogic';
import { BrandName } from './BrandName';
import { HeroScallopTrim } from './HeroScallopTrim';

interface HeroCarouselProps {
  onOpenStudio: () => void;
  onPreviewBook: (book: BookItem) => void;
}

const CONFETTI_PIECES = [
  { id: 1, color: '#F5C95D', top: '8%', left: '5%', rot: '-18deg', delay: '0s', dur: '5.2s' },
  { id: 2, color: '#70B5E8', top: '9%', left: '32%', rot: '22deg', delay: '0.7s', dur: '6.1s' },
  { id: 3, color: '#7BC697', top: '18%', left: '47%', rot: '-12deg', delay: '1.3s', dur: '5.6s' },
  { id: 4, color: '#F5C95D', top: '52%', left: '3%', rot: '28deg', delay: '0.4s', dur: '6.4s' },
  { id: 5, color: '#70B5E8', top: '88%', left: '14%', rot: '-24deg', delay: '1.8s', dur: '5.8s' },
  { id: 6, color: '#F5C95D', top: '86%', left: '38%', rot: '15deg', delay: '1.1s', dur: '5.4s' },
  { id: 7, color: '#7BC697', top: '44%', left: '94%', rot: '-20deg', delay: '0.9s', dur: '6.0s' },
  { id: 8, color: '#70B5E8', top: '78%', left: '91%', rot: '19deg', delay: '2.1s', dur: '5.5s' },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenStudio,
  onPreviewBook,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const heroRef = useRef<HTMLElement | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[activeIndex];
  const activeTrimPalette = getHeroTrimPalette(activeSlide.id);
  const activeShowcaseBook = BOOKS[0];

  const transitionToIndex = useCallback((nextIndex: number) => {
    setActiveIndex((prev) => {
      if (prev === nextIndex) return prev;
      setPreviousIndex(prev);
      return nextIndex;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = getNextSlideIndex(prev, totalSlides, 1);
      setPreviousIndex(prev);
      return next;
    });
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = getNextSlideIndex(prev, totalSlides, -1);
      setPreviousIndex(prev);
      return next;
    });
  }, [totalSlides]);

  const handleGoTo = useCallback(
    (index: number) => {
      transitionToIndex(index);
    },
    [transitionToIndex]
  );

  useEffect(() => {
    if (previousIndex === null) return;
    const clearTimer = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 820);
    return () => window.clearTimeout(clearTimer);
  }, [activeIndex, previousIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = getNextSlideIndex(prev, totalSlides, 1);
        setPreviousIndex(prev);
        return next;
      });
    }, 7000);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsAutoPlaying(false);
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsAutoPlaying(false);
      handlePrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      setIsAutoPlaying(false);
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  const getSlideBook = (slide: HeroSlide): BookItem => {
    if (slide.bookId) {
      const match = BOOKS.find((b) => b.id === slide.bookId);
      if (match) return match;
    }
    return activeShowcaseBook;
  };

  const handleCtaClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    cta: HeroSlide['primaryCta'],
    slideBook: BookItem = activeShowcaseBook
  ) => {
    if (cta.action === 'open-studio') {
      e.preventDefault();
      onOpenStudio();
    } else if (cta.action === 'preview-book') {
      e.preventDefault();
      onPreviewBook(slideBook);
    }
  };

  const getFallbackImage = (slide: HeroSlide) => {
    if (imageErrors[slide.id]) {
      if (slide.id === 'coloring-treat') return '/assets/hero-coloring-treat.jpg';
      if (slide.id === 'come-join-us') return '/assets/hero-come-join-us.jpg';
      if (
        slide.id === 'christmas-book-showcase' ||
        slide.id === 'winter-village-full-banner' ||
        slide.id === 'winter-village-showcase'
      ) {
        return '/assets/christmas-new-year-book.png?v=mamas-moon-3';
      }
      if (slide.id === 'book-showcase') return '/assets/the-little-moon-picnic-book.png?v=mamas-moon-3';
      return '/assets/color-together.webp';
    }
    return slide.image;
  };

  return (
    <section
      ref={heroRef}
      className={`hero-carousel relative isolate w-full overflow-hidden transition-colors duration-700 ${activeSlide.themeClass}`}
      style={{ backgroundColor: activeSlide.bgColor }}
      aria-roledescription="carousel"
      aria-label="Featured Mama's Moon books and stories"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Soft Storybook Background Aura Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-ambient-aura aura-left" />
        <div className="hero-ambient-aura aura-right" />

        {activeSlide.id === 'coloring-treat' &&
          CONFETTI_PIECES.map((piece) => (
            <span
              key={piece.id}
              className="hero-confetti-ribbon"
              style={{
                top: piece.top,
                left: piece.left,
                backgroundColor: piece.color,
                ['--confetti-rot' as string]: piece.rot,
                animationDelay: piece.delay,
                animationDuration: piece.dur,
              }}
            />
          ))}

        {activeSlide.id === 'come-join-us' && <div className="hero-raindrop-pattern" />}

        {activeSlide.id === 'moon-color' && (
          <div className="hero-starlight-layer">
            <span className="hero-floating-star star-1">✦</span>
            <span className="hero-floating-star star-2">✧</span>
            <span className="hero-floating-star star-3">✦</span>
          </div>
        )}
      </div>

      {/* Top Woven-Linen Scalloped Trim (Mama's Moon Palette) */}
      <HeroScallopTrim position="top" palette={activeTrimPalette} />

      {/* Slides Viewport */}
      <div className="hero-slides-stage relative w-full">
        {HERO_SLIDES.map((slide, index) => {
          const transitionState = getHeroSlideTransitionState(index, activeIndex, previousIndex);
          const isCurrent = transitionState === 'active';
          const imgSrc = getFallbackImage(slide);
          const slideBook = getSlideBook(slide);
          const isFullBleedBanner =
            slide.layout === 'book-showcase' &&
            (slide.id === 'christmas-book-showcase' ||
              slide.id === 'winter-village-full-banner' ||
              slide.id === 'book-showcase');

          return (
            <div
              key={slide.id}
              data-slide-id={slide.id}
              data-transition-state={transitionState}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}: ${slide.titleLines.join(' ')}`}
              aria-hidden={!isCurrent}
              className={`hero-slide-panel ${
                transitionState === 'active'
                  ? 'is-active'
                  : transitionState === 'exiting'
                  ? 'is-exiting'
                  : 'is-inactive'
              } ${
                isFullBleedBanner
                  ? 'layout-book-showcase layout-full-bleed-banner'
                  : slide.layout === 'book-showcase'
                  ? 'layout-book-showcase'
                  : slide.layout === 'centered'
                  ? 'layout-centered'
                  : 'layout-split'
              }`}
            >
              {slide.layout === 'book-showcase' && slide.id === 'winter-village-showcase' ? (
                /* Full-Bleed Editorial Feature Split for 16:9 Winter Village Scene */
                <div className="hero-editorial-showcase">
                  <div className="hero-editorial-frame">
                    <img
                      src={imgSrc}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      alt={slide.imageAlt || `${slideBook.title} — Mama's Moon Book Showcase`}
                      referrerPolicy="no-referrer"
                      className="hero-editorial-img"
                      onClick={() => onPreviewBook(slideBook)}
                    />
                  </div>
                  <div className="hero-editorial-copy">
                    <p className="eyebrow">
                      <BrandName />
                      {' · Winter Village Edition'}
                    </p>
                    <h1 id={isCurrent ? 'hero-title' : undefined} className="hero-editorial-heading">
                      Follow Miso &amp; Friends Around Winter Village
                    </h1>
                    <p className="hero-editorial-subtitle">{slide.subtitle}</p>
                    <div className="hero-editorial-actions">
                      <a
                        className="button button-ink whitespace-nowrap shrink-0"
                        href={slide.primaryCta.href}
                        onClick={(e) => handleCtaClick(e, slide.primaryCta, slideBook)}
                        tabIndex={isCurrent ? 0 : -1}
                      >
                        {slide.primaryCta.label}
                        <svg className="icon" aria-hidden="true">
                          <use href="#arrow" />
                        </svg>
                      </a>
                      <a
                        className="button button-paper whitespace-nowrap shrink-0"
                        href={slide.secondaryCta.href}
                        onClick={(e) => handleCtaClick(e, slide.secondaryCta, slideBook)}
                        tabIndex={isCurrent ? 0 : -1}
                      >
                        {slide.secondaryCta.label}
                      </a>
                    </div>
                    {slide.signoff && (
                      <p className="hero-signoff">
                        {slide.signoff.replace('♡', '')}{' '}
                        {slide.signoff.includes('♡') && <span aria-hidden="true">♡</span>}
                      </p>
                    )}
                  </div>
                </div>
              ) : slide.layout === 'book-showcase' ? (
                /* Full-Bleed Panoramic Book Showcase Stage (Christmas, Winter Village Tabletop, Mama's Moon Cozy Cafe) */
                <div
                  className={`cocowyo-showcase-banner-wrap ${
                    slide.id === 'winter-village-full-banner'
                      ? 'is-winter-tabletop-banner'
                      : slide.id === 'book-showcase'
                      ? 'is-cozy-cafe-banner'
                      : 'is-christmas-banner'
                  }`}
                >
                  <h1 id={isCurrent ? 'hero-title' : undefined} className="sr-only">
                    Mama&apos;s Moon — {slide.titleLines.join(' ')} · {slideBook.title}
                  </h1>

                  <div
                    className={`cocowyo-banner-figure ${
                      slide.id === 'winter-village-full-banner'
                        ? 'cocowyo-banner-figure--wood'
                        : slide.id === 'book-showcase'
                        ? 'cocowyo-banner-figure--cafe'
                        : 'cocowyo-banner-figure--full'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      alt={slide.imageAlt || `${slideBook.title} — Mama's Moon Book Showcase`}
                      referrerPolicy="no-referrer"
                      className={`cocowyo-banner-img ${
                        slide.id === 'winter-village-full-banner'
                          ? 'cocowyo-banner-img--wood'
                          : slide.id === 'book-showcase'
                          ? 'cocowyo-banner-img--cafe'
                          : 'cocowyo-banner-img--full'
                      }`}
                      onClick={() => onPreviewBook(slideBook)}
                    />

                    <button
                      type="button"
                      className={`cocowyo-banner-book-hotspot ${
                        slide.id === 'winter-village-full-banner'
                          ? 'is-tabletop-hotspot'
                          : slide.id === 'book-showcase'
                          ? 'is-cafe-hotspot'
                          : 'is-christmas-hotspot'
                      }`}
                      aria-label={`Peek inside ${slideBook.title}`}
                      onClick={() => onPreviewBook(slideBook)}
                      tabIndex={isCurrent ? 0 : -1}
                    >
                      <span className="cocowyo-hotspot-cue">Peek inside ↗</span>
                    </button>
                  </div>
                </div>
              ) : slide.layout === 'centered' ? (
                /* Centered Coco Wyo-inspired Banner Layout ("READY FOR a little COLORiNG TREAT?" & "COME JOIN US") */
                <div
                  className={`hero-centered-inner shell ${
                    slide.id === 'coloring-treat' ? 'is-treat-slide' : 'is-join-slide'
                  }`}
                >
                  <div
                    className={`hero-centered-art-wrap ${
                      slide.id === 'coloring-treat' ? 'hero-treat-art-wrap' : 'hero-join-art-wrap'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      width={1600}
                      height={900}
                      alt={slide.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [slide.id]: true }))
                      }
                      onClick={slide.id === 'coloring-treat' ? onOpenStudio : undefined}
                      className={`hero-centered-img ${
                        slide.id === 'coloring-treat' ? 'hero-treat-img cursor-pointer' : 'hero-join-img'
                      }`}
                    />
                  </div>
                  <div
                    className={`hero-centered-overlay-bar ${
                      slide.id === 'coloring-treat' ? 'hero-treat-quote-only' : ''
                    }`}
                  >
                    <p className="hero-centered-subtitle">{slide.subtitle}</p>
                    {slide.id !== 'coloring-treat' && (
                      <div className="hero-actions justify-center">
                        <a
                          className="button button-ink whitespace-nowrap shrink-0"
                          href={slide.primaryCta.href}
                          onClick={(e) => handleCtaClick(e, slide.primaryCta)}
                          tabIndex={isCurrent ? 0 : -1}
                        >
                          {slide.primaryCta.label}
                          <svg className="icon" aria-hidden="true">
                            <use href="#arrow" />
                          </svg>
                        </a>
                        <a
                          className="button button-paper whitespace-nowrap shrink-0"
                          href={slide.secondaryCta.href}
                          onClick={(e) => handleCtaClick(e, slide.secondaryCta)}
                          tabIndex={isCurrent ? 0 : -1}
                        >
                          {slide.secondaryCta.label}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Split Layout ("Make the moon your color", "READY FOR a little COLORiNG TREAT?") */
                <>
                  <div className="hero-art">
                    <img
                      src={imgSrc}
                      width={1600}
                      height={900}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      alt={slide.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [slide.id]: true }))
                      }
                      className="hero-float-art"
                    />
                  </div>
                  <div className="hero-inner shell">
                    <div className="hero-copy">
                      <p className="eyebrow">
                        {slide.eyebrow.includes("Mama's Moon") ? (
                          <>
                            <BrandName />
                            {slide.eyebrow.replace("Mama's Moon", '')}
                          </>
                        ) : (
                          slide.eyebrow
                        )}
                      </p>

                      {slide.id === 'coloring-treat' ? (
                        <h1 className="hero-treat-heading">
                          <span className="treat-block-line">{slide.titleLines[0]}</span>
                          <span className="treat-script-line">{slide.titleLines[1]}</span>
                          <span className="treat-block-line">{slide.titleLines[2]}</span>
                          <span className="treat-block-line">{slide.titleLines[3]}</span>
                        </h1>
                      ) : slide.id === 'moon-color' ? (
                        <h1 id={isCurrent ? 'hero-title' : undefined}>
                          Make the
                          <br />
                          <span className="marker-highlight">moon</span>
                          <br />
                          your <span className="marker-underline">color.</span>
                        </h1>
                      ) : (
                        <h1>
                          {slide.titleLines[0]}
                          <br />
                          <span className="marker-highlight">{slide.titleLines[1]}</span>
                          <br />
                          <span className="marker-underline">{slide.titleLines[2]}</span>
                        </h1>
                      )}

                      <p className="hero-lede">{slide.subtitle}</p>

                      <div className="hero-actions">
                        <a
                          className="button button-ink whitespace-nowrap shrink-0"
                          href={slide.primaryCta.href}
                          onClick={(e) => handleCtaClick(e, slide.primaryCta)}
                          tabIndex={isCurrent ? 0 : -1}
                        >
                          {slide.primaryCta.label}
                          <svg className="icon" aria-hidden="true">
                            <use href="#arrow" />
                          </svg>
                        </a>
                      </div>

                      {slide.signoff && (
                        <p className="hero-signoff">
                          {slide.signoff.replace('♡', '')}{' '}
                          {slide.signoff.includes('♡') && <span aria-hidden="true">♡</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Woven-Linen Scalloped Trim overhanging the white pagination strip */}
      <HeroScallopTrim position="bottom" palette={activeTrimPalette} />

      {/* Coco Wyo-inspired White Bottom Pagination Dots Strip (Pause button removed) */}
      <div className="hero-pagination-bar" role="region" aria-label="Hero slide controls">
        <div className="shell flex items-center justify-center gap-3 py-2.5">
          <button
            type="button"
            className="hero-nav-arrow"
            onClick={() => {
              setIsAutoPlaying(false);
              handlePrev();
            }}
            aria-label="Previous hero slide"
          >
            ‹
          </button>

          <div className="hero-dots" role="tablist" aria-label="Choose a hero slide">
            {HERO_SLIDES.map((slide, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Slide ${idx + 1}: ${slide.titleLines.join(' ')}`}
                  className={`hero-dot ${selected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    handleGoTo(idx);
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="hero-nav-arrow"
            onClick={() => {
              setIsAutoPlaying(false);
              handleNext();
            }}
            aria-label="Next hero slide"
          >
            ›
          </button>

          <span className="hero-slide-counter tabular-nums" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};
