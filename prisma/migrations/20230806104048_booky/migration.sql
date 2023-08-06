/*
  Warnings:

  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('all', 'health', 'environment', 'IT', 'novels');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "category" "Category" NOT NULL;
