import React, { useId } from 'react';
import { HeroTrimPalette } from '../utils/moonMeshLogic';

interface HeroScallopTrimProps {
  position: 'top' | 'bottom';
  palette: HeroTrimPalette;
}

/**
 * Crisp, expressive scalloped storybook ribbon trim (20px tall) that frames the
 * top and bottom edges of the full-viewport hero stage with unmistakable scalloped
 * curves, subtle satin lighting, and a refined inner rim highlight while staying
 * completely clear of all hero drawings.
 *
 * Tiles seamlessly every 528px (12 balanced 44px scallops).
 */
const SCALLOP_FILL_TILE_PATH =
  'M 0 0 L 0 7.5 ' +
  'C 6 20, 38 20, 44 7.5 ' +
  'C 50 20, 82 20, 88 7.5 ' +
  'C 94 20, 126 20, 132 7.5 ' +
  'C 138 20, 170 20, 176 7.5 ' +
  'C 182 20, 214 20, 220 7.5 ' +
  'C 226 20, 258 20, 264 7.5 ' +
  'C 270 20, 302 20, 308 7.5 ' +
  'C 314 20, 346 20, 352 7.5 ' +
  'C 358 20, 390 20, 396 7.5 ' +
  'C 402 20, 434 20, 440 7.5 ' +
  'C 446 20, 478 20, 484 7.5 ' +
  'C 490 20, 522 20, 528 7.5 ' +
  'L 528 0 Z';

const SCALLOP_RIM_TILE_PATH =
  'M 0 5.4 ' +
  'C 6 17.4, 38 17.4, 44 5.4 ' +
  'C 50 17.4, 82 17.4, 88 5.4 ' +
  'C 94 17.4, 126 17.4, 132 5.4 ' +
  'C 138 17.4, 170 17.4, 176 5.4 ' +
  'C 182 17.4, 214 17.4, 220 5.4 ' +
  'C 226 17.4, 258 17.4, 264 5.4 ' +
  'C 270 17.4, 302 17.4, 308 5.4 ' +
  'C 314 17.4, 346 17.4, 352 5.4 ' +
  'C 358 17.4, 390 17.4, 396 5.4 ' +
  'C 402 17.4, 434 17.4, 440 5.4 ' +
  'C 446 17.4, 478 17.4, 484 5.4 ' +
  'C 490 17.4, 522 17.4, 528 5.4';

const SCALLOP_OUTLINE_TILE_PATH =
  'M 0 7.5 ' +
  'C 6 19.6, 38 19.6, 44 7.5 ' +
  'C 50 19.6, 82 19.6, 88 7.5 ' +
  'C 94 19.6, 126 19.6, 132 7.5 ' +
  'C 138 19.6, 170 19.6, 176 7.5 ' +
  'C 182 19.6, 214 19.6, 220 7.5 ' +
  'C 226 19.6, 258 19.6, 264 7.5 ' +
  'C 270 19.6, 302 19.6, 308 7.5 ' +
  'C 314 19.6, 346 19.6, 352 7.5 ' +
  'C 358 19.6, 390 19.6, 396 7.5 ' +
  'C 402 19.6, 434 19.6, 440 7.5 ' +
  'C 446 19.6, 478 19.6, 484 7.5 ' +
  'C 490 19.6, 522 19.6, 528 7.5';

export const HeroScallopTrim: React.FC<HeroScallopTrimProps> = ({ position, palette }) => {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const scallopPatternId = `hero-scallop-tile-${position}-${safeId}`;
  const scallopMaskId = `hero-scallop-mask-${position}-${safeId}`;
  const rimPatternId = `hero-rim-tile-${position}-${safeId}`;
  const outlinePatternId = `hero-outline-tile-${position}-${safeId}`;
  const shadeGradId = `hero-satin-shade-${position}-${safeId}`;

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
        height="20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={scallopPatternId}
            width="528"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path d={SCALLOP_FILL_TILE_PATH} fill="#ffffff" />
          </pattern>

          <mask id={scallopMaskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="20" fill={`url(#${scallopPatternId})`} />
          </mask>

          {/* Luminous inset highlight tracing each scallop arch for crisp visibility */}
          <pattern
            id={rimPatternId}
            width="528"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={SCALLOP_RIM_TILE_PATH}
              fill="none"
              stroke="var(--hero-trim-light)"
              strokeWidth="1.25"
              strokeOpacity="0.62"
              strokeLinecap="round"
            />
          </pattern>

          {/* Subtle deeper contour lip along the bottom curve of each scallop */}
          <pattern
            id={outlinePatternId}
            width="528"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={SCALLOP_OUTLINE_TILE_PATH}
              fill="none"
              stroke="var(--hero-trim-dark)"
              strokeWidth="1.15"
              strokeOpacity="0.48"
              strokeLinecap="round"
            />
          </pattern>

          {/* Soft ribbon sheen from outer edge into curved lip */}
          <linearGradient id={shadeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--hero-trim-dark)" stopOpacity="0.24" />
          </linearGradient>
        </defs>

        <g mask={`url(#${scallopMaskId})`}>
          <rect
            className="hero-scallop-base-rect"
            x="0"
            y="0"
            width="100%"
            height="20"
            fill="var(--hero-trim-base)"
          />
          <rect x="0" y="0" width="100%" height="20" fill={`url(#${shadeGradId})`} />
          <rect x="0" y="0" width="100%" height="20" fill={`url(#${rimPatternId})`} />
          <rect x="0" y="0" width="100%" height="20" fill={`url(#${outlinePatternId})`} />
        </g>
      </svg>
    </div>
  );
};
