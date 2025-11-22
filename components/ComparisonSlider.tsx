import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  text: typeof TRANSLATIONS.en;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage, text }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);
    
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-2xl mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white group"
      onMouseDown={(e) => handleMove(e.clientX)}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After Image (Base) */}
      <img 
        src={afterImage} 
        alt="Stylized" 
        className="absolute inset-0 w-full h-full object-cover" 
        draggable={false}
      />

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Original" 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-colors group-hover:bg-violet-200"
        style={{ left: `${sliderPosition}%` }}
      >
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-violet-600 transition-transform duration-200 ${isDragging ? 'scale-125 bg-violet-50' : ''}`}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <ChevronsLeftRight className="w-6 h-6" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100">{text.compareOriginal}</div>
      <div className="absolute top-4 right-4 bg-violet-600/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100">{text.compareStylized}</div>
    </div>
  );
};