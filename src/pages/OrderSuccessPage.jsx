// src/pages/OrderSuccessPage.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  const { state } = useLocation();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  // Siapkan detail struk untuk diteruskan ke halaman /receipt
  const receiptDetails = { ...state, orderNumber };

  // Kondisional: tampilkan pesan untuk kasir jika pesanan dine-in, takeaway, atau pick-up
  const isForCashier = ['Dine-in', 'Takeaway', 'Pick Up'].includes(state?.fulfillment);

  return (
    <div className="bg-[#efe6dd] min-h-screen flex justify-center items-center p-4">
      <div className="bg-white/60 p-10 rounded-2xl shadow-lg max-w-lg text-center">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-6"/>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#231f20]">Pesanan Berhasil!</h1>
        <p className="mt-4 text-lg text-[#231f20]/80">
          Terima kasih, {state?.customerDetails?.name || 'Sobat Patina'}!
        </p>

        {/* Pesan kondisional untuk kasir */}
        {isForCashier && (
          <p className="mt-4 p-3 bg-[#f3dfa2]/50 text-[#231f20] rounded-lg border border-[#f3dfa2]">
            Silakan tunjukkan halaman ini atau struk digital ke kasir saat pengambilan.
          </p>
        )}

        <div className="mt-6 text-left bg-white p-4 rounded-lg border space-y-2">
          <p><strong>Nomor Pesanan:</strong> PATINA-{orderNumber}</p>
          {state?.fulfillment === 'Dine-in' && (
            <p><strong>Nomor Meja:</strong> {state.customerDetails.tableNumber}</p>
          )}
          <p><strong>Layanan:</strong> {state?.fulfillment || 'Tidak diketahui'}</p>

          {/* Link Struk Digital */}
          <Link
            to="/receipt"
            state={receiptDetails}
            className="text-blue-600 font-bold underline block mt-2"
          >
            Lihat Struk Digital
          </Link>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block bg-[#231f20] text-white px-8 py-4 rounded-full font-bold"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
