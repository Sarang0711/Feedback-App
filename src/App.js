import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import { FeedbackProvider } from './components/contexts/FeedbackContext';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>                            // exact is added so that only specified path should be matched
                                              // It is equivalent to whole word search of using find
            <Route exact path='/' element= {
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }>                         
            
              
            </Route>
              <Route path='/about' element={< AboutPage />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App;