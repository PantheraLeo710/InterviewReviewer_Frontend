// src/pages/FeedbackManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config';
import { toast } from 'react-toastify';

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API.FEEDBACK, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        toast.warning('Failed to load feedback');
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul className="list-group">
          {feedbacks.map((fb, i) => (
            <li key={i} className="list-group-item">
              <strong>{fb.interviewerName || 'Anonymous'}:</strong> {fb.feedbackText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackManager;
