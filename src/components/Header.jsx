// src/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingBag } from 'lucide-react';

// Komponen Header yang dipindahkan dari LandingPage
const Header = () => {
  const { toggleCart, cartItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Header utama, z-index-nya kita atur di z-30 */}
      <header className="absolute top-0 left-0 right-0 z-30 p-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold text-[#efe6dd] z-20">
            Patina.
          </Link>
          
          {/* Navigasi Desktop (tidak berubah) */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#proses" className="text-[#efe6dd]/80 hover:text-[#efe6dd] transition-colors">Proses</a>
            <Link to="/menu" className="text-[#efe6dd]/80 hover:text-[#efe6dd] transition-colors">Menu</Link>
            <a href="/#lokasi" className="text-[#efe6dd]/80 hover:text-[#efe6dd] transition-colors">Lokasi</a>
          </nav>

          {/* Grup untuk semua item di kanan */}
          <div className="flex items-center justify-end space-x-4">
            <Link to="/koleksi" className="hidden md:block bg-[#bb4430] text-[#efe6dd] px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-transform hover:scale-105">
              Pesan Online
            </Link>

            <button onClick={toggleCart} className="relative text-[#efe6dd]">
              <ShoppingBag size={24}/>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#bb4430] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Tombol Hamburger/X, dibuat paling atas */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#efe6dd] relative z-50">
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Panel Mobile Menu, z-index-nya kita naikkan ke z-40 */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#231f20] text-[#efe6dd] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="/#proses" className="font-display text-4xl" onClick={toggleMenu}>Proses</a>
          <Link to="/menu" className="font-display text-4xl" onClick={toggleMenu}>Menu</Link>
          <a href="/#lokasi" className="font-display text-4xl" onClick={toggleMenu}>Lokasi</a>
          <Link to="/koleksi" className="mt-8 bg-[#bb4430] text-[#efe6dd] px-8 py-4 rounded-full font-semibold" onClick={toggleMenu}>
            Pesan Online
          </Link>
        </div>
      </div>
    </>
  );
};
export default Header;