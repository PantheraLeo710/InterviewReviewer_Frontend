import { useEffect, useState } from "react";
import { API } from '../config';
import api from "../services/apiClient";


function History() {
  const [submissions, setSubmissions] = useState([]);
  console.log("submissions",submissions)
  const token = localStorage.getItem("token");
  console.log("token",token)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get(API.MYSUBMISSIONS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmissions(res.data.submission);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, []);
    
  console.log(submissions,'submissions');

  return (
    <div className="container mt-4">
  <h2 className="mb-4">Your Submission History</h2>

  {submissions.length === 0 ? (
    <p>No previous submissions.</p>
  ) : (
    submissions.map((submission, index) => (
      <div className="card mb-3" key={index}>
        <div className="card-body">
          <h5 className="card-title">Submission #{index + 1}</h5>
          <p className="card-text">
            Score: {submission.score} / {submission.totalQuestions}
          </p>          
          <p className="card-text">
            Submitted on: {new Date(submission.submittedAt).toLocaleString()}
          </p>
          {/* We’ll add expand/collapse answer details later */}
        </div>
      </div>
    ))
  )}
</div>

  );
}

export default History;
