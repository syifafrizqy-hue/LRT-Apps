import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft, Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(data => setSettings(data.settings || []));
  }, []);

  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang kembali, Admin!',
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/admin');
      } else {
        throw new Error(data.message || 'Login gagal');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message
      });
    } finally {
      setIsLoading(false);
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
      inputValidator: (value) => {
        if (!value) {
          return 'Email tidak boleh kosong!';
        }
        return null;
      }
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

  const loginLogo = getSetting('logo_login');

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Beranda</span>
        </Link>

        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
          <div className="text-center mb-10">
            {loginLogo ? (
              <img src={loginLogo} alt="Logo" className="h-20 mx-auto mb-6 object-contain" />
            ) : (
              <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-orange-600/30">
                <Shield size={32} />
              </div>
            )}
            <h1 className="text-3xl font-black text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">Silakan masuk untuk mengelola Lawang Rizki Transport</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  required
                  type="text"
                  placeholder="Masukkan username"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all placeholder:text-gray-600"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-orange-600 hover:text-orange-500 transition-colors uppercase tracking-wider"
                >
                  Lupa Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all placeholder:text-gray-600"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={22} />
                  <span>Masuk Sekarang</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Lawang Rizki Transport. <br/>
              Akses terbatas hanya untuk administrator.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
