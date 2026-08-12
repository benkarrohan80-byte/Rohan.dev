import { motion } from 'motion/react';
import { SKILLS } from '../data';
import * as LucideIcons from 'lucide-react';

export default function Skills() {
  // A helper to dynamically resolve a Lucide icon by name
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={24} className="text-indigo-600 dark:text-indigo-400" />;
    }
    return <LucideIcons.Check size={24} className="text-indigo-600 dark:text-indigo-400" />;
  };

  const getExplanation = (name: string) => {
    switch (name) {
      case 'HTML5':
        return 'Semantic page structures, complete accessibility (WCAG), SEO-friendly coding.';
      case 'CSS3':
        return 'Tailwind CSS, clean animations, flexible grids, layouts with zero layout shifts.';
      case 'JavaScript (ES6+)':
        return 'Dynamic page states, lightweight form logic, zero external-dependency frameworks.';
      case 'Responsive Web Design':
        return 'Precision media alignments, touch targets, fluid typography, mobile optimization.';
      case 'GitHub Pages':
        return 'Rapid versioning, instant static distribution, custom domain connections.';
      case 'AI Assisted Web Development':
        return 'Accelerated asset drafting, boilerplate generation, fast QA lints to hit deadlines.';
      default:
        return 'Professional software application standards.';
    }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            My Skills
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Technical Competence & Expertise
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-indigo-500/20 dark:hover:border-indigo-500/10 transition-all duration-300"
              id={`skill-card-${index}`}
            >
              {/* Skill Icon & Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(skill.icon)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {skill.level}%
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                    Expertise
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                {getExplanation(skill.name)}
              </p>

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
