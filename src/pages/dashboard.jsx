import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import './dashboardpg.css'; 

function Dashboard({ isStaff = false }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 text-center flex-grow-1">
        <h1 className="mb-3">Interview Reviewer Dashboard🎯</h1>
        <p className="lead">
          Your personal space for tracking interview performance, reviewing feedback, and improving with every attempt.
        </p>

        <div className="mt-4">
          <h4 className="mb-3">🚀 Ready to begin?</h4>
          <p className="lead">Choose where you'd like to go:</p>

          <div className="d-flex justify-content-center gap-3 flex-wrap link_wrrapper">
            <Link to="/questions" className="btn btn-primary btn-lg">
              📝 Start Questions
            </Link>

            <Link to="/history" className="btn btn-outline-secondary btn-lg">
              📊 View History
            </Link>
          </div>

          {isStaff && (
            <div className="mt-4">
              <h5 className="mb-2">🛠 Staff Tools</h5>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/feedback" className="btn btn-outline-info btn-lg">
                  💬 Staff Feedback
                </Link>

                <Link to="/submission-result" className="btn btn-outline-dark btn-lg">
                  🧠 Review Last Result
                </Link>
              </div>
            </div>
          )}
        </div>

        
        <Card className="mt-5 shadow-sm">
          <Card.Body>
            <Card.Title>✨ Features at a Glance</Card.Title>
            <ul className="list-unstyled mt-3">
              <li>✅ Real-time scoring and feedback</li>
              <li>📚 History tracking for every attempt</li>
              <li>🧠 Personalized insights to improve performance</li>
              <li>🔒 Secure and role-based access for staff</li>
            </ul>
          </Card.Body>
        </Card>
      </div>

      
      <footer className="footer mt-auto py-3 bg-dark text-white text-center">
        <div className="container">
          <p>Scored in real-time. Feedback curated by staff.</p>
          <small>nahyanfoxiom ©</small>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
