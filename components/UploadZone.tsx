import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Camera } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
  text: typeof TRANSLATIONS.en;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, text }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError(text.errorImage);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError(text.errorSize);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-up animation-delay-200">
      <div 
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300
          flex flex-col items-center justify-center text-center cursor-pointer
          ${isDragging 
            ? 'border-violet-500 bg-violet-50 scale-[1.02]' 
            : 'border-slate-300 hover:border-violet-400 hover:bg-slate-50 bg-white hover:shadow-lg'
          }
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600 animate-float">
          <Upload className="w-10 h-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{text.uploadTitle}</h3>
        <p className="text-slate-500 mb-8">{text.dragDrop}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
           <label htmlFor="fileInput" className="sr-only">{text.uploadTitle}</label>
          <input 
            id="fileInput"
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleInputChange}
          />
          
          <div className="flex gap-4 justify-center">
            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <ImageIcon className="w-4 h-4 mr-2" />
              {text.gallery}
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <Camera className="w-4 h-4 mr-2" />
              {text.camera}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg animate-fade-in-up">
            {error}
          </div>
        )}
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        {text.formats}
      </p>
    </div>
  );
};