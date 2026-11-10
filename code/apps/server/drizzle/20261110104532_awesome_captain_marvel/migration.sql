ALTER TABLE `tool` ADD `id` text;--> statement-breakpoint
ALTER TABLE `tool` ADD `description` text;--> statement-breakpoint
ALTER TABLE `tool` ADD `createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL;--> statement-breakpoint
ALTER TABLE `tool` ADD `epc` text NOT NULL REFERENCES tag(epc);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tool` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`epc` text NOT NULL,
	CONSTRAINT `fk_tool_epc_tag_epc_fk` FOREIGN KEY (`epc`) REFERENCES `tag`(`epc`)
);
--> statement-breakpoint
INSERT INTO `__new_tool`(`name`) SELECT `name` FROM `tool`;--> statement-breakpoint
DROP TABLE `tool`;--> statement-breakpoint
ALTER TABLE `__new_tool` RENAME TO `tool`;--> statement-breakpoint
PRAGMA foreign_keys=ON;