export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLines: string[];
  accentLine?: string;
  subtitle: string;
  signoff?: string;
  bgColor: string;
  themeClass: 'slide-showcase' | 'slide-cozy' | 'slide-treat' | 'slide-join' | 'slide-picnic';
  image: string;
  imageAlt: string;
  layout: 'book-showcase' | 'split' | 'centered';
  primaryCta: { label: string; href: string; action?: 'open-3d' | 'open-studio' | 'preview-book' };
  secondaryCta: { label: string; href: string; action?: 'open-3d' | 'open-studio' | 'preview-book' };
  badgeText?: string;
  bookId?: string;
}

export interface BookItem {
  id: string;
  number: string;
  title: string;
  titleTop: string;
  titleEm: string;
  genre: string;
  description: string;
  previewDescription: string;
  coverImage: string;
  standingImage?: string;
  themeClass: 'book-picnic' | 'book-night' | 'book-garden' | 'book-space';
  keywords: string;
  fullBleedCover?: boolean;
  spineColor: string;
  spineTextColor: string;
  markerColor: string;
  stageTagline: string;
}

export interface PeekItem {
  id: 'rooftop' | 'garden' | 'rocket';
  title: string;
  description: string;
  outlineSvg: string;
  coloredSvg: string;
  alt: string;
  cardClass: string;
}

export type StickerCategory = 'all' | 'die-cut' | 'sheet' | 'bundle';

export interface StickerProduct {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<StickerCategory, 'all'>;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  pieceCount: string;
  finishSpec: string;
  sizeSpec: string;
  description: string;
  primaryImage: string;
  accentImage: string;
  characters: string[];
  bgTint: string;
  etsyUrl: string;
  badge?: string;
  addedAt?: string;
}

export type LaptopStickerFinish = 'all' | 'matte' | 'holographic' | 'lid-set';

export interface LaptopStickerProduct {
  id: string;
  title: string;
  subtitle: string;
  finish: Exclude<LaptopStickerFinish, 'all'>;
  finishLabel: string;
  price: number;
  compareAtPrice?: number;
  decalCount: number;
  sizeSpec: string;
  materialSpec: string;
  fitDevices: string;
  description: string;
  image: string;
  bgTint: string;
  etsyUrl: string;
  badge?: string;
  addedAt?: string;
  keywords: string;
}

export type KidsBeddingCategory = 'all' | 'sheet-set' | 'quilt' | 'room-bundle';

export type KidsBeddingSize = 'Toddler / Crib' | 'Twin' | 'Full';

export interface KidsBeddingProduct {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<KidsBeddingCategory, 'all'>;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  pieceCount: string;
  fabricSpec: string;
  threadCount: string;
  careSpec: string;
  availableSizes: KidsBeddingSize[];
  defaultSize: KidsBeddingSize;
  description: string;
  image: string;
  bgTint: string;
  etsyUrl: string;
  badge?: string;
  addedAt?: string;
  keywords: string;
}

export interface DigitalPdfProduct {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  pageCount: number;
  formatSpec: string;
  paperSpec: string;
  ageRange: string;
  description: string;
  includedItems: string[];
  coverImage: string;
  samplePreviewSvg: string;
  sampleColoredSvg: string;
  samplePdfUrl: string;
  etsyUrl: string;
  bgTint: string;
  badge?: string;
}

export interface DigitalComboProduct {
  id: string;
  comboLabel: string;
  title: string;
  seriesTitle: string;
  subtitle: string;
  price: number;
  pageCount: number;
  formatSpec: string;
  ageRange: string;
  description: string;
  coverImage: string;
  coverBg: string;
  coverTextColor: string;
  headlineColorStart: string;
  headlineColorEnd: string;
  samplePages: string[];
  sampleColoredSvg: string;
  samplePdfUrl: string;
  etsyUrl: string;
  keywords: string;
  hasEmbeddedCoverText?: boolean;
}

export interface CrewMember {
  name: string;
  role: string;
  species: string;
  scaleRatio: string;
  note: string;
}

export interface CrayonSwatch {
  color: string;
  label: string;
  role: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answerHtml: string;
}

