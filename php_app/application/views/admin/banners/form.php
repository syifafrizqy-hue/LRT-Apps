<div class="p-8 max-w-2xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tambah Banner Baru</h1>
        <p class="text-gray-500">Banner akan muncul di slider halaman utama</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action="<?= base_url('admin/banner_add') ?>" method="POST" class="space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Banner</label>
                <input type="text" name="title" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL Gambar Banner (Rekomendasi 1920x1080)</label>
                <input type="url" name="image_url" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Link Tujuan (Opsional)</label>
                <input type="url" name="link_url" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg">Simpan Banner</button>
                <a href="<?= base_url('admin/banners') ?>" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">Batal</a>
            </div>
        </form>
    </div>
</div>
