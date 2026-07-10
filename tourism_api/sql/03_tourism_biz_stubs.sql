-- Tourism template business stubs (empty tables so scheduled jobs / pages do not 500)
-- Not full OTA schema — only columns referenced by current entities / timers.

CREATE TABLE IF NOT EXISTS `biz_plan` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_order` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `spot_id` varchar(64) DEFAULT NULL,
  `ticket_id` varchar(64) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `ext_json` longtext,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_ticket` (
  `id` varchar(64) NOT NULL,
  `spot_id` varchar(64) DEFAULT NULL,
  `ticket_name` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `inventory_count` int DEFAULT 0,
  `max_inventory` int DEFAULT 0,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_comment` (
  `id` varchar(64) NOT NULL,
  `spot_id` varchar(64) DEFAULT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `order_id` varchar(64) DEFAULT NULL,
  `content` text,
  `score` double DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_history` (
  `id` varchar(64) NOT NULL,
  `spot_id` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `tracing_time` datetime DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_activitie` (
  `id` varchar(64) NOT NULL,
  `spot_id` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `cover` json DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_recommend` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `cover` json DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_heritage` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `cover` json DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_strategy` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `cover` json DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `biz_user_ticket` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `ticket_id` varchar(64) DEFAULT NULL,
  `order_id` varchar(64) DEFAULT NULL,
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- C-end user table used by tourism template (distinct from Snowy CLIENT_USER)
CREATE TABLE IF NOT EXISTS `biz_user` (
  `id` varchar(64) NOT NULL,
  `account` varchar(64) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `nickname` varchar(64) DEFAULT NULL,
  `avatar` longtext,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `user_status` varchar(32) DEFAULT 'ENABLE',
  `delete_flag` varchar(32) DEFAULT 'NOT_DELETE',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
