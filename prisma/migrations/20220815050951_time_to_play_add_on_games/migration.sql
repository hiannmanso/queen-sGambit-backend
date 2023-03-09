/*
  Warnings:

  - Added the required column `rating` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_to_play` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "rating" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "time_to_play" INTEGER NOT NULL;
