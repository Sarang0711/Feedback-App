import {createContext, useState, useEffect} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(()=> {
    fetchFeedback()
  }, []);

  // Fetch Feedback
  const fetchFeedback = async () => {
    const response  = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    // console.log(data);
    setFeedback(data);
    setIsLoading(false);
  }

  // Add Feedback
  const addFeedback = async (newFeedback) =>  {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(newFeedback)
    })
  
    const data = await response.json();
    setFeedback([data, ...feedback]);

  }
// Set item to be updated 
  function editFeedback(item) {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  
  const updateFeedback = async (id, updItem) => {

    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json();

    setFeedback(feedback.map((item)=>{
      return (item.id === id ? {...item, ...data} : item)
    }))
  }

  const deleteFeedback = async (id) =>  {
    if(window.confirm("Are you sure you want to delete?")){

      await fetch(`/feedback/${id}`, {method: 'DELETE'})

      setFeedback(()=> {
        return feedback.filter((prevItem) => {
          // console.log(prevItem.id !== id); 
          return prevItem.id !== id;
        })
      })
    }
  }

  return <FeedbackContext.Provider
    value={{
      isLoading,
      feedback,
      addFeedback,
      editFeedback,           // editFeedback is a function that is called
      feedbackEdit,           // feedbackEdit is an object that is going to be stored when edit btn is clicked
      updateFeedback,
      deleteFeedback,
    }}
    >
    {children}
  </FeedbackContext.Provider>

}
export default FeedbackContext;

