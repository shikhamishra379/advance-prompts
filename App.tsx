
import React, { useState, useEffect, useCallback } from 'react';
import { 
  CATEGORIES, 
  INITIAL_FORM_DATA, 
  PRODUCT_INTELLIGENCE, 
  VISUAL_STYLES, 
  BRAND_POSITIONS, 
  RESOLUTIONS, 
  ASPECT_RATIOS, 
  DEPTH_OF_FIELDS, 
  CAMERA_ANGLES, 
  LIGHTING_STYLES 
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

  // Smart defaults logic
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
    try {
      const results = await gemini.generatePrompts(formData);
      setOutputs(results);
      setActiveTab('results');
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate blueprints. Please check your API key and network.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    // We remove window.confirm to ensure the action is immediate and doesn't fail 
    // in environments where dialogs are blocked.
    setFormData({
      ...INITIAL_FORM_DATA,
      advancedEffects: { ...INITIAL_FORM_DATA.advancedEffects }
    });
    setOutputs([]);
    setActiveTab('form');
    // Optional: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        loading={loading}
        onGenerate={handleGenerate}
        onReset={handleReset}
      />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar / Form Panel */}
        <div className={`w-full lg:w-[450px] shrink-0 border-r border-slate-200 bg-white/50 backdrop-blur-sm z-10 transition-transform duration-300 overflow-y-auto custom-scrollbar ${activeTab === 'results' ? 'hidden lg:block' : 'block'}`}>
          <Sidebar 
            formData={formData} 
            setFormData={setFormData} 
          />
        </div>

        {/* Results / Canvas Panel */}
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

      {/* Floating Action Button for Mobile */}
      {activeTab === 'form' && (
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="lg:hidden fixed bottom-6 right-6 bg-violet-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-violet-700 active:scale-95 transition-all z-50"
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
