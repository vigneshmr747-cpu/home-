import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, User, X } from "lucide-react";
import CustomButton, { ReferenceArrowIcon } from "./CustomButton";
import "./NewsBlog.css";

const ARTICLES = [
  {
    id: "sustainable-building",
    day: "28",
    month: "June",
    title: "Sustainable Building Practices for Modern Projects",
    author: "By John Doe",
    comments: "Comments (04)",
    image: "/src/assets/images/blog_sustainable_building_1795600047134.jpg",
    summary:
      "Low-carbon concrete mixes, passive solar glazing, and living vertical green facades are reshaping commercial developments while lowering lifecycle operational energy costs.",
  },
  {
    id: "role-of-architects",
    day: "28",
    month: "June",
    title: "The Role of Architects in Building Design",
    author: "By John Doe",
    comments: "Comments (04)",
    image: "/src/assets/images/blog_architects_blueprints_1795600047284.jpg",
    summary:
      "Integrated Design & Build bridges the gap between architectural vision and structural field execution, preventing costly change orders and accelerating permit timelines.",
  },
  {
    id: "long-lasting-materials",
    day: "28",
    month: "June",
    title: "Best Materials for Long-Lasting Structures",
    author: "By John Doe",
    comments: "Comments (04)",
    image: "/src/assets/images/blog_masonry_worker_1795600047582.jpg",
    summary:
      "Selecting tested structural steel, weather-cured masonry, and high-density moisture barriers ensures commercial buildings withstand decades of environmental stress.",
  },
];

export default function NewsBlog() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);

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
      id="news-blog"
      className={`hr-blog ${visible ? "is-visible" : ""}`}
      aria-labelledby="blog-heading"
    >
      <div className="hr-blog-container">
        <div className="hr-blog-header">
          <div className="hr-blog-eyebrow">
            <span className="hr-blog-eyebrow-line" aria-hidden="true" />
            <span>News &amp; Blog</span>
            <span className="hr-blog-eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="blog-heading" className="hr-blog-title">
            Our Latest News update
          </h2>
        </div>

        <div className="hr-blog-grid">
          {ARTICLES.map((article) => (
            <article key={article.id} className="hr-blog-card">
              <div className="hr-blog-media">
                <div className="hr-blog-img-wrap">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="hr-blog-img"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hr-blog-date-badge">
                  <span className="hr-blog-date-day">{article.day}</span>
                  <span className="hr-blog-date-month">{article.month}</span>
                </div>
              </div>

              <div className="hr-blog-body">
                <h3 className="hr-blog-card-title">{article.title}</h3>

                <button
                  type="button"
                  className="hr-blog-read-btn"
                  onClick={() => setActiveArticle(article)}
                >
                  <span>READ MORE</span>
                  <ReferenceArrowIcon size={17} />
                </button>

                <div className="hr-blog-meta-pill">
                  <span className="hr-blog-meta-item">
                    <User size={13} strokeWidth={2} aria-hidden="true" />
                    <span>{article.author}</span>
                  </span>
                  <span className="hr-blog-meta-item">
                    <MessageCircle size={13} strokeWidth={2} aria-hidden="true" />
                    <span>{article.comments}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeArticle && (
        <div
          className="about-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveArticle(null);
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
                  <span>
                    {activeArticle.day} {activeArticle.month} · {activeArticle.author}
                  </span>
                </div>
                <h3 id="blog-modal-title" className="about-modal-title">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                className="about-modal-close"
                aria-label="Close article"
                onClick={() => setActiveArticle(null)}
              >
                <X size={20} />
              </button>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                marginBottom: "18px",
              }}
              referrerPolicy="no-referrer"
            />

            <p className="about-modal-text">{activeArticle.summary}</p>

            <div className="about-modal-footer">
              <CustomButton
                label="Close Article"
                showArrow={false}
                onClick={() => setActiveArticle(null)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
