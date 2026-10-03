import React from 'react';
import { Download, SlidersHorizontal, BarChart3, TrendingUp, Layers, Compass, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMemo: () => void;
  onToggleSimulator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMemo,
  onToggleSimulator,
}) => {
  const navItems = [
    { id: 'results', label: 'Ward Results & Preferences', icon: BarChart3 },
    { id: 'precincts', label: 'Precinct Analysis', icon: Layers },
    { id: 'advocacy', label: 'Advocacy & Sentiment', icon: TrendingUp },
    { id: 'platform', label: 'Platform Alignment', icon: Compass },
    { id: 'future', label: 'Future Contests (Melton / Hawke)', icon: SlidersHorizontal },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setActiveTab('results'); }}
            className="text-lg lg:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors"
          >
            Mt Atkinson & Melton Electoral Intelligence
          </a>
          <span className="hidden sm:inline text-xs text-slate-400 border-l border-slate-800 pl-3">
            2024 VEC Certified & Strategic Projections
          </span>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors text-left py-1 hover:text-white relative ${
                activeTab === item.id
                  ? 'text-amber-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleSimulator}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
            title="Open Interactive Electoral Swing & Preference Simulator"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Swing Simulator</span>
            <span className="md:hidden">Simulator</span>
          </button>

          <button
            onClick={onOpenMemo}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            title="View Executive Strategic Memorandum"
          >
            <FileText className="w-3.5 h-3.5 text-slate-950" />
            <span>Executive Briefing</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Bar */}
      <div className="xl:hidden mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs whitespace-nowrap rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
