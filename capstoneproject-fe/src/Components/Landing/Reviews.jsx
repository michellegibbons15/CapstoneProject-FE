import React from 'react'
import "../../Styles/Landing/Reviews.css"

const Reviews = ({text, author}) => {
  return (
    <div className="review-card">
      <div className="review-title">{text}</div>
      <div className="review-author">{author}</div>
    </div>
  );
}
  
  export default Reviews;