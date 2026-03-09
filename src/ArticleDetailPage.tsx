import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, MessageCircle, Send, ChevronRight, Clock } from 'lucide-react';
import { Article, Setting } from './types';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [latest, setLatest] = useState<Article[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/public/articles/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data.article);
        setLatest(data.latest);

        const resData = await fetch('/api/public/data');
        const dataPublic = await resData.json();
        setSettings(dataPublic.settings);

        // SEO Implementation
        if (data.article) {
          document.title = `${data.article.title} | Lawang Rizki Transport`;
          
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', data.article.description || data.article.content.substring(0, 160));
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = data.article.description || data.article.content.substring(0, 160);
            document.head.appendChild(meta);
          }
        }
      } catch (err) {
        console.error(err);
        navigate('/artikel');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  const shareUrl = window.location.href;
  const shareTitle = article?.title || '';

  const shareLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-[#1877F2]', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-[#25D366]', 
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}` 
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      color: 'bg-[#0088cc]', 
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` 
    }
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Article Header */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img 
          src={article.image_url} 
          alt={article.title} 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <Link to="/artikel" className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:text-orange-500 transition-colors">
                <ArrowLeft size={20} /> Kembali ke Artikel
              </Link>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold uppercase tracking-widest">
                  <Calendar size={16} /> {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold uppercase tracking-widest">
                  <User size={16} /> {article.author || 'Admin'}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                {article.content.split('\n').map((para, i) => (
                  <p key={i} className="mb-6">{para}</p>
                ))}
              </div>

              {/* Share Section */}
              <div className="mt-16 pt-12 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Bagikan Artikel</h4>
                      <p className="text-sm text-gray-500 font-medium">Bantu orang lain mendapatkan informasi ini.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {shareLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-black/5`}
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Latest Articles */}
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <Clock className="text-orange-600" size={24} /> Artikel Terbaru
              </h3>
              <div className="space-y-6">
                {latest.map((item) => (
                  <Link 
                    key={item.id} 
                    to={`/artikel/${item.id}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                      <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Sidebar */}
            <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <h3 className="text-2xl font-black mb-4 relative z-10">Butuh Transportasi?</h3>
              <p className="text-gray-400 mb-8 relative z-10">Sewa Hiace & Bus Pariwisata dengan harga terbaik dan layanan profesional.</p>
              <Link 
                to="/#booking" 
                className="bg-orange-600 text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all relative z-10"
              >
                Pesan Sekarang <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
