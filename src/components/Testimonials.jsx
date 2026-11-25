import React, { useCallback, useEffect, useRef, useState } from "react";
import { Quote, X } from "lucide-react";
import CustomButton, { ReferenceArrowIcon } from "./CustomButton";
import "./Testimonials.css";

const REVIEWS = [
  {
    id: 0,
    name: "Tariq Mahmood",
    role: "CEO of Gogonti",
    avatar: "/src/assets/images/about_construction_secondary_1795599832292.jpg",
    quote:
      "Excellent coordination, skilled labor, and high safety standards. Our factory construction was a success thanks to them.",
  },
  {
    id: 1,
    name: "Masirul Brendon",
    role: "CEO of Gogonti",
    avatar: "/src/assets/images/testimonial_client_male_1795600047666.jpg",
    quote:
      "Professional, honest, and detail-oriented. Every step was clearly communicated, and the results exceeded our expectations.",
  },
  {
    id: 2,
    name: "Fatema X Doe",
    role: "CEO of Gogonti",
    avatar: "/src/assets/images/testimonial_client_female_1795600048313.jpg",
    quote:
      "From the moment we arrived, every detail was flawless. The staff anticipated our every need.",
  },
  {
    id: 3,
    name: "Lucas Theodore",
    role: "Director at HarborWorks",
    avatar: "/src/assets/images/about_construction_main_1795599832303.jpg",
    quote:
      "HomeRise delivered our multi-story corporate campus ahead of schedule with zero safety incidents and transparent cost reporting.",
  },
];

// 3x repeated track for seamless infinite vertical upscroll & downscroll
const TRACK_ITEMS = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const BASE_OFFSET = REVIEWS.length; // 4

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  // Start at index 5 (Masirul Brendon in center slot, Tariq above, Fatema below)
  const [trackIndex, setTrackIndex] = useState(BASE_OFFSET + 1);
  const [disableTransition, setDisableTransition] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stepNext = useCallback(() => {
    setDisableTransition(false);
    setTrackIndex((prev) => prev + 1);
  }, []);

  const stepPrev = useCallback(() => {
    setDisableTransition(false);
    setTrackIndex((prev) => prev - 1);
  }, []);

  // Seamless loop reset after transition ends when crossing copy boundaries
  const handleTrackTransitionEnd = () => {
    if (trackIndex >= BASE_OFFSET * 2) {
      setDisableTransition(true);
      setTrackIndex((prev) => prev - BASE_OFFSET);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
    } else if (trackIndex < BASE_OFFSET) {
      setDisableTransition(true);
      setTrackIndex((prev) => prev + BASE_OFFSET);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
    }
  };

  // Continuous smooth autoscroll
  useEffect(() => {
    if (showAllModal) return undefined;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      stepNext();
    }, 2600);

    return () => window.clearInterval(timer);
  }, [showAllModal, stepNext]);

  // Offset so trackIndex sits in the middle (2nd) slot of the 3-card viewport
  const translateCss = `translate3d(0, calc(-1 * (${trackIndex - 1}) * var(--step-h)), 0)`;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`hr-testimonials ${visible ? "is-visible" : ""}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="hr-testimonials-container">
        <div className="hr-testimonials-grid">
          <div className="hr-testimonials-intro">
            <div className="about-eyebrow">
              <span
                className="about-eyebrow-line"
                style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
                aria-hidden="true"
              />
              <span>Testimonials</span>
            </div>

            <h2 id="testimonials-heading" className="hr-testimonials-title">
              What Our Customers Says
            </h2>

            <p className="hr-testimonials-subtitle">
              Developers, commercial operators, and private homeowners rely on HomeRise
              for structural precision, schedule discipline, and lasting quality.
            </p>

            <div className="hr-testimonials-action-row">
              <CustomButton
                label="ALL REVIEW"
                onClick={() => setShowAllModal(true)}
              />

              <div className="hr-testimonials-emblem" aria-hidden="true">
                <svg width="130" height="130" viewBox="0 0 120 120" fill="none">
                  <path
                    d="M18 18L102 102M102 102V32M102 102H32"
                    stroke="currentColor"
                    strokeWidth="20"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="hr-testimonials-stack-wrap">
            <div className="hr-testimonials-viewport">
              <div
                className={`hr-testimonials-track ${disableTransition ? "no-transition" : ""}`}
                style={{ transform: translateCss }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {TRACK_ITEMS.map((review, idx) => {
                  const isActive = idx === trackIndex;
                  return (
                    <button
                      key={`${review.id}-${idx}`}
                      type="button"
                      className={`hr-testimonial-card ${isActive ? "is-active" : ""}`}
                      onClick={() => {
                        if (idx < trackIndex) stepPrev();
                        if (idx > trackIndex) stepNext();
                      }}
                    >
                      <p className="hr-testimonial-quote">&ldquo;{review.quote}&rdquo;</p>

                      <div className="hr-testimonial-footer">
                        <div className="hr-testimonial-author">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="hr-testimonial-avatar"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="hr-testimonial-name">{review.name}</div>
                            <div className="hr-testimonial-role">{review.role}</div>
                          </div>
                        </div>

                        <span className="hr-testimonial-badge" aria-hidden="true">
                          <Quote size={18} strokeWidth={2.2} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hr-testimonial-controls">
              <button
                type="button"
                className="hr-testimonial-nav-btn is-primary"
                aria-label="Scroll testimonials down"
                onClick={stepNext}
              >
                <ReferenceArrowIcon size={16} />
              </button>
              <button
                type="button"
                className="hr-testimonial-nav-btn"
                aria-label="Scroll testimonials up"
                onClick={stepPrev}
              >
                <span style={{ display: "inline-flex", transform: "rotate(90deg)" }}>
                  <ReferenceArrowIcon size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAllModal && (
        <div
          className="about-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-reviews-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAllModal(false);
          }}
        >
          <div className="about-modal-dialog" style={{ maxWidth: "700px" }}>
            <div className="about-modal-top">
              <div>
                <div className="about-eyebrow" style={{ marginBottom: "8px" }}>
                  <span
                    className="about-eyebrow-line"
                    style={{ transform: "scaleX(1)" }}
                    aria-hidden="true"
                  />
                  <span>CLIENT REVIEWS</span>
                </div>
                <h3 id="all-reviews-title" className="about-modal-title">
                  What Our Customers Say
                </h3>
              </div>
              <button
                type="button"
                className="about-modal-close"
                aria-label="Close reviews"
                onClick={() => setShowAllModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
              {REVIEWS.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: "16px 18px",
                    border: "1px solid #e7e9ee",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <p className="hr-testimonial-quote" style={{ marginBottom: "12px" }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div className="hr-testimonial-author">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="hr-testimonial-avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="hr-testimonial-name">{r.name}</div>
                      <div className="hr-testimonial-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-modal-footer" style={{ marginTop: "20px" }}>
              <CustomButton
                label="Close Reviews"
                showArrow={false}
                onClick={() => setShowAllModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
