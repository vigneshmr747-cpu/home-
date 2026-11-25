import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import CustomButton from "./CustomButton";
import "./WhyChooseUs.css";

const BG_SRC = "/src/assets/images/hero_construction_dark_1795600045996.jpg";

const PILLARS = [
  {
    num: "01",
    title: "Experienced Professionals",
    description:
      "A skilled team with years of industry experience in residential and commercial builds.",
  },
  {
    num: "02",
    title: "High-Quality Workmanship",
    description:
      "We use premium materials and proven techniques to ensure long-lasting durability.",
  },
  {
    num: "03",
    title: "Reliable Support",
    description:
      "We provide ongoing support even after project completion.",
  },
];

export default function WhyChooseUs({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activePillar, setActivePillar] = useState("02");
  const [showHistory, setShowHistory] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className={`hr-why ${visible ? "is-visible" : ""}`}
      aria-labelledby="why-choose-heading"
    >
      <img src={BG_SRC} alt="" className="hr-why-bg" aria-hidden="true" referrerPolicy="no-referrer" />
      <div className="hr-why-scrim" aria-hidden="true" />
      <div className="hr-why-plus-deco" aria-hidden="true">+</div>

      <div className="hr-why-container">
        <div className="hr-why-grid">
          {/* LEFT COLUMN: WHY CHOOSE US + Numbered Pillars */}
          <div className="hr-why-left">
            <div className="hr-why-side-rail" aria-hidden="true">
              <span className="hr-why-vertical-label">WHY CHOOSE US</span>
              <span className="hr-why-rail-line" />
              <span className="hr-why-rail-dot" />
            </div>

            <div className="hr-why-left-body">
              <h2 id="why-choose-heading" className="hr-why-heading">
                Your Reliable Construction Partner
              </h2>
              <p className="hr-why-subtitle">
                We deliver quality construction with integrity, on-time execution, and
                expert craftsmanship — making us the trusted choice
              </p>

              <div className="hr-why-steps">
                {PILLARS.map((item) => (
                  <button
                    key={item.num}
                    type="button"
                    className={`hr-why-step-btn ${activePillar === item.num ? "is-active" : ""}`}
                    onClick={() => setActivePillar(item.num)}
                  >
                    <span className="hr-why-step-num">{item.num}</span>
                    <div>
                      <h3 className="hr-why-step-title">{item.title}</h3>
                      <p className="hr-why-step-desc">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <CustomButton label="MORE ABOUT US" onClick={onOpenQuote} />
            </div>
          </div>

          {/* RIGHT COLUMN: SINCE 2003 + Founder Quote */}
          <div className="hr-why-right">
            <svg
              className="hr-why-arrow-watermark"
              width="136"
              height="136"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 18L102 102M102 102V32M102 102H32"
                stroke="currentColor"
                strokeWidth="22"
                strokeLinecap="square"
              />
            </svg>

            <div className="hr-why-since-block">
              <div className="hr-why-since-label">SINCE</div>
              <div className="hr-why-year">2003</div>

              <p className="hr-why-heritage-text">
                Decades of disciplined engineering, structural safety, and turnkey
                construction delivery across commercial, industrial, and residential
                landmarks.
              </p>

              <button
                type="button"
                className="hr-why-history-link"
                onClick={() => setShowHistory((prev) => !prev)}
              >
                <span>{showHistory ? "Hide Our History" : "Read Our History"}</span>
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </button>

              {showHistory && (
                <div className="hr-why-history-panel">
                  Established in 2003, HomeRise has grown into a trusted general
                  contracting and Design &amp; Build leader delivering over 350 structural
                  projects on schedule.
                </div>
              )}
            </div>

            <div className="hr-why-quote-box">
              <Quote size={28} className="hr-why-quote-icon" aria-hidden="true" />
              <div>
                <p className="hr-why-quote-text">
                  &ldquo;Excellent service, on-time delivery, and top-quality work—our
                  dream home became a reality!&rdquo;
                </p>
                <div className="hr-why-quote-author">[ Lucas Theodore, Founder ]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
