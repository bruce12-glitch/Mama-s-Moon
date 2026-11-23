export interface SearchableItem {
  id?: string;
  title: string;
  theme: string;
  keywords: string;
  image: string;
  href?: string;
}

/**
 * Computes the next slide index with wrap-around.
 */
export function getNextSlideIndex(currentIndex: number, totalSlides: number, direction: 1 | -1 = 1): number {
  if (totalSlides <= 0) return 0;
  return ((currentIndex + direction) % totalSlides + totalSlides) % totalSlides;
}

/**
 * Filters catalog items by search query or saved IDs.
 */
export function filterCatalogItems<T extends SearchableItem>(
  items: T[],
  query: string,
  mode: 'search' | 'saved',
  savedIds: Set<string>
): T[] {
  if (mode === 'saved') {
    return items.filter((item) => Boolean(item.id && savedIds.has(item.id)));
  }
  const normalized = query.toLowerCase().trim();
  if (!normalized) return items;
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    const haystack = `${item.title} ${item.theme} ${item.keywords}`.toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

/**
 * Toggles a book ID in the saved set and returns a new Set.
 */
export function toggleSavedBookId(savedIds: Set<string>, bookId: string, validBookIds?: Set<string>): Set<string> {
  const next = new Set(savedIds);
  if (!bookId || (validBookIds && !validBookIds.has(bookId))) {
    return next;
  }
  if (next.has(bookId)) {
    next.delete(bookId);
  } else {
    next.add(bookId);
  }
  return next;
}

/**
 * Parses and validates persisted wishlist product IDs from localStorage JSON,
 * optionally migrating legacy saved-digital IDs on first load.
 */
export function parseWishlistIds(
  rawJson: string | null,
  validIds: Set<string>,
  legacyRawJson: string | null = null
): Set<string> {
  const source = rawJson ?? legacyRawJson;
  if (!source) return new Set<string>();
  try {
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(
      parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id))
    );
  } catch {
    return new Set<string>();
  }
}

/**
 * Validates Moon Mail email input and returns a friendly validation result.
 */
export function validateMoonMailEmail(rawEmail: string): { valid: boolean; error: string } {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Add an email so we know where to send the moon.',
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      error: 'That email looks a little lost in space. Try again?',
    };
  }
  return { valid: true, error: '' };
}

/**
 * Computes 3D card tilt angles (in degrees) from normalized pointer coordinates.
 */
export function computeBookTiltAngles(
  normX: number,
  normY: number,
  maxTiltX = 6,
  maxTiltY = 8
): { rx: string; ry: string } {
  const clampedX = Math.max(-0.5, Math.min(0.5, normX));
  const clampedY = Math.max(-0.5, Math.min(0.5, normY));
  const rawRx = -clampedY * maxTiltX || 0;
  const rawRy = clampedX * maxTiltY || 0;
  const rx = rawRx.toFixed(2) + 'deg';
  const ry = rawRy.toFixed(2) + 'deg';
  return { rx, ry };
}

/**
 * Frame-rate independent exponential damping helper for 3D camera & transitions.
 */
