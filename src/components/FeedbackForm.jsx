import React, {useState, useContext, useEffect} from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from './contexts/FeedbackContext';

function FeedbackForm() {
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);

    const {addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    useEffect(()=> {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]) 
    // * 2nd parameter is the dependency array.If present, effect will only activate if the values in the list change or it will change on loading the components

    function updateText(event) {
        let comment = event.target.value;
        if(comment === '') {
            setBtnDisabled(true);
            setMessage(null);
        }
        else if(comment !== '' && comment.trim().length < 10) {
            setBtnDisabled(true);
            setMessage("Comment should have atleast 10 characters")
        }
        else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(comment);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating
            }
            // console.log(newFeedback);
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            }
            else {
                addFeedback(newFeedback);
            }
            setText('');
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <RatingSelect select = {setRating} selected = {rating }/>
            <div className="input-group">
                <input type="text" placeholder='Write a review' value={text} onChange={updateText}/>
                <Button type='submit' isDisabled={btnDisabled} >Send</Button>
            </div>
            { message &&  <div className="message">{ message }</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm;