/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `dateTime`,
    ADD COLUMN `endDateTime` DATETIME(3) NOT NULL,
    ADD COLUMN `startDateTime` DATETIME(3) NOT NULL;
