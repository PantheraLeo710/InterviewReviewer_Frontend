import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'react-bootstrap';
import './staffDashboard.css'
import { ChevronLeft, ChevronRight, MessageSquareMore, NotebookPen, NotepadText, SquarePlus, User } from 'lucide-react';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const [submissions, setSubmissions] = useState([]);
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState()
  console.log("submissions", submissions);
  console.log("pages", pages);


  const [feedbacks, setFeedbacks] = useState([]);
  const [questionForm, setQuestionForm] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {

    if (!token || token === 'undefined') {
      toast.warning('Unauthorized. Please login again.');
      navigate('/login');
      return;
    }

    let decoded;
    try {
      decoded = jwt_decode(token);
    } catch (err) {
      console.error('Invalid token', err);
      navigate('/login');
      return;
    }

    if (!decoded.isStaff) {
      toast.error('Unauthorized. Access denied. Get promoted to staff to access.');
      navigate('/questions');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [subsRes, fbRes] = await Promise.all([

          axios.get(API.SUBMISSIONS, {
            params: {
              pages: currentpage,
              limit: 10,
            },
          }),

          axios.get(API.FEEDBACK, { headers })
        ]);

        console.log("subsRes", subsRes);

        setSubmissions(subsRes.data.subdata);
        setpages(subsRes.data.pages)

        setFeedbacks(fbRes.data.feedbacks);

      } catch (e) {
        console.error('Error loading staff data:', e);
      }
    };

    fetchAll();
  }, [currentpage])




  const handleprev = () => {
    if (currentpage > 1) {
      setcurrentpage((prev) => prev - 1)
    }
  }

  const handlenext = () => {
    if (currentpage < pages) {
      setcurrentpage((prev) => prev + 1)
    }
  }

  const handleQuestionChange = (i, value) => {
    const opts = [...questionForm.options];
    opts[i] = value;
    setQuestionForm({ ...questionForm, options: opts });
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(API.QUESTIONS, questionForm, { headers });
      toast.success('Question added successfully!');
      setQuestionForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
    } catch (e) {
      console.error(e);
      toast.error('Failed to add question');
    }
  };



  return (
    <div className="container-fluid mt-1 custom-div-bg">
      <h2 className="text-center fw mb-3"><NotebookPen /> Staff Dashboard</h2>

      {/* Tab Navigation */}
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "submissions" ? "active" : ""}`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-1" >
        {activeTab === "questions" && (
          <Container>
            <Row className="justify-content-center" >
              <Col md={8}>
                <div className="card border-0 p-5 rounded shadow-lg ">
                  <div className="card-header bg-primary text-white fw-semibold">
                    <SquarePlus /> Add New Question
                  </div>
                  <div className="card-body">
                    <form onSubmit={submitQuestion}>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Question Text</label>
                        <textarea
                          className="form-control"
                          rows="5"
                          value={questionForm.questionText}
                          onChange={e => setQuestionForm({ ...questionForm, questionText: e.target.value })}
                          required
                        />
                      </div>

                      {questionForm.options.map((opt, i) => (
                        <div className="mb-3" key={i}>
                          <label className="form-label fw-medium">Option {i + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={opt}
                            onChange={e => handleQuestionChange(i, e.target.value)}
                            required
                          />
                        </div>
                      ))}

                      <div className="mb-3">
                        <label className="form-label fw-medium">Correct Answer</label>
                        <input
                          type="text"
                          className="form-control"
                          value={questionForm.correctAnswer}
                          onChange={e => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                          required
                        />
                      </div>

                      <button className="btn btn-success w-100 py-2 fw-semibold">
                        Add Question
                      </button>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}

        {activeTab === "submissions" && (
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <div className="card shadow-sm border-0 p-5 rounded shadow-lg">
                  <div className="card-header bg-info text-white fw-semibold">
                    <NotepadText /> All Submissions
                  </div>
                  <div className="card-body">
                    {submissions.length === 0 ? (
                      <p className="text-muted text-center">No submissions yet.</p>
                    ) : (
                      <div className="list-group">
                        {submissions
                          // .filter((s) => s.status === "pass") 
                          .map((s, idx) => {
  const userName = s.userId?.name ?? "Unknown Applicant";
                        const userEmail = s.userId?.email ?? "-";
                        const score = s.score ?? 0;
                        const totalQuestions = s.totalQuestions ?? 0;
                        const status = s.status ?? "N/A";

                        return (
                        <div
                          key={idx}
                          className="list-group-item list-group-item-action border-0 shadow-sm rounded mb-2"
                        >
                          <div className="fw-medium">
                            <span className="me-2 text-secondary">{idx + 1}.</span>
                            <User /> {userName} <span className="text-muted">({userEmail})</span>
                          </div>
                          <div className="small text-muted">
                            Status: <span className="fw-semibold text-primary">{status}</span> |
                            Score: <span className="fw-semibold">{score}/{totalQuestions}</span>
                          </div>
                        </div>
                        );
})}
                      </div>
                    )}
                  </div>
                  <div className='submission_btn'>
                    <div>
                      <button onClick={handleprev}>  <ChevronLeft />Prev</button>
                    </div>
                    <div>
                      <button onClick={handlenext}> <ChevronRight /> next</button>
                    </div>
                  </div>
                </div>

              </Col>

            </Row>
          </Container>
        )}


        {activeTab === "feedback" && (
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <div className="card shadow-sm border-0 p-5 rounded shadow-lg">
                  <div className="card-header bg-warning text-dark fw-semibold">
                    <MessageSquareMore /> Feedback
                  </div>
                  <div className="card-body">
                    {feedbacks.length === 0 ? (
                      <p className="text-muted text-center">No feedback yet.</p>
                    ) : (
                      <div className="list-group">
                        {feedbacks.map((f, i) => (
                          <div key={i} className="list-group-item list-group-item-action border-0 shadow-sm rounded mb-2">
                            <div className="fw-medium">
                              {f.applicantId?.name ?? 'Unknown'}:
                              <span className="text-muted"> {f.feedbackText}</span>
                            </div>
                            <div className="small">
                              Status: <span className="fw-semibold text-success">{f.result}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
