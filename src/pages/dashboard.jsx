import React, { useEffect, useState } from "react";
import { Card, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChartBar, FaCheckCircle, FaTrophy } from "react-icons/fa";
import { NotebookPen } from "lucide-react";
import api from "../services/apiClient";
import API from "../config";

const Dashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [details, setdetails] = useState([]);

    console.log("submissions",submissions);
    const token = localStorage.getItem("token");
    console.log("token",token);
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const res = await api.get(API.MYSUBMISSIONS,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },                                
            }
          );
          setSubmissions(res.data.submission);
          setdetails(res.data);
                    
        } catch (error) {
          console.error("failed to fetch submissions", error);
        }
      }
      fetchSubmissions();
      },[])
      
      console.log('details:', details);
      
  const attempts = details.count || 0;
  const accuracy = details.accuracy || 0;
  const lastScore = details.submission?.[details.submission.length - 1]?.score ?? "No submissions yet";

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "70vh" }}>
      <div className="container py-4">

        {/* Main Header Card */}
        <Card className="shadow-sm mb-2">
          <Card.Body>
            <h2 className="fw-bold text-center">
              Interview Reviewer Dashboard <NotebookPen />
            </h2>
            <p className="text-center text-muted">
              Track your interview performance, view feedback, and improve with every attempt.
            </p>
            <div className="d-flex justify-content-center gap-5">
              <Button
                as={Link}
                to="/questions"
                style={{
                  backgroundColor: "#2f3640",
                  borderColor: "#2f3640"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#353b48"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2f3640"}
              >
                Start Questions
              </Button>
              <Button
                as={Link}
                to="/history"
                variant="outline-dark"
              >
                View History
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Quote Card */}
        <Card className="shadow-sm mb-2">
          <Card.Body className="text-center text-primary">
             <em>Success is the sum of small efforts, repeated day in and day out.</em>
          </Card.Body>
        </Card>

        {/* Stats Row */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <h6><FaChartBar />Total Attempts</h6>
                <h3>{attempts}</h3>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <h6><FaCheckCircle />Accuracy Rate</h6>
                <h3 className={accuracy >= 60 ? "text-success" : "text-danger"}>{accuracy}%</h3>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <h6><FaTrophy />Last Session Score</h6>
                <h3 className="text-info">{lastScore}</h3>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Accordion Section */}
        <Accordion defaultActiveKey="0" className="mb-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>About This Project</Accordion.Header>
            <Accordion.Body>
              The Interview Reviewer is a platform designed to help candidates practice and refine
              their interview skills. It provides curated questions, instant scoring, and detailed feedback
              so you can track progress over time and identify areas for improvement.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How to Use</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Start by clicking "Start Questions".</li>
                <li>Answer the interview questions to the best of your ability.</li>
                <li>View your score and feedback instantly after submission.</li>
                <li>Check "View History" for past attempts and progress tracking.</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Scoring System</Accordion.Header>
            <Accordion.Body>
              Each question is evaluated based on accuracy and completeness. Your overall score is a
              weighted average of all attempts, with detailed metrics such as accuracy rate and improvement trend.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#2f3640", color: "#fff", padding: "15px 0" }}>
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Interview Reviewer. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
