import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, Laptop, Smartphone } from 'lucide-react';

export default function About() {
  const points = [
    'Meticulously crafted using clean, modern HTML5, CSS3, and JavaScript.',
    '100% responsive and tested across iOS, Android, and Desktop environments.',
    'Optimized for search engines (SEO) to help clients secure local search traffic.',
    'Built with speed-optimization guidelines for lightning-fast site loads.',
    'Tailored conversion elements specifically to capture corporate queries.'
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            About Me
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Who is Rohan?
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Visual card of features (Grid col 1-5) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl opacity-10 blur-xl pointer-events-none" />
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Laptop size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Business Website Expert</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Custom tailored layout architectures</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Mobile-First Approach</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tested on iOS and Android devices</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Performance-First Code</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fast load speeds to reduce user bounce rate</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Crafting websites that are simple, secure, and successful.
                </p>
              </div>
            </div>
          </div>

          {/* About introduction narrative (Grid col 6-12) */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Sleek, Modern Websites Engineered For Business Growth
            </h3>
            
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              I am a freelance web developer with a core passion for building high-quality, professional websites that assist local businesses, service providers, and startups in establishing credibility and capturing customers.
            </p>

            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              My core focus is centered on designing elegant layout interfaces that are fully compatible on mobile screens, tablets, and desktop displays. By using clean code practices, I guarantee my clients fast-loading websites that rank effectively on search engines, establishing a trustworthy online home for their brand.
            </p>

            <div className="space-y-3.5 pt-2">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 leading-tight">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors group"
              >
                <span>Let's talk about your next project</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
