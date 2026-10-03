import React from 'react';
import { WARD_ELECTION_SUMMARY, CANDIDATES } from '../data/electionData';
import { Vote, Users, Target, ArrowUpRight, Award, ShieldAlert } from 'lucide-react';

export const OverviewStats: React.FC = () => {
  const pearse = CANDIDATES.find((c) => c.id === 'pearse')!;
  const zada = CANDIDATES.find((c) => c.id === 'zada')!;

  const stats = [
    {
      label: 'Formal Turnout (VEC Declared)',
      value: `${WARD_ELECTION_SUMMARY.turnoutPercent.toFixed(1)}%`,
      subtext: `${WARD_ELECTION_SUMMARY.formalVotes.toLocaleString()} formal of ${WARD_ELECTION_SUMMARY.enrolment.toLocaleString()} enrolled`,
      badge: 'High suburban engagement',
      icon: Users,
    },
    {
      label: 'Matt Pearse Primary Vote',
      value: `${pearse.firstPreferencePercent.toFixed(2)}%`,
      subtext: `${pearse.firstPreferenceVotes.toLocaleString()} primary votes (Rank #2 of 6)`,
      badge: 'Strong grassroots base',
      icon: Vote,
      highlight: true,
    },
    {
      label: 'Phillip Zada (Elected)',
      value: `${zada.firstPreferencePercent.toFixed(2)}%`,
      subtext: `${zada.firstPreferenceVotes.toLocaleString()} primary · 5,353 (62.1%) 2CP`,
      badge: 'Labor machine backing',
      icon: Award,
    },
    {
      label: 'Pearse Two-Candidate Preferred',
      value: `${pearse.finalPercent.toFixed(2)}%`,
      subtext: `${pearse.finalVotes.toLocaleString()} votes (+977 preference distribution)`,
      badge: 'Solid challenger ceiling',
      icon: Target,
    },
    {
      label: 'Non-Labor / Independent Pool',
      value: '48.9%',
      subtext: '4,216 combined primary votes across 4 non-Labor candidates',
      badge: 'High fragmentation',
      icon: ShieldAlert,
    },
    {
      label: 'Swing Required for 2028',
      value: '12.1%',
      subtext: '1,044 net votes to flip majority in a growing 18,500+ ward',
      badge: 'Highly achievable',
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              s.highlight
                ? 'bg-gradient-to-b from-amber-500/10 via-slate-900/60 to-slate-900/90 border-amber-500/40 shadow-sm'
                : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-medium truncate">{s.label}</span>
              <Icon className={`w-4 h-4 shrink-0 ${s.highlight ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>

            <div className="text-2xl font-bold tracking-tight text-white tabular-nums mb-1 font-mono">
              {s.value}
            </div>

            <div className="text-xs text-slate-400 leading-relaxed truncate" title={s.subtext}>
              {s.subtext}
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{s.badge}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
