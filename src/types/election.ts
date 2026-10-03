export interface Candidate {
  id: string;
  name: string;
  party: string;
  affiliationType: 'Labor-Aligned' | 'Independent Community' | 'Independent' | 'Liberal-Aligned';
  firstPreferenceVotes: number;
  firstPreferencePercent: number;
  finalVotes: number;
  finalPercent: number;
  preferenceGain: number;
  ballotPosition: number;
  keyIssues: string[];
  background: string;
}

export interface WardElectionSummary {
  wardName: string;
  lga: string;
  date: string;
  declaredDate: string;
  enrolment: number;
  turnoutVotes: number;
  turnoutPercent: number;
  formalVotes: number;
  formalPercent: number;
  informalVotes: number;
  informalPercent: number;
  winner: string;
  runnerUp: string;
}

export interface PreferenceStep {
  countNumber: number;
  description: string;
  candidateEliminated: string;
  transferredVotes: number;
  tallies: Record<string, number>;
  notes: string;
}

export interface PrecinctResult {
  boothName: string;
  suburb: string;
  registeredElectorsEst: number;
  pearseVotes: number;
  pearsePercent: number;
  zadaVotes: number;
  zadaPercent: number;
  othersVotes: number;
  othersPercent: number;
  keyDemographics: string;
  topConcern: string;
}

export interface CommunityIssue {
  id: string;
  title: string;
  category: 'Transport & Roads' | 'Public Transit' | 'Education & Schools' | 'Community Facilities' | 'Water & Drainage' | 'Healthcare & Services';
  urgency: 'Critical' | 'High' | 'Medium';
  communityPriorityScore: number; // 0 - 100
  pearseAlignmentScore: number; // 0 - 100
  zadaCouncilAlignmentScore: number; // 0 - 100
  pearseAdvocacyActions: string[];
  currentStatus: string;
  voterSentiment: 'Strongly Favourable to Pearse' | 'Moderately Favourable' | 'Contested / Split' | 'Neutral';
  quoteOrMilestone: string;
}

export type FutureContestId = 'council_2028' | 'state_melton' | 'federal_hawke';

export interface FutureContest {
  id: FutureContestId;
  title: string;
  level: 'Local Council' | 'Victorian State Parliament' | 'Australian Federal Parliament';
  divisionName: string;
  nextExpectedDate: string;
  incumbent: string;
  incumbentParty: string;
  currentMarginPercent: number;
  electorateSize: number;
  feasibilityRating: 'Very High' | 'Moderate / Battleground' | 'Challenging / High-Barrier';
  feasibilityScore: number; // 0 - 100
  primaryVoteTarget: number;
  preferenceFlowTarget: number;
  estimatedBudgetRequired: string;
  strategicAdvantages: string[];
  strategicRisks: string[];
  keyVoterBattlegrounds: string[];
  pathwayToVictory: string;
}
