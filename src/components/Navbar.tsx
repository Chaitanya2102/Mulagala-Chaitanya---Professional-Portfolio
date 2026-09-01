import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, Mail, FileText, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Works', href: '#works' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-3.5'
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo / Name matching full name */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition flex items-center gap-2"
            id="nav-logo"
          >
            <span>Mulagala Chaitanya</span>
          </a>

          {/* Desktop Navigation Links matching reference */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map(link => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId || (sectionId === 'home' && activeSection === 'hero');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-semibold transition pb-1.5 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm hover:shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 active:bg-slate-200 transition"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with Touch Friendly Spacing */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/10 space-y-1 animate-fade-in">
            {navLinks.map(link => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId || (sectionId === 'home' && activeSection === 'hero');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center min-h-[44px] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md shadow-blue-600/25 transition"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
