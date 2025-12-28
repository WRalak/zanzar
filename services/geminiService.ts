
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithAI = async (message: string, history: {role: string, parts: any[]}[], language: string = 'en') => {
  const ai = getAI();
  const systemInstruction = `
    You are Zanzara Estate AI, a multilingual real estate expert for East Africa.
    Current Language Preference: ${language}.
    You help users with property laws in Kenya, Tanzania, Uganda, Rwanda, and Ethiopia.
    You assist with property descriptions, rental advice, and agent queries.
    Be professional, helpful, and modern.
    Current available languages are English, Swahili, French, German, and Amharic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

export const analyzeProperty = async (description: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this property description into a list of 5 key selling points: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sellingPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"sellingPoints": []}');
  } catch (error) {
    return { sellingPoints: ["Excellent Location", "Spacious Interior"] };
  }
};
