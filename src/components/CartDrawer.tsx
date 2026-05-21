/* src/components/CartDrawer.tsx */
import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'processing' | 'success'>('cart');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% sales tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    setCheckoutStep('processing');
    
    // Simulate transaction delay
    setTimeout(() => {
      setOrderNumber(`NC-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep('success');
      onClearCart();
    }, 2000);
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-brand-cocoa/70 backdrop-blur-sm z-[100] flex justify-end transition-opacity duration-300" onClick={handleClose}>
      <div 
        className="bg-brand-cream w-full max-w-lg h-full flex flex-col border-l-4 border-brand-cocoa shadow-pill-cocoa"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b-4 border-brand-cocoa bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-red">
            <ShoppingCart size={22} className="stroke-brand-cocoa text-brand-yellow fill-brand-yellow" />
            <h2 className="font-heading font-black text-2xl text-brand-cocoa tracking-tight">Shopping Basket</h2>
          </div>
          <button 
            onClick={handleClose} 
            className="w-11 h-11 border-4 border-brand-cocoa bg-brand-cream hover:bg-brand-red hover:text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-pill-red transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {checkoutStep === 'cart' && (
          <>
            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Package size={54} className="text-brand-cocoaMuted mb-5 opacity-40" />
                  <p className="font-heading font-black text-lg text-brand-cocoa mb-1">Your basket is empty</p>
                  <p className="font-body text-xs font-semibold text-brand-cocoaMuted mb-6 max-w-xs">
                    Fill your jar with delicious treats or blend your own recipe!
                  </p>
                  <button 
                    onClick={handleClose} 
                    className="h-12 px-6 bg-brand-red hover:bg-[#FF2E37] border-4 border-brand-cocoa text-white font-heading font-black text-xs uppercase rounded-full shadow-pill-red hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="bg-white border-2 border-brand-cocoa rounded-3xl p-4 flex gap-4 shadow-md animate-card-mount"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      
                      <img 
                        src={item.product.imageUrl || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500'} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-2xl border-2 border-brand-cocoa shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500';
                        }}
                      />
                      
                      <div className="flex-1 flex flex-col justify-between">
                        
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-heading font-black text-sm text-brand-cocoa leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-brand-cocoaMuted hover:text-brand-red transition-all duration-300 ease-in-out hover:scale-110 active:scale-90"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        
                        <p className="font-body text-[10px] text-brand-cocoaMuted line-clamp-1 mb-2">
                          {item.product.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-heading font-black text-sm text-brand-red">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          
                          <div className="flex items-center gap-2 bg-brand-cream border-2 border-brand-cocoa rounded-full p-1 shadow-sm">
                            <button 
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full hover:bg-brand-cocoa hover:text-white text-brand-cocoa flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-90"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-heading font-black text-[11px] text-brand-cocoa w-6 text-center select-none">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full hover:bg-brand-cocoa hover:text-white text-brand-cocoa flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-90"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t-4 border-brand-cocoa bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-body text-xs font-semibold text-brand-cocoaMuted">
                    <span>Subtotal</span>
                    <span className="text-brand-cocoa">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs font-semibold text-brand-cocoaMuted">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-brand-cocoa">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs font-semibold text-brand-cocoaMuted">
                    <span>Shipping</span>
                    <span className="text-brand-cocoa">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-black text-base text-brand-cocoa border-t-2 border-brand-cream pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="text-brand-red">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  className="w-full h-12 bg-brand-red hover:bg-[#FF2E37] border-4 border-brand-cocoa text-white font-heading font-black text-sm uppercase tracking-wider rounded-full shadow-pill-red hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  Proceed to Checkout (${total.toFixed(2)})
                </button>
              </div>
            )}
          </>
        )}

        {/* Processing Step */}
        {checkoutStep === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-12 h-12 border-4 border-brand-cream border-t-brand-red rounded-full animate-spin mb-4"></div>
            <h3 className="font-heading font-black text-lg text-brand-cocoa mb-1">Processing Order...</h3>
            <p className="font-body text-xs font-semibold text-brand-cocoaMuted max-w-xs">
              Sending your recipe configurations to our candy mixing kitchens.
            </p>
          </div>
        )}

        {/* Success Step */}
        {checkoutStep === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white animate-fade-in">
            <CheckCircle size={64} className="text-brand-green mb-5 drop-shadow-sm" />
            <h3 className="font-heading font-black text-xl text-brand-cocoa mb-2">Order Confirmed!</h3>
            <p className="font-body text-xs font-bold text-brand-cocoa bg-brand-yellow border-2 border-brand-cocoa px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm">
              Ref: {orderNumber}
            </p>
            <p className="font-body text-xs font-semibold text-brand-cocoaMuted max-w-sm mb-6">
              Your customized recipe blend has been submitted. Check your browser LocalStorage for invoice logs.
            </p>
            
            <div className="w-full max-w-xs bg-brand-cream border-2 border-brand-cocoa rounded-3xl p-4 text-left font-body text-xs font-semibold text-brand-cocoa space-y-2 mb-8">
              <p>📍 Status: <span className="font-bold text-brand-orange">Baking & Mixing</span></p>
              <p>🚚 Dispatch: <span className="font-bold text-brand-blue">Vite Mock Express</span></p>
              <p>💳 Payment: <span className="font-bold text-brand-green">Approved (Mock)</span></p>
            </div>

            <button 
              onClick={handleClose} 
              className="w-full max-w-xs h-12 border-4 border-brand-cocoa bg-brand-cream hover:bg-brand-cocoa hover:text-white text-brand-cocoa font-heading font-bold text-xs uppercase rounded-full shadow-sm hover:shadow-pill-cocoa transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
