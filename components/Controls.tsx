import React from 'react';
import { GenerationSettings } from '../types';
import { Sliders, Palette, Wand2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ControlsProps {
  settings: GenerationSettings;
  onSettingsChange: (newSettings: GenerationSettings) => void;
  text: typeof TRANSLATIONS.en;
}

export const Controls: React.FC<ControlsProps> = ({ settings, onSettingsChange, text }) => {
  const handleChange = (key: keyof GenerationSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="font-bold text-slate-800 flex items-center">
        <Sliders className="w-5 h-5 mr-2 text-violet-600" />
        {text.adjust}
      </h3>

      {/* Style Strength Slider */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-700 font-medium">{text.styleIntensity}</span>
          <span className="text-violet-600 font-bold">{settings.styleStrength}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={settings.styleStrength}
          onChange={(e) => handleChange('styleStrength', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600 hover:accent-violet-700 transition-colors"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>{text.subtle}</span>
          <span>{text.balanced}</span>
          <span>{text.intense}</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4 pt-2">
        <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-slate-50 rounded-lg transition-colors -mx-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3 group-hover:bg-pink-200 transition-colors duration-300">
              <Palette className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">{text.preserveColor}</span>
              <span className="text-xs text-slate-500">{text.preserveColorDesc}</span>
            </div>
          </div>
          <input 
            type="checkbox"
            checked={settings.preserveColor}
            onChange={(e) => handleChange('preserveColor', e.target.checked)}
            className="w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-slate-50 rounded-lg transition-colors -mx-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors duration-300">
              <Wand2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">{text.dreamyBg}</span>
              <span className="text-xs text-slate-500">{text.dreamyBgDesc}</span>
            </div>
          </div>
          <input 
            type="checkbox"
            checked={settings.dreamyBackground}
            onChange={(e) => handleChange('dreamyBackground', e.target.checked)}
            className="w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};