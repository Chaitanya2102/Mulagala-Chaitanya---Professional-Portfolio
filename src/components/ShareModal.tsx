import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  Send,
  Sparkles,
  Globe,
  CheckCircle2,
  Eye,
  Layers
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'social' | 'whatsapp' | 'twitter'>('social');

  if (!isOpen) return null;

  const portfolioUrl = window.location.origin || 'https://mulagalachaitanya.vercel.app';
  const shareTitle = `Mulagala Chaitanya — Mainframe Developer & Software Engineer`;
  const shareSummary = `Explore the portfolio of Mulagala Chaitanya: Mainframe Developer at Capgemini & Software Engineer specializing in COBOL, JCL, DB2, VSAM enterprise systems, batch processing, and full-stack solutions.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'bg-[#0f1419] hover:bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle + '\n' + shareSummary)}&url=${encodeURIComponent(portfolioUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20b858] text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' — ' + portfolioUrl)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] hover:bg-[#1c80b0] text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(portfolioUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-slate-800 hover:bg-slate-900 text-white',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareSummary + '\n\nVisit: ' + portfolioUrl)}`
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 id="share-modal-title" className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                Share Portfolio & Link View
              </h3>
              <p className="text-xs text-slate-500">
                Verified Open Graph social share preview & direct sharing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition border border-slate-200"
            aria-label="Close share modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Quick Copy Link Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
            <div className="text-[11px] font-mono text-blue-800 font-semibold uppercase tracking-wider flex items-center justify-between">
              <span>Portfolio Web Link</span>
              <span className="text-emerald-700 font-sans font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live & Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 truncate shadow-2xs">
                {portfolioUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="min-h-[38px] px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm shadow-blue-600/20 shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Platform Share Buttons */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2.5">
              One-Click Share to Socials & Messengers
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {shareLinks.map(link => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`min-h-[40px] px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs ${link.color}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Share View Preview Card (Attached Screenshot Banner) */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Link Share Preview Card</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPreviewTab('social')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    previewTab === 'social'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  LinkedIn / Rich
                </button>
                <button
                  onClick={() => setPreviewTab('whatsapp')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    previewTab === 'whatsapp'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setPreviewTab('twitter')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    previewTab === 'twitter'
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Twitter / X
                </button>
              </div>
            </div>

            {/* Visual Social Card Simulation */}
            <div className="bg-slate-100/80 p-3 sm:p-4 rounded-2xl border border-slate-200">
              {previewTab === 'social' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-lg mx-auto">
                  <div className="relative aspect-[1200/630] bg-slate-900 overflow-hidden">
                    <img
                      src={personalInfo.linkViewBanner || "/og-image.png"}
                      alt="Mulagala Chaitanya Social Preview Card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-slate-50/90 border-t border-slate-100">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      mulagalachaitanya.vercel.app
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      Mulagala Chaitanya - Professional Portfolio
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      Mainframe Developer at Capgemini & Software Engineer. COBOL, JCL, DB2, VSAM, Full-Stack.
                    </div>
                  </div>
                </div>
              )}

              {previewTab === 'whatsapp' && (
                <div className="bg-[#DCF8C6] text-slate-900 rounded-2xl rounded-tl-xs p-3 shadow-xs max-w-md mx-auto space-y-2 border border-emerald-200">
                  <div className="bg-white/80 rounded-xl overflow-hidden border border-emerald-100 shadow-2xs">
                    <img
                      src={personalInfo.linkViewBanner || "/og-image.png"}
                      alt="WhatsApp Share Preview"
                      className="w-full aspect-[1200/630] object-cover"
                    />
                    <div className="p-2.5 bg-white">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Mulagala Chaitanya - Professional Portfolio
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                        Mainframe Developer & Software Engineer. Enterprise host architecture, batch processing & DB2 database systems.
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        mulagalachaitanya.vercel.app
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-800 leading-relaxed font-medium">
                    Check out Mulagala Chaitanya's official developer portfolio: {portfolioUrl}
                  </div>
                </div>
              )}

              {previewTab === 'twitter' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-md mx-auto">
                  <div className="relative aspect-[1200/630] overflow-hidden bg-slate-900">
                    <img
                      src={personalInfo.linkViewBanner || "/og-image.png"}
                      alt="Twitter Card Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="text-[10px] text-slate-500 font-mono">
                      mulagalachaitanya.vercel.app
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      Mulagala Chaitanya - Professional Portfolio
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                      Mainframe Developer & Software Engineer | Capgemini Associate Team Lead
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Open / Download OpenGraph Banner action */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-slate-500">
                Banner Dimension: <strong>1200 × 630 px (16:9)</strong>
              </span>
              <a
                href={personalInfo.linkViewBanner || "/og-image.png"}
                download="Mulagala_Chaitanya_Link_View.png"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Preview Banner</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Fully configured for Vercel, LinkedIn, Twitter & WhatsApp sharing</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition shadow-2xs cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
