/* src/data.ts */
import { Product, IngredientOption } from './types';

export const INGREDIENTS_DB: IngredientOption[] = [
  {
    id: 'ing-almonds',
    name: 'California Almonds',
    colorCode: '#c68d5c',
    pricePer100g: 2.20,
    caloriesPer100g: 579,
    proteinPer100g: 21,
    fatPer100g: 49,
    sugarPer100g: 4.3
  },
  {
    id: 'ing-cashews',
    name: 'Organic Cashews',
    colorCode: '#e8dbbe',
    pricePer100g: 2.80,
    caloriesPer100g: 553,
    proteinPer100g: 18,
    fatPer100g: 44,
    sugarPer100g: 5.9
  },
  {
    id: 'ing-cranberries',
    name: 'Dried Cranberries',
    colorCode: '#8f1c30',
    pricePer100g: 1.90,
    caloriesPer100g: 325,
    proteinPer100g: 0.1,
    fatPer100g: 1.4,
    sugarPer100g: 65.0
  },
  {
    id: 'ing-candies',
    name: 'Chocolate Candy Buttons',
    colorCode: '#e3242b',
    pricePer100g: 2.40,
    caloriesPer100g: 480,
    proteinPer100g: 5.0,
    fatPer100g: 20,
    sugarPer100g: 68.0
  },
  {
    id: 'ing-raisins',
    name: 'Jumbo Golden Raisins',
    colorCode: '#dca642',
    pricePer100g: 1.50,
    caloriesPer100g: 299,
    proteinPer100g: 3.1,
    fatPer100g: 0.5,
    sugarPer100g: 59.0
  },
  {
    id: 'ing-pumpkin',
    name: 'Raw Pumpkin Seeds',
    colorCode: '#697a52',
    pricePer100g: 1.80,
    caloriesPer100g: 559,
    proteinPer100g: 30,
    fatPer100g: 49,
    sugarPer100g: 1.4
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-almonds',
    name: 'Gourmet California Almonds',
    description: 'Slow-roasted premium almonds, lightly salted for a rich, buttery flavor and maximum crunch.',
    price: 10.99,
    category: 'nuts',
    imageUrl: '/assets/raw_almonds.png',
    stock: 75,
    customizable: false,
    tags: ['Best Seller', 'High Protein', 'Keto Friendly']
  },
  {
    id: 'prod-cashews',
    name: 'Buttery Whole Cashews',
    description: 'Lightly roasted, creamy organic cashews sourced directly from sustainable family farms.',
    price: 13.50,
    category: 'nuts',
    imageUrl: '/assets/organic_cashews.png',
    stock: 50,
    customizable: false,
    tags: ['Organic', 'Creamy', 'Sodium Free']
  },
  {
    id: 'prod-cranberries',
    name: 'Tart Dried Cranberries',
    description: 'Perfectly plump dried cranberries, sweet with a delightful natural tang. Rich in antioxidants.',
    price: 8.99,
    category: 'berries',
    imageUrl: '/assets/dried_cranberries.png',
    stock: 120,
    customizable: false,
    tags: ['Antioxidant Rich', 'Vegan', 'Plump']
  },
  {
    id: 'prod-candies',
    name: 'Vibrant Candy Chocolates',
    description: 'Crunchy candy-coated milk chocolate lentils, perfect for adding color and sweetness to any snack.',
    price: 9.50,
    category: 'chocolate',
    imageUrl: '/assets/chocolate_candies.png',
    stock: 85,
    customizable: false,
    tags: ['Colorful', 'Sweet Treat', 'Kids Choice']
  },
  {
    id: 'prod-custom-mix',
    name: 'Interactive Custom Snack Mix',
    description: 'Craft your own gourmet custom blend! Select ingredients, adjust ratios, and view live nutrition facts.',
    price: 14.99, // Base price for custom jar, increases/decreases based on ratio
    category: 'custom-mix',
    imageUrl: '/assets/chocolate_candies.png', // Fallback display image
    stock: 999,
    customizable: true,
    allowedIngredients: ['ing-almonds', 'ing-cashews', 'ing-cranberries', 'ing-candies', 'ing-raisins', 'ing-pumpkin'],
    tags: ['Highly Interactive', 'Custom Ratio', 'Perfect Gift']
  }
];
