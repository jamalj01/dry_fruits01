/* src/components/BrandHeader.tsx */
import React from 'react';
import { ShoppingBag, Search, User, Sparkles } from 'lucide-react';

interface BrandHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onLaunchCustomizer: () => void;
}

export default function BrandHeader({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onLaunchCustomizer,
}: BrandHeaderProps) {
  return (
    <div className="w-full sticky top-0 z-50 shadow-tactile">
      {/* 1. Top Utility Banner */}
      <div className="bg-brand-red text-white py-2 px-4 text-center text-xs font-heading font-semibold tracking-wider uppercase animate-pulse">
        🎉 Free Shipping on Custom Jars & Blends Over $49! Code: CANDY49 🎉
      </div>

      {/* 2. Main Sticky Navbar */}
      <header className="bg-white border-b-4 border-brand-cocoa py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side Links */}
        <nav className="flex items-center gap-6 order-2 md:order-1 font-heading text-sm font-bold text-brand-cocoa">
          <a href="#catalog" className="hover:text-brand-red transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 inline-block">
            Products
          </a>
          <button 
            onClick={onLaunchCustomizer} 
            className="flex items-center gap-1 hover:text-brand-blue transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 text-left font-bold"
          >
            <Sparkles size={14} className="text-brand-yellow fill-brand-yellow stroke-brand-cocoa" />
            <span>Design Your Own</span>
          </button>
          <a href="#catalog" className="hover:text-brand-green transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 inline-block">
            Gifting
          </a>
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center order-1 md:order-2">
          <a href="/" className="flex items-center gap-1 group">
            <span className="w-8 h-8 rounded-full bg-brand-red border-2 border-brand-cocoa flex items-center justify-center font-heading font-black text-white text-base group-hover:rotate-12 transition-transform duration-300">m</span>
            <span className="w-8 h-8 rounded-full bg-brand-yellow border-2 border-brand-cocoa flex items-center justify-center font-heading font-black text-brand-cocoa text-base group-hover:-rotate-12 transition-transform duration-300">m</span>
            <span className="w-8 h-8 rounded-full bg-brand-blue border-2 border-brand-cocoa flex items-center justify-center font-heading font-black text-white text-base group-hover:rotate-12 transition-transform duration-300">m</span>
            <h1 className="font-heading font-black text-2xl tracking-tighter text-brand-cocoa ml-2 group-hover:scale-105 transition-transform duration-200">
              nuts<span className="text-brand-red font-black">&</span>cacao
            </h1>
          </a>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 order-3 w-full md:w-auto justify-between md:justify-end">
          {/* Search Field */}
          <div className="relative max-w-xs flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cocoaMuted" size={16} />
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-48 pl-9 pr-4 py-2 rounded-full border-2 border-brand-cocoa bg-brand-cream text-brand-cocoa font-body text-xs font-bold focus:border-brand-blue outline-none transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Account Icon */}
          <button className="w-11 h-11 border-4 border-brand-cocoa hover:bg-brand-cream rounded-full text-brand-cocoa shadow-sm hover:shadow-pill-cocoa transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center" title="Account">
            <User size={18} />
          </button>

          {/* Prominent Cart Trigger Icon */}
          <button 
            onClick={onOpenCart} 
            className="relative p-2.5 bg-brand-yellow hover:bg-[#fff633] border-4 border-brand-cocoa rounded-full text-brand-cocoa font-bold shadow-pill-yellow hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center"
            title="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red border-2 border-brand-cocoa text-white font-heading font-extrabold text-[10px] w-6 h-6 rounded-full flex items-center justify-center animate-bounce-slow">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </header>
    </div>
  );
}
