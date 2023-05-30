/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `_AuthorToBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AuthorToBook` DROP FOREIGN KEY `_AuthorToBook_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AuthorToBook` DROP FOREIGN KEY `_AuthorToBook_B_fkey`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `author`;

-- DropTable
DROP TABLE `_AuthorToBook`;

-- CreateTable
CREATE TABLE `AuthorToBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthorToBook` ADD CONSTRAINT `AuthorToBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorToBook` ADD CONSTRAINT `AuthorToBook_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
