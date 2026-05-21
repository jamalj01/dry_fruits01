/* src/components/MixBuilder.tsx */
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Scale, Info, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { INGREDIENTS_DB } from '../data';

interface MixBuilderProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddCustomMixToCart: (customProduct: Product) => void;
}

export default function MixBuilder({
  product,
  isOpen,
  onClose,
  onAddCustomMixToCart,
}: MixBuilderProps) {
  const [mixName, setMixName] = useState('My Custom Energy Blend');
  const [totalSize, setTotalSize] = useState<number>(500); // grams
  const [portions, setPortions] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    INGREDIENTS_DB.forEach(ing => {
      initial[ing.id] = 0;
    });
    initial['ing-almonds'] = 100;
    initial['ing-cranberries'] = 100;
    initial['ing-candies'] = 50;
    return initial;
  });

  const [nutrition, setNutrition] = useState({
    price: 0,
    calories: 0,
    protein: 0,
    fat: 0,
    sugar: 0,
  });

  const totalGramsInMix = Object.values(portions).reduce((a, b) => a + b, 0);

  useEffect(() => {
    let totalPrice = 4.99; // Base packaging price
    let totalCals = 0;
    let totalProt = 0;
    let totalFat = 0;
    let totalSug = 0;

    if (totalGramsInMix > 0) {
      INGREDIENTS_DB.forEach(ing => {
        const grams = portions[ing.id] || 0;
        const ratio = grams / totalGramsInMix;
        const targetGrams = ratio * totalSize;

        totalPrice += (ing.pricePer100g / 100) * targetGrams;
        totalCals += (ing.caloriesPer100g / 100) * targetGrams;
        totalProt += (ing.proteinPer100g / 100) * targetGrams;
        totalFat += (ing.fatPer100g / 100) * targetGrams;
        totalSug += (ing.sugarPer100g / 100) * targetGrams;
      });
    }

    setNutrition({
      price: totalPrice,
      calories: Math.round(totalCals),
      protein: parseFloat(totalProt.toFixed(1)),
      fat: Math.round(totalFat),
      sugar: Math.round(totalSug),
    });
  }, [portions, totalSize, totalGramsInMix]);

  if (!isOpen || !product) return null;

  const handleUpdatePortion = (ingId: string, amount: number) => {
    setPortions(prev => {
      const current = prev[ingId] || 0;
      const next = Math.max(0, current + amount);
      return { ...prev, [ingId]: next };
    });
  };

  const handleAddToCart = () => {
    if (totalGramsInMix === 0) return;

    const ingredientsList = Object.entries(portions)
      .filter(([_, grams]) => grams > 0)
      .map(([id, grams]) => ({
        ingredientId: id,
        percentage: Math.round((grams / totalGramsInMix) * 100),
      }));

    const customProduct: Product = {
      id: `custom-mix-${Date.now()}`,
      name: mixName.trim() || 'My Custom Snack Mix',
      description: `A custom-crafted ${totalSize}g mix: ${ingredientsList.map(item => {
        const name = INGREDIENTS_DB.find(i => i.id === item.ingredientId)?.name;
        return ` ${item.percentage}% ${name}`;
      }).join(',')}.`,
      price: nutrition.price,
      category: 'custom-mix',
      imageUrl: '/assets/chocolate_candies.png',
      stock: 10,
      customizable: false,
      tags: ['Custom Created'],
      customMixDetails: {
        name: mixName.trim() || 'My Custom Snack Mix',
        ingredients: ingredientsList,
        totalWeight: totalSize,
      }
    };

    onAddCustomMixToCart(customProduct);
    onClose();
  };

  const getJarLayers = () => {
    if (totalGramsInMix === 0) return null;
    
    let cumulativeHeight = 0;
    return INGREDIENTS_DB.map(ing => {
      const grams = portions[ing.id] || 0;
      if (grams === 0) return null;
      const height = (grams / totalGramsInMix) * 100;
      const style = {
        height: `${height}%`,
        backgroundColor: ing.colorCode,
        bottom: `${cumulativeHeight}%`,
      };
      cumulativeHeight += height;
      
      return (
        <div 
          key={ing.id} 
          className="absolute left-0 right-0 border-t border-brand-cocoa/20 transition-all duration-300 flex items-center justify-center overflow-hidden" 
          style={style}
        >
          <span className="font-heading font-black text-[9px] uppercase tracking-wider text-black opacity-80 drop-shadow-sm select-none truncate px-1">
            {ing.name} ({Math.round(height)}%)
          </span>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-brand-cocoa/70 backdrop-blur-sm z-[100] flex justify-end" onClick={onClose}>
      <div 
        className="bg-brand-cream w-full max-w-3xl h-full flex flex-col border-l-4 border-brand-cocoa shadow-pill-cocoa"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b-4 border-brand-cocoa bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-red">
            <Sparkles size={22} className="fill-brand-yellow stroke-brand-cocoa" />
            <h2 className="font-heading font-black text-2xl text-brand-cocoa tracking-tight">Interactive Mix Builder</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-11 h-11 border-4 border-brand-cocoa bg-brand-cream hover:bg-brand-red hover:text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-pill-red transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Visual Jar Section */}
          <div className="bg-white border-4 border-brand-cocoa rounded-3xl p-6 flex flex-col items-center justify-center shadow-pill-soft">
            
            {/* Jar Graphic */}
            <div className="relative w-44 h-72 flex flex-col items-center">
              {/* Lid */}
              <div className="w-24 h-5 bg-brand-cocoa rounded-t-lg border-2 border-brand-cocoa shadow-sm"></div>
              {/* Neck */}
              <div className="w-20 h-3 bg-brand-cream border-x-4 border-brand-cocoa"></div>
              {/* Glass Body */}
              <div className="w-40 flex-1 bg-brand-cream border-4 border-brand-cocoa rounded-b-[40px] overflow-hidden relative shadow-inner">
                {totalGramsInMix === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p className="font-heading font-bold text-xs text-brand-cocoaMuted uppercase tracking-wider leading-relaxed">
                      Add ingredients below to fill your custom jar!
                    </p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col-reverse">
                    {getJarLayers()}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Info */}
            <div className="text-center mt-6">
              <span className="font-heading font-bold text-[10px] text-brand-cocoaMuted tracking-wider uppercase">Estimated Price</span>
              <h3 className="font-heading font-black text-4xl text-brand-red">${nutrition.price.toFixed(2)}</h3>
              <span className="font-body text-xs font-semibold text-brand-cocoaMuted">{totalSize}g Personalized Jar</span>
            </div>

          </div>

          {/* Adjustments Controls */}
          <div className="flex flex-col gap-5">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Name Your Creation</label>
              <input 
                type="text" 
                value={mixName} 
                onChange={(e) => setMixName(e.target.value)}
                placeholder="e.g. Energy Sweet Trail"
                className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
              />
            </div>

            {/* Jar Size Selection */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Select Jar Weight</label>
              <div className="grid grid-cols-3 gap-2">
                {[250, 500, 750].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTotalSize(size)}
                    className={`h-12 rounded-full border-4 border-brand-cocoa font-heading font-black text-xs uppercase flex items-center justify-center gap-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${totalSize === size ? 'bg-brand-yellow text-brand-cocoa shadow-pill-yellow hover:shadow-lg' : 'bg-white hover:bg-brand-cream hover:shadow-pill-cocoa text-brand-cocoa'}`}
                  >
                    <Scale size={12} />
                    <span>{size}g</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Adjuster */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Ingredients & Quantities</label>
              
              <div className="bg-white border-4 border-brand-cocoa rounded-3xl p-4 divide-y-2 divide-brand-cream space-y-2.5">
                {INGREDIENTS_DB.map((ing) => {
                  const grams = portions[ing.id] || 0;
                  const percent = totalGramsInMix > 0 ? Math.round((grams / totalGramsInMix) * 100) : 0;
                  
                  return (
                    <div key={ing.id} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <span className="w-4.5 h-4.5 rounded-full border border-brand-cocoa/30 inline-block shrink-0" style={{ backgroundColor: ing.colorCode }}></span>
                        <div className="flex flex-col">
                          <span className="font-heading font-black text-xs text-brand-cocoa leading-tight">{ing.name}</span>
                          <span className="font-body text-[10px] font-semibold text-brand-cocoaMuted">${ing.pricePer100g.toFixed(2)}/100g</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdatePortion(ing.id, -25)}
                          disabled={grams <= 0}
                          className="w-8 h-8 rounded-full bg-brand-cream border-2 border-brand-cocoa text-brand-cocoa disabled:opacity-40 flex items-center justify-center shadow-sm hover:shadow-pill-cocoa hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-heading font-bold text-xs text-brand-cocoa w-20 text-center select-none">
                          {grams > 0 ? `${grams}g (${percent}%)` : '0g'}
                        </span>
                        <button
                          onClick={() => handleUpdatePortion(ing.id, 25)}
                          className="w-8 h-8 rounded-full bg-brand-cream border-2 border-brand-cocoa text-brand-cocoa flex items-center justify-center shadow-sm hover:shadow-pill-cocoa hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="bg-brand-cream border-2 border-brand-cocoa rounded-2xl p-4">
              <label className="font-heading font-bold text-[10px] uppercase text-brand-cocoaMuted tracking-wider mb-2 flex items-center gap-1">
                <Info size={12} />
                <span>Nutritional Profile (Approximate)</span>
              </label>
              
              <div className="grid grid-cols-4 gap-2 text-center mt-2.5">
                <div className="flex flex-col">
                  <span className="font-heading font-black text-sm text-brand-cocoa leading-none">{nutrition.calories}</span>
                  <span className="font-body text-[8px] font-semibold text-brand-cocoaMuted uppercase mt-1">Calories</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-sm text-brand-cocoa leading-none">{nutrition.protein}g</span>
                  <span className="font-body text-[8px] font-semibold text-brand-cocoaMuted uppercase mt-1">Protein</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-sm text-brand-cocoa leading-none">{nutrition.fat}g</span>
                  <span className="font-body text-[8px] font-semibold text-brand-cocoaMuted uppercase mt-1">Fats</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-sm text-brand-cocoa leading-none">{nutrition.sugar}g</span>
                  <span className="font-body text-[8px] font-semibold text-brand-cocoaMuted uppercase mt-1">Sugars</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Action Bottom */}
        <div className="p-6 border-t-4 border-brand-cocoa bg-white">
          <button
            onClick={handleAddToCart}
            disabled={totalGramsInMix === 0}
            className="w-full h-12 bg-brand-red hover:bg-[#FF2E37] border-4 border-brand-cocoa text-white font-heading font-black text-sm uppercase tracking-wider rounded-full shadow-pill-red hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Custom Jar to Basket (${nutrition.price.toFixed(2)})
          </button>
        </div>

      </div>
    </div>
  );
}
