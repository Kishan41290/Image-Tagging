-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 23, 2016 at 03:48 PM
-- Server version: 5.5.25a
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `imagetag`
--

-- --------------------------------------------------------

--
-- Table structure for table `img_product`
--

CREATE TABLE `img_product` (
  `Id` int(10) UNSIGNED NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `img_product`
--

INSERT INTO `img_product` (`Id`, `Name`, `Description`) VALUES
(1, 'Mouse', 'Test1'),
(2, 'Keyboard', 'Testing2'),
(3, 'Monitor', 'Testing3'),
(4, 'Sony Lcd Monitor', 'testin4');

-- --------------------------------------------------------

--
-- Table structure for table `img_tag`
--

CREATE TABLE `img_tag` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `pic_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pic_x` int(11) NOT NULL,
  `pic_y` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `img_user`
--

CREATE TABLE `img_user` (
  `Id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `pic_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(1000) NOT NULL,
  `visible` enum('false','true') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `img_product`
--
ALTER TABLE `img_product`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `img_tag`
--
ALTER TABLE `img_tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `img_user`
--
ALTER TABLE `img_user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`pic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `img_product`
--
ALTER TABLE `img_product`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `img_tag`
--
ALTER TABLE `img_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `img_user`
--
ALTER TABLE `img_user`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
