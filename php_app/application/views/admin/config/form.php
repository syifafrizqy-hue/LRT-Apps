<div class="p-8">
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Konfigurasi Situs</h1>
            <p class="text-gray-500">Atur informasi dasar website dan halaman Tentang</p>
        </div>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form action="<?= current_url() ?>" method="POST" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Situs</label>
                    <input type="text" name="site_name" value="<?= isset($config) ? $config->site_name : '' ?>" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value="<?= isset($config) ? $config->email : '' ?>" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Telepon</label>
                    <input type="text" name="phone" value="<?= isset($config) ? $config->phone : '' ?>" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
                    <input type="text" name="whatsapp" value="<?= isset($config) ? $config->whatsapp : '' ?>" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
                    <input type="text" name="instagram" value="<?= isset($config) ? $config->instagram : '' ?>" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Kantor</label>
                <textarea name="address" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition"><?= isset($config) ? $config->address : '' ?></textarea>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tentang Kami (About Us)</label>
                <textarea name="about_text" rows="6" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition"><?= isset($config) ? $config->about_text : '' ?></textarea>
            </div>

            <button type="submit" class="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg">Simpan Konfigurasi</button>
        </form>
    </div>
</div>
