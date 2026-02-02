import React, { useState, useEffect, useCallback } from 'react';
import { 
  CATEGORIES, 
  INITIAL_FORM_DATA, 
  PRODUCT_INTELLIGENCE, 
} from './constants';
import { ProductFormData, PromptOutput, TabType } from './types';
import { GeminiService } from './services/geminiService';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>(() => ({
    ...INITIAL_FORM_DATA,
    advancedEffects: { ...INITIAL_FORM_DATA.advancedEffects }
  }));
  const [outputs, setOutputs] = useState<PromptOutput[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('form');
  const [gemini] = useState(() => new GeminiService());

  useEffect(() => {
    const intel = PRODUCT_INTELLIGENCE[formData.category];
    if (intel) {
      setFormData(prev => ({
        ...prev,
        productForm: prev.productForm === INITIAL_FORM_DATA.productForm ? intel.physicalForm : prev.productForm,
        creativeLevel: prev.creativeLevel === INITIAL_FORM_DATA.creativeLevel ? intel.creativeDefault : prev.creativeLevel,
        lightingStyle: prev.lightingStyle === INITIAL_FORM_DATA.lightingStyle ? intel.lightingDefault : prev.lightingStyle,
        advancedEffects: {
          ...prev.advancedEffects,
          liquidDripEnabled: prev.advancedEffects.liquidDripEnabled || intel.liquidDripAppropriate
        }
      }));
    }
  }, [formData.category]);

  const handleGenerate = async () => {
    if (!formData.productName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    setLoading(true);
    console.log("Generating suite with config:", formData);

    try {
      const results = await gemini.generatePrompts(formData);
      setOutputs(results);
      setActiveTab('results');
    } catch (error: any) {
      console.error("VisiPro Generation Error:", error);
      
      let errorMessage = "An unexpected error occurred.";
      
      // Check for common API errors
      if (error.message?.includes("429")) {
        errorMessage = "Quota Limit Exceeded (429). You have reached the limit for free tier requests. Please wait 60 seconds or try a different API key.";
      } else if (error.message?.includes("403")) {
        errorMessage = "Authentication failed (403). Your API Key might be invalid or restricted.";
      } else if (error.message?.includes("404")) {
        errorMessage = "Model not found (404). This version of Gemini is not available in your region.";
      } else {
        errorMessage = error.message || "Unknown Error";
      }

      alert(`Generation failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setFormData({
      ...INITIAL_FORM_DATA,
      advancedEffects: { ...INITIAL_FORM_DATA.advancedEffects }
    });
    setOutputs([]);
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden relative">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        loading={loading}
        onGenerate={handleGenerate}
        onReset={handleReset}
      />
      
      <main className="flex-1 flex overflow-hidden">
        <div className={`w-full lg:w-[450px] shrink-0 border-r border-slate-200 bg-white/50 backdrop-blur-sm z-10 transition-transform duration-300 overflow-y-auto custom-scrollbar ${activeTab === 'results' ? 'hidden lg:block' : 'block'}`}>
          <Sidebar 
            formData={formData} 
            setFormData={setFormData} 
          />
        </div>

        <div className={`flex-1 relative overflow-y-auto custom-scrollbar p-6 bg-slate-100/50 ${activeTab === 'form' ? 'hidden lg:block' : 'block'}`}>
          <MainContent 
            outputs={outputs} 
            loading={loading} 
            onGenerate={handleGenerate}
            onReset={handleReset}
            activeTab={activeTab}
          />
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-center z-20">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          VisiPro Master Engine &bull; Made by SM
        </p>
      </footer>

      {activeTab === 'form' && (
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="lg:hidden fixed bottom-16 right-6 bg-violet-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-violet-700 active:scale-95 transition-all z-50 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          <span>{loading ? 'Designing...' : 'Generate Suite'}</span>
        </button>
      )}
    </div>
  );
};

export default App;