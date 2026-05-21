/* src/types.ts */

export type ThemeType = 'cacao' | 'organic' | 'candy';

export interface IngredientOption {
  id: string;
  name: string;
  colorCode: string; // HEX color for visual mix representation
  pricePer100g: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  sugarPer100g: number;
}

export interface CustomMixIngredient {
  ingredientId: string;
  percentage: number; // e.g., 30 for 30%
}

export interface CustomMixDetails {
  name: string;
  ingredients: CustomMixIngredient[];
  totalWeight: number; // in grams, e.g. 500g
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base price or calculated price
  category: 'nuts' | 'berries' | 'chocolate' | 'custom-mix';
  imageUrl: string;
  stock: number;
  customizable: boolean;
  allowedIngredients?: string[]; // IDs of IngredientOption allowed in this product
  tags: string[];
  customMixDetails?: CustomMixDetails; // Populated if the item in cart/catalog is a saved user custom mix
}

export interface CartItem {
  id: string; // Unique ID (product.id or custom unique ID for mixes)
  product: Product;
  quantity: number;
}
