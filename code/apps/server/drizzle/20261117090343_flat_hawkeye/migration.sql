PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tool` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`epc` text,
	CONSTRAINT `fk_tool_epc_tag_epc_fk` FOREIGN KEY (`epc`) REFERENCES `tag`(`epc`)
);
--> statement-breakpoint
INSERT INTO `__new_tool`(`id`, `name`, `description`, `createdAt`, `epc`) SELECT `id`, `name`, `description`, `createdAt`, `epc` FROM `tool`;--> statement-breakpoint
DROP TABLE `tool`;--> statement-breakpoint
ALTER TABLE `__new_tool` RENAME TO `tool`;--> statement-breakpoint
PRAGMA foreign_keys=ON;