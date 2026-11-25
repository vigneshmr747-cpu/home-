import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Compass,
  DraftingCompass,
  Hammer,
  HardHat,
  Layers,
  ShieldCheck,
} from "lucide-react";
import CustomButton, { ReferenceArrowIcon } from "./CustomButton";
import "./HomePage.css";

const HOME_HERO_SRC = "/src/assets/images/home_hero_site_1795600949678.jpg";
const ABOUT_MAIN_SRC = "/src/assets/images/about_construction_main_1795599832303.jpg";
const ABOUT_SUB_SRC = "/src/assets/images/about_construction_secondary_1795599832292.jpg";

const STATS = [
  { value: "350+", label: "Completed Landmarks" },
  { value: "35+", label: "Years of Excellence" },
  { value: "120+", label: "Certified Engineers" },
  { value: "98%", label: "On-Time Handover" },
];

const SERVICES = [
  {
    num: "01",
    title: "Residential Construction",
    description:
      "Custom homes, multi-family estates, and structural builds engineered for lasting comfort.",
    Icon: Building2,
  },
  {
    num: "02",
    title: "Commercial & Industrial",
    description:
      "High-capacity office towers, logistics hubs, and manufacturing facilities built to code.",
    Icon: Layers,
  },
  {
    num: "03",
    title: "Renovation & Remodeling",
    description:
      "Structural modernization, facade upgrades, and turnkey interior transformations.",
    Icon: Hammer,
  },
  {
    num: "04",
    title: "Design & Build",
    description:
      "Integrated architectural design and construction for seamless project execution.",
    Icon: DraftingCompass,
  },
  {
    num: "05",
    title: "General Contracting",
    description:
      "Full-service project management, trade coordination, and execution from start to finish.",
    Icon: HardHat,
  },
  {
    num: "06",
    title: "Safety & Waterproofing",
    description:
      "Industrial-grade roofing systems, structural sealing, and OSHA safety compliance.",
    Icon: ShieldCheck,
  },
];

const PROJECTS = [
  {
    id: "aether-hq",
    title: "Aether Corporate Headquarters",
    category: "Commercial",
    year: "2026",
    location: "Toronto, ON",
    image: "/src/assets/images/project_commercial_tower_1795600949969.jpg",
  },
  {
    id: "oakridge-villa",
    title: "Oakridge Architectural Residence",
    category: "Residential",
    year: "2026",
    location: "Richardson, CA",
    image: "/src/assets/images/project_residential_villa_1795600950566.jpg",
  },
  {
    id: "verdant-plaza",
    title: "Verdant Green Commercial Complex",
    category: "Industrial",
    year: "2025",
    location: "Austin, TX",
    image: "/src/assets/images/blog_sustainable_building_1795600047134.jpg",
  },
];

