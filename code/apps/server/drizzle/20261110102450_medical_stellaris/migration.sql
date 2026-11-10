CREATE TABLE `packet_tag` (
	`epc` text NOT NULL,
	`packet_id` text NOT NULL,
	CONSTRAINT `packet_tag_pk` PRIMARY KEY(`epc`, `packet_id`),
	CONSTRAINT `fk_packet_tag_epc_tag_epc_fk` FOREIGN KEY (`epc`) REFERENCES `tag`(`epc`),
	CONSTRAINT `fk_packet_tag_packet_id_packet_id_fk` FOREIGN KEY (`packet_id`) REFERENCES `packet`(`id`)
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`epc` text PRIMARY KEY,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tool` (
	`name` text PRIMARY KEY
);
--> statement-breakpoint
ALTER TABLE `device` RENAME COLUMN `mac` TO `fingerprint`;--> statement-breakpoint
ALTER TABLE `packet` ADD `id` text;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_packet` (
	`id` text PRIMARY KEY,
	`device_cn` text NOT NULL,
	`type` text NOT NULL,
	`timestamp` integer NOT NULL,
	`payload` text NOT NULL,
	`recieved` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_packet`(`device_cn`, `type`, `timestamp`, `payload`, `recieved`) SELECT `device_cn`, `type`, `timestamp`, `payload`, `recieved` FROM `packet`;--> statement-breakpoint
DROP TABLE `packet`;--> statement-breakpoint
ALTER TABLE `__new_packet` RENAME TO `packet`;--> statement-breakpoint
PRAGMA foreign_keys=ON;