export const BOOKS: BookItem[] = [
  {
    id: 'little-moon-picnic',
    number: 'No. 01',
    title: 'The Little Moon Picnic',
    titleTop: 'The Little',
    titleEm: 'Moon Picnic',
    genre: 'Story coloring book · Ages 6–9',
    description:
      'Join Miso, Plum, Pip, and Sprout for warm buns, fresh berries, and paper moons beside the crescent window.',
    previewDescription:
      'A story coloring book for kids ages 6–9. When rain taps the porch, Miso and friends spread a checkered blanket indoors, hang paper moons, and share warm buns and berries.',
    coverImage: './assets/the-little-moon-picnic-book.png?v=mamas-moon-3',
    standingImage: './assets/standing-3d-book.webp?v=mamas-moon-3',
    themeClass: 'book-picnic',
    keywords:
      'book coloring colouring story preview amazon the little moon picnic miso plum pip sprout bun berries',
    fullBleedCover: true,
    spineColor: '#F6D056',
    spineTextColor: '#3B2314',
    markerColor: '#E86A78',
    stageTagline: 'GRAND OPENING:',
  },
  {
    id: 'christmas-new-year',
    number: 'No. 02',
    title: 'Christmas & New Year',
    titleTop: 'Christmas',
    titleEm: '& New Year',
    genre: 'Holiday story coloring book · Ages 6–9',
    description:
      'Follow Miso, Plum, Pip, and Sprout down Cocoa Lane for candy-cane hot chocolate, gingerbread stars, and sparkling winter village adventures.',
    previewDescription:
      'A festive story coloring book for kids ages 6–9. Bundle up in cozy scarves and red boots with Miso and friends as they stroll through the snowy town, share warm holiday treats, and light New Year sparklers.',
    coverImage: './assets/christmas-new-year-book.png?v=mamas-moon-3',
    standingImage: './assets/standing-3d-christmas-book.webp?v=mamas-moon-3',
    themeClass: 'book-night',
    keywords:
      'book coloring colouring christmas new year holiday winter village snow santa miso plum pip sprout cocoa gift',
    fullBleedCover: true,
    spineColor: '#F2DCA0',
    spineTextColor: '#4B2C20',
    markerColor: '#CC4F73',
    stageTagline: 'A COZY GIFT FOR CHRISTMAS:',
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'christmas-book-showcase',
    bookId: 'christmas-new-year',
    eyebrow: "Mama's Moon Holiday Collection",
    titleLines: ['A Cozy Gift', 'for Christmas & New Year'],
    accentLine: 'Cozy Gift',
    subtitle:
      'Make the countdown cozier with a moment to color. Peek inside our new Christmas & New Year story coloring book for kids ages 6–9.',
    signoff: 'Warm cocoa & snowy wishes ♡',
    bgColor: '#FCE7E9',
    themeClass: 'slide-treat',
    image: './assets/aistudio/image_ae411272.png',
    imageAlt:
      "A Cozy Gift for Christmas & New Year — Mama's Moon Christmas & New Year story coloring book standing in a snowy pastel winter village surrounded by pine trees, cottages, mini coloring cards, and markers.",
    layout: 'book-showcase',
    primaryCta: { label: 'Peek inside Christmas & New Year', href: '#books', action: 'preview-book' },
    secondaryCta: { label: 'Browse Digital PDFs', href: '#digital-books' },
    badgeText: 'HOLIDAY EDITION',
  },
  {
    id: 'winter-village-full-banner',
    bookId: 'christmas-new-year',
    eyebrow: "Mama's Moon Winter Village",
    titleLines: ['Follow Miso & Friends', 'Winter Village Showcase'],
    accentLine: 'Winter Village',
    subtitle:
      'Discover stacked Christmas & New Year storybooks, Miso & friends die-cut stickers, and the snowy Cocoa Lane signpost.',
    signoff: 'Cozy wooden table moments ♡',
    bgColor: '#764B28',
    themeClass: 'slide-showcase',
    image: './assets/hero-winter-village-panoramic.jpg',
    imageAlt:
      "Follow Miso & Friends Around Winter Village — full-bleed wooden tabletop showcase with stacked Mama's Moon Christmas & New Year coloring books, Winter Village signpost, Miso, Pip, Sprout stickers, and markers.",
    layout: 'book-showcase',
    primaryCta: { label: 'Peek inside Christmas & New Year', href: '#books', action: 'preview-book' },
    secondaryCta: { label: 'Shop Sticker Collections', href: '#collections' },
    badgeText: 'WINTER TABLETOP',
  },
  {
    id: 'winter-village-showcase',
    bookId: 'christmas-new-year',
    eyebrow: 'Winter Edition',
    titleLines: ['Follow Miso & Friends', 'Around Winter Village'],
    accentLine: 'Winter Village',
    subtitle:
      'Stroll past Cocoa Lane and the North Pole signpost with Miso, Plum, Pip, and Sprout in our newest holiday story coloring book.',
    signoff: 'See you on Cocoa Lane ♡',
    bgColor: '#F6EEE4',
    themeClass: 'slide-showcase',
    image: './assets/hero-winter-village-editorial.jpg',
    imageAlt:
      "Follow Miso & Friends Around Winter Village — stack of Mama's Moon Christmas & New Year coloring books on a wooden tabletop with Winter Village signpost, character stickers, and alcohol markers.",
    layout: 'book-showcase',
    primaryCta: { label: 'Peek inside Christmas & New Year', href: '#books', action: 'preview-book' },
    secondaryCta: { label: 'Shop Sticker Collections', href: '#collections' },
    badgeText: 'WINTER VILLAGE',
  },
  {
    id: 'book-showcase',
    bookId: 'little-moon-picnic',
    eyebrow: "Mama's Moon × Miso & Friends",
    titleLines: ['GRAND OPENING:', 'Cozy Cafe'],
    accentLine: 'Cozy Cafe',
    subtitle:
      'A Story Coloring Book for Kids Ages 6–9. Pull up a cushion at the low wooden table for warm buns, sweet berries, and cozy pages to color.',
    signoff: 'Now serving cozy moments ♡',
    bgColor: '#F5EFE8',
    themeClass: 'slide-showcase',
    image: './assets/hero-book-showcase.png?v=mamas-moon-3',
    imageAlt:
      "Mama's Moon Grand Opening: Cozy Cafe showcase featuring The Little Moon Picnic story coloring book standing on a wooden tabletop framed by berry curtains with Miso, Pip, and Plum.",
    layout: 'book-showcase',
    primaryCta: { label: 'Peek inside this book', href: '#books', action: 'preview-book' },
    secondaryCta: { label: 'Shop Sticker Collections', href: '#collections' },
    badgeText: 'GRAND OPENING',
  },
  {
    id: 'moon-color',
    eyebrow: 'A cozy little world of color',
    titleLines: ['Make the', 'moon', 'your color.'],
    subtitle:
      'For slow afternoons and “one more page” moments. Pull up a chair, pick your favorite crayon, and make a little time together.',
    signoff: 'Love, Miso & friends ♡',
    bgColor: '#FAF2E9',
    themeClass: 'slide-cozy',
    image: './assets/color-together.webp',
    imageAlt:
      'Miso the kitten and Plum the rabbit share a coloring book at a little table beneath a moonlit window. Pip and Sprout keep them company.',
    layout: 'split',
    primaryCta: { label: 'Explore our book', href: '#books' },
    secondaryCta: { label: 'Browse Digital PDFs', href: '#digital-books' },
  },
  {
    id: 'coloring-treat',
    eyebrow: 'Bold outlines · Big cozy shapes',
    titleLines: ['READY FOR', 'a little', 'COLORiNG', 'TREAT?'],
    accentLine: 'a little',
    subtitle:
      'Miso put on a strawberry beret and Sprout tucked into fresh tulips just for you! Grab a warm mug and color a page right in your browser.',
    bgColor: '#FEEBF0',
    themeClass: 'slide-treat',
    image: './assets/hero-coloring-treat.webp',
    imageAlt:
      'Miso the cream kitten wearing a red strawberry beret with a blue striped ribbon bow, holding three tulips with Sprout the snail peeking out.',
    layout: 'centered',
    primaryCta: { label: 'Color a free treat', href: '#color', action: 'open-studio' },
    secondaryCta: { label: 'Shop sticker collections', href: '#collections' },
  },
  {
    id: 'come-join-us',
    eyebrow: "Mama's Moon Coloring Club",
    titleLines: ['COME', 'JOIN', 'US'],
    subtitle:
      'Pull up a cushion with Miso, Pip, Plum, and Sprout! Try our free interactive coloring page, print a sheet for the kitchen table, or hop into Moon Mail.',
    bgColor: '#FFF3C8',
    themeClass: 'slide-join',
    image: './assets/hero-come-join-us.webp',
    imageAlt:
      'Miso the cream kitten, Plum the lavender bunny, Pip the golden star, and Sprout the snail hugging a giant coral-red heart that says Come Join Us.',
    layout: 'centered',
    primaryCta: { label: 'Join the Coloring Club', href: '#color' },
    secondaryCta: { label: 'Read Moon Mail', href: '#moon-mail' },
  },
];

