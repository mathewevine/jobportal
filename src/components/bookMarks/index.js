import React, { useEffect, useState } from 'react';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter(job => job.id !== jobId);

    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));

    setBookmarkedJobs(updatedBookmarks);

    alert('Bookmark removed!');
  };

  if (bookmarkedJobs.length === 0) {
    return <div>No Jobs bookmarked.</div>;
  }

  return (
    <div>
      {bookmarkedJobs.map((job, index) => (
        <div key={index} className='job-card'>
          <h3>{job.title}</h3>
          <p>Place: {job.primary_details?.Place}</p>
          <p>Salary: {job.primary_details?.Salary}</p>
          <p>Job Type: {job.primary_details?.Job_Type}</p>
          <p>Experience: {job.primary_details?.Experience}</p>
          <button className="bookmark-btn" onClick={() => handleRemoveBookmark(job.id)}>
            Remove Bookmark
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks;
