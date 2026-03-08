import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-overlay" role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}