import { useEffect, useState } from "react";
import { API } from "../config";
import api from "../services/apiClient";
import { Modal, Button, Pagination } from "react-bootstrap";

function History() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(4); // How many submissions per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get(API.MYSUBMISSIONS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(res.data.submission || []);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, [token]);

  /** Pagination Logic */
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );
  const totalPages = Math.ceil(submissions.length / submissionsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  /** Modal Logic */
  const handleOpenModal = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseModal = () => {
    setSelectedSubmission(null);
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "#e0e0e0",
        boxShadow: "inset 10px 10px 30px #bebebe, inset -10px -10px 30px #ffffff",
        borderRadius: "20px",
      }}
    >
      <div className="text-center mb-5">
        <h2
          className="fw-bold"
          style={{
            color: "#333",
            textShadow: "1px 1px 2px #fff",
          }}
        >
          Your Submission History
        </h2>
        <p className="text-muted">
          Review your past attempts and analyze your answers.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center">
          <div
            className="p-5 rounded"
            style={{
              maxWidth: "420px",
              margin: "0 auto",
              background: "#e0e0e0",
              boxShadow: "9px 9px 16px #bebebe, -9px -9px 16px #ffffff",
            }}
          >
            <h5 className="text-secondary">No previous submissions</h5>
            <p className="small text-muted mb-0">
              Take a quiz to see your submission history here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Submissions Grid */}
          <div className="row g-4 px-3">
            {currentSubmissions.map((submission, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div
                  className="p-4 rounded h-100"
                  style={{
                    background: "#e0e0e0",
                    boxShadow: "9px 9px 16px #bebebe, -9px -9px 16px #ffffff",
                    transition: "0.3s ease",
                    borderRadius: "20px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0" style={{ color: "#333" }}>
                      Attempt #{indexOfFirstSubmission + index + 1}
                    </h5>
                    <span
                      className={`badge ${
                        submission.score >= submission.totalQuestions / 2
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.5rem 0.8rem",
                        boxShadow:
                          "2px 2px 4px #bebebe, -2px -2px 4px #ffffff",
                      }}
                    >
                      {submission.score} / {submission.totalQuestions}
                    </span>
                  </div>

                  <p className="small text-muted mb-3">
                    Submitted on:{" "}
                    {new Date(submission.submittedAt).toLocaleString()}
                  </p>

                  <button
                    className="btn w-100"
                    style={{
                      background: "#e0e0e0",
                      color: "#333",
                      boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                      border: "none",
                      borderRadius: "12px",
                      fontWeight: "500",
                    }}
                    onClick={() => handleOpenModal(submission)}
                  >
                    View Detailed Answers
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Modal for Detailed Answers */}
      <Modal show={!!selectedSubmission} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detailed Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission ? (
            <>
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Score:</strong> {selectedSubmission.score} /{" "}
                  {selectedSubmission.totalQuestions}
                </p>
                <p className="mb-0">
                  <strong>Submitted At:</strong>{" "}
                  {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </p>
              </div>
              <hr />
              <h6 className="mb-3">Answers:</h6>
              {selectedSubmission.answers &&
              selectedSubmission.answers.length > 0 ? (
                <ul className="list-group">
                  {selectedSubmission.answers.map((ans, i) => (
                    <li
                      key={i}
                      className="list-group-item mb-2"
                      style={{
                        background: "#e0e0e0",
                        boxShadow:
                          "inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff",
                        borderRadius: "12px",
                      }}
                    >
                      <strong>Q{i + 1}:</strong> {ans.question?.questionText || "No question text available"}
                      <br />
                      <span>
                        <strong>Your Answer:</strong> {ans.selectedOption || "No answer selected"}
                      </span>
                      <br />
                      <br />
                      <span
                        className={`badge mt-2 ${
                          ans.isCorrect ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {ans.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No answer details available.</p>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default History;
