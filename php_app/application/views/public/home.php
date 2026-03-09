<!-- Hero / Banner Section -->
<?php if(!empty($banners)): ?>
<div class="relative h-[500px] overflow-hidden">
    <?php foreach($banners as $b): ?>
    <div class="absolute inset-0">
        <img src="<?= $b->image_url ?>" class="w-full h-full object-cover" alt="<?= $b->title ?>">
        <div class="absolute inset-0 bg-black/40 flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h2 class="text-4xl md:text-6xl font-bold text-white mb-4"><?= $b->title ?></h2>
                <a href="<?= $b->link_url ?>" class="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition">Selengkapnya</a>
            </div>
        </div>
    </div>
    <?php break; // Just show first for now as simple implementation ?>
    <?php endforeach; ?>
</div>
<?php else: ?>
<div class="relative bg-emerald-900 text-white py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:w-2/3">
            <h1 class="text-5xl font-extrabold tracking-tight mb-6">Perjalanan Nyaman, <br><span class="text-emerald-400">Kenangan Tak Terlupakan.</span></h1>
            <p class="text-xl text-emerald-100 mb-8">Layanan sewa bus pariwisata terbaik dengan armada terbaru dan pengemudi profesional untuk kebutuhan perjalanan Anda.</p>
            <div class="flex space-x-4">
                <a href="#fleet" class="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition shadow-lg">Lihat Armada</a>
                <a href="#booking" class="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">Booking Sekarang</a>
            </div>
        </div>
    </div>
    <div class="absolute inset-0 opacity-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover" alt="Bus Background">
    </div>
</div>
<?php endif; ?>

<!-- Fleet Section -->
<section id="fleet" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900">Pilihan Armada Kami</h2>
        <p class="mt-4 text-gray-600">Berbagai tipe bus sesuai dengan kapasitas dan kebutuhan perjalanan Anda.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <?php foreach($fleets as $f): ?>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <img src="<?= $f->image_url ?>" class="w-full h-56 object-cover" alt="<?= $f->name ?>">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900"><?= $f->name ?></h3>
                        <p class="text-emerald-600 font-medium"><?= $f->type ?></p>
                    </div>
                    <span class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <?= $f->capacity ?> Kursi
                    </span>
                </div>
                <p class="text-gray-600 text-sm mb-6 line-clamp-2"><?= $f->description ?></p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span class="text-lg font-bold text-gray-900"><?= $f->price ?></span>
                    <a href="<?= base_url('home/fleet_detail/'.$f->id) ?>" class="text-emerald-600 font-semibold hover:text-emerald-700">Detail &rarr;</a>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- Articles Section -->
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Artikel & Berita</h2>
                <p class="mt-2 text-gray-600">Informasi terbaru seputar pariwisata dan layanan kami.</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php foreach($articles as $a): ?>
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img src="<?= $a->image_url ?>" class="w-full h-48 object-cover" alt="<?= $a->title ?>">
                <div class="p-6">
                    <p class="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2"><?= $a->category ?></p>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight"><?= $a->title ?></h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2"><?= $a->description ?></p>
                    <a href="<?= base_url('home/article_detail/'.$a->id) ?>" class="text-gray-900 font-bold text-sm hover:text-orange-600">Baca Selengkapnya &rarr;</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Booking Form Section -->
<section id="booking" class="py-20 bg-emerald-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-bold text-gray-900">Formulir Pemesanan</h2>
                <p class="mt-2 text-gray-600">Isi data di bawah ini untuk mendapatkan penawaran terbaik.</p>
            </div>

            <?php if($this->session->flashdata('success')): ?>
                <div class="bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-6">
                    <?= $this->session->flashdata('success') ?>
                </div>
            <?php endif; ?>

            <form action="<?= base_url('home/submit_booking') ?>" method="POST" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
                        <input type="tel" name="phone" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pilih Armada</label>
                    <select name="fleet_id" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
                        <?php foreach($fleets as $f): ?>
                            <option value="<?= $f->id ?>"><?= $f->name ?> (<?= $f->capacity ?> Kursi)</option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal Keberangkatan</label>
                        <input type="date" name="date" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Durasi (Hari)</label>
                        <input type="number" name="duration" required min="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tujuan Perjalanan</label>
                    <textarea name="destination" required rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"></textarea>
                </div>

                <button type="submit" class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg">Kirim Pesanan Sekarang</button>
            </form>
        </div>
    </div>
</section>
