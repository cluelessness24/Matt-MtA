/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewStats } from './components/OverviewStats';
import { WardElectionResults } from './components/WardElectionResults';
import { PrecinctBreakdown } from './components/PrecinctBreakdown';
import { AdvocacySentiment } from './components/AdvocacySentiment';
import { PlatformAlignmentMatrix } from './components/PlatformAlignmentMatrix';
import { FutureScenarios } from './components/FutureScenarios';
import { StrategicPlaybook } from './components/StrategicPlaybook';
import { StrategyMemoModal } from './components/StrategyMemoModal';
import { FutureContestId } from './types/election';
import {
  BarChart3,
  Layers,
  TrendingUp,
  Compass,
  SlidersHorizontal,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('results');
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [simulatorContest, setSimulatorContest] = useState<FutureContestId>('council_2028');

  const handleOpenSimulator = () => {
    setActiveTab('future');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMemo={() => setIsMemoOpen(true)}
        onToggleSimulator={handleOpenSimulator}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Hero Context Header */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>City of Melton · Mount Atkinson Ward · Political Intelligence</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Electoral Analysis: Mount Atkinson Ward & Matt Pearse Strategic Assessment
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Examine the official 2024 Victorian Local Government election data, Matt Pearse's 26.6% grassroots primary performance,
              how his aggressive infrastructure advocacy reshaped local voter sentiment, and modeled pathways for upcoming
              State (Melton), Federal (Hawke), and Council (2028) contests.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                VEC Certified Returns (Nov 2024)
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">11,438 Electors Enrolled</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">78.3% Turnout</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsMemoOpen(true)}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
              >
                Read Strategic Briefing Memo
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* High-Impact Top Stats */}
        <section>
          <OverviewStats />
        </section>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'results', label: 'Ward Results & Preferences', icon: BarChart3 },
            { id: 'precincts', label: 'Precinct & Booth Breakdown', icon: Layers },
            { id: 'advocacy', label: 'Advocacy & Voter Sentiment', icon: TrendingUp },
            { id: 'platform', label: 'Platform Alignment Matrix', icon: Compass },
            { id: 'future', label: 'Strategic Contest Modeling (Melton / Hawke / 2028)', icon: SlidersHorizontal },
            { id: 'playbook', label: 'Voter Coalition Playbook', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <section className="transition-opacity duration-300">
          {activeTab === 'results' && <WardElectionResults />}
          {activeTab === 'precincts' && <PrecinctBreakdown />}
          {activeTab === 'advocacy' && <AdvocacySentiment />}
          {activeTab === 'platform' && <PlatformAlignmentMatrix />}
          {activeTab === 'future' && <FutureScenarios initialContest={simulatorContest} />}
          {activeTab === 'playbook' && <StrategicPlaybook />}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950 py-8 px-4 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Mt Atkinson Electoral Intelligence Unit</span>
            <span aria-hidden="true">·</span>
            <span>Data compiled from Victorian Electoral Commission (VEC) official declarations</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => { setActiveTab('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-400 transition-colors"
            >
              Election Results
            </button>
            <button
              onClick={() => { setActiveTab('future'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-400 transition-colors"
            >
              2026/2028 Modeling
            </button>
            <button
              onClick={() => setIsMemoOpen(true)}
              className="hover:text-amber-400 transition-colors text-amber-400 font-medium"
            >
              Executive Memo
            </button>
          </div>
        </div>
      </footer>

      {/* Strategic Memorandum Modal */}
      <StrategyMemoModal isOpen={isMemoOpen} onClose={() => setIsMemoOpen(false)} />
    </div>
  );
}
