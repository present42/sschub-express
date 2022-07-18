-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: sschubapp
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
  `color` tinytext,
  `title_color` tinytext,
  `board_type` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,'Second SSC Hub board','78bab06a437d8a6f56ae6d0195b45d91','Arial','undefined','#4545b5',0),(2,'Second SSC Hub board','8d8829f82cb997361795948e7054945f','Arial','undefined','',0);
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
  `message` text,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `submitted_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `parent_board_id` (`parent_board_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`parent_board_id`) REFERENCES `boards` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'A raised line of water that moves across the surface of an area of water, especially the sea:','hyunju','hyunju@connect.abc.com','wave.jpg',1,'2022-04-07 09:40:30','2022-06-06 14:32:18'),(2,1,'Here\'s to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They\'re not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can\'t do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.\n\n','Rob Siltanen','hyunju@connect.abc.com','',2,'2022-04-07 09:47:01','2022-06-06 14:32:20'),(3,1,'Be the change that you wish to see in the world.\n\n','Gandhi','hyunju@connect.abc.com','',1,'2022-04-07 09:47:11','2022-06-06 14:32:24'),(4,1,'For the vertical images, the message would look like this.\n\n','','','cat-vert.jpg',1,'2022-04-07 09:47:21','2022-06-06 14:32:21'),(5,1,'The square photos would look like this on the message board. Here will be the content of the card.\n\n','square ','square@connect.ust.hk','flower-sqr.png',1,'2022-04-07 09:47:30','2022-06-06 14:32:23'),(6,1,'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.\n\n','','','',2,'2022-04-07 09:47:45','2022-06-06 14:32:25'),(7,1,'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.\n\n','','','',2,'2022-04-07 09:48:13','2022-06-06 16:39:14'),(8,1,'','notext ','notext@connect.ust.hk','flower-sqr.png',1,'2022-04-07 09:48:21','2022-06-06 16:39:15'),(9,1,'Here will be the content of the card. Here will be the content of the card.\n\n','hyunju','','cat.jpg',2,'2022-04-07 09:48:28','2022-06-06 16:39:24'),(10,1,'The cat (Felis catus) is a domestic species of a small carnivorous mammal.[1][2] It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.[4]','hyunju','','',1,'2022-04-07 09:48:39','2022-06-06 16:39:25'),(11,1,'Hello world, this is the simple message to test.','George','george@gmail.com',NULL,2,'2022-04-14 10:06:01','2022-06-06 18:14:46'),(12,1,'Hello world this is just a test message :D :D','present42','hkimar@abc.def',NULL,2,'2022-04-14 11:33:42','2022-06-06 18:14:47'),(13,1,'Hello world','george2','abc@def.ghi',NULL,2,'2022-04-21 04:41:28','2022-06-06 18:14:47'),(14,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:43:57','2022-06-06 18:14:48'),(15,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:54:44','2022-06-06 18:14:48'),(16,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:55:58','2022-06-06 18:14:49'),(17,1,NULL,NULL,NULL,NULL,2,'2022-04-21 04:58:18','2022-06-06 18:14:50'),(18,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:00:24','2022-06-06 18:14:50'),(19,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:00:38','2022-06-06 18:14:51'),(20,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:01:16','2022-06-06 18:14:52'),(21,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:19:22','2022-06-06 18:14:52'),(22,1,NULL,NULL,NULL,NULL,2,'2022-04-21 05:23:20','2022-06-06 18:14:53'),(23,1,'hihi','','',NULL,2,'2022-04-21 05:23:47','2022-06-06 18:14:57'),(24,1,'hello world','','',NULL,2,'2022-04-21 05:26:44','2022-06-06 18:14:57'),(25,1,'asdfdbsadb','','',NULL,2,'2022-04-21 05:28:29','2022-06-06 18:14:58'),(26,1,'hihi','','',NULL,2,'2022-04-21 05:29:04','2022-06-06 18:14:59'),(27,1,'ji','','',NULL,2,'2022-04-28 04:27:23','2022-06-06 18:14:59'),(28,1,'test','','',NULL,2,'2022-04-28 04:32:44','2022-06-06 18:15:00'),(29,1,'test','','',NULL,2,'2022-04-28 04:49:54','2022-06-06 18:15:00'),(30,1,'test','','','a0b43be0b988a47093dd0adb650403ef',2,'2022-04-28 05:55:21','2022-06-06 18:15:01'),(31,1,'Hello this is GG this is a test to check whether the image is well submitted or not','Baboon','abc@connect.ust.hk','dc8803d5318f5a749b19136e4184003a',1,'2022-06-06 11:57:02','2022-06-06 14:56:31'),(32,1,'Annyeonghaseyo, bangapseupnida','Barbara','barbara@connect.ust.hk','0f91f1830949240cbed4092670ebeb46',1,'2022-06-06 15:57:12','2022-06-06 18:15:04'),(33,2,'Greetings! We are excited to welcome you back on campus on September 1st.','barbara','barbara@connect.ust.hk','144c4c7b1ddf588b88505c56a401c087',1,'2022-06-06 15:59:39','2022-06-06 16:00:02'),(34,1,'Wow this seems great','Hi','mirro@abc.def','7c2cebe3a81d0785f34b75e94a9744b1',1,'2022-06-06 17:36:44','2022-06-06 17:37:07'),(35,1,'','SCAN ME','scanme@scan.me','fb50bfa1ecc30c7d0d05302a6367333c',1,'2022-06-06 17:46:52','2022-06-06 18:15:07'),(36,1,'Hello, this is a test message to check the toast message which is to be shown after the post is submitted.','this is not a toast','toast@toast.com','1936e2ccf4e3b49510ee098419789daf',1,'2022-06-06 17:59:20','2022-06-06 18:15:09'),(37,1,'Test','LL','','b26a691f4a840c1140b82d1f081bb891',1,'2022-06-08 02:15:43','2022-06-08 02:16:26'),(38,1,'I love SSC❤️','Wendy','cewendy@ust.hk','ad238e3fe8dedc2e79c57e017b1d12c7',1,'2022-06-08 02:15:48','2022-06-08 02:18:35'),(39,1,'Hello world 안녕하세요','Elephant','elephant@ust.hk','3b4888a03546017816e35c77a4e9d538',1,'2022-07-17 17:39:54','2022-07-17 17:40:21'),(40,1,'hi','hihi','hi@a.b',NULL,0,'2022-07-17 17:47:42',NULL),(41,1,'Oh','Oh','oj@n.n',NULL,0,'2022-07-17 17:48:00',NULL);
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

-- Dump completed on 2022-07-18 11:45:21
