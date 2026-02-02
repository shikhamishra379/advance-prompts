import { GoogleGenAI, Type } from "@google/genai";
import { ProductFormData, PromptOutput } from "../types";

export class GeminiService {
  async generatePrompts(data: ProductFormData): Promise<PromptOutput[]> {
    // Strictly follow the required initialization pattern
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const packContext = data.isPack 
      ? `CRITICAL: This is a MULTI-PRODUCT PACK (${data.packSize}). The prompt MUST describe the entire collection of items. 
         Focus on the arrangement (symmetrical line, artistic cluster, staggered depth) of all items in the pack.` 
      : "Focus on the individual product as the main hero.";

    const systemPrompt = `You are an expert product photography director. 
    Generate a set of high-end photography blueprints for:
    - Name: ${data.productName}
    - Category: ${data.category}
    - Branding: ${data.brandPositioning}
    - Technical: ${data.resolution} resolution, ${data.aspectRatio} aspect ratio, ${data.lightingStyle} lighting.
    
    ${packContext}
    
    Return a JSON array of ${data.modelEnabled ? '8' : '6'} objects. Each object must include a creative title, professional purpose, and technical breakdown.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `Create the photography master suite for ${data.productName} as JSON.`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                purpose: { type: Type.STRING },
                description: { type: Type.STRING },
                fullPrompt: { type: Type.STRING },
                sections: {
                  type: Type.OBJECT,
                  properties: {
                    header: { type: Type.STRING },
                    scene: { type: Type.STRING },
                    placement: { type: Type.STRING },
                    supporting: { type: Type.STRING },
                    dynamic: { type: Type.STRING },
                    lighting: { type: Type.STRING },
                    camera: { type: Type.STRING },
                    color: { type: Type.STRING },
                    tech: { type: Type.STRING },
                    quality: { type: Type.STRING },
                    negative: { type: Type.STRING },
                  },
                  required: ["header", "scene", "placement", "supporting", "dynamic", "lighting", "camera", "color", "tech", "quality", "negative"]
                }
              },
              required: ["id", "title", "purpose", "description", "fullPrompt", "sections"]
            }
          }
        },
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
}