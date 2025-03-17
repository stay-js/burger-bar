CREATE DATABASE IF NOT EXISTS `burger-bar`
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

DROP TABLE IF EXISTS `table-reservation`;

CREATE TABLE `table-reservation` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `people` int NOT NULL
);

CREATE TABLE `menu` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(256) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(512) NOT NULL,
  `image` varchar(256) NOT NULL
);
