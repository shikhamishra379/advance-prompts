import { GoogleGenAI, Type } from "@google/genai";
import { ProductFormData, PromptOutput } from "../types";

export class GeminiService {
  async generatePrompts(data: ProductFormData): Promise<PromptOutput[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const packContext = data.isPack 
      ? `CRITICAL: This is a MULTI-PRODUCT PACK (${data.packSize}). The prompt MUST describe the entire collection of items. 
         Focus on the arrangement (symmetrical line, artistic cluster, staggered depth) of all items in the pack. 
         Ensure the collective presence is the hero of the shot, not just a single item.` 
      : "Focus on the individual product as the main hero.";

    const categoryNuance = `CATEGORY SPECIFIC INSTRUCTIONS:
      - For Kitchenware: Focus on heat, steam, stainless steel reflections, or food-safe environments.
      - For Books/Media: Focus on paper texture, binding details, and natural "at-home" lighting.
      - For Electronics: Focus on sleek surfaces, LED glows, and high-tech environments.
      - For Furniture: Focus on space, scale, and materials in high-end architectural settings.
      - For Jewelry/Watches: Focus on extreme macro reflections and high-end elegance.`;

    const modelContext = data.modelEnabled 
      ? `MODEL INTEGRATION:
         The user wants to include a human model. 
         Model Persona/Action: ${data.modelPersona || 'A professional and elegant model interacting naturally with the product.'}
         Generate 8 variations. Variations 7 and 8 MUST focus on the physical touch—e.g., a hand grip or usage detail.` 
      : `No human model. Focus strictly on the product. Generate 6 variations.`;

    const systemPrompt = `You are an expert product photography director. 
    Generate a set of high-end photography blueprints for:
    - Name: ${data.productName}
    - Category: ${data.category}
    - Branding: ${data.brandPositioning}
    - Technical: ${data.resolution} resolution, ${data.aspectRatio} aspect ratio, ${data.lightingStyle} lighting.
    
    ${categoryNuance}
    ${packContext}
    ${modelContext}
    
    Use professional photography terminology. Return a JSON array.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Generate ${data.modelEnabled ? '8' : '6'} detailed e-commerce product photography prompt variations as JSON.`,
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

      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
}