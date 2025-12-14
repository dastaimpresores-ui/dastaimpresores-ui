import { GoogleGenAI, Modality } from "@google/genai";

export async function handler(event) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { promptText = "", seed, voiceName } = payload;

  if (!promptText) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "Missing promptText" }) };
  }

  const ai = new GoogleGenAI({ apiKey });

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: promptText }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      seed: seed ?? undefined,
      ...(voiceName
        ? {
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          }
        : {}),
    },
  });

  const parts = resp?.candidates?.[0]?.content?.parts || [];
  const audioPart = parts.find((p) => p?.inlineData?.data);

  if (!audioPart?.inlineData?.data) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "No audio returned", raw: resp }) };
  }

  return {
    statusCode: 200,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify({
      audioB64: audioPart.inlineData.data,
      mimeType: audioPart.inlineData.mimeType || "audio/pcm",
    }),
  };
}
