import React, { useState } from 'react';
import { PRECINCT_BREAKDOWNS } from '../data/electionData';
import { MapPin, Users, Compass, HelpCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const PrecinctBreakdown: React.FC = () => {
  const [selectedBooth, setSelectedBooth] = useState(PRECINCT_BREAKDOWNS[0]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Geographic Polling Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Growth Corridors vs Established Townships</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Suburban & Polling Booth Performance Analysis
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Electoral patterns reveal a striking demographic divide: Matt Pearse dominated the frontline new estates
          experiencing immediate infrastructure delays (Mt Atkinson / Truganina), while Phillip Zada held established township
          areas (Rockbank) and out-mobilized early postal voters.
        </p>
      </div>

      {/* Interactive Map & Booth Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booth List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Polling Precincts (Click to inspect)
            </span>
            <span className="text-xs text-slate-400 font-mono">5 Major Electoral Zones</span>
          </div>

          <div className="space-y-2.5">
            {PRECINCT_BREAKDOWNS.map((booth) => {
              const isSelected = selectedBooth.boothName === booth.boothName;
              const pearseWon = booth.pearsePercent > booth.zadaPercent;

              return (
                <div
                  key={booth.boothName}
                  onClick={() => setSelectedBooth(booth)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/60 shadow-md'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${pearseWon ? 'text-amber-400' : 'text-blue-400'}`} />
                        <h4 className="text-sm font-bold text-white">{booth.boothName}</h4>
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">{booth.suburb}</span>
                    </div>

                    <div className="text-right">
                      {pearseWon ? (
                        <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                          Pearse Stronghold (+{ (booth.pearsePercent - booth.zadaPercent).toFixed(1) }%)
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                          Zada Lead (+{ (booth.zadaPercent - booth.pearsePercent).toFixed(1) }%)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vote Share Visual Bar */}
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-amber-400 font-medium">Pearse: {booth.pearsePercent}%</span>
                      <span className="text-blue-400 font-medium">Zada: {booth.zadaPercent}%</span>
                      <span className="text-slate-400">Others: {booth.othersPercent}%</span>
                    </div>

                    <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-900">
                      <div
                        className="bg-amber-400 h-full transition-all"
                        style={{ width: `${booth.pearsePercent}%` }}
                        title={`Pearse: ${booth.pearsePercent}%`}
                      />
                      <div
                        className="bg-blue-500 h-full transition-all"
                        style={{ width: `${booth.zadaPercent}%` }}
                        title={`Zada: ${booth.zadaPercent}%`}
                      />
                      <div
                        className="bg-slate-700 h-full transition-all"
                        style={{ width: `${booth.othersPercent}%` }}
                        title={`Others: ${booth.othersPercent}%`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Booth Deep Dive */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-semibold text-white">Precinct Intelligence</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{selectedBooth.suburb}</span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white">{selectedBooth.boothName}</h4>
            <p className="text-xs text-slate-400 mt-1">
              Estimated Enrolment Base: ~{selectedBooth.registeredElectorsEst.toLocaleString()} electors
            </p>
          </div>

          {/* Demographic Composition */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 block">Socio-Demographic Profile:</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedBooth.keyDemographics}
            </p>
          </div>

          {/* Core Issue */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-amber-400 block">Primary Voter Grievance:</span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {selectedBooth.topConcern}
            </p>
          </div>

          {/* Strategic Implications for Pearse */}
          <div className="p-3.5 bg-amber-500/10 rounded-lg border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Key Strategic Implication:</span>
            </div>
            <p className="leading-relaxed">
              {selectedBooth.pearsePercent > selectedBooth.zadaPercent
                ? 'Pearse must safeguard and turn out this high-density core in 2028. Continued visual advocacy on Hopkins Road and freeway ramps keeps this electorate galvanized.'
                : 'Zada leveraged existing community infrastructure and postal vote familiarity here. Pearse needs targeted physical engagement, cultural events, and localized collateral to close the 10-20% gap.'}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800">
            Source: Aggregated VEC booth-level preference sampling and demographic overlay.
          </div>
        </div>
      </div>
    </div>
  );
};
