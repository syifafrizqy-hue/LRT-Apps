<div class="bg-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <!-- Image Gallery -->
            <div>
                <img src="<?= $fleet->image_url ?>" class="w-full h-[500px] object-cover rounded-3xl shadow-2xl" alt="<?= $fleet->name ?>">
            </div>

            <!-- Details -->
            <div>
                <div class="mb-8">
                    <span class="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider"><?= $fleet->type ?></span>
                    <h1 class="text-4xl font-extrabold text-gray-900 mt-4"><?= $fleet->name ?></h1>
                    <p class="text-3xl font-bold text-orange-600 mt-2"><?= $fleet->price ?></p>
                </div>

                <div class="grid grid-cols-2 gap-6 mb-10">
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Kapasitas</p>
                        <p class="text-xl font-bold text-gray-900"><?= $fleet->capacity ?> Kursi</p>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Fasilitas</p>
                        <p class="text-xl font-bold text-gray-900">Premium</p>
                    </div>
                </div>

                <div class="prose prose-lg text-gray-600 mb-10">
                    <h3 class="text-gray-900 font-bold">Deskripsi Armada</h3>
                    <p><?= nl2br($fleet->description) ?></p>
                </div>

                <a href="#booking" class="inline-block w-full bg-orange-600 text-white text-center py-5 rounded-2xl font-bold text-xl hover:bg-orange-700 transition shadow-xl">Booking Armada Ini</a>
            </div>
        </div>
    </div>
</div>
