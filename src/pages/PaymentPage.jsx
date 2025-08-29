// src/pages/PaymentPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QrCode, Landmark, Wallet } from 'lucide-react';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Jika tidak ada state, kembali ke beranda
  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }

    // Simulasi pembayaran otomatis setelah 5 detik untuk QRIS/E-wallet
    if (state.paymentMethod !== 'va') {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      const redirectTimer = setTimeout(() => {
        navigate('/order-success', { state: state }); // Teruskan state ke halaman sukses
      }, 5000);

      return () => {
        clearTimeout(redirectTimer);
        clearInterval(timer);
      };
    }
  }, [state, navigate]);

  if (!state) return null; // Mencegah render jika tidak ada state

  const renderPaymentMethod = () => {
    switch(state.paymentMethod) {
      case 'qris':
        return <div className="text-center"><QrCode size={200} className="mx-auto"/><p className="mt-4 font-bold">Pindai QRIS untuk membayar</p><p className="text-sm mt-4">Akan dialihkan dalam {countdown} detik...</p></div>;
      case 'va':
        return <div className="text-left space-y-2"><p>Bank Transfer (Virtual Account)</p><p className="font-bold text-2xl">7708 1234 5678 9012</p><p className="text-sm">a/n Patina Roastery</p><button onClick={() => navigate('/order-success', { state: state })} className="mt-4 w-full bg-[#231f20] text-white p-3 rounded-md">Saya Sudah Bayar</button></div>;
      case 'e-wallet':
        return <div className="text-center"><Wallet size={80} className="mx-auto text-[#bb4430]"/><p className="mt-4 font-bold">Silakan konfirmasi di aplikasi E-Wallet Anda</p><p className="text-sm mt-4">Akan dialihkan dalam {countdown} detik...</p></div>;
      default:
        return <p>Metode pembayaran tidak valid.</p>
    }
  }

  return (
    <div className="bg-[#efe6dd] min-h-screen flex justify-center items-center p-4">
      <div className="bg-white/60 p-10 rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="font-display text-3xl font-bold text-[#231f20] mb-6">Selesaikan Pembayaran</h1>
        <div className="p-6 border rounded-lg bg-white">
          {renderPaymentMethod()}
        </div>
        <p className="mt-6 text-2xl font-bold">Total: Rp {state.orderDetails.total.toLocaleString('id-ID')}</p>
      </div>
    </div>
  );
};

export default PaymentPage;