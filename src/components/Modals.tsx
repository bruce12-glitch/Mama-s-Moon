import React, { useEffect, useRef, useState } from 'react';
import {
  BOOKS,
  CATALOG_SECTIONS,
  STICKER_COLLECTIONS,
  DIGITAL_PDF_BOOKS,
  BookItem,
  StickerProduct,
  DigitalPdfProduct,
} from '../data/moonMeshData';
import { filterCatalogItems, StudioBagSummary } from '../utils/moonMeshLogic';

interface CatalogModalProps {
  isOpen: boolean;
  mode: 'search' | 'saved';
  savedIds: Set<string>;
  onClose: () => void;
  onSelectBook: (book: BookItem) => void;
  onOpen3DScene: () => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  mode,
  savedIds,
  onClose,
  onSelectBook,
  onOpen3DScene,
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
        : 'Explore books, stickers, digital PDFs, 3D scenes, and more.'
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
        Moon Mesh
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
            placeholder="Try sticker, PDF, kitten, 3D, or printable…"
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
                onClick={(e) => {
                  onClose();
                  if (item.href === '#three-studio') {
                    e.preventDefault();
                    onOpen3DScene();
                  }
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
                  src="/assets/standing-3d-book.webp"
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
                href="https://www.amazon.com/s?k=Moon+Mesh+coloring+books"
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
              <span className="sticker-modal-charm" aria-hidden="true">
                <img src={sticker.accentImage} alt="" />
              </span>
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pdfBook && !dialog.open) {
      setShowColoredSample(false);
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
          <div className="preview-art flex-col gap-3" style={{ background: pdfBook.bgTint }}>
            <div className="pdf-modal-sheet-frame">
              <img
                src={showColoredSample ? pdfBook.sampleColoredSvg : pdfBook.samplePreviewSvg}
                alt={`Sample interior page from ${pdfBook.title}`}
                className="pdf-modal-sheet-img"
              />
            </div>
            <button
              type="button"
              className="button button-paper text-xs py-1.5 px-3.5 whitespace-nowrap"
              onClick={() => setShowColoredSample((prev) => !prev)}
            >
              {showColoredSample ? 'View Blank Printable Line Art' : 'Preview Colored Example'}
            </button>
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

interface StudioBagModalProps {
  isOpen: boolean;
  quantities: Record<string, number>;
  summary: StudioBagSummary;
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onClearBag: () => void;
}

export const StudioBagModal: React.FC<StudioBagModalProps> = ({
  isOpen,
  quantities,
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
        Moon Mesh Studio Shop
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
                href="https://www.etsy.com/search?q=Moon+Mesh+coloring+books+stickers"
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

