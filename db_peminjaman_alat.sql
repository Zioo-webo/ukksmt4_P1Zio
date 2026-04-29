-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 12:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_peminjaman_alat`
--

-- --------------------------------------------------------

--
-- Table structure for table `alat`
--

CREATE TABLE `alat` (
  `id_alat` varchar(191) NOT NULL,
  `nama_alat` varchar(191) NOT NULL,
  `id_kategori` varchar(191) NOT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `alat`
--

INSERT INTO `alat` (`id_alat`, `nama_alat`, `id_kategori`, `stok`, `created_at`, `updated_at`) VALUES
('cmohfxyvz000iw7yg8a6lns5t', 'Laptop ASUS', 'cmohfxyvo000dw7yghkp79rm5', 10, '2026-04-27 16:58:10.272', '2026-04-27 16:58:10.272'),
('cmohfxyw3000kw7ygsnyl53b5', 'Laptop Lenovo', 'cmohfxyvo000dw7yghkp79rm5', 8, '2026-04-27 16:58:10.276', '2026-04-27 16:58:10.276'),
('cmohfxyw6000mw7ygy2fu2vd9', 'PC Desktop', 'cmohfxyvo000dw7yghkp79rm5', 5, '2026-04-27 16:58:10.278', '2026-04-27 16:58:10.278'),
('cmohfxyw9000ow7ygm6c871o5', 'Mouse Wireless', 'cmohfxyvo000dw7yghkp79rm5', 20, '2026-04-27 16:58:10.281', '2026-04-27 16:58:10.281'),
('cmohfxywc000qw7ygwbpk18io', 'Keyboard Mechanical', 'cmohfxyvo000dw7yghkp79rm5', 15, '2026-04-27 16:58:10.284', '2026-04-27 16:58:10.284'),
('cmohfxywg000sw7ygfok9z8gy', 'Bola Basket', 'cmohfxyvr000ew7ygn06pg58y', 15, '2026-04-27 16:58:10.288', '2026-04-27 16:58:10.288'),
('cmohfxywi000uw7ygl919uybh', 'Bola Futsal', 'cmohfxyvr000ew7ygn06pg58y', 12, '2026-04-27 16:58:10.291', '2026-04-27 16:58:10.291'),
('cmohfxywl000ww7ygu2jbvui9', 'Raket Badminton', 'cmohfxyvr000ew7ygn06pg58y', 20, '2026-04-27 16:58:10.293', '2026-04-27 16:58:10.293'),
('cmohfxywn000yw7ygtwed8l3b', 'Matras Yoga', 'cmohfxyvr000ew7ygn06pg58y', 10, '2026-04-27 16:58:10.295', '2026-04-27 16:58:10.295'),
('cmohfxywp0010w7yg0em39tcq', 'Meja Kerja', 'cmohfxyvt000fw7ygod3i7b0z', 8, '2026-04-27 16:58:10.297', '2026-04-27 16:58:10.297'),
('cmohfxywr0012w7ygtp51ensm', 'Kursi Kantor', 'cmohfxyvt000fw7ygod3i7b0z', 12, '2026-04-27 16:58:10.299', '2026-04-27 16:58:10.299'),
('cmohfxywt0014w7ygipmcbx64', 'Proyektor Epson', 'cmohfxyvw000gw7ygyhaqw324', 6, '2026-04-27 16:58:10.301', '2026-04-27 16:58:10.301'),
('cmohfxywv0016w7ygnhdii3vt', 'Proyektor Panasonic', 'cmohfxyvw000gw7ygyhaqw324', 4, '2026-04-27 16:58:10.303', '2026-04-27 16:58:10.303'),
('cmohfxywy0018w7ygwu8ymacl', 'Speaker Aktif', 'cmohfxyvw000gw7ygyhaqw324', 8, '2026-04-27 16:58:10.306', '2026-04-27 16:58:10.306'),
('cmohfxyx0001aw7ygy0at7xh5', 'Microphone Wireless', 'cmohfxyvw000gw7ygyhaqw324', 10, '2026-04-27 16:58:10.308', '2026-04-27 16:58:10.308'),
('cmohfxyx2001cw7yg1i0ufab5', 'Kamera DSLR Canon', 'cmohfxyvw000gw7ygyhaqw324', 5, '2026-04-27 16:58:10.310', '2026-04-27 16:58:10.310'),
('cmohfxyx4001ew7yg55nhvmqz', 'Tripod', 'cmohfxyvw000gw7ygyhaqw324', 12, '2026-04-27 16:58:10.312', '2026-04-27 16:58:10.312');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` varchar(191) NOT NULL,
  `nama_kategori` varchar(191) NOT NULL,
  `deskripsi` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `deskripsi`, `created_at`, `updated_at`) VALUES
