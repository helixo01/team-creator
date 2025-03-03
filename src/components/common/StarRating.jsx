import React, { useState } from 'react';

function StarRating({ rating, onRatingChange, maxStars = 5 }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating) => {
    onRatingChange(selectedRating === rating ? 0 : selectedRating);
  };

  return (
    <div 
      className="star-rating"
      onMouseLeave={() => setHoverRating(0)}
    >
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default StarRating; 