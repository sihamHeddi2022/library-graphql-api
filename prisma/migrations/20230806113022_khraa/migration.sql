/*
  Warnings:

  - The values [all] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('health', 'environment', 'IT', 'novels');
ALTER TABLE "Book" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
