/*
  Warnings:

  - You are about to drop the `Subtasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subtasks" DROP CONSTRAINT "Subtasks_parent_id_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "parent_id" TEXT;

-- DropTable
DROP TABLE "Subtasks";

-- CreateIndex
CREATE INDEX "idx_parent_id" ON "Task"("parent_id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
