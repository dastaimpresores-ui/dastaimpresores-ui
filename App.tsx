import React, { useState } from 'react';
import { Accent, AudioEntry, Style, TtsSettings } from './types';
import { VOICES } from './constants';
import Controls from './components/Controls';
import TextInput from './components/TextInput';
import HistoryList from './components/HistoryList';
import { generateAudio } from './services/geminiService';

const DEFAULT_SETTINGS: TtsSettings = {
  voiceId: VOICES[15].id, // Default to a nice female voice (m1) or adjust index
  accent: Accent.ESPANA,
  style: Style.NATURAL,
  speed: 1.0,
  pitch: 0,
  bgSoundId: null,
  bgVolume: 0.2, // Default 20% volume for background
  seed: 42, // Default seed for consistent results
};

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<TtsSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<AudioEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const audioUrl = await generateAudio(text, settings);
      
      const newEntry: AudioEntry = {
        id: Date.now().toString(),
        text: text.trim(),
        audioUrl,
        timestamp: Date.now(),
        settings: { ...settings },
      };

      setHistory((prev) => [newEntry, ...prev]);

    } catch (err: any) {
      setError(err.message || 'Error desconocido al generar el audio.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-transparent">
      {/* Header */}
      <header className="backdrop-blur-md bg-slate-900/60 border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
                Voces Geniales AI
              </h1>
              <p className="text-xs text-indigo-300/80 font-medium tracking-wide">STUDIO DE VOZ</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-slate-300 font-medium">Gemini 2.5 Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {error && (
          <div className="mb-8 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-200 p-4 rounded-xl flex items-center gap-4 animate-fadeIn">
             <div className="p-2 bg-red-500/20 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
              <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Controls 
                settings={settings} 
                onChange={setSettings} 
                disabled={isLoading}
              />
              
              <div className="mt-6 p-4 rounded-2xl bg-indigo-900/20 border border-indigo-500/10 text-center">
                 <p className="text-xs text-indigo-300">
                   Tip: Prueba mezclar <span className="font-bold text-indigo-200">Fantasía/Terror</span> con el fondo <span className="font-bold text-indigo-200">Zumbido Siniestro</span>.
                 </p>
              </div>
            </div>
          </div>

          {/* Right Column: Text Input & Results */}
          <div className="lg:col-span-2 space-y-8">
            <TextInput 
              value={text} 
              onChange={setText} 
              disabled={isLoading}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            <HistoryList history={history} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;