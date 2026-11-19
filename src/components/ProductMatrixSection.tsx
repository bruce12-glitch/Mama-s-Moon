import React, { useState } from 'react';
import { Palette, Download, ArrowRight, ChevronDown } from 'lucide-react';
import {
  DepartmentId,
  PRODUCT_DEPARTMENTS,
} from '../data/storeCatalog';
import { BrandName } from './BrandName';

interface ProductMatrixSectionProps {
  onSelectDepartment: (dept: DepartmentId) => void;
  onOpenStudio: () => void;
}

const STORE_FAQS = [
  {
    id: 'faq-fulfillment',
    q: 'How do Physical POD and Instant Digital items ship together?',
    a: 'Digital PDFs, Nursery Wall Sets, Affirmation Card Decks, and 25-Piece ZIP bundles deliver immediately to your email receipt. Physical Amazon KDP paperbacks, POD kiss-cut sticker sheets, and Printify tote bags/baby blankets ship separately in 2–6 business days—with free physical shipping once POD items reach $25.00.',
  },
  {
    id: 'faq-kdp-etsy',
    q: 'Are Mama’s Moon products available across Amazon KDP, Etsy, Shopify & Gumroad?',
    a: 'Yes! Each format lists its primary channel: 40-page Colouring Books fulfill on Amazon KDP & Etsy; Nursery Wall Sets and Stickers on Etsy & Shopify; Affirmation Card Decks on Etsy & Gumroad; Printify Totes & Blankets on Shopify & Etsy; and 25-Piece SVG Craft Bundles on Etsy.',
  },
  {
    id: 'faq-printing',
    q: 'What paper size do Instant Digital PDFs use?',
    a: 'Every printable colouring book, nursery wall print, and card deck comes formatted for both US Letter (8.5×11") and International A4 at crisp 300 DPI resolution.',
  },
  {
    id: 'faq-cricut',
    q: 'Do Die-Cut Sticker & SVG bundles work with Cricut Design Space?',
    a: 'Yes. All sticker sheets include a printable Print-Then-Cut PNG/PDF silhouette file alongside physical matte vinyl mailers, and our 25-Piece Craft Bundles include clean layered SVGs and DXFs.',
  },
];

export const ProductMatrixSection: React.FC<ProductMatrixSectionProps> = ({
  onSelectDepartment,
  onOpenStudio,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-fulfillment');

  return (
    <>
      {/* Complete 6-Format Reference Matrix + Free Studio Club */}
      <section
        className="matrix-section"
        id="format-guide"
        aria-labelledby="matrix-title"
      >
        <div className="shell">
          <div className="section-bar">
            <div>
              <p className="section-kicker">Complete Kids Store Lineup</p>
              <h2 id="matrix-title">Product Formats, Fulfillment &amp; Channels</h2>
            </div>
            <p className="matrix-subnote">
              Direct manufacturer fulfillment across KDP, Printify, Etsy, Shopify &amp; Gumroad.
            </p>
          </div>

          <div className="matrix-table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th scope="col">Product Format</th>
                  <th scope="col">Fulfillment Type</th>
                  <th scope="col">Best Channel</th>
                  <th scope="col">Typical Price</th>
                  <th scope="col" className="text-right">Browse</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_DEPARTMENTS.map((dept) => (
                  <tr key={dept.id}>
                    <th scope="row">{dept.name}</th>
                    <td>{dept.fulfillmentType}</td>
                    <td>{dept.bestChannel}</td>
                    <td className="tabular-nums font-bold">{dept.typicalPriceRange}</td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="matrix-shop-btn whitespace-nowrap"
                        onClick={() => onSelectDepartment(dept.id)}
                      >
                        <span>Shop</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Coloring Studio Callout */}
          <div className="studio-banner-card">
            <div className="studio-banner-media">
              <img
                src="/assets/miso-moon-coloring.svg"
                alt="Miso & the Moon coloring studio interactive preview page"
                width={420}
                height={320}
              />
            </div>
            <div className="studio-banner-copy">
              <p className="section-kicker">Free Activity Club for Kids</p>
              <h3>Test drive our colouring style free in the online studio.</h3>
              <p>
                Tap any area of Miso &amp; the Moon with our pastel crayon palette right in your
                browser and save your child&apos;s artwork as a PNG — or print the 300 DPI blank page
                free before ordering a 40-page book.
              </p>
              <div className="studio-banner-actions">
                <button
                  type="button"
                  className="btn-store-primary whitespace-nowrap"
                  onClick={onOpenStudio}
                >
                  <Palette size={17} aria-hidden="true" />
                  <span>Open Coloring Studio</span>
                </button>
                <a
                  href="/assets/miso-moon-coloring.pdf"
                  download
                  className="btn-store-secondary whitespace-nowrap"
                >
                  <Download size={16} aria-hidden="true" />
                  <span>Download Free PDF Page</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storefront FAQ */}
      <section className="store-faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="shell">
          <div className="store-faq-grid">
            <div>
              <p className="section-kicker">Parent &amp; Maker Questions</p>
              <h2 id="faq-heading">Shipping, Print Formats &amp; Channels FAQ</h2>
              <p className="faq-intro">
                Everything to know about ordering physical POD editions or instant printable downloads
                from Mama&apos;s Moon Kids.
              </p>
            </div>

            <div className="faq-accordion">
              {STORE_FAQS.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <div key={item.id} className="faq-row">
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? 'is-open' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && <p className="faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Store Footer */}
      <footer className="store-footer">
        <div className="shell store-footer-inner">
          <div className="store-footer-brand">
            <BrandName className="store-footer-wordmark" />
            <p>
              Cozy kids colouring books, nursery gallery art, die-cut stickers, bedtime decks,
              Printify totes &amp; blankets, and SVG craft bundles.
            </p>
          </div>

          <div className="store-footer-cols">
            <div>
              <h4>Departments</h4>
              <ul>
                {PRODUCT_DEPARTMENTS.map((dept) => (
                  <li key={dept.id}>
                    <button
                      type="button"
                      onClick={() => onSelectDepartment(dept.id)}
                    >
                      {dept.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Marketplaces</h4>
              <ul>
                <li>
                  <a
                    href="https://www.amazon.com/s?k=Mamas+Moon+coloring+books"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Amazon KDP Store ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.etsy.com/search?q=Mamas+Moon+coloring+books"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Etsy Shop ↗
                  </a>
                </li>
                <li>
                  <a href="#format-guide">Fulfillment &amp; Pricing Guide</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="shell store-footer-bottom">
          <span>&copy; 2026 Mama&apos;s Moon Kids Store. Warm paper, gentle friends.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
};
