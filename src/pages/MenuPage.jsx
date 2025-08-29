// src/pages/MenuPage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Untuk tombol kembali
import { Coffee, Zap, GlassWater } from 'lucide-react';

// Data sampel untuk menu kita
const menuData = {
  espressoBased: [
    { name: "Espresso", price: "22k" },
    { name: "Americano", price: "25k" },
    { name: "Cappuccino", price: "28k" },
    { name: "Latte", price: "28k" },
  ],
  signature: [
    { name: "Patina House Blend", price: "30k", description: "Note cokelat hitam dan hint buah kering." },
    { name: "Verdigris Sea Salt Latte", price: "32k", description: "Latte dengan sirup pandan dan sea salt foam gurih." },
    { name: "Persian Red Cascara", price: "28k", description: "Teh dari kulit ceri kopi dengan sentuhan rempah." },
  ],
  nonCoffee: [
    { name: "Chocolate", price: "28k" },
    { name: "Matcha Latte", price: "30k" },
    { name: "Artisan Tea", price: "25k" },
  ]
};

// Komponen kecil untuk setiap item menu
const MenuItem = ({ name, price, description }) => (
  <div className="flex justify-between items-start py-4 border-b border-[#231f20]/10">
    <div>
      <h4 className="font-display text-xl font-bold text-[#231f20]">{name}</h4>
      {description && <p className="text-sm text-[#231f20]/70 mt-1">{description}</p>}
    </div>
    <p className="font-display text-xl text-[#231f20] flex-shrink-0 ml-4">{price}</p>
  </div>
);

// Komponen utama halaman menu
const MenuPage = () => {
  return (
    <div className="bg-[#efe6dd] min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#231f20]">Our Collection</h1>
          <p className="mt-4 text-lg text-[#231f20]/80">Koleksi rasa yang kami kurasi dengan sepenuh hati.</p>
        </div>

        {/* Signature Section */}
        <div className="mb-12">
          <h2 className="flex items-center font-display text-3xl font-bold text-[#bb4430] mb-6">
            <Zap size={30} className="mr-3"/> Signatures
          </h2>
          <div className="bg-white/60 p-6 md:p-8 rounded-2xl shadow-sm">
            {menuData.signature.map(item => <MenuItem key={item.name} {...item} />)}
          </div>
        </div>

        {/* Espresso & Non-Coffee Sections */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="flex items-center font-display text-3xl font-bold text-[#231f20] mb-6">
              <Coffee size={30} className="mr-3"/> Espresso Based
            </h2>
            <div className="bg-white/60 p-6 md:p-8 rounded-2xl shadow-sm">
              {menuData.espressoBased.map(item => <MenuItem key={item.name} {...item} />)}
            </div>
          </div>
          <div>
            <h2 className="flex items-center font-display text-3xl font-bold text-[#231f20] mb-6">
              <GlassWater size={30} className="mr-3"/> Non-Coffee
            </h2>
            <div className="bg-white/60 p-6 md:p-8 rounded-2xl shadow-sm">
              {menuData.nonCoffee.map(item => <MenuItem key={item.name} {...item} />)}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-20">
            <Link to="/" className="bg-[#231f20] text-[#efe6dd] px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
                Kembali ke Beranda
            </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;