import React, { useState } from 'react';
import { Eye, Sliders, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import dehazeImg from '../assets/images/project_dehaze_1788232080586.jpg';

export const DehazeSimulator: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [showDustBoxes, setShowDustBoxes] = useState<boolean>(true);
  const [contrastBoost, setContrastBoost] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const recompute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header Controls */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            Interactive Image Dehazing & Dust Detection Visualizer
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDustBoxes(!showDustBoxes)}
            className={`px-2.5 py-1 rounded text-xs transition border flex items-center gap-1.5 ${
              showDustBoxes
                ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Dust Particle Boxes: {showDustBoxes ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setContrastBoost(!contrastBoost)}
            className={`px-2.5 py-1 rounded text-xs transition border flex items-center gap-1.5 ${
              contrastBoost
                ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            CLAHE Contrast: {contrastBoost ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Comparison Canvas / Split View */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-950 overflow-hidden select-none">
        {/* Restored (Right/Underlying) Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={dehazeImg}
            alt="Dehazed Restored View"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${contrastBoost ? 'contrast-125 saturate-110' : ''}`}
          />
          <div className="absolute bottom-4 right-4 bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-emerald-300 font-mono text-xs font-semibold shadow-lg">
            ✓ Restored (Dehazed Radiance)
          </div>
        </div>

        {/* Degraded / Hazy (Left / Masked) Image */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="w-full h-full relative" style={{ width: '100vw', maxWidth: '800px' }}>
            <img
              src={dehazeImg}
              alt="Hazy Input View"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover blur-[0.8px] brightness-125 contrast-60 opacity-90 sepia-[0.15]"
            />
            {/* Simulated Haze Layer */}
            <div className="absolute inset-0 bg-slate-200/25 backdrop-blur-[1px] mix-blend-screen pointer-events-none" />

            <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 backdrop-blur-md px-3 py-1.5 rounded-lg text-amber-200 font-mono text-xs font-semibold shadow-lg">
              ⚠ Raw Input (Atmospheric Haze)
            </div>
          </div>
        </div>

        {/* Simulated Dust Particle Bounding Boxes */}
        {showDustBoxes && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[28%] left-[22%] border-2 border-amber-400/80 bg-amber-400/10 px-1 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold shadow animate-pulse">
              Dust Artifact [p=0.96]
            </div>
            <div className="absolute top-[62%] left-[45%] border-2 border-amber-400/80 bg-amber-400/10 px-1 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold shadow animate-pulse">
              Particulate [p=0.91]
            </div>
            <div className="absolute top-[40%] right-[25%] border-2 border-amber-400/80 bg-amber-400/10 px-1 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold shadow animate-pulse">
              Lens Blemish [p=0.88]
            </div>
          </div>
        )}

        {/* Center Split Slider Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 border-2 border-white shadow-xl flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <span className="text-slate-950 font-bold text-xs">⟷</span>
        </div>
      </div>

      {/* Range Slider Control */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Hazy Input ({sliderPosition}%)</span>
          <span className="font-mono text-cyan-400 font-semibold">
            Slide to inspect before/after restoration
          </span>
          <span>Restored Output ({100 - sliderPosition}%)</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        {/* Quality Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
          <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">PSNR Value</div>
            <div className="text-sm font-bold text-emerald-400">28.42 dB</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">SSIM Index</div>
            <div className="text-sm font-bold text-cyan-400">0.942 / 1.0</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Contrast Gain</div>
            <div className="text-sm font-bold text-indigo-400">+42.5%</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Dust Detected</div>
            <div className="text-sm font-bold text-amber-400">3 Particulates</div>
          </div>
        </div>
      </div>
    </div>
  );
};
