import React from 'react';
import Reviews from './Reviews';


const reviews = [
    {
      text: '"PlayRVA has been such a helpful tool in finding an after school activity for my kids!"',
      author: "Susie, Henrico VA",
    },
    {
      text: '"After graduating, I struggled to find a competetive environment again after my collegiate - playRVA has made it possible and made me fall in love with my sport again!"',
      author: "Annie, Midlothina VA",
    },
    {
      text: '"Been such a nice way to find pick ups and social leagues to join."',
      author: "Tory, Richmond VA",
    },
      
  ];

const ReviewList = () => {
  return (
    <div className="review">
        <h3>What are people saying:</h3>
    <div id="review-list">
      {reviews.map((review, index) => (
        <Reviews key={index} text={review.text} author={review.author} />
      ))}
    </div>
    </div>
  );
};

export default ReviewList;