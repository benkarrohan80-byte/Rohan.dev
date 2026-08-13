import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal } from 'lucide-react';

interface HeaderProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenAdmin?: () => void;
}

export default function Header({ darkMode, setDarkMode, onOpenAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState<number[]>([]);
  const [showSubNav, setShowSubNav] = useState(true);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    const updatedClicks = [...logoClicks.filter(t => now - t < 2000), now];
    setLogoClicks(updatedClicks);

    if (updatedClicks.length >= 3) {
      e.preventDefault();
      setLogoClicks([]);
      if (onOpenAdmin) {
        onOpenAdmin();
      }
    }
  };

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      
      if (currentScroll > lastScroll && currentScroll > 50) {
        setShowSubNav(false); // Scrolling down
      } else if (currentScroll < lastScroll) {
        setShowSubNav(true); // Scrolling up
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: '🔥 Offers @ ₹2,599', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Rohan', href: '#why-me' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={handleLogoClick} className="flex items-center gap-2 group" id="logo-link">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
              {/* Sleek rotating glowing outline border on hover */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10 animate-spin-slow" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6.5 h-6.5 group-hover:rotate-12 transition-transform duration-300" fill="none">
                <path d="M38 28 V72 M38 28 H54 C62 28 68 33 68 41 C68 49 62 54 54 54 H38 M50 54 L66 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 40 L19 50 L25 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M75 40 L81 50 L75 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
              Rohan<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-purple-400">.dev</span>
            </span>
          </a>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95"
              id="desktop-hire-btn"
            >
              Hire Rohan
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-create-website'));
              }}
              className="px-5 py-2.5 border border-indigo-250 dark:border-indigo-800/80 bg-indigo-50/60 dark:bg-indigo-950/30 hover:bg-indigo-100/80 dark:hover:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
              id="desktop-project-request-btn"
            >
              Create Website
            </a>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              id="mobile-menu-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div 
        className={`flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-start lg:justify-center items-center gap-6 lg:gap-10 px-4 lg:px-0 transition-all duration-300 ${
          !showSubNav ? 'h-0 py-0 opacity-0 overflow-hidden pointer-events-none' : (scrolled ? 'py-2.5 opacity-100' : 'py-3.5 opacity-100')
        } ${scrolled ? 'border-t border-slate-200/50 dark:border-slate-800/50' : ''}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[14px] lg:text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 tracking-wide transition-colors whitespace-nowrap flex-shrink-0"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
            id="mobile-dropdown-nav"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-4">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md text-center"
                >
                  Hire Rohan
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('open-create-website'));
                    }, 200);
                  }}
                  className="w-full py-3 border border-indigo-100 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-semibold rounded-xl text-center"
                >
                  Create Website
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
