import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, PieChart, Layers, ArrowUpRight } from 'lucide-react';

export const SalesForecastCalculator: React.FC = () => {
  const [marketingBudget, setMarketingBudget] = useState<number>(25000);
  const [season, setSeason] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q4');
  const [economicIndex, setEconomicIndex] = useState<number>(1.05);

  const seasonalWeights = {
    Q1: 0.92, // Post-holiday trough
    Q2: 1.04, // Spring surge
    Q3: 1.12, // Summer demand
    Q4: 1.38  // Holiday peak & retail quarter
  };

  const baseSales = 120000;
  const marketingCoefficient = 1.85;
  const marketingContribution = marketingBudget * marketingCoefficient;
  const rawForecast = (baseSales + marketingContribution) * seasonalWeights[season] * economicIndex;
  const projectedRevenue = Math.round(rawForecast);
  const projectedProfit = Math.round(projectedRevenue * 0.28);
  const yoyGrowth = (((projectedRevenue - 180000) / 180000) * 100).toFixed(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            Interactive ML Sales Forecasting & DAX Measure Simulator
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
          Power BI DAX Connected
        </span>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="text-slate-300 font-medium">Monthly Marketing Spend ($)</label>
              <span className="font-mono text-cyan-300 font-bold">${marketingBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="60000"
              step="2500"
              value={marketingBudget}
              onChange={e => setMarketingBudget(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>$5,000 (Baseline)</span>
              <span>$60,000 (Aggressive)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-medium mb-1.5">Seasonality Quarter</label>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map(q => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSeason(q)}
                  className={`p-2 rounded-lg border text-center transition ${
                    season === q
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold ring-1 ring-cyan-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>{q}</div>
                  <div className="text-[10px] opacity-75">{seasonalWeights[q]}x Wt</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-medium mb-1.5">Economic Indicator Index</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { label: 'Recessionary (0.90x)', val: 0.90 },
                { label: 'Stable (1.00x)', val: 1.00 },
                { label: 'Bullish (1.05x)', val: 1.05 }
              ].map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setEconomicIndex(opt.val)}
                  className={`p-2 rounded-lg border text-left text-[11px] transition ${
                    economicIndex === opt.val
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live DAX Output & KPI Visualizer */}
        <div className="lg:col-span-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-cyan-400" />
                Forecasted Revenue
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                ${projectedRevenue.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {Number(yoyGrowth) >= 0 ? `+${yoyGrowth}%` : `${yoyGrowth}%`} vs Last Year
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                Projected Net Margin
              </div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                ${projectedProfit.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                ~28.0% EBITDA Margin
              </div>
            </div>
          </div>

          {/* Simple Visual Projection Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-mono text-slate-400">Model Component Contribution:</div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-slate-300">
                <span>Base Core Revenue:</span>
                <span>${baseSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-cyan-400">
                <span>Marketing Pipeline Lift:</span>
                <span>+${Math.round(marketingContribution).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-indigo-400">
                <span>Seasonal Multiplier ({season}):</span>
                <span>{seasonalWeights[season]}x</span>
              </div>
            </div>

            {/* Visual Bar Indicator */}
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800">
              <div className="bg-slate-600 h-full" style={{ width: '45%' }} title="Base Sales" />
              <div className="bg-cyan-500 h-full" style={{ width: `${Math.min(45, (marketingBudget / 60000) * 45)}%` }} title="Marketing Lift" />
              <div className="bg-indigo-500 h-full flex-1" title="Seasonality Impact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
