// src/components/Loading.jsx
import React from "react";

export default function Loading({ label = "Loading..." }) {
  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div className="spinner-border me-3" role="status" aria-hidden="true"></div>
      <strong>{label}</strong>
    </div>
  );
}
