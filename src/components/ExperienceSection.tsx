import React from 'react';
import { experienceData, educationData, certificationsData } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, Building, ShieldCheck, ExternalLink, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 md:py-28 bg-white/80 border-t border-slate-200/60 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_0.75px,transparent_0.75px)] [background-size:26px_26px] opacity-[0.07]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            CAREER & ACADEMIC TRAJECTORY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Work Experience & Academic Excellence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Detailed breakdown of professional responsibilities at Capgemini, engineering degrees, and credentials.
          </p>
        </motion.div>

        {/* Experience Showcase Card */}
        <div className="space-y-12">
          {experienceData.map(exp => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-9 lg:p-11 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Card Top Pill & Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      {exp.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                      Client: {exp.client}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Project: <strong className="text-slate-800">{exp.project}</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mt-1 font-medium">
                    <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                      <Building className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-4 h-4" />
                      {exp.companyLocation}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {exp.period}
                  </div>
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    Key Deliverables & Responsibilities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    {exp.achievements.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 3 }}
                        className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2.5 transition-colors hover:bg-blue-50/40 hover:border-blue-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Leadership & Recognition Box */}
                {exp.leadershipHighlights && (
                  <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-100">
                    <div className="text-xs font-bold text-blue-900 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Leadership & Project Impact
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-800 font-medium">
                      {exp.leadershipHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Environment Chips */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">
                    Technical Environment
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.environment.map(tech => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-white text-slate-800 border border-slate-200 font-semibold shadow-2xs"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Education</h3>
            </div>

            <div className="space-y-4">
              {educationData.map(edu => (
                <motion.div
                  key={edu.id}
                  whileHover={{ y: -3 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5 transition-all"
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{edu.institution}</h4>
                      <p className="text-xs text-blue-600 font-semibold">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-100">
                        {edu.score}
                      </span>
                      <div className="text-[11px] text-slate-500 font-mono mt-1">{edu.period}</div>
                    </div>
                  </div>

                  {edu.highlights && (
                    <ul className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      {edu.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Honors Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Certifications & Honors</h3>
            </div>

            <div className="space-y-3">
              {certificationsData.map(cert => (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -3 }}
                  className="bg-white p-4.5 rounded-2xl border border-slate-200/80 flex items-start gap-3.5 hover:border-blue-300 transition shadow-2xs"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    cert.category === 'enterprise'
                      ? 'bg-blue-50 text-blue-600'
                      : cert.category === 'academic'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    <Award className="w-4.5 h-4.5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{cert.title}</h4>
                      {cert.year && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold shrink-0">
                          {cert.year}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-blue-600 font-semibold mt-0.5">{cert.issuer}</div>
                    {cert.description && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cert.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