('cmohfxyvo000dw7yghkp79rm5', 'Elektronik', 'Peralatan elektronik dan komputer', '2026-04-27 16:58:10.260', '2026-04-27 16:58:10.260'),
('cmohfxyvr000ew7ygn06pg58y', 'Olahraga', 'Peralatan olahraga dan fitness', '2026-04-27 16:58:10.263', '2026-04-27 16:58:10.263'),
('cmohfxyvt000fw7ygod3i7b0z', 'Kantor', 'Peralatan dan perlengkapan kantor', '2026-04-27 16:58:10.266', '2026-04-27 16:58:10.266'),
('cmohfxyvw000gw7ygyhaqw324', 'Audio Visual', 'Peralatan audio dan visual', '2026-04-27 16:58:10.268', '2026-04-27 16:58:10.268');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id_kegiatan` varchar(191) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `id_alat` varchar(191) NOT NULL,
  `jenis_kegiatan` varchar(191) NOT NULL,
  `tgl_kegiatan` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `peminjaman` datetime(3) DEFAULT NULL,
  `pengembalian` datetime(3) DEFAULT NULL,
  `pelanggaran` varchar(191) DEFAULT NULL,
  `denda` double NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id_kegiatan`, `id_user`, `id_alat`, `jenis_kegiatan`, `tgl_kegiatan`, `peminjaman`, `pengembalian`, `pelanggaran`, `denda`, `created_at`, `updated_at`) VALUES
('cmohfxyx7001gw7ygqbspmp1y', 'cmohfxyvg000aw7ygg9dwjlv7', 'cmohfxyvz000iw7yg8a6lns5t', 'Peminjaman', '2026-04-27 16:58:10.313', '2026-04-27 16:58:10.313', NULL, NULL, 0, '2026-04-27 16:58:10.315', '2026-04-27 16:58:10.315'),
('cmohfxyxc001iw7ygz7cvx3tm', 'cmohfxyvk000cw7yg9sqdt6qf', 'cmohfxywt0014w7ygipmcbx64', 'Peminjaman', '2026-04-27 16:58:10.313', '2026-04-27 16:58:10.313', '2026-04-28 16:58:10.313', NULL, 0, '2026-04-27 16:58:10.321', '2026-04-27 16:58:10.321'),
('cmohfxyxf001kw7yg8eufprps', 'cmohfxyvg000aw7ygg9dwjlv7', 'cmohfxywg000sw7ygfok9z8gy', 'Peminjaman', '2026-04-27 16:58:10.313', '2026-04-27 16:58:10.313', '2026-04-27 16:58:10.313', NULL, 0, '2026-04-27 16:58:10.324', '2026-04-27 16:58:10.324');

-- --------------------------------------------------------

--
-- Table structure for table `log_aktifitas`
--

CREATE TABLE `log_aktifitas` (
  `id_aktifitas` varchar(191) NOT NULL,
  `id_kegiatan` varchar(191) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_aktifitas`
--

INSERT INTO `log_aktifitas` (`id_aktifitas`, `id_kegiatan`, `id_user`, `created_at`) VALUES
('cmohfxyxi001mw7ygzrq8nte4', 'cmohfxyx7001gw7ygqbspmp1y', 'cmohfxyvg000aw7ygg9dwjlv7', '2026-04-27 16:58:10.327'),
('cmohfxyxl001ow7ygmxtqm6bu', 'cmohfxyxc001iw7ygz7cvx3tm', 'cmohfxyvk000cw7yg9sqdt6qf', '2026-04-27 16:58:10.330'),
('cmohfxyxo001qw7yg2a386b62', 'cmohfxyxf001kw7yg8eufprps', 'cmohfxyvg000aw7ygg9dwjlv7', '2026-04-27 16:58:10.332');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` varchar(191) NOT NULL,
  `role` enum('admin','petugas','peminjam') NOT NULL DEFAULT 'peminjam'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `role`) VALUES
