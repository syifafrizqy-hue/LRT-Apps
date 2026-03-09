<div class="p-8">
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Daftar Artikel</h1>
            <p class="text-gray-500">Kelola konten berita dan artikel website</p>
        </div>
        <a href="<?= base_url('admin/article_add') ?>" class="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">Tambah Artikel</a>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left">
            <thead>
                <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <th class="px-8 py-4 font-semibold">Judul</th>
                    <th class="px-8 py-4 font-semibold">Kategori</th>
                    <th class="px-8 py-4 font-semibold">Tanggal</th>
                    <th class="px-8 py-4 font-semibold text-right">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                <?php foreach($articles as $a): ?>
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-8 py-4 font-bold text-gray-900"><?= $a->title ?></td>
                    <td class="px-8 py-4 text-gray-600"><?= $a->category ?></td>
                    <td class="px-8 py-4 text-gray-600"><?= date('d M Y', strtotime($a->created_at)) ?></td>
                    <td class="px-8 py-4 text-right">
                        <a href="<?= base_url('admin/article_delete/'.$a->id) ?>" class="text-red-600 font-semibold" onclick="return confirm('Hapus artikel ini?')">Hapus</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
