/*
  Warnings:

  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/

-- Drop foreign key constraint on Task table
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Column" DROP CONSTRAINT IF EXISTS "Column_pkey" CASCADE;

-- Modify the Column table to use ColumnId enum as the primary key
ALTER TABLE "Column" ALTER COLUMN "id" TYPE VARCHAR(255) USING "id"::VARCHAR(255);
ALTER TABLE "Column" ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("id");
-- CreateIndex
CREATE UNIQUE INDEX "Column_id_key" ON "Column"("id");

-- Reapply the foreign key constraints on task table
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column" ("id")