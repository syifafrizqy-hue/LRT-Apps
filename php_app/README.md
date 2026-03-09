# LRT Bus & Fleet - CodeIgniter 3 Refactor

Aplikasi ini telah di-refactor dari Node.js ke CodeIgniter 3 untuk mendukung hosting PHP 7.4 dan MySQL.

## Persyaratan Sistem
- PHP 7.4 atau lebih baru
- MySQL 5.7 atau lebih baru
- Apache dengan mod_rewrite diaktifkan

## Cara Instalasi

1. **Database**:
   - Buat database baru di MySQL (misal: `lrt_bus`).
   - Import file `database.sql` yang ada di folder root ini ke database tersebut.

2. **Konfigurasi Database**:
   - Buka file `application/config/database.php`.
   - Sesuaikan `hostname`, `username`, `password`, dan `database` dengan pengaturan server Anda.

3. **Konfigurasi Base URL**:
   - Buka file `application/config/config.php`.
   - Cari `$config['base_url']` dan ubah nilainya sesuai dengan URL aplikasi Anda (misal: `http://localhost/lrt_bus/`).

4. **Login Admin**:
   - URL: `your-domain.com/auth/login`
   - Username: `admin`
   - Password: `admin123`

## Struktur Folder
- `application/`: Berisi logika backend (Controllers, Models, Views).
- `assets/`: Berisi file statis (gambar, css, js).
- `database.sql`: File migrasi database MySQL.

## Fitur
- **Frontend**: Beranda, Daftar Armada, Detail Armada, Form Booking.
- **Backend**: Dashboard, Manajemen Armada, Manajemen Booking (Update Status).
- **Auth**: Login/Logout Admin dengan Session.
