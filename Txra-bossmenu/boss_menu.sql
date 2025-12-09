CREATE TABLE IF NOT EXISTS `society_funds` (
  `job_name` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`job_name`)
);

CREATE TABLE IF NOT EXISTS `employee_data` (
  `citizenid` varchar(50) NOT NULL,
  `job_name` varchar(50) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `wings` longtext DEFAULT '[]', 
  PRIMARY KEY (`citizenid`, `job_name`)
);

CREATE TABLE IF NOT EXISTS `boss_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(50) DEFAULT NULL,
  `executor_name` varchar(100) DEFAULT NULL,
  `action_type` varchar(50) DEFAULT NULL, 
  `amount` int(11) DEFAULT 0,
  `details` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT IGNORE INTO `society_funds` (`job_name`, `amount`) VALUES ('police', 50000);
INSERT IGNORE INTO `society_funds` (`job_name`, `amount`) VALUES ('ambulance', 50000);