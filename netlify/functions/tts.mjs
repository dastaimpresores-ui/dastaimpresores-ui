import { GoogleGenAI, Modality } from "@google/genai";

export const handler = async (event) => {
  // CORS básico
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

  if (!process.env.GEMINI_API_KEY) {
    return { statusCode: 500, headers: cors, body: "Missing GEMINI_API_KEY" };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: cors, body: "Invalid JSON" };
  }

  const { promptText, seed } = body;

  if (!promptText) {
    return { statusCode: 400, headers: cors, body: "Missing promptText" };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: promptText }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      seed: seed ?? undefined,
    },
  });

  const parts = resp?.candidates?.[0]?.content?.parts || [];
  const audioInline = parts.find((p) => p?.inlineData?.data)?.inlineData;

  if (!audioInline?.data) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: "No audio returned", parts }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify({
      audioB64: audioInline.data,
      mimeType: audioInline.mimeType || "audio/pcm",
    }),
  };
};
