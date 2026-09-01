import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Download, ArrowRight, ShieldCheck, Linkedin, Github, Globe, Check, Copy, Sparkles, Terminal, Award, Zap, Cpu, Database, Code2, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenShare?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenShare }) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  const roles = [
    "Mainframe Developer",
    "COBOL & JCL Specialist",
    "DB2 & VSAM Engineer",
    "Python & Full-Stack Builder"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="home" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/30 overflow-hidden">
      {/* Hero Interactive Background Graphics & Canvas Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle Tech Grid with Radial Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.16] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Role, Buttons & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left space-y-5 sm:space-y-6"
          >
            
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[11px] sm:text-xs font-semibold text-blue-800 w-fit max-w-full"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="truncate">Mainframe Developer at Capgemini (State Farm)</span>
            </motion.div>

            {/* Headline Section */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Hi,
              </div>
              <div className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                I'm <span className="text-blue-600">Mulagala Chaitanya</span>
              </div>
              <h2 className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight pt-1">
                Mainframe Developer & Engineer
              </h2>
            </div>

            {/* Brief Bio text */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Specialized in enterprise host architecture, batch processing, and DB2 database engineering with <strong className="text-slate-900 font-semibold">COBOL, JCL, DB2, and VSAM</strong>. Associate Team Leader with 1.5+ years of experience delivering zero-downtime client systems at Capgemini.
            </p>

            {/* Action Buttons with mobile friendly layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="min-h-[44px] flex items-center justify-center px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm transition shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 text-center"
              >
                Contact Me
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#works"
                className="min-h-[44px] flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold text-sm transition shadow-2xs text-center"
              >
                View Works
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#resume"
                className="min-h-[44px] flex items-center justify-center px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 font-semibold text-sm transition gap-1.5 text-center"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Social Icons at Bottom-Left */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 text-slate-700">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <motion.a
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition border border-slate-200 sm:border-transparent hover:border-blue-100"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition border border-slate-200 sm:border-transparent hover:border-blue-100"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.socials.email}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition border border-slate-200 sm:border-transparent hover:border-blue-100"
                  aria-label="Email"
                  title="Email"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.socials.phone}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition border border-slate-200 sm:border-transparent hover:border-blue-100"
                  aria-label="Phone"
                  title="Phone / WhatsApp"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>

                {onOpenShare && (
                  <motion.button
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenShare}
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl text-blue-600 bg-blue-50/80 hover:bg-blue-100 transition border border-blue-200/60"
                    aria-label="Share Link View"
                    title="Share Link & Preview Card"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                )}
              </div>

              <span className="hidden sm:block h-4 w-px bg-slate-200" />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={copyEmail}
                className="min-h-[40px] text-xs font-mono text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/60 px-3 py-2 rounded-xl border border-slate-200 w-full sm:w-auto justify-center"
                title="Click to copy email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{personalInfo.email}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Reference Blue Blob with Cutout Portrait & Floating Badges */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[270px] min-[380px]:w-[310px] sm:w-[380px] lg:w-[460px] aspect-square flex items-center justify-center"
            >
              
              {/* Concentric Tech Orbit Rings & Graphic Accents */}
              <div className="absolute -inset-6 sm:-inset-10 -z-10 pointer-events-none flex items-center justify-center">
                <div className="w-[115%] h-[115%] rounded-full border border-blue-200/50 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[130%] h-[130%] rounded-full border border-slate-200/40" />
                <div className="absolute top-2 sm:top-4 left-1/4 w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-400 animate-ping opacity-60" />
                <div className="absolute bottom-6 sm:bottom-12 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-500" />
              </div>

              {/* Soft background ambient glow with pulse animation */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.35, 0.25]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 sm:-inset-6 bg-blue-500/30 blur-3xl -z-10 rounded-full"
              />

              {/* The Blue Curved Container with overflow-hidden */}
              <div
                className="relative w-full h-full bg-blue-600 overflow-hidden flex items-end justify-center shadow-2xl shadow-blue-600/30 transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  borderRadius: '50%',
                }}
              >
                <img
                  src={personalInfo.cutoutPhoto || personalInfo.photo}
                  alt="Mulagala Chaitanya"
                  referrerPolicy="no-referrer"
                  className="w-[88%] sm:w-[84%] h-auto max-h-[105%] object-contain object-bottom select-none pointer-events-none translate-y-1 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Capgemini State Farm Verified Badge */}
              <motion.div
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-2 left-0 sm:-left-3 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100/90 flex items-center gap-2 sm:gap-3 z-20 hover:scale-105 transition-transform max-w-[200px] sm:max-w-none"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug truncate">Capgemini Certified</div>
                  <div className="text-[9px] sm:text-[11px] text-blue-600 font-mono font-medium leading-snug truncate">Excellence Award</div>
                </div>
              </motion.div>

              {/* Floating Leadership & Performance Badge */}
              <motion.div
                animate={{
                  y: [0, 6, 0]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-3 -right-1 sm:-right-4 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100/90 flex items-center gap-2 sm:gap-3 z-20 hover:scale-105 transition-transform max-w-[200px] sm:max-w-none"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug truncate">Associate Team Lead</div>
                  <div className="text-[9px] sm:text-[11px] text-blue-600 font-mono font-medium leading-snug truncate">1.5+ Yrs Experience</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Quick Highlights Bar with Stagger Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {personalInfo.quickStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className={`text-left p-3 sm:p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors flex flex-col justify-between ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="text-lg min-[400px]:text-xl sm:text-2xl font-extrabold text-blue-600 font-mono tracking-tight whitespace-nowrap leading-none mb-1.5 sm:mb-2">
                {stat.value}
              </div>
              <div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-tight leading-snug">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-snug mt-0.5 truncate" title={stat.subtext}>
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
