// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // --- BARU: FUNGSI UNTUK MENGUBAH JUMLAH ITEM ---
  const adjustQuantity = (productId, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) } // Pastikan quantity tidak kurang dari 1
          : item
      )
    );
  };
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // --- BARU: FUNGSI UNTUK MENGHITUNG TOTAL HARGA ---
  const cartTotal = cartItems.reduce((total, item) => {
    // Menghilangkan 'k' dan mengubah jadi angka (misal: '125k' -> 125000)
    const price = parseInt(item.price.replace('k', '')) * 1000;
    return total + price * item.quantity;
  }, 0);


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart,
    cartItemCount,
    adjustQuantity, // <-- Tambahkan fungsi baru ke value
    cartTotal,      // <-- Tambahkan total harga ke value
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};