import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Cpu, Search, Terminal, Code2, Globe, Wrench, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('mainframe');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Code2': return Code2;
      case 'Globe': return Globe;
      default: return Wrench;
    }
  };

  // If search query is entered, match across all skills
  const allSkills = skillCategories.flatMap(c => c.skills.map(s => ({ ...s, parentCategory: c.title })));
  const filteredSkills = searchQuery.trim()
    ? allSkills.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  const currentCategory = skillCategories.find(c => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="relative py-14 sm:py-20 md:py-28 bg-white/80 border-t border-slate-200/60 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.08]" />
        <div className="absolute -top-32 -left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl" />
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
            <Cpu className="w-3.5 h-3.5" />
            SKILLS & CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technical Capabilities & Tooling Matrix
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
            Proficiencies across legacy host systems, relational databases, modern programming languages, and cloud analytics.
          </p>

          {/* Live Search Input */}
          <div className="max-w-md mx-auto mt-5 sm:mt-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. COBOL, DB2, Python, VSAM)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-12 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white placeholder:text-slate-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Global Search Results View */}
        {filteredSkills ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-blue-600 font-semibold">
              Found {filteredSkills.length} matching {filteredSkills.length === 1 ? 'skill' : 'skills'}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredSkills.map(skill => (
                <motion.div
                  key={skill.name}
                  layout
                  whileHover={{ y: -4, borderColor: '#3b82f6' }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:shadow-md transition space-y-2.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-semibold">
                      {skill.yearsOrDepth}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{skill.parentCategory} • {skill.category}</div>
                  {skill.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{skill.description}</p>
                  )}
                  {/* Animated Progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-blue-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Category Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              {skillCategories.map(cat => {
                const Icon = getIcon(cat.iconName);
                const isActive = activeTab === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(cat.id)}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition flex items-center gap-2.5 sm:gap-3.5 cursor-pointer min-h-[56px] ${
                      isActive
                        ? 'bg-blue-50/90 border-blue-500 text-slate-900 ring-1 ring-blue-500/30 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] sm:text-xs font-bold truncate text-slate-900">{cat.title}</div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 truncate">{cat.skills.length} competencies</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Current Category Skills Grid with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              >
                {currentCategory.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -5, borderColor: '#60a5fa' }}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:shadow-md transition space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900">{skill.name}</h4>
                        {skill.yearsOrDepth && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold shrink-0">
                            {skill.yearsOrDepth}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mb-2">{skill.category}</div>
                      {skill.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">{skill.description}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <div className="flex justify-between text-[11px] font-mono text-slate-500">
                        <span>Proficiency</span>
                        <span className="text-blue-600 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-blue-600 h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
