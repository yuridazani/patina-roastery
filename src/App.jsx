// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Impor Layout dan semua halaman
import Layout from './Layout';
import LandingPage from './LandingPage';
import MenuPage from './pages/MenuPage';
import KoleksiPage from './pages/KoleksiPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage'; // <-- Pastikan ini diimpor
import OrderSuccessPage from './pages/OrderSuccessPage';
import ReceiptPage from './pages/ReceiptPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Rute Landing Page (tanpa layout global) */}
          <Route path="/" element={<LandingPage />} />

          {/* Rute dengan Layout Global (Header & Keranjang) */}
          <Route element={<Layout />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/koleksi" element={<KoleksiPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} /> {/* <-- Tambahkan ini */}
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;