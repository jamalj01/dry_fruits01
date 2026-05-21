/* src/components/ProductEditor.tsx */
import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ProductEditorProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductEditor({
  product,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: ProductEditorProps) {
  const [formData, setFormData] = useState<Product | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
      setTagsInput(product.tags.join(', '));
    } else {
      setFormData({
        id: `prod-${Date.now()}`,
        name: '',
        description: '',
        price: 9.99,
        category: 'nuts',
        imageUrl: '',
        stock: 50,
        customizable: false,
        tags: [],
      });
      setTagsInput('');
    }
  }, [product, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    onSave({
      ...formData,
      tags: updatedTags,
    });
  };

  return (
    <div className="fixed inset-0 bg-brand-cocoa/70 backdrop-blur-sm z-[100] flex justify-end transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-brand-cream w-full max-w-lg h-full flex flex-col border-l-4 border-brand-cocoa shadow-pill-cocoa animate-slide-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b-4 border-brand-cocoa bg-white flex items-center justify-between">
          <h2 className="font-heading font-black text-2xl text-brand-cocoa tracking-tight">
            {product ? 'Edit Sweet Details' : 'Create New Treat'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-11 h-11 border-4 border-brand-cocoa bg-brand-cream hover:bg-brand-red hover:text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-pill-red transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex flex-col gap-2">
            <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Product Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Candy Peanut Butter Mix"
              className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Stock Level</label>
              <input 
                type="number" 
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue appearance-none cursor-pointer"
            >
              <option value="nuts">Premium Nuts</option>
              <option value="berries">Sweet Berries</option>
              <option value="chocolate">Chocolate Candies</option>
              <option value="custom-mix">Interactive Mixes</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Product Image Link</label>
            <input 
              type="text" 
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="e.g. /assets/raw_almonds.png"
              className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
            />
            <span className="text-[10px] text-brand-cocoaMuted font-medium">
              Options: <code>/assets/raw_almonds.png</code>, <code>/assets/organic_cashews.png</code>, <code>/assets/dried_cranberries.png</code>, or <code>/assets/chocolate_candies.png</code>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Description</label>
            <textarea 
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the sweet flavor notes, shapes, or crunch..."
              className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-heading font-bold text-xs uppercase text-brand-cocoaMuted tracking-wider">Product Tags (comma separated)</label>
            <input 
              type="text" 
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Organic, Crunchy, Vegan"
              className="px-4 py-3 rounded-2xl border-2 border-brand-cocoa bg-white text-brand-cocoa font-body text-sm font-semibold outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-3 font-heading font-bold text-xs uppercase text-brand-cocoa cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={formData.customizable}
                onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
                className="w-5 h-5 border-2 border-brand-cocoa rounded bg-white text-brand-red focus:ring-0 cursor-pointer"
              />
              <span>Allow Interactive Custom-Mix Builder</span>
            </label>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t-4 border-brand-cocoa bg-white flex items-center justify-between gap-3">
          {product && onDelete && (
            <button 
              type="button" 
              onClick={() => onDelete(formData.id)}
              className="h-12 px-5 border-4 border-brand-red bg-white hover:bg-[#FF2E37] text-brand-red hover:text-white font-heading font-bold text-xs uppercase rounded-full shadow-sm hover:shadow-pill-red transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          )}
          
          <button 
            type="button" 
            onClick={onClose} 
            className="h-12 px-5 border-4 border-brand-cocoa bg-brand-cream hover:bg-brand-cocoa text-brand-cocoa hover:text-white font-heading font-bold text-xs uppercase rounded-full shadow-sm hover:shadow-pill-cocoa transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ml-auto"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="h-12 px-6 bg-brand-red hover:bg-[#FF2E37] border-4 border-brand-cocoa text-white font-heading font-black text-xs uppercase rounded-full shadow-pill-red hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Save size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
