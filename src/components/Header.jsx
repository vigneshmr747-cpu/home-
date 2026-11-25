import React, { useEffect, useState } from "react";
import { ChevronDown, Mail, MapPin, Menu, Phone, Search, X } from "lucide-react";
import CustomButton from "./CustomButton";
import "./Header.css";

const NAV_ITEMS = [
  { label: "Home", page: "home", targetId: "home", hasChevron: true },
  { label: "About Us", page: "about", targetId: "about-us", hasChevron: false },
  { label: "Services", page: "home", targetId: "home-services", hasChevron: true },
  { label: "Pages", page: "about", targetId: "process", hasChevron: true },
  { label: "Blog", page: "about", targetId: "news-blog", hasChevron: true },
  { label: "Contact", page: null, targetId: "contact", hasChevron: false },
];

export default function Header({ currentPage, onNavigate, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    setDrawerOpen(false);
    if (item.page) {
      onNavigate(item.page, item.targetId);
    } else if (item.targetId) {
      document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase();
    if (q.includes("about") || q.includes("team") || q.includes("company")) {
      onNavigate("about", "about-us");
    } else if (q.includes("process") || q.includes("work")) {
      onNavigate("about", "process");
    } else if (q.includes("blog") || q.includes("news")) {
      onNavigate("about", "news-blog");
    } else if (q.includes("service")) {
      onNavigate("home", "home-services");
    } else if (q.includes("project") || q.includes("portfolio")) {
      onNavigate("home", "home-projects");
    } else {
      onNavigate("home", "home");
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className={`hr-site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hr-topbar">
        <div className="hr-topbar-left">
          <span className="hr-topbar-item">
            <Phone size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>HELP LINE: +208-6666-0112</span>
          </span>
          <span className="hr-topbar-item">
            <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>Open Hours: Mon - Fri 8.00 am - 6.00 pm</span>
          </span>
        </div>
        <div className="hr-topbar-right">
          <span className="hr-topbar-item">
            <MapPin size={14} strokeWidth={2.2} aria-hidden="true" />
            <span>612-7 Roanoke Rd, Toronto, ON M4D 23, UK</span>
          </span>
        </div>
      </div>

      <div className="hr-navbar">
        <div className="hr-navbar-inner">
          <a
            href="#home"
            className="hr-brand-block"
            aria-label="HomeRise Home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home", "home");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 26V11L13 5V26H4Z" fill="#ff5e14" />
              <path d="M15 26V8L26 13V26H15Z" fill="#ff7a3d" />
              <rect x="7.5" y="13" width="2.5" height="3.5" fill="#0e121a" />
              <rect x="7.5" y="18.5" width="2.5" height="3.5" fill="#0e121a" />
              <rect x="19" y="15" width="2.5" height="3.5" fill="#0e121a" />
            </svg>
            <span className="hr-brand-text">HomeRise</span>
          </a>

          <nav className="hr-nav" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.label === "Home" && currentPage === "home") ||
                (item.label === "About Us" && currentPage === "about");
              return (
                <a
                  key={item.label}
                  href={`#${item.targetId}`}
                  className={`hr-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  <span>{item.label}</span>
                  {item.hasChevron && <ChevronDown size={13} strokeWidth={2.3} aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          <div className="hr-header-actions">
            <button
              type="button"
              className="hr-icon-square-btn hr-search-toggle-desktop"
              aria-label="Toggle site search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <Search size={18} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="hr-icon-square-btn"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={20} strokeWidth={2} />
            </button>

            <CustomButton
              label="GET A QUOTE"
              className="hr-header-cta-desktop"
              onClick={onOpenQuote}
            />
          </div>
        </div>

        {searchOpen && (
          <div className="hr-search-bar">
            <form className="hr-search-inner" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search (e.g. About, Services, Projects, Process, Blog)..."
                aria-label="Search sections"
                className="hr-search-input"
              />
              <CustomButton
                type="submit"
                label="Search"
                showArrow={false}
                style={{ padding: "9px 22px" }}
              />
              <button
                type="button"
                className="hr-icon-square-btn"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {drawerOpen && (
        <div
          className="hr-mobile-drawer-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className="hr-mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div>
              <div className="hr-mobile-drawer-top">
                <span className="hr-brand-text">HomeRise</span>
                <button
                  type="button"
                  className="hr-mobile-close"
                  aria-label="Close navigation menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="hr-mobile-nav">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={`#${item.targetId}`}
                    className="hr-mobile-link"
                    onClick={(e) => handleLinkClick(e, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: 1.5 }}>
                <div>HELP LINE: +208-6666-0112</div>
                <div>Mon - Fri 8.00 am - 6.00 pm</div>
              </div>
              <CustomButton
                label="GET A QUOTE"
                fullWidth
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenQuote();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
