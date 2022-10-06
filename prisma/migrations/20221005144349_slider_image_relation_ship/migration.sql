/*
  Warnings:

  - You are about to drop the `ImagesOnSliders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sliderId` to the `SliderImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ImagesOnSliders` DROP FOREIGN KEY `ImagesOnSliders_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `ImagesOnSliders` DROP FOREIGN KEY `ImagesOnSliders_sliderId_fkey`;

-- AlterTable
ALTER TABLE `SliderImage` ADD COLUMN `sliderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ImagesOnSliders`;

-- AddForeignKey
ALTER TABLE `SliderImage` ADD CONSTRAINT `SliderImage_sliderId_fkey` FOREIGN KEY (`sliderId`) REFERENCES `Slider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
