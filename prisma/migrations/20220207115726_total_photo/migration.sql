/*
  Warnings:

  - Added the required column `totalPhoto` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hashtag" ADD COLUMN     "totalPhoto" INTEGER NOT NULL;
