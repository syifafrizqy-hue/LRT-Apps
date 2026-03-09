-- Database Migration for MySQL
-- LRT Bus/Fleet Booking System

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'admin',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin: admin / admin123 (bcrypt hashed)
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2y$10$8Wk6m.p9vXp8vXp8vXp8v.p9vXp8vXp8vXp8vXp8vXp8vXp8vXp8v', 'admin');

-- --------------------------------------------------------

-- Table structure for table `fleet`
CREATE TABLE `fleet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `price_numeric` int(11) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `bookings`
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fleet_id` int(11) DEFAULT NULL,
  `fleet_name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `destination` text DEFAULT NULL,
  `status` enum('Pending','Confirmed','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `clients`
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo_url` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `banners`
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `image_url` text NOT NULL,
  `link_url` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `reviews`
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `rating` int(1) DEFAULT 5,
  `comment` text DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `site_config`
CREATE TABLE `site_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) DEFAULT 'LRT Bus',
  `address` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(50) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `about_text` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `articles`
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `author` varchar(100) DEFAULT 'Admin',
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `settings`
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `value` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
