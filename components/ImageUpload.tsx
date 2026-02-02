
import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageChange: (base64: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    onImageChange('');
  };

  return (
    <div className="space-y-4">
      {currentImage ? (
        <div className="relative group">
          <img 
            src={currentImage} 
            alt="Reference" 
            className="w-full aspect-video object-cover rounded-[2rem] shadow-lg"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center backdrop-blur-[2px]">
            <button 
              onClick={handleClear}
              className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight shadow-xl hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Remove Reference
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:border-violet-300 hover:bg-violet-50/30 transition-all text-slate-400 group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-violet-400 transition-all shadow-sm">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <span className="text-xs font-bold">Upload Product Reference</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-60">JPG, PNG, WEBP • MAX 5MB</span>
        </button>
      )}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default ImageUpload;
