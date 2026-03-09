<div class="p-8">
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Kelola Banners</h1>
            <p class="text-gray-500">Daftar gambar slider halaman utama</p>
        </div>
        <a href="<?= base_url('admin/banner_add') ?>" class="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">Tambah Banner</a>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left">
            <thead>
                <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <th class="px-8 py-4 font-semibold">Preview</th>
                    <th class="px-8 py-4 font-semibold">Judul</th>
                    <th class="px-8 py-4 font-semibold text-right">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                <?php foreach($banners as $b): ?>
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-8 py-4">
                        <img src="<?= $b->image_url ?>" class="w-32 h-16 object-cover rounded-lg" alt="<?= $b->title ?>">
                    </td>
                    <td class="px-8 py-4 font-bold text-gray-900"><?= $b->title ?></td>
                    <td class="px-8 py-4 text-right">
                        <a href="<?= base_url('admin/banner_delete/'.$b->id) ?>" class="text-red-600 font-semibold" onclick="return confirm('Hapus banner ini?')">Hapus</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
