import React from 'react';
import { Accent, Style, TtsSettings } from '../types';
import { VOICES, ACCENTS, STYLES, BACKGROUND_SOUNDS } from '../constants';

interface ControlsProps {
  settings: TtsSettings;
  onChange: (newSettings: TtsSettings) => void;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ settings, onChange, disabled }) => {
  
  const update = (key: keyof TtsSettings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  const randomizeSeed = () => {
    update('seed', Math.floor(Math.random() * 1000000));
  };

  // Group voices by category for easier selection
  const voiceCategories = ['Infantil', 'Fantasía/Terror', 'Femenino', 'Masculino'];
  // Group sounds by category
  const soundCategories = ['Clima', 'Ambiente', 'Terror', 'Música/Relax', 'Efectos'];

  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">
          Configuración
        </h2>
      </div>

      {/* 1. Selector de Voz */}
      <div>
        <label className="block text-sm font-semibold text-indigo-200 mb-2">
          1. Selecciona tu Personaje
        </label>
        <div className="relative">
          <select
            value={settings.voiceId}
            onChange={(e) => update('voiceId', e.target.value)}
            disabled={disabled}
            className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-3 pl-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition appearance-none hover:bg-slate-800/50"
          >
            {voiceCategories.map(cat => (
              <optgroup key={cat} label={cat} className="bg-slate-900 text-indigo-300 font-bold">
                {VOICES.filter(v => v.category === cat).map(v => (
                  <option key={v.id} value={v.id} className="text-white font-normal bg-slate-800">
                    {v.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
             <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 2. Selector de Acento */}
        <div>
          <label className="block text-sm font-semibold text-indigo-200 mb-2">
            2. Acento
          </label>
          <select
            value={settings.accent}
            onChange={(e) => update('accent', e.target.value as Accent)}
            disabled={disabled}
            className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-slate-800/50 transition"
          >
            {ACCENTS.map((accent) => (
              <option key={accent} value={accent}>{accent}</option>
            ))}
          </select>
        </div>

        {/* 3. Selector de Estilo */}
        <div>
          <label className="block text-sm font-semibold text-indigo-200 mb-2">
            3. Estilo
          </label>
          <select
            value={settings.style}
            onChange={(e) => update('style', e.target.value as Style)}
            disabled={disabled}
            className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-slate-800/50 transition"
          >
            {STYLES.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector de Fondo */}
      <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
        <label className="block text-sm font-semibold text-indigo-200 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 10l12-3" />
          </svg>
          Música / Sonido de Fondo
        </label>
        
        <div className="relative mb-3">
          <select
            value={settings.bgSoundId || ''}
            onChange={(e) => update('bgSoundId', e.target.value || null)}
            disabled={disabled}
            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">(Ninguno - Solo Voz)</option>
            {soundCategories.map(cat => (
              <optgroup key={cat} label={cat} className="bg-slate-900 text-slate-300">
                {BACKGROUND_SOUNDS.filter(s => s.category === cat).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {settings.bgSoundId && (
          <div className="space-y-1 animate-fadeIn">
             <div className="flex justify-between text-xs text-slate-400">
               <span>Volumen Fondo</span>
               <span>{Math.round(settings.bgVolume * 100)}%</span>
             </div>
             <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={settings.bgVolume}
              onChange={(e) => update('bgVolume', parseFloat(e.target.value))}
              disabled={disabled}
              className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 4. Selector de Velocidad */}
        <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-indigo-200">4. Velocidad</label>
            <span className="text-xs font-mono text-white bg-indigo-600/50 px-2 py-0.5 rounded-md">
              {settings.speed}x
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.speed}
            onChange={(e) => update('speed', parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          />
        </div>

        {/* 5. Selector de Tono */}
        <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-indigo-200">5. Tono</label>
            <span className="text-xs font-mono text-white bg-indigo-600/50 px-2 py-0.5 rounded-md">
              {settings.pitch > 0 ? `+${settings.pitch}` : settings.pitch}
            </span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={settings.pitch}
            onChange={(e) => update('pitch', parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          />
        </div>
      </div>

      {/* 6. Selector de Semilla */}
      <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
         <div className="flex-grow">
            <label className="block text-sm font-semibold text-indigo-200 mb-1">
              6. Consistencia (Semilla)
            </label>
            <p className="text-[10px] text-slate-400">El mismo número produce la misma entonación.</p>
         </div>
         <div className="flex items-center gap-2">
            <input 
              type="number"
              value={settings.seed}
              onChange={(e) => update('seed', parseInt(e.target.value) || 0)}
              disabled={disabled}
              className="w-20 bg-slate-800 border border-slate-600 rounded-lg py-1 px-2 text-white text-right font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              onClick={randomizeSeed}
              disabled={disabled}
              className="p-2 bg-slate-700 hover:bg-indigo-600 rounded-lg text-white transition shadow-lg"
              title="Aleatorizar Semilla"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
         </div>
      </div>
    </div>
  );
};

export default Controls;