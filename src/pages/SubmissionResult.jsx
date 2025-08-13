// SubmissionResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmissionResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="text-center mt-5">
        <h3>No result data. Please submit your answers first.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const { score, totalQuestions } = state;
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  const passed = percentage >= 60;

  return (
    <div className="container text-center mt-5">
      <h2 className={passed ? "text-success" : "text-danger"}>
        {passed ? "🎉 You Passed!" : "❌ You Did Not Pass"}
      </h2>
      <p>Score: {score} / {totalQuestions}</p>
      <p>Percentage: {percentage}%</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default SubmissionResult;
