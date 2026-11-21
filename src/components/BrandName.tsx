import React from 'react';

interface BrandNameProps {
  className?: string;
}

export const BrandName: React.FC<BrandNameProps> = ({ className = '' }) => {
  return (
    <span className={`inline-brand-wordmark ${className}`.trim()} aria-label="Mama's Moon">
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
    </span>
  );
};
