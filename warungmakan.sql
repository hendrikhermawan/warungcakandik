-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jan 2025 pada 02.48
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warungmakan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu_items`
--

CREATE TABLE `menu_items` (
  `menu_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menu_items`
--

INSERT INTO `menu_items` (`menu_id`, `name`, `price`, `category`, `image_url`) VALUES
(1, 'Bebek Goreng', '20000.00', 'Makanan', '../backend/assets/product/bebek-goreng.png'),
(2, 'Bebek Bakar', '21000.00', 'Makanan', '../backend/assets/product/bebek-bakar.png'),
(3, 'Ayam Goreng', '19000.00', 'Makanan', '../backend/assets/product/ayam-goreng.png'),
(4, 'Ayam Bakar', '21000.00', 'Makanan', '../backend/assets/product/ayam-bakar.png'),
(5, 'Nasi Putih', '5000.00', 'Makanan', '../backend/assets/product/nasi.png'),
(6, 'Air Mineral', '4000.00', 'Minuman', '../backend/assets/product/air-mineral.png'),
(7, 'Es Teh', '5000.00', 'Minuman', '../backend/assets/product/es-teh.png'),
(8, 'Teh Panas', '6000.00', 'Minuman', '../backend/assets/product/teh-hangat.png'),
(9, 'Es Jeruk', '6000.00', 'Minuman', '../backend/assets/product/es-jeruk.png'),
(10, 'Jeruk Panas', '6500.00', 'Minuman', '../backend/assets/product/jeruk-hangat.png'),
(11, 'Kopi', '5000.00', 'Minuman', '../backend/assets/product/kopi.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `order_status` enum('pending','in_progress','completed') DEFAULT 'pending',
  `order_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) DEFAULT 0.00,
  `payment_status` enum('unpaid','paid') DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`order_id`, `table_id`, `order_status`, `order_time`, `total_price`, `payment_status`) VALUES
(1, 3, 'pending', '2025-01-03 01:36:32', '20000.00', 'unpaid'),
(2, 2, 'pending', '2025-01-03 01:37:58', '80000.00', 'unpaid'),
(3, 3, 'pending', '2025-01-03 01:38:50', '80000.00', 'unpaid'),
(4, 7, 'pending', '2025-01-03 01:39:43', '101000.00', 'unpaid'),
(5, 10, 'pending', '2025-01-03 01:40:49', '107500.00', 'unpaid'),
(6, 12, 'pending', '2025-01-03 01:44:14', '20000.00', 'unpaid'),
(7, 12, 'pending', '2025-01-03 01:44:52', '20000.00', 'unpaid');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sub_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tables`
--

CREATE TABLE `tables` (
  `table_id` int(11) NOT NULL,
  `qr_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tables`
--

INSERT INTO `tables` (`table_id`, `qr_code`) VALUES
(10, 'tab1410j'),
(11, 'tab1411k'),
(12, 'tab1412l'),
(13, 'tab1413m'),
(14, 'tab1414n'),
(1, 'tab141a'),
(2, 'tab142b'),
(3, 'tab143c'),
(4, 'tab144d'),
(5, 'tab145e'),
(6, 'tab146f'),
(7, 'tab147g'),
(8, 'tab148h'),
(9, 'tab149i');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `table_id` (`table_id`);

--
-- Indeks untuk tabel `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indeks untuk tabel `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `qr_code` (`qr_code`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tables`
--
ALTER TABLE `tables`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`);

--
-- Ketidakleluasaan untuk tabel `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu_items` (`menu_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
