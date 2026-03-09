<div class="p-8">
    <div class="flex justify-between items-center mb-10">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-500">Selamat datang kembali, <?= $this->session->userdata('username') ?></p>
        </div>
        <div class="flex space-x-4">
            <a href="<?= base_url('admin/fleet_add') ?>" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-sm">Tambah Armada</a>
        </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Armada</p>
            <p class="text-4xl font-bold text-gray-900"><?= $total_fleet ?></p>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Booking</p>
            <p class="text-4xl font-bold text-gray-900"><?= $total_bookings ?></p>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Status Sistem</p>
            <p class="text-4xl font-bold text-emerald-600">Aktif</p>
        </div>
    </div>

    <!-- Recent Bookings -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Booking Terbaru</h2>
            <a href="<?= base_url('admin/bookings') ?>" class="text-emerald-600 font-semibold hover:underline">Lihat Semua</a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                        <th class="px-8 py-4 font-semibold">Pelanggan</th>
                        <th class="px-8 py-4 font-semibold">Armada</th>
                        <th class="px-8 py-4 font-semibold">Tanggal</th>
                        <th class="px-8 py-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <?php foreach($recent_bookings as $b): ?>
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-8 py-6">
                            <p class="font-bold text-gray-900"><?= $b->name ?></p>
                            <p class="text-sm text-gray-500"><?= $b->phone ?></p>
                        </td>
                        <td class="px-8 py-6 text-gray-600"><?= $b->fleet_name ?></td>
                        <td class="px-8 py-6 text-gray-600"><?= date('d M Y', strtotime($b->date)) ?></td>
                        <td class="px-8 py-6">
                            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                <?php 
                                    if($b->status == 'Pending') echo 'bg-yellow-100 text-yellow-700';
                                    elseif($b->status == 'Confirmed') echo 'bg-emerald-100 text-emerald-700';
                                    else echo 'bg-red-100 text-red-700';
                                ?>">
                                <?= $b->status ?>
                            </span>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
