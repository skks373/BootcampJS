-- DropForeignKey
ALTER TABLE `games` DROP FOREIGN KEY `games_uid_fkey`;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
