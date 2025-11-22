import React from 'react';
import { STYLES } from '../constants';
import { StyleOption } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: StyleOption | null;
  onSelect: (style: StyleOption) => void;
  lang: 'en' | 'zh';
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, lang }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {STYLES.map((style, index) => {
          const isSelected = selectedStyle?.id === style.id;
          const name = lang === 'zh' ? style.name_zh : style.name;
          const description = lang === 'zh' ? style.description_zh : style.description;
          
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style)}
              className={`
                relative group flex flex-col items-stretch text-left rounded-xl overflow-hidden transition-all duration-300
                ${isSelected 
                  ? 'ring-4 ring-violet-500 scale-[1.02] shadow-xl z-10' 
                  : 'hover:scale-[1.03] hover:shadow-lg ring-1 ring-slate-200 hover:ring-violet-300 z-0'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Preview Area (Simulated with color since we don't have static assets) */}
              <div className={`h-24 ${style.previewColor} flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110`}>
                <span className="drop-shadow-lg filter">{style.icon}</span>
              </div>

              {/* Content */}
              <div className="p-3 bg-white flex-1 transition-colors group-hover:bg-slate-50">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{name}</h4>
                  <CheckCircle2 
                    className={`w-4 h-4 text-violet-600 shrink-0 transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                  />
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{description}</p>
              </div>
              
            </button>
          );
        })}
      </div>
    </div>
  );
};