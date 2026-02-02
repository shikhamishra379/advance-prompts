
import { GoogleGenAI, Type } from "@google/genai";
import { ProductFormData, PromptOutput } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generatePrompts(data: ProductFormData): Promise<PromptOutput[]> {
    const packContext = data.isPack 
      ? `CRITICAL: This is a MULTI-PRODUCT PACK (${data.packSize}). The prompt MUST describe the entire collection of items. 
         Focus on the arrangement (symmetrical line, artistic cluster, staggered depth) of all items in the pack. 
         Ensure the collective presence is the hero of the shot, not just a single item.` 
      : "Focus on the individual product as the main hero.";

    const categoryNuance = `CATEGORY SPECIFIC INSTRUCTIONS:
      - For Kitchenware: Focus on heat, steam, stainless steel reflections, or food-safe environments. If using a model, visualize them chopping, plating, or holding the utensil with confidence (e.g., over a rustic chopping board).
      - For Books/Media: Focus on paper texture, binding details. If using a model, visualize them reading in a cozy setting, turning a page, or carrying the book in a lifestyle bag.
      - For Electronics: Focus on sleek surfaces, LED glows. If using a model, visualize them interacting with the UI, wearing the device, or using it in a high-tech environment.
      - For Furniture: Focus on space, scale, and materials. If using a model, visualize them relaxing or working at a desk naturally.
      - For Jewelry/Watches: Focus on extreme macro reflections and elegance. If using a model, focus on skin contact, hands, wrists, or necklines wearing the items with professional grace.`;

    const modelContext = data.modelEnabled 
      ? `MODEL INTEGRATION:
         The user wants to include a human model. 
         Model Persona/Action: ${data.modelPersona || 'A professional and elegant model interacting naturally with the product.'}
         You MUST generate 8 variations in total. 
         Variations 1-6: Standard E-commerce Suite (Hero, Lifestyle, Detail, Dynamic, Flat Lay, Atmospheric).
         Variations 7 and 8: EXCLUSIVE 'Interaction Blueprints'. These MUST focus on the physical touch and utility—e.g., a chef's hand grip on a knife handle, a finger pressing a button, or a hand holding a book while walking.` 
      : `No human model is requested. Keep focus strictly on the product and props. Generate 6 variations.`;

    const systemPrompt = `You are an expert product photography director specializing in high-end e-commerce visuals. 
    Based on the provided product details, generate a set of production-ready photography blueprints.
    
    Product Info:
    - Name: ${data.productName}
    - Category: ${data.category}
    - Form: ${data.productForm}
    - Container: ${data.containerType}
    - Styles: ${data.styles.join(', ')}
    - Branding: ${data.brandPositioning}
    - Technical: ${data.resolution} resolution, ${data.aspectRatio} aspect ratio, ${data.lightingStyle} lighting.
    
    ${categoryNuance}
    
    ${packContext}
    
    ${modelContext}
    
    Ensure the prompts are highly descriptive, using professional photography terminology (f-stop, ISO, lens types, lighting setups like softboxes or rim lights). 
    Return the response as an array of JSON objects matching the required schema.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
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

      const text = response.text || '[]';
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
}
