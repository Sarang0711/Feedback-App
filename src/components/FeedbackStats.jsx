import React from 'react';
import {useContext, useState} from 'react';
import FeedbackContext from './contexts/FeedbackContext';

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  let averageRating = feedback.reduce((acc, curr)=> {
      return acc + curr.rating;
  }, 0) / feedback.length;
  averageRating = averageRating.toFixed(1).replace(/[.,]0$/, '');
  // fixed once decimal place of average
  // Replace is taking regular expression as parameter if the 0 is followed by decimal then it will not show 0
  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} reviews</h4>
        <h4>Average Rating: {isNaN(averageRating) ? 0 : averageRating}</h4>
        {/* If average is nan i.e. there are no feedbacks then it will show 0 otherwise average */}
    </div>
  )
}


export default FeedbackStats