export const STICKER_COLLECTIONS: StickerProduct[] = [
  {
    id: 'sticker-miso-crew-pack',
    title: 'Miso & Friends Cozy Crew Pack',
    subtitle: 'Thick die-cut vinyl stickers for water bottles, sketchbooks, and pencil cases.',
    category: 'die-cut',
    categoryLabel: 'Die-Cut Vinyl Pack',
    price: 9.5,
    pieceCount: '12 die-cut stickers',
    finishSpec: 'Waterproof matte vinyl',
    sizeSpec: '2.4" – 3.2" contour cut',
    description:
      "All four Mama's Moon friends in their signature poses: Miso with a warm cocoa mug, Pip holding a red crayon, Plum reading an open storybook, and Sprout beside blooming flowerpots. Printed on thick, weatherproof matte vinyl that peels cleanly.",
    primaryImage: './assets/our-little-crew.webp',
    accentImage: './assets/crew-miso.svg',
    characters: ['Miso', 'Pip', 'Plum', 'Sprout'],
    bgTint: '#FFF6E6',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Miso+Friends+sticker+pack',
    badge: 'STUDIO FAVORITE',
    addedAt: '2026-08-15',
  },
  {
    id: 'sticker-strawberry-beret-sheet',
    title: 'Strawberry Beret & Tulip Kiss-Cut Sheet',
    subtitle: 'Easy-peel planner and journal stickers featuring Miso’s beret and spring tulips.',
    category: 'sheet',
    categoryLabel: 'Kiss-Cut Sheet',
    price: 7.5,
    pieceCount: '16 kiss-cut stickers',
    finishSpec: 'Velvet matte sticker paper',
    sizeSpec: '5" × 7" collector sheet',
    description:
      'Designed for art journals, reading logs, and happy mail envelopes. Includes Strawberry Beret Miso, Sprout tucked into fresh tulips, miniature crayons, butter-yellow stars, and tiny heart seals.',
    primaryImage: './assets/hero-coloring-treat.webp',
    accentImage: './assets/crew-sprout.svg',
    characters: ['Miso', 'Sprout'],
    bgTint: '#FDF0F4',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+strawberry+beret+sticker+sheet',
    addedAt: '2026-11-04',
  },
  {
    id: 'sticker-moon-picnic-pack',
    title: 'Moonlit Picnic & Warm Buns Pack',
    subtitle: 'Storybook scene stickers straight from The Little Moon Picnic tabletop.',
    category: 'die-cut',
    categoryLabel: 'Die-Cut Vinyl Pack',
    price: 10.0,
    pieceCount: '14 die-cut stickers',
    finishSpec: 'Scratch-resistant UV vinyl',
    sizeSpec: '2.2" – 3.4" contour cut',
    description:
      'Bring the checkered picnic blanket everywhere you go. Features Miso and Plum coloring together by the crescent window, steaming custard buns, berry bowls, paper lanterns, and Pip’s starry bookmarks.',
    primaryImage: './assets/color-together.webp',
    accentImage: './assets/crew-pip.svg',
    characters: ['Miso', 'Plum', 'Pip'],
    bgTint: '#F4EEFC',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+picnic+vinyl+stickers',
    addedAt: '2026-11-12',
  },
  {
    id: 'sticker-complete-collector-bundle',
    title: "Complete Mama's Moon Sticker Trunk",
    subtitle: 'Every die-cut vinyl pack and kiss-cut sheet tucked into a keepsake glassine envelope.',
    category: 'bundle',
    categoryLabel: 'Collector Bundle',
    price: 22.0,
    compareAtPrice: 27.0,
    pieceCount: '42 stickers total',
    finishSpec: '2 vinyl packs + 1 sheet',
    sizeSpec: 'Includes studio wax-seal pouch',
    description:
      'Our full sticker collection for dedicated colorers and gift-givers. Combines the Cozy Crew Pack, Strawberry Beret Sheet, and Moonlit Picnic Pack, plus two bonus jumbo heart-hug vinyl decals.',
    primaryImage: './assets/hero-come-join-us.webp',
    accentImage: './assets/crew-plum.svg',
    characters: ['Miso', 'Pip', 'Plum', 'Sprout'],
    bgTint: '#FFF8DF',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+sticker+bundle',
    badge: 'SAVE $5',
    addedAt: '2026-09-20',
  },
];

