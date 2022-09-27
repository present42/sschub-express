-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: sschubapp
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sschubapp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sschubapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sschubapp`;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `background_img` varchar(100) DEFAULT NULL,
  `font_family` varchar(40) DEFAULT NULL,
  `background_color` tinytext,
  `title_color` tinytext,
  `board_type` int NOT NULL DEFAULT (0),
  `bg_music` varchar(100) DEFAULT NULL,
  `post_colors` text,
  `background_video` varchar(100) DEFAULT NULL,
  `bg_music_extension` tinytext,
  `bg_music_volume` int DEFAULT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,'','a5afdc73fab4716bbf2cd3cd3887f74e','Arial','','rgba(49, 112, 37, 0.84)',1,'67c55835339ba47df27bf74f5f6792ca','rgb(199, 130, 130)  rgb(227, 186, 215)  rgb(230, 194, 193)  rgb(198, 219, 197)  rgb(202, 200, 230)','','audio/mpeg',5),(2,'Second SSC Hub board','66e0199446996ac93db190f9a016a80e','Arial','undefined','',0,NULL,NULL,NULL,NULL,NULL),(3,'New Board123','f7b45a4f3d6ec82497fd62800d9f7089',NULL,'undefined','#e0b6b6',0,NULL,NULL,NULL,NULL,NULL),(4,'New Board 500','f2f95fcc24dbfdc74b32b511964fe0b6',NULL,'','#e6afaf',0,NULL,NULL,NULL,NULL,NULL),(6,'New Board123','a65dd05416856dc71f7f8ada309d39dd',NULL,'','',0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_main_board`
--

