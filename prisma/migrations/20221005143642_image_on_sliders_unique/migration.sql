/*
  Warnings:

  - A unique constraint covering the columns `[sliderId]` on the table `ImagesOnSliders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `ImagesOnSliders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ImagesOnSliders_sliderId_key` ON `ImagesOnSliders`(`sliderId`);

-- CreateIndex
CREATE UNIQUE INDEX `ImagesOnSliders_imageId_key` ON `ImagesOnSliders`(`imageId`);
