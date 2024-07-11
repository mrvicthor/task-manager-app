/*
  Warnings:

  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
-- List constraints on the Column table
-- List constraints on the Column table


-- Drop specific constraints if they exist
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_columnId_fkey";
ALTER TABLE "Column" DROP CONSTRAINT IF EXISTS "Column_pkey";







-- Example SQL snippet to drop constraint with CASCADE


-- Your other migration commands
