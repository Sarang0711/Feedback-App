import React from 'react';
import Card from '../components/shared/Card'; 
import {Link} from 'react-router-dom';

function AboutPage() {
  return (
    <div>
      <Card>
        <p>This is a React Application which is collecting the feedbacks of customers</p>
        <Link to='/'>Back to home page</Link>
      </Card>
    </div>
  )
}

export default AboutPage;