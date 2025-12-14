export interface VoiceOption {
  id: string;
  name: string;
  category: 'Masculino' | 'Femenino' | 'Infantil' | 'Fantasía/Terror';
  geminiVoiceName: string; // Maps to 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
  styleDescription: string; // Internal instruction for the model to act the part
}

export interface SoundOption {
  id: string;
  name: string;
  category: 'Clima' | 'Ambiente' | 'Terror' | 'Música/Relax' | 'Efectos';
  url: string;
}

export enum Accent {
  NEUTRO = 'Latino Neutro',
  ESPANA = 'España',
  MEXICO = 'México',
  ARGENTINA = 'Argentina',
  // Variantes Colombianas
  COLOMBIA_ROLO = 'Colombia (Bogotá - Rolo)',
  COLOMBIA_PAISA = 'Colombia (Medellín - Paisa)',
  COLOMBIA_COSTENO = 'Colombia (Costa - Costeño)',
  COLOMBIA_CALENO = 'Colombia (Cali - Valluno)',
  COLOMBIA_PASTUSO = 'Colombia (Pasto - Pastuso)',
}

export enum Style {
  NATURAL = 'Natural',
  ALEGRE = 'Alegre',
  TRISTE = 'Triste',
  SUSURRAR = 'Susurrar',
  STORYTELLER = 'Storyteller',
  ENFATICO = 'Enfático',
}

export interface TtsSettings {
  voiceId: string;
  accent: Accent;
  style: Style;
  speed: number; // 0.5 to 2.0
  pitch: number; // -10 to 10 (abstract scale)
  bgSoundId: string | null; // ID of the background sound, null for none
  bgVolume: number; // 0.0 to 1.0 (mixing level)
  seed: number; // Integer for deterministic generation
}

export interface AudioEntry {
  id: string;
  text: string;
  audioUrl: string;
  timestamp: number;
  settings: TtsSettings;
  duration?: number;
}