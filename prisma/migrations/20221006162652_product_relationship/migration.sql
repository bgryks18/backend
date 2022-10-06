/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_posterId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_sliderId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `categoryId` INTEGER NULL,
    MODIFY `sliderId` INTEGER NULL,
    MODIFY `posterId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_categoryId_key` ON `Product`(`categoryId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sliderId_fkey` FOREIGN KEY (`sliderId`) REFERENCES `Slider`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `ProductImage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
