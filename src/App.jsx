import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import HomePage from "./components/HomePage.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import AboutUs from "./components/AboutUs.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import ConstructionProcess from "./components/ConstructionProcess.jsx";
import Testimonials from "./components/Testimonials.jsx";
import NewsBlog from "./components/NewsBlog.jsx";
import Footer from "./components/Footer.jsx";
import QuoteModal from "./components/QuoteModal.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash === "#home" ? "home" : "about"
  );
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#home") {
        setCurrentPage("home");
      } else if (window.location.hash === "#about" || window.location.hash === "") {
        setCurrentPage("about");
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = (page, targetId) => {
    setCurrentPage(page);
    const nextHash = page === "about" ? "#about" : "#home";
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    if (targetId && targetId !== "home" && targetId !== "about-hero") {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div id="app-shell">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <main>
        {currentPage === "home" ? (
          <>
            <HomePage
              onGoToAbout={() => handleNavigate("about", "about-hero")}
              onOpenQuote={() => setQuoteOpen(true)}
            />
            <Testimonials />
          </>
        ) : (
          <>
            <HeroBanner onNavigateHome={() => handleNavigate("home", "home")} />
            <AboutUs />
            <WhyChooseUs onOpenQuote={() => setQuoteOpen(true)} />
            <ConstructionProcess />
            <Testimonials />
            <NewsBlog />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} onOpenQuote={() => setQuoteOpen(true)} />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
