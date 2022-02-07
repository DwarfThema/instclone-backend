/*
  Warnings:

  - You are about to drop the column `totalPhoto` on the `Hashtag` table. All the data in the column will be lost.
  - Added the required column `totalPhotos` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "totalPhoto",
ADD COLUMN     "totalPhotos" INTEGER NOT NULL;
