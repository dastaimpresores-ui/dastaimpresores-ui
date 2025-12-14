import { GoogleGenAI, Modality } from "@google/genai";
import { TtsSettings } from "../types";
import { VOICES } from "../constants";
import { mixAudioTracks } from "./audioMixer";

// Helper convert base64 to Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Add WAV header to raw PCM data so browsers can play it
const pcmToWav = (pcmData: Uint8Array, sampleRate: number = 24000, numChannels: number = 1): Blob => {
  const headerLength = 44;
  const byteLength = pcmData.length + headerLength;
  const buffer = new ArrayBuffer(byteLength);
  const view = new DataView(buffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF identifier
  writeString(0, 'RIFF');
  // file length
  view.setUint32(4, 36 + pcmData.length, true);
  // RIFF type
  writeString(8, 'WAVE');
  // format chunk identifier
  writeString(12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sampleRate * blockAlign)
  view.setUint32(28, sampleRate * numChannels * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, numChannels * 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  writeString(36, 'data');
  // data chunk length
  view.setUint32(40, pcmData.length, true);

  // write the PCM samples
  const pcmView = new Uint8Array(buffer, headerLength);
  pcmView.set(pcmData);

  return new Blob([buffer], { type: 'audio/wav' });
};

const getSpeedDescription = (speed: number) => {
  if (speed <= 0.7) return "muy lenta";
  if (speed < 1.0) return "lenta";
  if (speed === 1.0) return "normal";
  if (speed < 1.3) return "rápida";
  return "muy rápida";
};

const getPitchDescription = (pitch: number) => {
  if (pitch <= -5) return "muy grave";
  if (pitch < 0) return "grave";
  if (pitch === 0) return "normal";
  if (pitch < 5) return "aguda";
  return "muy aguda";
};

export const generateAudio = async (
  text: string,
  settings: TtsSettings
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key no encontrada. Asegúrate de tener la variable de entorno configurada.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const selectedVoice = VOICES.find(v => v.id === settings.voiceId) || VOICES[0];
  
  // Enhanced prompt to force character acting
  const promptText = `
    Eres un actor de voz profesional. Tu tarea es generar un audio leyendo el siguiente texto.
    
    CONFIGURACIÓN DE PERSONAJE (MUY IMPORTANTE):
    - ${selectedVoice.styleDescription}
    
    CONFIGURACIÓN TÉCNICA:
    - Idioma/Acento: Español (${settings.accent}).
    - Emoción/Estilo: ${settings.style}.
    - Velocidad: ${getSpeedDescription(settings.speed)}.
    - Tono base: ${getPitchDescription(settings.pitch)}.
    
    INSTRUCCIONES DE ACTUACIÓN:
    - Interpreta fielmente las etiquetas en el texto para generar sonidos no verbales.
    - Etiquetas soportadas: [pausa], [risa], [grito], [llanto], [suspiro], [tos], [carraspera], [bostezo], [respiracion], [beso], [silbido], [chasquido], [estornudo], [tarareo].
    - Si el personaje es un niño, suena infantil. Si es terror, suena aterrador.
    
    TEXTO A LEER:
    "${text}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        // Pass the seed for deterministic output (same seed + same input = same audio)
        seed: settings.seed,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice.geminiVoiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      const textResponse = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        console.error("Model refused to generate audio:", textResponse);
        throw new Error("El modelo no generó audio, respondió con texto: " + textResponse);
      }
      throw new Error("No se generó audio en la respuesta de la API.");
    }

    const pcmData = base64ToUint8Array(base64Audio);
    const speechBlob = pcmToWav(pcmData, 24000); 
    const speechUrl = URL.createObjectURL(speechBlob);

    // If background sound is selected, mix it
    if (settings.bgSoundId && settings.bgVolume > 0) {
      return await mixAudioTracks(speechUrl, settings.bgSoundId, settings.bgVolume);
    }

    return speechUrl;

  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
};