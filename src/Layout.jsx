// src/Layout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { ShoppingBag } from 'lucide-react';
import CartPanel from './components/CartPanel';

// Header baru khusus untuk halaman internal
const InternalHeader = () => {
  const { toggleCart, cartItemCount } = useCart();
  return (
    <header className="sticky top-0 z-30 py-6 bg-[#efe6dd]/80 backdrop-blur-md border-b border-[#231f20]/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-[#231f20]">Patina.</Link>
        <button onClick={toggleCart} className="relative text-[#231f20]">
          <ShoppingBag size={24}/>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#bb4430] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <>
      <InternalHeader /> {/* <-- Gunakan header internal yang baru */}
      <CartPanel />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;