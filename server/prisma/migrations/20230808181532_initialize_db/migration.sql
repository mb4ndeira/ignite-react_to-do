-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtasks" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subtasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtasks" ADD CONSTRAINT "Subtasks_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