export function dampValue(current: number, target: number, lambda: number, dt: number): number {
  if (dt <= 0) return current;
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/**
 * Determines whether a selected swatch color acts as an eraser in the coloring studio.
 */
export function isEraserSwatch(hexColor: string): boolean {
  const upper = hexColor.trim().toUpperCase();
  return upper === '#FFFFFF' || upper === '#FFFDF7';
}

export interface ForestAudioUiState {
  isPlaying: boolean;
  iconState: 'speaker' | 'muted';
  ariaLabel: string;
  buttonLabel: string;
  statusBadge: string;
}

/**
 * Computes consistent UI & accessibility metadata for the global and 3D scene ambient forest sound toggles.
 */
export function getForestAudioUiState(isPlaying: boolean): ForestAudioUiState {
  if (isPlaying) {
    return {
      isPlaying: true,
      iconState: 'speaker',
      ariaLabel: "Mute ambient forest sound for Mama's Moon",
      buttonLabel: 'Forest Sound',
      statusBadge: 'On',
    };
  }
  return {
    isPlaying: false,
    iconState: 'muted',
    ariaLabel: "Play ambient forest sound for Mama's Moon",
    buttonLabel: 'Forest Sound',
    statusBadge: 'Muted',
  };
}

export type DioramaMoodId = 'moonlit-night' | 'golden-dusk' | 'starlight-bloom';

export interface DioramaLightMoodConfig {
  id: DioramaMoodId;
  label: string;
  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  skyBottom: string;
  fogColor: number;
  keyLightColor: number;
  keyLightIntensity: number;
  fillLightColor: number;
  fillLightIntensity: number;
  moonGlowIntensity: number;
  fireflyOpacity: number;
}

export const DIORAMA_LIGHT_MOODS: Record<DioramaMoodId, DioramaLightMoodConfig> = {
  'moonlit-night': {
    id: 'moonlit-night',
    label: 'Moonlit Night',
    skyTop: '#243B6B',
    skyMid: '#375A9E',
    skyHorizon: '#5688C7',
    skyBottom: '#2B3F66',
    fogColor: 0x375a9e,
    keyLightColor: 0xfff3d6,
    keyLightIntensity: 2.35,
    fillLightColor: 0xffb8d1,
    fillLightIntensity: 0.9,
    moonGlowIntensity: 2.6,
    fireflyOpacity: 0.92,
  },
  'golden-dusk': {
    id: 'golden-dusk',
    label: 'Golden Dusk',
    skyTop: '#3B2D5E',
    skyMid: '#6E4578',
    skyHorizon: '#C97A7E',
    skyBottom: '#422B4E',
    fogColor: 0x6e4578,
    keyLightColor: 0xffdf9e,
    keyLightIntensity: 2.65,
    fillLightColor: 0xff9eb5,
    fillLightIntensity: 1.15,
    moonGlowIntensity: 3.1,
    fireflyOpacity: 0.85,
  },
  'starlight-bloom': {
    id: 'starlight-bloom',
    label: 'Starlight',
    skyTop: '#19284C',
    skyMid: '#284278',
    skyHorizon: '#466FA6',
    skyBottom: '#1C2B4B',
    fogColor: 0x284278,
    keyLightColor: 0xeef6ff,
    keyLightIntensity: 2.15,
    fillLightColor: 0xc8b6ff,
    fillLightIntensity: 1.05,
    moonGlowIntensity: 2.9,
    fireflyOpacity: 1.0,
  },
};

export function getDioramaLightMood(moodId: DioramaMoodId): DioramaLightMoodConfig {
  return DIORAMA_LIGHT_MOODS[moodId] ?? DIORAMA_LIGHT_MOODS['moonlit-night'];
}

/**
 * Computes a non-negative upward bounce Y position for 3D picnic characters
 * so characters (like Pip the Star) never sink below their grounded blanket baseY.
 */
export function computeGroundedCharacterY(
  baseY: number,
  elapsedSeconds: number,
  frequency: number,
  amplitude: number,
  hopOffset = 0
): number {
  const safeAmp = Math.max(0, amplitude);
  const safeHop = Math.max(0, hopOffset);
  const upwardWave = (1 + Math.sin(elapsedSeconds * frequency)) * 0.5 * safeAmp;
  return baseY + upwardWave + safeHop;
}

/**
 * Filters sticker collection items by category ('all' | 'die-cut' | 'sheet' | 'bundle').
 */
export function filterStickerProducts<T extends { category: string }>(
  products: T[],
  category: 'all' | string
): T[] {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter((item) => item.category === category);
}

export interface StudioBagSummary {
  totalItems: number;
  subtotal: number;
  qualifiesForFreeShipping: boolean;
  amountToFreeShipping: number;
}

/**
 * Calculates total item count, subtotal, and free sticker-shipping threshold progress
 * from a bag quantity map and product price lookup.
 */
export function calculateStudioBagSummary(
  quantities: Record<string, number>,
  priceById: Record<string, number>,
  freeShippingThreshold = 25
): StudioBagSummary {
  let totalItems = 0;
  let subtotal = 0;

  for (const [productId, rawQty] of Object.entries(quantities)) {
    const qty = Math.max(0, Math.floor(rawQty || 0));
    const unitPrice = priceById[productId];
    if (qty > 0 && typeof unitPrice === 'number' && unitPrice >= 0) {
      totalItems += qty;
      subtotal += qty * unitPrice;
    }
  }

  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const remaining = Math.max(0, Math.round((freeShippingThreshold - roundedSubtotal) * 100) / 100);

  return {
    totalItems,
    subtotal: roundedSubtotal,
    qualifiesForFreeShipping: roundedSubtotal >= freeShippingThreshold,
    amountToFreeShipping: remaining,
  };
}

/**
 * Returns the initial 4 Digital combos or the full list when "View more" is expanded.
 */
export function getVisibleDigitalCombos<T>(
  combos: T[],
  isExpanded: boolean,
  initialCount = 4
): T[] {
  if (isExpanded || initialCount <= 0) {
    return combos;
  }
  return combos.slice(0, initialCount);
}

/**
 * Filters laptop sticker packs by vinyl finish ('all' | 'matte' | 'holographic' | 'lid-set').
 */
export function filterLaptopStickers<T extends { finish: string }>(
  packs: T[],
  finish: 'all' | string
): T[] {
  if (!finish || finish === 'all') {
    return packs;
  }
  return packs.filter((item) => item.finish === finish);
}

/**
 * Filters kids bedsheets, quilts, and nursery room linen bundles by category.
 */
export function filterKidsBeddingProducts<T extends { category: string }>(
  items: T[],
  category: 'all' | string
): T[] {
  if (!category || category === 'all') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

function toUtcDayTimestamp(input: Date | string): number | null {
  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) return null;
    return Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate());
  }
  const trimmed = input.trim();
  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]) - 1;
    const day = Number(isoDateMatch[3]);
    const utcMs = Date.UTC(year, month, day);
    const check = new Date(utcMs);
    if (
      check.getUTCFullYear() !== year ||
      check.getUTCMonth() !== month ||
      check.getUTCDate() !== day
    ) {
      return null;
    }
    return utcMs;
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate());
}

