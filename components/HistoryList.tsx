import React, { useRef, useState, useEffect } from 'react';
import { AudioEntry } from '../types';
import { VOICES } from '../constants';

interface HistoryListProps {
  history: AudioEntry[];
}

const HistoryItem: React.FC<{ entry: AudioEntry }> = ({ entry }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const voiceName = VOICES.find(v => v.id === entry.settings.voiceId)?.name || 'Voz Desconocida';
  const date = new Date(entry.timestamp).toLocaleString('es-ES');

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onVolumeChange = () => {
      setVolume(audio.volume);
    };

    // Sync state if native controls are used
    audio.addEventListener('volumechange', onVolumeChange);
    return () => {
      audio.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  return (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-indigo-500/50 transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-indigo-400 font-semibold text-sm">{voiceName}</span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-slate-500 text-xs">{entry.settings.accent}</span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-slate-500 text-xs">{entry.settings.style}</span>
          </div>
          <p className="text-slate-300 text-sm line-clamp-2 italic">"{entry.text}"</p>
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">
          {date}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-grow flex items-center gap-2 bg-slate-800 rounded px-2 border border-slate-700">
          <audio 
            ref={audioRef}
            controls 
            src={entry.audioUrl} 
            className="flex-grow h-8 block outline-none bg-transparent"
          />
          {/* Custom Volume Slider */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-600 h-full py-1 min-w-[100px] max-w-[140px]">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                title={`Volumen: ${Math.round(volume * 100)}%`}
              />
          </div>
        </div>
        
        <a 
          href={entry.audioUrl} 
          download={`audio-geniales-${entry.id}.mp3`}
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg transition border border-slate-600"
          title="Descargar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
        Historial de Generaciones
      </h2>
      
      <div className="space-y-4">
        {history.map((entry) => (
          <HistoryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;