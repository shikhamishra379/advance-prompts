
import { ProductIntelligence } from './types';

export const CATEGORIES = [
  'Beauty & Personal Care',
  'Beverages & Spirits',
  'Books & Media',
  'Kitchenware & Cookware',
  'Consumer Electronics',
  'Fashion & Accessories',
  'Footwear',
  'Furniture & Home Decor',
  'Gourmet Food',
  'Health & Wellness',
  'Home Office & Furniture',
  'Home Appliances',
  'Jewelry & Watches',
  'Luxury Fragrance',
  'Outdoor Gear',
  'Garden & Patio',
  'Pet Supplies',
  'Sports Equipment',
  'Musical Instruments',
  'Automotive Accessories',
  'Stationery & Office',
  'Tools & Hardware',
  'Toys & Games',
  'Travel Gear',
  'Baby & Toddler',
  'Arts, Crafts & Hobby',
  'Vitamins & Supplements',
  'Industrial & Scientific'
];

export const PHYSICAL_FORMS = [
  'Cream',
  'Liquid',
  'Gel',
  'Powder',
  'Solid',
  'Spray',
  'Oil',
  'Paste',
  'Waxy',
  'Granular',
  'Aerosol',
  'Capsule/Tablet',
  'Mist',
  'Serum',
  'Balm',
  'Foam',
  'Textile/Fabric',
  'Paper/Cardstock',
  'Metal/Hardware'
];

export const CONTAINER_TYPES = [
  'Glass Bottle',
  'Plastic Bottle',
  'Glass Jar',
  'Plastic Jar',
  'Metal Can',
  'Tube',
  'Pump Bottle',
  'Dropper Bottle',
  'Spray Bottle',
  'Cardboard Box',
  'Sachet/Pouch',
  'Wrapped',
  'Tin',
  'Display Stand',
  'Compact',
  'Stick',
  'Hardcover/Binding',
  'Ceramic/Stone Vessel',
  'Wooden Crate',
  'Open/No Container'
];

export const PRODUCT_INTELLIGENCE: Record<string, ProductIntelligence> = {
  'Beauty & Personal Care': {
    physicalForm: 'Cream',
    creativeDefault: 7,
    lightingDefault: 'Studio Softbox',
    liquidDripAppropriate: true,
    powderEffectAppropriate: false,
    suggestedBackgrounds: ['Marble/Stone', 'Pure White', 'Minimalist Bathroom'],
    suggestedMoods: ['Luxury & Sophistication', 'Fresh & Clean']
  },
  'Beverages & Spirits': {
    physicalForm: 'Liquid',
    creativeDefault: 8,
    lightingDefault: 'Dramatic Rim Lighting',
    liquidDripAppropriate: true,
    powderEffectAppropriate: false,
    suggestedBackgrounds: ['Dark Wood', 'Urban Bar', 'Splash Photography'],
    suggestedMoods: ['Premium', 'Refreshing']
  },
  'Books & Media': {
    physicalForm: 'Solid',
    creativeDefault: 4,
    lightingDefault: 'Natural Sunlight',
    liquidDripAppropriate: false,
    powderEffectAppropriate: false,
    suggestedBackgrounds: ['Wooden Bookshelf', 'Cozy Reading Nook', 'Minimalist Desk'],
    suggestedMoods: ['Intellectual', 'Warm & Academic', 'Cozy']
  },
  'Kitchenware & Cookware': {
    physicalForm: 'Solid',
    creativeDefault: 6,
    lightingDefault: 'High Key',
    liquidDripAppropriate: true,
    powderEffectAppropriate: true,
    suggestedBackgrounds: ['Modern Kitchen Countertop', 'Tiled Backsplash', 'Rustic Wooden Table'],
    suggestedMoods: ['Culinary Excellence', 'Homey & Warm', 'Professional']
  },
  'Consumer Electronics': {
    physicalForm: 'Solid',
    creativeDefault: 5,
    lightingDefault: 'Cinematic High-Contrast',
    liquidDripAppropriate: false,
    powderEffectAppropriate: false,
    suggestedBackgrounds: ['Matte Black Surface', 'Abstract Tech Background'],
    suggestedMoods: ['Futuristic', 'High-Tech']
  },
  'Luxury Fragrance': {
    physicalForm: 'Liquid',
    creativeDefault: 9,
    lightingDefault: 'Dreamy Backlit',
    liquidDripAppropriate: true,
    powderEffectAppropriate: true,
    suggestedBackgrounds: ['Ethereal Clouds', 'Gilded Pedestals'],
    suggestedMoods: ['Opulent', 'Sensual']
  },
  'Furniture & Home Decor': {
    physicalForm: 'Solid',
    creativeDefault: 6,
    lightingDefault: 'Natural Sunlight',
    liquidDripAppropriate: false,
    powderEffectAppropriate: false,
    suggestedBackgrounds: ['Spacious Living Room', 'Architectural Void', 'Soft Rug'],
    suggestedMoods: ['Comfortable', 'Modernist', 'Aspirational']
  },
  'Stationery & Office': {
    physicalForm: 'Solid',
    creativeDefault: 5,
    lightingDefault: 'Studio Softbox',
    liquidDripAppropriate: false,
    powderEffectAppropriate: true,
    suggestedBackgrounds: ['Flat Lay Desk', 'Architectural Studio', 'Textured Paper'],
    suggestedMoods: ['Creative', 'Organized', 'Minimalist']
  }
};

export const VISUAL_STYLES = ['Modern', 'Luxury', 'Minimalist', 'Vintage', 'Industrial', 'Bohemian', 'High-Tech', 'Organic', 'Cinematic', 'Ethereal'];
export const BRAND_POSITIONS = ['Mass Market', 'Premium', 'Luxury/Niche', 'Eco-Friendly', 'Edgy/Disruptive'];
export const RESOLUTIONS = ['4K', '6K', '8K', '12K'];
export const ASPECT_RATIOS = ['1:1', '4:5', '9:16', '16:9', '2:3'];
export const DEPTH_OF_FIELDS = ['Shallow (Bokeh)', 'Medium', 'Deep (Infinite)'];
export const CAMERA_ANGLES = ['Eye-level', 'Low-angle (Hero)', 'High-angle', 'Top-down (Flat lay)', 'Macro/Extreme Close-up'];
export const LIGHTING_STYLES = ['Studio Softbox', 'Natural Sunlight', 'Golden Hour', 'Dramatic Rim Lighting', 'Neon/Cyberpunk', 'High Key', 'Low Key'];

export const INITIAL_FORM_DATA = {
  productName: '',
  category: CATEGORIES[0],
  productForm: PHYSICAL_FORMS[0],
  containerType: CONTAINER_TYPES[0],
  isPack: false,
  packSize: 'Pack of 6',
  modelEnabled: false,
  modelPersona: '',
  styles: ['Modern', 'Luxury'],
  colors: ['#8B5CF6'],
  brandPositioning: 'Premium',
  moodTags: ['Clean', 'Sophisticated'],
  resolution: '8K',
  aspectRatio: '4:5',
  depthOfField: 'Shallow (Bokeh)',
  cameraAngle: 'Eye-level',
  lightingStyle: 'Studio Softbox',
  shadowIntensity: 50,
  creativeLevel: 7,
  advancedEffects: {
    mascotEnabled: false,
    mascotStyle: 'Abstract',
    liquidDripEnabled: false,
    powderEnabled: false,
    accessories: []
  }
};