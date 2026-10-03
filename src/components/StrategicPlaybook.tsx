import React from 'react';
import { Target, Users, Shield, Calendar, Award, CheckCircle, TrendingUp, Compass, Flag } from 'lucide-react';

export const StrategicPlaybook: React.FC = () => {
  const voterCohorts = [
    {
      name: 'Young First-Home Buyers & Mortgage Families',
      share: '38%',
      dominantLocations: 'Mount Atkinson Central, Grandview, Thornhill Park',
      topPainPoints: 'Delayed primary schools, childcare queues, interest rates, Hopkins Road bottleneck',
      pearseResonance: 'Extremely High (92%)',
      tacticalAdvice: 'Engage via weekend playground meetups, school progress update flyers, and active Facebook community groups.',
    },
    {
      name: 'South Asian Multicultural Diaspora (Punjabi, Indian, Pakistani)',
      share: '34%',
      dominantLocations: 'Thornhill Park, Bonnie Brook, Plumpton',
      topPainPoints: 'Community sports amenities, cultural center permits, public transit for elderly parents, business approvals',
      pearseResonance: 'Moderate / High Opportunity (65%)',
      tacticalAdvice: 'Must establish direct ties with local gurudwaras, cultural associations, and endorse a joint multi-candidate preference compact.',
    },
    {
      name: 'Trade Workers & Early Commuters',
      share: '18%',
      dominantLocations: 'Mt Atkinson, Rockbank, Western Freeway corridor',
      topPainPoints: 'Hopkins Road gridlock, freeway on-ramp closures, lack of heavy vehicle parking/arterials',
      pearseResonance: 'Very High (88%)',
      tacticalAdvice: 'Focus on early morning roadside sign-waving, dashcam traffic exposes, and holding VicRoads/DTP accountable.',
    },
    {
      name: 'Established Township Homeowners',
      share: '10%',
      dominantLocations: 'Rockbank Town, rural fringe allotments',
      topPainPoints: 'Council rate increases, loss of semi-rural character, infrastructure overload',
      pearseResonance: 'Lower / Cautious (42%)',
      tacticalAdvice: 'Emphasize fiscal discipline, opposition to waste, and demanding developers pay their fair share before council rates increase.',
    },
  ];

  const timelinePhases = [
    {
      phase: 'Phase 1: 2025 Community Consolidation',
      timeline: 'Q1 2025 – Q4 2025',
      objective: 'Institutionalize the Advocacy Machine',
      actions: [
        'Form the "Western Growth Corridor Ratepayers Coalition" bridging Mt Atkinson, Thornhill Park, and Rockbank.',
        'File regular Freedom of Information (FOI) requests on Hopkins Road funding releases and developer contribution expenditures.',
        'Host quarterly community town halls with guest transport and education specialists.',
      ],
    },
    {
      phase: 'Phase 2: 2026 State Election Decision Gate',
      timeline: 'Mid 2026 – November 2026',
      objective: 'Evaluate Independent Run for State District of Melton',
      actions: [
        'Survey local electorate appetite for an independent challenger to Steve McGhie MP.',
        'If State Labor fails to deliver full Hopkins Road construction contracts or slows Melton Hospital, launch a high-impact independent bid.',
        'Target 20%+ primary vote to push Liberal candidate into 3rd place and capture preferences.',
      ],
    },
    {
      phase: 'Phase 3: 2028 Melton Council Decisive Victory',
      timeline: 'January 2028 – October 2028',
      objective: 'Secure 50%+ Majority in Mount Atkinson Ward',
      actions: [
        'Target 7,000+ newly arrived residents with "Welcome to Mt Atkinson" grassroots infrastructure guidebooks.',
        'Form formal preference agreements with 2 allied independent candidates representing multicultural community hubs.',
        'Massive postal voting drive commencing 3 weeks prior to official voting closure to neutralize incumbent postal advantage.',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Playbook Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Campaign Strategy & Coalitional Playbook</span>
          <span aria-hidden="true">·</span>
          <span>Tactical Blueprints for Matt Pearse & Campaign Advisory</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Voter Coalition Building & Campaign Roadmap
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Converting an impressive 26.6% first-run vote into a winning 50%+ coalition requires disciplined demographic targeting,
          multicultural partnerships, and strategic timing across municipal and state electoral cycles.
        </p>
      </div>

      {/* Demographic Cohorts Matrix */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          Core Electorate Segmentation (Mount Atkinson & Western Melton)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {voterCohorts.map((cohort, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">{cohort.name}</h4>
                  <span className="text-xs text-slate-400 block mt-0.5">{cohort.dominantLocations}</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
                  {cohort.share} of Ward
                </span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pearse Resonance:</span>
                  <span className="text-amber-400 font-semibold">{cohort.pearseResonance}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Core Issue: </span>
                  {cohort.topPainPoints}
                </div>
              </div>

              <div className="text-xs text-slate-300 pt-1">
                <strong className="text-white">Recommended Tactic: </strong>
                {cohort.tacticalAdvice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Multi-Year Horizon */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          Three-Stage Campaign Timeline (2025 – 2028)
        </h3>

        <div className="space-y-3">
          {timelinePhases.map((phase, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-bold text-white">{phase.phase}</span>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded w-fit">
                  {phase.timeline}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Strategic Goal: <strong className="text-slate-200">{phase.objective}</strong>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                {phase.actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