export const LAPTOP_STICKER_PACKS: LaptopStickerProduct[] = [
  {
    id: 'laptop-sticker-cozy-miso',
    title: 'Cozy Miso & Cocoa Laptop Set',
    subtitle: 'Oversized matte vinyl decals with reading glasses Miso, cocoa mug, and crescent moon.',
    finish: 'matte',
    finishLabel: 'Matte Vinyl',
    price: 8.5,
    decalCount: 5,
    sizeSpec: '3.0" – 3.8" wide',
    materialSpec: 'Waterproof UV matte laminate',
    fitDevices: '13"–16" MacBook, ThinkPad & iPad cases',
    description:
      'Built for coffee-shop study sessions and late-night sketching. Each thick contour-cut decal uses low-tack removable adhesive that peels off aluminum laptop lids cleanly without leaving residue.',
    image: './assets/laptop-sticker-cozy-coder.jpg',
    bgTint: '#F8EFE0',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+cozy+miso+laptop+stickers',
    addedAt: '2026-11-10',
    keywords: 'laptop stickers vinyl decal macbook miso kitten cocoa mug matte removable',
  },
  {
    id: 'laptop-sticker-moon-desk',
    title: 'Plum & Pip Starlight Lid Pack',
    subtitle: 'Satin holographic laptop decals featuring Plum reading on a cloud, Pip, and moon charms.',
    finish: 'holographic',
    finishLabel: 'Holographic',
    price: 9.5,
    decalCount: 5,
    sizeSpec: '2.8" – 3.9" wide',
    materialSpec: 'Prismatic satin holo film',
    fitDevices: 'Laptop lids, tablet folios & studio sleeves',
    description:
      'Catches soft pastel rainbows when you tilt your laptop screen in morning light. Scratch-resistant satin laminate protects against backpack friction while staying crisp and smudge-free.',
    image: './assets/laptop-sticker-moon-desk.jpg',
    bgTint: '#F1EAF8',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+starlight+holographic+laptop+stickers',
    addedAt: '2026-11-15',
    keywords: 'laptop stickers holographic plum bunny pip star sketchbook lid decal macbook',
  },
  {
    id: 'laptop-sticker-garden-break',
    title: "Sprout's Garden Break Decals",
    subtitle: 'Botanical matte vinyl stickers with Sprout the snail, daisies, watering can, and berry tart.',
    finish: 'matte',
    finishLabel: 'Matte Vinyl',
    price: 8.5,
    decalCount: 4,
    sizeSpec: '3.0" – 3.6" wide',
    materialSpec: 'Scratch-proof matte vinyl',
    fitDevices: 'MacBook Air, Chromebooks & studio cases',
    description:
      'A gentle botanical breather for your everyday carry. Heavyweight 4-mil vinyl resists water splashes, sunlight fading, and daily sleeve slides while peeling cleanly whenever you refresh your lid.',
    image: './assets/laptop-sticker-garden-break.jpg',
    bgTint: '#ECF4E8',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+sprout+garden+laptop+stickers',
    addedAt: '2026-10-01',
    keywords: 'laptop stickers sprout snail tulip daisy botanical matte vinyl removable decal',
  },
  {
    id: 'laptop-sticker-full-crew-lid',
    title: 'Complete Miso & Friends Lid Bundle',
    subtitle: 'All four characters sized specifically for a balanced laptop corner collage plus bonus mini stars.',
    finish: 'lid-set',
    finishLabel: 'Laptop Lid Set',
    price: 14.0,
    compareAtPrice: 17.0,
    decalCount: 8,
    sizeSpec: '2.6" – 4.0" wide',
    materialSpec: 'Residue-free matte UV vinyl',
    fitDevices: 'Fits 13"–16" laptops & tablet cases',
    description:
      'Our flagship curated lid layout featuring Miso, Plum, Pip, and Sprout sized to sit neatly together around any laptop emblem without crowding your hinges or corners.',
    image: './assets/laptop-sticker-starlight-pack.jpg',
    bgTint: '#FBF1E4',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+complete+laptop+sticker+bundle',
    badge: 'SAVE $3',
    addedAt: '2026-09-12',
    keywords: 'laptop stickers bundle lid set macbook crew miso plum pip sprout vinyl decal',
  },
];

