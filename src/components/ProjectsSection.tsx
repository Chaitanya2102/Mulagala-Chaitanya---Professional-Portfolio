import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { FolderGit2, Sparkles, ArrowUpRight, Terminal, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mainframe' | 'web' | 'ai-data'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="works" className="relative py-14 sm:py-20 md:py-28 bg-slate-50/80 border-t border-slate-200/60 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            MY WORKS & PORTFOLIO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured Projects & Engineering Architectures
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
            Explore enterprise host systems, interactive batch simulators, computer vision models, and full-stack web platforms.
          </p>

          {/* Filter Pills with touch-friendly targets */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
            {[
              { id: 'all', label: 'All Works (4)', icon: FolderGit2 },
              { id: 'mainframe', label: 'Enterprise Mainframe', icon: Terminal },
              { id: 'web', label: 'Full-Stack Web', icon: Globe },
              { id: 'ai-data', label: 'Computer Vision & AI', icon: Cpu }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`min-h-[40px] flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                      : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid with AnimatePresence & layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

                    {/* Badges on Thumbnail */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/95 backdrop-blur-md text-blue-700 shadow-sm">
                        {project.categoryLabel}
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-white/95 backdrop-blur-md text-slate-700 shadow-sm">
                        {project.clientOrContext}
                      </span>
                    </div>

                    {/* Hover Quick Prompt Overlay */}
                    <div className="absolute inset-0 bg-blue-600/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                      <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs flex items-center gap-2 shadow-lg text-center">
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Interactive Demo & Code</span>
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-4 sm:p-7 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
                      </h3>
                      <p className="text-xs text-blue-600 font-medium mt-1">{project.subtitle}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Highlights Bullet List */}
                    <div className="space-y-1.5 pt-1">
                      {project.keyHighlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics preview */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-mono text-center">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100">
                            <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                            <div className="text-xs font-bold text-blue-600">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="px-4 sm:px-7 py-3 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono bg-white border border-slate-200 text-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:underline">
                    View →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Project Deep Dive */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
