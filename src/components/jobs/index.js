import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from '../modal';
import './index.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const loader = useRef(null);

  
  const fetchJobs = async (page) => {
    setLoading(true); 
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      setJobs((prev) => [...prev, ...response.data.results]);
      setLoading(false);  
    } catch (err) {
      setError('Failed to load jobs');
      setLoading(false);  
    }
  };

  
  const handleBookmark = (job) => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    const isAlreadyBookmarked = storedBookmarks.some(bookmarkedJob => bookmarkedJob.id === job.id);

    if (!isAlreadyBookmarked) {
      const updatedBookmarks = [...storedBookmarks, job];
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      alert('Job bookmarked!');
    } else {
      alert('Job is already bookmarked.');
    }
  };

  
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {  
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);  

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null); 
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {jobs.map((job, index) => (
        <div key={index} className='job-card'>
          <h3>{job.title}</h3>
          <p>Place: {job.primary_details?.Place}</p>
          <p>Salary: {job.primary_details?.Salary}</p>
          <p>Job Type: {job.primary_details?.Job_Type}</p>
          <p>Experience: {job.primary_details?.Experience}</p>
          <button className='bookmark-btn' onClick={() => handleBookmark(job)}>Bookmark</button>
          <button className='bookmark-btn' onClick={() => handleJobClick(job)}>View Details</button>
        </div>
      ))}
      <div ref={loader} style={{ height: '100px' }}>
        {loading && <div>Loading more jobs...</div>}  
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
    </div>
  );
}

export default Jobs;
