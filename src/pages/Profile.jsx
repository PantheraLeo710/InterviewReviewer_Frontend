import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/apiClient";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // submissions: null = not loaded yet, [] = loaded & empty, [..] = loaded
  const [submissions, setSubmissions] = useState(null);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subsLoaded, setSubsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        if (!mounted) return;
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load profile");
      } finally {
        if (mounted) setLoadingUser(false);
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  const loadSubmissions = async () => {
    if (subsLoaded || loadingSubs) return;
    setLoadingSubs(true);
    try {
      let res;
      try {
        res = await api.get("/answers/mine");
      } catch (e) {
        res = await api.get("/submissions", { params: { userId: user?._id } });
      }

      const data = res?.data;
      setSubmissions(Array.isArray(data) ? data : (data ? [data] : []));
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
      toast.error("Failed to load submissions");
      setSubmissions([]);
    } finally {
      setLoadingSubs(false);
      setSubsLoaded(true);
    }
  };

  if (loadingUser) return <div className="container mt-4">Loading profile…</div>;

  return (
    <div className="container mt-4">
      <h2>Profile</h2>

      {!user ? (
        <div className="alert alert-warning">No profile data found.</div>
      ) : (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{user.name || user.username || user.email}</h5>
            <p className="card-text"><strong>Email:</strong> {user.email}</p>
            <p className="card-text"><strong>Attempted:</strong> {user.hasAttempted ? "Yes" : "No"}</p>

            {user.hasAttempted && (
              <>
                <p className="card-text"><strong>Score:</strong> {typeof user.score === "number" ? user.score : "—"}</p>
                <p className="card-text"><strong>Result:</strong> {user.result || user.lastAttemptStatus || "—"}</p>
                <p className="card-text"><strong>Eligible for staff:</strong> {user.eligibleForStaff ? "Yes" : "No"}</p>
              </>
            )}

            <div className="d-flex gap-2 mt-2">
              

              <Link to="/history" className="btn btn-secondary">
                View full submission history
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Inline submission preview after lazy-load */}
      {subsLoaded && (
        <section>
          <h4>Your submissions</h4>
          {submissions && submissions.length > 0 ? (
            submissions.map((s, i) => (
              <div className="card mb-2" key={s._id || i}>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Submission #{i + 1}</h6>
                  <p className="mb-1">Score: {s.score ?? "—"} / {s.totalQuestions ?? "—"}</p>
                  <p className="mb-1">Status: {s.status ?? s.result ?? "—"}</p>
                  <small className="text-muted">Submitted: {new Date(s.createdAt ?? s.submittedAt ?? Date.now()).toLocaleString()}</small>
                </div>
              </div>
            ))
          ) : (
            <p>No submissions found.</p>
          )}
        </section>
      )}
    </div>
  );
}
