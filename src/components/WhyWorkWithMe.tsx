import { motion } from 'motion/react';
import { WHY_WORK_WITH_ME } from '../data';
import * as LucideIcons from 'lucide-react';

export default function WhyWorkWithMe() {
  // A helper to dynamically resolve a Lucide icon by name
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={24} className="text-indigo-600 dark:text-indigo-400" />;
    }
    return <LucideIcons.Check size={24} className="text-indigo-600 dark:text-indigo-400" />;
  };

  return (
    <section id="why-me" className="py-20 bg-slate-50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Why Rohan
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Guarantees For My Clients
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_WORK_WITH_ME.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
              id={`why-work-card-${item.id}`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 flex items-center justify-center mb-5 border border-indigo-100/30 dark:border-indigo-900/10">
                {renderIcon(item.icon)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
