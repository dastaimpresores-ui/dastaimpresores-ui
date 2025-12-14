// Service to handle advanced audio mixing on the client side
import { BACKGROUND_SOUNDS } from '../constants';

export const mixAudioTracks = async (
  speechBlobUrl: string,
  bgSoundId: string | null,
  bgVolume: number
): Promise<string> => {
  if (!bgSoundId || bgVolume === 0) {
    return speechBlobUrl;
  }

  const bgSound = BACKGROUND_SOUNDS.find(s => s.id === bgSoundId);
  if (!bgSound) {
    console.warn(`Background sound ${bgSoundId} not found.`);
    return speechBlobUrl;
  }

  try {
    // Standardize sample rate for the output
    const SAMPLE_RATE = 44100;
    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    
    // Helper context just for decoding. 
    // We do NOT create the OfflineAudioContext yet because we need the duration first.
    const tempCtx = new AudioContextClass(); 

    // 1. Fetch & Decode Speech
    const speechResponse = await fetch(speechBlobUrl);
    const speechArrayBuffer = await speechResponse.arrayBuffer();
    const speechBuffer = await tempCtx.decodeAudioData(speechArrayBuffer);

    // 2. Fetch & Decode Background
    const bgResponse = await fetch(bgSound.url, { mode: 'cors' });
    if (!bgResponse.ok) throw new Error('Failed to load background sound');
    const bgArrayBuffer = await bgResponse.arrayBuffer();
    const bgBuffer = await tempCtx.decodeAudioData(bgArrayBuffer);

    // 3. Setup Offline Context for Mixing
    // Duration is determined exactly by the speech duration
    const duration = speechBuffer.duration;
    
    // Safety check for duration
    if (!duration || duration <= 0) {
        return speechBlobUrl;
    }

    const renderCtx = new OfflineAudioContext(2, Math.ceil(duration * SAMPLE_RATE), SAMPLE_RATE);

    // 4. Prepare Speech Source
    const speechSource = renderCtx.createBufferSource();
    speechSource.buffer = speechBuffer;
    speechSource.connect(renderCtx.destination);

    // 5. Prepare Background Source (Looping)
    const bgSource = renderCtx.createBufferSource();
    bgSource.buffer = bgBuffer;
    bgSource.loop = true;
    
    const bgGain = renderCtx.createGain();
    bgGain.gain.value = bgVolume;
    
    bgSource.connect(bgGain);
    bgGain.connect(renderCtx.destination);

    // 6. Start sources
    speechSource.start(0);
    bgSource.start(0);

    // 7. Render
    const renderedBuffer = await renderCtx.startRendering();

    // 8. Convert to WAV Blob
    return bufferToWave(renderedBuffer, renderedBuffer.length);

  } catch (error) {
    console.error("Audio mixing failed:", error);
    // Fallback to just speech if mixing fails (e.g. CORS error on bg sound)
    return speechBlobUrl;
  }
};

// Helper function to convert AudioBuffer to WAV Blob
function bufferToWave(abuffer: AudioBuffer, len: number) {
  let numOfChan = abuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [], i, sample,
      offset = 0,
      pos = 0;

  // write WAVE header
  setUint32(0x46464952);                         // "RIFF"
  setUint32(length - 8);                         // file length - 8
  setUint32(0x45564157);                         // "WAVE"

  setUint32(0x20746d66);                         // "fmt " chunk
  setUint32(16);                                 // length = 16
  setUint16(1);                                  // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2);                      // block-align
  setUint16(16);                                 // 16-bit (hardcoded in this example)

  setUint32(0x61746164);                         // "data" - chunk
  setUint32(length - pos - 4);                   // chunk length

  // write interleaved data
  for(i = 0; i < abuffer.numberOfChannels; i++)
    channels.push(abuffer.getChannelData(i));

  while(pos < len) {
    for(i = 0; i < numOfChan; i++) {             // interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][pos])); // clamp
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
      view.setInt16(44 + offset, sample, true); // write 16-bit sample
      offset += 2;
    }
    pos++;
  }

  return URL.createObjectURL(new Blob([buffer], {type: "audio/wav"}));

  function setUint16(data: any) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: any) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
}