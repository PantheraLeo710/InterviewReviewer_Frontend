import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './homepg.css';

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh", padding: "30px" }}>
      <div className="container mt-4">
        <h1 className="mb-4 text-center">
          <div>Welcome to Interview Reviewer 🎯</div>
        </h1>

        {token && (
          <h4 className="mb-3 text-center">
            Hello, <span className="text-dark fw-bold">aspiring learner</span>! Ready to grow?
          </h4>
        )}

        <p className="lead mb-4 text-center">
          Our platform helps you with interviews, get instant feedback, and track your growth over time.
        </p>

        {token ? (
          <>
            <p className="lead mb-4 text-center">
              Start your review by going to{" "}
              <Link to="/questions" className="btn btn-dark btn-lg shadow">
                Questions
              </Link>
            </p>

            {/* Main Card Wrapper */}
            <Card className="shadow-lg border-0 mb-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <Card.Body>
                <div className="row align-items-center">
                  {/* Left Card */}
                  <div className="col-md-4 mb-3">
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body>
                        <Card.Title className="fw-bold text-dark">📊 Track Your Progress</Card.Title>
                        <Card.Text className="text-muted">
                          Monitor your attempts, accuracy, and last scores. See how you’ve improved over time with our detailed performance analytics.
                        </Card.Text>
                        <Card.Title className="fw-bold text-dark mt-4">🎯 Personalized Learning</Card.Title>
                        <Card.Text className="text-muted">
                          Our AI-powered evaluation ensures you receive tailored feedback and targeted questions to boost your interview success rate.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* Right Carousel */}
                  <div className="col-md-8">
                    <div className="carousel_wrapper">
                      <Carousel className="main-carousel shadow-sm" fade pause="hover">
                        <Carousel.Item interval={2000}>
                          <img
                            className="d-block w-100"
                            src="https://static.vecteezy.com/system/resources/previews/006/011/238/non_2x/exams-word-on-red-keyboard-button-free-photo.jpg"
                            alt="Exam preparation"
                          />
                          <Carousel.Caption>
                            <h3>Pass the test</h3>
                            <p>This is an online interview process. Carefully attend all the questions.</p>
                          </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                          <img
                            className="d-block w-100"
                            src="https://mediashower.com/blog/wp-content/uploads/2017/10/score-2.jpg"
                            alt="Score review"
                          />
                          <Carousel.Caption>
                            <h3>Review your score and feedback</h3>
                            <p>You can go to the history and feedback page to review your score.</p>
                          </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                          <img
                            className="d-block w-100"
                            src="https://tse2.mm.bing.net/th/id/OIP.nVfSzjsooyL2FqngeTSlAAHaDe?rs=1&pid=ImgDetMain&o=7&rm=3"
                            alt="Employment opportunity"
                          />
                          <Carousel.Caption>
                            <h3>Get employed at our company</h3>
                            <p>Once you pass, you will automatically get promoted to company staff!</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Accordion Section */}
            <Card className="shadow-sm border-0 mb-5">
              <Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>💡 How does scoring work?</Accordion.Header>
                    <Accordion.Body>
                      Your answers are evaluated instantly based on accuracy and timing. You can view detailed breakdowns in the History tab.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>📘 What makes feedback unique?</Accordion.Header>
                    <Accordion.Body>
                      Feedback is curated by staff and tailored to your performance. It includes strengths, improvement areas, and actionable tips.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>🚀 What happens after I pass?</Accordion.Header>
                    <Accordion.Body>
                      Once you pass, you’ll be promoted to company staff and gain access to advanced tools and feedback insights.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Card className="shadow-sm border-0 mb-5">
            <Card.Body className="text-center">
              <p className="lead">
                Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to begin.
              </p>
              <p className="text-muted">
                Unlock personalized feedback, track your progress, and get closer to your dream job.
              </p>
            </Card.Body>
          </Card>
        )}

        {/* Footer */}
        <footer className="footer mt-auto py-3 bg-dark text-white text-center shadow">
          <div className="container">
            <p>Scored in real-time. Feedback curated by staff.</p>
            <small>nahyanfoxiom ©</small>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
