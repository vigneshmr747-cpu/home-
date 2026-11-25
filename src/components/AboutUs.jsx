import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import CustomButton from "./CustomButton";
import "./AboutUs.css";

const PRIMARY_IMAGE_SRC = "/src/assets/images/about_construction_main_1795599832303.jpg";
const SECONDARY_IMAGE_SRC = "/src/assets/images/about_construction_secondary_1795599832292.jpg";
const VIDEO_THUMB_SRC = "/src/assets/images/about_video_sunset_1795600522644.jpg";
const CEO_AVATAR_SRC = "/src/assets/images/testimonial_client_male_1795600047666.jpg";

const CHECKLIST_ITEMS = [
  "Project Management",
  "35 Years Experience",
  "We provide 24/7 Service",
  "Great Technology",
];

const COMPANY_CAPABILITIES = [
  "Design & Build Integrated Delivery",
  "Full-Service General Contracting",
  "Commercial & Industrial Structures",
  "OSHA Certified Safety Oversight",
];

const COMPANY_METRICS = [
  { value: "2003", label: "Founded & Operating" },
  { value: "350+", label: "Completed Structures" },
  { value: "98%", label: "On-Time Handover" },
];

export default function AboutUs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalMode, setModalMode] = useState(null); // "overview" | "video" | null

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalMode) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalMode(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalMode]);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      aria-labelledby="about-company-heading"
      className={`about-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-grid">
          {/* LEFT SIDE: Dual Angled Trapezoidal Construction Photos (Screenshot 2) */}
          <div className="about-media-col">
            <div className="about-shape-orange-wedge" aria-hidden="true" />
            <div className="about-shape-outline" aria-hidden="true" />

            <div className="about-shape-triangles-top" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="about-shape-triangles-bottom" aria-hidden="true">
              <span />
              <span />
            </div>

            <div className="about-trapezoid-pair">
              <div className="about-trap-left">
                <img
                  src={PRIMARY_IMAGE_SRC}
                  alt="Construction crew in safety vests guiding crane formwork lift"
                  className="about-trap-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="about-trap-right">
                <img
                  src={SECONDARY_IMAGE_SRC}
                  alt="Site engineer wearing yellow hardhat and orange safety vest inspecting building structure"
                  className="about-trap-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: About Company Details (Screenshot 2) */}
          <div className="about-content-col">
            <div className="about-eyebrow about-reveal-item about-delay-1">
              <span className="about-eyebrow-line" aria-hidden="true" />
              <span>About Company</span>
            </div>

            <h2
              id="about-company-heading"
              className="about-heading about-reveal-item about-delay-2"
            >
              Meet the Team That Builds Your Dreams
            </h2>

            <p className="about-description about-reveal-item about-delay-3">
              Our skilled architects, engineers, and project managers work with passion
              and precision to bring your vision to life — ensuring quality, safety, and
              excellence in every structure we build.
            </p>

            <div className="about-mid-row about-reveal-item about-delay-4">
              <ul className="about-checklist">
                {CHECKLIST_ITEMS.map((item) => (
                  <li key={item}>
                    <span className="about-checklist-icon" aria-hidden="true">
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <span className="about-mid-divider" aria-hidden="true" />

              <button
                type="button"
                className="about-video-card"
                aria-label="Play company overview showcase"
                onClick={() => setModalMode("video")}
              >
                <img
                  src={VIDEO_THUMB_SRC}
                  alt="Engineers silhouetted at sunset before construction cranes"
                  className="about-video-thumb"
                  referrerPolicy="no-referrer"
                />
                <span className="about-video-play">PLAY</span>
              </button>
            </div>

            <div className="about-bottom-divider about-reveal-item about-delay-5" />

            <div className="about-bottom-meta about-reveal-item about-delay-5">
              <div className="about-ceo-lockup">
                <img
                  src={CEO_AVATAR_SRC}
                  alt="John Richard, CEO"
                  className="about-ceo-avatar"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="about-ceo-name">John Richard</div>
                  <div className="about-ceo-role">CEO Company</div>
                </div>
              </div>

              <div className="about-signature" aria-label="Masirul Doe signature">
                Masirul Doe
              </div>
            </div>

            <div className="about-reveal-item about-delay-5">
              <CustomButton
                label="MORE ABOUT US"
                onClick={() => setModalMode("overview")}
              />
            </div>
          </div>
        </div>
      </div>

      {modalMode && (
        <div
          className="about-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalMode(null);
          }}
        >
          <div
            className="about-modal-dialog"
            style={modalMode === "video" ? { maxWidth: "820px" } : undefined}
          >
            <div className="about-modal-top">
              <div>
                <div className="about-eyebrow" style={{ marginBottom: "8px" }}>
                  <span
                    className="about-eyebrow-line"
                    style={{ transform: "scaleX(1)" }}
                    aria-hidden="true"
                  />
                  <span>{modalMode === "video" ? "PROJECT SHOWCASE" : "ABOUT HOMERISE"}</span>
                </div>
                <h3 id="about-modal-title" className="about-modal-title">
                  {modalMode === "video"
                    ? "Engineering Excellence on Every Site"
                    : "Who We Are in the World of Construction"}
                </h3>
              </div>
              <button
                type="button"
                className="about-modal-close"
                aria-label="Close modal"
                onClick={() => setModalMode(null)}
              >
                <X size={20} />
              </button>
            </div>

            {modalMode === "video" ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "#0e121a",
                  marginBottom: "20px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/NbA89YbWoL8?autoplay=1&rel=0"
                  title="HomeRise Construction Project Time-Lapse"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                <p className="about-modal-text">
                  HomeRise integrates architectural design, structural engineering, and
                  full-service general contracting under one roof — delivering commercial,
                  industrial, and residential projects with strict safety and schedule discipline.
                </p>

                <div className="about-modal-metrics">
                  {COMPANY_METRICS.map((m) => (
                    <div key={m.label} className="about-modal-metric">
                      <div className="about-modal-metric-val">{m.value}</div>
                      <div className="about-modal-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="about-modal-list">
                  {COMPANY_CAPABILITIES.map((cap) => (
                    <li key={cap}>
                      <CheckCircle2 size={16} color="#ff5e14" aria-hidden="true" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="about-modal-footer">
              <CustomButton
                label={modalMode === "video" ? "Close Video" : "Close"}
                showArrow={false}
                onClick={() => setModalMode(null)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
