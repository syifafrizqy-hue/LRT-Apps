<div class="p-8 max-w-5xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tambah Artikel Baru</h1>
        <p class="text-gray-500">Buat konten edukasi atau berita untuk pengunjung</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action="<?= base_url('admin/article_add') ?>" method="POST" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Artikel</label>
                    <input type="text" name="title" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                    <input type="text" name="category" placeholder="Tips, Berita, Wisata" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL Gambar Sampul</label>
                <input type="url" name="image_url" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ringkasan Singkat (Description)</label>
                <textarea name="description" rows="2" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition"></textarea>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Konten Lengkap</label>
                <textarea name="content" rows="10" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition"></textarea>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg">Terbitkan Artikel</button>
                <a href="<?= base_url('admin/articles') ?>" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">Batal</a>
            </div>
        </form>
    </div>
</div>
