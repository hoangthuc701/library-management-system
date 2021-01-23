-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 23, 2021 lúc 08:42 AM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qltv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` char(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `isBlock` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `name`, `email`, `phone`, `role_id`, `isBlock`, `created_at`, `updated_at`) VALUES
(1, 'user1', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(2, 'user2', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(3, 'user3', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(4, 'user4', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(5, 'user5', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(6, 'user6', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(7, 'user7', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(8, 'user8', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(9, 'user9', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(10, 'user10', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(11, 'user11', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(12, 'user12', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00'),
(13, 'user13', '', '', '', '', 0, 0, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) UNSIGNED NOT NULL,
  `book_title_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `book_title_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 0, '0000-00-00', '0000-00-00'),
(2, 2, 0, '0000-00-00', '0000-00-00'),
(3, 2, 0, '0000-00-00', '0000-00-00'),
(4, 3, 0, '0000-00-00', '0000-00-00'),
(5, 1, 0, '0000-00-00', '0000-00-00'),
(6, 5, 0, '0000-00-00', '0000-00-00'),
(7, 1, 0, '0000-00-00', '0000-00-00'),
(8, 7, 0, '0000-00-00', '0000-00-00'),
(9, 8, 0, '0000-00-00', '0000-00-00'),
(10, 3, 0, '0000-00-00', '0000-00-00'),
(11, 5, 0, '0000-00-00', '0000-00-00'),
(12, 4, 0, '0000-00-00', '0000-00-00'),
(13, 5, 0, '0000-00-00', '0000-00-00'),
(14, 6, 0, '0000-00-00', '0000-00-00'),
(15, 7, 0, '0000-00-00', '0000-00-00'),
(16, 1, 0, '0000-00-00', '0000-00-00'),
(17, 3, 0, '0000-00-00', '0000-00-00'),
(18, 8, 0, '0000-00-00', '0000-00-00'),
(19, 4, 0, '0000-00-00', '0000-00-00'),
(20, 5, 0, '0000-00-00', '0000-00-00'),
(21, 8, 0, '0000-00-00', '0000-00-00'),
(22, 4, 0, '0000-00-00', '0000-00-00'),
(23, 2, 0, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_status`
--

CREATE TABLE `book_status` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `book_status`
--

INSERT INTO `book_status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Available', '0000-00-00', '0000-00-00'),
(2, 'Unavailable', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_title`
--

CREATE TABLE `book_title` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `book_title`
--

INSERT INTO `book_title` (`id`, `name`, `author`, `quantity`, `category_id`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Title 1', 'Author A', 3, 1, 'Sách test 1', '0000-00-00', '0000-00-00'),
(2, 'Title 2', 'Author B', 3, 2, 'Sách test 2', '0000-00-00', '0000-00-00'),
(3, 'Title 3', 'Author C', 3, 3, 'Sách test 3', '0000-00-00', '0000-00-00'),
(4, 'Title 4', 'Author D', 3, 3, 'Sách test 4 ', '0000-00-00', '0000-00-00'),
(5, 'Title 5', 'Author E', 4, 5, 'Sách test 5', '0000-00-00', '0000-00-00'),
(6, 'Title 6', 'Author F', 1, 5, 'Sách test 6', '0000-00-00', '0000-00-00'),
(7, 'Title 7', 'Author G', 2, 7, 'Sách test 7 ', '0000-00-00', '0000-00-00'),
(8, 'Title 8', 'Author H', 3, 7, 'Sách test 8', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `borrowing_card`
--

CREATE TABLE `borrowing_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `card_id` varchar(20) NOT NULL,
  `reader_id` int(11) DEFAULT NULL,
  `returned_date` date DEFAULT NULL,
  `borrowed_date` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `borrowing_card_book`
--

CREATE TABLE `borrowing_card_book` (
  `id` int(11) UNSIGNED NOT NULL,
  `borrowing_card_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Giáo dục', '0000-00-00', '0000-00-00'),
(2, 'Sinh học', '0000-00-00', '0000-00-00'),
(3, 'Văn hóa', '0000-00-00', '0000-00-00'),
(4, 'Du lịch', '0000-00-00', '0000-00-00'),
(5, 'Truyện tranh', '0000-00-00', '0000-00-00'),
(6, 'Trinh thám', '0000-00-00', '0000-00-00'),
(7, 'Tôn giáo', '0000-00-00', '0000-00-00'),
(8, 'Lịch sử', '0000-00-00', '0000-00-00'),
(9, 'Khoa học', '0000-00-00', '0000-00-00'),
(10, 'Môi trường', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ordering_card`
--

CREATE TABLE `ordering_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `card_id` varchar(11) DEFAULT NULL,
  `totalcost` float NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ordering_card_book`
--

CREATE TABLE `ordering_card_book` (
  `id` int(11) UNSIGNED NOT NULL,
  `borrowing_card_id` int(11) DEFAULT NULL,
  `book_title_id` int(11) DEFAULT NULL,
  `cost` float NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reader_card`
--

CREATE TABLE `reader_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `card_id` varchar(20) DEFAULT NULL,
  `identity_number` varchar(50) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `expirated_date` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `returning_card`
--

CREATE TABLE `returning_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `borrowing_card_id` int(11) DEFAULT NULL,
  `penalty_cost` float DEFAULT NULL,
  `returned_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `Name`, `created_at`, `updated_at`) VALUES
(1, 'User', '0000-00-00', '0000-00-00'),
(2, 'Admin', '0000-00-00', '0000-00-00'),
(3, 'Stocker', '0000-00-00', '0000-00-00'),
(4, 'Librarian', '0000-00-00', '0000-00-00'),
(5, 'Reader', '0000-00-00', '0000-00-00'),
(6, 'Awaiting for approval', '0000-00-00', '0000-00-00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book_status`
--
ALTER TABLE `book_status`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book_title`
--
ALTER TABLE `book_title`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `borrowing_card`
--
ALTER TABLE `borrowing_card`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `borrowing_card_book`
--
ALTER TABLE `borrowing_card_book`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reader_card`
--
ALTER TABLE `reader_card`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `returning_card`
--
ALTER TABLE `returning_card`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `book_status`
--
ALTER TABLE `book_status`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `book_title`
--
ALTER TABLE `book_title`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `borrowing_card`
--
ALTER TABLE `borrowing_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `borrowing_card_book`
--
ALTER TABLE `borrowing_card_book`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `reader_card`
--
ALTER TABLE `reader_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `returning_card`
--
ALTER TABLE `returning_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
