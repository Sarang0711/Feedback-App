import React from 'react'
import Card from './shared/Card';
import {FaTimes, FaEdit} from 'react-icons/fa';
import PropTypes from 'prop-types'
import {useContext} from 'react';
import FeedbackContext from './contexts/FeedbackContext';

function FeedbackItem({item}) {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
        <Card >
            <div className="num-display">{item.rating }</div>
            <button className="close" onClick = {() => deleteFeedback(item.id)}>
                <FaTimes color='purple'/>
            </button>
            <button className="edit" onClick={() => editFeedback(item)}>
                <FaEdit color='purple' />
            </button>
            <div className="text-display">{item.text}</div>
        </Card>
  )
}
{/* Here we have to pass the arrow function to onclick if we call the handleDelete function then it will executed automatically without waiting for an event to occur */}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
}
export default FeedbackItem;