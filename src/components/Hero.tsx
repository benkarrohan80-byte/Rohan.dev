import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-radial from-indigo-50/40 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 overflow-hidden"
    >
      {/* Background ambient glowing circles */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo-200/30 dark:bg-indigo-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-200/30 dark:bg-slate-900/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="space-y-6 flex flex-col items-center">
          {/* Hero text */}
          <div className="space-y-6 flex flex-col items-center">
            {/* Elegant upper eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider"
              id="hero-eyebrow"
            >
              <CheckCircle2 size={12} className="text-indigo-600 dark:text-indigo-400" />
              <span>Available for Freelance Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white"
              id="hero-title"
            >
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Rohan</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-800 dark:text-slate-150 font-bold block mt-2">
                Freelance Web Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal"
              id="hero-subtitle"
            >
              I create modern, responsive and professional websites for businesses to build their digital presence, improve user engagement, and drive real growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              id="hero-ctas"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/10 hover:shadow-indigo-600/30 transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-create-website'));
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-all duration-200"
              >
                <MessageSquare size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Highlights bullet points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-8 grid grid-cols-3 gap-6 sm:gap-12 max-w-xl w-full border-t border-slate-100 dark:border-slate-800/60 mt-4"
              id="hero-stats"
            >
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">4+</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Live Sites Demo</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Mobile Friendly</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">Fast</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Delivery Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
