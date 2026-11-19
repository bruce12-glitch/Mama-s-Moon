import React from 'react';

interface WishlistHeartButtonProps {
  itemId: string;
  itemTitle: string;
  isSaved: boolean;
  onToggle: (itemId: string) => void;
  className?: string;
}

export const WishlistHeartButton: React.FC<WishlistHeartButtonProps> = ({
  itemId,
  itemTitle,
  isSaved,
  onToggle,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`wishlist-heart-btn ${isSaved ? 'is-saved' : ''} ${className}`.trim()}
      aria-pressed={isSaved}
      aria-label={
        isSaved ? `Remove ${itemTitle} from wishlist` : `Save ${itemTitle} to wishlist`
      }
      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(itemId);
      }}
    >
      <svg viewBox="0 0 24 24" className="wishlist-heart-icon" aria-hidden="true">
        <path
          d="M12 20.2 4.6 13.1C1 9.6 3.5 3.6 8.3 4.1c1.6.2 3 1.1 3.7 2.4.7-1.3 2.1-2.2 3.7-2.4 4.8-.5 7.3 5.5 3.7 9L12 20.2Z"
          fill={isSaved ? '#E85B78' : 'none'}
          stroke={isSaved ? '#E85B78' : '#4A434E'}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
