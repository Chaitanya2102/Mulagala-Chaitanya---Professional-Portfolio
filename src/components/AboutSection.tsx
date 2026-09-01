import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Terminal, Database, Code2, Server, Award, BookOpen, CheckCircle2, UserCheck, Shield, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Terminal,
      title: "Enterprise Mainframe Architecture",
      desc: "Deep hands-on experience developing, debugging, and maintaining batch and online host systems using COBOL, JCL, DB2, and VSAM under strict zero-downtime constraints."
    },
    {
      icon: Database,
      title: "High-Volume Data Processing",
      desc: "Engineered scalable mass data extraction logic, relational DB2 cursor workflows, and secure FTP transmissions for millions of healthcare policy and claims records."
    },
    {
      icon: Code2,
      title: "Modern Full-Stack & Python Data",
      desc: "Combining low-level procedural reliability with modern web technologies (React, Angular, Node.js) and Python computer vision & predictive analytics."
    },
    {
      icon: UserCheck,
      title: "Incident Triage & Leadership",
      desc: "Proven track record as an Associate Team Leader at Capgemini, coordinating cross-system defect analysis, incident response, and SLA compliance reporting."
    }
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 bg-slate-50/70 border-t border-slate-200/60 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            ABOUT ME
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Mission-Critical Enterprise & Modern Software
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
            A comprehensive profile merging 1.5+ years of enterprise mainframe experience at Capgemini with strong foundations in Computer Science & Engineering.
          </p>
        </div>

        {/* 2-Column Story / Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Story Box */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
              Passionate Problem Solver with a Dual Specialization
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              With 1.5+ years at <strong className="text-slate-900 font-semibold">Capgemini Technology Services</strong>, 
              I have specialized in developing, optimizing, and supporting core mainframe applications for <strong className="text-blue-600 font-semibold">State Farm's Health Host</strong> platform.
              My work spans end-to-end batch processing, mass data extractions, defect root-cause investigations, and audit compliance.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Graduating with an <strong className="text-slate-900 font-semibold">8.5 CGPA in Computer Science and Engineering from Chennai Institute of Technology</strong>, 
              I bring a multifaceted perspective that pairs robust enterprise systems with modern algorithms in image dehazing, machine learning sales forecasting, and responsive web platforms.
            </p>

            <div className="pt-4 sm:pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Capgemini Excellence Award</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Best Outgoing Student (Class XII & X)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">3x Cisco Certified in CyberSec & Python</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Associate Team Lead Responsibilities</span>
              </div>
            </div>
          </div>

          {/* Core Focus Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3 sm:gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-3.5 sm:gap-4"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
