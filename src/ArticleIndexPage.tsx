import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article, Setting } from './types';

export default function ArticleIndexPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);

  const fetchArticles = async (pageNum: number, isLoadMore: boolean = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const res = await fetch(`/api/public/articles?page=${pageNum}&limit=6&search=${search}&category=${category}`);
      const data = await res.json();
      
      if (isLoadMore) {
        setArticles(prev => [...prev, ...data.items]);
      } else {
        setArticles(data.items);
      }
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetch('/api/public/data').then(res => res.json()).then(data => {
      setSettings(data.settings);
      // Extract unique categories from all articles if possible, but we'll just use a fixed list or fetch them
      // For now, let's assume we can get them from the first fetch or a separate endpoint
    });
  }, []);

  useEffect(() => {
    setPage(1);
    fetchArticles(1);
  }, [search, category]);

  // Update categories list when articles change (only on first load or search change)
  useEffect(() => {
    if (articles.length > 0 && categories.length === 1) {
      const cats = ['Semua', ...Array.from(new Set(articles.map(a => a.category)))];
      setCategories(cats);
    }
  }, [articles]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage, true);
  };

  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/10 skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:text-orange-500 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Artikel & Berita</h1>
          <p className="text-xl text-gray-400 max-w-2xl">Temukan tips perjalanan, destinasi favorit, dan berita terbaru dari Lawang Rizki Transport.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
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
        </div>

        {/* Articles Grid */}
        {loading && page === 1 ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article, index) => (
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index % 6 * 0.1 }}
                  key={article.id} 
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col h-full"
                >
                  <Link to={`/artikel/${article.id}`} className="relative h-64 overflow-hidden block">
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </div>
                  </Link>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      <div className="flex items-center gap-1.5"><User size={14} /> {article.author || 'Admin'}</div>
                    </div>
                    <Link to={`/artikel/${article.id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-8 flex-1">
                      {article.content}
                    </p>
                    <Link 
                      to={`/artikel/${article.id}`} 
                      className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all"
                    >
                      Baca Selengkapnya <ChevronRight size={18} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            {articles.length < total && (
              <div className="mt-16 text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-black/10 flex items-center gap-3 mx-auto disabled:opacity-50"
                >
                  {loadingMore ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : 'Muat Lebih Banyak'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Tidak ada artikel yang ditemukan.</p>
            <button onClick={() => { setSearch(''); setCategory('Semua'); }} className="mt-4 text-orange-600 font-bold">Reset Filter</button>
          </div>
        )}
      </div>
    </div>
  );
}
