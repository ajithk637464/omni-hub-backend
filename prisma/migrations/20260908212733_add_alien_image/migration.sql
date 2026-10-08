/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Alien` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alien" DROP COLUMN "imageUrl",
ADD COLUMN     "image" BYTEA;
