-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SliderImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "sliderId" INTEGER NOT NULL,

    CONSTRAINT "SliderImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "sliderId" INTEGER,
    "posterId" INTEGER,
    "seoTitle" TEXT,
    "seoContent" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "SiteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SliderImage_name_key" ON "SliderImage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Slider_name_key" ON "Slider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_name_key" ON "ProductImage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sliderId_key" ON "Product"("sliderId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_posterId_key" ON "Product"("posterId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteImage_name_key" ON "SiteImage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_logoId_key" ON "Setting"("logoId");

-- AddForeignKey
ALTER TABLE "SliderImage" ADD CONSTRAINT "SliderImage_sliderId_fkey" FOREIGN KEY ("sliderId") REFERENCES "Slider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sliderId_fkey" FOREIGN KEY ("sliderId") REFERENCES "Slider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "SiteImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
