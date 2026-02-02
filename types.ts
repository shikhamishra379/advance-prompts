
export interface ProductIntelligence {
  physicalForm: string;
  creativeDefault: number;
  lightingDefault: string;
  liquidDripAppropriate: boolean;
  powderEffectAppropriate: boolean;
  suggestedBackgrounds: string[];
  suggestedMoods: string[];
}

export interface ProductFormData {
  productName: string;
  category: string;
  productForm: string;
  containerType: string;
  isPack: boolean;
  packSize: string;
  modelEnabled: boolean;
  modelPersona: string;
  styles: string[];
  colors: string[];
  brandPositioning: string;
  moodTags: string[];
  resolution: string;
  aspectRatio: string;
  depthOfField: string;
  cameraAngle: string;
  lightingStyle: string;
  shadowIntensity: number;
  creativeLevel: number;
  advancedEffects: {
    mascotEnabled: boolean;
    mascotStyle: string;
    liquidDripEnabled: boolean;
    powderEnabled: boolean;
    accessories: string[];
  };
  referenceImage?: string;
}

export interface PromptOutput {
  id: string;
  title: string;
  purpose: string;
  description: string;
  fullPrompt: string;
  sections: {
    header: string;
    scene: string;
    placement: string;
    supporting: string;
    dynamic: string;
    lighting: string;
    camera: string;
    color: string;
    tech: string;
    quality: string;
    negative: string;
  };
}

export type TabType = 'form' | 'results';