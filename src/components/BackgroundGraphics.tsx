import React from 'react';
import { motion } from 'motion/react';

export const BackgroundGraphics: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Global Subtle Architectural Tech Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="global-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#0284c7"
              strokeWidth="0.75"
            />
            <circle cx="0" cy="0" r="1.5" fill="#2563eb" />
          </pattern>
          <radialGradient id="fade-mask" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </radialGradient>
          <mask id="global-mask">
            <rect width="100%" height="100%" fill="url(#fade-mask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#global-grid-pattern)"
          mask="url(#global-mask)"
        />
      </svg>

      {/* 2. Soft Ambient Gradient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-blue-400/12 via-indigo-300/8 to-transparent blur-3xl" />
      <div className="absolute top-[30%] -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-400/10 via-blue-300/8 to-transparent blur-3xl" />
      <div className="absolute top-[65%] -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-400/10 via-purple-300/6 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-t from-blue-400/10 via-sky-200/5 to-transparent blur-3xl" />

      {/* 3. Floating Engineering Geometric Circuit Elements */}
      <div className="absolute top-24 left-[8%] hidden xl:block opacity-25">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="60" cy="60" r="30" stroke="#60a5fa" strokeWidth="1" />
          <path d="M60 10 V30 M60 90 V110 M10 60 H30 M90 60 H110" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="4" fill="#3b82f6" />
        </svg>
      </div>

      <div className="absolute top-[45%] right-[5%] hidden lg:block opacity-20">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M40 80 H120 M80 40 V120" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="80" cy="80" r="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="40" cy="80" r="3" fill="#2563eb" />
          <circle cx="120" cy="80" r="3" fill="#2563eb" />
          <circle cx="80" cy="40" r="3" fill="#2563eb" />
          <circle cx="80" cy="120" r="3" fill="#2563eb" />
        </svg>
      </div>

      <div className="absolute top-[80%] left-[4%] hidden lg:block opacity-20">
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50 L40 20 H100 L130 50 L100 80 H40 Z" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="70" cy="50" r="16" stroke="#60a5fa" strokeWidth="1" />
          <circle cx="70" cy="50" r="3" fill="#2563eb" />
        </svg>
      </div>

      {/* 4. Ambient Mainframe & Code Syntax Watermarks */}
      <div className="absolute top-[18%] right-[15%] hidden 2xl:block opacity-[0.04] select-none font-mono text-sm text-blue-900 font-bold leading-loose">
        <div>// EXEC PGM=IKJEFT01</div>
        <div>// SYSTSPRT DD SYSOUT=*</div>
        <div>// SYSTSIN  DD *</div>
        <div>  DSN SYSTEM(DB2P)</div>
      </div>

      <div className="absolute top-[55%] left-[2%] hidden 2xl:block opacity-[0.04] select-none font-mono text-sm text-blue-900 font-bold leading-loose">
        <div>01  POLICY-RECORD.</div>
        <div>    05  POL-ID       PIC X(10).</div>
        <div>    05  POL-AMOUNT   PIC 9(7)V99.</div>
        <div>    05  POL-STATUS   PIC X(01).</div>
      </div>
    </div>
  );
};
