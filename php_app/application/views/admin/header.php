<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - LRT Bus</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-72 bg-[#0a0a0a] text-gray-400 flex flex-col">
        <div class="p-8 border-b border-white/5">
            <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">L</div>
                <div>
                    <p class="text-white font-bold leading-none">LRT <span class="text-orange-600">ADMIN</span></p>
                    <p class="text-[10px] uppercase tracking-widest mt-1 opacity-50">Management System</p>
                </div>
            </div>
        </div>
        <nav class="flex-1 p-6 space-y-8 overflow-y-auto">
            <!-- UTAMA -->
            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-30">Utama</p>
                <a href="<?= base_url('admin/dashboard') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-orange-600 text-white transition font-medium">
                    <span class="w-5 h-5">📊</span>
                    <span>Dashboard</span>
                </a>
            </div>

            <!-- TRANSAKSI -->
            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-30">Transaksi</p>
                <a href="<?= base_url('admin/bookings') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                    <span class="w-5 h-5">🛒</span>
                    <span>Booking Pesanan</span>
                </a>
            </div>

            <!-- MASTER DATA -->
            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-30">Master Data</p>
                <div class="space-y-1">
                    <a href="<?= base_url('admin/fleet') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">🚐</span>
                        <span>Armada</span>
                    </a>
                    <a href="<?= base_url('admin/clients') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">👥</span>
                        <span>Clients</span>
                    </a>
                </div>
            </div>

            <!-- KONTEN -->
            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-30">Konten</p>
                <div class="space-y-1">
                    <a href="<?= base_url('admin/banners') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">🖼️</span>
                        <span>Banners</span>
                    </a>
                    <a href="<?= base_url('admin/articles') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">📄</span>
                        <span>Artikel</span>
                    </a>
                    <a href="<?= base_url('admin/reviews') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">💬</span>
                        <span>Reviews</span>
                    </a>
                    <a href="<?= base_url('admin/config') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">ℹ️</span>
                        <span>Tentang</span>
                    </a>
                </div>
            </div>

            <!-- PENGATURAN -->
            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-30">Pengaturan</p>
                <div class="space-y-1">
                    <a href="<?= base_url('admin/config') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">⚙️</span>
                        <span>Konfigurasi Situs</span>
                    </a>
                    <a href="<?= base_url('admin/users') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition font-medium">
                        <span class="w-5 h-5">🛡️</span>
                        <span>Manajemen User</span>
                    </a>
                </div>
            </div>
        </nav>
        <div class="p-6 border-t border-white/5">
            <a href="<?= base_url('auth/logout') ?>" class="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition font-medium">
                <span class="w-5 h-5">🚪</span>
                <span>Keluar Sistem</span>
            </a>
        </div>
    </aside>
    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
