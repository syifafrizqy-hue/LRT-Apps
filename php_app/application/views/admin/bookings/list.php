<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Data Booking</h1>
        <p class="text-gray-500">Kelola pesanan sewa bus dari pelanggan</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                        <th class="px-8 py-4 font-semibold">Pelanggan</th>
                        <th class="px-8 py-4 font-semibold">Armada</th>
                        <th class="px-8 py-4 font-semibold">Detail Sewa</th>
                        <th class="px-8 py-4 font-semibold">Status</th>
                        <th class="px-8 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <?php foreach($bookings as $b): ?>
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-8 py-6">
                            <p class="font-bold text-gray-900"><?= $b->name ?></p>
                            <p class="text-sm text-gray-500"><?= $b->phone ?></p>
                        </td>
                        <td class="px-8 py-6">
                            <p class="text-gray-900 font-medium"><?= $b->fleet_name ?></p>
                        </td>
                        <td class="px-8 py-6 text-sm text-gray-600">
                            <p>📅 <?= date('d M Y', strtotime($b->date)) ?></p>
                            <p>⏱️ <?= $b->duration ?> Hari</p>
                            <p>📍 <?= $b->destination ?></p>
                        </td>
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
                        <td class="px-8 py-6 text-right space-y-2">
                            <?php if($b->status == 'Pending'): ?>
                            <a href="<?= base_url('admin/booking_status/'.$b->id.'/Confirmed') ?>" class="block text-emerald-600 hover:text-emerald-800 font-semibold text-sm">Konfirmasi</a>
                            <a href="<?= base_url('admin/booking_status/'.$b->id.'/Cancelled') ?>" class="block text-red-600 hover:text-red-800 font-semibold text-sm">Batalkan</a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
