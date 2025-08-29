# Patina Roastery - Website Coffee Shop & E-Commerce

Ini adalah proyek *front-end* lengkap untuk **Patina Roastery**, sebuah *coffee shop* fiktif. Proyek ini dibangun menggunakan React dan Vite, serta dilengkapi dengan sistem pemesanan *online* dari awal hingga akhir.

Website ini tidak hanya berfungsi sebagai profil perusahaan, tetapi juga sebagai platform e-commerce yang fungsional, memungkinkan pelanggan untuk memesan produk kafe dan ritel secara langsung.

## ✨ Fitur Utama

* **Landing Page yang Menarik**: Halaman utama yang dirancang dengan indah, menampilkan cerita brand, proses pembuatan kopi, dan testimoni pelanggan. Dilengkapi dengan animasi modern menggunakan **GSAP** dan **AOS** untuk pengalaman pengguna yang lebih hidup.
* **Sistem Pemesanan Online (`/koleksi`)**: Pengguna dapat dengan mudah menelusuri menu kafe (makanan & minuman) serta produk ritel (biji kopi & merchandise) untuk ditambahkan ke keranjang.
* **Keranjang Belanja Fungsional**: Panel keranjang belanja yang dapat dibuka-tutup, memungkinkan pengguna untuk melihat, mengubah jumlah, dan menghapus item pesanan mereka dengan mudah.
* **Proses Checkout Cerdas**: Halaman checkout yang dinamis dan mampu beradaptasi. Pilihan layanan (seperti *Dine-in*, *Takeaway*, atau *Delivery*) akan otomatis disesuaikan berdasarkan jenis produk yang ada di keranjang.
* **Alur Pembayaran Lengkap**: Simulasi alur pembayaran yang mulus, mulai dari halaman detail pesanan, halaman pembayaran (dengan QRIS sebagai contoh), hingga halaman konfirmasi pesanan berhasil.
* **Struk Digital**: Setelah pesanan berhasil, sistem akan membuat halaman struk digital yang berisi rincian pesanan dan dapat disimpan oleh pelanggan.
* **Desain Responsif**: Tampilan website dioptimalkan untuk berbagai ukuran layar, baik di perangkat desktop maupun mobile.

## 🛠️ Teknologi yang Digunakan

* **Framework**: React.js
* **Build Tool**: Vite
* **Routing**: React Router DOM
* **Manajemen State**: React Context API (untuk fungsionalitas keranjang)
* **Styling**: Tailwind CSS (melalui CDN) & CSS dasar
* **Animasi**: GSAP (GreenSock Animation Platform) & AOS (Animate On Scroll)
* **Ikon**: Lucide React
* **Notifikasi**: React Hot Toast

## 🚀 Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/yuridazani/patina-roastery.git](https://github.com/yuridazani/patina-roastery.git)
    cd patina-roastery
    ```

2.  **Instal semua dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  Buka browser Anda dan kunjungi `http://localhost:5173` (atau port lain yang ditampilkan di terminal Anda).
