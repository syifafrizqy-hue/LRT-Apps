<div class="p-8">
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Kelola Armada</h1>
            <p class="text-gray-500">Daftar semua bus dan kendaraan pariwisata</p>
        </div>
        <a href="<?= base_url('admin/fleet_add') ?>" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-sm">Tambah Armada</a>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                        <th class="px-8 py-4 font-semibold">Foto</th>
                        <th class="px-8 py-4 font-semibold">Nama Armada</th>
                        <th class="px-8 py-4 font-semibold">Tipe</th>
                        <th class="px-8 py-4 font-semibold">Kapasitas</th>
                        <th class="px-8 py-4 font-semibold">Harga</th>
                        <th class="px-8 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <?php foreach($fleets as $f): ?>
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-8 py-4">
                            <img src="<?= $f->image_url ?>" class="w-16 h-12 object-cover rounded-lg" alt="<?= $f->name ?>">
                        </td>
                        <td class="px-8 py-4 font-bold text-gray-900"><?= $f->name ?></td>
                        <td class="px-8 py-4 text-gray-600"><?= $f->type ?></td>
                        <td class="px-8 py-4 text-gray-600"><?= $f->capacity ?> Kursi</td>
                        <td class="px-8 py-4 text-gray-600"><?= $f->price ?></td>
                        <td class="px-8 py-4 text-right space-x-2">
                            <a href="<?= base_url('admin/fleet_edit/'.$f->id) ?>" class="text-blue-600 hover:text-blue-800 font-semibold">Edit</a>
                            <a href="<?= base_url('admin/fleet_delete/'.$f->id) ?>" class="text-red-600 hover:text-red-800 font-semibold" onclick="return confirm('Hapus armada ini?')">Hapus</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
