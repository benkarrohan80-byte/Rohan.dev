import { motion } from 'motion/react';
import { SERVICES } from '../data';
import * as LucideIcons from 'lucide-react';

export default function Services() {
  // A helper to dynamically resolve a Lucide icon by name
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={24} className="text-indigo-600 dark:text-indigo-400" />;
    }
    return <LucideIcons.Globe size={24} className="text-indigo-600 dark:text-indigo-400" />;
  };

  const getDetails = (title: string) => {
    switch (title) {
      case 'Business Websites':
        return ['Multi-page structure', 'Sleek service catalogs', 'Interactive contact forms', 'Google Maps integration'];
      case 'Landing Pages':
        return ['High-converting flow', 'A/B optimized sections', 'Lead capture widgets', 'Rapid-loading assets'];
      case 'Business Showcase Sites':
        return ['Custom creative showcases', 'Interactive service highlights', 'Visual accomplishments', 'Downloadable assets'];
      case 'Website Redesign':
        return ['Upgraded responsive grid', 'Modern design elements', 'Speed optimizations', 'SEO rank conservation'];
      case 'Website Customization':
        return ['Custom modal/popup popups', 'New API integration forms', 'Tailwind CSS retrofitting', 'Dynamic calculations'];
      default:
        return ['Responsive layouts', 'Optimized assets', 'Fully responsive design'];
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            My Services
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            How I Can Help Your Business
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between"
              id={`service-${service.id}`}
            >
              <div>
                {/* Header Icon & Duration */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <div className="group-hover:scale-110 group-hover:text-white transition-transform duration-300 flex items-center justify-center">
                      {renderIcon(service.icon)}
                    </div>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 mb-2">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Included Features */}
                <ul className="space-y-2 mb-6">
                  {getDetails(service.title).map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                >
                  <span>Inquire about this service</span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
