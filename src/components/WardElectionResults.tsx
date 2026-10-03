import React, { useState } from 'react';
import { CANDIDATES, PREFERENCE_DISTRIBUTION_STEPS, WARD_ELECTION_SUMMARY } from '../data/electionData';
import { CheckCircle2, ChevronRight, Info, User, HelpCircle, Layers, TrendingUp, AlertTriangle } from 'lucide-react';

export const WardElectionResults: React.FC = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('pearse');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4); // default to final count

  const selectedCandidate = CANDIDATES.find((c) => c.id === selectedCandidateId) || CANDIDATES[1];
  const activeStep = PREFERENCE_DISTRIBUTION_STEPS[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Ward Declaration Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{WARD_ELECTION_SUMMARY.lga}</span>
            <span aria-hidden="true">·</span>
            <span>Election Date: {WARD_ELECTION_SUMMARY.date}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">VEC Certified Result</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Mount Atkinson Ward — Declaration of Council Election Results
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            First election conducted under Melton City Council's new single-member ward structure (10 single wards). 
            Total enrolment was <span className="text-white font-mono font-medium">11,438</span> with 
            a participation rate of <span className="text-white font-mono font-medium">{WARD_ELECTION_SUMMARY.turnoutPercent}%</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 block">Formal Ballots:</span>
            <span className="text-white font-mono font-bold text-sm">
              {WARD_ELECTION_SUMMARY.formalVotes.toLocaleString()} ({WARD_ELECTION_SUMMARY.formalPercent}%)
            </span>
          </div>
          <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 block">Informal Rate:</span>
            <span className="text-amber-400 font-mono font-bold text-sm">
              {WARD_ELECTION_SUMMARY.informalVotes} ({WARD_ELECTION_SUMMARY.informalPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Primary Vote Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Candidate Ranking & Primary Vote Bars */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-white">First Preference Primary Vote Breakdown</h3>
              <p className="text-xs text-slate-400">Total formal votes: 8,620 · Quota for instant victory: 4,311 votes (50% + 1)</p>
            </div>
            <span className="text-xs font-mono text-slate-400">6 Candidates Contested</span>
          </div>

          <div className="space-y-3">
            {CANDIDATES.map((candidate, idx) => {
              const isSelected = candidate.id === selectedCandidateId;
              const isPearse = candidate.id === 'pearse';
              const isZada = candidate.id === 'zada';

              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidateId(candidate.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-slate-500 w-4">#{idx + 1}</span>
                      <span className={`text-sm font-semibold ${isPearse ? 'text-amber-400' : isZada ? 'text-white' : 'text-slate-300'}`}>
                        {candidate.name}
                      </span>
                      {isZada && (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Elected
                        </span>
                      )}
                      {isPearse && (
                        <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                          Challenger #2
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:inline">{candidate.party}</span>
                      <span className="text-sm font-bold font-mono text-white tabular-nums">
                        {candidate.firstPreferenceVotes.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-slate-400 w-14 text-right tabular-nums">
                        {candidate.firstPreferencePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex items-center">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isZada
                          ? 'bg-blue-500'
                          : isPearse
                          ? 'bg-amber-400'
                          : 'bg-slate-600'
                      }`}
                      style={{ width: `${candidate.firstPreferencePercent}%` }}
                    />
                  </div>

                  {/* Micro subtext */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ballot Position: #{candidate.ballotPosition}</span>
                    <span>
                      {candidate.finalVotes > 0
                        ? `Final 2CP: ${candidate.finalVotes.toLocaleString()} (${candidate.finalPercent.toFixed(1)}%)`
                        : 'Eliminated during preference distribution'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparative Insight Box */}
          <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>Key Analytical Takeaway on Matt Pearse's Performance:</span>
            </div>
            <p className="leading-relaxed">
              Pearse achieved an outstanding <strong>26.57% primary vote (2,290 votes)</strong> as a grassroots independent
              with no party affiliation. He outpolled third-place Harpreet Singh Marwaha (10.99%) by more than 2.4-to-1,
              and gathered more votes than the 3rd, 4th, and 6th candidates combined (2,299 vs 2,290). This confirms
              Pearse as the undisputed leader of the community independent constituency in Mount Atkinson.
            </p>
          </div>
        </div>

        {/* Right Column: Candidate Profile Deep-Dive */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-semibold text-white">Candidate Diagnostic</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Ballot #{selectedCandidate.ballotPosition}</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white">{selectedCandidate.name}</h4>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedCandidate.party}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{selectedCandidate.affiliationType}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Primary Vote</span>
                <span className="text-base font-mono font-bold text-white">
                  {selectedCandidate.firstPreferenceVotes.toLocaleString()}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  ({selectedCandidate.firstPreferencePercent.toFixed(2)}%)
                </span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Final Tally (2CP)</span>
                <span className="text-base font-mono font-bold text-white">
                  {selectedCandidate.finalVotes > 0 ? selectedCandidate.finalVotes.toLocaleString() : 'Eliminated'}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  {selectedCandidate.finalPercent > 0 ? `(${selectedCandidate.finalPercent.toFixed(2)}%)` : 'Excluded'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1.5">Background & Mobilization:</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                {selectedCandidate.background}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1.5">Key Platform Commitments:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCandidate.keyIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Select any candidate on the left to inspect</span>
            <span className="font-mono">VEC ID: 2024-MELT-MTA</span>
          </div>
        </div>
      </div>

      {/* Interactive Preference Distribution Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-semibold text-white">
                VEC Preference Distribution & Elimination Flow
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Under Victoria's full preferential voting system, votes for eliminated candidates are redistributed
              according to secondary preferences until a candidate achieves an absolute majority (&gt;4,310 votes).
            </p>
          </div>

          {/* Count Stepper Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
            {PREFERENCE_DISTRIBUTION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeStepIndex === idx
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                Count {step.countNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Step Details */}
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                {activeStep.description}
              </span>
              <span className="text-sm font-bold text-white">
                {activeStep.candidateEliminated === 'None'
                  ? 'Initial Vote Verification'
                  : `Elimination of ${activeStep.candidateEliminated}`}
              </span>
            </div>
            {activeStep.transferredVotes > 0 && (
              <span className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                Transferred: {activeStep.transferredVotes.toLocaleString()} ballots
              </span>
            )}
          </div>

          {/* Tallies at this count */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(activeStep.tallies).map(([candName, votes]) => {
              const isZada = candName.includes('Zada');
              const isPearse = candName.includes('Pearse');
              const percent = (votes / 8620) * 100;

              return (
                <div
                  key={candName}
                  className={`p-3 rounded-lg border ${
                    isPearse
                      ? 'bg-amber-500/10 border-amber-500/40'
                      : isZada
                      ? 'bg-blue-500/10 border-blue-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <span className="text-[11px] text-slate-400 block truncate font-medium">{candName}</span>
                  <span className="text-lg font-bold font-mono text-white block my-1">
                    {votes.toLocaleString()}
                  </span>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{percent.toFixed(1)}%</span>
                    {votes >= 4311 && <span className="text-emerald-400 font-bold">Majority</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Count Notes */}
          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white">Count Analysis: </strong>
              {activeStep.notes}
            </div>
          </div>
        </div>

        {/* Why did Zada win preferences? Critical Analysis */}
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40 space-y-2">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Why did preferences flow decisively to Phillip Zada?
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The decisive moment occurred on <strong>Count 4</strong> with the elimination of Ranjit Singh (1,084 votes).
            Singh was also an Independent Labor candidate; his official how-to-vote cards recommended a preference for Zada.
            As a result, <strong>66.6% of Singh's votes (722 votes) transferred straight to Zada</strong>, instantly pushing Zada
            over the 50% majority threshold (4,516 votes) before the final exclusion of Marwaha.
            Pearse's campaign suffered from lack of a formal preference-sharing agreement with other independent candidates.
            In 2028, securing a pre-election preference compact with local community leaders will be essential to flip this dynamic.
          </p>
        </div>
      </div>
    </div>
  );
};
