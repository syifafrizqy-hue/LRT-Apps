<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - LRT Bus</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p class="text-gray-500 mt-2">Silakan masuk untuk mengelola sistem</p>
        </div>

        <?php if($this->session->flashdata('error')): ?>
            <div class="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                <?= $this->session->flashdata('error') ?>
            </div>
        <?php endif; ?>

        <form action="<?= base_url('auth/do_login') ?>" method="POST" class="space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input type="text" name="username" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input type="password" name="password" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
            </div>
            <button type="submit" class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg">Masuk Ke Dashboard</button>
        </form>
        
        <div class="mt-8 text-center">
            <a href="<?= base_url() ?>" class="text-emerald-600 hover:underline text-sm font-medium">&larr; Kembali ke Beranda</a>
        </div>
    </div>
</body>
</html>
