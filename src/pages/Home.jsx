import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaChartBar, FaBullseye, FaUserCheck } from 'react-icons/fa';
import './homepg.css';

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "70vh", padding: "10px" }}>
      <div className="container mt-0">
        <h1 className="mb-2 text-center">
          <div>Welcome to Interview Reviewer</div>
        </h1>
        {token ? (
          <>
            

            {/* Main Card Wrapper */}
            <Card className="shadow-sm border-0 mb-2" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <Card.Body>
                <div className="row align-items-center">
                  {/* Left Card */}
                  <div className="col-md-4 mb-2">
                    <Card className="shadow-lg border-0 h-100 mt-2">
                      <Card.Body>
                        <Card.Title className="fw-bold text-dark"><FaChartBar /> Track Your Progress</Card.Title>
                        <Card.Text className="text-muted">
                          Monitor your attempts, accuracy, and last scores. See how you’ve improved over time.
                        </Card.Text>

                        <Card.Title className="fw-bold text-dark mt-3"><FaBullseye /> Personalized Learning</Card.Title>
                        <Card.Text className="text-muted">
                          AI-powered evaluation ensures you receive tailored feedback and targeted questions.
                        </Card.Text>

                        <Card.Title className="fw-bold text-dark mt-3"><FaUserCheck /> Staff Feedback</Card.Title>
                        <Card.Text className="text-muted">
                          Receive guidance from staff to improve your interview skills.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* Right Carousel */}
                  <div className="col-md-8">
                    <Card className="shadow-md border-0">
                      <Card.Body className="p-0">
                        <Carousel fade pause="hover" className="shadow-lg">
                          <Carousel.Item interval={2000}>
                            <img
                              className="d-block w-100"
                              src="https://static.vecteezy.com/system/resources/previews/006/011/238/non_2x/exams-word-on-red-keyboard-button-free-photo.jpg"
                              alt="Exam preparation"
                              style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <Carousel.Caption>
                              <h5>Pass the test</h5>
                              <p>Carefully attend all the questions.</p>
                            </Carousel.Caption>
                          </Carousel.Item>

                          <Carousel.Item interval={2000}>
                            <img
                              className="d-block w-100"
                              src="https://mediashower.com/blog/wp-content/uploads/2017/10/score-2.jpg"
                              alt="Score review"
                              style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <Carousel.Caption>
                              <h5>Review your score and feedback</h5>
                              <p>Check history to review past attempts.</p>
                            </Carousel.Caption>
                          </Carousel.Item>

                          <Carousel.Item interval={2000}>
                            <img
                              className="d-block w-100"
                              src="https://tse2.mm.bing.net/th/id/OIP.nVfSzjsooyL2FqngeTSlAAHaDe?rs=1&pid=ImgDetMain&o=7&rm=3"
                              alt="Employment opportunity"
                              style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <Carousel.Caption>
                              <h5>Get employed</h5>
                              <p>Pass to gain staff access and advanced feedback.</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        </Carousel>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Card.Body>
            
              <Card.Body>
                <Accordion className="shadow-lg">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>How does scoring work?</Accordion.Header>
                    <Accordion.Body>
                      Your answers are evaluated instantly based on accuracy and timing. View detailed breakdowns in History.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>What makes feedback unique?</Accordion.Header>
                    <Accordion.Body>
                      Feedback is curated by staff and tailored to your performance.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>What happens after I pass?</Accordion.Header>
                    <Accordion.Body>
                      You'll be promoted to staff and gain access to advanced tools and insights.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Card className="shadow-sm border-0 mb-5 text-center p-4">
            <p className="lead">
              Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to begin.
            </p>
            <p className="text-muted">Unlock personalized feedback, track progress, and reach your dream job.</p>
          </Card>
        )}
      </div>
      <footer style={{ backgroundColor: "#2f3640", color: "#fff", padding: "15px 5px" }}>
        <div className=" text-center">
          <p className="mb-0">NahyanFoxiom&copy; {new Date().getFullYear()}  Interview Reviewer. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
