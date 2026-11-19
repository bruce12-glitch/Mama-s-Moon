export type DepartmentId =
  | 'all'
  | 'books'
  | 'nursery'
  | 'stickers'
  | 'decks'
  | 'textiles'
  | 'clipart';

export type FulfillmentCategory =
  | 'all'
  | 'physical-digital'
  | 'instant-digital'
  | 'pod-cricut'
  | 'printable-pdf'
  | 'printify-pod'
  | 'zip-digital';

export interface ProductDepartment {
  id: Exclude<DepartmentId, 'all'>;
  name: string;
  shortName: string;
  fulfillmentType: string;
  fulfillmentKey: Exclude<FulfillmentCategory, 'all'>;
  bestChannel: string;
  typicalPriceRange: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  tagline: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  isPhysical: boolean;
  deliverySummary: string;
  skuCode: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  department: Exclude<DepartmentId, 'all'>;
  departmentLabel: string;
  fulfillmentCategory: Exclude<FulfillmentCategory, 'all'>;
  fulfillmentType: string;
  bestChannel: string;
  ageRange: string;
  rating: number;
  reviewCount: number;
  image: string;
  subtitle: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
  tagText?: string;
  keywords: string;
}

export const PRODUCT_DEPARTMENTS: ProductDepartment[] = [
  {
    id: 'books',
    name: 'Colouring & Activity Book (40 Pages)',
    shortName: 'Colouring Books',
    fulfillmentType: 'Physical POD + Digital PDF',
    fulfillmentKey: 'physical-digital',
    bestChannel: 'Amazon KDP + Etsy',
    typicalPriceRange: '$6.99 – $11.99',
    minPrice: 6.99,
    maxPrice: 11.99,
    image: '/assets/hero-book-showcase.png',
    tagline: '40 cozy pages for kids ages 4–9 in KDP paperback & printable PDF.',
  },
  {
    id: 'nursery',
    name: 'Nursery Gallery Wall Set (Set of 4)',
    shortName: 'Nursery Wall Sets',
    fulfillmentType: 'Instant Digital Download',
    fulfillmentKey: 'instant-digital',
    bestChannel: 'Etsy + Shopify',
    typicalPriceRange: '$7.99 – $14.99',
    minPrice: 7.99,
    maxPrice: 14.99,
    image: '/assets/product-nursery-wall-set.jpg',
    tagline: 'Matched 4-print pastel nursery room wall art at 300 DPI.',
  },
  {
    id: 'stickers',
    name: 'Die-Cut Sticker Sheet / Printable Stickers',
    shortName: 'Stickers & Cricut',
    fulfillmentType: 'POD Kiss-Cut + Cricut PDF',
    fulfillmentKey: 'pod-cricut',
    bestChannel: 'Etsy + Shopify',
    typicalPriceRange: '$3.99 – $6.99',
    minPrice: 3.99,
    maxPrice: 6.99,
    image: '/assets/laptop-sticker-cozy-coder.jpg',
    tagline: 'Peel-ready kiss-cut vinyl sheets plus home Cricut cut files.',
  },
  {
    id: 'decks',
    name: 'Bedtime Affirmation / Milestone Card Deck',
    shortName: 'Bedtime Card Decks',
    fulfillmentType: 'Printable PDF',
    fulfillmentKey: 'printable-pdf',
    bestChannel: 'Etsy + Gumroad',
    typicalPriceRange: '$4.99 – $8.99',
    minPrice: 4.99,
    maxPrice: 8.99,
    image: '/assets/product-affirmation-deck.jpg',
    tagline: 'Calming bedtime affirmations & baby milestone keepsake cards.',
  },
  {
    id: 'textiles',
    name: 'Seamless Pattern Tote Bag or Baby Blanket',
    shortName: 'Totes & Blankets',
    fulfillmentType: 'Print-on-Demand (Printify)',
    fulfillmentKey: 'printify-pod',
    bestChannel: 'Shopify + Etsy',
    typicalPriceRange: '$18.99 – $39.99',
    minPrice: 18.99,
    maxPrice: 39.99,
    image: '/assets/product-tote-baby-blanket.jpg',
    tagline: 'All-over storybook kitten & moon patterns on organic cotton & muslin.',
  },
  {
    id: 'clipart',
    name: '25-Piece Clipart & SVG Craft Bundle',
    shortName: 'Clipart & SVG',
    fulfillmentType: 'ZIP Digital Download',
    fulfillmentKey: 'zip-digital',
    bestChannel: 'Etsy',
    typicalPriceRange: '$5.99 – $9.99',
    minPrice: 5.99,
    maxPrice: 9.99,
    image: '/assets/product-clipart-svg-bundle.jpg',
    tagline: '25 crisp vector SVG, PNG & DXF decals for Cricut & classroom crafts.',
  },
];

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'book-little-moon-picnic',
    title: 'The Little Moon Picnic — 40-Page Colouring & Activity Book',
    department: 'books',
    departmentLabel: 'Colouring & Activity Book (40 Pages)',
    fulfillmentCategory: 'physical-digital',
    fulfillmentType: 'Physical POD + Digital PDF',
    bestChannel: 'Amazon KDP + Etsy',
    ageRange: 'Ages 6–9',
    rating: 4.9,
    reviewCount: 318,
    image: '/assets/the-little-moon-picnic-book.png',
    subtitle: '40 bold-line storybook colouring pages, indoor picnic mazes & cozy puzzles.',
    description:
      'Join Miso, Plum, Pip, and Sprout on a rainy afternoon indoor picnic beneath paper moons. Single-sided 40-page interior prevents marker bleed-through, available as an instant printable PDF or matte Amazon KDP paperback.',
    features: [
      '40 original full-bleed & framed colouring and activity pages',
      'Bold 1.4mm outlines welcoming young markers, crayons & gel pens',
      'Available in instant US Letter / A4 PDF or Physical POD Paperback',
    ],
    variants: [
      {
        id: 'digital-pdf',
        label: 'Instant Digital PDF (40 Pages)',
        price: 6.99,
        isPhysical: false,
        deliverySummary: 'Instant Download · US Letter & A4 PDF',
        skuCode: 'MM-BK01-PDF',
      },
      {
        id: 'pod-paperback',
        label: 'Physical POD Paperback (Amazon KDP)',
        price: 11.99,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Ships in 2–4 days',
        skuCode: 'MM-BK01-POD',
      },
    ],
    tagText: 'Kids Best Seller',
    keywords: 'colouring coloring activity book 40 pages little moon picnic amazon kdp pdf miso',
  },
  {
    id: 'book-christmas-new-year',
    title: 'Christmas & New Year — 40-Page Holiday Colouring Book',
    department: 'books',
    departmentLabel: 'Colouring & Activity Book (40 Pages)',
    fulfillmentCategory: 'physical-digital',
    fulfillmentType: 'Physical POD + Digital PDF',
    bestChannel: 'Amazon KDP + Etsy',
    ageRange: 'Ages 6–9',
    rating: 4.9,
    reviewCount: 204,
    image: '/assets/christmas-new-year-book.png',
    subtitle: 'Festive Winter Village storybook pages, spot-the-star games & cocoa recipes.',
    description:
      'Stroll past snowy Cocoa Lane cottages and twinkling North Pole signs with Miso & friends. Forty screen-free holiday pages crafted for cozy December afternoons and stocking stuffers.',
    features: [
      '40 winter village colouring scenes & holiday activity pages',
      'Includes bonus printable countdown calendar & gift tags in PDF edition',
      'Heavy crisp single-sided matte paper in Physical POD paperback',
    ],
    variants: [
      {
        id: 'digital-pdf',
        label: 'Instant Digital PDF (40 Pages)',
        price: 6.99,
        isPhysical: false,
        deliverySummary: 'Instant Download · Print unlimited family copies',
        skuCode: 'MM-BK02-PDF',
      },
      {
        id: 'pod-paperback',
        label: 'Physical POD Paperback (Amazon KDP)',
        price: 10.99,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Ships in 2–4 days',
        skuCode: 'MM-BK02-POD',
      },
    ],
    tagText: 'Holiday Pick',
    keywords: 'christmas new year colouring activity book 40 pages winter village pod kdp',
  },
  {
    id: 'book-midnight-kittens-combo',
    title: 'Midnight Kittens & Starlight Maze — 40-Page Activity Edition',
    department: 'books',
    departmentLabel: 'Colouring & Activity Book (40 Pages)',
    fulfillmentCategory: 'physical-digital',
    fulfillmentType: 'Physical POD + Digital PDF',
    bestChannel: 'Amazon KDP + Etsy',
    ageRange: 'Ages 4–8',
    rating: 4.8,
    reviewCount: 162,
    image: '/assets/cover-midnight-cozy.webp',
    subtitle: 'Sleepy rooftop lanterns, easy mazes & giant-shape bedtime colouring pages.',
    description:
      'Gentle nighttime illustrations paired with simple word searches and rooftop star paths designed for younger hands building fine-motor confidence.',
    features: [
      '40 giant-shape bedtime colouring + gentle activity pages',
      '8.5" × 8.5" square kids format ideal for lap trays & travel',
      'Zero gray clutter — clean open white spaces for crayons',
    ],
    variants: [
      {
        id: 'digital-pdf',
        label: 'Instant Digital PDF (40 Pages)',
        price: 7.49,
        isPhysical: false,
        deliverySummary: 'Instant Download · Tablet & printer friendly',
        skuCode: 'MM-BK03-PDF',
      },
      {
        id: 'pod-paperback',
        label: 'Physical POD Paperback (Amazon KDP)',
        price: 11.49,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Ships in 2–4 days',
        skuCode: 'MM-BK03-POD',
      },
    ],
    keywords: 'midnight kittens colouring activity book 40 pages ages 4-8 rooftop moon pod',
  },
  {
    id: 'nursery-woodland-friends-4pack',
    title: 'Miso & Friends Pastel Nursery Gallery Wall Set (Set of 4)',
    department: 'nursery',
    departmentLabel: 'Nursery Gallery Wall Set (Set of 4)',
    fulfillmentCategory: 'instant-digital',
    fulfillmentType: 'Instant Digital Download',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Nursery · 0–4',
    rating: 5.0,
    reviewCount: 147,
    image: '/assets/product-nursery-wall-set.jpg',
    subtitle: '4 coordinated woodland storybook portraits in 5 print sizes (up to 16"×20").',
    description:
      'Transform a baby room or reading nook in minutes. Includes matching high-resolution portraits of Miso on a crescent moon, Plum holding a bloom, Pip the star, and Sprout the leaf snail.',
    features: [
      'Set of 4 matching 300 DPI printable posters with warm cream mats',
      'Includes 5 aspect ratios: 5×7", 8×10", 11×14", 16×20" & A3',
      'Color-calibrated for home inkjet, Staples, or local print shop',
    ],
    variants: [
      {
        id: 'standard-8x10',
        label: 'Instant Digital 8×10" & A4 Set (4 Files)',
        price: 7.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · 4 High-Res JPG/PDF',
        skuCode: 'MM-NR01-STD',
      },
      {
        id: 'master-5sizes',
        label: 'Complete 5-Ratio Gallery Pack (20 Files)',
        price: 14.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · Up to 16"×20" poster size',
        skuCode: 'MM-NR01-PRO',
      },
    ],
    tagText: 'Top Gift Idea',
    keywords: 'nursery gallery wall set of 4 instant digital download poster prints baby room',
  },
  {
    id: 'nursery-starlight-conservatory-4pack',
    title: 'Starlight Conservatory Botanical Nursery Prints (Set of 4)',
    department: 'nursery',
    departmentLabel: 'Nursery Gallery Wall Set (Set of 4)',
    fulfillmentCategory: 'instant-digital',
    fulfillmentType: 'Instant Digital Download',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Nursery · 0–5',
    rating: 4.9,
    reviewCount: 89,
    image: '/assets/cover-garden-cozy.webp',
    subtitle: 'Soft sage & butter-yellow botanical prints ready for instant framing.',
    description:
      'Calm gender-neutral pastel greenhouse scenes painted in gentle watercolor washes. Print at home or send straight to any frame lab.',
    features: [
      '4 harmonizing botanical nursery prints ready for 2×2 or horizontal hang',
      'Archival 300 DPI CMYK + sRGB files for crisp colour accuracy',
      'Includes printable hanging alignment spacing template',
    ],
    variants: [
      {
        id: 'standard-set',
        label: 'Standard Printable Set (8×10" & 11×14")',
        price: 8.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · 8 Master Files',
        skuCode: 'MM-NR02-STD',
      },
      {
        id: 'full-studio-set',
        label: 'Full Ratio Bundle + Custom Name Blank',
        price: 13.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · All Frame Sizes',
        skuCode: 'MM-NR02-PRO',
      },
    ],
    keywords: 'nursery wall art set of 4 botanical sage printable download decor',
  },
  {
    id: 'nursery-moonbeam-planet-4pack',
    title: 'Pocket Moonbeam & Cloud Nursery Gallery Set (Set of 4)',
    department: 'nursery',
    departmentLabel: 'Nursery Gallery Wall Set (Set of 4)',
    fulfillmentCategory: 'instant-digital',
    fulfillmentType: 'Instant Digital Download',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Nursery · 0–5',
    rating: 4.9,
    reviewCount: 78,
    image: '/assets/cover-planet-cozy.webp',
    subtitle: '4 pastel sky & sleeping planet prints sized for cribsides and reading corners.',
    description:
      'Gentle crescent moons, friendly clouds, and tiny starry planets styled in calming lavender and cream. Instant high-resolution downloads formatted for effortless home or local print framing.',
    features: [
      'Set of 4 matched 300 DPI sky-themed nursery prints',
      'Sized for 5×7", 8×10", 11×14", 16×20" & A4 frames',
      'Soft low-contrast pastel inks gentle on baby eyes',
    ],
    variants: [
      {
        id: 'standard-set',
        label: 'Instant Digital 8×10" Set (4 Files)',
        price: 7.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · Print-ready PDF & JPG',
        skuCode: 'MM-NR03-STD',
      },
      {
        id: 'master-pack',
        label: 'All 5 Frame Sizes Nursery Pack',
        price: 12.99,
        isPhysical: false,
        deliverySummary: 'Instant Digital Download · 20 Files Included',
        skuCode: 'MM-NR03-PRO',
      },
    ],
    keywords: 'nursery gallery wall set of 4 planet cloud moon instant digital download prints',
  },
  {
    id: 'sticker-cozy-miso-sheet',
    title: 'Cozy Miso & Cocoa Die-Cut Sticker Sheet + Cricut Cut Pack',
    department: 'stickers',
    departmentLabel: 'Die-Cut Sticker Sheet / Printable Stickers',
    fulfillmentCategory: 'pod-cricut',
    fulfillmentType: 'POD Kiss-Cut + Cricut PDF',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Ages 5–12',
    rating: 4.9,
    reviewCount: 276,
    image: '/assets/laptop-sticker-cozy-coder.jpg',
    subtitle: '12 waterproof kiss-cut vinyl stickers or instant Print-Then-Cut Cricut PDF.',
    description:
      'Stick Miso in a mustard scarf, steaming cocoa mugs, crescent moons, and starry clouds on school folders, water bottles, or laptop lids. Peels cleanly with zero residue.',
    features: [
      'Thick UV-laminated matte vinyl resists backpack scratches & splashes',
      'Digital tier includes transparent PNG + Cricut offset silhouette sheet',
      'Contours cut cleanly at 2.2"–3.4" for bottles, tablets & planners',
    ],
    variants: [
      {
        id: 'cricut-pdf',
        label: 'Printable Cricut PDF + PNG Cut Sheet',
        price: 3.99,
        isPhysical: false,
        deliverySummary: 'Instant Download · Cricut & Silhouette Ready',
        skuCode: 'MM-ST01-PDF',
      },
      {
        id: 'pod-kisscut',
        label: 'POD Matte Vinyl Kiss-Cut Sheet (Physical)',
        price: 6.49,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Glassine mailer in 2–4 days',
        skuCode: 'MM-ST01-POD',
      },
    ],
    tagText: 'Fan Favorite',
    keywords: 'die-cut sticker sheet printable stickers cricut pdf kiss-cut pod miso cocoa vinyl',
  },
  {
    id: 'sticker-starlight-holo-sheet',
    title: 'Plum & Pip Starlight Sticker Sheet (Kiss-Cut + Cricut Ready)',
    department: 'stickers',
    departmentLabel: 'Die-Cut Sticker Sheet / Printable Stickers',
    fulfillmentCategory: 'pod-cricut',
    fulfillmentType: 'POD Kiss-Cut + Cricut PDF',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Ages 5–14',
    rating: 4.9,
    reviewCount: 194,
    image: '/assets/laptop-sticker-moon-desk.jpg',
    subtitle: 'Pastel bunny, smiling star & crescent moon stickers for notebooks and lids.',
    description:
      'Cheerful cloud-nap Plum and glowing Pip stickers engineered for both scissors-free home Cricut Print-Then-Cut and glossy satin POD vinyl sheets.',
    features: [
      '14 kiss-cut stickers per sheet on velvety smooth waterproof vinyl',
      'Included printable PDF has pre-spaced white die-cut borders',
      'Safe non-toxic inks tested for kids journals and lunchboxes',
    ],
    variants: [
      {
        id: 'cricut-pdf',
        label: 'Printable Cricut PDF Sheet',
        price: 4.49,
        isPhysical: false,
        deliverySummary: 'Instant Download · Letter PDF + 300 DPI PNG',
        skuCode: 'MM-ST02-PDF',
      },
      {
        id: 'pod-kisscut',
        label: 'POD Satin Vinyl Sheet (Mailed)',
        price: 6.99,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Ships in 2–4 days',
        skuCode: 'MM-ST02-POD',
      },
    ],
    keywords: 'stickers die-cut kiss-cut sheet printable cricut plum pip star vinyl',
  },
  {
    id: 'sticker-sprout-garden-sheet',
    title: "Sprout's Tulip & Pastry Sticker Sheet + Printable PDF",
    department: 'stickers',
    departmentLabel: 'Die-Cut Sticker Sheet / Printable Stickers',
    fulfillmentCategory: 'pod-cricut',
    fulfillmentType: 'POD Kiss-Cut + Cricut PDF',
    bestChannel: 'Etsy + Shopify',
    ageRange: 'Ages 4–12',
    rating: 4.8,
    reviewCount: 118,
    image: '/assets/laptop-sticker-garden-break.jpg',
    subtitle: 'Botanical snail, watering can, daisies & berry pastry decals.',
    description:
      'Sweet garden rewards for homework charts, reading logs, and kids water flasks. Download to cut at home today or order the durable matte POD vinyl sheet.',
    features: [
      'Water-resistant matte surface takes marker notes on labels cleanly',
      'Compatible with Cricut Explore/Maker & standard home color printers',
      'Includes bonus 1-inch mini reward seal row',
    ],
    variants: [
      {
        id: 'cricut-pdf',
        label: 'Printable Sticker PDF',
        price: 3.99,
        isPhysical: false,
        deliverySummary: 'Instant Download · Ready to print & cut',
        skuCode: 'MM-ST03-PDF',
      },
      {
        id: 'pod-kisscut',
        label: 'POD Kiss-Cut Sheet (Physical)',
        price: 5.99,
        isPhysical: true,
        deliverySummary: 'Printed on demand · Ships in 2–4 days',
        skuCode: 'MM-ST03-POD',
      },
    ],
    keywords: 'sprout snail garden sticker sheet printable die-cut cricut pod matte',
  },
  {
    id: 'deck-bedtime-affirmations',
    title: 'Calm & Cozy Bedtime Affirmation Card Deck (32 Printable Cards)',
    department: 'decks',
    departmentLabel: 'Bedtime Affirmation / Milestone Card Deck',
    fulfillmentCategory: 'printable-pdf',
    fulfillmentType: 'Printable PDF',
    bestChannel: 'Etsy + Gumroad',
    ageRange: 'Ages 3–9',
    rating: 5.0,
    reviewCount: 185,
    image: '/assets/product-affirmation-deck.jpg',
    subtitle: '32 soothing bedtime whispers with Miso & Plum for calm pillow-talk rituals.',
    description:
      'End busy evenings on a warm note. Each illustrated A6 card pairs gentle pastel moonlight art with child-friendly affirmations ("My heart is calm and safe," "Tomorrow has room to grow").',
    features: [
      '32 illustrated front cards + matching starry patterned card backs',
      'Print 4-up on US Letter or A4 cardstock with crop marks included',
      'Deluxe edition includes printable foldable keepsake deck tuck-box',
    ],
    variants: [
      {
        id: 'standard-pdf',
        label: '32-Card Printable PDF Deck',
        price: 4.99,
        isPhysical: false,
        deliverySummary: 'Instant PDF Download · US Letter & A4',
        skuCode: 'MM-DK01-STD',
      },
      {
        id: 'deluxe-tuckbox-pdf',
        label: 'Deluxe Deck + Tuck-Box & Blank Cards PDF',
        price: 8.99,
        isPhysical: false,
        deliverySummary: 'Instant PDF Download · Gumroad & Etsy Master',
        skuCode: 'MM-DK01-DLX',
      },
    ],
    tagText: 'Parent Favorite',
    keywords: 'bedtime affirmation card deck printable pdf calm cozy sleep cards kids',
  },
  {
    id: 'deck-moon-milestones',
    title: "Baby's First Year Moon Milestone Card Deck (24 Cards)",
    department: 'decks',
    departmentLabel: 'Bedtime Affirmation / Milestone Card Deck',
    fulfillmentCategory: 'printable-pdf',
    fulfillmentType: 'Printable PDF',
    bestChannel: 'Etsy + Gumroad',
    ageRange: 'Newborn · 0–12m',
    rating: 4.9,
    reviewCount: 94,
    image: '/assets/hero-come-join-us.webp',
    subtitle: 'Month-by-month photo prop cards + "First Smile" & "First Story" milestones.',
    description:
      'Capture monthly baby portraits without glare! Designed for thick matte cardstock printing with pastel crescent frames and gentle storybook companions.',
    features: [
      '12 Monthly cards + 12 Special Firsts ("First Giggle", "Slept Through Night")',
      'Matte-friendly pastel ink palette photographs softly next to blankets',
      'Ready to print instantly at home or local copy center',
    ],
    variants: [
      {
        id: 'standard-pdf',
        label: '24-Card Milestone Printable PDF',
        price: 5.49,
        isPhysical: false,
        deliverySummary: 'Instant PDF Download · 5×7" & 4×6" formats',
        skuCode: 'MM-DK02-STD',
      },
      {
        id: 'foil-ready-pdf',
        label: 'Deluxe Milestone Deck + Baby Book Cover PDF',
        price: 8.49,
        isPhysical: false,
        deliverySummary: 'Instant PDF Download · Full Keepsake Suite',
        skuCode: 'MM-DK02-DLX',
      },
    ],
    keywords: 'milestone card deck baby first year printable pdf affirmation photos',
  },
  {
    id: 'textile-moon-kitten-tote',
    title: 'Miso & Crescent Moon Seamless Organic Canvas Tote Bag',
    department: 'textiles',
    departmentLabel: 'Seamless Pattern Tote Bag or Baby Blanket',
    fulfillmentCategory: 'printify-pod',
    fulfillmentType: 'Print-on-Demand (Printify)',
    bestChannel: 'Shopify + Etsy',
    ageRange: 'Kids & Parents',
    rating: 4.9,
    reviewCount: 131,
    image: '/assets/product-tote-baby-blanket.jpg',
    subtitle: 'Heavyweight brushed cotton tote printed all-over with Miso & crescent moons.',
    description:
      'Spacious enough for picture books, sketchpads, and library hauls. Fulfilled sustainably via Printify using OEKO-TEX certified water-based textile inks that stay soft through washes.',
    features: [
      'Edge-to-edge seamless Miso kitten, tulip & crescent moon repeating print',
      'Reinforced webbed cotton handles rated up to 22 lbs of library books',
      'Machine-washable colorfast Printify AOP textile craftsmanship',
    ],
    variants: [
      {
        id: 'everyday-14-tote',
        label: '14" Everyday Kids Book Tote (Printify)',
        price: 18.99,
        isPhysical: true,
        deliverySummary: 'Printify POD · Ships in 3–6 business days',
        skuCode: 'MM-TX01-T14',
      },
      {
        id: 'oversized-18-tote',
        label: '18" Gusseted Library & Stroller Tote',
        price: 24.99,
        isPhysical: true,
        deliverySummary: 'Printify POD · Ships in 3–6 business days',
        skuCode: 'MM-TX01-T18',
      },
    ],
    tagText: 'Printify POD',
    keywords: 'seamless pattern tote bag print on demand printify organic canvas library bag kittens',
  },
  {
    id: 'textile-muslin-baby-blanket',
    title: 'Kittens & Stars Organic Muslin & Sherpa Baby Blanket',
    department: 'textiles',
    departmentLabel: 'Seamless Pattern Tote Bag or Baby Blanket',
    fulfillmentCategory: 'printify-pod',
    fulfillmentType: 'Print-on-Demand (Printify)',
    bestChannel: 'Shopify + Etsy',
    ageRange: 'Baby · 0–4',
    rating: 5.0,
    reviewCount: 112,
    image: '/assets/product-tote-baby-blanket.jpg',
    subtitle: 'Heirloom-soft crib & stroller blanket in all-over Mama\'s Moon storybook print.',
    description:
      'Wrap little dreamers in breathable organic muslin or plush minky sherpa Printed-on-Demand via Printify. Ideal baby shower gift matching our Nursery Gallery Wall Set.',
    features: [
      'Ultra-soft breathable fabric gentle on newborn & toddler skin',
      'Double-stitched folded hem prevents fraying wash after wash',
      'Generous 30"×40" crib blanket or 40"×50" toddler nap size',
    ],
    variants: [
      {
        id: 'crib-muslin',
        label: '30"×40" Organic Swaddle Muslin Blanket',
        price: 29.99,
        isPhysical: true,
        deliverySummary: 'Printify POD · Qualifies for Free Shipping',
        skuCode: 'MM-TX02-MUS',
      },
      {
        id: 'plush-sherpa',
        label: '40"×50" Plush Minky Sherpa Blanket',
        price: 39.99,
        isPhysical: true,
        deliverySummary: 'Printify POD · Qualifies for Free Shipping',
        skuCode: 'MM-TX02-SHP',
      },
    ],
    keywords: 'seamless pattern baby blanket print on demand printify muslin sherpa nursery gift',
  },
  {
    id: 'clipart-25pc-kawaii-svg',
    title: "Miso & Friends 25-Piece Clipart & SVG Craft Bundle",
    department: 'clipart',
    departmentLabel: '25-Piece Clipart & SVG Craft Bundle',
    fulfillmentCategory: 'zip-digital',
    fulfillmentType: 'ZIP Digital Download',
    bestChannel: 'Etsy',
    ageRange: 'Crafters & Teachers',
    rating: 4.9,
    reviewCount: 243,
    image: '/assets/product-clipart-svg-bundle.jpg',
    subtitle: '25 crisp SVG, PNG (300 DPI), DXF & EPS graphics for Cricut, Canva & shirts.',
    description:
      'Everything makers, homeschool parents, and teachers need to craft custom birthday invitations, classroom name tags, iron-on totes, and reward charts.',
    features: [
      '25 individual layered SVG + transparent 300 DPI PNG files in 1 ZIP',
      'Clean closed vector paths tested in Cricut Design Space & Silhouette',
      'Includes Miso, Plum, Pip, Sprout, crescents, rainbows, boba & mugs',
    ],
    variants: [
      {
        id: 'personal-zip',
        label: 'Personal Craft ZIP (25 Files × 4 Formats)',
        price: 5.99,
        isPhysical: false,
        deliverySummary: 'Instant ZIP Download · Cricut & Canva Ready',
        skuCode: 'MM-CL01-PER',
      },
      {
        id: 'commercial-zip',
        label: 'Small-Shop Commercial License ZIP',
        price: 9.99,
        isPhysical: false,
        deliverySummary: 'Instant ZIP Download · Up to 500 physical items',
        skuCode: 'MM-CL01-COM',
      },
    ],
    tagText: '25 Vectors Included',
    keywords: '25-piece clipart svg craft bundle zip digital download etsy cricut png dxf',
  },
  {
    id: 'clipart-25pc-nursery-elements',
    title: '25-Piece Celestial Nursery & Story Elements SVG Bundle',
    department: 'clipart',
    departmentLabel: '25-Piece Clipart & SVG Craft Bundle',
    fulfillmentCategory: 'zip-digital',
    fulfillmentType: 'ZIP Digital Download',
    bestChannel: 'Etsy',
    ageRange: 'Makers & Educators',
    rating: 4.8,
    reviewCount: 109,
    image: '/assets/our-little-crew.webp',
    subtitle: '25 botanical frames, stars, moons & character badges for DIY nursery decor.',
    description:
      'Design matching baby shower banners, wooden mobile cutouts, and classroom posters with 25 cohesive vector shapes ready for laser cutters, vinyl plotters, and Canva.',
    features: [
      '25 vector SVG + DXF cut files plus watercolor PNG accents',
      'Organized named folders for effortless drag-and-drop crafting',
      'Includes seamless bonus tile pattern swatch',
    ],
    variants: [
      {
        id: 'personal-zip',
        label: 'Personal Craft ZIP Download',
        price: 6.49,
        isPhysical: false,
        deliverySummary: 'Instant ZIP Download · 100+ total assets',
        skuCode: 'MM-CL02-PER',
      },
      {
        id: 'commercial-zip',
        label: 'Commercial Maker License ZIP',
        price: 9.49,
        isPhysical: false,
        deliverySummary: 'Instant ZIP Download · Small-shop ready',
        skuCode: 'MM-CL02-COM',
      },
    ],
    keywords: '25-piece clipart svg bundle zip download nursery banner laser craft',
  },
];
