/*
  Warnings:

  - You are about to drop the column `address` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `address`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `streetAddress` VARCHAR(191) NULL,
    ADD COLUMN `zip` VARCHAR(191) NULL;
