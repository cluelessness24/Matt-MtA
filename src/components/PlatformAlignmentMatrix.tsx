import React, { useState } from 'react';
import { VOTER_SENTIMENT_METRICS } from '../data/electionData';
import { Check, X, Sliders, Target, HelpCircle, BarChart2, ShieldAlert } from 'lucide-react';

export const PlatformAlignmentMatrix: React.FC = () => {
  const [sortField, setSortField] = useState<'importance' | 'pearse' | 'council'>('importance');

  const issues = [...VOTER_SENTIMENT_METRICS.topIssueRankings].sort((a, b) => {
    if (sortField === 'importance') return b.importanceScore - a.importanceScore;
    if (sortField === 'pearse') return b.pearseScore - a.pearseScore;
    return b.councilScore - a.councilScore;
  });

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Policy & Community Needs Audit</span>
          <span aria-hidden="true">·</span>
          <span>Community Survey Overlay (Mt Atkinson & Truganina Corridor)</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Platform Alignment with Local Community Grievances
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Detailed alignment scorecard benchmarking Matt Pearse's platform against local voter priorities
          compared to Melton City Council's institutional delivery record.
        </p>
      </div>

      {/* Sorting / View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-slate-400">
          Showing 6 prioritized municipal growth pillars
        </span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Sort by:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setSortField('importance')}
              className={`px-2.5 py-1 rounded transition-colors ${
                sortField === 'importance' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Community Urgency
            </button>
            <button
              onClick={() => setSortField('pearse')}
              className={`px-2.5 py-1 rounded transition-colors ${
                sortField === 'pearse' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pearse Match
            </button>
            <button
              onClick={() => setSortField('council')}
              className={`px-2.5 py-1 rounded transition-colors ${
                sortField === 'council' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Council Record
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Local Community Issue</th>
                <th className="py-3.5 px-4 text-center">Community Priority</th>
                <th className="py-3.5 px-4">Pearse Platform Alignment</th>
                <th className="py-3.5 px-4">Council / Incumbent Delivery</th>
                <th className="py-3.5 px-4 text-right">Alignment Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {issues.map((item, idx) => {
                const gap = item.pearseScore - item.councilScore;
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white text-sm">{item.issue}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.pearseScore >= 90 ? 'Direct core campaign focus' : 'Secondary policy priority'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded font-mono font-bold text-xs bg-slate-950 border border-slate-800 text-amber-400">
                        {item.importanceScore} / 100
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-amber-400 font-bold">{item.pearseScore}% Match</span>
                          <span className="text-slate-400">High Responsiveness</span>
                        </div>
                        <div className="w-36 sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${item.pearseScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-300 font-bold">{item.councilScore}% Satisfaction</span>
                          <span className="text-slate-500">Delivery Lag</span>
                        </div>
                        <div className="w-36 sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full ${item.councilScore > 60 ? 'bg-blue-500' : 'bg-rose-500'}`}
                            style={{ width: `${item.councilScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 rounded text-xs">
                        +{gap}% Advantage
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Why Alignment Didn't Automatically Win on Day 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            Where Pearse's Alignment Was Highest:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pearse's highest congruence occurred with young working families experiencing <strong>commuter gridlock</strong> and 
            <strong> school placement shortages</strong>. These residents live in newly developed estates where everyday life is disrupted
            by Hopkins Road traffic and infrequent buses. For these voters, Pearse's message was 100% in sync with their lived reality.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            The Electoral Deficit: Machinery vs Policy Alignment:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            While Pearse won the policy debate, Phillip Zada won the <strong>campaign machinery contest</strong>.
            Zada captured the pre-poll/postal vote through disciplined early mobilization, secured preferential support
            from fellow Labor candidates (Ranjit Singh), and appealed to established township residents in Rockbank who prioritize
            general council stability over acute growth-corridor friction.
          </p>
        </div>
      </div>
    </div>
  );
};
