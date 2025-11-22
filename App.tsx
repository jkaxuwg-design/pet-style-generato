import React, { useState, useEffect } from 'react';
import { UploadZone } from './components/UploadZone';
import { StyleSelector } from './components/StyleSelector';
import { Controls } from './components/Controls';
import { ComparisonSlider } from './components/ComparisonSlider';
import { Button } from './components/Button';
import { AppState, StyleOption, GenerationSettings, GeneratedImage } from './types';
import { DEFAULT_SETTINGS, STYLES, TRANSLATIONS } from './constants';
import { generateStylizedPet } from './services/geminiService';
import { Wand2, Download, RefreshCcw, Share2, ChevronLeft, Zap, Languages } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Language State
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const text = TRANSLATIONS[lang];
  const loadingMessages = TRANSLATIONS[lang].loadingMessages;
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  // Rotate loading messages
  useEffect(() => {
    let interval: any;
    if (appState === AppState.GENERATING) {
      let i = 0;
      setLoadingMessage(loadingMessages[0]); // Reset to first message
      interval = setInterval(() => {
        i = (i + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[i]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [appState, lang, loadingMessages]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleImageSelected = (base64: string) => {
    setOriginalImage(base64);
    setAppState(AppState.CONFIGURE);
  };

  const handleGenerate = async () => {
    if (!originalImage || !selectedStyle) return;

    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const stylizedBase64 = await generateStylizedPet(originalImage, selectedStyle, settings);
      
      setGeneratedImage({
        original: originalImage,
        stylized: stylizedBase64,
        styleId: selectedStyle.id,
        timestamp: Date.now()
      });
      setAppState(AppState.RESULT);
    } catch (err: any) {
      console.error(err);
      setError(text.errorGen);
      setAppState(AppState.CONFIGURE);
    }
  };

  const handleReset = () => {
    setAppState(AppState.UPLOAD);
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
  };

  const handleBackToConfigure = () => {
    setAppState(AppState.CONFIGURE);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage.stylized;
    link.download = `pet-style-${generatedImage.styleId}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm transition-all">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={handleReset}>
            <div className="bg-violet-600 text-white p-1.5 rounded-lg transition-transform group-hover:rotate-12 group-hover:scale-110">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              {text.title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
             <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition-colors"
             >
               <Languages className="w-4 h-4" />
               <span>{lang === 'en' ? 'EN' : '中文'}</span>
             </button>

            {appState !== AppState.UPLOAD && (
              <Button variant="ghost" onClick={handleReset} className="text-sm">
                {text.startOver}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        
        {/* UPLOAD STATE */}
        {appState === AppState.UPLOAD && (
          <div className="flex flex-col items-center animate-fade-in-up space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {text.heroTitle} <br/>
                <span className="text-violet-600 relative inline-block">
                  {text.heroHighlight}
                  <svg className="absolute w-full h-2 bottom-1 left-0 text-yellow-300 -z-10" fill="currentColor" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                {text.heroDesc}
              </p>
            </div>
            <UploadZone onImageSelected={handleImageSelected} text={text} />
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-3xl mt-12 opacity-50 pointer-events-none grayscale animate-fade-in-up animation-delay-300">
               {/* Decorative preview grid */}
               <div className="aspect-square bg-blue-100 rounded-lg transform translate-y-4"></div>
               <div className="aspect-square bg-pink-100 rounded-lg transform -translate-y-4"></div>
               <div className="aspect-square bg-orange-100 rounded-lg transform translate-y-2"></div>
            </div>
          </div>
        )}

        {/* CONFIGURE STATE */}
        {appState === AppState.CONFIGURE && originalImage && (
          <div className="grid md:grid-cols-12 gap-8 animate-fade-in-up">
            {/* Left: Preview & Styles */}
            <div className="md:col-span-8 space-y-8">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                 <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center group">
                   <img 
                    src={originalImage} 
                    alt="Original Preview" 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md">
                    {text.originalImage}
                  </div>
                 </div>
              </div>

              <div className="animate-fade-in-up animation-delay-100">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="bg-violet-100 text-violet-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  {text.step1}
                </h3>
                <StyleSelector 
                  selectedStyle={selectedStyle} 
                  onSelect={setSelectedStyle}
                  lang={lang}
                />
              </div>
            </div>

            {/* Right: Settings & Action */}
            <div className="md:col-span-4 space-y-6 animate-fade-in-up animation-delay-200">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="bg-violet-100 text-violet-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  {text.step2}
                </h3>
                <Controls settings={settings} onSettingsChange={setSettings} text={text} />
              </div>

              <div className="sticky bottom-4 md:static pt-4 bg-slate-50 md:bg-transparent p-4 md:p-0 -mx-4 md:mx-0 border-t md:border-0 border-slate-200 z-20">
                 {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 animate-bounce">
                    {error}
                  </div>
                )}
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={!selectedStyle}
                  className="w-full py-4 text-lg shadow-xl shadow-violet-200 transition-transform active:scale-95"
                  icon={<Wand2 className="w-5 h-5" />}
                >
                  {text.generate}
                </Button>
                {!selectedStyle && (
                  <p className="text-center text-xs text-slate-400 mt-2">{text.selectStyleFirst}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GENERATING STATE */}
        {appState === AppState.GENERATING && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fade-in-up">
            <div className="w-full max-w-md text-center space-y-6">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Wand2 className="w-8 h-8 text-violet-600 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{text.generating}</h3>
                <p className="text-slate-500 animate-pulse">{loadingMessage}</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 w-1/2 animate-[shimmer_2s_infinite_linear]"></div>
              </div>
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {appState === AppState.RESULT && generatedImage && (
          <div className="animate-fade-in-up space-y-8">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBackToConfigure} icon={<ChevronLeft className="w-4 h-4" />}>
                {text.adjust}
              </Button>
              <div className="flex space-x-2">
                <Button variant="secondary" icon={<Share2 className="w-4 h-4" />}>
                  {text.share}
                </Button>
                <Button variant="primary" onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
                  {text.download}
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400"></div>
               <h2 className="text-2xl font-bold mb-6">
                 {text.resultTitle} <span className="text-violet-600 capitalize">
                   {lang === 'zh' 
                     ? (STYLES.find(s => s.id === generatedImage.styleId)?.name_zh) 
                     : (STYLES.find(s => s.id === generatedImage.styleId)?.name)
                   }
                  </span> {text.resultPet}
               </h2>
               
               <ComparisonSlider 
                  beforeImage={generatedImage.original} 
                  afterImage={generatedImage.stylized} 
                  text={text}
               />
               
               <p className="mt-6 text-slate-500 text-sm">{text.dragSlider}</p>
            </div>

            <div className="flex justify-center pb-12">
               <Button variant="outline" onClick={handleReset} icon={<RefreshCcw className="w-4 h-4" />}>
                 {text.uploadAnother}
               </Button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}