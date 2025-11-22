import { GoogleGenAI } from "@google/genai";
import { StyleOption, GenerationSettings } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper to clean base64 string if it contains metadata prefix
const cleanBase64 = (base64: string) => {
  return base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
};

// Identify mime type from base64 string
const getMimeType = (base64: string) => {
  const match = base64.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
  if (match && match[1]) {
    return `image/${match[1]}`;
  }
  return 'image/jpeg'; // Default fallback
};

export const generateStylizedPet = async (
  originalImageBase64: string,
  style: StyleOption,
  settings: GenerationSettings
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Construct the prompt based on settings
    let strengthPrompt = "";
    if (settings.styleStrength < 40) {
      strengthPrompt = "Keep the image mostly realistic with subtle hints of the style.";
    } else if (settings.styleStrength > 80) {
      strengthPrompt = "Completely transform the image into this style, be very creative and abstract if needed.";
    } else {
      strengthPrompt = "Balance the original likeness with the artistic style.";
    }

    let colorPrompt = settings.preserveColor 
      ? "Try to preserve the original fur colors and patterns of the pet." 
      : "Feel free to adapt the colors to match the artistic style palette.";

    let backgroundPrompt = settings.dreamyBackground
      ? "Change the background to a dreamy, magical, or style-appropriate fantasy setting."
      : "Keep the background consistent with the subject but stylized.";

    const fullPrompt = `
      Transform the attached image of a pet.
      Target Style: ${style.promptModifier}.
      
      Instructions:
      1. Keep the main subject (the pet) recognizable in terms of pose and species.
      2. ${strengthPrompt}
      3. ${colorPrompt}
      4. ${backgroundPrompt}
      5. Ensure high quality, detailed output.
    `;

    const cleanData = cleanBase64(originalImageBase64);
    const mimeType = getMimeType(originalImageBase64);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanData,
              mimeType: mimeType
            }
          },
          {
            text: fullPrompt
          }
        ]
      }
    });

    // Extract image from response
    // Iterate through parts to find image, or check if it's inline
    // According to docs for generateContent with image output, it might return inlineData in parts
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts;

    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    // Fallback if no image found directly in parts (unlikely if successful)
    throw new Error("No image generated in response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};