export const KIDS_BEDDING_COLLECTION: KidsBeddingProduct[] = [
  {
    id: 'bedding-moon-picnic-sheets',
    title: 'Miso & Moonbeams Organic Bedsheet Set',
    subtitle: 'Cream ivory percale cotton sheets printed with sleepy Miso kittens, crescent moons, and tiny stars.',
    category: 'sheet-set',
    categoryLabel: 'Sheet Set',
    price: 48.0,
    pieceCount: 'Fitted, flat & pillowcase',
    fabricSpec: '100% GOTS Organic Percale',
    threadCount: '300-thread-count breathable weave',
    careSpec: 'OEKO-TEX Standard 100 · Machine wash cold',
    availableSizes: ['Toddler / Crib', 'Twin', 'Full'],
    defaultSize: 'Twin',
    description:
      'Cool, crisp, and story-soft organic cotton percale woven for peaceful bedtime wind-downs. Features gentle hand-drawn Miso kitten and crescent moon prints with deep 14-inch elastic pockets that stay snug through pillow forts and midnight wiggles.',
    image: './assets/images/kids_bedsheet_moon_picnic_1795066221119.jpg',
    bgTint: '#FBF5E8',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+organic+kids+bedsheet+set',
    badge: '100% ORGANIC COTTON',
    addedAt: '2026-09-05',
    keywords: 'bedsheet kids bed sheets cotton percale toddler crib twin full miso kitten moon nursery',
  },
  {
    id: 'bedding-starlight-garden-sheets',
    title: "Sprout's Starlight Garden Fitted Sheet & Sham",
    subtitle: 'Botanical sage-and-cream cotton fitted bedsheet paired with a storybook ruffled pillow sham.',
    category: 'sheet-set',
    categoryLabel: 'Sheet Set',
    price: 42.0,
    pieceCount: 'Fitted sheet + ruffled sham',
    fabricSpec: 'Washed Organic Cotton Muslin',
    threadCount: '280-thread-count soft drape',
    careSpec: 'Pre-washed for day-one softness',
    availableSizes: ['Toddler / Crib', 'Twin'],
    defaultSize: 'Toddler / Crib',
    description:
      'Brushed botanical linen adorned with Sprout the snail, morning daisies, and golden tulips. Designed for toddler rails and twin daybed frames with hypoallergenic low-impact botanical dyes that grow softer with every laundry cycle.',
    image: './assets/images/kids_bedsheet_starlight_garden_1795066221249.jpg',
    bgTint: '#EEF5EC',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+garden+kids+fitted+bedsheet',
    addedAt: '2026-11-08',
    keywords: 'bedsheet toddler nursery crib garden snail sprout sheet set cotton ruffled sham kids room',
  },
  {
    id: 'bedding-midnight-kittens-quilt',
    title: 'Midnight Kittens Reversible Cotton Quilt',
    subtitle: 'Hand-quilted dusty lavender and buttercream blanket woven with sleepy kitten & paper lantern motifs.',
    category: 'quilt',
    categoryLabel: 'Blanket & Quilt',
    price: 64.0,
    pieceCount: 'Reversible quilt + 1 sham',
    fabricSpec: 'Double-Gauze Cotton & Poly Fill',
    threadCount: 'Diamond-stitched cozy loft',
    careSpec: 'Machine washable · Low heat dry',
    availableSizes: ['Toddler / Crib', 'Twin', 'Full'],
    defaultSize: 'Twin',
    description:
      'Flip between dreamy twilight lavender and warm buttercream morning gold whenever the mood strikes. Breathable cotton shell and featherlight loft keep young sleepers warm without overheating during storytime.',
    image: './assets/images/kids_quilt_midnight_kittens_1795066223442.jpg',
    bgTint: '#F2ECF8',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+midnight+kittens+kids+quilt',
    addedAt: '2026-11-14',
    keywords: 'quilt blanket comforter kids bedroom bedsheet coverlet lavender buttercream kittens',
  },
  {
    id: 'bedding-cozy-crew-room-bundle',
    title: "Complete Mama's Moon Kid's Room Linen Bundle",
    subtitle: 'Blush-peach sheet set, embroidered star pillowcase, and heirloom knit throw tied with cotton ribbon.',
    category: 'room-bundle',
    categoryLabel: 'Room Bundle',
    price: 96.0,
    compareAtPrice: 118.0,
    pieceCount: '4-pc linen + knit throw',
    fabricSpec: 'Organic Cotton Percale & Knit',
    threadCount: '300-TC sheets + waffle knit throw',
    careSpec: 'Gift-wrapped in reusable cotton bag',
    availableSizes: ['Toddler / Crib', 'Twin', 'Full'],
    defaultSize: 'Twin',
    description:
      'Everything needed to dress a newly painted nursery or big-kid bed in one thoughtful box. Pairs our breathable blush-peach fitted and flat sheets with an embroidered star pillowcase and cream heirloom knit throw.',
    image: './assets/images/kids_bedding_bundle_cozy_crew_1795066222390.jpg',
    bgTint: '#FDF1EB',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+kids+room+bedding+bundle',
    badge: 'SAVE $22',
    addedAt: '2026-10-10',
    keywords: 'kids room bedding bundle bedsheet throw blanket nursery gift twin full toddler linen',
  },
];

