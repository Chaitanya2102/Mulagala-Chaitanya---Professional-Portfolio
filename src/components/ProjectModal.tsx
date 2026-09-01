import React, { useState } from 'react';
import { Project } from '../types';
import { X, Sparkles, Terminal, Code2, Layers, CheckCircle2, Copy, Check, Calendar, Building, Cpu } from 'lucide-react';
import { MainframeSimulator } from './MainframeSimulator';
import { DehazeSimulator } from './DehazeSimulator';
import { TourBookingSimulator } from './TourBookingSimulator';
import { SalesForecastCalculator } from './SalesForecastCalculator';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'architecture' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative p-6 sm:p-7 bg-slate-50 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition border border-slate-200 shadow-2xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-700">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {project.clientOrContext}
            </span>
            {project.duration && (
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {project.duration}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {project.subtitle}
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 -mb-6 sm:-mb-7 overflow-x-auto pb-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Project Overview
            </button>

            <button
              onClick={() => setActiveTab('demo')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              Interactive Demo & Simulator
            </button>

            {project.architecture && (
              <button
                onClick={() => setActiveTab('architecture')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-4 h-4" />
                System Flow
              </button>
            )}

            {project.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Code Implementation
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500 uppercase font-mono">{metric.label}</div>
                      <div className="text-base sm:text-lg font-bold text-blue-600 mt-0.5">{metric.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Core Implementation & Responsibilities
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {project.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Technical Highlights */}
              <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 space-y-2">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                  {project.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE DEMO */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Interactive simulation environment for {project.title}</span>
                <span className="font-mono text-blue-600 font-semibold">Live Component State</span>
              </div>

              {project.demoType === 'mainframe-console' && <MainframeSimulator />}
              {project.demoType === 'dehaze-slider' && <DehazeSimulator />}
              {project.demoType === 'booking-simulator' && <TourBookingSimulator />}
              {project.demoType === 'sales-calculator' && <SalesForecastCalculator />}
            </div>
          )}

          {/* TAB 3: ARCHITECTURE */}
          {activeTab === 'architecture' && project.architecture && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <strong className="text-blue-600 block mb-1 font-mono uppercase text-xs font-bold">Architectural Design Pattern:</strong>
                {project.architecture.overview}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-3">
                  Step-by-Step Data Flow & Execution Pipeline
                </h4>
                <div className="space-y-2.5">
                  {project.architecture.flowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CODE IMPLEMENTATION */}
          {activeTab === 'code' && project.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 rounded-t-2xl border border-slate-800">
                <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  {project.codeSnippet.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-5 bg-[#0b1120] text-blue-300 font-mono text-xs overflow-x-auto rounded-b-2xl border border-t-0 border-slate-800 max-h-[380px] leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono">Mulagala Chaitanya • Project Portfolio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 transition font-semibold"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
