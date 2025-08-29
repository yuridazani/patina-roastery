// src/pages/CheckoutPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, cartTotal, cartItemCount } = useCart();
  const navigate = useNavigate();

  // 1. Analisis isi keranjang dengan benar
  const cartContainsCafe = cartItems.some(item => item.type === 'cafe');
  const cartContainsRetail = cartItems.some(item => item.type === 'retail');

  // 2. Tentukan pilihan layanan yang TEPAT berdasarkan 3 skenario
  let fulfillmentOptions = [];
  if (cartContainsCafe && !cartContainsRetail) { // HANYA menu kafe
    fulfillmentOptions = ['Dine-in', 'Takeaway'];
  } else if (!cartContainsCafe && cartContainsRetail) { // HANYA produk retail
    fulfillmentOptions = ['Pick Up', 'Delivery'];
  } else { // Campuran keduanya
    fulfillmentOptions = ['Pick Up', 'Delivery'];
  }
  
  // 3. Gunakan SATU state tunggal untuk semua pilihan layanan
  const [fulfillment, setFulfillment] = useState(fulfillmentOptions[0]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    tableNumber: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim semua data ke halaman pembayaran via state router
    navigate('/payment', { 
      state: { 
        orderDetails: {
          items: cartItems,
          total: grandTotal, // Kirim grandTotal yang sudah termasuk ongkir
        },
        customerDetails,
        fulfillment,
        paymentMethod: 'qris' // Default payment method, bisa dibuat dinamis nanti
      } 
    });
  };

  useEffect(() => {
    if (cartItemCount === 0) {
      navigate('/koleksi');
    }
    window.scrollTo(0, 0);
  }, [cartItemCount, navigate]);

  // 4. Hitung biaya pengiriman berdasarkan state yang BENAR
  const shippingCost = fulfillment === 'Delivery' ? 18000 : 0;
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="bg-[#efe6dd] min-h-screen">
      <header className="py-6 border-b border-[#231f20]/10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/koleksi" className="flex items-center text-[#231f20]/80 hover:text-[#bb4430] transition-colors">
            <ArrowLeft size={20} className="mr-2"/> Kembali ke Toko
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#231f20]">Patina.</h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          {/* Sisi Kiri: Form Detail */}
          <div className="lg:pr-8">
            <h2 className="font-display text-3xl font-bold text-[#231f20] mb-6">Detail Pesanan</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">Informasi Kontak</label>
                <input required type="email" id="email" value={customerDetails.email} onChange={handleInputChange} placeholder="email@anda.com" className="mt-1 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]"/>
                <input required type="text" id="name" value={customerDetails.name} onChange={handleInputChange} placeholder="Nama Anda" className="mt-2 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]"/>
              </div>

              {/* Pilihan Layanan yang sudah cerdas */}
              <div>
                <label className="text-sm font-medium">Pilihan Layanan</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {fulfillmentOptions.map(option => (
                    <button key={option} type="button" onClick={() => setFulfillment(option)} className={`p-4 rounded-lg text-left transition-all text-sm sm:text-base ${fulfillment === option ? 'bg-[#231f20] text-white ring-2 ring-offset-2 ring-[#231f20]' : 'bg-white/60 hover:bg-white/80'}`}>
                      <span className="font-bold block">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form yang muncul sesuai pilihan layanan */}
              <div>
                {fulfillment === 'Dine-in' && (
                  <div>
                    <label htmlFor="tableNumber" className="text-sm font-medium">Informasi Meja</label>
                    <input required type="number" id="tableNumber" value={customerDetails.tableNumber} onChange={handleInputChange} placeholder="Nomor Meja Anda" className="mt-1 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]"/>
                  </div>
                )}
                {fulfillment === 'Delivery' && (
                  <div>
                    <label htmlFor="address" className="text-sm font-medium">Alamat Pengiriman</label>
                    <textarea required id="address" rows="3" value={customerDetails.address} onChange={handleInputChange} placeholder="Jl. Tunjungan No. 123..." className="mt-1 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]"></textarea>
                  </div>
                )}
                 {(fulfillment === 'Takeaway' || fulfillment === 'Pick Up') && (
                  <div className="p-4 bg-[#f3dfa2]/50 text-sm text-[#231f20] rounded-lg border border-[#f3dfa2]">
                    Pesanan akan kami siapkan dan bisa diambil di kasir. Anda akan mendapat notifikasi jika sudah siap.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Ringkasan Pesanan */}
          <div className="bg-white/60 p-8 rounded-2xl shadow-sm self-start">
            <h2 className="font-display text-2xl font-bold text-[#231f20] mb-6 flex items-center"><ShoppingCart size={24} className="mr-3"/> Ringkasan Pesanan</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-[#231f20]/70">Jumlah: {item.quantity}</p>
                    </div>
                  </div>
                  <p>Rp {(parseInt(item.price.replace('k', '')) * 1000 * item.quantity).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#231f20]/20 my-6"></div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><p>Subtotal</p><p>Rp {cartTotal.toLocaleString('id-ID')}</p></div>
              <div className="flex justify-between"><p>Layanan ({fulfillment})</p><p>Rp {shippingCost.toLocaleString('id-ID')}</p></div>
              <div className="flex justify-between font-bold text-lg"><p>Total</p><p>Rp {grandTotal.toLocaleString('id-ID')}</p></div>
            </div>
            <button type="submit" className="mt-6 w-full text-center block bg-[#231f20] text-white p-4 rounded-xl font-bold hover:bg-opacity-90">Lanjut ke Pembayaran</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;