export const DIGITAL_PDF_BOOKS: DigitalPdfProduct[] = [
  {
    id: 'pdf-little-moon-picnic',
    number: 'No. 01 · Digital PDF',
    title: 'The Little Moon Picnic — Printable Book',
    subtitle: 'Full 40-page story coloring book formatted for instant home printing.',
    price: 6.5,
    pageCount: 40,
    formatSpec: '300 DPI Vector PDF',
    paperSpec: 'A4 & US Letter files included',
    ageRange: 'Ages 6–9',
    description:
      'When rain taps the porch, Miso, Plum, Pip, and Sprout spread a checkered blanket indoors and share warm buns and berries. Download the complete 40-page printable edition and print your favorite pages as many times as you like on marker paper or cardstock.',
    includedItems: [
      '40 full-page story illustrations with bold 1.4mm outlines',
      'Separate US Letter (8.5" × 11") & A4 print-ready PDF files',
      'Printable DIY bookmark & picnic place-card bonus sheet',
    ],
    coverImage: './assets/the-little-moon-picnic-book.png?v=mamas-moon-3',
    samplePreviewSvg: './assets/rooftop-coloring.svg',
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Moon+Picnic+PDF',
    bgTint: '#FFF7E5',
    badge: 'MOST POPULAR PDF',
  },
  {
    id: 'pdf-christmas-new-year',
    number: 'No. 02 · Digital PDF',
    title: 'Christmas & New Year — Printable Book',
    subtitle: 'Festive 42-page winter village story coloring book for instant home printing.',
    price: 6.5,
    pageCount: 42,
    formatSpec: '300 DPI Vector PDF',
    paperSpec: 'A4 & US Letter files included',
    ageRange: 'Ages 6–9',
    description:
      'Follow Miso, Plum, Pip, and Sprout through a snowy town of twinkling wreaths, candy-cane cocoa mugs, gingerbread stars, and New Year sparklers. Includes 42 print-ready holiday story pages.',
    includedItems: [
      '42 festive winter village & holiday story pages with bold outlines',
      'Separate US Letter (8.5" × 11") & A4 print-ready 300 DPI PDF files',
      'Bonus printable holiday gift tags & countdown coloring tracker',
    ],
    coverImage: './assets/christmas-new-year-book.png?v=mamas-moon-3',
    samplePreviewSvg: './assets/rooftop-coloring.svg',
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Christmas+New+Year+PDF',
    bgTint: '#FCE7E9',
    badge: 'NEW HOLIDAY PDF',
  },
  {
    id: 'pdf-midnight-kittens',
    number: 'No. 03 · Digital PDF',
    title: 'Midnight Kittens — Printable Book',
    subtitle: 'Paper lanterns, sleepy clouds, and moonlit rooftop adventures.',
    price: 6.0,
    pageCount: 36,
    formatSpec: '300 DPI Vector PDF',
    paperSpec: 'A4 & US Letter files included',
    ageRange: 'Ages 4–9',
    description:
      'Tiptoe across cozy rooftops with Miso under a fat yellow moon. Filled with roomy shapes, attic tea tables, starry telescopes, and gentle nighttime scenes that are easy on small hands and relaxing for grown-ups.',
    includedItems: [
      '36 rooftop & starlight coloring pages with wide margins',
      'Crisp vector linework that stays sharp at any print scale',
      'Color swatch test sheet for crayons and alcohol markers',
    ],
    coverImage: './assets/cover-midnight-cozy.webp',
    samplePreviewSvg: './assets/rooftop-coloring.svg',
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Midnight+Kittens+printable+PDF',
    bgTint: '#F3EEFC',
  },
  {
    id: 'pdf-starlight-garden',
    number: 'No. 04 · Digital PDF',
    title: 'Starlight Garden — Printable Book',
    subtitle: 'Giant blossoms, watering cans, glass greenhouses, and Sprout’s leaf trail.',
    price: 6.0,
    pageCount: 36,
    formatSpec: '300 DPI Vector PDF',
    paperSpec: 'A4 & US Letter files included',
    ageRange: 'Ages 4–9',
    description:
      'Step into the moonlit conservatory with Sprout and Plum. Every page celebrates oversized botanicals, cozy potting benches, and friendly garden snails with plenty of open white space for blending colors.',
    includedItems: [
      '36 botanical & greenhouse illustrations ready to print',
      'Both A4 and US Letter PDF editions for zero-crop printing',
      'Printable plant-tag & garden label activity page',
    ],
    coverImage: './assets/cover-garden-cozy.webp',
    samplePreviewSvg: './assets/garden-coloring.svg',
    sampleColoredSvg: './assets/garden-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Starlight+Garden+printable+PDF',
    bgTint: '#EEF8F2',
  },
  {
    id: 'pdf-complete-studio-bundle',
    number: 'No. 05 · 3-Book PDF Bundle',
    title: "Complete Mama's Moon Printable Library",
    subtitle: 'All three digital coloring books (112 printable pages) in one instant download.',
    price: 14.5,
    compareAtPrice: 18.5,
    pageCount: 112,
    formatSpec: '3 × 300 DPI Vector PDFs',
    paperSpec: 'Unlimited personal & family prints',
    ageRange: 'Ages 4–9',
    description:
      'The complete digital shelf for rainy weekends, playdates, and quiet afternoons. Includes The Little Moon Picnic, Midnight Kittens, and Starlight Garden in high-resolution PDF format so you can print fresh copies whenever a new crayon box arrives.',
    includedItems: [
      "All 112 coloring pages across 3 full-length Mama's Moon books",
      'A4 & US Letter master PDFs + Procreate/tablet-friendly pages',
      'Bonus printable Crew Character Standees & Coloring Club certificate',
    ],
    coverImage: './assets/cover-planet-cozy.webp',
    samplePreviewSvg: './assets/rocket-coloring.svg',
    sampleColoredSvg: './assets/rocket-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+printable+coloring+book+bundle+PDF',
    bgTint: '#FDF0F4',
    badge: 'BEST VALUE · 3 PDFS',
  },
];

