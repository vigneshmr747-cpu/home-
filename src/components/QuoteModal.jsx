import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import CustomButton from "./CustomButton";

export default function QuoteModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("Design & Build");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setError("Please enter your name and a valid work email.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setNotes("");
    setError("");
    onClose();
  };

  return (
    <div
      className="about-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="about-modal-dialog">
        <div className="about-modal-top">
          <div>
            <div className="about-eyebrow" style={{ marginBottom: "8px" }}>
              <span
                className="about-eyebrow-line"
                style={{ transform: "scaleX(1)" }}
                aria-hidden="true"
              />
              <span>PROJECT CONSULTATION</span>
            </div>
            <h3 id="quote-modal-title" className="about-modal-title">
              Request a Construction Estimate
            </h3>
          </div>
          <button
            type="button"
            className="about-modal-close"
            aria-label="Close quote modal"
            onClick={handleResetAndClose}
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: "12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", color: "#ff5e14" }}>
              <CheckCircle2 size={28} />
              <strong style={{ fontSize: "18px", color: "#14161b" }}>
                Consultation Request Received
              </strong>
            </div>
            <p className="about-modal-text">
              Thank you, {name}. Our project engineering team will review your{" "}
              <strong>{scope}</strong> inquiry and follow up at {email} within one business day.
            </p>
            <div className="about-modal-footer">
              <CustomButton label="Done" showArrow={false} onClick={handleResetAndClose} />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label htmlFor="quote-name" style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Full Name
              </label>
              <input
                id="quote-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Richard"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #d1d5db",
                  fontSize: "14.5px",
                }}
              />
            </div>

            <div>
              <label htmlFor="quote-email" style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #d1d5db",
                  fontSize: "14.5px",
                }}
              />
            </div>

            <div>
              <label htmlFor="quote-scope" style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Service Scope
              </label>
              <select
                id="quote-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #d1d5db",
                  fontSize: "14.5px",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="Design & Build">Design &amp; Build</option>
                <option value="General Contracting">General Contracting</option>
                <option value="Commercial & Industrial">Commercial &amp; Industrial</option>
                <option value="Renovation & Remodeling">Renovation &amp; Remodeling</option>
              </select>
            </div>

            <div>
              <label htmlFor="quote-notes" style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Project Brief
              </label>
              <textarea
                id="quote-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share site location, approximate square footage, and target schedule..."
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #d1d5db",
                  fontSize: "14.5px",
                  resize: "vertical",
                }}
              />
            </div>

            {error && (
              <div style={{ fontSize: "13.5px", color: "#dc2626", fontWeight: 600 }}>
                {error}
              </div>
            )}

            <div className="about-modal-footer" style={{ marginTop: "6px" }}>
              <CustomButton type="submit" label="Submit Estimate Request" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
