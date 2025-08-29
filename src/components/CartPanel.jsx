// src/components/CartPanel.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';

const CartPanel = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, adjustQuantity, cartTotal, cartItemCount } = useCart();

  return (
    // Backdrop & Panel Container
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        onClick={toggleCart} 
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* Panel */}
      <div 
        className={`relative flex flex-col h-full w-full max-w-md ml-auto bg-[#efe6dd] shadow-xl transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header Panel */}
        <div className="flex justify-between items-center p-6 border-b border-[#231f20]/10">
          <h2 className="font-display text-2xl font-bold text-[#231f20]">Keranjang Anda ({cartItemCount})</h2>
          <button onClick={toggleCart} className="text-[#231f20]/60 hover:text-[#bb4430]">
            <X size={24} />
          </button>
        </div>

        {/* Daftar Item */}
        {cartItems.length > 0 ? (
          <div className="flex-grow p-6 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-start space-x-4 mb-6">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-display font-bold text-lg">{item.name}</h3>
                  <p className="font-display text-md text-[#bb4430]">{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => adjustQuantity(item.id, -1)} className="p-1 border rounded-full"><Minus size={14} /></button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button onClick={() => adjustQuantity(item.id, 1)} className="p-1 border rounded-full"><Plus size={14} /></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-[#231f20]/40 hover:text-red-500"><Trash2 size={20} /></button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex flex-col justify-center items-center text-center p-6">
            <h3 className="font-display text-xl font-bold">Keranjangmu masih kosong</h3>
            <p className="text-[#231f20]/70 mt-2">Yuk, lihat koleksi kami!</p>
          </div>
        )}

        {/* Footer Panel */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#231f20]/10">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Subtotal</span>
              {/* Format harga agar lebih mudah dibaca */}
              <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            <Link to="/checkout" onClick={toggleCart} className="w-full text-center block bg-[#231f20] text-white p-4 rounded-xl font-bold hover:bg-opacity-90">
              Lanjut ke Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPanel;