/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BOOKS,
  CREW_MEMBERS,
  FAQ_ITEMS,
  STICKER_COLLECTIONS,
  LAPTOP_STICKER_PACKS,
  KIDS_BEDDING_COLLECTION,
  DIGITAL_PDF_BOOKS,
  DIGITAL_COMBO_PACKS,
  BookItem,
  StickerProduct,
  LaptopStickerProduct,
  KidsBeddingProduct,
  DigitalPdfProduct,
  DigitalComboProduct,
  StickerCategory,
  LaptopStickerFinish,
  KidsBeddingCategory,
  KidsBeddingSize,
} from './data/moonMeshData';
import {
  validateMoonMailEmail,
  computeBookTiltAngles,
  getForestAudioUiState,
  filterStickerProducts,
  filterLaptopStickers,
  filterKidsBeddingProducts,
  calculateStudioBagSummary,
  getVisibleDigitalCombos,
  toggleSavedBookId,
} from './utils/moonMeshLogic';
import { forestAudio } from './utils/forestAudio';
import { HeroCarousel } from './components/HeroCarousel';
import { DigitalSection } from './components/DigitalSection';
import { LaptopStickersSection } from './components/LaptopStickersSection';
import { KidsBeddingSection } from './components/KidsBeddingSection';
import { ColoringStudioModal } from './components/ColoringStudioModal';
import {
  CatalogModal,
  BookPreviewModal,
  StickerPreviewModal,
  LaptopStickerPreviewModal,
  KidsBeddingPreviewModal,
  DigitalPdfPreviewModal,
  DigitalComboPreviewModal,
  StudioBagModal,
} from './components/Modals';
import { BrandName } from './components/BrandName';

const GIFT_TAB_DISMISSED_KEY = 'mamas-moon-free-page-shortcut-dismissed';
const STUDIO_BAG_STORAGE_KEY = 'mamas-moon-studio-bag-v1';
const SAVED_DIGITAL_STORAGE_KEY = 'mamas-moon-saved-digital-v1';
const VALID_DIGITAL_COMBO_IDS = new Set(DIGITAL_COMBO_PACKS.map((c) => c.id));

const STICKER_FILTER_TABS: { id: StickerCategory; label: string }[] = [
  { id: 'all', label: 'All Stickers (4)' },
  { id: 'die-cut', label: 'Die-Cut Vinyl Packs' },
  { id: 'sheet', label: 'Kiss-Cut Sheets' },
  { id: 'bundle', label: 'Collector Bundles' },
];

function BrandWordmark({ variant = 'header' }: { variant?: 'header' | 'footer' }) {
  return (
    <a
      className={`wordmark wordmark-brand ${variant === 'footer' ? 'wordmark-footer' : ''}`}
      href="#top"
      aria-label="Mama's Moon home"
    >
      <span className="sr-only">Mama&apos;s Moon</span>
      <span className="wordmark-letters" aria-hidden="true">
        <span className="m-plum">M</span>
        <span className="m-rose">a</span>
        <span className="m-honey">m</span>
        <span className="m-sage">a</span>
        <span className="m-peach">&rsquo;</span>
        <span className="m-plum">s</span>
        <span className="wordmark-space">&nbsp;</span>
        <span className="m-rose">M</span>
        <span className="m-honey">o</span>
        <span className="m-plum">o</span>
        <span className="m-sage">n</span>
      </span>
    </a>
  );
}

