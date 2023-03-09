/*
  Warnings:

  - Added the required column `white_player` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "white_player" INTEGER NOT NULL;
