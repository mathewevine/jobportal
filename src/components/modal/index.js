import React from 'react';
import './index.css'; // Import modal styles here

const Modal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h1>{job.title}</h1>
        <p>Place: {job.primary_details?.Place}</p>
        <p>Salary: {job.primary_details?.Salary}</p>
        <p>Job Type: {job.primary_details?.Job_Type}</p>
        <p>Experience: {job.primary_details?.Experience}</p>
        <p>Qualification: {job.primary_details?.Qualification}</p>
        <p>Company: {job.company_name}</p>
        <p>Contact: <a href={job.custom_link}>{job.custom_link}</a></p>
      </div>
    </div>
  );
};

export default Modal;
