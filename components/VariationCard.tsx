
import React, { useState } from 'react';
import { PromptOutput } from '../types';

interface VariationCardProps {
  variation: PromptOutput;
  index: number;
}

const VariationCard: React.FC<VariationCardProps> = ({ variation, index }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(variation.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionKeys = Object.keys(variation.sections) as Array<keyof typeof variation.sections>;

  return (
    <div 
      className="glass rounded-[2rem] overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-violet-100 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">
              Variation {index + 1}
            </span>
            <h3 className="text-xl font-black tracking-tight text-slate-900 mt-2 uppercase">{variation.title}</h3>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5 italic">{variation.purpose}</p>
          </div>
          <button 
            onClick={handleCopy}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'}`}
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {variation.description}
        </p>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block">Technical Sections</label>
          <div className="grid grid-cols-2 gap-2">
            {sectionKeys.slice(0, 4).map(key => (
              <div key={key} className="p-2 bg-slate-50/50 rounded-lg">
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{key}</p>
                <p className="text-[9px] font-bold text-slate-700 truncate">{variation.sections[key]}</p>
              </div>
            ))}
          </div>
          {expanded && (
            <div className="grid grid-cols-2 gap-2 pt-2 animate-fade-in">
                {sectionKeys.slice(4).map(key => (
                  <div key={key} className="p-2 bg-slate-50/50 rounded-lg">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{key}</p>
                    <p className="text-[9px] font-bold text-slate-700 truncate">{variation.sections[key]}</p>
                  </div>
                ))}
            </div>
          )}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors"
          >
            {expanded ? 'Show Less' : 'Expand Blueprint'}
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-900 text-white">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[8px] font-black uppercase tracking-widest opacity-50">Master Prompt String</label>
          <span className="text-[8px] font-black bg-white/20 px-1.5 py-0.5 rounded uppercase">Optimized</span>
        </div>
        <p className="text-[10px] font-mono line-clamp-2 opacity-80 leading-relaxed overflow-hidden">
          {variation.fullPrompt}
        </p>
      </div>
    </div>
  );
};

export default VariationCard;
