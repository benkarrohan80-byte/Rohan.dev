import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, CheckCircle2, Sparkles, Code, Smartphone, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-radial from-indigo-50/60 via-white to-white dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-950 overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient glowing mesh & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Soft ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-400/20 via-purple-400/20 to-pink-400/20 dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-pink-500/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-indigo-200/30 dark:bg-indigo-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-violet-200/30 dark:bg-slate-900/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="space-y-8 flex flex-col items-center">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-indigo-100 dark:border-slate-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-md"
            id="hero-eyebrow"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400" />
            <span>Available for Freelance Projects</span>
          </motion.div>

          {/* Hero text */}
          <div className="space-y-5 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]"
              id="hero-title"
            >
              Hi, I am{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-300">
                Rohan
              </span>
              <br />
              <span className="text-3xl sm:text-5xl lg:text-6xl text-slate-800 dark:text-slate-100 font-bold block mt-3">
                Freelance Web Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
              id="hero-subtitle"
            >
              I create modern, responsive and professional websites for businesses to build their digital presence, improve user engagement, and drive real growth.
            </motion.p>
          </div>

          {/* Tech & Service Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            {[
              { name: 'Custom Design', icon: Sparkles },
              { name: 'Clean Code', icon: Code },
              { name: '100% Mobile Friendly', icon: Smartphone },
              { name: 'Fast Load Speed', icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs backdrop-blur-xs"
                >
                  <Icon size={13} className="text-indigo-600 dark:text-indigo-400" />
                  {item.name}
                </span>
              );
            })}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2"
            id="hero-ctas"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 dark:shadow-indigo-500/20 hover:shadow-indigo-600/35 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>View My Work</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-create-website'));
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold rounded-2xl shadow-xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Highlights / Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl w-full border-t border-slate-200/80 dark:border-slate-800/80 mt-6"
            id="hero-stats"
          >
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-800">
              <span className="block text-2xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">4+</span>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1 block">Live Sites Demo</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-800">
              <span className="block text-2xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">100%</span>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1 block">Mobile Friendly</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-800">
              <span className="block text-2xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">Fast</span>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1 block">Delivery Guaranteed</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