export const DIGITAL_COMBO_PACKS: DigitalComboProduct[] = [
  {
    id: 'digital-combo-1-little-cuddles',
    comboLabel: 'COMBO 1',
    title: 'Combo 1: Little Cuddles',
    seriesTitle: 'LITTLE CUDDLES',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Hit the sunny countryside road with Combo 1: Little Cuddles! Includes 10 cozy, bold-line digital coloring pages featuring road trips, picnic blankets, bedtime stories, and quiet kitchen-table scenes ready to print or color on a tablet.',
    coverImage: './assets/digital-combo-1.jpg',
    coverBg: '#FFF4B8',
    coverTextColor: '#3B2314',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/rooftop-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
    ],
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Cuddles+Combo+1+digital',
    keywords: 'digital combo 1 little cuddles 10 digital coloring pages car road trip printable pdf',
  },
  {
    id: 'digital-combo-2-little-cuddles',
    comboLabel: 'COMBO 2',
    title: 'Combo 2: Little Cuddles',
    seriesTitle: 'LITTLE CUDDLES',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Blast off into cozy imagination with Combo 2: Little Cuddles! Includes 10 crisp digital coloring pages packed with toy rockets, starry playrooms, sleepy clouds, and gentle outdoor adventures.',
    coverImage: './assets/digital-combo-2.jpg',
    coverBg: '#D4EFD8',
    coverTextColor: '#2B3A2E',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/garden-coloring.svg',
    ],
    sampleColoredSvg: './assets/rocket-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Cuddles+Combo+2+digital',
    keywords: 'digital combo 2 little cuddles 10 digital coloring pages rocket stars puppy printable pdf',
  },
  {
    id: 'digital-combo-3-little-cuddles',
    comboLabel: 'COMBO 3',
    title: 'Combo 3: Little Cuddles',
    seriesTitle: 'LITTLE CUDDLES',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Step into a sunny backyard garden with Combo 3: Little Cuddles! Features 10 easy-to-color digital pages with blooming flowerpots, birdbaths, friendly garden bugs, and cozy afternoon tea spots.',
    coverImage: './assets/digital-combo-3.jpg',
    coverBg: '#D7EEFA',
    coverTextColor: '#243544',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/garden-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rocket-coloring.svg',
    ],
    sampleColoredSvg: './assets/garden-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Cuddles+Combo+3+digital',
    keywords: 'digital combo 3 little cuddles 10 digital coloring pages ladybug garden birdbath printable pdf',
  },
  {
    id: 'digital-combo-4-little-cuddles',
    comboLabel: 'COMBO 4',
    title: 'Combo 4: Little Cuddles',
    seriesTitle: 'LITTLE CUDDLES',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Warm croissants and neighborhood smiles await in Combo 4: Little Cuddles! Features 10 bold-outline digital coloring pages of cozy bakeries, wicker bread baskets, market stalls, and sweet afternoon treats.',
    coverImage: './assets/digital-combo-4.jpg',
    coverBg: '#FCE2E8',
    coverTextColor: '#3E252D',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
    ],
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Cuddles+Combo+4+digital',
    keywords: 'digital combo 4 little cuddles 10 digital coloring pages panda duck bakery bread printable pdf',
  },
  {
    id: 'digital-combo-5-moon-picnic',
    comboLabel: 'COMBO 5',
    title: 'Combo 5: Moon Picnic',
    seriesTitle: 'MOON PICNIC',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 6–9',
    description:
      'Ten favorite indoor picnic scenes from Miso & Friends! Color warm custard buns, checkered blankets, paper moons, and rainy-day cocoa mugs.',
    coverImage: './assets/the-little-moon-picnic-book.png?v=mamas-moon-3',
    coverBg: '#FBE39C',
    coverTextColor: '#3B2314',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    hasEmbeddedCoverText: true,
    samplePages: [
      './assets/rooftop-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rocket-coloring.svg',
    ],
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Little+Moon+Picnic+Combo+5+digital',
    keywords: 'digital combo 5 moon picnic 10 digital coloring pages miso plum printable pdf',
  },
  {
    id: 'digital-combo-6-winter-village',
    comboLabel: 'COMBO 6',
    title: 'Combo 6: Winter Village',
    seriesTitle: 'WINTER VILLAGE',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 6–9',
    description:
      'Bundle up for 10 snowy Cocoa Lane scenes featuring candy-cane mugs, sparkling wreaths, mittened kittens, and cozy winter cottages.',
    coverImage: './assets/christmas-new-year-book.png?v=mamas-moon-3',
    coverBg: '#FCE7E9',
    coverTextColor: '#4B2C20',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    hasEmbeddedCoverText: true,
    samplePages: [
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/garden-coloring.svg',
    ],
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Winter+Village+Combo+6+digital',
    keywords: 'digital combo 6 winter village christmas new year 10 digital coloring pages printable pdf',
  },
  {
    id: 'digital-combo-7-midnight-kittens',
    comboLabel: 'COMBO 7',
    title: 'Combo 7: Midnight Kittens',
    seriesTitle: 'MIDNIGHT KITTENS',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Ten serene rooftop lantern and crescent-moon coloring sheets designed for slow bedtime wind-downs and bold marker shading.',
    coverImage: './assets/cover-midnight-cozy.webp',
    coverBg: '#ECE3FB',
    coverTextColor: '#2D213D',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/garden-coloring.svg',
    ],
    sampleColoredSvg: './assets/rooftop-colored.svg',
    samplePdfUrl: './assets/miso-and-the-moon.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Midnight+Kittens+Combo+7+digital',
    keywords: 'digital combo 7 midnight kittens rooftop 10 digital coloring pages printable pdf',
  },
  {
    id: 'digital-combo-8-starlight-garden',
    comboLabel: 'COMBO 8',
    title: 'Combo 8: Starlight Garden',
    seriesTitle: 'STARLIGHT GARDEN',
    subtitle: '10 DIGITAL COLORING PAGES',
    price: 2.99,
    pageCount: 10,
    formatSpec: '300 DPI Printable PDF · US Letter & A4',
    ageRange: 'Ages 4–9',
    description:
      'Ten botanical greenhouse pages with giant daisies, watering cans, and Sprout the snail exploring sunlit garden paths.',
    coverImage: './assets/cover-garden-cozy.webp',
    coverBg: '#E3F5EA',
    coverTextColor: '#223B2B',
    headlineColorStart: '#EA84A7',
    headlineColorEnd: '#8E88DC',
    samplePages: [
      './assets/garden-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
      './assets/garden-coloring.svg',
      './assets/miso-moon-coloring.svg',
      './assets/rooftop-coloring.svg',
      './assets/rocket-coloring.svg',
    ],
    sampleColoredSvg: './assets/garden-colored.svg',
    samplePdfUrl: './assets/miso-moon-coloring.pdf',
    etsyUrl: 'https://www.etsy.com/search?q=Mamas+Moon+Starlight+Garden+Combo+8+digital',
    keywords: 'digital combo 8 starlight garden snail sprout 10 digital coloring pages printable pdf',
  },
];

export const PEEK_PAGES: PeekItem[] = [
  {
    id: 'rooftop',
    title: 'Rooftop dreams',
    description:
      'Miso tiptoes across the rooftops under a fat yellow moon. Color the lanterns, the sleepy clouds, and the very top of the town.',
    outlineSvg: './assets/rooftop-coloring.svg',
    coloredSvg: './assets/rooftop-colored.svg',
    alt: 'Miso with a mug and lantern on a moonlit rooftop, ready to color.',
    cardClass: 'peek-card-a',
  },
  {
    id: 'garden',
    title: 'Midnight garden',
    description:
      'Giant flowers, a watering can, and one small snail. This is the page for every color in the crayon box — especially the loud ones.',
    outlineSvg: './assets/garden-coloring.svg',
    coloredSvg: './assets/garden-colored.svg',
    alt: 'Miso watering flowers beside Sprout the snail, ready to color.',
    cardClass: 'peek-card-b',
  },
  {
    id: 'rocket',
    title: 'A tiny planet',
    description:
      'A rocket, a ringed planet, and a star with somewhere to be. Buckle up and color outside the lines.',
    outlineSvg: './assets/rocket-coloring.svg',
    coloredSvg: './assets/rocket-colored.svg',
    alt: 'Miso and Pip in their little rocket beside a ringed planet, ready to color.',
    cardClass: 'peek-card-c',
  },
];

