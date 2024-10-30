-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2024 at 12:44 PM
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
-- Database: `sotro`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'confirmé',
  `product_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `quantity`, `order_date`, `status`, `product_name`) VALUES
(199, 5, '2024-10-29 21:16:33', 'confirmé', 'Red Label'),
(200, 7, '2024-10-29 21:18:01', 'confirmé', 'Blue Label'),
(201, 3, '2024-10-29 21:18:12', 'confirmé', 'Navy Yard');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `country` enum('Germany','France','US') NOT NULL,
  `category` enum('Whisky','Rhum','Autres') NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `country`, `category`, `description`, `price`, `quantity`, `created_at`) VALUES
(50, 'Red Label', 'uploads/1730217765761-Red-Photoroom.png', 'US', 'Whisky', 'Limited Edition', 220000.00, 120, '2024-10-29 16:02:45'),
(51, 'Blue Label', 'uploads/1730218202687-Bluelab-Photoroom.png', 'US', 'Whisky', 'Limited Edition', 2000000.00, 120, '2024-10-29 16:10:02'),
(52, 'Gold Label', 'uploads/1730218255853-GoldLab-Photoroom.png', 'US', 'Whisky', 'Limited Edition', 1500000.00, 120, '2024-10-29 16:10:55'),
(54, 'Green Label', 'uploads/1730218382225-Greenlab-Photoroom.png', 'US', 'Whisky', 'Limited Edition', 350000.00, 120, '2024-10-29 16:13:02'),
(55, 'Double Black', 'uploads/1730218444865-DoubleBl-Photoroom.png', 'US', 'Whisky', 'Limited Edition', 400000.00, 120, '2024-10-29 16:14:04'),
(56, 'Gentleman Jack D.', 'uploads/1730218558066-JackDaGentl-Photoroom.png', 'Germany', 'Whisky', 'Limited Edition', 1000000.00, 120, '2024-10-29 16:15:58'),
(57, 'Campbeltown Loch', 'uploads/1730218714472-campbeltown-loch-Photoroom.png', 'Germany', 'Whisky', 'Limited Edition', 500000.00, 120, '2024-10-29 16:18:34'),
(58, 'Tomatin 12 Y.o', 'uploads/1730218765658-tomatin-12-ans-43-Photoroom.png', 'France', 'Whisky', 'Limited Edition', 520000.00, 210, '2024-10-29 16:19:25'),
(59, 'Highland Park 12 Y.o', 'uploads/1730218816343-highland-park-12-ans-Photoroom.png', 'France', 'Whisky', 'Limited Edition', 600000.00, 120, '2024-10-29 16:20:16'),
(60, 'Ileach Cask ', 'uploads/1730218872518-ileach-cask-strength-58-Photoroom.png', 'France', 'Whisky', 'Limited Edition', 620000.00, 120, '2024-10-29 16:21:12'),
(61, 'New E. Reserve Rhum', 'uploads/1730218968725-Privateer-Photoroom.png', 'US', 'Rhum', 'Limited Edition', 270000.00, 120, '2024-10-29 16:22:48'),
(62, 'Bayou', 'uploads/1730219127342-Bayou-Photoroom.png', 'US', 'Rhum', 'Limited Edition', 230000.00, 120, '2024-10-29 16:25:27'),
(63, 'Navy Yard', 'uploads/1730219183306-NavyYard-Photoroom.png', 'Germany', 'Rhum', 'Limited Edition', 360000.00, 210, '2024-10-29 16:26:23'),
(64, 'Clement Rhum vieux Agricole', 'uploads/1730219261063-52742_6_m-Photoroom.png', 'France', 'Rhum', 'Limited Edition', 512000.00, 120, '2024-10-29 16:27:41'),
(65, 'Clement Rhum Blanc Agricole', 'uploads/1730219323618-Clement-Photoroom.png', 'France', 'Rhum', 'Limited Edition', 470000.00, 120, '2024-10-29 16:28:43'),
(66, 'Homere Clement', 'uploads/1730219362516-HomereClem-Photoroom.png', 'France', 'Rhum', 'Limited Edition', 530000.00, 210, '2024-10-29 16:29:22'),
(67, 'Amorik', 'uploads/1730219436908-Amorik-Photoroom.png', 'Germany', 'Rhum', 'Limited Edition', 460000.00, 120, '2024-10-29 16:30:36'),
(68, 'Bunnahabain', 'uploads/1730219495261-Bunnahabhain-Photoroom.png', 'Germany', 'Rhum', 'Limited Edition', 450000.00, 130, '2024-10-29 16:31:35'),
(69, 'Boann', 'uploads/1730219533202-Boann-Photoroom.png', 'US', 'Rhum', 'Limited Edition', 620000.00, 120, '2024-10-29 16:32:13'),
(71, 'Dzama Rhum XV', 'uploads/1730221430741-Dzama.png', 'Germany', 'Autres', 'Limited Edition', 510000.00, 210, '2024-10-29 17:03:50'),
(72, 'Vanilla Dzama Rhum', 'uploads/1730221480194-DzamaVanille.png', 'Germany', 'Autres', 'Limited Edition', 620000.00, 210, '2024-10-29 17:04:40'),
(73, 'Cuvée Blanche Prestige', 'uploads/1730221556230-CuvBlanche.png', 'Germany', 'Autres', 'Limited Edition', 102000.00, 210, '2024-10-29 17:05:56'),
(74, 'Cuvée Noire Prestige', 'uploads/1730221597576-CuvNoire.png', 'Germany', 'Autres', 'Limited Edition', 100000.00, 230, '2024-10-29 17:06:37'),
(75, 'Dzama Nosy Be', 'uploads/1730221630876-BNosy.png', 'Germany', 'Autres', 'Limited Edition', 98000.00, 230, '2024-10-29 17:07:10'),
(76, '303 Avoraza', 'uploads/1730221680133-Avoraza.jpg', 'Germany', 'Autres', 'Limited Edition ', 50000.00, 320, '2024-10-29 17:08:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'John Doe', 'john@example.com', 'hashed_password1', '2024-10-19 15:21:49'),
(2, 'Jane Smith', 'jane@example.com', 'hashed_password2', '2024-10-19 15:21:49'),
(3, 'tukgf', 'tojo123@gmail.com', '$2b$10$vOHpaptIQLBxFFKQUi4BKuwByFnZgSIct3TdrcBdpXMWYzGfHNYCS', '2024-10-21 12:38:39'),
(4, 'tojo', 'tojo21@gmail.com', '$2b$10$UepPDZRQ4slu9GljpSVsEeGOsf3r/QiA6aU3HGfz.zTeHeu7V0fyC', '2024-10-21 14:01:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
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
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
