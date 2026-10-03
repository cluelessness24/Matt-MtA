import React, { useState } from 'react';
import { FUTURE_CONTESTS } from '../data/electionData';
import { FutureContestId } from '../types/election';
import {
  Compass,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  Target,
  Vote,
  Sparkles,
  HelpCircle,
  Shield,
  Layers,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface FutureScenariosProps {
  initialContest?: FutureContestId;
}

export const FutureScenarios: React.FC<FutureScenariosProps> = ({ initialContest = 'council_2028' }) => {
  const [selectedContestId, setSelectedContestId] = useState<FutureContestId>(initialContest);

  // Interactive Simulator Sliders
  const [primarySwing, setPrimarySwing] = useState<number>(5.5); // percentage point swing
  const [preferenceCaptureRate, setPreferenceCaptureRate] = useState<number>(60); // % of non-incumbent preferences
  const [incumbencyFatigue, setIncumbencyFatigue] = useState<'low' | 'moderate' | 'high'>('moderate');

  const contest = FUTURE_CONTESTS[selectedContestId];

  // Dynamic simulation calculations
  const calculateSimulatedResult = () => {
    if (selectedContestId === 'council_2028') {
      const basePrimary = 26.57;
      const simPrimary = Math.min(52, Math.max(15, basePrimary + primarySwing));
      const zadaBasePrimary = 40.12 - (incumbencyFatigue === 'high' ? 6 : incumbencyFatigue === 'moderate' ? 3 : 1);
      const remainingPool = Math.max(0, 100 - simPrimary - zadaBasePrimary);

      // preferences from other candidates
      const pearsePreferences = remainingPool * (preferenceCaptureRate / 100);
      const simulated2CP = simPrimary + pearsePreferences;
      const margin = simulated2CP - (100 - simulated2CP);
      const isWin = simulated2CP >= 50.0;

      return {
        simPrimary: simPrimary.toFixed(1),
        simulated2CP: simulated2CP.toFixed(1),
        incumbent2CP: (100 - simulated2CP).toFixed(1),
        margin: Math.abs(margin).toFixed(1),
        isWin,
        winProbability: Math.min(95, Math.max(10, Math.round(30 + primarySwing * 4.5 + (preferenceCaptureRate - 50) * 0.8))),
      };
    } else if (selectedContestId === 'state_melton') {
      const basePrimary = 12.0; // hypothetical starting independent baseline in Melton
      const simPrimary = Math.min(35, Math.max(8, basePrimary + primarySwing * 1.5));
      const laborPrimary = 38.5 - (incumbencyFatigue === 'high' ? 7 : incumbencyFatigue === 'moderate' ? 4 : 2);
      const liberalPrimary = 26.0;
      const beatsLiberal = simPrimary > liberalPrimary;

      // In State election, if independent beats Liberal into 2nd place:
      let simulated2PP = 0;
      if (beatsLiberal) {
        // Collects 75% of Liberal preferences + minor parties
        const preferences = (liberalPrimary * 0.78) + (100 - simPrimary - laborPrimary - liberalPrimary) * 0.65;
        simulated2PP = simPrimary + preferences;
      } else {
        // If 3rd place, excluded
        simulated2PP = simPrimary + 15; // not enough to win
      }

      const isWin = simulated2PP >= 50.0 && beatsLiberal;
      return {
        simPrimary: simPrimary.toFixed(1),
        simulated2CP: simulated2PP.toFixed(1),
        incumbent2CP: (100 - simulated2PP).toFixed(1),
        margin: Math.abs(simulated2PP - 50).toFixed(1),
        isWin,
        winProbability: beatsLiberal ? Math.min(85, Math.max(25, Math.round(50 + (simPrimary - 22) * 4))) : 22,
        beatsLiberal,
      };
    } else {
      // Federal Hawke
      const basePrimary = 8.5;
      const simPrimary = Math.min(28, Math.max(5, basePrimary + primarySwing));
      const laborPrimary = 41.0 - (incumbencyFatigue === 'high' ? 5 : 2);
      const liberalPrimary = 28.0;
      const beatsLiberal = simPrimary > liberalPrimary;
      const simulated2PP = beatsLiberal ? simPrimary + 28 : simPrimary + 12;
      const isWin = simulated2PP >= 50.0 && beatsLiberal;

      return {
        simPrimary: simPrimary.toFixed(1),
        simulated2CP: simulated2PP.toFixed(1),
        incumbent2CP: (100 - simulated2PP).toFixed(1),
        margin: Math.abs(simulated2PP - 50).toFixed(1),
        isWin,
        winProbability: Math.min(65, Math.max(5, Math.round(15 + primarySwing * 2))),
        beatsLiberal,
      };
    }
  };

  const simResult = calculateSimulatedResult();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Strategic Electoral Modeling & Feasibility Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Council 2028 vs State 2026 vs Federal Hawke</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Independent Pathway Analysis: Where Should Matt Pearse Run?
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          An in-depth empirical comparison evaluating Matt Pearse's viability across three distinct electoral arenas:
          retaking Mount Atkinson Ward in 2028, challenging the marginal State seat of Melton in 2026, or contesting the Federal seat of Hawke.
        </p>
      </div>

      {/* Contest Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.keys(FUTURE_CONTESTS) as FutureContestId[]).map((cid) => {
          const item = FUTURE_CONTESTS[cid];
          const isSelected = selectedContestId === cid;

          return (
            <div
              key={cid}
              onClick={() => setSelectedContestId(cid)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.level}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    item.feasibilityRating === 'Very High'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : item.feasibilityRating === 'Moderate / Battleground'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {item.feasibilityRating}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.divisionName}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target 2CP: {item.preferenceFlowTarget}%</span>
                <span className="text-amber-400 font-bold">{item.feasibilityScore}/100 Viability</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Contest Deep Diagnostic */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Next Expected Polling: {contest.nextExpectedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Electors: ~{contest.electorateSize.toLocaleString()}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {contest.title} — Strategic Feasibility Assessment
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Incumbent: <strong className="text-white">{contest.incumbent}</strong> ({contest.incumbentParty}) ·
              Current Margin: <strong className="text-white font-mono">{contest.currentMarginPercent}%</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[11px]">Primary Target:</span>
              <span className="text-white font-mono font-bold text-sm">{contest.primaryVoteTarget}%</span>
            </div>
            <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[11px]">Estimated Campaign War Chest:</span>
              <span className="text-amber-400 font-mono font-bold text-sm">{contest.estimatedBudgetRequired}</span>
            </div>
          </div>
        </div>

        {/* Detailed Strategic Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column: Advantages & Assets */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Key Strategic Advantages for Pearse:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {contest.strategicAdvantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Hazards & Risk Factors */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Structural Headwinds & Campaign Hazards:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {contest.strategicRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">⚠</span>
                  <span className="leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pathway to Victory Playbook */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 space-y-2">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            Empirical Pathway to Victory:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {contest.pathwayToVictory}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-medium">Critical Voter Precincts:</span>
            {contest.keyVoterBattlegrounds.map((b, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[11px]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Swing & Scenario Simulator Engine */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-semibold text-white">
                Live Electoral Swing & Preference Simulator ({contest.title})
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Adjust campaign swing parameters below to observe real-time projected outcomes and win thresholds.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-400 font-mono">
            Interactive Modeling Engine
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Slider 1: Primary Swing */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Primary Vote Shift:</span>
              <span className="font-mono font-bold text-amber-400">
                {primarySwing >= 0 ? `+${primarySwing}%` : `${primarySwing}%`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="15"
              step="0.5"
              value={primarySwing}
              onChange={(e) => setPrimarySwing(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-5.0% Loss</span>
              <span>Baseline</span>
              <span>+15.0% Surge</span>
            </div>
          </div>

          {/* Slider 2: Preference Capture */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Preference Harvest Rate:</span>
              <span className="font-mono font-bold text-amber-400">{preferenceCaptureRate}%</span>
            </div>
            <input
              type="range"
              min="35"
              max="80"
              step="1"
              value={preferenceCaptureRate}
              onChange={(e) => setPreferenceCaptureRate(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>35% (Weak)</span>
              <span>60% (Coordinated)</span>
              <span>80% (Locked Bloc)</span>
            </div>
          </div>

          {/* Selector 3: Major Party Fatigue */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Anti-Incumbent Sentiment:</span>
              <span className="font-mono font-bold capitalize text-amber-400">{incumbencyFatigue}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              {(['low', 'moderate', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setIncumbencyFatigue(lvl)}
                  className={`py-1 text-xs font-semibold rounded capitalize transition-colors ${
                    incumbencyFatigue === lvl
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-center">
              {incumbencyFatigue === 'high' ? 'High voter backlash against delays' : 'Normal electoral environment'}
            </div>
          </div>
        </div>

        {/* Real-Time Simulated Tally Card */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Projected Outcome Under These Conditions
            </span>
            <div className="flex items-center gap-3">
              <h4
                className={`text-2xl font-black tracking-tight ${
                  simResult.isWin ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {simResult.isWin ? 'Pearse Victory Projected' : 'Challenger Deficit — Close Contest'}
              </h4>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-mono font-bold ${
                  simResult.isWin
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {simResult.winProbability}% Win Probability
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Projected Primary: <strong className="text-white font-mono">{simResult.simPrimary}%</strong> ·
              Simulated 2CP/2PP: <strong className="text-white font-mono">{simResult.simulated2CP}%</strong> vs
              Incumbent <strong className="text-white font-mono">{simResult.incumbent2CP}%</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center px-4 py-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-500 block">Pearse 2CP</span>
              <span className="text-xl font-mono font-bold text-amber-400">{simResult.simulated2CP}%</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-500 block">Incumbent</span>
              <span className="text-xl font-mono font-bold text-blue-400">{simResult.incumbent2CP}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
