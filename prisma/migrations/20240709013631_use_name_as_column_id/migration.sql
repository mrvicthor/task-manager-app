/*
  Warnings:

  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Column` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `columnId` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Add the 'name' column to the 'Board' table if it does not exist
-- ALTER TABLE "Board" ADD COLUMN IF NOT EXISTS "name" TEXT;

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Column" DROP CONSTRAINT "Column_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "columnId",
ADD COLUMN     "columnId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Column_name_key" ON "Column"("name");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