export const CREW_MEMBERS: CrewMember[] = [
  {
    name: 'Miso',
    role: 'the daydreamer',
    species: 'Cream kitten · Mustard scarf',
    scaleRatio: '1.00',
    note: 'Leans toward a drawing, tucks a bun into a basket, and always saves a seat.',
  },
  {
    name: 'Pip',
    role: 'the bright idea',
    species: 'Five-point star · Butter yellow',
    scaleRatio: '0.45',
    note: 'Peeks from cushions, hangs paper moons, and gets dusted with flour.',
  },
  {
    name: 'Plum',
    role: 'the kind heart',
    species: 'Lavender lop-eared friend',
    scaleRatio: '0.95',
    note: 'Makes room at the table, holds the umbrella over the wagon, and reads aloud.',
  },
  {
    name: 'Sprout',
    role: 'the slow-and-steady',
    species: 'Small snail · Leaf-green shell',
    scaleRatio: '0.30',
    note: 'Carries one very good berry on a leaf tray and notices hidden doorways.',
  },
];

export const STUDIO_PALETTE: CrayonSwatch[] = [
  { color: '#FFC81E', label: 'Butter yellow', role: "Miso's scarf & Pip" },
  { color: '#F5A9BC', label: 'Peach pink', role: 'Warm blossoms' },
  { color: '#B79BDD', label: 'Lavender', role: 'Plum & twilight' },
  { color: '#8FD3A8', label: 'Mint green', role: "Sprout's shell & leaves" },
  { color: '#97BDE7', label: 'Sky blue', role: 'Moonlit window' },
  { color: '#D87977', label: 'Berry coral', role: 'Picnic berry & heart' },
  { color: '#FFF4DB', label: 'Warm cream', role: 'Cozy paper & dough' },
  { color: '#FFFFFF', label: 'White eraser', role: 'Start fresh' },
];

export const CATALOG_SECTIONS = [
  {
    title: 'Sticker Collections',
    theme: 'Die-cut vinyl packs & kiss-cut sticker sheets',
    href: '#collections',
    image: './assets/our-little-crew.webp',
    keywords: 'stickers vinyl die-cut kiss-cut sheet bundle pack miso pip plum sprout shop',
  },
  {
    title: 'Laptop Stickers',
    theme: 'Residue-free 3–4" matte & holographic lid decals',
    href: '#laptop-stickers',
    image: './assets/laptop-sticker-starlight-pack.jpg',
    keywords: 'laptop stickers macbook vinyl decal holographic matte removable lid case tablet',
  },
  {
    title: 'Kids Bedsheets & Cozy Room',
    theme: '100% organic cotton sheets, reversible quilts & nursery bundles',
    href: '#kids-bedding',
    image: './assets/images/kids_bedsheet_moon_picnic_1795066221119.jpg',
    keywords: 'kids bedsheet sheets blanket quilt nursery toddler twin full room linen bedding',
  },
  {
    title: 'Digital PDF Coloring Books',
    theme: 'Instant-download printable 300 DPI PDF books',
    href: '#digital-books',
    image: './assets/the-little-moon-picnic-book.png?v=mamas-moon-3',
    keywords: 'digital pdf printable coloring book download instant a4 letter bundle',
  },
  {
    title: 'From the coloring table',
    theme: 'Watch a 16-second coloring clip',
    href: '#watch',
    image: './assets/coloring-table-poster.webp',
    keywords: 'video watch clip markers puppies coloring table',
  },
  {
    title: 'Miso & the Moon',
    theme: 'Free coloring page',
    href: '#color',
    image: './assets/miso-moon-coloring.svg',
    keywords: 'free printable print pdf color online colouring download club page miso moon studio',
  },
  {
    title: 'Meet Miso and friends',
    theme: 'Our story',
    href: '#story',
    image: './assets/our-little-crew.webp',
    keywords: 'kitten cat rabbit snail star crew characters friends story',
  },
  {
    title: 'Frequently asked questions',
    theme: 'Good to know',
    href: '#faq',
    image: './assets/brand-logo.webp',
    keywords: 'help parents ages printing buy purchase questions faq',
  },
  {
    title: 'Moon Mail',
    theme: 'A little letter',
    href: '#moon-mail',
    image: './assets/brand-logo.webp',
    keywords: 'newsletter email letter subscribe updates moon mail',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'who-for',
    question: 'Who are the books for?',
    answerHtml:
      'Our big shapes and bold outlines welcome young colorers, with the collection aimed at ages 4 to 9 (and our Little Moon Picnic series crafted especially for ages 6–9). Grown-ups are very welcome to pull up a chair, too.',
  },
  {
    id: 'how-print',
    question: 'How do I print the free page?',
    answerHtml:
      'Download the PDF, open it, and print at “Fit to page” on A4 or US Letter paper. Thicker paper is lovely, but ordinary printer paper works just fine.',
  },
  {
    id: 'where-find',
    question: "Where can I find Mama's Moon books?",
    answerHtml:
      "You can find Mama's Moon on Amazon and Etsy. Browse Mama's Moon on Amazon or visit our Etsy shop for the current selection, printables, and delivery options.",
  },
  {
    id: 'studio-free',
    question: 'Is the online coloring studio really free?',
    answerHtml:
      'Yes. Pick a crayon color, tap a shape, and color Miso’s page right in your browser. You can download your finished page as a PNG or print a blank copy.',
  },
  {
    id: 'drawing-system',
    question: "What makes Mama's Moon drawings feel handmade and easy to color?",
    answerHtml:
      "Every illustration follows our Mama's Moon Drawing System: confident 1.2–1.5 mm rounded felt-tip contours, closed colorable regions with at least 70% open white space, purposeful poses where Miso, Pip, Plum, and Sprout interact naturally, and zero gray shading or visual clutter.",
  },
  {
    id: 'moon-mail-faq',
    question: 'What’s Moon Mail?',
    answerHtml:
      'A little home for future studio letters and free pages. Email subscriptions are still being prepared. For now, the Coloring Club has a page ready whenever you are.',
  },
];
