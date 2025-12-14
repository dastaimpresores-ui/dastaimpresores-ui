import React from 'react';
import { SPECIAL_TAGS } from '../constants';

interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  onGenerate: () => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, disabled, onGenerate, isLoading }) => {
  
  const insertTag = (tag: string) => {
    // Simple insertion at end for simplicity
    onChange(value + (value.length > 0 && !value.endsWith(' ') ? ' ' : '') + tag + ' ');
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Guion / Texto
      </h2>
      
      {/* 7. Etiquetas Especiales */}
      <div className="mb-4">
        <span className="text-xs text-indigo-200/70 block mb-2 uppercase tracking-wider font-semibold">
          Insertar Acción:
        </span>
        <div className="flex flex-wrap gap-2">
          {SPECIAL_TAGS.map((item) => (
            <button
              key={item.tag}
              onClick={() => insertTag(item.tag)}
              disabled={disabled}
              className="group bg-slate-700/50 hover:bg-indigo-600/20 hover:border-indigo-500/50 text-indigo-300 text-xs px-3 py-2 rounded-lg transition-all border border-slate-600 flex items-center gap-2"
              title={`Insertar ${item.label}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
              </svg>
              <span className="font-medium">{item.label}</span>
              <span className="font-mono text-[10px] opacity-50 ml-1">{item.tag}</span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Escribe aquí el texto que deseas convertir a voz... Usa las etiquetas de arriba para añadir emoción."
        className="w-full flex-grow bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-lg leading-relaxed transition-all"
        style={{ minHeight: '200px' }}
      />

      <div className="mt-6 flex justify-between items-center">
        <span className="text-xs text-slate-500">
          {value.length} caracteres
        </span>
        <button
          onClick={onGenerate}
          disabled={disabled || !value.trim()}
          className={`
            px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
            ${isLoading 
              ? 'bg-slate-700 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 active:scale-95'}
          `}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Generar Audio
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextInput;