export default function App() {
  // Crew outline vs color state
  const [crewColored, setCrewColored] = useState<boolean>(true);

  // Modals state
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [catalogState, setCatalogState] = useState<{
    open: boolean;
    mode: 'search' | 'saved';
  }>({ open: false, mode: 'search' });
  const [activeBookPreview, setActiveBookPreview] = useState<BookItem | null>(null);
  const [activeStickerPreview, setActiveStickerPreview] = useState<StickerProduct | null>(null);
  const [activeLaptopStickerPreview, setActiveLaptopStickerPreview] =
    useState<LaptopStickerProduct | null>(null);
  const [activeBeddingPreview, setActiveBeddingPreview] =
    useState<KidsBeddingProduct | null>(null);
  const [activePdfPreview, setActivePdfPreview] = useState<DigitalPdfProduct | null>(null);
  const [activeComboPreview, setActiveComboPreview] = useState<DigitalComboProduct | null>(null);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);

  // Digital showcase expansion & saved hearts state
  const [isDigitalExpanded, setIsDigitalExpanded] = useState<boolean>(false);
  const [savedDigitalIds, setSavedDigitalIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(SAVED_DIGITAL_STORAGE_KEY);
      if (!raw) return new Set<string>();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? new Set(parsed.filter((id): id is string => typeof id === 'string' && VALID_DIGITAL_COMBO_IDS.has(id)))
        : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_DIGITAL_STORAGE_KEY, JSON.stringify([...savedDigitalIds]));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedDigitalIds]);

  const handleToggleSaveDigital = (comboId: string) => {
    setSavedDigitalIds((prev) => toggleSavedBookId(prev, comboId, VALID_DIGITAL_COMBO_IDS));
  };

  const visibleDigitalCombos = useMemo(
    () => getVisibleDigitalCombos(DIGITAL_COMBO_PACKS, isDigitalExpanded, 4),
    [isDigitalExpanded]
  );

  // Sticker collection category filter & Studio Bag state
  const [stickerCategory, setStickerCategory] = useState<StickerCategory>('all');
  const [laptopStickerFinish, setLaptopStickerFinish] = useState<LaptopStickerFinish>('all');
  const [kidsBeddingCategory, setKidsBeddingCategory] = useState<KidsBeddingCategory>('all');
  const [selectedBeddingSizes, setSelectedBeddingSizes] = useState<
    Record<string, KidsBeddingSize>
  >({});
  const [bagQuantities, setBagQuantities] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(STUDIO_BAG_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STUDIO_BAG_STORAGE_KEY, JSON.stringify(bagQuantities));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagQuantities]);

  const priceLookup = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of STICKER_COLLECTIONS) map[s.id] = s.price;
    for (const l of LAPTOP_STICKER_PACKS) map[l.id] = l.price;
    for (const b of KIDS_BEDDING_COLLECTION) map[b.id] = b.price;
    for (const d of DIGITAL_PDF_BOOKS) map[d.id] = d.price;
    for (const c of DIGITAL_COMBO_PACKS) map[c.id] = c.price;
    return map;
  }, []);

  const filteredStickers = useMemo(
    () => filterStickerProducts(STICKER_COLLECTIONS, stickerCategory),
    [stickerCategory]
  );

  const filteredLaptopStickers = useMemo(
    () => filterLaptopStickers(LAPTOP_STICKER_PACKS, laptopStickerFinish),
    [laptopStickerFinish]
  );

  const filteredKidsBedding = useMemo(
    () => filterKidsBeddingProducts(KIDS_BEDDING_COLLECTION, kidsBeddingCategory),
    [kidsBeddingCategory]
  );

  const handleSelectBeddingSize = (productId: string, size: KidsBeddingSize) => {
    setSelectedBeddingSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const bagSummary = useMemo(
    () => calculateStudioBagSummary(bagQuantities, priceLookup, 25),
    [bagQuantities, priceLookup]
  );

  const handleAddToBag = (productId: string) => {
    setBagQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    setRecentlyAddedId(productId);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === productId ? null : current));
    }, 1500);
  };

  const handleUpdateBagQty = (productId: string, delta: number) => {
    setBagQuantities((prev) => {
      const nextQty = Math.max(0, (prev[productId] || 0) + delta);
      const next = { ...prev };
      if (nextQty === 0) {
        delete next[productId];
      } else {
        next[productId] = nextQty;
      }
      return next;
    });
  };

  const handleClearBag = () => {
    setBagQuantities({});
  };

  // Global Ambient Forest Sound state (synchronized with 3D Moon Picnic scene)
  const [isForestSoundOn, setIsForestSoundOn] = useState<boolean>(() =>
    forestAudio.getIsPlaying()
  );

  useEffect(() => {
    return forestAudio.subscribe((playing) => {
      setIsForestSoundOn(playing);
    });
  }, []);

  const handleToggleForestSound = () => {
    forestAudio.toggle();
  };
  const forestAudioUi = getForestAudioUiState(isForestSoundOn);

  // FAQ open item state
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Moon Mail form state
  const [mailEmail, setMailEmail] = useState<string>('');
  const [mailError, setMailError] = useState<string>('');
  const [mailSubmitted, setMailSubmitted] = useState<boolean>(false);
  const mailInputRef = useRef<HTMLInputElement | null>(null);

  // Gift shortcut visibility
  const [giftDismissed, setGiftDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(GIFT_TAB_DISMISSED_KEY) === 'yes';
    } catch {
      return false;
    }
  });
  const [showGiftTab, setShowGiftTab] = useState<boolean>(false);

  // Inline video ref
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const [clipPausedByUser, setClipPausedByUser] = useState<boolean>(false);

  // Gift tab scroll observer
  useEffect(() => {
    if (giftDismissed) return;
    const colorSection = document.getElementById('color');
    const handleScroll = () => {
      const scrolledPastHero = window.scrollY > 450;
      let colorInView = false;
      if (colorSection) {
        const rect = colorSection.getBoundingClientRect();
        colorInView = rect.top < window.innerHeight && rect.bottom > 0;
      }
      setShowGiftTab(scrolledPastHero && !colorInView);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [giftDismissed]);

  // Inline coloring video viewport observer
  useEffect(() => {
    const video = inlineVideoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !clipPausedByUser && !document.hidden) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [clipPausedByUser]);

  // Book cover 3D pointer tilt & specular paper sheen handlers
  const handleBookPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === 'touch') return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const normY = (e.clientY - bounds.top) / bounds.height - 0.5;
    const { rx, ry } = computeBookTiltAngles(normX, normY, 5, 7);
    e.currentTarget.style.setProperty('--book-rx', rx);
    e.currentTarget.style.setProperty('--book-ry', ry);
    e.currentTarget.style.setProperty('--sheen-x', `${Math.round((normX + 0.5) * 100)}%`);
    e.currentTarget.style.setProperty('--sheen-y', `${Math.round((normY + 0.5) * 100)}%`);
  };

  const handleBookPointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.removeProperty('--book-rx');
    e.currentTarget.style.removeProperty('--book-ry');
    e.currentTarget.style.removeProperty('--sheen-x');
    e.currentTarget.style.removeProperty('--sheen-y');
  };

  // Moon Mail submit
  const handleMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateMoonMailEmail(mailEmail);
    if (!validation.valid) {
      setMailError(validation.error);
      mailInputRef.current?.focus();
      return;
    }
    setMailError('');
    setMailSubmitted(true);
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      {/* Shared SVG Symbols */}
      <svg className="symbols" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <symbol id="spark" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 0c1.8 7.2 4.8 10.2 12 12-7.2 1.8-10.2 4.8-12 12C10.2 16.8 7.2 13.8 0 12 7.2 10.2 10.2 7.2 12 0Z"
          />
        </symbol>
        <symbol id="arrow" viewBox="0 0 24 24">
          <path
            d="M4 12h15m-6-6 6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="arrow-up" viewBox="0 0 24 24">
          <path
            d="M12 20V4m-7 7 7-7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="crayon" viewBox="0 0 24 24">
          <path
            d="m5 16 10-10 4 4L9 20l-5 1 1-5Zm8-8 4 4M6 15l4 4m5-13 3-3 3 2v3l-2 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
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
        <symbol id="heart" viewBox="0 0 24 24">
          <path
            d="M12 20 4.5 12.7C.6 8.8 5.9 2.9 10 6.4l2 1.8 2-1.8c4.1-3.5 9.4 2.4 5.5 6.3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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
        <symbol id="search" viewBox="0 0 24 24">
          <circle
            cx="10.75"
            cy="10.75"
            r="6.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          <path
            d="m15.5 15.5 4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="check" viewBox="0 0 24 24">
          <path
            d="m5 13 4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="mail" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m4 7 8 6 8-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </svg>

      {/* Top Gift Ribbon */}
      <div className="ribbon" id="top">
        <a href="#color">
          <span className="ribbon-stars" aria-hidden="true">
            ✦ ✧ ✦
          </span>
          A little gift for you. Download a free coloring page
          <svg className="icon" aria-hidden="true">
            <use href="#arrow" />
          </svg>
        </a>
      </div>

      {/* Masthead (Coco Wyo-inspired Search + Centered Wordmark + Saved Books + Nav Row) */}
      <header className="masthead is-ready">
        <div className="utility shell">
          <div className="utility-left">
            <button
              className="search-trigger"
              type="button"
              aria-label="Search Mama's Moon"
              aria-haspopup="dialog"
              onClick={() => setCatalogState({ open: true, mode: 'search' })}
            >
              <svg className="icon" aria-hidden="true">
                <use href="#search" />
              </svg>
              <span>
                Search <BrandName />
              </span>
            </button>
          </div>

          <BrandWordmark variant="header" />

          <div className="utility-right">
            <button
              id="global-forest-audio-toggle"
              type="button"
              className={`header-audio-toggle ${isForestSoundOn ? 'is-playing' : 'is-muted'}`}
              aria-pressed={isForestSoundOn}
              aria-label={forestAudioUi.ariaLabel}
              title={forestAudioUi.ariaLabel}
              onClick={handleToggleForestSound}
            >
              <span className="header-audio-icon" aria-hidden="true">
                {isForestSoundOn ? (
                  <svg viewBox="0 0 24 24" className="icon">
                    <path
                      d="M11 5L6 9H2v6h4l5 4V5z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.54 8.46a5 5 0 0 1 0 7.07"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.07 4.93a10 10 0 0 1 0 14.14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="icon">
                    <path
                      d="M11 5L6 9H2v6h4l5 4V5z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="22"
                      y1="9"
                      x2="16"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="9"
                      x2="22"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              <span className="header-audio-label">{forestAudioUi.buttonLabel}</span>
              <span className="header-audio-badge">{forestAudioUi.statusBadge}</span>
            </button>

            <button
              id="header-studio-bag-button"
              type="button"
              className="studio-bag-trigger whitespace-nowrap shrink-0"
              aria-label={`Open Studio Bag, ${bagSummary.totalItems} items`}
              aria-haspopup="dialog"
              onClick={() => setIsBagOpen(true)}
            >
              <span className="studio-bag-label">Studio Bag</span>
              <span className="studio-bag-count tabular-nums">{bagSummary.totalItems}</span>
            </button>
          </div>
        </div>

        <nav id="main-nav" className="main-nav shell" aria-label="Main">
          <a href="#books">Our books</a>
          <a href="#digital">Digital</a>
          <a href="#collections">Stickers</a>
          <a href="#laptop-stickers">Laptop Stickers</a>
          <a href="#kids-bedding">Kids Bedding</a>
          <a href="#digital-books">Digital PDFs</a>
          <a href="#story">Our little world</a>
          <a href="#color">Free page</a>
          <a href="#faq">FAQs</a>
          <a
            href="https://www.amazon.com/s?k=Mamas+Moon+coloring+books"
            className="amazon-nav"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop on Amazon <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books"
            className="etsy-nav"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Etsy <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        {/* Coco Wyo-Inspired Animated Hero Carousel */}
        <HeroCarousel
          onOpenStudio={() => setIsStudioOpen(true)}
          onPreviewBook={(book) => setActiveBookPreview(book)}
        />

        {/* Crew Lineup Section (Hover / Focus / Tap Outline-to-Color Crossfade) */}
        <section
          className={`crew ${crewColored ? 'is-colored' : ''}`}
          id="story"
          aria-labelledby="story-title"
        >
          <div className="shell">
            <figure className="crew-lineup">
              <button
                className="crew-art-button"
                type="button"
                aria-label={
                  crewColored
                    ? 'Show Miso and friends as a drawing'
                    : 'Show Miso and friends in color'
                }
                aria-pressed={crewColored}
                aria-describedby="crew-art-description"
                onMouseEnter={() => setCrewColored(true)}
                onMouseLeave={() => setCrewColored(false)}
                onFocus={() => setCrewColored(true)}
                onBlur={() => setCrewColored(false)}
                onClick={() => setCrewColored((prev) => !prev)}
              >
                <img
                  className="crew-img crew-img-outline"
                  src="/assets/our-little-crew-outline.webp"
                  width={1400}
                  height={467}
                  alt=""
                  loading="lazy"
                />
                <img
                  className="crew-img crew-img-color"
                  src="/assets/our-little-crew.webp"
                  width={1400}
                  height={467}
                  alt=""
                  loading="lazy"
                />
              </button>
              <p id="crew-art-description" className="visually-hidden">
                Miso with a warm mug, Pip with a crayon, Plum with a coloring book, and Sprout
                beside a pot of flowers. Move over the drawing or focus it to reveal its colors. On
                a touch screen, tap to switch.
              </p>
              <figcaption className="crew-names">
                {CREW_MEMBERS.map((member) => (
                  <span key={member.name}>
                    {member.name} <small>{member.role}</small>
                  </span>
                ))}
              </figcaption>
            </figure>

            <div className="section-heading section-heading-center">
              <h2 id="story-title">Hi, friend!</h2>
              <p>
                Some of our favorite moments are the smallest ones. A warm mug. A quiet table. A
                page full of possibilities. That’s the world we’re making with Miso and friends,
                and there’s always a little room for you.
              </p>
            </div>
          </div>
        </section>

        {/* Bookshelf Section */}
        <section className="books" id="books" aria-labelledby="books-title">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <svg className="icon" aria-hidden="true">
                    <use href="#spark" />
                  </svg>{' '}
                  Our featured storybooks
                </p>
                <h2 id="books-title">Cozy storybooks to color.</h2>
              </div>
              <p className="section-aside">
                Miso &amp; Friends · Story Coloring Books for Kids Ages 6–9. From rainy-day moon
                picnics to snowy winter village strolls on Cocoa Lane.
              </p>
            </div>

            <div className="book-grid">
              {BOOKS.map((book) => (
                <article
                  key={book.id}
                  className={`book-card ${book.themeClass}`}
                  id={book.id}
                >
                  <div className="book-mat cocowyo-shelf-stage">
                    <div className="cocowyo-shelf-curtains" aria-hidden="true" />
                    <div className="cocowyo-shelf-wood" aria-hidden="true" />
                    <a
                      className="book-art"
                      href={`#${book.id}-details`}
                      aria-label={`Preview ${book.title}, a Mama's Moon coloring book`}
                      onPointerMove={handleBookPointerMove}
                      onPointerLeave={handleBookPointerLeave}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveBookPreview(book);
                      }}
                    >
                      <span className="cocowyo-book-stage-group">
                        <img
                          src="/assets/prop-courier-bird.webp"
                          alt=""
                          aria-hidden="true"
                          className="book-stage-prop prop-courier-bird"
                        />
                        <img
                          src="/assets/prop-open-easel.webp"
                          alt=""
                          aria-hidden="true"
                          className="book-stage-prop prop-open-easel"
                        />
                        <img
                          src="/assets/prop-alcohol-marker.webp"
                          alt=""
                          aria-hidden="true"
                          className="book-stage-prop prop-alcohol-marker"
                        />
                        <span className="standing-3d-book-figure">
                          <img
                            src={book.standingImage || '/assets/standing-3d-book.webp?v=mamas-moon-3'}
                            width={670}
                            height={745}
                            alt={`${book.title} — 3D hardcover storybook edition`}
                            loading="lazy"
                            className="standing-3d-book-img"
                          />
                          <span className="standing-3d-book-sheen" aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="book-caption">
                    <p className="book-genre">
                      {book.number} · {book.genre}
                    </p>
                    <h3>{book.title}</h3>
                    <p>{book.previewDescription}</p>
                    <div className="book-featured-actions">
                      <button
                        type="button"
                        className="button button-ink whitespace-nowrap"
                        onClick={() => setActiveBookPreview(book)}
                      >
                        Peek inside this book{' '}
                        <svg className="icon" aria-hidden="true">
                          <use href="#arrow" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="books-footnote">
              Find <BrandName /> on Amazon &amp; Etsy.{' '}
              <a
                href="https://www.amazon.com/s?k=Mamas+Moon+coloring+books"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore on Amazon <span aria-hidden="true">↗</span>
              </a>{' '}
              ·{' '}
              <a
                href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find us on Etsy <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </section>

        {/* Digital Combos Showcase Section */}
        <DigitalSection
          combos={visibleDigitalCombos}
          totalComboCount={DIGITAL_COMBO_PACKS.length}
          isExpanded={isDigitalExpanded}
          savedIds={savedDigitalIds}
          onToggleExpand={() => setIsDigitalExpanded((prev) => !prev)}
          onToggleSave={handleToggleSaveDigital}
          onSelectCombo={(combo) => setActiveComboPreview(combo)}
        />

        {/* Sticker Collections Storefront Section */}
        <section
          className="sticker-collections"
          id="collections"
          aria-labelledby="collections-title"
        >
          <div className="shell">
            <div className="store-section-header">
              <div>
                <p className="eyebrow">
                  <svg className="icon" aria-hidden="true">
                    <use href="#spark" />
                  </svg>{' '}
                  <BrandName /> Sticker Shop
                </p>
                <h2 id="collections-title">Sticker collections for cozy desks.</h2>
                <p className="store-section-lead">
                  Thick die-cut vinyl packs and kiss-cut journal sheets featuring Miso, Pip, Plum,
                  and Sprout. Weatherproof matte vinyl that peels cleanly and brightens sketchbooks,
                  laptops, and lunchboxes.
                </p>
              </div>

              <div className="store-filter-bar" role="tablist" aria-label="Filter sticker collections">
                {STICKER_FILTER_TABS.map((tab) => {
                  const isActive = stickerCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`store-filter-btn whitespace-nowrap shrink-0 ${
                        isActive ? 'is-active' : ''
                      }`}
                      onClick={() => setStickerCategory(tab.id)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sticker-grid">
              {filteredStickers.map((sticker) => {
                const isAdded = recentlyAddedId === sticker.id;
                const inBagCount = bagQuantities[sticker.id] || 0;
                return (
                  <article key={sticker.id} className="sticker-card" id={sticker.id}>
                    <div
                      className="sticker-card-stage"
                      style={{ background: sticker.bgTint }}
                      onClick={() => setActiveStickerPreview(sticker)}
                    >
                      {sticker.badge && (
                        <span className="store-corner-tag">{sticker.badge}</span>
                      )}
                      <div className="sticker-diecut-sheet">
                        <img
                          src={sticker.primaryImage}
                          width={700}
                          height={440}
                          alt={sticker.title}
                          loading="lazy"
                          className="sticker-diecut-img"
                        />
                      </div>
                      <span className="sticker-character-seal" aria-hidden="true">
                        <img src={sticker.accentImage} alt="" width={48} height={48} />
                      </span>
                    </div>

                    <div className="sticker-card-body">
                      <p className="store-meta-line">
                        {sticker.categoryLabel} · {sticker.pieceCount} · {sticker.finishSpec}
                      </p>
                      <div className="store-title-price-row">
                        <h3>
                          <button
                            type="button"
                            className="store-card-title-btn"
                            onClick={() => setActiveStickerPreview(sticker)}
                          >
                            {sticker.title}
                          </button>
                        </h3>
                        <span className="store-price tabular-nums">
                          ${sticker.price.toFixed(2)}
                          {sticker.compareAtPrice && (
                            <small className="store-compare-price">
                              ${sticker.compareAtPrice.toFixed(2)}
                            </small>
                          )}
                        </span>
                      </div>
                      <p className="store-card-desc">{sticker.subtitle}</p>
                      <p className="store-spec-subline">
                        {sticker.sizeSpec} · Featuring {sticker.characters.join(', ')}
                      </p>

                      <div className="store-card-actions">
                        <button
                          type="button"
                          className={`button ${
                            isAdded ? 'button-yellow' : 'button-ink'
                          } whitespace-nowrap shrink-0`}
                          onClick={() => handleAddToBag(sticker.id)}
                        >
                          {isAdded
                            ? 'Added to Bag ✓'
                            : inBagCount > 0
                            ? `Add Another (${inBagCount} in bag)`
                            : 'Add to Bag'}
                        </button>
                        <button
                          type="button"
                          className="button button-outline whitespace-nowrap shrink-0"
                          onClick={() => setActiveStickerPreview(sticker)}
                        >
                          Inspect Pack
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="store-section-foot">
              <p>
                Free studio sticker shipping on orders over <strong className="tabular-nums">$25.00</strong> ·
                Every pack ships in a protective glassine envelope with a bonus mini bookmark.
              </p>
              <button
                type="button"
                className="text-link whitespace-nowrap"
                onClick={() => setIsBagOpen(true)}
              >
                View Studio Bag ({bagSummary.totalItems}){' '}
                <svg className="icon" aria-hidden="true">
                  <use href="#arrow" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Laptop Stickers Showcase Section */}
        <LaptopStickersSection
          packs={filteredLaptopStickers}
          selectedFinish={laptopStickerFinish}
          bagQuantities={bagQuantities}
          recentlyAddedId={recentlyAddedId}
          onSelectFinish={setLaptopStickerFinish}
          onAddToBag={handleAddToBag}
          onPreviewPack={(pack) => setActiveLaptopStickerPreview(pack)}
          onOpenBag={() => setIsBagOpen(true)}
          totalBagItems={bagSummary.totalItems}
        />

        {/* Kids Bedsheets & Cozy Room Bedding Section */}
        <KidsBeddingSection
          items={filteredKidsBedding}
          selectedCategory={kidsBeddingCategory}
          selectedSizes={selectedBeddingSizes}
          bagQuantities={bagQuantities}
          recentlyAddedId={recentlyAddedId}
          onSelectCategory={setKidsBeddingCategory}
          onSelectSize={handleSelectBeddingSize}
          onAddToBag={handleAddToBag}
          onPreviewItem={(item) => setActiveBeddingPreview(item)}
          onOpenBag={() => setIsBagOpen(true)}
          totalBagItems={bagSummary.totalItems}
        />

        {/* Digital PDF Coloring Books Storefront Section */}
        <section
          className="digital-books-section"
          id="digital-books"
          aria-labelledby="digital-books-title"
        >
          <div className="shell">
            <div className="store-section-header">
              <div>
                <p className="eyebrow">
                  <svg className="icon" aria-hidden="true">
                    <use href="#download" />
                  </svg>{' '}
                  Instant Digital Downloads
                </p>
                <h2 id="digital-books-title">Digital PDF coloring books to print at home.</h2>
                <p className="store-section-lead">
                  Color your favorite pages as many times as you like. Every <BrandName /> digital
                  coloring book comes as a high-resolution 300 DPI vector PDF with both US Letter
                  and A4 files included for crisp, stress-free kitchen-table printing.
                </p>
              </div>
              <div className="digital-perks-strip" aria-label="Digital PDF specifications">
                <span>✦ 300 DPI Vector Line Art</span>
                <span aria-hidden="true">·</span>
                <span>✦ US Letter &amp; A4 Included</span>
                <span aria-hidden="true">·</span>
                <span>✦ Print Unlimited Family Copies</span>
              </div>
            </div>

            <div className="digital-pdf-grid">
              {DIGITAL_PDF_BOOKS.map((pdfBook) => {
                const isAdded = recentlyAddedId === pdfBook.id;
                const inBagCount = bagQuantities[pdfBook.id] || 0;
                return (
                  <article key={pdfBook.id} className="digital-pdf-card" id={pdfBook.id}>
                    <div
                      className="digital-pdf-stage"
                      style={{ background: pdfBook.bgTint }}
                      onClick={() => setActivePdfPreview(pdfBook)}
                    >
                      {pdfBook.badge && (
                        <span className="store-corner-tag">{pdfBook.badge}</span>
                      )}
                      <div className="digital-pdf-folio">
                        <div className="digital-pdf-cover-wrap">
                          <img
                            src={pdfBook.coverImage}
                            width={460}
                            height={460}
                            alt={`${pdfBook.title} cover`}
                            loading="lazy"
                            className="digital-pdf-cover-img"
                          />
                        </div>
                        <div className="digital-pdf-sample-peek" aria-hidden="true">
                          <img
                            src={pdfBook.samplePreviewSvg}
                            width={260}
                            height={260}
                            alt=""
                            loading="lazy"
                          />
                          <span>300 DPI PDF</span>
                        </div>
                      </div>
                    </div>

                    <div className="digital-pdf-body">
                      <p className="store-meta-line">
                        {pdfBook.number} · {pdfBook.pageCount} pages · {pdfBook.formatSpec} ·{' '}
                        {pdfBook.ageRange}
                      </p>
                      <div className="store-title-price-row">
                        <h3>
                          <button
                            type="button"
                            className="store-card-title-btn"
                            onClick={() => setActivePdfPreview(pdfBook)}
                          >
                            {pdfBook.title}
                          </button>
                        </h3>
                        <span className="store-price tabular-nums">
                          ${pdfBook.price.toFixed(2)}
                          {pdfBook.compareAtPrice && (
                            <small className="store-compare-price">
                              ${pdfBook.compareAtPrice.toFixed(2)}
                            </small>
                          )}
                        </span>
                      </div>
                      <p className="store-card-desc">{pdfBook.subtitle}</p>
                      <p className="store-spec-subline">{pdfBook.paperSpec} · Instant download</p>

                      <div className="store-card-actions">
                        <button
                          type="button"
                          className={`button ${
                            isAdded ? 'button-yellow' : 'button-ink'
                          } whitespace-nowrap shrink-0`}
                          onClick={() => handleAddToBag(pdfBook.id)}
                        >
                          {isAdded
                            ? 'Added PDF ✓'
                            : inBagCount > 0
                            ? `In Bag (${inBagCount}) · Add +1`
                            : 'Add PDF to Bag'}
                        </button>
                        <button
                          type="button"
                          className="button button-outline whitespace-nowrap shrink-0"
                          onClick={() => setActivePdfPreview(pdfBook)}
                        >
                          Sample Page &amp; Specs
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* From the Coloring Table Video Section */}
        <section className="coloring-table" id="watch" aria-label="Coloring table video">
          <div className="shell coloring-table-inner">
            <figure className="coloring-table-visual">
              <div className="clip-card">
                <video
                  ref={inlineVideoRef}
                  className="clip-video"
                  id="inline-coloring-video"
                  src="/assets/coloring-table.mp4"
                  poster="/assets/coloring-table-poster.webp"
                  width={1080}
                  height={1920}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="A quiet moment at the coloring table"
                  aria-describedby="inline-video-description"
                  onClick={() => {
                    const v = inlineVideoRef.current;
                    if (!v) return;
                    if (v.paused) {
                      setClipPausedByUser(false);
                      v.play().catch(() => {});
                    } else {
                      setClipPausedByUser(true);
                      v.pause();
                    }
                  }}
                >
                  <a href="/assets/coloring-table.mp4">Watch the coloring clip</a>
                </video>
              </div>
              <p id="inline-video-description" className="visually-hidden">
                A hand adds color with markers to a cozy page of puppies and plants.
              </p>
            </figure>
          </div>
        </section>

        {/* Free Page / Coloring Club Section */}
        <section className="free-page" id="color" aria-labelledby="sample-title">
          <div className="shell free-page-inner">
            <div className="free-copy">
              <p className="eyebrow">
                <svg className="icon" aria-hidden="true">
                  <use href="#spark" />
                </svg>{' '}
                The coloring club
              </p>
              <h2 id="sample-title">A little gift. A whole lot of color.</h2>
              <p>
                Give Miso a purple scarf, a pink moon, or a sky full of green stars. This little
                page is yours — color it here, or print it for the kitchen table.
              </p>
              <div className="free-actions">
                <button
                  className="button button-yellow whitespace-nowrap shrink-0"
                  type="button"
                  id="open-studio"
                  onClick={() => setIsStudioOpen(true)}
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#crayon" />
                  </svg>{' '}
                  Color it online
                </button>
                <a
                  className="button button-outline whitespace-nowrap shrink-0"
                  href="/assets/miso-moon-coloring.pdf"
                  download
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#download" />
                  </svg>{' '}
                  Print the page
                </a>
              </div>
              <p className="free-note">
                Print it, share a crayon, and see where the afternoon goes.
              </p>
            </div>
            <figure className="free-visual">
              <div className="paper-card">
                <span className="paper-kicker">
                  <BrandName /> Coloring Club
                </span>
                <img
                  src="/assets/miso-moon-coloring.svg"
                  width={1254}
                  height={1254}
                  alt="Miso reading a coloring book on a crescent moon, with stars, a cloud, and a crayon."
                  loading="lazy"
                />
                <span className="paper-foot">Miso &amp; the Moon · Page 01</span>
              </div>
            </figure>
          </div>
        </section>

        {/* Amazon & Etsy Storefront Section */}
        <section className="featured" id="shops" aria-labelledby="featured-title">
          <div className="shell featured-inner">
            <div className="featured-grid">
              <div className="featured-col">
                <div className="section-heading section-heading-center">
                  <h2 id="featured-title">Find us on Amazon</h2>
                  <p>A new little adventure, delivered to your door.</p>
                </div>
                <a
                  className="amazon-tile group"
                  href="https://www.amazon.com/s?k=Mamas+Moon+coloring+books"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find Mama's Moon coloring books on Amazon, opens in a new tab"
                >
                  <span className="amazon-wordmark" aria-hidden="true">
                    amazon
                    <svg viewBox="0 0 180 42">
                      <path
                        d="M13 8c42 25 94 27 143 2M142 9l17-3-3 15"
                        fill="none"
                        stroke="#e99535"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="amazon-tile-copy">
                    Meet your next coloring companion <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </div>

              <div className="featured-col" id="etsy">
                <div className="section-heading section-heading-center">
                  <h2 id="etsy-title">Find us on Etsy</h2>
                  <p>Printable pages, cozy bundles, and little studio treasures.</p>
                </div>
                <a
                  className="amazon-tile etsy-tile group"
                  href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find Mama's Moon coloring books on Etsy, opens in a new tab"
                >
                  <span className="etsy-wordmark" aria-hidden="true">
                    Etsy
                    <svg viewBox="0 0 180 36">
                      <path
                        d="M18 18c44 12 100 12 144 0"
                        fill="none"
                        stroke="#d5582b"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="amazon-tile-copy">
                    Visit our little Etsy shop <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Smooth CSS Grid-Row Transitions */}
        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <div className="shell faq-inner">
            <figure className="faq-art">
              <img
                src="/assets/books-and-little-moments.webp"
                width={1100}
                height={619}
                alt="Miso peeks out of a box of books while Plum wraps one as a gift."
                loading="lazy"
              />
            </figure>
            <div className="faq-intro">
              <p className="eyebrow">
                <svg className="icon" aria-hidden="true">
                  <use href="#spark" />
                </svg>{' '}
                For the grown-ups
              </p>
              <h2 id="faq-title">Good to know.</h2>
              <p>A few things you might like to know before you open the crayon box.</p>
            </div>
            <div className="faq">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId((prev) => (prev === item.id ? null : item.id))}
                    >
                      <span>{item.question}</span>
                      <span className="faq-chevron" aria-hidden="true" />
                    </button>
                    <div className="faq-collapse">
                      <div className="faq-collapse-inner">
                        <p>{item.answerHtml}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Moon Mail Section */}
        <section className="moon-mail" id="moon-mail" aria-labelledby="mail-title">
          <div className="shell mail-inner">
            <div className="mail-copy">
              <p className="eyebrow">
                <svg className="icon" aria-hidden="true">
                  <use href="#mail" />
                </svg>{' '}
                Moon Mail
              </p>
              <h2 id="mail-title">A little letter from the moon.</h2>
              <p>
                We’re getting our little postbox ready. Until then, come by the Coloring Club for a
                free page and a few quiet minutes with Miso.
              </p>
            </div>
            <div className="mail-card">
              {!mailSubmitted ? (
                <form id="moon-mail-form" noValidate onSubmit={handleMailSubmit}>
                  <label htmlFor="mail-email">Your email</label>
                  <div className="mail-field">
                    <input
                      ref={mailInputRef}
                      id="mail-email"
                      name="email"
                      type="email"
                      value={mailEmail}
                      onChange={(e) => {
                        setMailEmail(e.target.value);
                        if (mailError) setMailError('');
                      }}
                      autoComplete="email"
                      placeholder="you@somewhere.com"
                      required
                      aria-invalid={Boolean(mailError)}
                      aria-describedby="mail-help mail-status"
                    />
                    <button className="button button-ink whitespace-nowrap" type="submit">
                      Preview{' '}
                      <svg className="icon" aria-hidden="true">
                        <use href="#arrow" />
                      </svg>
                    </button>
                  </div>
                  <p id="mail-help" className="mail-help">
                    Email subscriptions are coming soon. This form is a preview and does not send or
                    store your email.
                  </p>
                  <p
                    id="mail-status"
                    className={`mail-status ${mailError ? 'is-error' : ''}`}
                    role="status"
                  >
                    {mailError}
                  </p>
                </form>
              ) : (
                <div className="mail-success" role="status">
                  <span className="mail-success-icon" aria-hidden="true">
                    <svg className="icon">
                      <use href="#check" />
                    </svg>
                  </span>
                  <p>
                    <strong>Thanks for stopping by.</strong> Moon Mail is still getting ready. Email
                    subscriptions will open soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Scalloped Yellow Divider */}
      <footer className="footer">
        <div className="footer-scene">
          <figure className="footer-illustration">
            <img
              src="/assets/see-you-on-the-moon.webp"
              width={1400}
              height={477}
              alt="Miso and Plum wave goodbye with Pip and Sprout beside their open coloring book."
              loading="lazy"
            />
          </figure>
          <div className="scallop-divider" aria-hidden="true" />
        </div>
        <div className="footer-main">
          <div className="shell footer-inner">
            <div className="footer-brand">
              <BrandWordmark variant="footer" />
              <p className="footer-tagline">See you on the moon.</p>
              <p className="footer-blurb">
                Coloring books for little dreamers and their grown-ups. A small, happy world, one
                page at a time.
              </p>
            </div>
            <nav className="footer-nav" aria-label="Explore Mama's Moon">
              <div>
                <h2>Studio Shop</h2>
                <a href="#little-moon-picnic">The Little Moon Picnic</a>
                <a href="#collections">Sticker Collections</a>
                <a href="#laptop-stickers">Laptop Stickers</a>
                <a href="#kids-bedding">Kids Bedsheets &amp; Bedding</a>
                <a href="#digital-books">Digital PDF Coloring Books</a>
              </div>
              <div>
                <h2>Coloring Club</h2>
                <a href="#color">Color online</a>
                <a href="/assets/miso-moon-coloring.pdf" download>
                  Print the free page
                </a>
                <a href="#story">Meet the crew</a>
              </div>
              <div>
                <h2>Good to know</h2>
                <a href="#faq">Frequently asked questions</a>
                <a href="#moon-mail">Moon Mail</a>
                <a
                  href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find us on Etsy <span aria-hidden="true">↗</span>
                </a>
              </div>
            </nav>
          </div>
          <div className="shell footer-bottom">
            <p>
              © 2026 <BrandName />. A little world of color.
            </p>
            <p>For small hands and big imaginations.</p>
            <a href="#top">
              Back to top{' '}
              <svg className="icon" aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Gift Shortcut Tab */}
      {!giftDismissed && showGiftTab && (
        <aside className="gift-tab" aria-label="Free coloring page shortcut">
          <a href="#color" aria-label="Free coloring page">
            <img
              className="gift-doodle"
              src="/assets/gift-doodle.svg"
              width={32}
              height={35}
              alt=""
            />
            <span>A little gift</span>
          </a>
          <button
            type="button"
            aria-label="Dismiss free page shortcut"
            onClick={() => {
              setGiftDismissed(true);
              try {
                sessionStorage.setItem(GIFT_TAB_DISMISSED_KEY, 'yes');
              } catch {
                // Ignore
              }
            }}
          >
            <svg className="icon" aria-hidden="true">
              <use href="#close" />
            </svg>
          </button>
        </aside>
      )}

      {/* Interactive Modals */}
      <ColoringStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      <CatalogModal
        isOpen={catalogState.open}
        mode={catalogState.mode}
        savedIds={savedDigitalIds}
        onClose={() => setCatalogState((prev) => ({ ...prev, open: false }))}
        onSelectBook={(book) => setActiveBookPreview(book)}
      />

      <BookPreviewModal
        book={activeBookPreview}
        onClose={() => setActiveBookPreview(null)}
        onTryFreePage={() => setIsStudioOpen(true)}
      />

      <StickerPreviewModal
        sticker={activeStickerPreview}
        onClose={() => setActiveStickerPreview(null)}
        onAddToBag={handleAddToBag}
      />

      <LaptopStickerPreviewModal
        pack={activeLaptopStickerPreview}
        onClose={() => setActiveLaptopStickerPreview(null)}
        onAddToBag={handleAddToBag}
      />

      <KidsBeddingPreviewModal
        item={activeBeddingPreview}
        selectedSize={
          activeBeddingPreview
            ? selectedBeddingSizes[activeBeddingPreview.id] || activeBeddingPreview.defaultSize
            : 'Twin'
        }
        onSelectSize={handleSelectBeddingSize}
        onClose={() => setActiveBeddingPreview(null)}
        onAddToBag={handleAddToBag}
      />

      <DigitalPdfPreviewModal
        pdfBook={activePdfPreview}
        onClose={() => setActivePdfPreview(null)}
        onAddToBag={handleAddToBag}
      />

      <DigitalComboPreviewModal
        combo={activeComboPreview}
        isSaved={Boolean(activeComboPreview && savedDigitalIds.has(activeComboPreview.id))}
        onClose={() => setActiveComboPreview(null)}
        onAddToBag={handleAddToBag}
        onToggleSave={handleToggleSaveDigital}
      />

      <StudioBagModal
        isOpen={isBagOpen}
        quantities={bagQuantities}
        selectedBeddingSizes={selectedBeddingSizes}
        summary={bagSummary}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateBagQty}
        onClearBag={handleClearBag}
      />
    </>
  );
}