/**
 * Returns true when a product's `addedAt` ISO date is within the last `windowDays` days (inclusive)
 * relative to `referenceDate`, ignoring invalid or future dates.
 */
export function isNewArrival(
  addedAt?: string,
  referenceDate: Date | string = new Date(),
  windowDays = 30
): boolean {
  if (!addedAt || windowDays < 0) return false;
  const addedDayMs = toUtcDayTimestamp(addedAt);
  const refDayMs = toUtcDayTimestamp(referenceDate);
  if (addedDayMs === null || refDayMs === null) return false;
  const diffDays = (refDayMs - addedDayMs) / 86_400_000;
  return diffDays >= 0 && diffDays <= windowDays;
}

export interface HeroTrimPalette {
  base: string;
  dark: string;
  light: string;
  edgeShadow: string;
}

const HERO_TRIM_PALETTES: Record<string, HeroTrimPalette> = {
  'christmas-book-showcase': {
    base: '#d14763',
    dark: '#aa304a',
    light: '#ffd0db',
    edgeShadow: 'rgba(170, 48, 74, 0.18)',
  },
  'winter-village-full-banner': {
    base: '#e5b855',
    dark: '#be8e2d',
    light: '#fff3cf',
    edgeShadow: 'rgba(130, 88, 22, 0.2)',
  },
  'winter-village-showcase': {
    base: '#6c98c2',
    dark: '#4b759d',
    light: '#e2effa',
    edgeShadow: 'rgba(58, 94, 130, 0.18)',
  },
  'book-showcase': {
    base: '#dc4d71',
    dark: '#b43556',
    light: '#ffd1de',
    edgeShadow: 'rgba(164, 46, 78, 0.18)',
  },
  'moon-color': {
    base: '#8d6cb8',
    dark: '#6c4d96',
    light: '#e4d6f7',
    edgeShadow: 'rgba(92, 64, 130, 0.18)',
  },
  'coloring-treat': {
    base: '#df4b72',
    dark: '#b63357',
    light: '#ffd0de',
    edgeShadow: 'rgba(162, 42, 74, 0.18)',
  },
  'come-join-us': {
    base: '#e05a5a',
    dark: '#b83f3f',
    light: '#ffd4d4',
    edgeShadow: 'rgba(164, 52, 52, 0.18)',
  },
};

