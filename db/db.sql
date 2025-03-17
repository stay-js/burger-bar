CREATE DATABASE IF NOT EXISTS `burger-bar`
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE `burger-bar`;

DROP TABLE IF EXISTS `table-reservation`;

CREATE TABLE `table-reservation` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `people` int NOT NULL,
  CONSTRAINT `table-reservation_id` PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(256) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(512) NOT NULL,
  `image` varchar(256) NOT NULL,
  CONSTRAINT `menu_id` PRIMARY KEY(`id`)
);
