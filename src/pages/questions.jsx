// src/pages/QuestionsPage.jsx
import React, { useEffect, useState, useRef } from "react";
import api from "../services/apiClient";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { MdRefresh } from "react-icons/md";
import "./QuestionsPage.css"; // Scoped styles

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const cardRef = useRef(null);
  const rafId = useRef(null);

  // Fetch questions
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    api
      .get("/questions")
      .then((res) => {
        const payload =
          (res.data &&
            (Array.isArray(res.data) ? res.data : res.data.data)) ||
          [];
        if (mounted) setQuestions(payload);
      })
      .catch((err) => {
        console.error("Load questions error:", err);
        toast.error("Failed to load questions. Try reloading.");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Ambient light effect
  const updateAmbientLight = (e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const shadowX = ((x - centerX) / centerX) * 30;
      const shadowY = ((y - centerY) / centerY) * 30;

      card.style.boxShadow = `
        ${shadowX}px ${shadowY}px 60px #bec3cf,
        ${-shadowX}px ${-shadowY}px 60px #ffffff
      `;
    });
  };

  if (loading) return <Loading label="Loading questions..." />;

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-wrapper">
        <div className="quiz-card empty">
          <h4>No questions available</h4>
          <p className="text-muted">
            Please check again later or contact staff.
          </p>
        </div>
      </div>
    );
  }

  const total = questions.length;
  const q = questions[index];
  const selected = answers[q._id];

  const selectOption = (selectedOption) => {
    setAnswers((prev) => ({ ...prev, [q._id]: selectedOption }));
  };

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => index < total - 1 && setIndex((i) => i + 1);

  const handleSubmit = async () => {
    const payload = {
      answers: Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })),
    };
    setSubmitting(true);
    try {
      const { data } = await api.post("/answers/quiz", payload);
      toast.success("Submitted!");
      setResult(data || { message: "Submission received" });
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err?.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = Math.round(((index + 1) / total) * 100);

  return (
    <div className="quiz-wrapper">
      <div
        className="quiz-card"
        ref={cardRef}
        onMouseMove={updateAmbientLight}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="quiz-header">
              <div>
                <h5 className="mb-1">
                  Question <span className="question-count">{index + 1}/{total}</span>
                </h5>
                <small className="quiz-instructions">
                  Answer carefully — only move forward after selecting.
                </small>
              </div>
              <div className="quiz-progress">
                <div
                  className="quiz-progress-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="quiz-question">
              <div className="question-text">{q.questionText}</div>
              {q.description && (
                <div className="question-description">{q.description}</div>
              )}
            </div>

            {/* Options */}
            <div className="quiz-options">
              {(q.options || q.selectedOption || []).map((opt, idx) => {
                const isSelected = selected === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`quiz-option ${isSelected ? "selected" : ""}`}
                    onClick={() => selectOption(opt)}
                    aria-pressed={isSelected}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <i className="bi bi-check-circle-fill selected-icon" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="quiz-navigation">
              <button
                className="neu-nav-btn"
                onClick={goPrev}
                disabled={index === 0}
              >
                Back
              </button>

              {index < total - 1 ? (
                <button
                  className="neu-nav-btn primary"
                  onClick={goNext}
                  disabled={!selected}
                  title={
                    !selected
                      ? "Select an option to continue"
                      : "Next question"
                  }
                >
                  Next <i className="bi bi-arrow-right ms-2" />
                </button>
              ) : (
                <button
                  className="neu-nav-btn submit"
                  onClick={handleSubmit}
                  disabled={submitting || !selected}
                >
                  {submitting ? "Submitting..." : "Submit Answers"}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Submission Result */
          <div className="quiz-result">
            <div className="result-icon">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h4 className="result-title">Submission received</h4>
            {result?.score != null ? (
              <p className="result-score">
                Score: {result.score} / {result.totalQuestions}
              </p>
            ) : result?.message ? (
              <p className="result-message">{result.message}</p>
            ) : null}

            <div className="result-actions">
              <a className="neu-nav-btn retry" href="/questions">
                <MdRefresh /> Try Again
              </a>
              <a className="neu-nav-btn" href="/dashboard">
                Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
