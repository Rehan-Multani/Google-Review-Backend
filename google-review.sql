-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: tramway.proxy.rlwy.net:43491
-- Generation Time: Apr 29, 2025 at 02:28 PM
-- Server version: 9.2.0
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `railway`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `qr_code_id` int DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int NOT NULL,
  `business_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `business_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `image` varchar(500) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `business_name`, `business_type`, `first_name`, `last_name`, `location`, `email`, `password`, `status`, `image`) VALUES
(1, 'ABC Company', NULL, 'Jhon', 'doe', 'test', 'company@gmail.com', '$2b$10$sdnA1mw4N1rPimdUbE5S7.Q/0Dxlu5Awkl0otUOGW.IrM5ilDnary', '1', 'https://res.cloudinary.com/du4xmywbv/image/upload/v1745059273/dfc4fed9-6860-4843-86d3-465f452960bd_j9icd0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `id` int NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `notes` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `google_business`
--

CREATE TABLE `google_business` (
  `id` int NOT NULL,
  `google_business_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `qr_code_url` text COLLATE utf8mb4_general_ci,
  `banner_url` text COLLATE utf8mb4_general_ci NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int NOT NULL,
  `group_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `description`) VALUES
(2, 'admin', 'Can manage users and settings but with limited access compared to superadmin.'),
(3, 'company', 'Represents a company-level group with access to relevant modules.');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int NOT NULL,
  `plan_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `month_duration` int NOT NULL,
  `num_establishments` int DEFAULT '1',
  `free_trial_days` int DEFAULT '0',
  `plan_details` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_id` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
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
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `language` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `headline` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `business_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `footer` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `qr_color` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `offer` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `place_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `qr_code_id` int NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `feedback` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rating` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `image` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review_analysis`
--

CREATE TABLE `review_analysis` (
  `id` bigint UNSIGNED NOT NULL,
  `problems` text COLLATE utf8mb4_general_ci,
  `sentiment` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `solutions` text COLLATE utf8mb4_general_ci,
  `user_id` int DEFAULT NULL,
  `review_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `qr_code_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review_customization`
--

CREATE TABLE `review_customization` (
  `id` int NOT NULL,
  `rating_count` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review_customization`
--

INSERT INTO `review_customization` (`id`, `rating_count`, `created_at`) VALUES
(1, '4', '2025-04-23 10:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `review_survey`
--

CREATE TABLE `review_survey` (
  `id` int NOT NULL,
  `survey_review` text COLLATE utf8mb4_general_ci,
  `user_id` int DEFAULT NULL,
  `qr_code_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `group_id` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `image` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `googleBusinessProfile` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `group_id`, `status`, `image`, `googleBusinessProfile`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2a$12$L1oS.Dmt3yGrAYxRFpOoeuBC/LmehCq9oM77wamQszJEUxDdg4kri', '0000000000', '2', '1', 'https://res.cloudinary.com/du4xmywbv/image/upload/v1745059273/dfc4fed9-6860-4843-86d3-465f452960bd_j9icd0.jpg', '', '2025-04-22 07:03:03', '2025-04-28 07:01:26');

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
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_analysis`
--
ALTER TABLE `review_analysis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_customization`
--
ALTER TABLE `review_customization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_survey`
--
ALTER TABLE `review_survey`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `google_business`
--
ALTER TABLE `google_business`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `qr_code`
--
ALTER TABLE `qr_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review_analysis`
--
ALTER TABLE `review_analysis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review_customization`
--
ALTER TABLE `review_customization`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `review_survey`
--
ALTER TABLE `review_survey`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
