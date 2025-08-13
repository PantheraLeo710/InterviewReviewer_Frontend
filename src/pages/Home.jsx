import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import './homepg.css';

function Home() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return (
    <div className="container mt-5 text-center  ">
      <h1 className="mb-4">
        <div>Welcome to Interview Reviewer 🎯 </div></h1>

      {token && (
        <h4 className="mb-3"> Hello, <span className="text-primary">aspiring learner</span>! Ready to grow?</h4>
      )}

      <p className="lead mb-4">
        Our platform helps you with interviews, get instant feedback, and track your growth over time.
      </p>

      {token ? (
        <>
          <p className="lead mb-4">
            Start your review by going to <Link to="/questions" className="btn btn-primary btn-lg">Questions</Link>
          </p>            

          <div className="carousel_wrapper mb-5">
            <Carousel className="main-carousel" fade pause="hover">

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

          {/* Accordion Section */}
          <Accordion className="mb-5">
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
        </>
      ) : (
        <div className="mb-5">
          <p className="lead">
            Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to begin.
          </p>
          <p className="text-muted">
            Unlock personalized feedback, track your progress, and get closer to your dream job.
          </p>
        </div>
      )}
      <footer className="footer mt-auto py-3 bg-dark text-white text-center">
        <div className="container">
          <p>Scored in real-time. Feedback curated by staff.</p>
          <small>nahyanfoxiom ©</small>
        </div>
      </footer>
    </div>
    
  );
}

export default Home;
