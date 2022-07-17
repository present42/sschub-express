create table `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    PRIMARY KEY(`id`)
)
INSERT INTO `users` (`id`, `username`, `password`, `email`)
VALUES (1, 'admin', 'sschubapp', 'test@test.com');