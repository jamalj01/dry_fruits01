/* src/App.tsx */
import React, { useState } from 'react';
import { Plus, Sparkles, AlertCircle, Send } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product, CartItem } from './types';
import { SEED_PRODUCTS } from './data';
import BrandHeader from './components/BrandHeader';
import ProductCard from './components/ProductCard';
import ProductEditor from './components/ProductEditor';
import MixBuilder from './components/MixBuilder';
import CartDrawer from './components/CartDrawer';

import './styles/variables.css';
import './styles/main.css';

export default function App() {
  const [products, setProducts] = useLocalStorage<Product[]>('df_catalog_v2', SEED_PRODUCTS);
  const [cart, setCart] = useLocalStorage<CartItem[]>('df_cart_v2', []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Drawer states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product CMS Actions
  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some(p => p.id === savedProduct.id);
    if (exists) {
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      setProducts([savedProduct, ...products]);
    }
    setIsEditorOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setIsEditorOpen(false);
    setEditingProduct(null);
  };

  const handleOpenNewProductCMS = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: product.id, product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomMixToCart = (customMixProduct: Product) => {
    const uniqueId = `custom-mix-instance-${Date.now()}`;
    setCart(prevCart => [
      ...prevCart,
      { id: uniqueId, product: customMixProduct, quantity: 1 }
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLaunchCustomizer = () => {
    const mix = products.find(p => p.customizable);
    if (mix) {
      setCustomizingProduct(mix);
      setIsCustomizerOpen(true);
    }
  };

  // Filters calculation
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-cocoa font-body flex flex-col justify-between">
      
      {/* Navigation (Sticky Header) */}
      <BrandHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onLaunchCustomizer={handleLaunchCustomizer}
      />

      <main className="w-full flex-1">

        {/* 1. Hero Section (Promotion Banner) */}
        <section className="relative w-full bg-brand-yellow border-b-4 border-brand-cocoa overflow-hidden py-12 md:py-24 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Back grid pattern decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(#2C1A13 2px, transparent 0)',
            backgroundSize: '30px 30px',
          }}></div>

          <div className="max-w-2xl z-10 flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 bg-brand-red border-2 border-brand-cocoa text-white font-heading font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-md">
              <Sparkles size={12} className="fill-brand-yellow stroke-brand-cocoa" />
              <span>Interactive Candy Store</span>
            </span>
            <h1 className="font-heading font-black text-6xl md:text-8xl leading-none tracking-tight text-brand-cocoa">
              MAKE YOUR OWN <span className="text-brand-red font-black block md:inline">SWEET MIX!</span>
            </h1>
            <p className="font-body text-base md:text-lg font-bold text-brand-cocoaMuted max-w-lg leading-relaxed mt-2">
              Select premium roasted nuts, tart fruits, and chocolate candy buttons. Slide, blend, and design a customized snack jar shipped right to your door!
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <button 
                onClick={handleLaunchCustomizer}
                className="h-14 px-8 bg-brand-red hover:bg-[#FF2E37] border-4 border-brand-cocoa text-white font-heading font-black text-base uppercase tracking-wider rounded-full shadow-pill-red hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles size={18} className="fill-brand-yellow stroke-brand-cocoa" />
                <span>Shop Custom Blends</span>
              </button>
              <button 
                onClick={handleOpenNewProductCMS}
                className="h-14 px-8 bg-white hover:bg-brand-cream border-4 border-brand-cocoa text-brand-cocoa font-heading font-black text-base uppercase tracking-wider rounded-full shadow-pill-cocoa hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Create Product (CMS)</span>
              </button>
            </div>
          </div>

          {/* Styled placeholder for a large, dynamic hero image (to mimic their 3D character art) */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 shrink-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-brand-blue border-4 border-brand-cocoa rounded-full shadow-pill-blue rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-brand-cream border-4 border-brand-cocoa rounded-full overflow-hidden flex items-center justify-center p-6 spring-transition hover:-rotate-6 hover:scale-105">
              <img 
                src="/assets/chocolate_candies.png" 
                alt="Colorful Candy Customizer Preview"
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500';
                }}
              />
            </div>
            {/* Playful float tags */}
            <span className="absolute -top-3 -right-3 font-heading font-black text-xs text-brand-cocoa bg-brand-yellow border-2 border-brand-cocoa py-2 px-4 rounded-full uppercase tracking-wider rotate-12 shadow-md">
              Chocolate!
            </span>
            <span className="absolute -bottom-3 -left-3 font-heading font-black text-xs text-white bg-brand-green border-2 border-brand-cocoa py-2 px-4 rounded-full uppercase tracking-wider -rotate-12 shadow-md">
              Roasted Nuts!
            </span>
          </div>
        </section>

        {/* 2. Featured Categories (The "Bubble" Grid) */}
        <section className="py-12 bg-white border-b-4 border-brand-cocoa px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-black text-3xl text-center text-brand-cocoa uppercase tracking-tight mb-8">
              Explore Our Sweet Categories
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { name: 'Gourmet Nuts', img: '/assets/raw_almonds.png', bg: 'bg-brand-orange', border: 'hover:border-brand-orange hover:shadow-pill-orange', cat: 'nuts' },
                { name: 'Organic Cashews', img: '/assets/organic_cashews.png', bg: 'bg-brand-yellow', border: 'hover:border-brand-yellow hover:shadow-pill-yellow', cat: 'nuts' },
                { name: 'Sweet Berries', img: '/assets/dried_cranberries.png', bg: 'bg-brand-red', border: 'hover:border-brand-red hover:shadow-pill-red', cat: 'berries' },
                { name: 'Candy Buttons', img: '/assets/chocolate_candies.png', bg: 'bg-brand-blue', border: 'hover:border-brand-blue hover:shadow-pill-blue', cat: 'chocolate' },
                { name: 'Custom Mixtures', img: '/assets/chocolate_candies.png', bg: 'bg-brand-green', border: 'hover:border-brand-green hover:shadow-pill-green', cat: 'custom-mix' },
              ].map((category, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveCategory(category.cat)}
                  className="flex flex-col items-center gap-3 focus:outline-none group text-center"
                >
                  <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-brand-cocoa ${category.bg} overflow-hidden p-2 flex items-center justify-center shadow-md hover:-translate-y-2 group-focus:scale-95 ${category.border} spring-transition`}>
                    <img 
                      src={category.img} 
                      alt={category.name} 
                      className="w-full h-full object-cover rounded-full border border-brand-cocoa/10 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500';
                      }}
                    />
                  </div>
                  <span className="font-heading font-black text-sm text-brand-cocoa group-hover:text-brand-red transition-colors duration-200">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Catalog Section Grid */}
        <section id="catalog" className="max-w-7xl mx-auto py-16 px-6 md:px-12 scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-brand-cocoa uppercase tracking-tight">
                Our Delicious Catalog
              </h2>
              <p className="font-body text-xs font-semibold text-brand-cocoaMuted mt-1">
                Showing {filteredProducts.length} items of sweet premium snacks.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'nuts', label: 'Nuts & Seeds' },
                { id: 'berries', label: 'Tart Berries' },
                { id: 'chocolate', label: 'Chocolate Candies' },
                { id: 'custom-mix', label: 'Interactive Mixes' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`h-12 px-6 rounded-full border-4 border-brand-cocoa font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${activeCategory === cat.id ? 'bg-brand-red text-white shadow-pill-red hover:shadow-lg' : 'bg-white text-brand-cocoa hover:bg-brand-cream hover:shadow-pill-cocoa'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center bg-white border-4 border-brand-cocoa rounded-3xl p-16 flex flex-col items-center">
              <AlertCircle size={48} className="text-brand-red mb-4" />
              <h3 className="font-heading font-black text-xl text-brand-cocoa uppercase">No matching products found</h3>
              <p className="font-body text-xs font-semibold text-brand-cocoaMuted max-w-sm mt-2">
                We couldn't find items matching your filters. Try clicking "All Items" to seed your basket!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  index={index}
                  onEdit={(p) => {
                    setEditingProduct(p);
                    setIsEditorOpen(true);
                  }}
                  onCustomize={(p) => {
                    setCustomizingProduct(p);
                    setIsCustomizerOpen(true);
                  }}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Split-Screen Personalization (50/50 Section) */}
        <section className="w-full bg-brand-cream border-t-4 border-b-4 border-brand-cocoa flex flex-col md:flex-row overflow-hidden">
          {/* Left Side: Product/Lifestyle Image */}
          <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[480px] bg-brand-red relative overflow-hidden flex items-center justify-center p-12 border-b-4 md:border-b-0 md:border-r-4 border-brand-cocoa">
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#2C1A13 2px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
            <img 
              src="/assets/dried_cranberries.png" 
              alt="Vibrant Cranberries snack display"
              className="w-full max-w-md h-full max-h-80 object-contain drop-shadow-xl hover:rotate-6 spring-transition"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500';
              }}
            />
          </div>

          {/* Right Side: Copy & CTA */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-start gap-4 bg-white">
            <span className="font-heading font-black text-xs text-brand-blue uppercase tracking-widest bg-blue-100 border border-brand-blue px-3 py-1 rounded-full">
              Personalized Gifting
            </span>
            <h2 className="font-heading font-black text-4xl md:text-5xl leading-tight text-brand-cocoa">
              DESIGN UNIQUE GIFTS FOR YOUR LOVED ONES!
            </h2>
            <p className="font-body text-sm font-semibold text-brand-cocoaMuted leading-relaxed max-w-md">
              Create a custom blend featuring our rich cacao candy buttons, print labels, or choose specialized packaging weight jars. Perfect for birthdays, weddings, or corporate milestones.
            </p>
            <button 
              onClick={handleLaunchCustomizer}
              className="h-14 px-8 mt-4 bg-brand-yellow hover:bg-[#fff633] border-4 border-brand-cocoa text-brand-cocoa font-heading font-black text-base uppercase tracking-wider rounded-full shadow-pill-yellow hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles size={18} />
              <span>Start Designing Now</span>
            </button>
          </div>
        </section>

      </main>

      {/* 5. Footer Section */}
      <footer className="bg-brand-cocoa border-t-4 border-brand-cocoa py-12 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <div className="flex items-center gap-1 group">
              <span className="w-8 h-8 rounded-full bg-brand-red border-2 border-white flex items-center justify-center font-heading font-black text-white text-base">m</span>
              <span className="w-8 h-8 rounded-full bg-brand-yellow border-2 border-white flex items-center justify-center font-heading font-black text-brand-cocoa text-base">m</span>
              <span className="w-8 h-8 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center font-heading font-black text-white text-base">m</span>
              <h2 className="font-heading font-black text-xl text-white tracking-tighter ml-2">
                nuts<span className="text-brand-yellow font-black">&</span>cacao
              </h2>
            </div>
            <p className="font-body text-xs font-semibold text-brand-cream/80 max-w-sm leading-relaxed">
              We bring the playful customization of candy-coated chocolate buttons to premium roasted nuts and seeds, providing a gourmet, fun snacking experience.
            </p>
            
            {/* Round Social Media Bubbles */}
            <div className="flex items-center gap-2 mt-2">
              {[
                { 
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  ), 
                  color: 'hover:bg-brand-blue' 
                },
                { 
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  ), 
                  color: 'hover:bg-cyan-500' 
                },
                { 
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ), 
                  color: 'hover:bg-brand-red' 
                },
                { 
                  icon: (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-1.016-1.07-1.817-2.087-2.09C19.578 3.53 12 3.53 12 3.53s-7.578 0-9.41.543c-1.017.273-1.815 1.074-2.087 2.09C0 7.995 0 12 0 12s0 4.005.502 5.837c.272 1.016 1.07 1.817 2.087 2.09 1.832.543 9.41.543 9.41.543s7.578 0 9.41-.543c1.017-.273 1.815-1.074 2.087-2.09C24 16.005 24 12 24 12s0-4.005-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ), 
                  color: 'hover:bg-red-600' 
                },
              ].map((soc, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className={`w-9 h-9 rounded-full bg-brand-cocoaLight border-2 border-brand-cream/30 hover:border-white text-brand-cream flex items-center justify-center spring-transition hover:scale-110 active:scale-90 ${soc.color}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-yellow">Shop Menu</h4>
            <ul className="space-y-2 font-body text-xs font-semibold text-brand-cream/70">
              <li><a href="#catalog" className="hover:text-white transition-colors duration-200">Gourmet Almonds</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors duration-200">Dried Blueberries</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors duration-200">Chocolate Candies</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors duration-200">Custom Mix Jars</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-yellow">About Us</h4>
            <ul className="space-y-2 font-body text-xs font-semibold text-brand-cream/70">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Our Kitchens</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Sourcing Ethics</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog Feed</a></li>
            </ul>
          </div>

          {/* Newsletter Input Box */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-yellow">Join the Sweet List</h4>
            <p className="font-body text-[10px] font-semibold text-brand-cream/70 leading-relaxed">
              Get 10% off your first custom snack mix jar!
            </p>
            <div className="relative w-full mt-1.5">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="w-full pr-12 pl-4 py-2.5 rounded-full border-2 border-brand-cream/30 bg-brand-cocoaLight text-white font-body text-xs font-semibold placeholder:text-brand-cream/40 focus:border-brand-yellow outline-none transition-all duration-300 ease-in-out"
              />
              <button className="absolute right-1 top-1 w-8 h-8 rounded-full bg-brand-yellow text-brand-cocoa flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                <Send size={12} className="stroke-brand-cocoa fill-none" />
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-brand-cream/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between font-body text-[10px] font-semibold text-brand-cream/40 gap-4">
          <p>© 2026 Nuts & Cacao Corp. Inspired by M&M's aesthetic. Crafted with Tailwind.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Sale</a>
            <a href="#" className="hover:text-white">Support Help</a>
          </div>
        </div>
      </footer>

      {/* Editor Drawer */}
      <ProductEditor 
        product={editingProduct}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Mix Builder Drawer */}
      <MixBuilder 
        product={customizingProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddCustomMixToCart={handleAddCustomMixToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
