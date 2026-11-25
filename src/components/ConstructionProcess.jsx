import React, { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Lightbulb, Rocket } from "lucide-react";
import "./ConstructionProcess.css";

const STEPS = [
  {
    step: "STEP - 01",
    title: "Request Booking",
    description:
      "Clients submit project specifications and site details to receive a tailored quote.",
    Icon: Lightbulb,
  },
  {
    step: "STEP - 02",
    title: "Planning & Engineering",
    description:
      "Our architects and structural engineers finalize blueprints, schedules, and permits.",
    Icon: ClipboardCheck,
  },
  {
    step: "STEP - 03",
    title: "Starting Work",
    description:
      "Field crews mobilize on site and execute every construction phase to final handover.",
    Icon: Rocket,
  },
];

export default function ConstructionProcess() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      id="process"
      className={`hr-process ${visible ? "is-visible" : ""}`}
      aria-labelledby="process-heading"
    >
      <div className="hr-process-container">
        <div className="hr-process-header">
          <div className="hr-process-eyebrow">
            <span className="hr-process-eyebrow-wing" aria-hidden="true">
              <span className="hr-process-eyebrow-line" />
              <span className="hr-process-eyebrow-ring" />
            </span>
            <span>HOW IT WORKS</span>
            <span className="hr-process-eyebrow-wing" aria-hidden="true">
              <span className="hr-process-eyebrow-ring" />
              <span className="hr-process-eyebrow-line" />
            </span>
          </div>
          <h2 id="process-heading" className="hr-process-title">
            Our Construction Process
          </h2>
        </div>

        <div className="hr-process-grid">
          {STEPS.map(({ step, title, description, Icon }) => (
            <article key={step} className="hr-process-card">
              <div className="hr-process-dome">
                <div className="hr-process-icon-circle" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.9} />
                </div>
                <div className="hr-process-step-label">{step}</div>
                <h3 className="hr-process-step-title">{title}</h3>
                <p className="hr-process-step-desc">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
