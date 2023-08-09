/*
  Warnings:

  - You are about to drop the column `complete` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "complete",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
