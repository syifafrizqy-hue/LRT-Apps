<div class="bg-white py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10 text-center">
            <p class="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4"><?= $article->category ?></p>
            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"><?= $article->title ?></h1>
            <p class="mt-6 text-gray-500 font-medium">Dipublikasikan pada <?= date('d M Y', strtotime($article->created_at)) ?></p>
        </div>

        <img src="<?= $article->image_url ?>" class="w-full h-[450px] object-cover rounded-3xl shadow-xl mb-12" alt="<?= $article->title ?>">

        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <?= nl2br($article->content) ?>
        </div>

        <div class="mt-16 pt-10 border-t border-gray-100">
            <a href="<?= base_url() ?>" class="inline-flex items-center text-orange-600 font-bold hover:text-orange-700">
                <span class="mr-2">&larr;</span> Kembali ke Beranda
            </a>
        </div>
    </div>
</div>
