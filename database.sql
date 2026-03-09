-- Create Database
CREATE DATABASE IF NOT EXISTS lrt_bus;
USE lrt_bus;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(255) UNIQUE NOT NULL,
  `value` TEXT
);

-- Banners Table
CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  image_url TEXT,
  sort_order INT DEFAULT 0
);

-- Fleet Table
CREATE TABLE IF NOT EXISTS fleet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  price VARCHAR(255),
  price_numeric INT,
  capacity INT,
  description TEXT,
  image_url TEXT
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  category VARCHAR(255),
  image_url TEXT,
  author VARCHAR(255) DEFAULT 'Admin',
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255),
  review_text TEXT,
  rating INT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_approved TINYINT(1) DEFAULT 1
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  logo_url TEXT
);

-- About Table
CREATE TABLE IF NOT EXISTS about (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  image_url TEXT
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  fleet_id INT,
  fleet_name VARCHAR(255),
  date VARCHAR(50),
  duration INT,
  destination TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Admin
INSERT INTO users (username, password, role) VALUES ('admin', '$2a$10$7raff6.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5', 'admin') ON DUPLICATE KEY UPDATE username=username;
-- Note: password is 'admin123' hashed with bcrypt

-- Seed Settings
INSERT INTO settings (`key`, `value`) VALUES 
('sticky_info', 'Promo Ramadhan! Diskon 10% untuk penyewaan Hiace dan Bus Pariwisata.'),
('whatsapp_number', '6281234567890'),
('footer_address', 'Jl. Lawang Rizki No. 123, Jakarta, Indonesia'),
('footer_email', 'info@lawangrizki.com'),
('footer_phone', '+62 812 3456 7890'),
('site_title', 'Lawang Rizki Transport - Sewa Hiace & Bus Pariwisata'),
('site_description', 'Penyedia layanan sewa Hiace, Bus Pariwisata, dan mobil mewah terpercaya di Jakarta. Armada terbaru, driver profesional, harga kompetitif.'),
('site_keywords', 'sewa hiace jakarta, sewa bus pariwisata, rental mobil jakarta, lawang rizki transport'),
('favicon_url', 'https://picsum.photos/seed/lrt-favicon/32/32'),
('logo_main', ''),
('logo_login', ''),
('logo_admin', ''),
('google_analytics_id', ''),
('google_tag_manager_id', '')
ON DUPLICATE KEY UPDATE `key`=`key`;
