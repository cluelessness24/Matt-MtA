import React, { useState } from 'react';
import { COMMUNITY_ISSUES, VOTER_SENTIMENT_METRICS } from '../data/electionData';
import { TrendingUp, Award, CheckCircle, AlertCircle, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react';

export const AdvocacySentiment: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = ['all', 'Transport & Roads', 'Public Transit', 'Education & Schools', 'Community Facilities', 'Water & Drainage'];

  const filteredIssues = activeFilter === 'all'
    ? COMMUNITY_ISSUES
    : COMMUNITY_ISSUES.filter((i) => i.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Community Impact Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Mount Atkinson Residents Association (MARA) & Public Advocacy</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          How Matt Pearse's Advocacy Impacted Voter Sentiment
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Unlike career politicians who campaign only during the 4-week election cycle, Matt Pearse built his 26.6% vote share
          through multi-year, front-line agitation on essential basic infrastructure: unblocking roads, demanding real buses,
          and confronting developers and council over delayed amenities.
        </p>
      </div>

      {/* Voter Sentiment Pulse KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Council Infrastructure Delivery Sentiment</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {VOTER_SENTIMENT_METRICS.overallDissatisfactionWithCouncilDelivery}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            of surveyed growth-corridor electors express frustration with council infrastructure delivery pace.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Appetite for Independent Advocates</span>
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {VOTER_SENTIMENT_METRICS.independentCandidateAppetite}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            prefer grassroots community independents over party-aligned politicians on municipal council.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
            <span>Matt Pearse Net Brand Favorability</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            +{VOTER_SENTIMENT_METRICS.pearseBrandFavorability}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            viewed as authentic, approachable, and persistent in holding bureaucrats accountable.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-lg border border-slate-800 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeFilter === cat
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Core Campaigns' : cat}
          </button>
        ))}
      </div>

      {/* Campaign Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-amber-400">{issue.category}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {issue.urgency} Urgency
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                {issue.title}
              </h3>

              {/* Sentiment Alignment Meter */}
              <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Pearse Policy Alignment:</span>
                  <span className="text-amber-400 font-mono font-bold">{issue.pearseAlignmentScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all"
                    style={{ width: `${issue.pearseAlignmentScore}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-400">Council / Status Quo Delivery:</span>
                  <span className="text-slate-300 font-mono font-bold">{issue.zadaCouncilAlignmentScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: `${issue.zadaCouncilAlignmentScore}%` }}
                  />
                </div>
              </div>

              {/* Concrete Actions Log */}
              <div className="mt-3.5 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Actions Spearheaded by Pearse:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {issue.pearseAdvocacyActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current Real World Status & Sentiment Impact */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Voter Verdict:</span>
                <span className="font-semibold text-emerald-400">{issue.voterSentiment}</span>
              </div>
              <p className="text-xs text-slate-400 italic bg-slate-950 p-2.5 rounded border border-slate-800/60">
                "{issue.quoteOrMilestone}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Synthesis Insight on Advocacy Impact */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-xl space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          The Net Electoral Dividend of Pearse's Advocacy
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Pearse's public campaigns on Hopkins Road and Thornhill Park buses successfully reframed local politics in Mount Atkinson:
          rather than voting on abstract party loyalties or social circles, voters were presented with a tangible choice between
          <strong> active resident advocacy</strong> and <strong>passive council compliance</strong>.
          This produced his formidable 44.1% victory in the Mount Atkinson Central booth.
          To convert this into a 50%+ ward-wide majority in 2028, Pearse must expand this advocacy model into the Rockbank
          and Punjabi-majority precincts that felt less connected to the MARA core.
        </p>
      </div>
    </div>
  );
};
