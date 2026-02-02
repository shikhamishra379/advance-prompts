
import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  loading: boolean;
  onGenerate: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, loading, onGenerate, onReset }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black tracking-tighter text-slate-800 uppercase flex items-center gap-2">
            VisiPro <span className="bg-violet-100 text-violet-600 text-[10px] px-2 py-0.5 rounded-full tracking-normal">BETA</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Blueprint Engine</p>
        </div>
      </div>

      <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
        <button 
          type="button"
          onClick={() => setActiveTab('form')}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'form' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Config
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('results')}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'results' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Blueprints
        </button>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
          title="Start New Project"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden xl:block text-[10px] font-black uppercase tracking-widest">New Project</span>
        </button>
        <button 
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl shadow-slate-200"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          <span className="hidden sm:inline">{loading ? 'Designing...' : 'Generate Master Suite'}</span>
          <span className="sm:hidden">{loading ? '...' : 'Generate'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
