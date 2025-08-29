// src/LandingPage.jsx
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from 'aos';
import { Leaf, Award, Store, Instagram, Twitter, Youtube, MapPin, Clock, Zap, Menu, X, Mail, ShoppingBag } from 'lucide-react';
import { useCart } from './context/CartContext'; // <-- Tambahan untuk keranjang
import Header from './components/Header';


// Impor gambar lokal
import coffeeImg from "./assets/brent-gorwin-vhQUnmnOLys-unsplash.jpg";
import cafeImg from "./assets/ruben-ramirez-xhKG01FN2uk-unsplash.jpg";

// ===============================================
// ## KOMPONEN-KOMPONEN UI
// ===============================================
const Modal = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out
                  ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className={`relative bg-[#efe6dd] text-[#231f20] rounded-2xl shadow-xl w-11/12 max-w-md p-8 transition-all duration-300 ease-in-out
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#231f20]/50 hover:text-[#bb4430] transition-colors">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};


const HeroSection = () => (
    <section className="relative h-screen flex items-center justify-center bg-[#231f20] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2564&auto=format&fit=crop')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-transparent to-[#231f20]/20"></div>
        <div className="relative z-10 text-center text-[#efe6dd] px-4" data-aos="fade-up">
            {/* Ukuran teks disesuaikan untuk mobile */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-tight">
                Rasa yang Ditempa<br />Waktu.
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#efe6dd]/80">
                Di Patina Roastery, setiap biji kopi adalah kanvas. Kami menyangrainya dengan teliti untuk mengeluarkan karakter terbaiknya.
            </p>
            {/* Tombol dibuat vertikal di mobile */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/menu" className="w-full sm:w-auto bg-[#bb4430] text-[#efe6dd] px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-transform hover:scale-105 transform">
                    Lihat Koleksi Kopi
                </Link>
                <a href="#lokasi" className="w-full sm:w-auto border-2 border-[#efe6dd]/50 text-[#efe6dd] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#efe6dd] hover:text-[#231f20] transition-all">
                    Kunjungi Kami
                </a>
            </div>
        </div>
    </section>
);

const ProcessSection = () => {
    const processes = [
        { step: "01", title: "Panen Pilihan", description: "Kami hanya memilih ceri kopi matang sempurna dari perkebunan dataran tinggi terbaik.", imageUrl: "https://images.unsplash.com/photo-1551009175-15b79d725f38?q=80&w=2574&auto=format&fit=crop" },
        { step: "02", title: "Sangrai Artisan", description: "Setiap batch kami sangrai dengan teliti untuk membuka profil rasa yang kompleks dan unik.", imageUrl: "https://images.unsplash.com/photo-1528915421128-4b21a87b8f95?q=80&w=2535&auto=format&fit=crop" },
        { step: "03", title: "Seduh Presisi", description: "Barista kami menggunakan teknik seduh presisi untuk mengekstraksi setiap tetes rasa.", imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=2574&auto=format&fit=crop" },
        { step: "04", title: "Saji Sepenuh Hati", description: "Kami menyajikan setiap pesanan sebagai puncak dari perjalanan panjang kopi.", imageUrl: "https://images.unsplash.com/photo-1517701559438-c38c8236ec9c?q=80&w=2574&auto=format&fit=crop" }
    ];

    const component = useRef(null);
    const slider = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // LOGIKA RESPONSIVE GSAP DENGAN matchMedia
        ScrollTrigger.matchMedia({
            // HANYA JALAN DI DESKTOP (lebar layar > 1024px)
            "(min-width: 1024px)": function() {
                let ctx = gsap.context(() => {
                    let panels = gsap.utils.toArray(".panel");
                    gsap.to(panels, {
                        xPercent: -100 * (panels.length - 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: slider.current,
                            pin: true,
                            scrub: 1,
                            snap: 1 / (panels.length - 1),
                            end: () => "+=" + slider.current.offsetWidth
                        }
                    });
                }, component);
                return () => ctx.revert();
            }
        });
    }, []);

    return (
        <section id="proses" className="bg-[#efe6dd]" ref={component}>
            <div className="container mx-auto py-12 lg:py-20 px-4">
                 <h2 className="font-display text-4xl md:text-5xl font-bold text-[#231f20] text-center" data-aos="fade-up">
                    Empat Langkah, Satu Rasa Sempurna
                </h2>
            </div>
            
            {/* Container ini diubah untuk mobile vs desktop */}
            <div ref={slider} className="lg:flex lg:w-[400vw] lg:h-screen">
                {processes.map((p, index) => (
                    // Di mobile (default), ini akan jadi block vertikal
                    // Di desktop (lg:), ini akan jadi panel horizontal
                    <div key={index} className="panel container mx-auto lg:w-screen lg:h-full flex items-center px-4 lg:px-24 py-12 lg:py-0">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className='text-left md:order-2'>
                                <p className='font-display text-6xl md:text-7xl font-bold text-[#bb4430]/30'>{p.step}</p>
                                <h3 className='font-display text-3xl md:text-4xl font-bold text-[#231f20] mt-2'>{p.title}</h3>
                                <p className='mt-4 text-base md:text-lg text-[#231f20]/70'>{p.description}</p>
                            </div>
                            <div className='w-full h-80 rounded-2xl overflow-hidden shadow-xl md:order-1'>
                                <img src={p.imageUrl} className='w-full h-full object-cover' alt={p.title}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FeatureSection = () => (
  <section id="menu" className="py-24 bg-[#231f20] text-[#efe6dd]">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Signature Kami,<br />
            Karakter Pilihanmu.
          </h2>
          <p className="mt-4 text-lg text-[#efe6dd]/70">
            Tiap menu diracik untuk menonjolkan profil rasa yang kompleks dan tak terlupakan.
          </p>
          <div className="mt-8 space-y-6">
            <div className="bg-[#231f20] border border-[#efe6dd]/20 p-6 rounded-2xl hover:bg-[#efe6dd]/5 transition-colors">
              <h4 className="font-display text-2xl font-bold text-[#f3dfa2]">Patina House Blend</h4>
              <p className="text-[#efe6dd]/70 mt-1">Espresso dengan body tebal, note cokelat hitam dan hint buah kering.</p>
            </div>
            <div className="bg-[#231f20] border border-[#efe6dd]/20 p-6 rounded-2xl hover:bg-[#efe6dd]/5 transition-colors">
              <h4 className="font-display text-2xl font-bold text-[#f3dfa2]">Verdigris Sea Salt Latte</h4>
              <p className="text-[#efe6dd]/70 mt-1">Paduan unik latte dengan sirup pandan dan sea salt foam gurih.</p>
            </div>
            <div className="bg-[#231f20] border border-[#efe6dd]/20 p-6 rounded-2xl hover:bg-[#efe6dd]/5 transition-colors">
              <h4 className="font-display text-2xl font-bold text-[#f3dfa2]">Persian Red Cascara</h4>
              <p className="text-[#efe6dd]/70 mt-1">Teh dari kulit ceri kopi, disajikan dingin dengan sentuhan rempah.</p>
            </div>
          </div>
        </div>
        <div className="h-[600px] rounded-2xl overflow-hidden" data-aos="fade-left">
          <img
            src={coffeeImg}
            alt="Barista menuang kopi"
            className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </section>
);

const TestimonialSection = () => (
    <section className="py-20 bg-[#efe6dd]">
        <div className="container mx-auto px-4 text-center">
             <h2 className="font-display text-4xl md:text-5xl font-bold" data-aos="fade-up">Kata Mereka yang Telah Menemukan Rasanya</h2>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-[#231f20]/5 text-left transform hover:-translate-y-2 transition-transform">
                     <p className="text-[#231f20]/80">"Akhirnya nemu kopi di Surabaya yang serius soal rasa. House Blend-nya solid banget buat kerja. Suasananya juga 10/10, nggak berisik."</p>
                     <div className="mt-6 flex items-center">
                         <img src="https://i.pravatar.cc/48?u=1" className="w-12 h-12 rounded-full" alt="Yurida"/>
                         <div className="ml-4">
                             <p className="font-bold">Yurida Zani</p><p className="text-sm text-[#231f20]/60">UI/UX Designer</p>
                         </div>
                     </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-[#231f20]/5 text-left transform hover:-translate-y-2 transition-transform">
                     <p className="text-[#231f20]/80">"Sea Salt Latte-nya unik parah. Belum pernah nemu rasa kayak gini di tempat lain. Wajib coba!"</p>
                     <div className="mt-6 flex items-center">
                         <img src="https://i.pravatar.cc/48?u=2" className="w-12 h-12 rounded-full" alt="Budi"/>
                         <div className="ml-4">
                             <p className="font-bold">Budi Santoso</p><p className="text-sm text-[#231f20]/60">Musisi</p>
                         </div>
                     </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-[#231f20]/5 text-left transform hover:-translate-y-2 transition-transform md:col-span-2 lg:col-span-1">
                     <p className="text-[#231f20]/80">"Cascara di sini beda, lebih wangi dan seger. Tempatnya juga aesthetic, cocok buat yang suka foto-foto."</p>
                     <div className="mt-6 flex items-center">
                         <img src="https://i.pravatar.cc/48?u=3" className="w-12 h-12 rounded-full" alt="Citra"/>
                         <div className="ml-4">
                             <p className="font-bold">Citra Lestari</p><p className="text-sm text-[#231f20]/60">Fotografer</p>
                         </div>
                     </div>
                </div>
             </div>
        </div>
     </section>
);

const LocationSection = () => (
    <section id="lokasi" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div data-aos="fade-right">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-[#231f20]">Temukan Kami di Sini</h2>
                    <p className="mt-4 text-lg text-[#231f20]/70">Kami menunggumu untuk berbagi cerita dan rasa. Kunjungi roastery kami di jantung kota Surabaya.</p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center">
                            <MapPin size={24} className="text-[#bb4430] flex-shrink-0" />
                            <p className="ml-4">Jl. Tunjungan No. 123, Surabaya, Jawa Timur</p>
                        </div>
                        <div className="flex items-center">
                            <Clock size={24} className="text-[#bb4430] flex-shrink-0" />
                            <p className="ml-4">Buka Setiap Hari, 08:00 - 22:00 WIB</p>
                        </div>
                    </div>
                     <button className="mt-8 bg-[#231f20] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-colors">
                        Lihat di Google Maps
                    </button>
                </div>
                <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl" data-aos="fade-left">
                    <img src={cafeImg} className="w-full h-full object-cover" alt="Suasana Patina Roastery"/>
                </div>
            </div>
        </div>
    </section>
);

const CtaSection = ({ onOpenModal }) => (
    <section className="bg-[#7ebdc2] text-[#231f20]">
        <div className="container mx-auto py-20 px-4 text-center" data-aos="zoom-in">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Temukan Karaktermu.</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg">Jadilah yang pertama tahu tentang biji kopi terbaru, promo eksklusif, dan acara di Patina Roastery.</p>
            <div className="mt-8">
                {/* Tombol ini sekarang memanggil fungsi untuk membuka modal */}
                <button 
                  onClick={onOpenModal}
                  className="bg-[#bb4430] text-[#efe6dd] px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-transform hover:scale-105 transform"
                >
                    Jadi Teman Patina
                </button>
            </div>
        </div>
    </section>
);
      
const Footer = () => (
    <footer className="bg-[#231f20] text-[#efe6dd]/70 py-12">
        <div className="container mx-auto px-4 text-center">
            <p className="font-display text-2xl font-bold text-[#efe6dd]">Patina Roastery.</p>
            <div className="mt-6 flex justify-center space-x-6">
                <a href="#" className="hover:text-[#f3dfa2] transition-colors"><Instagram size={24}/></a>
                <a href="#" className="hover:text-[#f3dfa2] transition-colors"><Twitter size={24}/></a>
                <a href="#" className="hover:text-[#f3dfa2] transition-colors"><Youtube size={24}/></a>
            </div>
            <p className="mt-8 text-sm text-[#efe6dd]/50">
                © 2025 Patina Roastery. Crafted with character in Surabaya.
            </p>
        </div>
    </footer>
);


// ===============================================
// ## KOMPONEN UTAMA LANDING PAGE
// ===============================================

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <main>
        <Header />
        <HeroSection />
        <ProcessSection />
        <FeatureSection />
        <TestimonialSection />
        <LocationSection />
        <CtaSection onOpenModal={openModal} />
        <Footer />
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#bb4430]/20 mb-4">
            <Mail size={32} className="text-[#bb4430]" />
          </div>
          <h3 className="font-display text-3xl font-bold text-[#231f20]">Jadi Teman Patina</h3>
          <p className="mt-2 text-base text-[#231f20]/70">
            Daftarkan emailmu dan jadilah yang pertama mendapatkan info eksklusif dari kami.
          </p>
          <form className="mt-6 text-left">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#231f20]/80">Nama</label>
                <input type="text" id="name" placeholder="Nama Kamu" className="mt-1 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#231f20]/80">Email</label>
                <input type="email" id="email" placeholder="email@kamu.com" className="mt-1 w-full p-3 bg-white/80 border border-[#231f20]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bb4430]" />
              </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-[#231f20] text-[#efe6dd] p-3 rounded-md font-bold hover:bg-opacity-90 transition-colors">
              Daftar Sekarang
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default LandingPage;