export default function HomePage({ onGoToAbout, onOpenQuote }) {
  const [heroReady, setHeroReady] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const aboutRef = useRef(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const node = aboutRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setAboutVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAboutVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    projectFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === projectFilter);

  return (
    <>
      {/* 1. Home Hero Banner */}
      <section id="home" className={`hr-home-hero ${heroReady ? "is-ready" : ""}`}>
        <img
          src={HOME_HERO_SRC}
          alt="Modern commercial steel and glass building under construction at golden hour"
          className="hr-home-hero-bg"
          referrerPolicy="no-referrer"
        />
        <div className="hr-home-hero-scrim" aria-hidden="true" />
        <div className="hr-home-hero-slash-1" aria-hidden="true" />
        <div className="hr-home-hero-slash-2" aria-hidden="true" />

        <div className="hr-home-container">
          <div className="hr-home-hero-content">
            <div className="hr-home-hero-eyebrow">
              <span className="hr-home-hero-eyebrow-line" aria-hidden="true" />
              <span>TRUSTED CONSTRUCTION PARTNER</span>
            </div>
            <h1 className="hr-home-hero-title">
              Building Stronger Foundations for Tomorrow
            </h1>
            <p className="hr-home-hero-sub">
              Delivering precision residential, commercial, and industrial structures with
              integrated architectural design, transparent scheduling, and uncompromised
              site safety.
            </p>
            <div className="hr-home-hero-actions">
              <CustomButton label="MORE ABOUT US" onClick={onGoToAbout} />

              <button
                type="button"
                className="hr-home-btn-secondary"
                onClick={onOpenQuote}
              >
                <span>GET A QUOTE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width 4-Column Stats Strip */}
      <section className="hr-home-stats-strip" aria-label="Company Metrics">
        <div className="hr-home-container">
          <div className="hr-home-stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="hr-home-stat-cell">
                <span className="hr-home-stat-value">{stat.value}</span>
                <span className="hr-home-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Home About Preview Section (Clicking MORE ABOUT US opens the full About Us page) */}
      <section
        ref={aboutRef}
        className={`hr-home-about ${aboutVisible ? "is-visible" : ""}`}
        aria-labelledby="home-about-heading"
      >
        <div className="hr-home-container">
          <div className="hr-home-about-grid">
            <div className="hr-home-about-media">
              <div className="hr-home-about-peach" aria-hidden="true" />
              <div className="hr-home-about-main-img-wrap">
                <img
                  src={ABOUT_MAIN_SRC}
                  alt="Construction team guiding structural crane lift"
                  className="hr-home-about-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hr-home-about-sub-img-wrap">
                <img
                  src={ABOUT_SUB_SRC}
                  alt="Site engineer inspecting multi-story framing"
                  className="hr-home-about-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="hr-home-about-content">
              <div className="about-eyebrow">
                <span
                  className="about-eyebrow-line"
                  style={{ transform: aboutVisible ? "scaleX(1)" : "scaleX(0)" }}
                  aria-hidden="true"
                />
                <span>ABOUT US</span>
              </div>

              <h2 id="home-about-heading" className="about-heading">
                Who We Are in the World of Construction
              </h2>

              <p className="about-description">
                With decades of proven experience in residential, commercial, and
                industrial building, our engineers and master builders turn ambitious
                blueprints into enduring landmarks.
              </p>

              <div className="hr-home-features">
                <div className="hr-home-feature-row">
                  <div className="hr-home-feature-icon" aria-hidden="true">
                    <Compass size={22} strokeWidth={1.9} />
                  </div>
                  <div>
                    <h3 className="hr-home-feature-title">Design &amp; Build</h3>
                    <p className="hr-home-feature-desc">
                      Integrated architectural design and construction for seamless
                      project execution.
                    </p>
                  </div>
                </div>

                <div className="hr-home-feature-row">
                  <div className="hr-home-feature-icon" aria-hidden="true">
                    <HardHat size={22} strokeWidth={1.9} />
                  </div>
                  <div>
                    <h3 className="hr-home-feature-title">General Contracting</h3>
                    <p className="hr-home-feature-desc">
                      Full-service project management and execution from start to finish.
                    </p>
                  </div>
                </div>
              </div>

              <CustomButton label="MORE ABOUT US" onClick={onGoToAbout} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Section */}
      <section id="home-services" className="hr-home-services" aria-labelledby="home-services-heading">
        <div className="hr-home-container">
          <div className="hr-home-section-head">
            <div className="hr-blog-eyebrow">
              <span className="hr-blog-eyebrow-line" aria-hidden="true" />
              <span>OUR SERVICES</span>
              <span className="hr-blog-eyebrow-line" aria-hidden="true" />
            </div>
            <h2 id="home-services-heading" className="hr-home-section-title">
              Comprehensive Construction Solutions
            </h2>
            <p className="hr-home-section-sub">
              Tailored architectural engineering, site supervision, and general
              contracting across every building sector.
            </p>
          </div>

          <div className="hr-home-services-grid">
            {SERVICES.map(({ num, title, description, Icon }) => (
              <article key={num} className="hr-home-service-card">
                <div className="hr-home-service-top">
                  <div className="hr-home-service-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.85} />
                  </div>
                  <span className="hr-home-service-num">{num}</span>
                </div>
                <h3 className="hr-home-service-title">{title}</h3>
                <p className="hr-home-service-desc">{description}</p>
                <button
                  type="button"
                  className="hr-home-service-btn"
                  onClick={onOpenQuote}
                >
                  <span>REQUEST QUOTE</span>
                  <ReferenceArrowIcon size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Portfolio */}
      <section id="home-projects" className="hr-home-projects" aria-labelledby="home-projects-heading">
        <div className="hr-home-container">
          <div className="hr-home-section-head">
            <div className="hr-blog-eyebrow">
              <span className="hr-blog-eyebrow-line" aria-hidden="true" />
              <span>OUR PORTFOLIO</span>
              <span className="hr-blog-eyebrow-line" aria-hidden="true" />
            </div>
            <h2 id="home-projects-heading" className="hr-home-section-title">
              Featured Construction Projects
            </h2>
          </div>

          <div className="hr-home-filter-bar" role="tablist" aria-label="Filter projects">
            {["All", "Commercial", "Residential", "Industrial"].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={projectFilter === cat}
                className={`hr-home-filter-btn ${projectFilter === cat ? "is-active" : ""}`}
                onClick={() => setProjectFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hr-home-projects-grid">
            {filteredProjects.map((proj) => (
              <article key={proj.id} className="hr-home-project-card">
                <div className="hr-home-project-media">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="hr-home-project-img"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hr-home-project-body">
                  <div className="hr-home-project-meta">
                    {proj.category} · {proj.year}
                  </div>
                  <h3 className="hr-home-project-title">{proj.title}</h3>
                  <div className="hr-home-project-loc">{proj.location}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
