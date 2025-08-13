import { useEffect, useState } from "react";
import axios from "axios";
import { API } from '../config';


function History() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API.ANSWERS.MY_SUBMISSIONS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, []);

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
