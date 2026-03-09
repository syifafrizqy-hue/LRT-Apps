<div class="p-8">
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
            <p class="text-gray-500">Manajemen akses admin dan operator sistem</p>
        </div>
        <a href="<?= base_url('admin/user_add') ?>" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-sm">Tambah User</a>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                        <th class="px-8 py-4 font-semibold">Username</th>
                        <th class="px-8 py-4 font-semibold">Role</th>
                        <th class="px-8 py-4 font-semibold">Dibuat Pada</th>
                        <th class="px-8 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <?php foreach($users as $u): ?>
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-8 py-4 font-bold text-gray-900"><?= $u->username ?></td>
                        <td class="px-8 py-4">
                            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                                <?= $u->role ?>
                            </span>
                        </td>
                        <td class="px-8 py-4 text-gray-600"><?= date('d M Y', strtotime($u->created_at)) ?></td>
                        <td class="px-8 py-4 text-right space-x-2">
                            <a href="<?= base_url('admin/user_edit/'.$u->id) ?>" class="text-blue-600 hover:text-blue-800 font-semibold">Edit</a>
                            <?php if($u->id != $this->session->userdata('user_id')): ?>
                            <a href="<?= base_url('admin/user_delete/'.$u->id) ?>" class="text-red-600 hover:text-red-800 font-semibold" onclick="return confirm('Hapus user ini?')">Hapus</a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
