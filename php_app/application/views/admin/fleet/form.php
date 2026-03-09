<div class="p-8 max-w-4xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900"><?= isset($fleet) ? 'Edit' : 'Tambah' ?> Armada</h1>
        <p class="text-gray-500">Lengkapi informasi detail armada kendaraan</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action="<?= current_url() ?>" method="POST" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Armada</label>
                    <input type="text" name="name" value="<?= isset($fleet) ? $fleet->name : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe (Contoh: Big Bus, Medium Bus)</label>
                    <input type="text" name="type" value="<?= isset($fleet) ? $fleet->type : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Harga Display (Teks)</label>
                    <input type="text" name="price" value="<?= isset($fleet) ? $fleet->price : '' ?>" placeholder="Mulai Rp 2.5jt" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Harga Numerik (Angka)</label>
                    <input type="number" name="price_numeric" value="<?= isset($fleet) ? $fleet->price_numeric : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Kapasitas (Kursi)</label>
                    <input type="number" name="capacity" value="<?= isset($fleet) ? $fleet->capacity : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                <input type="url" name="image_url" value="<?= isset($fleet) ? $fleet->image_url : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                <textarea name="description" rows="4" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"><?= isset($fleet) ? $fleet->description : '' ?></textarea>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg">Simpan Data</button>
                <a href="<?= base_url('admin/fleet') ?>" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">Batal</a>
            </div>
        </form>
    </div>
</div>
