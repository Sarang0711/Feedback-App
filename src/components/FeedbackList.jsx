import { useContext } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import FeedbackContext from './contexts/FeedbackContext';
import FeedbackItem from './FeedbackItem';
import Spinner from './shared/Spinner';

function FeedbackList() {
    const {feedback, isLoading} = useContext(FeedbackContext);
	if(!isLoading && (!feedback || feedback.length === 0)) {
		return <p>No feedback Yet</p>
	}
    return isLoading ? <Spinner /> :
	 (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item)=> {
                    return (
                        <motion.div
                            key = {item.id}
                            initial={{ opacity: 0, scale:0.8}}
                            animate={{opacity: 1, scale: 1 }}
                            exit = {{opacity:0, scale: 0.9}}
                        >
                            <FeedbackItem 
                                key={item.id} 
                                item = {item}
                            />
                        </motion.div>
                        )
                    })
                }
            </AnimatePresence>
		</div>
    )
            }
export default FeedbackList;
