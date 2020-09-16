-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 16, 2020 at 10:08 AM
-- Server version: 8.0.21-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myhomedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `vocab`
--

CREATE TABLE `vocab` (
  `id` mediumint NOT NULL,
  `vocab` varchar(50) NOT NULL,
  `part_of_speech` varchar(10) DEFAULT NULL,
  `translation1` varchar(20) NOT NULL,
  `translation2` varchar(20) NOT NULL,
  `translation3` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vocab`
--

INSERT INTO `vocab` (`id`, `vocab`, `part_of_speech`, `translation1`, `translation2`, `translation3`) VALUES
(1, 'abatement', 'n.', '减轻，减少', '', ''),
(2, 'aberrant', 'adj.', '越轨的', '异常的', ''),
(3, 'aberration', 'n.', '越轨', '', ''),
(4, 'abet', 'v.', '教唆', '鼓励，帮助', ''),
(5, 'abeyance', 'n.', '中止，搁置', '', ''),
(6, 'abhor', 'v.', '憎恨，厌恶', '', ''),
(7, 'ablaze', 'adj.', '着火的，燃烧的', '闪耀的', ''),
(8, 'abstain', 'v.', '禁绝，放弃', '', ''),
(9, 'abstruse', 'adj.', '难懂的，深奥的', '', ''),
(10, 'absurd', 'adj.', '荒谬的，可笑的', '', ''),
(11, 'abut', 'v.', '邻接，毗邻', '', ''),
(12, 'abysmal', 'adj.', '极深的', '糟透的', ''),
(13, 'accede', 'v.', '同意', '', ''),
(14, 'accentuate', 'v.', '强调', '重读', ''),
(15, 'accommodate', 'v.', '与～一致', '提供住宿', '顺应，使适应'),
(16, 'accomplice', 'n.', '共犯，同谋', '', ''),
(17, 'accredit', 'v.', '授权', '', ''),
(18, 'acerbic', 'adj.', '尖酸的', '刻薄的', ''),
(19, 'acquiescence', 'n.', '默许', '', ''),
(20, 'acquiescent', 'n.', '默认的', '', ''),
(21, 'acolyte', 'n.', '（教士的）助手，侍僧', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vocab`
--
ALTER TABLE `vocab`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vocab`
--
ALTER TABLE `vocab`
  MODIFY `id` mediumint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
