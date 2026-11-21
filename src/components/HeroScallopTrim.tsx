import React, { useId } from 'react';
import { HeroTrimPalette } from '../utils/moonMeshLogic';

interface HeroScallopTrimProps {
  position: 'top' | 'bottom';
  palette: HeroTrimPalette;
}

/**
 * Full-width woven-linen fabric trim with organically hand-drawn downward scallops.
 * Tiles seamlessly at 480px intervals (10 subtly varied scallops per repeat) so scallops
 * never stretch or distort across mobile, desktop, or ultrawide viewports.
 */
const ORGANIC_SCALLOP_TILE_PATH =
  'M 0 0 L 0 21 ' +
  'C 9 31.2, 36 31.8, 46 21.4 ' +
  'C 56 32.6, 86 31.5, 97 20.6 ' +
  'C 106 30.8, 132 31.4, 142 21.7 ' +
  'C 152 32.4, 180 32.8, 191 20.8 ' +
  'C 201 31.0, 228 30.6, 238 21.5 ' +
  'C 249 32.9, 279 32.1, 290 20.5 ' +
  'C 299 30.8, 324 31.6, 334 21.6 ' +
  'C 344 32.3, 373 31.7, 384 20.9 ' +
  'C 394 31.4, 420 32.5, 430 21.3 ' +
  'C 440 31.9, 470 31.2, 480 21 ' +
  'L 480 0 Z';

export const HeroScallopTrim: React.FC<HeroScallopTrimProps> = ({ position, palette }) => {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const scallopPatternId = `hero-scallop-tile-${position}-${safeId}`;
  const scallopMaskId = `hero-scallop-mask-${position}-${safeId}`;
  const weavePatternId = `hero-weave-tile-${position}-${safeId}`;
  const shadeGradId = `hero-weave-shade-${position}-${safeId}`;
  const linenNoiseId = `hero-linen-noise-${position}-${safeId}`;

  return (
    <div
      className={`hero-scallop-trim hero-scallop-trim--${position}`}
      data-testid={`hero-scallop-trim-${position}`}
      style={
        {
          ['--hero-trim-base' as string]: palette.base,
          ['--hero-trim-dark' as string]: palette.dark,
          ['--hero-trim-light' as string]: palette.light,
          ['--hero-trim-shadow' as string]: palette.edgeShadow,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <svg
        className="hero-scallop-svg"
        width="100%"
        height="34"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Seamless 480px tile with 10 organically hand-drawn scallops */}
          <pattern
            id={scallopPatternId}
            width="480"
            height="34"
            patternUnits="userSpaceOnUse"
          >
            <path d={ORGANIC_SCALLOP_TILE_PATH} fill="#ffffff" />
          </pattern>

          <mask id={scallopMaskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="34" fill={`url(#${scallopPatternId})`} />
          </mask>

          {/* Fine, soft woven-linen / chambray slub fabric pattern */}
          <pattern
            id={weavePatternId}
            width="144"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine continuous horizontal weft yarn lines */}
            <path
              d="M0 1 H144 M0 3 H144 M0 5 H144 M0 7 H144 M0 9 H144 M0 11 H144 M0 13 H144 M0 15 H144 M0 17 H144"
              stroke="var(--hero-trim-dark)"
              strokeWidth="0.85"
              strokeOpacity="0.28"
            />
            {/* Organic woven slub dark thread thickenings */}
            <path
              d="M0 2 H144 M0 8 H144 M0 14 H144"
              stroke="var(--hero-trim-dark)"
              strokeWidth="1.15"
              strokeOpacity="0.26"
              strokeDasharray="23 5 11 4 31 6 14 3"
            />
            <path
              d="M0 5 H144 M0 11 H144 M0 17 H144"
              stroke="var(--hero-trim-dark)"
              strokeWidth="1"
              strokeOpacity="0.22"
              strokeDasharray="15 7 26 4 9 6 19 5"
              strokeDashoffset="9"
            />
            {/* Soft pale linen highlight threads (chambray sheen) */}
            <path
              d="M0 1.6 H144 M0 6.6 H144 M0 12.6 H144"
              stroke="var(--hero-trim-light)"
              strokeWidth="0.9"
              strokeOpacity="0.3"
              strokeDasharray="17 9 8 11 24 7 13 6"
            />
            <path
              d="M0 4.2 H144 M0 9.8 H144 M0 15.8 H144"
              stroke="var(--hero-trim-light)"
              strokeWidth="0.75"
              strokeOpacity="0.24"
              strokeDasharray="11 8 19 10 7 9 21 8"
              strokeDashoffset="14"
            />
            {/* Fine cross-warp textile grain */}
            <path
              d="M4 0 V18 M12 0 V18 M21 0 V18 M29 0 V18 M38 0 V18 M47 0 V18 M55 0 V18 M64 0 V18 M73 0 V18 M81 0 V18 M90 0 V18 M99 0 V18 M107 0 V18 M116 0 V18 M125 0 V18 M133 0 V18 M141 0 V18"
              stroke="var(--hero-trim-dark)"
              strokeWidth="0.8"
              strokeOpacity="0.16"
              strokeDasharray="1.5 2.5 1 2"
            />
            <path
              d="M8 0 V18 M17 0 V18 M25 0 V18 M34 0 V18 M43 0 V18 M51 0 V18 M60 0 V18 M69 0 V18 M77 0 V18 M86 0 V18 M95 0 V18 M103 0 V18 M112 0 V18 M121 0 V18 M129 0 V18 M137 0 V18"
              stroke="var(--hero-trim-light)"
              strokeWidth="0.7"
              strokeOpacity="0.18"
              strokeDasharray="1 3 1.5 2.5"
              strokeDashoffset="1.5"
            />
          </pattern>

          {/* Subtle cloth lighting depth from top hem to scalloped bottom */}
          <linearGradient id={shadeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="52%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#2b1b19" stopOpacity="0.2" />
          </linearGradient>

          {/* Directional horizontal linen-slub organic fiber filter */}
          <filter id={linenNoiseId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.032 0.85"
              numOctaves="4"
              seed="19"
              result="grain"
            />
            <feColorMatrix type="saturate" values="0" in="grain" result="mono" />
            <feComponentTransfer in="mono">
              <feFuncR type="linear" slope="2.2" intercept="-0.55" />
              <feFuncG type="linear" slope="2.2" intercept="-0.55" />
              <feFuncB type="linear" slope="2.2" intercept="-0.55" />
              <feFuncA type="table" tableValues="0.34 0.34" />
            </feComponentTransfer>
          </filter>
        </defs>

        <g mask={`url(#${scallopMaskId})`}>
          <rect
            className="hero-scallop-base-rect"
            x="0"
            y="0"
            width="100%"
            height="34"
            fill="var(--hero-trim-base)"
          />
          <rect x="0" y="0" width="100%" height="34" fill={`url(#${weavePatternId})`} />
          <rect
            x="0"
            y="0"
            width="100%"
            height="34"
            filter={`url(#${linenNoiseId})`}
            style={{ mixBlendMode: 'soft-light' }}
          />
          <rect x="0" y="0" width="100%" height="34" fill={`url(#${shadeGradId})`} />
        </g>
      </svg>
    </div>
  );
};
