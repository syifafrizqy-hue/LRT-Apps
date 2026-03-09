<div class="p-8 max-w-2xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900"><?= isset($user) ? 'Edit' : 'Tambah' ?> Pengguna</h1>
        <p class="text-gray-500">Atur kredensial dan hak akses pengguna</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action="<?= current_url() ?>" method="POST" class="space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input type="text" name="username" value="<?= isset($user) ? $user->username : '' ?>" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Password <?= isset($user) ? '<span class="text-xs text-gray-400 font-normal">(Kosongkan jika tidak ingin mengubah)</span>' : '' ?></label>
                <input type="password" name="password" <?= isset($user) ? '' : 'required' ?> class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Role / Hak Akses</label>
                <select name="role" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition">
                    <option value="admin" <?= (isset($user) && $user->role == 'admin') ? 'selected' : '' ?>>Admin</option>
                    <option value="user" <?= (isset($user) && $user->role == 'user') ? 'selected' : '' ?>>User / Operator</option>
                </select>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg">Simpan User</button>
                <a href="<?= base_url('admin/users') ?>" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">Batal</a>
            </div>
        </form>
    </div>
</div>
