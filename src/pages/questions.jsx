import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../config";
import jwt_decode from "jwt-decode";


function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      console.warn("🚨 Invalid token found in localStorage");
      navigate("/login");
    } else {
      console.log("✅ Token being used:", token); // will run once
      const decoded = jwt_decode(token);
      console.log("Decoded user at StaffDashboard:", decoded);
      setUser(decoded);
    }
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(API.QUESTIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched questions:", res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        toast.error("Failed to load questions");
      });
  }, []);



  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (user?.isStaff === true) {
      toast.warn("Staff users are not allowed to submit answers.");
      return;
    }

    const formattedAnswers = Object.entries(selectedAnswers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );

    if (formattedAnswers.length !== questions.length) {
      toast.warn("Please answer all questions before submitting.");
      return;
    }

    try {
      console.log("Submitting to:", API.ANSWERS.SUBMIT);
      const res = await axios.post(API.ANSWERS.SUBMIT,
        { answers: formattedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("New staff token stored ✅");
      }

      setResult(res.data);
      toast.success(`You ${res.data.status}ed!`, {
        autoClose: 3000,
      });

      // Redirect only if passed
      if (res.data.status === "pass") {
        navigate("/staff-welcome");
      } else {
        navigate("/submission-result", { state: res.data });
      }

    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Answer the Questions</h2>

      {questions.map((q, index) => (
        <div key={q._id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">
              Q{index + 1}. {q.questionText}
            </h5>
            <div className="btn-group w-100 flex-wrap" role="group">
              {q.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    className="btn-check"
                    name={`question-${q._id}`}
                    id={`q${q._id}-opt${i}`}
                    value={opt}
                    checked={selectedAnswers[q._id] === opt}
                    onChange={() => handleOptionChange(q._id, opt)}
                    autoComplete="off"
                  />
                  <label
                    className={`btn ${selectedAnswers[q._id] === opt ? 'btn-success' : 'btn-outline-primary'} m-1`}
                    htmlFor={`q${q._id}-opt${i}`}
                  >
                    {opt}
                  </label>
                </div>
              ))}
            </div>


          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          className="btn btn-success btn-lg px-5"
          onClick={handleSubmit}
          disabled={user?.isStaff === true}
        >
          Submit Answers
        </button>

        {user?.isStaff === true && (
          <p className="text-danger mt-2">
            Staff users are not allowed to submit answers.
          </p>
        )}


      </div>
    </div>
  );
}

export default QuestionsPage;
