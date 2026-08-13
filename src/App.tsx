/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingOffer from './components/PricingOffer';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync hash routing to support dedicated page behavior
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin' || window.location.hash === '#admin') {
        setShowAdminPanel(true);
      } else {
        setShowAdminPanel(false);
      }
    };

    // Check on initial load - if it contains admin hash, clear it so it doesn't auto-open on page load/refresh
    if (window.location.hash === '#/admin' || window.location.hash === '#admin') {
      window.location.hash = '';
    } else {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#/admin';
  };

  const handleCloseAdmin = () => {
    window.location.hash = '';
  };

  // Listen for Ctrl + Shift + A to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync dark mode class with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Monitor scroll for Back-To-Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      
      {showAdminPanel ? (
        <AdminPanel onClose={handleCloseAdmin} />
      ) : (
        <>
          {/* Back to top floating button */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-40 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/25 dark:shadow-indigo-500/10 transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 ${
              showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
            }`}
            title="Scroll to top"
            id="back-to-top-floating"
          >
            <ChevronUp size={22} strokeWidth={2.5} />
          </button>

          {/* Main Navigation Bar */}
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenAdmin={handleOpenAdmin}
          />

          {/* Main Core Website Structure */}
          <main id="main-content">
            <Hero />
            <PricingOffer />
            <About />
            <Services />
            <Projects />
            <WhyWorkWithMe />
            <Process />
            <Contact />
          </main>

          {/* Footer Content */}
          <Footer />
        </>
      )}
    </div>
  );
}

