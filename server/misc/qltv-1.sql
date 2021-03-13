-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 12, 2021 lúc 05:18 PM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

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
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `name`, `email`, `phone`, `role_id`, `isBlock`, `created_at`, `updated_at`) VALUES
(1, 'user1', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn A', 'NV12@gmail.com', '0123456789', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'user2', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn B', 'NV12@gmail.com', '0123456789', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'user3', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn C', 'NV12@gmail.com', '0123456789', 3, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'user4', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn D', 'NV12@gmail.com', '0123456789', 4, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'user5', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn E', 'NV12@gmail.com', '0123456789', 5, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'user6', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn F', 'NV12@gmail.com', '0123456789', 6, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'user7', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn G', 'NV12@gmail.com', '0123456789', 6, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'user8', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn H', 'NV12@gmail.com', '0123456789', 1, 0, '0000-00-00 00:00:00', '2021-03-12 09:08:03'),
(9, 'user9', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn I', 'NV12@gmail.com', '0123456789', 5, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'user10', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn K', 'NV12@gmail.com', '0123456789', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'user11', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn L', 'NV12@gmail.com', '0123456789', 3, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'user12', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn N', 'NV12@gmail.com', '0123456789', 4, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'user13', '202cb962ac59075b964b07152d234b70', 'Nguyễn Văn M', 'NV12@gmail.com', '0123456789', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'test20', '202cb962ac59075b964b07152d234b70', 'test', 'test', 'test', 5, 0, '2021-01-23 03:44:24', '0000-00-00 00:00:00'),
(33, 'test11111', '202cb962ac59075b964b07152d234b70', 'test', 'test', 'test', 1, 0, '2021-01-23 04:15:49', '2021-01-23 04:15:49'),
(35, 'user', '3979f7f001b2962787ccc75f394b7689', 'qwe', 'qw', 'eqwe', 1, 0, '2021-03-04 11:36:00', '0000-00-00 00:00:00'),
(36, 'asas', 'f970e2767d0cfe75876ea857f92e319b', 'asa', 'as', 'as', 1, 0, '2021-03-04 11:37:09', '0000-00-00 00:00:00');

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
  `image` varchar(100) DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `view` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `book_title`
--

