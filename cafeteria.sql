-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 23, 2023 at 11:21 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafeteria`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `test` (IN `array` JSON, `user_id` INT, IN `room` INT, IN `notes` VARCHAR(100), IN `order_length` INT)   BEGIN

DECLARE product_id int;
DECLARE productPrice int;
DECLARE quantity varchar(100);

DECLARE order_id int;

DECLARE order_total int;
DECLARE product_total int;

DECLARE counter int;

SET order_total=0;
SET product_total=0;
SET counter=0;

 INSERT INTO total_order (`user_id`,`notes`,`room_number`)  VALUES (user_id,notes,room);
 SET order_id= (SELECT id FROM total_order ORDER BY created_at DESC LIMIT 1);

loop1:LOOP 

IF counter < order_length THEN 

SET product_id=json_extract(array,concat('$[',counter,'].product_id'));
SET productPrice =json_extract(array,concat('$[',counter,'].productPrice'));
SET quantity =json_extract(array,concat('$[',counter,'].quantity'));

SET product_total=(productPrice*quantity);
SET order_total=order_total+product_total;
INSERT INTO order_product (`order_id`,`product_id`,`quantity`,`total_price`) VALUES (order_id,product_id,quantity,product_total);

SET counter = counter +1;
ELSE 
LEAVE loop1;
END IF;
END LOOP loop1;

UPDATE total_order SET `total_price`=order_total WHERE id=order_id;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`) VALUES
(1, 'Hot Drinks', '2023-01-10 21:10:05'),
(2, 'cold', '2023-01-11 16:37:07'),
(3, 'ice', '2023-01-11 16:37:07'),
(5, 'try', '2023-01-22 12:55:25');

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total_price` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `quantity`, `total_price`, `created_at`) VALUES
(1, 1, 1, 10, '2023-01-17 15:51:12'),
(2, 2, 1, 5, '2023-01-17 15:51:12'),
(2, 3, 1, 5, '2023-01-17 15:51:12'),
(3, 4, 2, 10, '2023-01-17 15:51:12'),
(4, 5, 1, 10, '2023-01-17 15:51:12'),
(5, 7, 2, 10, '2023-01-18 18:45:20'),
(6, 1, 1, 10, '2023-01-20 13:50:10'),
(7, 1, 1, 5, '2023-01-20 18:25:23'),
(7, 2, 1, 5, '2023-01-20 13:50:10'),
(8, 3, 1, 5, '2023-01-20 13:50:10'),
(9, 4, 1, 10, '2023-01-20 13:50:10'),
(13, 2, 1, 40, '2023-01-21 01:53:33'),
(14, 2, 1, 40, '2023-01-21 01:54:54'),
(16, 2, 1, 40, '2023-01-21 02:22:22'),
(17, 2, 1, 40, '2023-01-21 02:25:52'),
(18, 2, 1, 40, '2023-01-21 02:26:20'),
(19, 2, 1, 40, '2023-01-21 02:26:20'),
(20, 2, 1, 40, '2023-01-21 02:26:30'),
(21, 2, 1, 40, '2023-01-21 02:26:56'),
(21, 3, 1, 20, '2023-01-21 02:26:56'),
(22, 2, 1, 40, '2023-01-21 02:26:56'),
(22, 3, 1, 20, '2023-01-21 02:26:56'),
(23, 2, 1, 40, '2023-01-21 02:27:03'),
(23, 3, 1, 20, '2023-01-21 02:27:03'),
(24, 3, 1, 20, '2023-01-21 02:41:13'),
(25, 3, 1, 20, '2023-01-21 02:41:20'),
(26, 3, 1, 20, '2023-01-22 08:10:51'),
(26, 6, 1, 5, '2023-01-22 08:10:51'),
(27, 3, 1, 20, '2023-01-22 08:12:11'),
(27, 6, 2, 10, '2023-01-22 08:12:11'),
(28, 3, 4, 80, '2023-01-22 08:13:38'),
(28, 6, 1, 5, '2023-01-22 08:13:38'),
(29, 3, 1, 20, '2023-01-22 08:17:12'),
(29, 6, 1, 5, '2023-01-22 08:17:12'),
(31, 2, 1, 40, '2023-01-22 08:29:43'),
(31, 3, 1, 20, '2023-01-22 08:29:43'),
(32, 3, 1, 20, '2023-01-22 08:49:13'),
(32, 6, 1, 5, '2023-01-22 08:49:13'),
(33, 8, 1, 22, '2023-01-22 08:50:26'),
(34, 4, 1, 200, '2023-01-22 10:44:24'),
(34, 12, 1, 100, '2023-01-22 10:44:24'),
(35, 3, 1, 20, '2023-01-22 10:56:00'),
(37, 3, 1, 20, '2023-01-22 12:20:37'),
(37, 6, 1, 5, '2023-01-22 12:20:37'),
(37, 8, 2, 44, '2023-01-22 12:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL,
  `product_pic` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Available','Not available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category_id`, `price`, `product_pic`, `status`, `created_at`) VALUES