DROP TABLE IF EXISTS `current_main_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_main_board` (
  `board_id` int DEFAULT NULL,
  KEY `board_id` (`board_id`),
  CONSTRAINT `current_main_board_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_main_board`
--

LOCK TABLES `current_main_board` WRITE;
/*!40000 ALTER TABLE `current_main_board` DISABLE KEYS */;
INSERT INTO `current_main_board` VALUES (1);
/*!40000 ALTER TABLE `current_main_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `parent_board_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `submitted_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `posts_ibfk_2` (`parent_board_id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`parent_board_id`) REFERENCES `boards` (`board_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'A raised line of water that moves across the surface of an area of water, especially the sea:','hyunju','hyunju@connect.abc.com','wave.jpg',2,'2022-04-07 09:40:30','2022-07-20 03:38:47'),(2,1,'Here\'s to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They\'re not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can\'t do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.\n\n','Rob Siltanen','hyunju@connect.abc.com','',2,'2022-04-07 09:47:01','2022-06-06 14:32:20'),(3,1,'Be the change that you wish to see in the world.\n\n','Gandhi','hyunju@connect.abc.com','',2,'2022-04-07 09:47:11','2022-07-20 03:38:48'),(4,1,'For the vertical images, the message would look like this.\n\n','','','cat-vert.jpg',2,'2022-04-07 09:47:21','2022-07-20 03:38:50'),(5,1,'The square photos would look like this on the message board. Here will be the content of the card.\n\n','square ','square@connect.ust.hk','flower-sqr.png',1,'2022-04-07 09:47:30','2022-06-06 14:32:23'),(6,1,'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.\n\n','','','',2,'2022-04-07 09:47:45','2022-06-06 14:32:25'),(7,1,'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.\n\n','','','',2,'2022-04-07 09:48:13','2022-06-06 16:39:14'),(8,1,'','notext ','notext@connect.ust.hk','flower-sqr.png',2,'2022-04-07 09:48:21','2022-07-20 03:38:52'),(9,1,'Here will be the content of the card. Here will be the content of the card.\n\n','hyunju','','cat.jpg',2,'2022-04-07 09:48:28','2022-06-06 16:39:24'),(10,1,'The cat (Felis catus) is a domestic species of a small carnivorous mammal.[1][2] It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.[4]','hyunju','','',2,'2022-04-07 09:48:39','2022-08-07 20:37:58'),(11,1,'Hello world, this is the simple message to test.','George','george@gmail.com',NULL,2,'2022-04-14 10:06:01','2022-06-06 18:14:46'),(12,1,'Hello world this is just a test message :D :D','present42','hkimar@abc.def',NULL,2,'2022-04-14 11:33:42','2022-06-06 18:14:47'),(13,1,'Hello world','george2','abc@def.ghi',NULL,2,'2022-04-21 04:41:28','2022-06-06 18:14:47'),(14,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:43:57','2022-06-06 18:14:48'),(15,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:54:44','2022-06-06 18:14:48'),(16,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:55:58','2022-06-06 18:14:49'),(17,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:58:18','2022-06-06 18:14:50'),(18,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:00:24','2022-06-06 18:14:50'),(19,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:00:38','2022-06-06 18:14:51'),(20,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:01:16','2022-06-06 18:14:52'),(21,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:19:22','2022-06-06 18:14:52'),(22,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:23:20','2022-06-06 18:14:53'),(23,1,'hihi','','',NULL,2,'2022-04-21 05:23:47','2022-06-06 18:14:57'),(24,1,'hello world','','',NULL,2,'2022-04-21 05:26:44','2022-06-06 18:14:57'),(25,1,'asdfdbsadb','','',NULL,2,'2022-04-21 05:28:29','2022-06-06 18:14:58'),(26,1,'hihi','','',NULL,2,'2022-04-21 05:29:04','2022-06-06 18:14:59'),(27,1,'ji','','',NULL,2,'2022-04-28 04:27:23','2022-06-06 18:14:59'),(28,1,'test','','',NULL,2,'2022-04-28 04:32:44','2022-06-06 18:15:00'),(29,1,'test','','',NULL,2,'2022-04-28 04:49:54','2022-06-06 18:15:00'),(30,1,'test','','','a0b43be0b988a47093dd0adb650403ef',2,'2022-04-28 05:55:21','2022-06-06 18:15:01'),(31,1,'Hello this is GG this is a test to check whether the image is well submitted or not','Baboon','abc@connect.ust.hk','dc8803d5318f5a749b19136e4184003a',1,'2022-06-06 11:57:02','2022-06-06 14:56:31'),(32,1,'Annyeonghaseyo, bangapseupnida','Barbara','barbara@connect.ust.hk','0f91f1830949240cbed4092670ebeb46',1,'2022-06-06 15:57:12','2022-06-06 18:15:04'),(33,2,'Greetings! We are excited to welcome you back on campus on September 1st.','barbara','barbara@connect.ust.hk','144c4c7b1ddf588b88505c56a401c087',1,'2022-06-06 15:59:39','2022-06-06 16:00:02'),(34,1,'Wow this seems great','Hi','mirro@abc.def','7c2cebe3a81d0785f34b75e94a9744b1',1,'2022-06-06 17:36:44','2022-06-06 17:37:07'),(35,1,'','SCAN ME','scanme@scan.me','fb50bfa1ecc30c7d0d05302a6367333c',2,'2022-06-06 17:46:52','2022-07-20 03:38:59'),(36,1,'Hello, this is a test message to check the toast message which is to be shown after the post is submitted.','this is not a toast','toast@toast.com','1936e2ccf4e3b49510ee098419789daf',1,'2022-06-06 17:59:20','2022-06-06 18:15:09'),(37,1,'Test','LL','','b26a691f4a840c1140b82d1f081bb891',1,'2022-06-08 02:15:43','2022-06-08 02:16:26'),(38,1,'I love SSC❤️','Wendy','cewendy@ust.hk','ad238e3fe8dedc2e79c57e017b1d12c7',1,'2022-06-08 02:15:48','2022-06-08 02:18:35'),(39,1,'Hello world 안녕하세요','Elephant','elephant@ust.hk','3b4888a03546017816e35c77a4e9d538',2,'2022-07-17 17:39:54','2022-07-20 03:39:03'),(40,1,'hi','hihi','hi@a.b',NULL,2,'2022-07-17 17:47:42','2022-07-19 19:28:28'),(41,1,'Oh','Oh','oj@n.n',NULL,2,'2022-07-17 17:48:00','2022-07-19 19:28:29'),(43,1,':)','','',NULL,1,'2022-07-20 03:38:00','2022-07-20 03:38:36'),(44,1,'hi im angel','','',NULL,1,'2022-07-20 03:38:02','2022-07-20 03:38:38'),(45,1,'Hello guys! Welcome to our wall:)','Anna','cttan@ust.hk','19b21e0b68c0fa48b9ff67c1a2ba94aa',1,'2022-07-20 03:39:01','2022-07-20 03:39:53'),(46,1,'I love HKUST!','Yan','','f4ee1a44191d58d8f069de27f6390b57',1,'2022-07-20 03:41:03','2022-07-20 04:01:12'),(47,1,'Angel is pretty\r\n','','',NULL,1,'2022-07-20 03:57:33','2022-07-20 04:01:13'),(48,1,'Angel looks like a bulldog ','','',NULL,1,'2022-07-20 03:57:37','2022-07-20 04:01:15'),(49,1,'Angel is pretty','','',NULL,1,'2022-07-20 03:58:47','2022-07-20 04:01:16'),(50,1,'Angel is annoying lol','Angel','cttan@ust.hk','0de78293fef91e87c93b609e744586f6',1,'2022-07-20 03:59:26','2022-07-20 04:01:18'),(51,1,'','','',NULL,2,'2022-07-26 15:03:29','2022-08-01 05:54:03'),(52,1,'This is test for cropping uploaded images.','img crop','defa@slkfaj.esflk','1f4d57c551a9d911c899de56a70b238e',1,'2022-07-26 16:02:15','2022-07-26 16:03:45'),(53,1,'Hello','Sunny Bay','avs@dke.dkd','e68c125cc8e191ca753aeece2fadc77a',1,'2022-07-26 16:06:31','2022-07-26 16:06:47'),(54,1,'Hey This is Anna ;0)','Happy SSC!','yyliuad@connect.ust.hk','01a83970c41ec9cad4c2a3369a355e76',1,'2022-08-01 05:53:27','2022-08-01 05:54:14'),(55,1,'Shine your day','LL','','16c7ce20d94dc8b57e6e9eecb431fd7b',1,'2022-08-01 05:53:56','2022-08-01 05:54:12'),(56,1,'I love SSC🌷','Viv','cttan@ust.hk','a8cb849803b23f6ed48fb4bf14b8585e',1,'2022-08-01 06:00:09','2022-08-01 06:02:03'),(57,1,'Hello ☺☺','George','abc@def.ghi',NULL,1,'2022-08-01 06:23:50','2022-08-07 20:44:19'),(58,1,'Hello','Gg','avs@dke.dkd','69f0fa904f508ea44fb17b7b02e66242',0,'2022-08-01 08:04:50',NULL),(59,1,'Hi','Gg','avs@dke.dkd','9a747dc96381c7880f11d6ee9e44e774',1,'2022-08-01 08:05:17','2022-08-01 08:28:04'),(60,1,'😼😼😾😾💋💋💋','','','4fa0d2f59b276e27dc8ecfa0d3fbaf3a',2,'2022-08-01 08:17:37','2022-08-07 17:06:05'),(61,1,'😱😱','','',NULL,1,'2022-08-01 08:27:32','2022-08-01 08:28:00'),(62,1,'Happy Monday~😊','Yan','','9412b83de47d3f726bad8f6fc75ba5ee',1,'2022-08-08 02:10:58','2022-08-08 02:12:16'),(63,1,'Morning buddies!','Vivian','cttan@ust.hk','d7abd705777006841cf07b662ed141a9',1,'2022-08-08 02:12:07','2022-08-08 02:12:21'),(64,1,'Good morning everyone :3','test','','94e757ece3d6089923db8f242fce82ea',0,'2022-08-08 02:13:07',NULL),(65,1,'hi \' this is check for apostrophe','test','',NULL,1,'2022-08-08 03:15:04','2022-08-08 03:15:29');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','sschubapp','test@test.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-28 21:53:09
