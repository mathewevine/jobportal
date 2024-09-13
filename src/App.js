import { useState } from 'react';
import Jobs from './components/jobs';
import BookMarks from './components/bookMarks';
import './App.css';

function App() {
  const [section, setSection] = useState('jobs');
  
  return (
    <div className="App">
      <button type='button' onClick={()=> setSection('jobs')} className='nav-btn'>Jobs</button>
      <button type='button' onClick={()=> setSection('bookmarks')} className='nav-btn'>Bookmarked Jobs</button>
      <hr />
      <div className='main-cotainer'>
        <div className='description-container'>
            <h1>Find Your <br/>Dream Job Here</h1>
            {section === 'jobs' ? <img src='10.png' alt="job" /> : <img src='11.png' alt="job" />}
        </div>
        <div className='jobs-container'>
        {section === 'jobs' ? (<Jobs />) : (<BookMarks />)}
        </div>
      </div>


    </div>
  );
}

export default App;
