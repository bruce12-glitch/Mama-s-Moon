import React, { useEffect, useRef, useState } from 'react';
import {
  BOOKS,
  CATALOG_SECTIONS,
  STICKER_COLLECTIONS,
  LAPTOP_STICKER_PACKS,
  KIDS_BEDDING_COLLECTION,
  DIGITAL_PDF_BOOKS,
  DIGITAL_COMBO_PACKS,
  BookItem,
  StickerProduct,
  LaptopStickerProduct,
  KidsBeddingProduct,
  KidsBeddingSize,
  DigitalPdfProduct,
  DigitalComboProduct,
} from '../data/moonMeshData';
import { filterCatalogItems, StudioBagSummary } from '../utils/moonMeshLogic';
import { BrandName } from './BrandName';

interface CatalogModalProps {
  isOpen: boolean;
  mode: 'search' | 'saved';
  savedIds: Set<string>;
  onClose: () => void;
  onSelectBook: (book: BookItem) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  mode,
  savedIds,
  onClose,
  onSelectBook,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      setQuery('');
      dialog.showModal();
      if (mode === 'search') {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, mode]);

  const allItems = [
    ...BOOKS.map((b) => ({
      id: b.id as string | undefined,
      title: b.title,
      theme: b.genre,
      keywords: `${b.description} ${b.previewDescription} ${b.keywords}`,
      image: b.coverImage,
      href: undefined as string | undefined,
      book: b as BookItem | undefined,
    })),
    ...DIGITAL_COMBO_PACKS.map((c) => ({
      id: c.id as string | undefined,
      title: c.title,
      theme: `Digital · ${c.pageCount} pages · $${c.price.toFixed(2)}`,
      keywords: `${c.subtitle} ${c.description} ${c.keywords}`,
      image: c.coverImage,
      href: `#${c.id}` as string | undefined,
      book: undefined as BookItem | undefined,
    })),
    ...(mode === 'search'
      ? [
          ...STICKER_COLLECTIONS.map((s) => ({
            id: s.id as string | undefined,
            title: s.title,
            theme: `${s.categoryLabel} · $${s.price.toFixed(2)}`,
            keywords: `${s.subtitle} ${s.description} ${s.pieceCount} ${s.finishSpec} sticker vinyl sheet pack`,
            image: s.primaryImage,
            href: '#collections' as string | undefined,
            book: undefined as BookItem | undefined,
          })),
          ...LAPTOP_STICKER_PACKS.map((l) => ({
            id: l.id as string | undefined,
            title: l.title,
            theme: `Laptop Stickers · ${l.finishLabel} · $${l.price.toFixed(2)}`,
            keywords: `${l.subtitle} ${l.description} ${l.materialSpec} ${l.fitDevices} ${l.keywords}`,
            image: l.image,
            href: `#${l.id}` as string | undefined,
            book: undefined as BookItem | undefined,
          })),
          ...KIDS_BEDDING_COLLECTION.map((b) => ({
            id: b.id as string | undefined,
            title: b.title,
            theme: `Kids Bedding · ${b.categoryLabel} · $${b.price.toFixed(2)}`,
            keywords: `${b.subtitle} ${b.description} ${b.fabricSpec} ${b.threadCount} ${b.keywords}`,
            image: b.image,
            href: `#${b.id}` as string | undefined,
            book: undefined as BookItem | undefined,
          })),
          ...DIGITAL_PDF_BOOKS.map((d) => ({
            id: d.id as string | undefined,
            title: d.title,
            theme: `${d.number} · ${d.pageCount} pages · $${d.price.toFixed(2)}`,
            keywords: `${d.subtitle} ${d.description} ${d.formatSpec} ${d.paperSpec} digital pdf printable coloring book`,
            image: d.coverImage,
            href: '#digital-books' as string | undefined,
            book: undefined as BookItem | undefined,
          })),
          ...CATALOG_SECTIONS.map((s) => ({
            ...s,
            id: undefined as string | undefined,
            book: undefined as BookItem | undefined,
          })),
        ]
      : []),
  ];

  const results = filterCatalogItems(allItems, query, mode, savedIds);

  const statusText =
    mode === 'saved'
      ? results.length
        ? 'Saved in this browser. Tap a book to peek inside.'
        : 'Tap a heart on a book to save it here.'
      : results.length
      ? query.trim()
        ? `${results.length} ${results.length === 1 ? 'match' : 'matches'}`
        : 'Explore books, stickers, digital PDFs, and more.'
      : 'No matches. Try a word like “sticker,” “PDF,” “moon,” or “printable.”';

  return (
    <dialog
      ref={dialogRef}
      id="catalog-dialog"
      className="dialog catalog-dialog"
      aria-labelledby="catalog-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close catalog" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      <p className="eyebrow">
        <svg className="icon" aria-hidden="true">
          <use href="#spark" />
        </svg>{' '}
        <BrandName />
      </p>
      <h2 id="catalog-title">{mode === 'saved' ? 'Saved books' : 'Find a book, sticker, or PDF'}</h2>
      {mode === 'search' && (
        <label className="catalog-search">
          <svg className="icon" aria-hidden="true">
            <use href="#search" />
          </svg>
          <span className="visually-hidden">Find a book, sticker, or PDF</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try sticker, PDF, kitten, picnic, or printable…"
            autoComplete="off"
          />
        </label>
      )}
      <p className="catalog-status" role="status">
        {statusText}
      </p>
      <ul className="catalog-results">
        {results.map((item) => (
          <li key={item.id || item.title}>
            {item.book ? (
              <button
                type="button"
                className="catalog-result"
                onClick={() => {
                  onClose();
                  onSelectBook(item.book!);
                }}
              >
                <span className="result-art">
                  <img src={item.image} alt="" loading="lazy" />
                </span>
                <span className="result-label">
                  <strong>{item.title}</strong>
                  <small>{item.theme}</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <a
                href={item.href}
                className="catalog-result"
                onClick={() => {
                  onClose();
                }}
              >
                <span className="result-art">
                  <img src={item.image} alt="" loading="lazy" />
                </span>
                <span className="result-label">
                  <strong>{item.title}</strong>
                  <small>{item.theme}</small>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </dialog>
  );
};

interface BookPreviewModalProps {
  book: BookItem | null;
  onClose: () => void;
  onTryFreePage: () => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  onClose,
  onTryFreePage,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (book && !dialog.open) {
      dialog.showModal();
    } else if (!book && dialog.open) {
      dialog.close();
    }
  }, [book]);

  return (
    <dialog
      ref={dialogRef}
      id="book-dialog"
      className="dialog book-dialog"
      aria-labelledby="preview-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close book preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {book && (
        <>
          <div className={`preview-art cocowyo-shelf-stage ${book.themeClass}`}>
            <div className="cocowyo-shelf-curtains" aria-hidden="true" />
            <div className="cocowyo-shelf-wood" aria-hidden="true" />
            <div className="cocowyo-book-stage-group" aria-hidden="true">
              <img
                src="/assets/prop-courier-bird.webp"
                alt=""
                className="book-stage-prop prop-courier-bird"
              />
              <img
                src="/assets/prop-open-easel.webp"
                alt=""
                className="book-stage-prop prop-open-easel"
              />
              <img
                src="/assets/prop-alcohol-marker.webp"
                alt=""
                className="book-stage-prop prop-alcohol-marker"
              />
              <span className="standing-3d-book-figure">
                <img
                  src={book.standingImage || '/assets/standing-3d-book.webp?v=mamas-moon-3'}
                  width={670}
                  height={745}
                  alt=""
                  className="standing-3d-book-img"
                />
                <span className="standing-3d-book-sheen" />
              </span>
            </div>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {book.number} · {book.genre}
            </p>
            <h2 id="preview-title">{book.title}</h2>
            <p id="preview-description">{book.previewDescription}</p>
            <div className="dialog-actions">
              <a
                className="button button-ink preview-amazon whitespace-nowrap"
                href="https://www.amazon.com/s?k=Mamas+Moon+coloring+books"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find on Amazon <span aria-hidden="true">↗</span>
              </a>
              <button
                className="text-link whitespace-nowrap"
                type="button"
                id="preview-color"
                onClick={() => {
                  onClose();
                  onTryFreePage();
                }}
              >
                Try a free page{' '}
                <svg className="icon" aria-hidden="true">
                  <use href="#arrow" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface StickerPreviewModalProps {
  sticker: StickerProduct | null;
  onClose: () => void;
  onAddToBag: (productId: string) => void;
}

export const StickerPreviewModal: React.FC<StickerPreviewModalProps> = ({
  sticker,
  onClose,
  onAddToBag,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sticker && !dialog.open) {
      dialog.showModal();
    } else if (!sticker && dialog.open) {
      dialog.close();
    }
  }, [sticker]);

  return (
    <dialog
      ref={dialogRef}
      id="sticker-preview-dialog"
      className="dialog book-dialog"
      aria-labelledby="sticker-modal-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close sticker preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {sticker && (
        <>
          <div className="preview-art" style={{ background: sticker.bgTint }}>
            <div className="sticker-modal-stage">
              <img
                src={sticker.primaryImage}
                alt={sticker.title}
                className="sticker-modal-img"
              />
            </div>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {sticker.categoryLabel} · {sticker.pieceCount}
            </p>
            <h2 id="sticker-modal-title">{sticker.title}</h2>
            <p className="mt-2 text-lg font-bold text-[#2C2028] tabular-nums">
              ${sticker.price.toFixed(2)}
              {sticker.compareAtPrice && (
                <span className="ml-2 text-sm font-normal text-[#847886] line-through">
                  ${sticker.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p>{sticker.description}</p>
            <p className="mt-3 text-xs font-semibold text-[#6F6472]">
              {sticker.finishSpec} · {sticker.sizeSpec} · Characters: {sticker.characters.join(', ')}
            </p>
            <div className="dialog-actions">
              <button
                type="button"
                className="button button-ink whitespace-nowrap"
                onClick={() => {
                  onAddToBag(sticker.id);
                  onClose();
                }}
              >
                Add to Studio Bag · ${sticker.price.toFixed(2)}
              </button>
              <a
                className="text-link whitespace-nowrap"
                href={sticker.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on Etsy <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface LaptopStickerPreviewModalProps {
  pack: LaptopStickerProduct | null;
  onClose: () => void;
  onAddToBag: (productId: string) => void;
}

export const LaptopStickerPreviewModal: React.FC<LaptopStickerPreviewModalProps> = ({
  pack,
  onClose,
  onAddToBag,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [showLidView, setShowLidView] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pack && !dialog.open) {
      setShowLidView(true);
      dialog.showModal();
    } else if (!pack && dialog.open) {
      dialog.close();
    }
  }, [pack]);

  return (
    <dialog
      ref={dialogRef}
      id="laptop-sticker-dialog"
      className="dialog book-dialog"
      aria-labelledby="laptop-sticker-modal-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close laptop sticker preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {pack && (
        <>
          <div className="preview-art flex-col gap-3" style={{ background: pack.bgTint }}>
            {showLidView ? (
              <div className="laptop-lid-mockup" aria-label="Laptop lid placement preview">
                <div className="laptop-lid-surface">
                  <img
                    src={pack.image}
                    alt={`${pack.title} styled on a laptop lid`}
                    referrerPolicy="no-referrer"
                    className="laptop-lid-sticker-art"
                  />
                  <span className="laptop-lid-hinge" aria-hidden="true" />
                </div>
              </div>
            ) : (
              <div className="sticker-modal-stage">
                <img
                  src={pack.image}
                  alt={pack.title}
                  referrerPolicy="no-referrer"
                  className="sticker-modal-img"
                />
              </div>
            )}
            <button
              type="button"
              className="button button-paper text-xs py-1.5 px-3.5 whitespace-nowrap"
              onClick={() => setShowLidView((prev) => !prev)}
            >
              {showLidView ? 'View Flat Sticker Pack' : 'Preview on Laptop Lid'}
            </button>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {pack.finishLabel} &middot; {pack.decalCount} Laptop Decals
            </p>
            <h2 id="laptop-sticker-modal-title">{pack.title}</h2>
            <p className="mt-2 text-lg font-bold text-[#2C2028] tabular-nums">
              ${pack.price.toFixed(2)}
              {pack.compareAtPrice && (
                <span className="ml-2 text-sm font-normal text-[#847886] line-through">
                  ${pack.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p>{pack.description}</p>
            <p className="mt-3 text-xs font-semibold text-[#6F6472]">
              {pack.materialSpec} &middot; {pack.sizeSpec} &middot; {pack.fitDevices}
            </p>
            <div className="dialog-actions">
              <button
                type="button"
                className="button button-ink whitespace-nowrap"
                onClick={() => {
                  onAddToBag(pack.id);
                  onClose();
                }}
              >
                Add to Studio Bag · ${pack.price.toFixed(2)}
              </button>
              <a
                className="text-link whitespace-nowrap"
                href={pack.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on Etsy <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface KidsBeddingPreviewModalProps {
  item: KidsBeddingProduct | null;
  selectedSize: KidsBeddingSize;
  onSelectSize: (productId: string, size: KidsBeddingSize) => void;
  onClose: () => void;
  onAddToBag: (productId: string) => void;
}

export const KidsBeddingPreviewModal: React.FC<KidsBeddingPreviewModalProps> = ({
  item,
  selectedSize,
  onSelectSize,
  onClose,
  onAddToBag,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      id="kids-bedding-dialog"
      className="dialog book-dialog"
      aria-labelledby="bedding-modal-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close kids bedding preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {item && (
        <>
          <div className="preview-art flex-col gap-3" style={{ background: item.bgTint }}>
            <div className="kids-bedding-modal-frame">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="kids-bedding-modal-img"
              />
            </div>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {item.categoryLabel} &middot; {item.pieceCount}
            </p>
            <h2 id="bedding-modal-title">{item.title}</h2>
            <p className="mt-2 text-lg font-bold text-[#2C2028] tabular-nums">
              ${item.price.toFixed(2)}
              {item.compareAtPrice && (
                <span className="ml-2 text-sm font-normal text-[#847886] line-through">
                  ${item.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p>{item.description}</p>
            <p className="mt-3 text-xs font-semibold text-[#6F6472]">
              {item.fabricSpec} &middot; {item.threadCount} &middot; {item.careSpec}
            </p>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-bold text-[#4F4452]">Bed Size</p>
              <div
                className="kids-bedding-size-row"
                role="group"
                aria-label={`Choose bed size for ${item.title}`}
              >
                {item.availableSizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={isActive}
                      className={`kids-bedding-size-btn whitespace-nowrap shrink-0 ${
                        isActive ? 'is-selected' : ''
                      }`}
                      onClick={() => onSelectSize(item.id, size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                className="button button-ink whitespace-nowrap"
                onClick={() => {
                  onAddToBag(item.id);
                  onClose();
                }}
              >
                Add ({selectedSize}) to Bag &middot; ${item.price.toFixed(2)}
              </button>
              <a
                className="text-link whitespace-nowrap"
                href={item.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on Etsy <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface DigitalPdfPreviewModalProps {
  pdfBook: DigitalPdfProduct | null;
  onClose: () => void;
  onAddToBag: (productId: string) => void;
}

export const DigitalPdfPreviewModal: React.FC<DigitalPdfPreviewModalProps> = ({
  pdfBook,
  onClose,
  onAddToBag,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [showColoredSample, setShowColoredSample] = useState(false);
  const [isPrintFriendly, setIsPrintFriendly] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pdfBook && !dialog.open) {
      setShowColoredSample(false);
      setIsPrintFriendly(false);
      dialog.showModal();
    } else if (!pdfBook && dialog.open) {
      dialog.close();
    }
  }, [pdfBook]);

  return (
    <dialog
      ref={dialogRef}
      id="digital-pdf-dialog"
      className="dialog book-dialog"
      aria-labelledby="pdf-modal-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close digital PDF preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {pdfBook && (
        <>
          <div
            className={`preview-art flex-col gap-3 ${isPrintFriendly ? 'is-print-friendly-digital' : ''}`}
            style={{ background: isPrintFriendly ? '#FFFFFF' : pdfBook.bgTint }}
          >
            <div className="pdf-modal-sheet-frame">
              <img
                src={
                  isPrintFriendly
                    ? pdfBook.samplePreviewSvg
                    : showColoredSample
                    ? pdfBook.sampleColoredSvg
                    : pdfBook.samplePreviewSvg
                }
                alt={`Sample interior page from ${pdfBook.title}`}
                className="pdf-modal-sheet-img"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={isPrintFriendly}
                className={`button text-xs py-1.5 px-3.5 whitespace-nowrap ${
                  isPrintFriendly ? 'button-ink' : 'button-paper'
                }`}
                onClick={() => setIsPrintFriendly((prev) => !prev)}
              >
                {isPrintFriendly ? 'Print-Friendly B&W: On' : 'Print-Friendly Mode'}
              </button>
              {!isPrintFriendly && (
                <button
                  type="button"
                  className="button button-paper text-xs py-1.5 px-3.5 whitespace-nowrap"
                  onClick={() => setShowColoredSample((prev) => !prev)}
                >
                  {showColoredSample ? 'View Blank Line Art' : 'Preview Colored Example'}
                </button>
              )}
            </div>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {pdfBook.number} · {pdfBook.pageCount} Printable Pages
            </p>
            <h2 id="pdf-modal-title">{pdfBook.title}</h2>
            <p className="mt-2 text-lg font-bold text-[#2C2028] tabular-nums">
              ${pdfBook.price.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-[#6F6472]">· Instant PDF Download</span>
            </p>
            <p>{pdfBook.description}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-[#4F4452]">
              {pdfBook.includedItems.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="text-[#C84B62] font-bold" aria-hidden="true">
                    ✦
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="dialog-actions">
              <button
                type="button"
                className="button button-ink whitespace-nowrap"
                onClick={() => {
                  onAddToBag(pdfBook.id);
                  onClose();
                }}
              >
                Add PDF to Bag · ${pdfBook.price.toFixed(2)}
              </button>
              <a
                className="button button-outline whitespace-nowrap"
                href={pdfBook.samplePdfUrl}
                download
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#download" />
                </svg>{' '}
                Free Sample Sheet (PDF)
              </a>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

export interface DigitalComboPreviewModalProps {
  combo: DigitalComboProduct | null;
  isSaved: boolean;
  onClose: () => void;
  onAddToBag: (productId: string) => void;
  onToggleSave: (productId: string) => void;
}

export const DigitalComboPreviewModal: React.FC<DigitalComboPreviewModalProps> = ({
  combo,
  isSaved,
  onClose,
  onAddToBag,
  onToggleSave,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [showColoredSample, setShowColoredSample] = useState(false);
  const [isPrintFriendly, setIsPrintFriendly] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (combo && !dialog.open) {
      setShowColoredSample(false);
      setIsPrintFriendly(false);
      dialog.showModal();
    } else if (!combo && dialog.open) {
      dialog.close();
    }
  }, [combo]);

  return (
    <dialog
      ref={dialogRef}
      id="digital-combo-dialog"
      className="dialog book-dialog"
      aria-labelledby="combo-modal-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close digital combo preview" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      {combo && (
        <>
          <div
            className={`preview-art flex-col gap-3 ${isPrintFriendly ? 'is-print-friendly-digital' : ''}`}
            style={{ background: isPrintFriendly ? '#FFFFFF' : combo.coverBg }}
          >
            <div className="pdf-modal-sheet-frame">
              <img
                src={
                  isPrintFriendly
                    ? combo.samplePages[0] || combo.coverImage
                    : showColoredSample
                    ? combo.sampleColoredSvg
                    : combo.coverImage
                }
                alt={
                  isPrintFriendly
                    ? `Print-friendly black-and-white sample page from ${combo.title}`
                    : showColoredSample
                    ? `Colored sample page from ${combo.title}`
                    : `${combo.title} cover artwork`
                }
                className="pdf-modal-sheet-img"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={isPrintFriendly}
                className={`button text-xs py-1.5 px-3.5 whitespace-nowrap ${
                  isPrintFriendly ? 'button-ink' : 'button-paper'
                }`}
                onClick={() => setIsPrintFriendly((prev) => !prev)}
              >
                {isPrintFriendly ? 'Print-Friendly B&W: On' : 'Print-Friendly Mode'}
              </button>
              {!isPrintFriendly && (
                <button
                  type="button"
                  className="button button-paper text-xs py-1.5 px-3.5 whitespace-nowrap"
                  onClick={() => setShowColoredSample((prev) => !prev)}
                >
                  {showColoredSample ? 'View Combo Cover' : 'Preview Colored Sample Page'}
                </button>
              )}
            </div>
          </div>
          <div className="preview-copy">
            <p className="eyebrow">
              <svg className="icon" aria-hidden="true">
                <use href="#spark" />
              </svg>{' '}
              {combo.comboLabel} · {combo.pageCount} Digital Coloring Pages
            </p>
            <h2 id="combo-modal-title">{combo.title}</h2>
            <p className="mt-2 text-lg font-bold text-[#2C2028] tabular-nums">
              ${combo.price.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-[#6F6472]">
                · Instant PDF Download · {combo.ageRange}
              </span>
            </p>
            <p>{combo.description}</p>
            <p className="mt-3 text-xs font-semibold text-[#6F6472]">{combo.formatSpec}</p>
            <div className="dialog-actions">
              <button
                type="button"
                className="button button-ink whitespace-nowrap"
                onClick={() => {
                  onAddToBag(combo.id);
                  onClose();
                }}
              >
                Add to Studio Bag · ${combo.price.toFixed(2)}
              </button>
              <button
                type="button"
                className="button button-outline whitespace-nowrap"
                aria-pressed={isSaved}
                onClick={() => onToggleSave(combo.id)}
              >
                {isSaved ? 'Saved ♥' : 'Save Favorite ♡'}
              </button>
              <a
                className="text-link whitespace-nowrap"
                href={combo.samplePdfUrl}
                download
              >
                Free Sample Sheet (PDF)
              </a>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface StudioBagModalProps {
  isOpen: boolean;
  quantities: Record<string, number>;
  selectedBeddingSizes?: Record<string, KidsBeddingSize>;
  summary: StudioBagSummary;
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onClearBag: () => void;
}

export const StudioBagModal: React.FC<StudioBagModalProps> = ({
  isOpen,
  quantities,
  selectedBeddingSizes = {},
  summary,
  onClose,
  onUpdateQty,
  onClearBag,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const bagLines = [
    ...STICKER_COLLECTIONS.filter((s) => (quantities[s.id] || 0) > 0).map((s) => ({
      id: s.id,
      title: s.title,
      meta: `${s.categoryLabel} · ${s.pieceCount}`,
      price: s.price,
      qty: quantities[s.id] || 0,
      image: s.primaryImage,
      isDigital: false,
      downloadUrl: undefined as string | undefined,
    })),
    ...LAPTOP_STICKER_PACKS.filter((l) => (quantities[l.id] || 0) > 0).map((l) => ({
      id: l.id,
      title: l.title,
      meta: `Laptop Stickers · ${l.finishLabel} · ${l.decalCount} decals`,
      price: l.price,
      qty: quantities[l.id] || 0,
      image: l.image,
      isDigital: false,
      downloadUrl: undefined as string | undefined,
    })),
    ...KIDS_BEDDING_COLLECTION.filter((b) => (quantities[b.id] || 0) > 0).map((b) => ({
      id: b.id,
      title: b.title,
      meta: `Kids Bedding · ${selectedBeddingSizes[b.id] || b.defaultSize} · ${b.pieceCount}`,
      price: b.price,
      qty: quantities[b.id] || 0,
      image: b.image,
      isDigital: false,
      downloadUrl: undefined as string | undefined,
    })),
    ...DIGITAL_COMBO_PACKS.filter((c) => (quantities[c.id] || 0) > 0).map((c) => ({
      id: c.id,
      title: c.title,
      meta: `${c.pageCount} Digital Coloring Pages · Instant Download`,
      price: c.price,
      qty: quantities[c.id] || 0,
      image: c.coverImage,
      isDigital: true,
      downloadUrl: c.samplePdfUrl,
    })),
    ...DIGITAL_PDF_BOOKS.filter((d) => (quantities[d.id] || 0) > 0).map((d) => ({
      id: d.id,
      title: d.title,
      meta: `${d.pageCount} pages · ${d.formatSpec} · Instant Download`,
      price: d.price,
      qty: quantities[d.id] || 0,
      image: d.coverImage,
      isDigital: true,
      downloadUrl: d.samplePdfUrl,
    })),
  ];

  return (
    <dialog
      ref={dialogRef}
      id="studio-bag-dialog"
      className="dialog catalog-dialog"
      aria-labelledby="studio-bag-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close studio bag" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      <p className="eyebrow">
        <svg className="icon" aria-hidden="true">
          <use href="#spark" />
        </svg>{' '}
        <BrandName /> Studio Shop
      </p>
      <h2 id="studio-bag-title">Your Studio Bag ({summary.totalItems})</h2>

      <div className="bag-shipping-banner">
        {summary.qualifiesForFreeShipping ? (
          <p>
            <strong>✦ Free Studio Sticker Shipping unlocked!</strong> Digital PDFs are delivered
            instantly upon checkout.
          </p>
        ) : (
          <p>
            Add <strong className="tabular-nums">${summary.amountToFreeShipping.toFixed(2)}</strong>{' '}
            more to unlock free shipping on physical sticker packs (Digital PDFs always deliver
            free).
          </p>
        )}
      </div>

      {bagLines.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-base text-[#5D5361]">
            Your studio bag is empty. Pick a vinyl sticker pack or a printable PDF coloring book to
            get started!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a className="button button-ink whitespace-nowrap" href="#collections" onClick={onClose}>
              Browse Stickers
            </a>
            <a
              className="button button-outline whitespace-nowrap"
              href="#digital-books"
              onClick={onClose}
            >
              Browse Digital PDFs
            </a>
          </div>
        </div>
      ) : (
        <>
          <ul className="bag-item-list">
            {bagLines.map((line) => (
              <li key={line.id} className="bag-item-row">
                <img src={line.image} alt="" className="bag-item-thumb" />
                <div className="bag-item-info">
                  <strong>{line.title}</strong>
                  <small>{line.meta}</small>
                  <span className="bag-item-price tabular-nums">
                    ${(line.price * line.qty).toFixed(2)}{' '}
                    <span className="text-xs font-normal text-[#7B7080]">
                      (${line.price.toFixed(2)} each)
                    </span>
                  </span>
                </div>
                <div className="bag-qty-controls" aria-label={`Quantity for ${line.title}`}>
                  <button
                    type="button"
                    className="bag-qty-btn"
                    aria-label={`Decrease quantity of ${line.title}`}
                    onClick={() => onUpdateQty(line.id, -1)}
                  >
                    −
                  </button>
                  <span className="bag-qty-value tabular-nums">{line.qty}</span>
                  <button
                    type="button"
                    className="bag-qty-btn"
                    aria-label={`Increase quantity of ${line.title}`}
                    onClick={() => onUpdateQty(line.id, 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="bag-summary-footer">
            <div className="flex items-center justify-between text-base font-bold text-[#2C2028]">
              <span>Estimated Subtotal</span>
              <span className="text-xl tabular-nums">${summary.subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-1 text-xs text-[#706575]">
              Physical sticker orders ship in protective glassine mailers · Digital PDF coloring
              books include both A4 &amp; US Letter 300 DPI files.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <a
                className="button button-ink flex-1 justify-center whitespace-nowrap"
                href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books+stickers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checkout via Etsy Studio Shop <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="text-link text-xs whitespace-nowrap"
                onClick={onClearBag}
              >
                Clear bag
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

interface WishlistModalProps {
  isOpen: boolean;
  wishlistIds: Set<string>;
  selectedBeddingSizes: Record<string, KidsBeddingSize>;
  bagQuantities: Record<string, number>;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onClearWishlist: () => void;
  onAddToBag: (id: string) => void;
  onPreviewBook: (book: BookItem) => void;
  onPreviewSticker: (sticker: StickerProduct) => void;
  onPreviewLaptopSticker: (pack: LaptopStickerProduct) => void;
  onPreviewBedding: (item: KidsBeddingProduct) => void;
  onPreviewPdf: (pdfBook: DigitalPdfProduct) => void;
  onPreviewCombo: (combo: DigitalComboProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  wishlistIds,
  selectedBeddingSizes,
  bagQuantities,
  onClose,
  onToggleWishlist,
  onClearWishlist,
  onAddToBag,
  onPreviewBook,
  onPreviewSticker,
  onPreviewLaptopSticker,
  onPreviewBedding,
  onPreviewPdf,
  onPreviewCombo,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  type WishlistEntry = {
    id: string;
    title: string;
    category: string;
    meta: string;
    priceLabel: string;
    image: string;
    canAddToBag: boolean;
    onPreview: () => void;
  };

  const entryMap = new Map<string, WishlistEntry>();

  for (const b of BOOKS) {
    entryMap.set(b.id, {
      id: b.id,
      title: b.title,
      category: 'Storybooks',
      meta: `${b.genre} · ${b.stageTagline}`,
      priceLabel: 'Hardcover & Paperback',
      image: b.coverImage,
      canAddToBag: false,
      onPreview: () => {
        onClose();
        onPreviewBook(b);
      },
    });
  }

  for (const s of STICKER_COLLECTIONS) {
    entryMap.set(s.id, {
      id: s.id,
      title: s.title,
      category: 'Stickers',
      meta: `${s.categoryLabel} · ${s.pieceCount}`,
      priceLabel: `$${s.price.toFixed(2)}`,
      image: s.primaryImage,
      canAddToBag: true,
      onPreview: () => {
        onClose();
        onPreviewSticker(s);
      },
    });
  }

  for (const l of LAPTOP_STICKER_PACKS) {
    entryMap.set(l.id, {
      id: l.id,
      title: l.title,
      category: 'Laptop Stickers',
      meta: `${l.finishLabel} · ${l.decalCount} decals`,
      priceLabel: `$${l.price.toFixed(2)}`,
      image: l.image,
      canAddToBag: true,
      onPreview: () => {
        onClose();
        onPreviewLaptopSticker(l);
      },
    });
  }

  for (const bed of KIDS_BEDDING_COLLECTION) {
    const chosenSize = selectedBeddingSizes[bed.id] || bed.defaultSize;
    entryMap.set(bed.id, {
      id: bed.id,
      title: bed.title,
      category: 'Kids Bedding',
      meta: `${chosenSize} · ${bed.pieceCount}`,
      priceLabel: `$${bed.price.toFixed(2)}`,
      image: bed.image,
      canAddToBag: true,
      onPreview: () => {
        onClose();
        onPreviewBedding(bed);
      },
    });
  }

  for (const d of DIGITAL_PDF_BOOKS) {
    entryMap.set(d.id, {
      id: d.id,
      title: d.title,
      category: 'Digital PDF',
      meta: `${d.pageCount} pages · ${d.formatSpec}`,
      priceLabel: `$${d.price.toFixed(2)}`,
      image: d.coverImage,
      canAddToBag: true,
      onPreview: () => {
        onClose();
        onPreviewPdf(d);
      },
    });
  }

  for (const c of DIGITAL_COMBO_PACKS) {
    entryMap.set(c.id, {
      id: c.id,
      title: c.title,
      category: 'Digital Combo',
      meta: `${c.pageCount} Digital Coloring Pages`,
      priceLabel: `$${c.price.toFixed(2)}`,
      image: c.coverImage,
      canAddToBag: true,
      onPreview: () => {
        onClose();
        onPreviewCombo(c);
      },
    });
  }

  const savedEntries = Array.from(wishlistIds)
    .map((id) => entryMap.get(id))
    .filter((entry): entry is WishlistEntry => Boolean(entry));

  return (
    <dialog
      ref={dialogRef}
      id="wishlist-dialog"
      className="dialog catalog-dialog"
      aria-labelledby="wishlist-dialog-title"
      onClose={onClose}
    >
      <div className="dialog-close">
        <button type="button" aria-label="Close wishlist" onClick={onClose}>
          <svg className="icon" aria-hidden="true">
            <use href="#close" />
          </svg>
        </button>
      </div>
      <p className="eyebrow">
        <svg className="icon" aria-hidden="true">
          <use href="#heart" />
        </svg>{' '}
        <BrandName /> Wishlist
      </p>
      <h2 id="wishlist-dialog-title">Saved Wishlist ({savedEntries.length})</h2>
      <p className="mt-1 text-sm text-[#5D5361]">
        Your favorite storybooks, cozy stickers, and kids room bedding saved automatically on this
        device.
      </p>

      {savedEntries.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-base text-[#5D5361]">
            Your wishlist is empty. Tap the heart icon on any storybook, sticker pack, or kids
            bedsheet set to save it here!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a className="button button-ink whitespace-nowrap" href="#books" onClick={onClose}>
              Browse Books
            </a>
            <a
              className="button button-outline whitespace-nowrap"
              href="#collections"
              onClick={onClose}
            >
              Browse Stickers
            </a>
            <a
              className="button button-outline whitespace-nowrap"
              href="#kids-bedding"
              onClick={onClose}
            >
              Browse Kids Bedding
            </a>
          </div>
        </div>
      ) : (
        <>
          <ul className="bag-item-list">
            {savedEntries.map((entry) => {
              const inBag = bagQuantities[entry.id] || 0;
              return (
                <li key={entry.id} className="bag-item-row wishlist-item-row">
                  <button
                    type="button"
                    className="wishlist-thumb-btn"
                    onClick={entry.onPreview}
                    aria-label={`Inspect ${entry.title}`}
                  >
                    <img src={entry.image} alt="" className="bag-item-thumb" />
                  </button>
                  <div className="bag-item-info">
                    <span className="wishlist-category-tag">{entry.category}</span>
                    <strong>{entry.title}</strong>
                    <small>{entry.meta}</small>
                    <span className="bag-item-price tabular-nums">{entry.priceLabel}</span>
                  </div>
                  <div className="wishlist-row-actions">
                    {entry.canAddToBag ? (
                      <button
                        type="button"
                        className="button button-ink wishlist-action-btn whitespace-nowrap"
                        onClick={() => onAddToBag(entry.id)}
                      >
                        {inBag > 0 ? `In Bag (${inBag})` : 'Add to Bag'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button button-ink wishlist-action-btn whitespace-nowrap"
                        onClick={entry.onPreview}
                      >
                        Peek Inside
                      </button>
                    )}
                    <button
                      type="button"
                      className="wishlist-remove-btn whitespace-nowrap"
                      aria-label={`Remove ${entry.title} from wishlist`}
                      onClick={() => onToggleWishlist(entry.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="bag-summary-footer flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#706575]">
              Saved to local browser storage under &ldquo;wishlist&rdquo;.
            </span>
            <button
              type="button"
              className="text-link text-xs whitespace-nowrap"
              onClick={onClearWishlist}
            >
              Clear wishlist
            </button>
          </div>
        </>
      )}
    </dialog>
  );
};


