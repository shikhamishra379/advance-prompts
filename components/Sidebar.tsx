
import React from 'react';
import { ProductFormData } from '../types';
import { 
  CATEGORIES, 
  VISUAL_STYLES, 
  BRAND_POSITIONS, 
  RESOLUTIONS, 
  ASPECT_RATIOS, 
  DEPTH_OF_FIELDS, 
  CAMERA_ANGLES, 
  LIGHTING_STYLES,
  PHYSICAL_FORMS,
  CONTAINER_TYPES
} from '../constants';
import ImageUpload from './ImageUpload';

interface SidebarProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const Sidebar: React.FC<SidebarProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleStyle = (style: string) => {
    setFormData(prev => {
      const styles = prev.styles.includes(style) 
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style];
      return { ...prev, styles };
    });
  };

  const handleAdvanced = (field: keyof ProductFormData['advancedEffects'], value: any) => {
    setFormData(prev => ({
      ...prev,
      advancedEffects: { ...prev.advancedEffects, [field]: value }
    }));
  };

  const DropdownIcon = () => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <div className="p-8 space-y-10 animate-fade-in">
      {/* Product ID */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Product Identification</label>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Product Name</label>
            <input 
              type="text"
              value={formData.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
              placeholder="e.g. Professional Chef Knife"
              className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-violet-500 transition-all outline-none font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Category</label>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-violet-500 transition-all outline-none font-medium appearance-none"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <DropdownIcon />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Physical Form</label>
              <div className="relative">
                <select 
                  value={formData.productForm}
                  onChange={(e) => handleChange('productForm', e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none cursor-pointer hover:bg-slate-200/50 transition-colors"
                >
                  {PHYSICAL_FORMS.map(form => <option key={form} value={form}>{form}</option>)}
                </select>
                <DropdownIcon />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Container</label>
              <div className="relative">
                <select 
                  value={formData.containerType}
                  onChange={(e) => handleChange('containerType', e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none cursor-pointer hover:bg-slate-200/50 transition-colors"
                >
                  {CONTAINER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <DropdownIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Model Configuration */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Human Interaction Blueprint</label>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-violet-50 rounded-2xl border border-violet-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Include Human Model</p>
              <p className="text-[10px] text-violet-500 uppercase font-bold tracking-tighter">Adds 2 interaction blueprints</p>
            </div>
            <button 
              onClick={() => handleChange('modelEnabled', !formData.modelEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.modelEnabled ? 'bg-violet-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.modelEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          {formData.modelEnabled && (
            <div className="space-y-1 animate-fade-in">
              <label className="text-xs font-bold text-slate-600 ml-1">Model Persona / Usage Action</label>
              <textarea 
                value={formData.modelPersona}
                onChange={(e) => handleChange('modelPersona', e.target.value)}
                placeholder="e.g. Male professional chef holding the knife over a rustic oak chopping board with sliced vegetables."
                className="w-full bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-violet-500 transition-all outline-none font-medium min-h-[100px] resize-none"
              />
            </div>
          )}
        </div>
      </section>

      {/* Pack Configuration */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Pack & Bundle Settings</label>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Multi-Product Pack</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Showcase whole set</p>
            </div>
            <button 
              onClick={() => handleChange('isPack', !formData.isPack)}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.isPack ? 'bg-violet-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isPack ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          {formData.isPack && (
            <div className="space-y-1 animate-fade-in">
              <label className="text-xs font-bold text-slate-600 ml-1">Items in Pack / Set Description</label>
              <input 
                type="text"
                value={formData.packSize}
                onChange={(e) => handleChange('packSize', e.target.value)}
                placeholder="e.g. Pack of 6, Set of 3 bottles"
                className="w-full bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-violet-500 transition-all outline-none font-medium"
              />
            </div>
          )}
        </div>
      </section>

      {/* Visual Reference */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Visual Reference</label>
        <ImageUpload 
          onImageChange={(base64) => handleChange('referenceImage', base64)} 
          currentImage={formData.referenceImage}
        />
      </section>

      {/* Aesthetic Config */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Aesthetic Blueprint</label>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 ml-1">Visual Styles (Multi-select)</label>
            <div className="flex flex-wrap gap-2">
              {VISUAL_STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.styles.includes(style) ? 'bg-violet-600 border-violet-600 text-white' : 'bg-transparent border-slate-100 text-slate-500 hover:border-slate-200'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 ml-1">Brand Positioning</label>
            <div className="grid grid-cols-2 gap-2">
              {BRAND_POSITIONS.map(pos => (
                <button
                  key={pos}
                  onClick={() => handleChange('brandPositioning', pos)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.brandPositioning === pos ? 'bg-slate-900 border-slate-900 text-white' : 'bg-transparent border-slate-100 text-slate-500 hover:border-slate-200'}`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Technical Parameters</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Resolution</label>
            <div className="relative">
              <select value={formData.resolution} onChange={(e) => handleChange('resolution', e.target.value)} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none">
                {RESOLUTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <DropdownIcon />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Aspect Ratio</label>
            <div className="relative">
              <select value={formData.aspectRatio} onChange={(e) => handleChange('aspectRatio', e.target.value)} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none">
                {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <DropdownIcon />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Camera Angle</label>
            <div className="relative">
              <select value={formData.cameraAngle} onChange={(e) => handleChange('cameraAngle', e.target.value)} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none">
                {CAMERA_ANGLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <DropdownIcon />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Lighting</label>
            <div className="relative">
              <select value={formData.lightingStyle} onChange={(e) => handleChange('lightingStyle', e.target.value)} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm outline-none font-medium appearance-none">
                {LIGHTING_STYLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <DropdownIcon />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Toggles */}
      <section>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Production Effects</label>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Liquid Drip</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Dynamic Physics</p>
            </div>
            <button 
              onClick={() => handleAdvanced('liquidDripEnabled', !formData.advancedEffects.liquidDripEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.advancedEffects.liquidDripEnabled ? 'bg-violet-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.advancedEffects.liquidDripEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Powder/Mist</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Atmospheric FX</p>
            </div>
            <button 
              onClick={() => handleAdvanced('powderEnabled', !formData.advancedEffects.powderEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.advancedEffects.powderEnabled ? 'bg-violet-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.advancedEffects.powderEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </section>
      
      <div className="h-20 lg:hidden" /> {/* Spacer for mobile fab */}
    </div>
  );
};

export default Sidebar;