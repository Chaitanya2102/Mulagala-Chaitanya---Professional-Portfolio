import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, ShieldCheck, Linkedin, Github, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 py-12 text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3 text-left">
            <img
              src={personalInfo.photo}
              alt="Mulagala Chaitanya"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/20 shadow-2xs"
            />
            <div>
              <div className="font-bold text-sm text-slate-900">{personalInfo.name}</div>
              <div className="text-[11px] text-blue-600 font-semibold">
                Mainframe Developer • Capgemini India (State Farm)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#home" className="hover:text-blue-600 transition">Home</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#skills" className="hover:text-blue-600 transition">Skills</a>
            <a href="#works" className="hover:text-blue-600 transition">Works</a>
            <a href="#resume" className="hover:text-blue-600 transition">Resume</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition shadow-2xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Mulagala Chaitanya. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with React, TypeScript & Tailwind CSS</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Ready for Production
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
