/* src/components/ProductCard.tsx */
import React from 'react';
import { Edit2, Sparkles, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onCustomize: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  index?: number;
}

export default function ProductCard({
  product,
  onEdit,
  onCustomize,
  onAddToCart,
  index = 0,
}: ProductCardProps) {
  
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'nuts':
        return {
          bg: 'bg-brand-orange',
          border: 'border-brand-orange',
          text: 'text-brand-orange',
          shadow: 'shadow-pill-orange',
          label: 'Premium Nuts'
        };
      case 'berries':
        return {
          bg: 'bg-brand-red',
          border: 'border-brand-red',
          text: 'text-brand-red',
          shadow: 'shadow-pill-red',
          label: 'Sweet Berries'
        };
      case 'chocolate':
        return {
          bg: 'bg-brand-blue',
          border: 'border-brand-blue',
          text: 'text-brand-blue',
          shadow: 'shadow-pill-blue',
          label: 'Chocolate Candies'
        };
      case 'custom-mix':
        return {
          bg: 'bg-brand-green',
          border: 'border-brand-green',
          text: 'text-brand-green',
          shadow: 'shadow-pill-green',
          label: 'Custom Blend'
        };
      default:
        return {
          bg: 'bg-brand-cocoa',
          border: 'border-brand-cocoa',
          text: 'text-brand-cocoa',
          shadow: 'shadow-pill-cocoa',
          label: category
        };
    }
  };

  const theme = getCategoryTheme(product.category);

  return (
    <div 
      className="bg-white border-4 border-brand-cocoa rounded-3xl overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-pill-cocoa transition-all duration-300 ease-in-out animate-card-mount"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      
      {/* Product Image Wrapper */}
      <div className="relative w-full h-52 bg-brand-cream overflow-hidden border-b-4 border-brand-cocoa">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500';
          }}
        />
        <span className={`absolute top-3 left-3 font-heading font-black text-[10px] uppercase tracking-wider text-white px-3 py-1 rounded-full border-2 border-brand-cocoa ${theme.bg} shadow-md`}>
          {theme.label}
        </span>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Header Row */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-heading font-black text-lg leading-tight text-brand-cocoa hover:text-brand-red cursor-pointer">
              {product.name}
            </h3>
            <span className="font-heading font-black text-xl text-brand-red bg-brand-cream border-2 border-brand-cocoa px-2 py-0.5 rounded-lg shadow-sm">
              {product.customizable ? 'From ' : ''}${product.price.toFixed(2)}
            </span>
          </div>

          <p className="font-body text-xs font-semibold text-brand-cocoaMuted mb-4 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.tags.map((tag) => (
              <span key={tag} className="font-heading font-bold text-[9px] text-brand-cocoa bg-brand-cream border border-brand-cocoa px-2 py-0.5 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2">
          {product.customizable ? (
            <button 
              onClick={() => onCustomize(product)} 
              className="flex-1 h-12 bg-brand-green hover:bg-[#00c869] border-4 border-brand-cocoa text-white font-heading font-black text-sm uppercase tracking-wider rounded-full shadow-pill-green hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out gap-2 flex items-center justify-center"
            >
              <Sparkles size={16} className="fill-brand-yellow stroke-brand-cocoa" />
              <span>Customize Mix</span>
            </button>
          ) : (
            <button 
              onClick={() => onAddToCart(product)} 
              className="flex-1 h-12 bg-brand-yellow hover:bg-[#fff633] border-4 border-brand-cocoa text-brand-cocoa font-heading font-black text-sm uppercase tracking-wider rounded-full shadow-pill-yellow hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out gap-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={16} />
              <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          )}

          <button 
            onClick={() => onEdit(product)} 
            className="w-12 h-12 bg-brand-cream hover:bg-brand-orange border-4 border-brand-cocoa text-brand-cocoa hover:text-white rounded-full shadow-sm hover:shadow-pill-orange hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center"
            title="Edit Details (CMS)"
          >
            <Edit2 size={14} />
          </button>
        </div>

      </div>

    </div>
  );
}
