import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Heart,
  Star,
  Check,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Truck,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { MarketplaceProduct } from '../data/storeCatalog';
import {
  MarketplaceCartSummary,
  validateCheckoutForm,
} from '../utils/storeLogic';

/* -------------------------------------------------------------------------- */
/* Product Detail Modal (PDP)                                                 */
/* -------------------------------------------------------------------------- */
interface ProductDetailModalProps {
  product: MarketplaceProduct | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (productId: string) => void;
  onAddToCart: (productId: string, variantId: string, qty: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isSaved,
  onClose,
  onToggleSave,
  onAddToCart,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product) {
      setSelectedVariantId(product.variants[0]?.id ?? '');
      setQuantity(1);
      setAddedFeedback(false);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [product]);

  if (!product) {
    return <dialog ref={dialogRef} className="store-dialog" onClose={onClose} />;
  }

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleAdd = () => {
    if (!activeVariant) return;
    onAddToCart(product.id, activeVariant.id, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <dialog
      ref={dialogRef}
      id="product-detail-dialog"
      className="store-dialog pdp-dialog"
      aria-labelledby="pdp-title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal-close-btn"
        aria-label="Close product details"
        onClick={onClose}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div className="pdp-grid">
        <div className="pdp-gallery">
          <div className="pdp-image-frame">
            <img
              src={product.image}
              alt={product.title}
              width={600}
              height={450}
            />
          </div>
          <div className="pdp-spec-strip">
            <div>
              <span>Fulfillment</span>
              <strong>{product.fulfillmentType}</strong>
            </div>
            <div>
              <span>Channels</span>
              <strong>{product.bestChannel}</strong>
            </div>
            <div>
              <span>Audience</span>
              <strong>{product.ageRange}</strong>
            </div>
          </div>
        </div>

        <div className="pdp-buy-column">
          <p className="pdp-department-line">
            {product.departmentLabel} · SKU {activeVariant?.skuCode}
          </p>
          <h2 id="pdp-title">{product.title}</h2>

          <div className="pdp-rating-row">
            <Star size={16} fill="#F59E0B" stroke="#F59E0B" aria-hidden="true" />
            <strong className="tabular-nums">{product.rating.toFixed(1)}</strong>
            <span className="tabular-nums">({product.reviewCount} verified reviews)</span>
          </div>

          <div className="pdp-price-row">
            <span className="pdp-price tabular-nums">
              ${activeVariant?.price.toFixed(2)}
            </span>
            <span className="pdp-delivery-note">
              {activeVariant?.isPhysical ? (
                <>
                  <Truck size={15} aria-hidden="true" /> {activeVariant.deliverySummary}
                </>
              ) : (
                <>
                  <Download size={15} aria-hidden="true" /> {activeVariant?.deliverySummary}
                </>
              )}
            </span>
          </div>

          <p className="pdp-description">{product.description}</p>

          <div className="pdp-variants">
            <p className="pdp-variants-label">Choose Edition / Format:</p>
            <div className="pdp-variant-list" role="radiogroup" aria-label="Product editions">
              {product.variants.map((variant) => {
                const isSelected = variant.id === activeVariant?.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`pdp-variant-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    <span className="variant-title">{variant.label}</span>
                    <span className="variant-price tabular-nums">
                      ${variant.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pdp-purchase-controls">
            <div className="pdp-qty-stepper" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <span className="tabular-nums">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                <Plus size={15} aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className={`btn-pdp-add ${addedFeedback ? 'is-added' : ''}`}
              onClick={handleAdd}
            >
              {addedFeedback ? (
                <>
                  <Check size={17} aria-hidden="true" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={17} aria-hidden="true" />
                  <span className="tabular-nums">
                    Add to Cart · $
                    {((activeVariant?.price ?? 0) * quantity).toFixed(2)}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              className={`btn-pdp-save ${isSaved ? 'is-saved' : ''}`}
              aria-pressed={isSaved}
              onClick={() => onToggleSave(product.id)}
            >
              <Heart
                size={17}
                fill={isSaved ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <ul className="pdp-feature-list">
            {product.features.map((feat) => (
              <li key={feat}>
                <Check size={15} aria-hidden="true" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
};

/* -------------------------------------------------------------------------- */
/* Cart & Checkout Modal                                                      */
/* -------------------------------------------------------------------------- */
interface CartModalProps {
  isOpen: boolean;
  summary: MarketplaceCartSummary;
  onClose: () => void;
  onUpdateQty: (cartKey: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  summary,
  onClose,
  onUpdateQty,
  onClearCart,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    email: string;
    total: number;
    hasPhysical: boolean;
    hasDigital: boolean;
  } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      setFormError('');
      if (summary.totalItems > 0) setConfirmedOrder(null);
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, summary.totalItems]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm({
      customerName,
      customerEmail,
      needsShipping: summary.hasPhysicalItems,
      shippingAddress,
    });
    if (!result.valid) {
      setFormError(result.error);
      return;
    }
    setFormError('');
    const orderNum = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      email: customerEmail.trim(),
      total: summary.subtotal,
      hasPhysical: summary.hasPhysicalItems,
      hasDigital: summary.digitalSubtotal > 0,
    });
    onClearCart();
  };

  return (
    <dialog
      ref={dialogRef}
      id="cart-dialog"
      className="store-dialog cart-dialog"
      aria-labelledby="cart-dialog-title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal-close-btn"
        aria-label="Close shopping cart"
        onClick={onClose}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div className="cart-header">
        <p className="section-kicker">Mama&apos;s Moon Kids Store</p>
        <h2 id="cart-dialog-title">
          Your Shopping Cart (
          <span className="tabular-nums">{summary.totalItems}</span>)
        </h2>
      </div>

      {confirmedOrder ? (
        <div className="cart-confirmation" role="status">
          <div className="confirmation-badge">
            <ShieldCheck size={28} aria-hidden="true" />
          </div>
          <h3>Order {confirmedOrder.orderNumber} Confirmed</h3>
          <p>
            Thank you! A receipt for{' '}
            <strong className="tabular-nums">
              ${confirmedOrder.total.toFixed(2)}
            </strong>{' '}
            has been prepared for <strong>{confirmedOrder.email}</strong>.
          </p>
          <ul className="confirmation-list">
            {confirmedOrder.hasDigital && (
              <li>
                <Download size={16} aria-hidden="true" />
                <span>
                  Instant Digital Downloads (PDF / ZIP / Print-Then-Cut) unlocked in
                  your order confirmation.
                </span>
              </li>
            )}
            {confirmedOrder.hasPhysical && (
              <li>
                <Truck size={16} aria-hidden="true" />
                <span>
                  Physical POD &amp; Printify items queued for printing (ships in 2–6
                  business days).
                </span>
              </li>
            )}
          </ul>
          <button
            type="button"
            className="btn-store-primary"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : summary.lines.length === 0 ? (
        <div className="cart-empty">
          <ShoppingCart size={36} aria-hidden="true" />
          <h3>Your cart is currently empty</h3>
          <p>
            Explore 40-page colouring books, nursery gallery prints, kiss-cut
            stickers, bedtime card decks, organic totes, and SVG bundles.
          </p>
          <button type="button" className="btn-store-primary" onClick={onClose}>
            Browse Kids Marketplace
          </button>
        </div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-col">
            {summary.hasPhysicalItems && (
              <div className="shipping-progress-box">
                <p>
                  {summary.qualifiesForFreeShipping ? (
                    <>
                      <Check size={15} aria-hidden="true" />{' '}
                      <strong>Free Physical POD Shipping unlocked!</strong>
                    </>
                  ) : (
                    <>
                      Add{' '}
                      <strong className="tabular-nums">
                        ${summary.amountToFreeShipping.toFixed(2)}
                      </strong>{' '}
                      more in physical items for Free POD Shipping
                    </>
                  )}
                </p>
                <div className="shipping-track" aria-hidden="true">
                  <div
                    className="shipping-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        (summary.physicalSubtotal / 25) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <ul className="cart-lines-list">
              {summary.lines.map((line) => (
                <li key={line.cartKey} className="cart-line-item">
                  <img
                    src={line.product.image}
                    alt={line.product.title}
                    width={84}
                    height={63}
                  />
                  <div className="cart-line-info">
                    <strong>{line.product.title}</strong>
                    <p className="cart-line-variant">
                      {line.variant.label} · {line.variant.isPhysical ? 'Physical POD' : 'Instant Digital'}
                    </p>
                    <div className="cart-line-actions">
                      <div className="cart-stepper">
                        <button
                          type="button"
                          aria-label={`Decrease ${line.product.title}`}
                          onClick={() => onUpdateQty(line.cartKey, -1)}
                        >
                          <Minus size={13} aria-hidden="true" />
                        </button>
                        <span className="tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${line.product.title}`}
                          onClick={() => onUpdateQty(line.cartKey, 1)}
                        >
                          <Plus size={13} aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        aria-label={`Remove ${line.product.title}`}
                        onClick={() => onUpdateQty(line.cartKey, -line.quantity)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="cart-line-price tabular-nums">
                    ${line.lineTotal.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form className="cart-summary-col" onSubmit={handleCheckout}>
            <h3>Order Summary</h3>
            <dl className="cart-totals-dl">
              <div>
                <dt>Instant Digital Downloads</dt>
                <dd className="tabular-nums">${summary.digitalSubtotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Physical POD / Printify Items</dt>
                <dd className="tabular-nums">${summary.physicalSubtotal.toFixed(2)}</dd>
              </div>
              <div className="total-row">
                <dt>Order Subtotal</dt>
                <dd className="tabular-nums">${summary.subtotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="checkout-fields">
              <label htmlFor="checkout-name">
                <span>Recipient Name</span>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="Alex Mercer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>

              <label htmlFor="checkout-email">
                <span>Email for Digital Files &amp; Receipt</span>
                <input
                  id="checkout-email"
                  type="email"
                  placeholder="family@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </label>

              {summary.hasPhysicalItems && (
                <label htmlFor="checkout-address">
                  <span>Shipping Address (Physical POD / Printify)</span>
                  <input
                    id="checkout-address"
                    type="text"
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </label>
              )}
            </div>

            {formError && (
              <p className="checkout-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="btn-checkout-submit">
              Place Order · <span className="tabular-nums">${summary.subtotal.toFixed(2)}</span>
            </button>
            <button
              type="button"
              className="btn-clear-cart"
              onClick={onClearCart}
            >
              Empty Cart
            </button>
          </form>
        </div>
      )}
    </dialog>
  );
};

/* -------------------------------------------------------------------------- */
/* Wishlist Modal                                                             */
/* -------------------------------------------------------------------------- */
interface WishlistModalProps {
  isOpen: boolean;
  savedProducts: MarketplaceProduct[];
  onClose: () => void;
  onInspect: (product: MarketplaceProduct) => void;
  onQuickAdd: (product: MarketplaceProduct) => void;
  onRemoveSaved: (productId: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  savedProducts,
  onClose,
  onInspect,
  onQuickAdd,
  onRemoveSaved,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="wishlist-dialog"
      className="store-dialog wishlist-dialog"
      aria-labelledby="wishlist-title"
      onClose={onClose}
    >
      <button
        type="button"
        className="modal-close-btn"
        aria-label="Close saved wishlist"
        onClick={onClose}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div className="cart-header">
        <p className="section-kicker">Saved List</p>
        <h2 id="wishlist-title">
          Saved Items (<span className="tabular-nums">{savedProducts.length}</span>)
        </h2>
      </div>

      {savedProducts.length === 0 ? (
        <div className="cart-empty">
          <Heart size={34} aria-hidden="true" />
          <h3>No saved products yet</h3>
          <p>Click the heart icon on any product card to bookmark gifts for later.</p>
          <button type="button" className="btn-store-primary" onClick={onClose}>
            Explore Catalog
          </button>
        </div>
      ) : (
        <ul className="wishlist-items-list">
          {savedProducts.map((item) => (
            <li key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} width={88} height={66} />
              <div className="wishlist-item-copy">
                <strong>{item.title}</strong>
                <p>
                  {item.fulfillmentType} · From{' '}
                  <span className="tabular-nums font-bold">
                    ${Math.min(...item.variants.map((v) => v.price)).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="wishlist-item-actions">
                <button
                  type="button"
                  className="btn-card-add whitespace-nowrap"
                  onClick={() => onQuickAdd(item)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn-card-options whitespace-nowrap"
                  onClick={() => {
                    onClose();
                    onInspect(item);
                  }}
                >
                  Inspect
                </button>
                <button
                  type="button"
                  className="cart-remove-btn"
                  aria-label={`Remove ${item.title} from saved`}
                  onClick={() => onRemoveSaved(item.id)}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  );
};
