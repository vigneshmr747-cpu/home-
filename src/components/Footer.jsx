import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Twitter } from "lucide-react";
import "./Footer.css";

const GALLERY_IMAGES = [
  "/src/assets/images/about_construction_main_1795599832303.jpg",
  "/src/assets/images/about_construction_secondary_1795599832292.jpg",
  "/src/assets/images/blog_architects_blueprints_1795600047284.jpg",
  "/src/assets/images/blog_sustainable_building_1795600047134.jpg",
  "/src/assets/images/blog_masonry_worker_1795600047582.jpg",
  "/src/assets/images/about_video_sunset_1795600522644.jpg",
];

export default function Footer({ onNavigate, onOpenQuote }) {
  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatusMsg("Please enter a valid email address.");
      return;
    }
    setStatusMsg("Thank you for subscribing to HomeRise updates.");
    setEmail("");
  };

  const go = (e, page, targetId) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, targetId);
    }
  };

  return (
    <footer id="contact" className="hr-footer">
      <div className="hr-footer-ribbon-1" aria-hidden="true" />
      <div className="hr-footer-ribbon-2" aria-hidden="true" />

      <div className="hr-footer-container">
        {/* Top 50/50 Row */}
        <div className="hr-footer-top">
          <div className="hr-footer-contacts">
            <div className="hr-footer-contact-item">
              <span className="hr-footer-contact-icon" aria-hidden="true">
                <MapPin size={20} strokeWidth={2} />
              </span>
              <span className="hr-footer-contact-text">
                3891 Ranchview Dr. Richardson, California 6263
              </span>
            </div>

            <div className="hr-footer-contact-item">
              <span className="hr-footer-contact-icon" aria-hidden="true">
                <Phone size={20} strokeWidth={2} />
              </span>
              <span className="hr-footer-contact-text">
                (954) 468 - 4326
                <br />
                (438) 222 - 5612
              </span>
            </div>
          </div>

          <div className="hr-footer-brand-social">
            <a href="#home" className="hr-footer-logo" aria-label="HomeRise Home" onClick={(e) => go(e, "home", "home")}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M4 26V11L13 5V26H4Z" fill="#ff5e14" />
                <path d="M15 26V8L26 13V26H15Z" fill="#ff7a3d" />
              </svg>
              <span className="hr-brand-text">HomeRise</span>
            </a>

            <div className="hr-footer-follow-wrap">
              <span className="hr-footer-follow-label">FOLLOW US</span>
              <div className="hr-footer-socials">
                <a href="#contact" className="hr-footer-social-btn" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href="#contact" className="hr-footer-social-btn" aria-label="Twitter">
                  <Twitter size={15} />
                </a>
                <a href="#contact" className="hr-footer-social-btn" aria-label="Instagram">
                  <Instagram size={15} />
                </a>
                <a href="#contact" className="hr-footer-social-btn" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle 50/50 Row */}
        <div className="hr-footer-middle">
          <div className="hr-footer-left-cols">
            <div>
              <h3 className="hr-footer-col-title">QUICK LINKS</h3>
              <ul className="hr-footer-links">
                <li><a href="#home" className="hr-footer-link" onClick={(e) => go(e, "home", "home")}>Home</a></li>
                <li><a href="#about" className="hr-footer-link" onClick={(e) => go(e, "about", "about-hero")}>About Us</a></li>
                <li><a href="#home-services" className="hr-footer-link" onClick={(e) => go(e, "home", "home-services")}>Services</a></li>
                <li><a href="#news-blog" className="hr-footer-link" onClick={(e) => go(e, "about", "news-blog")}>Articles &amp; Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="hr-footer-col-title">SERVICES</h3>
              <ul className="hr-footer-links">
                <li><a href="#home-services" className="hr-footer-link" onClick={(e) => go(e, "home", "home-services")}>Residential Construction</a></li>
                <li><a href="#home-services" className="hr-footer-link" onClick={(e) => go(e, "home", "home-services")}>Industrial Construction</a></li>
                <li><a href="#home-services" className="hr-footer-link" onClick={(e) => go(e, "home", "home-services")}>Renovation &amp; Remodeling</a></li>
                <li><a href="#process" className="hr-footer-link" onClick={(e) => go(e, "about", "process")}>Civil Infrastructure</a></li>
              </ul>
            </div>

            <div>
              <h3 className="hr-footer-col-title">GALLERY POSTS</h3>
              <div className="hr-footer-gallery">
                {GALLERY_IMAGES.map((src, idx) => (
                  <a
                    key={src}
                    href="#about-us"
                    className="hr-footer-thumb-btn"
                    aria-label={`View gallery project ${idx + 1}`}
                  >
                    <img
                      src={src}
                      alt={`HomeRise construction project ${idx + 1}`}
                      className="hr-footer-thumb"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hr-footer-newsletter-col">
            <div>
              <h3 className="hr-footer-col-title">OUR NEWSLETTER</h3>
              <form className="hr-footer-newsletter-form" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  className="hr-footer-newsletter-input"
                />
                <button type="submit" className="hr-footer-newsletter-btn">
                  SUBSCRIBE NOW
                </button>
              </form>
              {statusMsg && <div className="hr-footer-newsletter-msg">{statusMsg}</div>}
            </div>

            <div className="hr-footer-copy">
              Copyright&copy;2026 All Rights Reserved HomeRise
            </div>
          </div>
        </div>

        {/* Bottom Giant Centered LET'S TALK! */}
        <div className="hr-footer-talk-row">
          <button type="button" className="hr-footer-talk-btn" onClick={onOpenQuote}>
            <span className="hr-footer-talk-arrow" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 2.5L11.5 11.5M11.5 11.5V4M11.5 11.5H4"
                  stroke="currentColor"
                  strokeWidth="2.4"
                />
              </svg>
            </span>
            <span>LET&apos;S TALK!</span>
            <span className="hr-footer-talk-arrow" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.5 2.5L2.5 11.5M2.5 11.5V4M2.5 11.5H10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
