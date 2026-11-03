CREATE TABLE `device` (
	`cn` text NOT NULL,
	`mac` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `packet` (
	`device_cn` text NOT NULL,
	`type` text NOT NULL,
	`timestamp` integer NOT NULL,
	`payload` text NOT NULL,
	`recieved` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
