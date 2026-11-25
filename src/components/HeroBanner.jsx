import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import "./HeroBanner.css";

const HERO_BG_SRC = "/src/assets/images/hero_construction_dark_1795600045996.jpg";

export default function HeroBanner({ onNavigateHome }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="about-hero" className={`hr-hero ${ready ? "is-ready" : ""}`} aria-label="Page Header">
      <img
        src={HERO_BG_SRC}
        alt="Silhouetted tower cranes and heavy construction equipment at twilight"
        className="hr-hero-bg"
        referrerPolicy="no-referrer"
      />
      <div className="hr-hero-scrim" aria-hidden="true" />
      <div className="hr-hero-slash-1" aria-hidden="true" />
      <div className="hr-hero-slash-2" aria-hidden="true" />

      <div className="hr-hero-container">
        <div className="hr-hero-content">
          <h1 className="hr-hero-title">About Us</h1>
          <nav className="hr-hero-breadcrumb" aria-label="Breadcrumb">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
            >
              Home
            </a>
            <span className="hr-hero-breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={14} strokeWidth={2.4} />
            </span>
            <span>About Us</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
