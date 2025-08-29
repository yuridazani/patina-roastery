// src/pages/ReceiptPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReceiptPage = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center p-10">
        <p>Data struk tidak ditemukan.</p>
        <Link to="/" className="text-blue-600">Kembali ke beranda</Link>
      </div>
    );
  }

  const { orderDetails, customerDetails, fulfillment, orderNumber } = state;

  return (
    <div className="bg-gray-100 flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-sm bg-white font-mono text-sm text-black p-6 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold">Patina Roastery.</h1>
          <p>Jl. Tunjungan No. 123, Surabaya</p>
          <p>--- Struk Digital ---</p>
        </div>
        <div className="mb-4">
          <p><strong>No. Pesanan:</strong> PATINA-{orderNumber}</p>
          <p><strong>Nama:</strong> {customerDetails.name}</p>
          <p><strong>Layanan:</strong> {fulfillment}</p>
          {fulfillment === 'Dine-in' && <p><strong>No. Meja:</strong> {customerDetails.tableNumber}</p>}
        </div>
        <hr className="border-dashed my-4"/>
        <div>
          {orderDetails.items.map(item => (
            <div key={item.id} className="flex justify-between mb-1">
              <span>{item.quantity}x {item.name}</span>
              <span>{(parseInt(item.price.replace('k',''))*1000*item.quantity).toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
        <hr className="border-dashed my-4"/>
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>Rp {orderDetails.total.toLocaleString('id-ID')}</span>
        </div>
        <div className="text-center mt-8">
          <p>Terima Kasih!</p>
          <p className="text-xs">Simpan struk ini untuk konfirmasi</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;