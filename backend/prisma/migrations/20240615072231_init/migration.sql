/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - The values [ELECTRONICS,CLOTHING,BOOKS] on the enum `Product_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `price` INTEGER NOT NULL,
    MODIFY `type` ENUM('electronics', 'clothing', 'books') NOT NULL;