const DEFAULT_HERO_TRIM_PALETTE: HeroTrimPalette = HERO_TRIM_PALETTES['christmas-book-showcase'];

/**
 * Returns cheerful, template-matched storybook trim colors curated for each hero slide.
 */
export function getHeroTrimPalette(slideId?: string): HeroTrimPalette {
  if (!slideId) return DEFAULT_HERO_TRIM_PALETTE;
  return HERO_TRIM_PALETTES[slideId] ?? DEFAULT_HERO_TRIM_PALETTE;
}

export type HeroSlideTransitionState = 'active' | 'exiting' | 'inactive';

/**
 * Computes the visual transition state for each slide in the hero carousel
 * so the outgoing slide smoothly crossfades while the incoming slide settles in.
 */
export function getHeroSlideTransitionState(
  slideIndex: number,
  activeIndex: number,
  previousIndex: number | null
): HeroSlideTransitionState {
  if (slideIndex === activeIndex) {
    return 'active';
  }
  if (previousIndex !== null && slideIndex === previousIndex && previousIndex !== activeIndex) {
    return 'exiting';
  }
  return 'inactive';
}

export interface NavSectionOffset {
  id: string;
  top: number;
}

/**
 * Determines the active navigation section ID given the current scroll offset and
 * ordered section top positions, returning null while above the first section.
 */
export function getActiveNavSection(
  scrollY: number,
  sections: NavSectionOffset[],
  activationOffset = 180
): string | null {
  if (!sections.length) return null;
  const probeY = scrollY + activationOffset;
  let activeId: string | null = null;
  for (const section of sections) {
    if (section.top <= probeY) {
      activeId = section.id;
    }
  }
  return activeId;
}

export interface PrintFriendlyStudioConfig {
  enabled: boolean;
  canvasBackground: string;
  canvasBorderColor: string;
  svgBackgroundFill: string;
  svgPartFill: string | null;
  svgOutlineFill: string;
  pngFilename: string;
  toggleLabel: string;
  helperText: string;
}

/**
 * Computes pure high-contrast black-and-white ink-saver configuration for digital
 * SVG coloring pages in the Coloring Studio without mutating saved user color fills.
 */
export function getPrintFriendlyStudioConfig(enabled: boolean): PrintFriendlyStudioConfig {
  if (enabled) {
    return {
      enabled: true,
      canvasBackground: '#FFFFFF',
      canvasBorderColor: '#000000',
      svgBackgroundFill: '#FFFFFF',
      svgPartFill: '#FFFFFF',
      svgOutlineFill: '#000000',
      pngFilename: 'miso-and-the-moon-print-friendly.png',
      toggleLabel: 'Print-Friendly Mode',
      helperText: 'High-contrast B&W · No background ink',
    };
  }
  return {
    enabled: false,
    canvasBackground: '#FFFDF7',
    canvasBorderColor: '#E5E0E8',
    svgBackgroundFill: '#FFFFFF',
    svgPartFill: null,
    svgOutlineFill: '#171417',
    pngFilename: 'miso-and-the-moon.png',
    toggleLabel: 'Print-Friendly Mode',
    helperText: 'Remove background & fills for crisp B&W printing',
  };
}