('cmohfxyt80000w7yg2xua8nvx', 'admin'),
('cmohfxyuq0001w7yg4a03byv3', 'petugas'),
('cmohfxyuu0002w7ygl800j3xk', 'peminjam');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(191) NOT NULL,
  `nama_user` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `id_role` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `email`, `password`, `id_role`, `created_at`, `updated_at`) VALUES
('cmohfxyv40004w7yg5s6x51g9', 'Administrator Sistem', 'admin@example.com', '$2b$12$aE6iafC6dX55HMIXz6OZW.b5BvHhcHZjJRFCQXU0Rq/3uFRO0xOS6', 'cmohfxyt80000w7yg2xua8nvx', '2026-04-27 16:58:10.239', '2026-04-27 16:58:10.239'),
('cmohfxyv90006w7ygmwxitc4j', 'Petugas 1', 'petugas1@example.com', '$2b$12$aE6iafC6dX55HMIXz6OZW.b5BvHhcHZjJRFCQXU0Rq/3uFRO0xOS6', 'cmohfxyuq0001w7yg4a03byv3', '2026-04-27 16:58:10.245', '2026-04-27 16:58:10.245'),
('cmohfxyvc0008w7ygznk4chde', 'Petugas 2', 'petugas2@example.com', '$2b$12$aE6iafC6dX55HMIXz6OZW.b5BvHhcHZjJRFCQXU0Rq/3uFRO0xOS6', 'cmohfxyuq0001w7yg4a03byv3', '2026-04-27 16:58:10.248', '2026-04-27 16:58:10.248'),
('cmohfxyvg000aw7ygg9dwjlv7', 'John Doe', 'peminjam1@example.com', '$2b$12$aE6iafC6dX55HMIXz6OZW.b5BvHhcHZjJRFCQXU0Rq/3uFRO0xOS6', 'cmohfxyuu0002w7ygl800j3xk', '2026-04-27 16:58:10.252', '2026-04-27 16:58:10.252'),
('cmohfxyvk000cw7yg9sqdt6qf', 'Jane Smith', 'peminjam2@example.com', '$2b$12$aE6iafC6dX55HMIXz6OZW.b5BvHhcHZjJRFCQXU0Rq/3uFRO0xOS6', 'cmohfxyuu0002w7ygl800j3xk', '2026-04-27 16:58:10.256', '2026-04-27 16:58:10.256');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alat`
--
ALTER TABLE `alat`
  ADD PRIMARY KEY (`id_alat`),
  ADD KEY `alat_id_kategori_fkey` (`id_kategori`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id_kegiatan`),
  ADD KEY `kegiatan_id_user_fkey` (`id_user`),
  ADD KEY `kegiatan_id_alat_fkey` (`id_alat`);

--
-- Indexes for table `log_aktifitas`
--
ALTER TABLE `log_aktifitas`
  ADD PRIMARY KEY (`id_aktifitas`),
  ADD KEY `log_aktifitas_id_kegiatan_fkey` (`id_kegiatan`),
  ADD KEY `log_aktifitas_id_user_fkey` (`id_user`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `user_email_key` (`email`),
  ADD KEY `user_id_role_fkey` (`id_role`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alat`
--
ALTER TABLE `alat`
  ADD CONSTRAINT `alat_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON UPDATE CASCADE;

--
-- Constraints for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD CONSTRAINT `kegiatan_id_alat_fkey` FOREIGN KEY (`id_alat`) REFERENCES `alat` (`id_alat`) ON UPDATE CASCADE,
  ADD CONSTRAINT `kegiatan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `log_aktifitas`
--
ALTER TABLE `log_aktifitas`
  ADD CONSTRAINT `log_aktifitas_id_kegiatan_fkey` FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan` (`id_kegiatan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `log_aktifitas_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
