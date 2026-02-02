
import React from 'react';
import { PromptOutput, TabType } from '../types';
import VariationCard from './VariationCard';

interface MainContentProps {
  outputs: PromptOutput[];
  loading: boolean;
  onGenerate: () => void;
  onReset: () => void;
  activeTab: TabType;
}

const MainContent: React.FC<MainContentProps> = ({ outputs, loading, onGenerate, onReset, activeTab }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-8 animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
             <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l1.428-1.428a2 2 0 000-2.828l-1.428-1.428zM14.5 9.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
             </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Constructing Blueprints</h2>
          <p className="text-slate-400 font-medium max-w-md mx-auto">
            Our AI engine is currently synthesizing 6 distinct photography variations with technical specifications and scene layouts.
          </p>
        </div>
        <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </div>
    );
  }

  if (outputs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
        <div className="w-32 h-32 bg-slate-100 rounded-[3rem] flex items-center justify-center text-slate-300">
           <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tighter text-slate-800 uppercase serif italic">Ready for Production?</h2>
          <p className="text-slate-400 font-medium max-w-md mx-auto">
            Configure your product on the left and click 'Generate' to create a comprehensive photography master suite.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button 
            type="button"
            onClick={() => onGenerate()}
            className="bg-violet-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-tight shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95"
          >
            Generate Suite
          </button>
          <button 
            type="button"
            onClick={() => onReset()}
            className="px-8 py-3 rounded-2xl font-black uppercase text-slate-400 hover:text-slate-600 text-sm tracking-tight transition-all"
          >
            Clear All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600 mb-2 block">Generation Summary</label>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Master Suite Blueprints</h2>
          <p className="text-slate-500 font-medium max-w-lg mt-2">
            6 production-ready photography variations generated with optimized technical metadata for professional AI image synth systems.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => onReset()}
            className="hidden md:flex flex-col items-center justify-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-center hover:bg-red-50 hover:border-red-100 transition-all group"
          >
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-red-400">Action</p>
            <p className="text-xs font-bold text-slate-800 group-hover:text-red-600">NEW PRODUCT</p>
          </button>
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Quality</p>
            <p className="text-xs font-bold text-slate-800">ULTRA HIGH</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {outputs.map((variation, index) => (
          <VariationCard key={variation.id} variation={variation} index={index} />
        ))}
      </div>

      <footer className="pt-12 border-t border-slate-200 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">End of Master Suite</p>
            <p className="text-[10px] text-slate-300 font-medium mt-1 uppercase tracking-tighter">Blueprints are optimized for Midjourney v6 & DALL-E 3</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              type="button"
              onClick={() => onGenerate()}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-tight shadow-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Regenerate Suite
            </button>
            <button 
              type="button"
              onClick={() => onReset()}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-sm tracking-tight shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Start New Product
            </button>
          </div>
      </footer>
    </div>
  );
};

export default MainContent;
