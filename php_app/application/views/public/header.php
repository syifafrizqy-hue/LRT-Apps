<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LRT Bus & Fleet - Sewa Bus Pariwisata</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex-shrink-0 flex items-center">
                    <span class="text-2xl font-bold text-orange-600"><?= isset($config) ? explode(' ', $config->site_name)[0] : 'LRT' ?></span>
                    <span class="ml-2 text-xl font-semibold text-gray-800"><?= isset($config) ? str_replace(explode(' ', $config->site_name)[0], '', $config->site_name) : 'Bus & Fleet' ?></span>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="<?= base_url() ?>" class="text-gray-600 hover:text-emerald-600 font-medium">Beranda</a>
                    <a href="#fleet" class="text-gray-600 hover:text-emerald-600 font-medium">Armada</a>
                    <a href="#booking" class="text-gray-600 hover:text-emerald-600 font-medium">Booking</a>
                    <a href="<?= base_url('auth/login') ?>" class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">Admin Login</a>
                </div>
            </div>
        </div>
    </nav>
