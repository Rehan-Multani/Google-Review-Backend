-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 01:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `google-review`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `qr_code_id` int(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `user_id`, `qr_code_id`, `image`, `created_at`) VALUES
(1, 1, 7, 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744027247/banner/wspatx6grfcchmdwwk5s.jpg', '2025-04-09 10:16:12'),
(2, 2, 8, 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744027279/banner/ptrhemlzvijwf2fycv3f.jpg', '2025-04-09 10:16:16'),
(5, 2, 9, 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744030915/banner/tlqypnlk5iib4hywlg1z.png', '2025-04-09 10:16:19'),
(6, 2, 10, 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744030965/banner/q4xu6snftvujma3wl34h.png', '2025-04-09 10:16:22'),
(8, 2, 8, 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744193859/banner/cpm7rjq63v9uzde42s7a.jpg', '2025-04-09 10:17:39');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(255) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `business_name`, `business_type`, `location`, `email`, `password`, `image`) VALUES
(1, 'My Company Name', 'Retail', '', '', '', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744031094/company/bcylmzpin6lycjr1pqwt.jpg'),
(2, 'Tech Innovators Inc', 'Technology', '', '', '', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744031329/company/bpbopcxbnfvro83nx1bw.jpg'),
(3, 'Tech Innovators Inc', 'Technology', '', 'company@gmail.com', '$2b$10$cHEHS9czp10rmyhxwD.szeDNw68kKLCiWRae4uZ.sekiqnAE/VSR.', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744089766/company/cjwwy3rrywn0m82halwc.jpg'),
(5, 'edvdv', 'vr', '', '', '', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744180424/company/qmj5ptgbbtma0fkixikd.svg'),
(8, 'GreenFields', 'Agriculture', 'Texas', 'info@greenfields.org', '$2a$10$k7e4lpONmXHuF/O5jaPhXefs2WjoXEqGzV2bZY81ShTLJzJ.1Hofm', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744180688/company/h5xfgw5ld3sfc1qqixzy.jpg'),
(9, 'GreenFields', 'Agriculture', 'Texas', 'info@greenfields.org', '$2b$10$asPHfxBX0JQPntCTutPDTuJkxdei139cOIg3EcXDXPWWJVVddKS56', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744180782/company/lprvhvn6upwzqa9uvk7s.jpg'),
(12, 'fe', 'fe', 'fef', 'company1@gmail.com', '$2b$10$7JfQxc/bxlBwpwrmgVbL1.8JX0U5tchg/rbRpnKEmuIbBNja0PFye', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744194381/company/mjr0h2m5dqs3bomqeube.png'),
(13, 'frg', 'ggr', 'gfhg', 'compan1y1@gmail.com', '$2b$10$wVZKm.E5CLAvgx/cQZet6.apfasNUoGGTDrdkADkOjl8DNkfxh.de', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744278108/company/mawohcoemfc5sv28lu5u.svg');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `id` int(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiry`
--

INSERT INTO `enquiry` (`id`, `full_name`, `email`, `phone`, `contact`, `notes`, `created_at`) VALUES
(1, 'Amit Verma', 'amit.verma@example.in', '+919876543210', 'phone', 'Birthday celebration, corner table preferred', '2025-04-07 08:20:52'),
(2, 'Priya Singh', 'priya.singh@example.in', '+918888888888', 'email', 'Family dinner booking at 8 PM', '2025-04-07 08:23:12'),
(3, 'Rohit Mehra', 'rohit.mehra92@example.com', '+919911223344', 'phone', 'Anniversary dinner, need candlelight setup', '2025-04-07 08:24:49'),
(13, 'Rohit Mehra', 'rohit.mehra92@example.com', '+919911223344', 'phone', 'Anniversary dinner, need candlelight setup', '2025-04-07 08:36:29'),
(14, 'Rehan', 'rehan@gmail.com', '549849845', 'email', 'vrgvr', '2025-04-09 06:17:40'),
(15, 'rvrv', 'superadmin@gmail.com', '44844984', 'phone', 'yhtyh', '2025-04-09 06:18:42'),
(16, 'Rehan', 'superadmin@gmail.com', '44844984', 'email', 'feffe', '2025-04-10 06:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `google_business`
--

CREATE TABLE `google_business` (
  `id` int(11) NOT NULL,
  `google_business_id` varchar(255) NOT NULL,
  `qr_code_url` text DEFAULT NULL,
  `banner_url` text NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `description`) VALUES
(1, 'superadmin', 'Has access to all system features and settings.'),
(2, 'admin', 'Can manage users and settings but with limited access compared to superadmin.'),
(3, 'company', 'Represents a company-level group with access to relevant modules.');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `month_duration` int(11) NOT NULL,
  `num_establishments` int(11) DEFAULT 1,
  `free_trial_days` int(11) DEFAULT 0,
  `plan_details` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `plan_name`, `month_duration`, `num_establishments`, `free_trial_days`, `plan_details`, `price`, `created_at`, `updated_at`, `order_id`) VALUES
(6, 'Basic Plan', 3, 5, 10, 'Basic features with moderate limits', 199.99, '2025-04-08 07:24:01', '2025-04-10 08:26:40', '6D88E6900947636DBAE2778E'),
(7, 'Growth Plan', 9, 20, 14, 'Designed for growing businesses with extra flexibility', 799.00, '2025-04-08 07:24:21', '2025-04-08 11:01:47', '98720869A3F62490190DD986'),
(8, 'Pro Plan', 6, 10, 14, 'Includes everything in the basic plan plus analytics', 499.99, '2025-04-08 07:24:41', '2025-04-08 07:24:41', '35FF8189E88E068D00E4589B');

-- --------------------------------------------------------

--
-- Table structure for table `qr_code`
--

CREATE TABLE `qr_code` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `qr_color` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qr_code`
--

INSERT INTO `qr_code` (`id`, `user_id`, `url`, `headline`, `footer`, `size`, `qr_color`, `image`, `created_at`) VALUES
(7, 2, 'uyjmy', 'jy', 'jyj', 'Medium (400x400)', 'undefined', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744024714/qrcodes/b6pyb29s1kazix5i5oyy.webp', '2025-04-07 11:18:34'),
(8, 2, 'gr', 'gr', 'grgr', 'Medium (400x400)', 'undefined', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744026608/qrcodes/uwvp3xroscw5rohkdgpl.png', '2025-04-07 11:50:08'),
(9, 2, 'uyguh', 'htyh', 'thth', 'Medium (400x400)', 'undefined', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744028560/qrcodes/xz8cui9zzsx4qaw11zeb.webp', '2025-04-07 12:22:40'),
(10, 2, 'hth', 'th', 'hth', 'Medium (400x400)', 'undefined', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744030684/qrcodes/nh9gkd8ubh5dyu7vdctj.png', '2025-04-07 12:58:04'),
(11, 2, 'grg', 'rgr', 'gr', 'Medium (400x400)', 'undefined', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744276630/qrcodes/l8ladprhvecs3pgntuw6.svg', '2025-04-10 09:17:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `group_id` varchar(15) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '0',
  `image` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `group_id`, `status`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'superadmin@gmail.com', '$2b$10$oE6vskr4hitPaOmBKBrLfeMA1zbwSzuPFO2hDcdyg7BwoRWUlCliS', NULL, '1', '0', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744115980/ntxjhshkaumnuugwfxmg.jpg', '2025-04-05 11:44:08', '2025-04-08 12:40:16'),
(2, 'Admin', 'admin@gmail.com', '$2b$10$iFA/xN9PO0jl.uAgM.kAf.EouZphx6YwA3cVihCqfMTqg8.37oRkW', NULL, '2', '1', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744115980/ntxjhshkaumnuugwfxmg.jpg', '2025-04-05 11:44:34', '2025-04-10 10:27:29'),
(3, 'Company', 'company@gmail.com', '$2b$10$U9CAUVV9V7TbRpDF/NZ98OuGm37w9kXsXJlUy.t8lhXDIw4bsNlgG', NULL, '3', '0', 'https://res.cloudinary.com/dkqcqrrbp/image/upload/v1744115980/ntxjhshkaumnuugwfxmg.jpg', '2025-04-05 11:44:53', '2025-04-08 12:40:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `google_business`
--
ALTER TABLE `google_business`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `qr_code`
--
ALTER TABLE `qr_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `google_business`
--
ALTER TABLE `google_business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `qr_code`
--
ALTER TABLE `qr_code`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
