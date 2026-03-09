import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Search,
  Filter,
  Star,
  LogIn
} from 'lucide-react';
import { PublicData, Fleet, Article, Review } from './types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- Components ---

const StickyInfo = ({ info }: { info?: string }) => (
  <div className="bg-orange-600 text-white py-2 px-4 text-center text-sm font-medium sticky top-0 z-50 overflow-hidden">
    <motion.p
      initial={{ x: '100%' }}
      animate={{ x: '-100%' }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      className="whitespace-nowrap inline-block"
    >
      {info || "Selamat Datang di Lawang Rizki Transport - Solusi Perjalanan Anda"}
    </motion.p>
  </div>
);

const Navbar = ({ onOpenSidebar, logo }: { onOpenSidebar: () => void, logo?: string }) => (
  <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-9 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="Logo" className="h-12 object-contain" />
          ) : (
            <>
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="font-bold text-xl tracking-tight text-gray-900">LAWANG RIZKI <span className="text-orange-600">TRANSPORT</span></span>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#home" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Home</a>
          <a href="/#armada" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Armada</a>
          <a href="/#layanan" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Layanan</a>
          <Link to="/artikel" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Artikel</Link>
          <a href="/#tentang" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Tentang</a>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-bold transition-colors">
            <LogIn size={18} />
            <span>Login</span>
          </Link>
          <a href="#booking" className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all">Pesan Sekarang</a>
        </div>
        <button onClick={onOpenSidebar} className="md:hidden p-2 text-gray-600">
          <Menu size={28} />
        </button>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-80 bg-white z-[70] p-8 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-bold text-xl">MENU</span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
          </div>
          <div className="flex flex-col space-y-6">
            <a href="/#home" onClick={onClose} className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Home</a>
            <a href="/#armada" onClick={onClose} className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Armada</a>
            <a href="/#layanan" onClick={onClose} className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Layanan</a>
            <Link to="/artikel" onClick={onClose} className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Artikel</Link>
            <a href="/#tentang" onClick={onClose} className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Tentang</a>
            <div className="h-px bg-gray-100 w-full my-2" />
            <Link to="/login" onClick={onClose} className="flex items-center gap-3 text-xl font-bold text-gray-600 hover:text-orange-600 transition-colors">
              <LogIn size={24} />
              <span>Admin Login</span>
            </Link>
            <a href="#booking" onClick={onClose} className="bg-orange-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-600/20">Pesan Sekarang</a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Hero = ({ banners }: { banners: any[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (banners.length === 0) return (
    <div className="h-[80vh] bg-zinc-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Lawang Rizki Transport</h1>
        <p className="text-xl text-gray-400">Solusi Perjalanan Nyaman & Aman</p>
      </div>
    </div>
  );

  return (
    <div className="relative h-[85vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src={banners[current].image_url} 
            alt={banners[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-2xl"
              >
                <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase">Premium Service</span>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                  {banners[current].title}
                </h1>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  {banners[current].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#booking" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all flex items-center gap-2">
                    Booking Sekarang <ArrowRight size={20} />
                  </a>
                  <a href="#armada" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                    Lihat Armada
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {banners.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-12 bg-orange-600' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const AboutSection = ({ about }: { about?: any }) => (
  <section id="tentang" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-3xl -z-10" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-600/10 rounded-3xl -z-10" />
          <img 
            src={about?.image_url || "https://picsum.photos/seed/lrt-about/800/1000"} 
            alt="About LRT" 
            className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 -right-8 bg-black text-white p-8 rounded-2xl shadow-xl hidden lg:block">
            <p className="text-4xl font-black text-orange-600 mb-1">10+</p>
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Tahun Pengalaman</p>
          </div>
        </div>
        <div>
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Tentang Kami</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            {about?.title || "Lawang Rizki Transport: Kenyamanan Anda Prioritas Kami"}
          </h2>
          <div className="prose prose-lg text-gray-600 mb-12">
            {about?.content || "Kami adalah penyedia layanan transportasi terpercaya yang berfokus pada kenyamanan, keamanan, dan kepuasan pelanggan. Dengan armada terbaru dan pengemudi profesional, kami siap menemani perjalanan Anda."}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Aman & Terpercaya</h4>
                <p className="text-sm text-gray-500">Asuransi & Maintenance Rutin</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Tepat Waktu</h4>
                <p className="text-sm text-gray-500">Layanan 24/7 Responsif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BookingForm = ({ fleet, whatsapp }: { fleet: Fleet[], whatsapp?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fleetId: '',
    date: '',
    duration: '',
    destination: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedFleet = fleet.find(f => f.id === parseInt(formData.fleetId));
    
    try {
      const res = await fetch('/api/public/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          fleetId: parseInt(formData.fleetId),
          fleetName: selectedFleet?.name || 'Pilihan',
          date: formData.date,
          duration: formData.duration,
          destination: formData.destination
        })
      });
      
      const { message } = await res.json();
      
      Swal.fire({
        title: 'Booking Berhasil!',
        text: 'Data Anda telah tersimpan. Lanjutkan konfirmasi ke WhatsApp?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ya, WhatsApp',
        cancelButtonText: 'Nanti Saja',
        confirmButtonColor: '#ea580c',
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`https://wa.me/${whatsapp || '6281234567890'}?text=${encodeURIComponent(message)}`, '_blank');
        }
      });
    } catch (err) {
      Swal.fire('Error', 'Gagal mengirim pesanan.', 'error');
    }
  };

  return (
    <section id="booking" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 skew-x-12 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Pesan Perjalanan Anda</h2>
          <p className="text-gray-400 text-lg">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-gray-900">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Nama Lengkap</label>
              <input 
                required
                type="text" 
                placeholder="Masukkan nama Anda"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Nomor WhatsApp</label>
              <input 
                required
                type="tel" 
                placeholder="Contoh: 08123456789"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Pilih Armada</label>
              <select 
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all appearance-none"
                value={formData.fleetId}
                onChange={e => setFormData({...formData, fleetId: e.target.value})}
              >
                <option value="">Pilih Jenis Kendaraan</option>
                {fleet.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.type})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Tanggal Keberangkatan</label>
              <input 
                required
                type="date" 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Durasi Sewa (Hari)</label>
              <input 
                required
                type="number" 
                placeholder="Contoh: 3"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Kota Tujuan</label>
              <input 
                required
                type="text" 
                placeholder="Contoh: Bandung, Yogyakarta"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-orange-600/30 hover:bg-orange-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Kirim ke WhatsApp <ArrowRight size={24} />
              </button>
              <p className="text-center text-gray-400 mt-4 text-sm font-medium italic">Note: Anda akan diarahkan langsung ke aplikasi WhatsApp.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const FleetSection = ({ fleet }: { fleet: Fleet[] }) => {
  return (
    <section id="armada" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Armada Kami</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Pilihan Kendaraan Terbaik Untuk Anda</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={item.id || `fleet-${index}`}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  {item.type}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">Mulai Dari</p>
                    <p className="text-xl font-black text-orange-600">{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 mb-8 text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><Users size={18} /> {item.capacity} Kursi</div>
                  <div className="flex items-center gap-2"><ShieldCheck size={18} /> Full AC</div>
                </div>
                <p className="text-gray-600 mb-8 line-clamp-2">{item.description}</p>
                <a href="#booking" className="block w-full text-center py-4 rounded-xl border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all">Pesan Sekarang</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArticleSection = ({ articles }: { articles: Article[] }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Semua' || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <section id="artikel" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Wawasan Perjalanan</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Artikel & Tips Terbaru</h2>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari artikel..."
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat, index) => (
              <button
                key={cat || `cat-${index}`}
                onClick={() => setCategory(cat)}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  category === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article, index) => (
            <Link to={`/artikel/${article.id}`} key={article.id || `article-${index}`} className="group cursor-pointer">
              <div className="relative h-72 rounded-3xl overflow-hidden mb-6">
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {article.category}
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <span>{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">{article.title}</h3>
                <p className="text-gray-600 line-clamp-2 leading-relaxed">{article.content}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/artikel" className="inline-flex items-center gap-2 bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-black/10">
            Lihat Semua Artikel <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ reviews }: { reviews: Review[] }) => (
  <section className="py-24 bg-zinc-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Testimoni</span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Apa Kata Mereka?</h2>
      </div>
      
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="pb-16"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review.id || `review-${index}`}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl h-full flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < review.rating ? 'fill-orange-600 text-orange-600' : 'text-gray-600'} />
                ))}
              </div>
              <p className="text-gray-300 italic mb-8 flex-1 leading-relaxed">"{review.review_text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {review.customer_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{review.customer_name}</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pelanggan Setia</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

const ClientSlider = ({ clients }: { clients: any[] }) => (
  <section className="py-16 bg-gray-50 border-y border-gray-100 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Dipercaya Oleh Perusahaan Ternama</p>
    </div>
    <div className="flex whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="flex gap-20 items-center px-10"
      >
        {[...clients, ...clients, ...clients].map((client, i) => (
          <img 
            key={i} 
            src={client.logo_url} 
            alt={client.name} 
            className="h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
            referrerPolicy="no-referrer"
          />
        ))}
      </motion.div>
    </div>
  </section>
);

const Footer = ({ settings }: { settings: any[] }) => {
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="font-bold text-xl tracking-tight">LAWANG RIZKI <span className="text-orange-600">TRANSPORT</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">Penyedia layanan transportasi premium dengan fokus pada kenyamanan dan keamanan perjalanan Anda di seluruh Indonesia.</p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8">Tautan Cepat</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="/#home" className="hover:text-orange-600 transition-colors">Home</a></li>
              <li><a href="/#armada" className="hover:text-orange-600 transition-colors">Armada</a></li>
              <li><a href="/#layanan" className="hover:text-orange-600 transition-colors">Layanan</a></li>
              <li><Link to="/artikel" className="hover:text-orange-600 transition-colors">Artikel</Link></li>
              <li><a href="/#tentang" className="hover:text-orange-600 transition-colors">Tentang Kami</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8">Layanan Kami</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Sewa Hiace', 'Sewa Bus Pariwisata', 'Sewa Mobil Mewah', 'Antar Jemput Bandara', 'Paket Wisata'].map(item => (
                <li key={item}><a href="#" className="hover:text-orange-600 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8">Kontak Kami</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-orange-600 shrink-0" size={20} />
                <span className="text-gray-400 text-sm leading-relaxed">{getSetting('footer_address')}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-orange-600 shrink-0" size={20} />
                <span className="text-gray-400 text-sm">{getSetting('footer_phone')}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-orange-600 shrink-0" size={20} />
                <span className="text-gray-400 text-sm">{getSetting('footer_email')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© 2024 Lawang Rizki Transport. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const [data, setData] = useState<PublicData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      const getSetting = (key: string) => data.settings.find(s => s.key === key)?.value;
      
      // SEO Implementation
      document.title = getSetting('site_title') || 'Lawang Rizki Transport';
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', getSetting('site_description') || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = getSetting('site_description') || '';
        document.head.appendChild(meta);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', getSetting('site_keywords') || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = getSetting('site_keywords') || '';
        document.head.appendChild(meta);
      }

      // Favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.setAttribute('href', getSetting('favicon_url') || '/favicon.ico');
      }

      // Google Analytics
      const gaId = getSetting('google_analytics_id');
      if (gaId && !window.location.hostname.includes('localhost')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(script2);
      }

      // Google Tag Manager
      const gtmId = getSetting('google_tag_manager_id');
      if (gtmId && !window.location.hostname.includes('localhost')) {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `;
        document.head.appendChild(script);
      }
    }
  }, [data]);

  if (!data) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
      />
    </div>
  );

  const getSetting = (key: string) => data.settings.find(s => s.key === key)?.value;

  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-600">
      <StickyInfo info={getSetting('sticky_info')} />
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} logo={getSetting('logo_main')} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main>
        <Hero banners={data.banners} />
        <AboutSection about={data.about} />
        <FleetSection fleet={data.fleet} />
        <BookingForm fleet={data.fleet} whatsapp={getSetting('whatsapp_number')} />
        <Testimonials reviews={data.reviews} />
        <ArticleSection articles={data.articles} />
        <ClientSlider clients={data.clients} />
      </main>

      <Footer settings={data.settings} />
    </div>
  );
}