(1, 'hot chocolate', 2, 123, 'hotchocolate.jpg', 'Not available', '2023-01-11 20:29:35'),
(2, 'kiwi', 1, 40, 'kiwi.jpg', 'Not available', '2023-01-15 16:43:12'),
(3, 'ice caramel', 1, 20, 'icecaramel.jpg', 'Not available', '2023-01-15 14:56:22'),
(4, 'icecreem', 3, 200, 'icecrem.jpeg', 'Not available', '2023-01-11 17:27:32'),
(5, 'sahlab', 3, 33, 'sahlab.jpg', 'Not available', '2023-01-13 18:27:01'),
(6, 'tea', 1, 5, 'tea.jpg', 'Not available', '2023-01-10 21:10:27'),
(7, 'orange juice', 2, 100, 'orange.jpg', 'Not available', '2023-01-15 17:04:07'),
(8, 'choclet ice', 1, 22, 'icecrem2.jpeg', 'Not available', '2023-01-16 19:21:53'),
(9, 'strawberry', 1, 12, 'strawberry.jpg', 'Available', '2023-01-16 19:23:33'),
(10, 'coffe', 1, 20, 'cofee.jpg', 'Available', '2023-01-22 01:10:14'),
(11, 'watermelon', 2, 50, 'watermelon.jpg', 'Available', '2023-01-22 01:10:14'),
(12, 'mango', 2, 100, 'mango.jpg', 'Available', '2023-01-22 01:16:43'),
(13, 'redbull', 2, 50, 'redbull.jpg', 'Available', '2023-01-22 01:16:43'),
(14, 'esspresso', 1, 70, 'esspresso.jpeg', 'Available', '2023-01-22 01:21:02'),
(15, 'coffe', 1, 17, 'coffee3.jpg', 'Available', '2023-01-22 01:21:02'),
(16, 'juice', 2, 100, 'coffe.jpg', 'Available', '2023-01-22 12:14:46'),
(17, 'testProduct', 5, 50, '1674392288.jpeg', 'Available', '2023-01-22 12:58:08');

-- --------------------------------------------------------

--
-- Table structure for table `total_order`
--

