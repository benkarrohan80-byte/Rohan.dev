import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import { Check } from 'lucide-react';

export default function Process() {
  return (
    <section id="process" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            My Process
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            How We Build Your Site
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            A structured, collaborative development pipeline designed to get your professional business website launched efficiently.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto" id="timeline-container">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {PROCESS_STEPS.map((stepItem, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={stepItem.step}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  id={`process-step-${stepItem.step}`}
                >
                  {/* Timeline bullet node connector */}
                  <div className="absolute left-4 md:left-1/2 top-2 w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/30 z-10 -translate-x-1/2">
                    {stepItem.step}
                  </div>

                  {/* Empty spatial balancer for grid spacing (only visible on desktop md+) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Section */}
                  <div className="w-full pl-12 md:pl-0 md:w-1/2 px-4">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-500/20 dark:hover:border-indigo-500/10 transition-all duration-300 relative group"
                    >
                      <span className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-1">
                        Milestone 0{stepItem.step}
                      </span>
                      
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <span>{stepItem.title}</span>
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Big visual check at the end */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <Check size={16} strokeWidth={3} />
            <span>Fully live, tested, and high-performance final website ready!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
