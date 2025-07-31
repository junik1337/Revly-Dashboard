CREATE TABLE `chains` (
	`chain_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `users_vendors` (
	`user_id` integer NOT NULL,
	`vendor_id` integer NOT NULL,
	`display_name` text,
	`is_enabled` integer DEFAULT true,
	`created_at` integer,
	PRIMARY KEY(`user_id`, `vendor_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`vendor_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`vendor_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`longitude` real NOT NULL,
	`latitude` real NOT NULL,
	`chain_id` integer,
	`created_at` integer,
	FOREIGN KEY (`chain_id`) REFERENCES `chains`(`chain_id`) ON UPDATE no action ON DELETE no action
);
