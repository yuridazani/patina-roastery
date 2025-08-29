// src/pages/KoleksiPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Coffee, Utensils, ShoppingCart, Croissant } from 'lucide-react';
import AOS from 'aos';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext'; 

// ===============================================
// ## DATA MENU ONLINE (dengan type)
// ===============================================
const onlineMenu = {
  cafeMenu: [
    {
      category: 'Signature Coffee',
      icon: <Coffee size={24} className="mr-3" />,
      items: [
        { id: 101, name: 'Patina House Blend', price: '30k', description: 'Espresso, fresh milk, dan gula aren premium.', imageUrl: 'https://images.unsplash.com/photo-1572498283419-69b23b4a2958?q=80&w=2564&auto=format&fit=crop', type: 'cafe' },
        { id: 102, name: 'Verdigris Sea Salt Latte', price: '32k', description: 'Latte dengan sirup pandan dan sea salt foam gurih.', imageUrl: 'https://images.unsplash.com/photo-1610890482520-551b81831274?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 103, name: 'Caramel Macchiato', price: '34k', description: 'Suntikan vanila, susu, espresso, dan saus karamel.', imageUrl: 'https://images.unsplash.com/photo-1576092762791-d67b79f22b8e?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 104, name: 'Patina Black Cold Brew', price: '35k', description: 'Ekstraksi dingin selama 12 jam, kuat dan menyegarkan.', imageUrl: 'https://images.unsplash.com/photo-1517701559438-c38c8236ec9c?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 105, name: 'Vanilla Affogato', price: '30k', description: 'Satu scoop es krim vanila ditenggelamkan dalam espresso.', imageUrl: 'https://images.unsplash.com/photo-1579953935212-002f2334a413?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 106, name: 'Mocha Latte', price: '34k', description: 'Perpaduan sempurna antara cokelat premium dan espresso.', imageUrl: 'https://images.unsplash.com/photo-1542287943-2612501a4e2a?q=80&w=2597&auto=format&fit=crop', type: 'cafe' },
      ]
    },
    {
      category: 'Manual Brew',
      icon: <Coffee size={24} className="mr-3" />,
      items: [
        { id: 201, name: 'V60 - Gayo Wine', price: '35k', description: 'Profil rasa fruity dan winey yang kompleks.', imageUrl: 'https://images.unsplash.com/photo-1593181829280-55d48a3c89b8?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 202, name: 'Japanese Iced - Kerinci', price: '38k', description: 'Sangat menyegarkan dengan aftertaste yang bersih.', imageUrl: 'https://images.unsplash.com/photo-1628178873199-91e84a289947?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 203, name: 'Kalita Wave - Kintamani', price: '35k', description: 'Body seimbang dengan hint rasa jeruk dan cokelat.', imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da2848a094?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 204, name: 'Aeropress - Flores Bajawa', price: '33k', description: 'Rasa yang intens dan kaya, minim ampas.', imageUrl: 'https://images.unsplash.com/photo-1608678559244-6202e7a18851?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 205, name: 'Tubruk - Robusta Dampit', price: '20k', description: 'Untuk pencari kafein sejati, pahit dan mantap.', imageUrl: 'https://images.unsplash.com/photo-1599391113262-e23e6c02a762?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 206, name: 'Vietnam Drip - House Blend', price: '28k', description: 'Kopi tetes khas Vietnam dengan susu kental manis.', imageUrl: 'https://images.unsplash.com/photo-1561088316-433b91a547b7?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
      ]
    },
    {
      category: 'Main Course & Snacks',
      icon: <Utensils size={24} className="mr-3" />,
      items: [
        { id: 301, name: 'Truffle Mushroom Pasta', price: '65k', description: 'Creamy pasta dengan jamur champignon dan truffle oil.', imageUrl: 'https://images.unsplash.com/photo-1598866594240-a314d756d036?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 302, name: 'Patina Signature Fries', price: '35k', description: 'Kentang goreng renyah dengan bumbu rahasia.', imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 303, name: 'Spicy Chicken Wings', price: '45k', description: '6 potong sayap ayam dengan saus pedas manis.', imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27176b682dc?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 304, name: 'Beef Rice Bowl', price: '55k', description: 'Nasi dengan irisan daging sapi teriyaki dan telur.', imageUrl: 'https://images.unsplash.com/photo-1599305451953-e59a05c5c024?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 305, name: 'Club Sandwich', price: '50k', description: 'Roti lapis klasik dengan isian lengkap dan kentang.', imageUrl: 'https://images.unsplash.com/photo-1592415486689-125c92150056?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 306, name: 'Caesar Salad', price: '48k', description: 'Salad segar dengan dressing caesar dan potongan ayam.', imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
      ]
    },
    {
      category: 'Desserts & Pastry',
      icon: <Croissant size={24} className="mr-3" />,
      items: [
        { id: 401, name: 'Basque Burnt Cheesecake', price: '40k', description: 'Slice cheesecake gosong yang lumer di tengah.', imageUrl: 'https://images.unsplash.com/photo-1604538515243-57a4149a4f6a?q=80&w=2564&auto=format&fit=crop', type: 'cafe' },
        { id: 402, name: 'Classic Butter Croissant', price: '25k', description: 'Pastry renyah dan buttery, sempurna untuk teman kopi.', imageUrl: 'https://images.unsplash.com/photo-1598813426832-a16b472141d1?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 403, name: 'Dark Choco Brownie', price: '35k', description: 'Brownie cokelat pekat dengan topping es krim vanila.', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 404, name: 'Pain Au Chocolat', price: '28k', description: 'Pastry klasik Perancis dengan isian cokelat lumer.', imageUrl: 'https://images.unsplash.com/photo-1606115989741-b84175389839?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 405, name: 'Red Velvet Slice', price: '38k', description: 'Kue red velvet lembut dengan lapisan cream cheese.', imageUrl: 'https://images.unsplash.com/photo-1616012001925-9a6a1a1b4e1b?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
        { id: 406, name: 'Oatmeal Cookies', price: '18k', description: 'Kue kering sehat dengan campuran oat dan kismis.', imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2574&auto=format&fit=crop', type: 'cafe' },
      ]
    }
  ],
  retailProducts: [
    {
      category: 'Biji Kopi & Merchandise',
      icon: <ShoppingCart size={24} className="mr-3" />,
      items: [
        { id: 1, name: 'Gayo Wine Beans (200g)', origin: 'Aceh Gayo, 1500 MASL', price: '125k', imageUrl: 'https://images.unsplash.com/photo-1627887720885-b6534a41724a?q=80&w=2512&auto=format&fit=crop', type: 'retail' },
        { id: 2, name: 'Kerinci Honey Beans (200g)', origin: 'Jambi, 1600 MASL', price: '135k', imageUrl: 'https://images.unsplash.com/photo-1628135246752-b8826432a51f?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 3, name: 'Kintamani Washed (200g)', origin: 'Bali, 1300 MASL', price: '115k', imageUrl: 'https://images.unsplash.com/photo-1627887720993-97d95a5f1711?q=80&w=2512&auto=format&fit=crop', type: 'retail' },
        { id: 4, name: 'Patina Signature Mug', origin: 'Keramik, 350ml', price: '85k', imageUrl: 'https://images.unsplash.com/photo-1600868297722-c3b62b60e6e6?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 5, name: 'Patina Roastery Totebag', origin: 'Kanvas Hitam', price: '75k', imageUrl: 'https://images.unsplash.com/photo-1579065272451-b837c73a213e?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 6, name: 'V60 Dripper Set', origin: 'Keramik, ukuran 02', price: '150k', imageUrl: 'https://images.unsplash.com/photo-1623932789189-a061d1574a4a?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 7, name: 'Paper Filter (100 pcs)', origin: 'Ukuran 02, unbleached', price: '50k', imageUrl: 'https://images.unsplash.com/photo-1630737951717-a6a246b33372?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 8, name: 'Patina T-Shirt', origin: 'Cotton Combed 30s', price: '120k', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 9, name: 'Digital Coffee Scale', origin: 'Akurasi 0.1g, dengan timer', price: '250k', imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
        { id: 10, name: 'Stainless Steel Tumbler', origin: '500ml, tahan panas 8 jam', price: '180k', imageUrl: 'https://images.unsplash.com/photo-1617886901963-0370d100421c?q=80&w=2574&auto=format&fit=crop', type: 'retail' },
      ]
    }
  ]
};
// ===============================================
// ## KOMPONEN KARTU PRODUK
// ===============================================
const ProductCard = ({ item }) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} ditambahkan ke keranjang!`); // ✅ panggil toast
  };

  return (
    <div className="bg-white/60 rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 group">
      <div className="h-60 overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display text-xl font-bold text-[#231f20] truncate">{item.name}</h3>
        <p className="text-sm text-[#231f20]/60 mt-1 flex-grow">{item.description || item.origin}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="font-display text-lg font-bold text-[#bb4430]">{item.price}</p>
            {item.weight && <p className="text-xs text-[#231f20]/50">{item.weight}</p>}
          </div>
          <button 
            onClick={handleAddToCart} // ✅ gunakan fungsi handleAddToCart
            className="bg-[#231f20] text-white p-3 rounded-full hover:bg-opacity-80 transition-colors"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// ## HALAMAN UTAMA KOLEKSI
// ===============================================
const KoleksiPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#efe6dd] min-h-screen">
      <header className="py-6 sticky top-0 bg-[#efe6dd]/80 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-[#231f20]/80 hover:text-[#bb4430] transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Kembali
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#231f20] hidden sm:block">Patina.</h1>
          <div className="w-24 text-right">
            {/* TODO: Tambahkan ikon keranjang */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <div className="text-center my-12" data-aos="fade-up">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#231f20]">Pesan Online</h1>
          <p className="mt-4 text-lg text-[#231f20]/80 max-w-2xl mx-auto">
            Pilih dari menu kafe untuk diambil atau diantar, serta koleksi biji kopi dan merchandise kami.
          </p>
        </div>

        {/* Render Menu Kafe */}
        {onlineMenu.cafeMenu.map((category) => (
          <div key={category.category} className="mb-16">
            <h2 className="font-display text-3xl font-bold text-[#231f20] mb-6 flex items-center" data-aos="fade-up" data-aos-delay="100">
              {category.icon} {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <div key={item.id} data-aos="fade-up" data-aos-delay={100 * (index + 2)}>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Render Produk Retail */}
        {onlineMenu.retailProducts.map((category) => (
          <div key={category.category} className="mb-16">
            <h2 className="font-display text-3xl font-bold text-[#231f20] mb-6 flex items-center" data-aos="fade-up" data-aos-delay="100">
              {category.icon} {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <div key={item.id} data-aos="fade-up" data-aos-delay={100 * (index + 2)}>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default KoleksiPage;
