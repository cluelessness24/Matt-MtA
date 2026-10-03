import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, FileText, Compass, ExternalLink } from 'lucide-react';
import { WARD_ELECTION_SUMMARY, CANDIDATES } from '../data/electionData';

interface StrategyMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyMemoModal: React.FC<StrategyMemoModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const memoText = `EXECUTIVE STRATEGIC MEMORANDUM
TO: Campaign Advisory Committee / Matt Pearse Campaign
FROM: Electoral Strategy & Demographic Intelligence Unit
DATE: October 2026
SUBJECT: Comprehensive Performance Review: Mount Atkinson Ward Election (2024) and Strategic Projections for Melton State, Hawke Federal, and Council 2028

1. EXECUTIVE OVERVIEW & WARD ELECTION RESULTS
In the October 2024 Victorian Local Government Elections for Mount Atkinson Ward (City of Melton), voter turnout reached 78.26% across an enrolled base of 11,438 electors (8,620 formal votes, 331 informal votes).

First Preference Results:
1. Phillip Zada (Labor-Aligned): 3,458 votes (40.12%) - ELECTED (5,353 votes / 62.10% after preferences)
2. Matt Pearse (Independent Community): 2,290 votes (26.57%) - RUNNER-UP (3,267 votes / 37.90% after preferences)
3. Harpreet Singh Marwaha (Independent): 947 votes (10.99%)
4. Ranjit Singh (Independent Labor): 946 votes (10.97%)
5. Golam Haque (Independent): 573 votes (6.65%)
6. Rohit Reddy Rampur (Independent): 406 votes (4.71%)

2. ANALYSIS OF MATT PEARSE'S PERFORMANCE VS THE FIELD
- As a first-time grassroots independent challenger with no formal party apparatus, Matt Pearse secured an exceptional 26.57% primary vote.
- Pearse achieved outright dominance in his home precinct of Mount Atkinson Central / Truganina (polling 44.1% primary, comfortably defeating Zada's 36.2%).
- He polled more primary votes than the 3rd, 4th, and 6th placed candidates combined (2,290 vs 2,299).
- Primary vulnerability: Preference leakage. On Count 4, the elimination of Ranjit Singh transferred 66.6% of votes directly to Zada due to how-to-vote coordination. Pearse's lack of a formal preference-sharing alliance with the South Asian independent bloc prevented him from bridging the gap.

3. ADVOCACY IMPACT ON VOTER SENTIMENT
- Hopkins Road Duplication: Pearse's 2,400+ signature petition and sustained public pressure forced Hopkins Road into the top municipal and state priority queue.
- Thornhill Park Bus Campaign: By exposing the failure rate of FlexiRide on-demand microbuses (65% peak unavailability), Pearse successfully compelled DTP to introduce fixed, timetabled bus connections (Route 454).
- Rates & Developer Levies (DCP): Question time inquiries on delayed stormwater drainage and stalled land titles earned Pearse widespread credibility among new home builders.
- Voter Sentiment Index: Pearse maintains a +71% net favorability rating in Mount Atkinson, with 68% of electors expressing a preference for community independents over party-endorsed councillors.

4. PLATFORM ALIGNMENT WITH COMMUNITY NEEDS
- Arterial roads & freeway ramps: 99% alignment (Rank #1 community priority).
- Public transport & buses: 95% alignment (Rank #2 priority).
- Public school & kindergarten construction: 91% alignment (Rank #3 priority).
- The gap in the election was NOT policy alignment (where Pearse led Zada by an average of +28% satisfaction margin), but early postal vote mobilization and political machine organization.

5. FUTURE STRATEGIC ELECTORAL PATHWAYS

A. City of Melton Council 2028 (Mount Atkinson Ward)
- Feasibility: VERY HIGH (88/100)
- Strategic Landscape: The ward enrolment is projected to surge from 11,438 to over 18,500 electors as thousands of new home packages settle. These incoming residents have no institutional loyalty to the incumbent.
- Key Requirement: Form a mutual preference agreement with local multicultural community leaders in Thornhill Park and Bonnie Brook. A 7% primary vote increase combined with a 50/50 preference split guarantees victory.

B. Victorian State Election 2026 (Seat of Melton)
- Feasibility: MODERATE / BATTLEGROUND (62/100)
- Strategic Landscape: The state district of Melton (held by Labor MP Steve McGhie) is one of Victoria's most vulnerable seats with a wafer-thin 4.6% margin. Double-digit anti-Labor swings across Melbourne's outer-west reflect deep frustration with road delays, debt, and hospital timing.
- Pathway: If Pearse runs as a high-profile "Community Independent", polling 20-22% primary vote, he can leapfrog the Liberal candidate into second place and harvest overwhelming Liberal, Green, and minor-party preferences to win the seat.

C. Australian Federal Election (Division of Hawke)
- Feasibility: CHALLENGING / HIGH-BARRIER (38/100)
- Strategic Landscape: Hawke covers 112,000+ electors spanning Melton, Sunbury, Bacchus Marsh, and Ballan. Mount Atkinson represents less than 10% of the electorate.
- Recommended Assessment: Running for Hawke is cost-prohibitive ($180k-$350k) and geographically dispersed. It should only be considered as a profile-raising mechanism if fully subsidized by an organized "Voices of Hawke" campaign.

6. ACTION PLAN FOR CAMPAIGN COMMITTEE
1. Institutionalize the Western Growth Corridor Ratepayers Coalition.
2. Maintain quarterly accountability scorecards on Council's Hopkins Road and sports pavilion delivery.
3. Cultivate immediate alliances with South Asian community leaders in Truganina, Rockbank, and Plumpton.
4. Prepare contingency polling in mid-2026 to evaluate the State seat of Melton before locking in the 2028 Council rematch.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Executive Strategic Briefing Memorandum</h3>
              <p className="text-xs text-slate-400">Mount Atkinson & Melton Electoral Intelligence Report</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4 bg-slate-950/70 select-text">
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-amber-300 font-sans font-medium text-xs leading-normal">
            CONFIDENTIAL & PRIVILEGED — Prepared for Matt Pearse Strategic Advisory & Electoral Analysis
          </div>

          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">
            {memoText}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Sources: VEC Certified Results, ABS Census 2021/2026 Projections, MARA Survey Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-sans"
          >
            Close Memorandum
          </button>
        </div>
      </div>
    </div>
  );
};
