CREATE TABLE `rooms` (
  `id` int(100) NOT NULL,
  `numero` int(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `valor` int(100) NOT NULL
) 

ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;