CREATE TABLE `total_order` (
  `id` int NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `status` enum('Done','Out for delivery','Processing','Cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Processing',
  `total_price` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `total_order`
--

INSERT INTO `total_order` (`id`, `user_id`, `status`, `total_price`, `created_at`, `notes`, `room_number`) VALUES
(1, 4, 'Done', 10, '2023-01-10 21:14:14', 'two spoons of sugar', 0),
(2, 4, 'Done', 10, '2023-01-11 18:03:46', NULL, 0),
(3, 5, 'Done', 10, '2023-01-11 18:04:54', 'sugar', 0),
(4, 6, 'Done', 10, '2023-01-13 14:06:52', 'one', 0),
(5, 7, 'Done', 10, '2023-01-18 18:44:57', NULL, 0),
(6, 6, 'Done', 10, '2023-01-18 13:30:06', NULL, 0),
(7, 4, 'Done', 10, '2023-01-19 13:30:06', NULL, 0),
(8, 5, 'Cancel', 5, '2023-01-19 13:30:06', NULL, 0),
(9, 7, 'Cancel', 10, '2023-01-20 13:30:06', NULL, 0),
(13, 4, 'Cancel', 0, '2023-01-21 01:53:33', 'hello', 200),
(14, 4, 'Done', 40, '2023-01-21 01:54:54', 'hello', 200),
(16, 4, 'Done', 40, '2023-01-21 02:22:22', 'hello', 201),
(17, 4, 'Done', 40, '2023-01-21 02:25:52', 'hello', 200),
(18, 4, 'Done', 40, '2023-01-21 02:26:20', 'hello', 203),
(19, 4, 'Done', 40, '2023-01-21 02:26:20', 'hello', 203),
(20, 4, 'Cancel', 0, '2023-01-21 02:26:30', 'hello', 203),
(21, 4, 'Cancel', 60, '2023-01-21 02:26:56', 'jkwfm', 200),
(22, 4, 'Cancel', 60, '2023-01-21 02:26:56', 'jkwfm', 200),
(23, 4, 'Cancel', 0, '2023-01-21 02:27:03', 'jkwfm', 200),
(24, 4, 'Cancel', 0, '2023-01-21 02:41:13', '', 201),
(25, 4, 'Cancel', 0, '2023-01-21 02:41:20', 'jnd,ms', 201),
(26, 4, 'Processing', 25, '2023-01-22 08:10:51', '', 202),
(27, 4, 'Processing', 30, '2023-01-22 08:12:11', 'ggg', 20),
(28, 4, 'Processing', 85, '2023-01-22 08:13:38', 'ggggg', 204),
(29, 4, 'Processing', 25, '2023-01-22 08:17:12', 'ggggg', 201),
(31, 2, 'Processing', 60, '2023-01-22 08:29:43', '', 20),
(32, 6, 'Done', 25, '2023-01-22 08:49:12', '', 201),
(33, 5, 'Processing', 22, '2023-01-22 08:50:26', '', 201),
(34, 7, 'Done', 300, '2023-01-22 10:44:24', 'alaa', 201),
(35, 4, 'Done', 20, '2023-01-22 10:56:00', '', 201),
(37, 4, 'Processing', 69, '2023-01-22 12:20:37', 'alllll', 200),
(38, 6, 'Processing', 0, '2023-01-22 13:57:51', '', 202);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_pic` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_pic`, `created_at`, `is_admin`) VALUES
(1, 'kareem', 'kareem@admin.com', '123456789', '1.jpg', '2023-01-08 19:56:48', 1),
(2, 'fouad', 'fouad@admin.com', '123456789', '1.jpg', '2023-01-08 19:58:22', 1),
(4, 'ahmed', 'ahmed@gmail.com', '12345678', '4.jpg', '2023-01-10 17:45:31', 0),
(5, 'ali', 'ali@gmail.com', '12345678', 'user.png', '2023-01-10 17:45:31', 0),
(6, 'alaa', 'alaa@gmail.com', '12345678', '4.jpg', '2023-01-10 17:45:31', 0),
(7, 'toka', 'toka1@gmail.com', '12345678', '5.png', '2023-01-10 17:45:31', 0),
(75, 'Ayat ', 'Ayat@gmail.com', '12345678', '4.jpg', '2023-01-22 00:49:16', 0),
(76, 'saber', 'saber@gmail.com', '12345678', '1674348864.jpeg', '2023-01-22 00:54:24', 0),
(77, 'sayed', 'sayedsafwat@gmail.com', '12345678', '1674390552.jpeg', '2023-01-22 12:29:12', 0),
(78, 'alaa111', 'alaa111@gmail.com', '1211', '1674390804.png', '2023-01-22 12:33:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_room`
--

CREATE TABLE `user_room` (
  `id` int NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `Room_number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_room`
--

INSERT INTO `user_room` (`id`, `user_id`, `Room_number`) VALUES
(1, 4, 200),
(2, 5, 201),
(3, 6, 202),
(4, 7, 204),
(5, 75, 199),
(6, NULL, 50),
(7, 76, 20),
(8, 77, 35),
(9, 78, 60);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `total_order`
--
ALTER TABLE `total_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_room`
--
ALTER TABLE `user_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `total_order`
--
ALTER TABLE `total_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `user_room`
--
ALTER TABLE `user_room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `total_order` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `total_order`
--
ALTER TABLE `total_order`
  ADD CONSTRAINT `total_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Constraints for table `user_room`
--
ALTER TABLE `user_room`
  ADD CONSTRAINT `user_room_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
