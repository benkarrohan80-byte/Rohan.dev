import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { ExternalLink, Globe } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Client Projects & Demos
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Completed Projects For Clients
          </p>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto mt-4" />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Click on "Live Demo" to view the live, fully functional websites in a new tab. These are real production-ready builds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              id={`project-card-${project.id}`}
            >
              {/* Project Image Frame with overlays */}
              <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-850">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphic Tech Badge Overlay */}
                <div className="absolute top-3 left-3 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200/40 dark:border-slate-700/40 text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Globe size={12} />
                  <span>Production Live</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold">
                    Click "Live Demo" to test real functionality.
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200/40 dark:border-slate-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Live Demo Action Trigger */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-200"
                    id={`live-demo-link-${project.id}`}
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
