/*
  Warnings:

  - Added the required column `last_status` to the `game_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_history" ADD COLUMN     "last_status" TEXT NOT NULL;
