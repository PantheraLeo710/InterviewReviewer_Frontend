// src/pages/QuestionsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/apiClient"; // or "../services/api" depending on your file
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { FaRedo } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId:  }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null); // backend response (score, passed, etc.)

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/questions")
      .then((res) => {
        const payload = (res.data && (Array.isArray(res.data) ? res.data : res.data.data)) || [];
        if (mounted) setQuestions(payload);
      })
      .catch((err) => {
        console.error("Load questions error:", err);
        toast.error("Failed to load questions. Try reloading.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <Loading label="Loading questions..." />;

  if (!questions || questions.length === 0) {
    return (
      <div className="container app-center">
        <div className="card w-100" style={{ maxWidth: 800 }}>
          <div className="card-body text-center">
            <h4>No questions available</h4>
            <p className="text-muted">Please check again later or contact staff.</p>
          </div>
        </div>
      </div>
    );
  }

  const total = questions.length;
  const q = questions[index];
  const selected = answers[q._id];

  function selectOption(selectedOption) {
    setAnswers(prev => ({ ...prev, [q._id]: selectedOption }));
  }

  function goPrev() {
    setIndex(i => Math.max(0, i - 1));
  }

  function goNext() {
    if (index < total - 1) setIndex(i => i + 1);
  }

  async function handleSubmit() {
    const payload = {
      answers: Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption })),
    };
    setSubmitting(true);
    try {
      const { data } = await api.post("/answers/quiz", payload);
      console.log("Frontend received response:", data);
      toast.success("Submitted!");
      setResult(data || { message: "Submission received" });
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err?.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  // UI
  const progressPercent = Math.round(((index + 1) / total) * 100);

  return (
    <div className="container app-center">
      <div className="card w-100" style={{ maxWidth: 920 }}>
        <div className="card-body">
          {!submitted ? (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="mb-0">Question <span className="text-muted">({index + 1}/{total})</span></h5>
                  <small className="text-muted">Answer carefully — only move forward after selecting.</small>
                </div>
                <div style={{ width: 260 }}>
                  <div className="progress" aria-hidden>
                    <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="h6 fw-semibold">{q.questionText}</div>
                {q.description && <div className="mt-2 text-muted">{q.description}</div>}
              </div>

              <div className="mb-4">
                {(q.options || q.selectedOption || []).map((opt, idx) => {
                  const isSelected = selected === opt;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`btn btn-option w-100 ${isSelected ? "selected" : "btn-outline-secondary"}`}
                      onClick={() => selectOption(opt)}
                      aria-pressed={isSelected}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>{opt}</div>
                        {isSelected && <i className="bi bi-check-circle-fill" aria-hidden />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-light" onClick={goPrev} disabled={index === 0}>Back</button>

                {index < total - 1 ? (
                  <button
                    className="btn btn-brand"
                    onClick={goNext}
                    disabled={!selected}
                    title={!selected ? "Select an option to continue" : "Next question"}
                  >
                    Next <i className="bi bi-arrow-right ms-2" />
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={submitting || !selected}
                  >
                    {submitting ? "Submitting..." : "Submit Answers"}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Submission result card */
            <div className="text-center py-5">
              <div className="mb-3">
                <i className="bi bi-check-circle-fill" style={{ fontSize: 48, color: "var(--success)" }} />
              </div>
              <h4 className="mb-1">Submission received</h4>
              {result?.score != null ? (
                <p className="lead mb-1">{`Score: ${result.score} / ${result.totalQuestions}`}</p>
              ) : result?.message ? (
                <p className="text-muted">{result.message}</p>
              ) : null}
              <div className="mt-4 d-flex justify-content-center gap-2">
                <a className="btn btn-warning" href="/questions"><MdRefresh />   Try Again</a>
                <a className="btn btn-secondary" href="/dashboard">Dashboard</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
