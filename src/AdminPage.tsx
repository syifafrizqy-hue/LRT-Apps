import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Car, 
  FileText, 
  Users, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Info,
  MessageSquare,
  Star,
  Menu,
  Shield,
  UserPlus,
  Globe,
  Code,
  BarChart,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Calendar as CalendarIcon
} from 'lucide-react';
import Swal from 'sweetalert2';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Banner, Fleet, Article, Client, About, Setting, Review, User, Booking, DashboardStats } from './types';

const AdminLayout = ({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<Setting[]>([]);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setSiteSettings(data);
        } else {
          setSiteSettings([]);
        }
      })
      .catch(() => setSiteSettings([]));
  }, []);

  const getSetting = (key: string) => siteSettings.find(s => s.key === key)?.value;

  const menuGroups = [
    {
      title: 'Utama',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, note: 'Ringkasan performa dan statistik sistem.' },
      ]
    },
    {
      title: 'Transaksi',
      items: [
        { id: 'bookings', label: 'Booking Pesanan', icon: ShoppingCart, note: 'Kelola pesanan sewa kendaraan dari pelanggan.' },
      ]
    },
    {
      title: 'Master Data',
      items: [
        { id: 'fleet', label: 'Armada', icon: Car, note: 'Daftar kendaraan, harga, dan kapasitas.' },
        { id: 'clients', label: 'Clients', icon: Users, note: 'Logo partner yang tampil di slider.' },
      ]
    },
    {
      title: 'Konten',
      items: [
        { id: 'banners', label: 'Banners', icon: ImageIcon, note: 'Manajemen slider hero di halaman utama.' },
        { id: 'articles', label: 'Artikel', icon: FileText, note: 'Blog dan tips perjalanan.' },
        { id: 'reviews', label: 'Reviews', icon: MessageSquare, note: 'Testimoni pelanggan yang tampil di homepage.' },
        { id: 'about', label: 'Tentang', icon: Info, note: 'Informasi profil perusahaan.' },
      ]
    },
    {
      title: 'Pengaturan',
      items: [
        { id: 'settings', label: 'Konfigurasi Situs', icon: SettingsIcon, note: 'WA, Footer, Logo, Favicon, SEO, GA/GTM.' },
        { id: 'users', label: 'Manajemen User', icon: Shield, note: 'Kelola administrator dan hak akses.' },
      ]
    }
  ];

  const allItems = menuGroups.flatMap(g => g.items);
  const activeItem = allItems.find(i => i.id === activeTab);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/20">
          {getSetting('logo_admin') ? (
            <img src={getSetting('logo_admin')} alt="Logo" className="w-full h-full object-contain p-1" />
          ) : 'L'}
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none">LRT <span className="text-orange-600">ADMIN</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    activeTab === item.id 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                  <span className="font-bold text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm"
        >
          <LogOut size={18} />
          <span>Keluar Sistem</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shadow-2xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 z-[70] transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900 capitalize">{activeItem?.label}</h2>
              <div className="hidden sm:flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                <span>Admin</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{activeItem?.label}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-black text-gray-900">Administrator</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Super Admin</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
              <Users size={20} />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Kelola {activeItem?.label}</h3>
                <p className="text-gray-500 mt-1 font-medium text-sm max-w-xl">
                  {activeItem?.note}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-200 overflow-hidden">
              {activeTab === 'dashboard' && <DashboardModule />}
              {activeTab === 'bookings' && <BookingsModule />}
              {activeTab === 'banners' && <BannersModule />}
              {activeTab === 'fleet' && <FleetModule />}
              {activeTab === 'articles' && <ArticlesModule />}
              {activeTab === 'reviews' && <ReviewsModule />}
              {activeTab === 'clients' && <ClientsModule />}
              {activeTab === 'about' && <AboutModule />}
              {activeTab === 'settings' && <SettingsModule />}
              {activeTab === 'users' && <UsersModule />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const ImagePreview = ({ url, label }: { url: string, label: string }) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center relative group">
        {url ? (
          <>
            <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold">Preview Gambar</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <ImageIcon size={40} />
            <span className="text-xs font-bold">Belum ada gambar</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Modules ---

const DashboardModule = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) return <div className="p-20 flex justify-center"><div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" /></div>;

  const COLORS = ['#ea580c', '#10b981', '#ef4444', '#3b82f6'];

  return (
    <div className="p-8 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Booking', value: stats.total_bookings.count, icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
          { label: 'Booking Pending', value: stats.pending_bookings.count, icon: Clock, color: 'bg-orange-50 text-orange-600' },
          { label: 'Total Armada', value: stats.total_fleet.count, icon: Car, color: 'bg-green-50 text-green-600' },
          { label: 'Total Artikel', value: stats.total_articles.count, icon: FileText, color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-gray-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart 1: Bookings Over Time */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-orange-600" size={20} /> Tren Booking (7 Hari Terakhir)
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.bookings_over_time}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  itemStyle={{fontWeight: 700, color: '#ea580c'}}
                />
                <Area type="monotone" dataKey="count" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Status Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-black text-gray-900 mb-8">Status Pesanan</h4>
          <div className="h-[300px] w-full flex items-center justify-center">
            {stats.bookings_by_status.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.bookings_by_status}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.bookings_by_status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="text-gray-300" size={32} />
                </div>
                <p className="text-sm font-bold text-gray-400">Belum ada data pesanan</p>
              </div>
            )}
          </div>
          {stats.bookings_by_status.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {stats.bookings_by_status.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-gray-500">{entry.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-lg font-black text-gray-900">Booking Terbaru</h4>
          <button className="text-orange-600 font-bold text-sm hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="pb-4 px-4">Pelanggan</th>
                <th className="pb-4 px-4">Armada</th>
                <th className="pb-4 px-4">Tanggal</th>
                <th className="pb-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recent_bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900">{booking.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{booking.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-600">{booking.fleet_name}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-600">{new Date(booking.date).toLocaleDateString('id-ID')}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BookingsModule = () => {
  const [items, setItems] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Booking | null>(null);

  const fetchItems = () => fetch('/api/admin/bookings').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchItems();
    Swal.fire({ title: 'Status Diperbarui!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleOpenModal = (item: Booking) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus Pesanan?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Daftar Booking Pesanan</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest font-black">
              <th className="pb-4 px-4">Pelanggan</th>
              <th className="pb-4 px-4">Detail Sewa</th>
              <th className="pb-4 px-4">Tujuan</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-6 px-4">
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-400 font-bold mt-1">{item.phone}</div>
                </td>
                <td className="py-6 px-4">
                  <div className="text-sm font-bold text-gray-700">{item.fleet_name}</div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase mt-1">
                    <CalendarIcon size={12} /> {new Date(item.date).toLocaleDateString('id-ID')}
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    {item.duration} Hari
                  </div>
                </td>
                <td className="py-6 px-4 text-sm font-bold text-gray-600">{item.destination}</td>
                <td className="py-6 px-4">
                  <select 
                    value={item.status}
                    onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none border-none cursor-pointer ${
                      item.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      item.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' :
                      item.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-6 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Pesanan">
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Pelanggan</label>
                  <p className="font-bold text-gray-900">{selectedItem.name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor WhatsApp</label>
                  <p className="font-bold text-gray-900">{selectedItem.phone}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                  <p className="font-bold text-gray-900">{selectedItem.email || '-'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Armada Dipesan</label>
                  <p className="font-bold text-orange-600">{selectedItem.fleet_name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal Sewa</label>
                  <p className="font-bold text-gray-900">{new Date(selectedItem.date).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Saat Ini</label>
                  <div className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      selectedItem.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      selectedItem.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' :
                      selectedItem.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catatan Tambahan</label>
              <p className="text-gray-600 mt-1 bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedItem.notes || 'Tidak ada catatan.'}</p>
            </div>
            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => handleStatusUpdate(selectedItem.id, 'Confirmed')}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all"
              >
                Konfirmasi Pesanan
              </button>
              <button 
                onClick={() => handleStatusUpdate(selectedItem.id, 'Completed')}
                className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all"
              >
                Selesaikan Pesanan
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const BannersModule = () => {
  const [items, setItems] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    image_url: '',
    sort_order: 0
  });

  const fetchItems = () => fetch('/api/admin/banners').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: Banner) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ title: '', subtitle: '', image_url: '', sort_order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/banners/${editingItem.id}` : '/api/admin/banners';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'Banner Diperbarui!' : 'Banner Ditambahkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Daftar Banner</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Plus size={20} /> Tambah Banner
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-2xl overflow-hidden group relative">
            <div className="h-48 relative">
              <img src={item.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={() => handleOpenModal(item)} className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"><Edit size={20} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Banner' : 'Tambah Banner Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Banner</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subjudul</label>
            <input 
              type="text" 
              value={formData.subtitle}
              onChange={e => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Gambar</label>
            <input 
              type="text" 
              required
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <ImagePreview url={formData.image_url || ''} label="Preview Banner" />
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              {editingItem ? 'Simpan Perubahan' : 'Tambah Banner'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const FleetModule = () => {
  const [items, setItems] = useState<Fleet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Fleet | null>(null);
  const [formData, setFormData] = useState<Partial<Fleet>>({
    name: '',
    type: 'Hiace',
    price: '',
    price_numeric: 0,
    capacity: 0,
    description: '',
    image_url: ''
  });

  const fetchItems = () => fetch('/api/admin/fleet').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: Fleet) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        type: 'Hiace',
        price: '',
        price_numeric: 0,
        capacity: 0,
        description: '',
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/fleet/${editingItem.id}` : '/api/admin/fleet';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'Armada Diperbarui!' : 'Armada Ditambahkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus Armada?', text: 'Data yang dihapus tidak bisa dikembalikan!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/fleet/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Manajemen Armada</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Plus size={20} /> Tambah Armada
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest font-black">
              <th className="pb-4 px-4">Armada</th>
              <th className="pb-4 px-4">Tipe</th>
              <th className="pb-4 px-4">Kapasitas</th>
              <th className="pb-4 px-4">Harga</th>
              <th className="pb-4 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-gray-100">
                      <img src={item.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-bold text-gray-900">{item.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest">{item.type}</span>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-gray-600">{item.capacity} Kursi</td>
                <td className="py-4 px-4 font-black text-orange-600">{item.price}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Armada' : 'Tambah Armada Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Armada</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
                placeholder="Contoh: Toyota Hiace Premio"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipe Kendaraan</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              >
                <option value="Mobil">Mobil</option>
                <option value="Hiace">Hiace</option>
                <option value="Mini Bus">Mini Bus</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Tampilan</label>
              <input 
                type="text" 
                required
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
                placeholder="Rp 1.500.000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kapasitas (Kursi)</label>
              <input 
                type="number" 
                required
                value={formData.capacity}
                onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Gambar</label>
            <input 
              type="text" 
              required
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              placeholder="https://..."
            />
          </div>

          <ImagePreview url={formData.image_url || ''} label="Preview Gambar Armada" />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
              placeholder="Tuliskan fasilitas dan detail armada..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all"
            >
              {editingItem ? 'Simpan Perubahan' : 'Tambah Armada'}
            </button>
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const ArticlesModule = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: '',
    author: 'Admin',
    image_url: '',
    description: '',
    content: ''
  });

  const fetchItems = () => fetch('/api/admin/articles').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: Article) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ title: '', category: '', author: 'Admin', image_url: '', description: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/articles/${editingItem.id}` : '/api/admin/articles';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'Artikel Diperbarui!' : 'Artikel Diterbitkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus Artikel?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Daftar Artikel</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Plus size={20} /> Tulis Artikel
        </button>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-6 p-4 border border-gray-100 rounded-2xl hover:border-orange-200 transition-all group">
            <img src={item.image_url} className="w-32 h-24 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Artikel' : 'Tulis Artikel Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Artikel</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</label>
              <input 
                type="text" 
                required
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
                placeholder="Tips, Destinasi, Wisata"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Gambar</label>
            <input 
              type="text" 
              required
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <ImagePreview url={formData.image_url || ''} label="Preview Gambar Sampul" />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Deskripsi (SEO)</label>
            <textarea 
              rows={2}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Konten Artikel</label>
            <textarea 
              rows={8}
              required
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              {editingItem ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const ReviewsModule = () => {
  const [items, setItems] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({
    customer_name: '',
    rating: 5,
    review_text: '',
    is_approved: 1
  });

  const fetchItems = () => fetch('/api/admin/reviews').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: Review) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ customer_name: '', rating: 5, review_text: '', is_approved: 1 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/reviews/${editingItem.id}` : '/api/admin/reviews';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'Review Diperbarui!' : 'Review Ditambahkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const toggleApproval = async (item: Review) => {
    await fetch(`/api/admin/reviews/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: item.is_approved === 1 ? 0 : 1 })
    });
    fetchItems();
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus Review?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Testimoni Pelanggan</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Plus size={20} /> Tambah Review
        </button>
      </div>
      <div className="grid gap-6">
        {items.map(item => (
          <div key={item.id} className="p-6 border border-gray-100 rounded-2xl flex justify-between items-start group">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h4 className="font-bold text-lg">{item.customer_name}</h4>
                <div className="flex text-orange-600">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} className="fill-orange-600" />)}
                </div>
              </div>
              <p className="text-gray-600 italic">"{item.review_text}"</p>
              <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">{new Date(item.date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleApproval(item)}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  item.is_approved === 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {item.is_approved === 1 ? 'Approved' : 'Pending'}
              </button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Review' : 'Tambah Review Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Pelanggan</label>
              <input 
                type="text" 
                required
                value={formData.customer_name}
                onChange={e => setFormData({...formData, customer_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating (1-5)</label>
              <input 
                type="number" 
                min="1" 
                max="5"
                required
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Isi Review</label>
            <textarea 
              rows={4}
              required
              value={formData.review_text}
              onChange={e => setFormData({...formData, review_text: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              {editingItem ? 'Simpan Perubahan' : 'Tambah Review'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const ClientsModule = () => {
  const [items, setItems] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({ name: '', logo_url: '' });

  const fetchItems = () => fetch('/api/admin/clients').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: Client) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', logo_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/clients/${editingItem.id}` : '/api/admin/clients';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'Partner Diperbarui!' : 'Partner Ditambahkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus Partner?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Partner & Client</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Plus size={20} /> Tambah Partner
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {items.map(item => (
          <div key={item.id} className="relative group border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-orange-200 transition-all">
            <img src={item.logo_url} className="h-10 grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
            <span className="text-xs font-bold text-gray-400 text-center">{item.name}</span>
            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(item)} className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg"><Edit size={12} /></button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-1.5 rounded-full shadow-lg"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Partner' : 'Tambah Partner Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Partner</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Logo</label>
            <input 
              type="text" 
              required
              value={formData.logo_url}
              onChange={e => setFormData({...formData, logo_url: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <ImagePreview url={formData.logo_url || ''} label="Preview Logo" />
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              {editingItem ? 'Simpan Perubahan' : 'Tambah Partner'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const AboutModule = () => {
  const [data, setData] = useState<About | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<About>>({
    title: '',
    content: '',
    image_url: '',
    vision: '',
    mission: ''
  });

  const fetchData = () => {
    fetch('/api/admin/about').then(res => res.json()).then(res => {
      const item = res[0];
      if (item) {
        setData(item);
        setFormData({ title: item.title, content: item.content, image_url: item.image_url, vision: item.vision, mission: item.mission });
      }
    });
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = () => {
    if (data) {
      setFormData({ title: data.title, content: data.content, image_url: data.image_url, vision: data.vision, mission: data.mission });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = data ? 'PUT' : 'POST';
    const url = data ? `/api/admin/about/${data.id}` : '/api/admin/about';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    Swal.fire({ title: 'Berhasil!', text: 'Informasi Tentang Kami telah diperbarui.', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
    setIsModalOpen(false);
    fetchData();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Profil Perusahaan</h3>
        <button onClick={handleOpenModal} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <Edit size={20} /> Edit Profil
        </button>
      </div>
      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Judul Utama</h4>
              <p className="text-2xl font-black text-gray-900">{data.title}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Deskripsi</h4>
              <p className="text-gray-600 leading-relaxed">{data.content}</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visi</h4>
                <p className="text-gray-600 text-sm italic">"{data.vision || '-'}"</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Misi</h4>
                <p className="text-gray-600 text-sm italic">"{data.mission || '-'}"</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Gambar Profil</h4>
            <img src={data.image_url} className="w-full h-80 object-cover rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Belum ada data profil perusahaan.</p>
          <button onClick={handleOpenModal} className="mt-4 text-orange-600 font-black uppercase tracking-widest text-xs">Buat Sekarang</button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profil Perusahaan">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Utama</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Gambar Profil</label>
            <input 
              type="text" 
              required
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
            />
          </div>
          <ImagePreview url={formData.image_url || ''} label="Preview Gambar" />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Konten Deskripsi</label>
            <textarea 
              rows={6}
              required
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visi</label>
              <textarea 
                rows={3}
                value={formData.vision}
                onChange={e => setFormData({...formData, vision: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Misi</label>
              <textarea 
                rows={3}
                value={formData.mission}
                onChange={e => setFormData({...formData, mission: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              Simpan Perubahan
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const UsersModule = () => {
  const [items, setItems] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    full_name: '',
    role: 'admin',
    password: ''
  });

  const fetchItems = () => fetch('/api/admin/users').then(res => res.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const handleOpenModal = (item?: User) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item, password: '' });
    } else {
      setEditingItem(null);
      setFormData({ username: '', full_name: '', role: 'admin', password: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/users/${editingItem.id}` : '/api/admin/users';
    
    const payload = { ...formData };
    if (editingItem && !payload.password) delete payload.password;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    setIsModalOpen(false);
    fetchItems();
    Swal.fire({ title: editingItem ? 'User Diperbarui!' : 'User Ditambahkan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const handleDelete = (id: number) => {
    Swal.fire({ title: 'Hapus User?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' }).then(async (r) => {
      if (r.isConfirmed) { await fetch(`/api/admin/users/${id}`, { method: 'DELETE' }); fetchItems(); }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Manajemen User</h3>
        <button onClick={() => handleOpenModal()} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          <UserPlus size={20} /> Tambah User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest font-black">
              <th className="pb-4 px-4">Username</th>
              <th className="pb-4 px-4">Role</th>
              <th className="pb-4 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-4 font-bold text-gray-900">{item.username}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.role === 'superadmin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit User' : 'Tambah User Baru'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</label>
            <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm">
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password {editingItem && '(Kosongkan jika tidak ingin ganti)'}</label>
            <input type="password" required={!editingItem} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              {editingItem ? 'Simpan Perubahan' : 'Tambah User'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const SettingsModule = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [activeGroup, setActiveGroup] = useState('umum');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Setting | null>(null);
  const [editValue, setEditValue] = useState('');

  const fetchSettings = () => fetch('/api/admin/settings').then(res => res.json()).then(setSettings);
  useEffect(() => { fetchSettings(); }, []);

  const handleOpenEdit = (item: Setting) => {
    setEditingItem(item);
    setEditValue(item.value);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    await fetch(`/api/admin/settings/${editingItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: editValue })
    });
    
    setIsModalOpen(false);
    fetchSettings();
    Swal.fire({ title: 'Tersimpan!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  const groups = [
    { id: 'umum', label: 'Umum', icon: SettingsIcon },
    { id: 'logo', label: 'Logo & Favicon', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'analytics', label: 'Analytics & GTM', icon: BarChart },
  ];

  const settingGroups: Record<string, string[]> = {
    umum: ['sticky_info', 'whatsapp_number', 'footer_address', 'footer_email', 'footer_phone'],
    logo: ['favicon_url', 'logo_main', 'logo_login', 'logo_admin'],
    seo: ['site_title', 'site_description', 'site_keywords'],
    analytics: ['google_analytics_id', 'google_tag_manager_id']
  };

  return (
    <div className="p-0 flex flex-col md:flex-row min-h-[600px]">
      <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-6 space-y-2">
        {groups.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeGroup === g.id ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-200/50'
            }`}
          >
            <g.icon size={18} />
            {g.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-8">
        <div className="grid gap-8">
          {settings.filter(s => settingGroups[activeGroup].includes(s.key)).map(s => (
            <div key={s.id} className="group p-6 border border-gray-100 rounded-2xl hover:border-orange-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.key.replace(/_/g, ' ')}</label>
                <button onClick={() => handleOpenEdit(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-1 font-bold text-gray-700 truncate">
                  {s.value || <span className="text-gray-300 italic font-normal">Belum diatur</span>}
                </div>
                {(s.key.includes('_url') || s.key.includes('logo_')) && s.value && (
                  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                    <img src={s.value} alt="Preview" className="h-8 object-contain" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Edit ${editingItem?.key.replace(/_/g, ' ')}`}>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nilai Pengaturan</label>
            {editingItem?.key.includes('description') || editingItem?.key.includes('keywords') || editingItem?.key.includes('address') ? (
              <textarea 
                rows={4}
                required
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm resize-none"
              />
            ) : (
              <input 
                type="text" 
                required
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-600 outline-none transition-all font-bold text-sm"
              />
            )}
          </div>
          
          {(editingItem?.key.includes('_url') || editingItem?.key.includes('logo_')) && (
            <ImagePreview url={editValue} label="Preview Gambar/Logo" />
          )}

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all">
              Simpan Perubahan
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Login Page ---

const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        const d = data as any;
        if (d && Array.isArray(d.settings)) {
          const l = d.settings.find((s: any) => s.key === 'logo_login')?.value;
          if (l) setLogo(l);
        }
      })
      .catch(err => console.error("Failed to fetch public data:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.user);
      } else {
        Swal.fire('Error', data.error || 'Username atau Password salah!', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Terjadi kesalahan koneksi ke server.', 'error');
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Lupa Password?',
      text: 'Masukkan email Anda untuk menerima instruksi reset password.',
      input: 'email',
      inputPlaceholder: 'nama@email.com',
      showCancelButton: true,
      confirmButtonText: 'Kirim Instruksi',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ea580c',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Email Terkirim',
          text: `Instruksi reset password telah dikirim ke ${result.value}`,
          confirmButtonColor: '#ea580c',
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-xl shadow-orange-600/20 overflow-hidden">
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : 'L'}
          </div>
          <h1 className="text-3xl font-black text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2 font-medium">Lawang Rizki Transport System</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Username</label>
            <input 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-600 outline-none transition-all"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <button type="button" onClick={handleForgotPassword} className="text-[10px] font-bold text-orange-600 uppercase tracking-wider hover:underline">Lupa Password?</button>
            </div>
            <input 
              required
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-600 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-orange-600 text-white py-5 rounded-xl font-black text-xl shadow-xl shadow-orange-600/30 hover:bg-orange-700 hover:-translate-y-1 transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(data.user);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  if (loading) return null;

  if (!user) return <LoginPage onLogin={setUser} />;

  return <AdminLayout onLogout={handleLogout} children={null} />;
}