INSERT INTO `book_title` (`id`, `name`, `author`, `quantity`, `category_id`, `image`, `description`, `created_at`, `updated_at`, `view`) VALUES
(1, 'Lịch sử 6', 'Bộ GD & DT', 3, 1, 'lichsu6.jpg', 'Lịch sử dạy con dân học sử', '2021-02-10 17:09:37', '2021-03-05 11:18:47', 242),
(2, 'Câu lạc bộ số 7', 'DI LI', 3, 6, '7caulacbo.jfif', 'Sách trinh thám đình đám', '2021-02-09 17:09:50', '2021-03-05 11:18:47', 20),
(3, 'Cẩm nang văn hóa Nhật Bản', 'Dịch giả', 3, 3, 'camnangdulichnhatban.jpg', 'Sách test 3', '2021-02-02 17:09:53', '2021-03-05 11:18:47', 2),
(4, 'Cẩm nang du dịch châu Âu', 'Dịch giả', 91, 4, 'camnangdulichchauau.jfif', 'Sách test 4 ', '2021-02-01 18:35:13', '2021-03-12 08:07:20', 77),
(5, 'Bleach', 'Kubo Tite', 93, 5, 'bleach.jpg', 'Hãy cùng phiêu lưu với thần chết', '2021-03-01 18:35:44', '0000-00-00 00:00:00', 0),
(6, 'Ngữ văn 12', 'Bộ GD & DT', 1, 1, 'nguvan12.jpg', 'Văn học là cái gốc của nhân dân', '2021-02-03 18:03:42', '2021-03-05 11:18:45', 139),
(7, 'Lịch sử Việt nam', 'CLB Lịch sử', 2, 8, 'lichsuvietnam.jfif', 'Dân ta phải biết sử ta', '2021-03-01 18:36:05', '2021-03-05 11:18:47', 39),
(8, 'Đạo Phật huyền diệu', 'Phật tử  Thiếu Lâm tự', 3, 7, 'phat-giao1-511x708.jpg', 'Sách test 8', '2021-03-01 18:36:11', '0000-00-00 00:00:00', 0),
(11, 'Naruto', 'Kishimoto', 5, 5, 'naruto.jpg', 'Bộ truyện tranh gắn liền với tuổi thơ', '2021-03-01 18:36:25', '0000-00-00 00:00:00', 0),
(12, 'Sinh học 6', 'Bộ GD & DT', 5, 1, 'sinhhoc6.jfif', 'Sinh học là nguồn gốc vạn vật', '2021-03-01 18:36:29', '0000-00-00 00:00:00', 3),
(13, 'Cẩm nang du lịch Trung Quốc', 'Dịch giả', 5, 4, 'camnangdulichtrungquoc.jfif', 'Cẩm nang vô cùng hữu ích dành cho du lịch Trung Quốc', '2021-03-01 18:36:31', '0000-00-00 00:00:00', 2),
(14, 'Công nghệ', '', 3, 2, 'congnghe.jpg', 'Giỏi việc nước, đảm việc nhà', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(17, 'One piece', 'Echiro Oda', 5, 2, 'manga-plus-featured-887x581.jpg', 'Bộ truyện tranh huyền thoại', '2021-03-01 18:39:55', '0000-00-00 00:00:00', 2),
(18, 'Khoa học & xã hội', 'Bộ GD & DT', 5, 1, 'KHXH.jpg', 'Khoa học là khóa học khám phá thế giới', '2021-03-01 18:42:32', '0000-00-00 00:00:00', 5),
(19, 'test', '', 0, 2, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(20, 'Giải tích 9', 'Bộ GD & DT', 3, 1, 'gt99.jpg', 'Toán học cho thi chuyển cấp', '2021-03-01 19:06:06', '0000-00-00 00:00:00', 6),
(21, 'Giải tích 10', 'Bộ GD & DT', 4, 1, 'gt10.jpg', 'Toán học là nền tảng của thế giới', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(22, 'Lạc vào thế giới sinh học', 'Adam Larkurn', 55, 2, 'lacvaothegioisinhhoc.jpg', 'Tận hưởng cuộc phiêu lưu kỳ thú ở thế giới động vật', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(23, 'Ngữ văn 11', 'Bộ GD & DT', 5, 1, 'ngu-van-lop-11.jpg', 'Dạy con dân Việt Nam yêu văn học, yêu nguồn gốc dân tộc', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(24, 'Ngữ văn 9', 'Bộ GD & DT', 6, 1, 'ngu-van-lop-9.jpg', 'Văn học là điều kì diệu', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(26, 'Ngữ văn 7', 'Bộ GD & DT', 4, 1, 'ngu-van-lop-7.jpg', 'Văn học là học văn', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `borrowing_card`
--

CREATE TABLE `borrowing_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `card_id` varchar(50) NOT NULL,
  `reader_id` int(11) DEFAULT NULL,
  `returned_date` date DEFAULT NULL,
  `borrowed_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `borrowing_card`
--

INSERT INTO `borrowing_card` (`id`, `card_id`, `reader_id`, `returned_date`, `borrowed_date`, `created_at`, `updated_at`) VALUES
(20, 'BR-1613453417747', 30, '2021-02-16', '2021-02-16 12:30:17', '2021-02-16 12:30:17', '0000-00-00 00:00:00'),
(21, 'BR-1613453436630', 30, '2021-02-16', '2021-02-16 12:30:36', '2021-02-16 12:30:36', '0000-00-00 00:00:00'),
(22, 'BR-1613454879503', 30, '2021-02-16', '2021-02-16 12:54:39', '2021-02-16 12:54:39', '0000-00-00 00:00:00'),
(28, 'BR-1615532114732', 5, '2021-03-14', '2021-03-12 00:00:00', '2021-03-12 00:00:00', '0000-00-00 00:00:00'),
(30, 'BR-1615537399736', 5, '2021-03-14', '2021-03-12 00:00:00', '2021-03-12 00:00:00', '0000-00-00 00:00:00'),
(31, 'BR-1615544235998', 2, '2021-03-18', '2021-03-12 00:00:00', '2021-03-12 00:00:00', '0000-00-00 00:00:00'),
(32, 'BR-1615544263416', 2, '2021-03-21', '2021-03-12 00:00:00', '2021-03-12 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `borrowing_card_book`
--

CREATE TABLE `borrowing_card_book` (
  `id` int(11) UNSIGNED NOT NULL,
  `borrowing_card_id` varchar(50) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `borrowing_card_book`
--

INSERT INTO `borrowing_card_book` (`id`, `borrowing_card_id`, `book_id`, `created_at`, `updated_at`) VALUES
(25, 'BR-1613453417747', 4, '2021-02-16', '0000-00-00'),
(26, 'BR-1613453417747', 5, '2021-02-16', '0000-00-00'),
(27, 'BR-1613453436630', 4, '2021-02-16', '0000-00-00'),
(28, 'BR-1613454879503', 4, '2021-02-16', '0000-00-00'),
(29, 'BR-1613454879503', 5, '2021-02-16', '0000-00-00'),
(39, 'BR-1615532114732', 4, '2021-03-12', '0000-00-00'),
(40, 'BR-1615537399736', 4, '2021-03-12', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Giáo dục', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Sinh học', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Văn hóa', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Du lịch', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Truyện tranh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Trinh thám', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Tôn giáo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Lịch sử', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Khoa học', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Môi trường', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Chính trị', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `Comment` varchar(1000) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `BookID` int(11) NOT NULL,
  `Created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `Comment`, `AccountID`, `BookID`, `Created`) VALUES
(235, 'qwe', 1, 18, '2021-03-12 06:33:01'),
(236, 'qwe', 1, 18, '2021-03-12 06:33:30'),
(237, 'qwe', 1, 18, '2021-03-12 06:33:31'),
(238, 'wqe', 1, 18, '2021-03-12 06:33:32'),
(239, 'qwe', 1, 18, '2021-03-12 06:33:32'),
(240, 'qwe', 1, 18, '2021-03-12 06:33:33'),
(241, 'qwe', 1, 6, '2021-03-12 06:34:30'),
(242, 'qwe', 1, 6, '2021-03-12 06:34:31'),
(243, 'qwe', 1, 6, '2021-03-12 06:34:32'),
(244, 'qwe', 1, 6, '2021-03-12 06:34:33'),
(245, 'qwe', 1, 6, '2021-03-12 06:34:33'),
(246, 'qwe', 1, 6, '2021-03-12 06:34:34'),
(247, 'wqe', 1, 6, '2021-03-12 06:34:34'),
(248, 'qwe', 1, 6, '2021-03-12 06:34:35'),
(249, 'qwe', 1, 6, '2021-03-12 06:34:35'),
(250, 'qwe', 1, 6, '2021-03-12 06:34:36'),
(251, 'qweqwe', 1, 6, '2021-03-12 06:34:37'),
(252, 'qwe', 1, 6, '2021-03-12 06:34:38'),
(253, 'e', 1, 6, '2021-03-12 06:34:39'),
(254, 'wqe', 1, 6, '2021-03-12 06:34:40'),
(255, 'qwe', 1, 6, '2021-03-12 06:34:41'),
(256, 'wqe', 1, 6, '2021-03-12 06:34:41'),
(257, 'wqe', 1, 6, '2021-03-12 06:34:42'),
(258, 'wqe', 1, 6, '2021-03-12 06:34:43'),
(259, 'qwe', 1, 6, '2021-03-12 06:34:43'),
(260, 'qwe', 1, 6, '2021-03-12 06:34:44'),
(261, 'qwe', 1, 6, '2021-03-12 06:34:44'),
(262, 'qwe', 1, 6, '2021-03-12 06:34:45'),
(263, 'qwe', 1, 6, '2021-03-12 06:34:46'),
(264, 'e', 1, 6, '2021-03-12 06:34:46'),
(265, 'qwe', 1, 6, '2021-03-12 06:34:49'),
(266, 'wqe', 1, 6, '2021-03-12 06:34:50'),
(267, 'wqe', 1, 6, '2021-03-12 06:34:50'),
(268, 'wqe', 1, 6, '2021-03-12 06:34:51'),
(269, 'qwe', 1, 6, '2021-03-12 06:34:52'),
(270, 'wqe', 1, 6, '2021-03-12 06:34:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `infor_register_reader`
--

CREATE TABLE `infor_register_reader` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `content_register` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `infor_register_reader`
--

INSERT INTO `infor_register_reader` (`id`, `account_id`, `content_register`) VALUES
(1, 6, 'sinh viên KHTN'),
(2, 7, 'sinh viên KHTN 2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reader_card`
--

CREATE TABLE `reader_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `card_id` varchar(50) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `expirated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `reader_card`
--

INSERT INTO `reader_card` (`id`, `card_id`, `account_id`, `created_date`, `expirated_date`) VALUES
(1, 'RDCA-123456', 30, '2021-02-16 12:57:05', '2022-02-16 00:00:00'),
(2, 'RDCA-123457', 5, '2021-03-01 19:18:42', '2022-02-16 12:57:05'),
(6, 'RDCA-161555', 9, '2021-03-12 07:45:04', '2022-03-12 07:45:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `returning_card`
--

CREATE TABLE `returning_card` (
  `id` int(11) UNSIGNED NOT NULL,
  `borrowing_card_id` varchar(50) DEFAULT NULL,
  `penalty_cost` float DEFAULT NULL,
  `returned_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `returning_card`
--

INSERT INTO `returning_card` (`id`, `borrowing_card_id`, `penalty_cost`, `returned_at`, `created_at`, `updated_at`) VALUES
(1, 'BR-1613454879503', 0, '2021-03-04 19:20:59', '2021-03-04 19:21:04', '0000-00-00 00:00:00'),
(3, 'BR-1615537399736', 0, '2021-03-12 00:00:00', '2021-03-12 00:00:00', '0000-00-00 00:00:00');

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
-- Chỉ mục cho bảng `book_title`
--
ALTER TABLE `book_title`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `book_title` ADD FULLTEXT KEY `author` (`author`,`name`);

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
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `infor_register_reader`
--
ALTER TABLE `infor_register_reader`
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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `book_title`
--
ALTER TABLE `book_title`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT cho bảng `borrowing_card`
--
ALTER TABLE `borrowing_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `borrowing_card_book`
--
ALTER TABLE `borrowing_card_book`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- AUTO_INCREMENT cho bảng `infor_register_reader`
--
ALTER TABLE `infor_register_reader`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `reader_card`
--
ALTER TABLE `reader_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `returning_card`
--
ALTER TABLE `returning_card`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
