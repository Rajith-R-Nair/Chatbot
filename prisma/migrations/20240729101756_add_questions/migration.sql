/*
  Warnings:

  - A unique constraint covering the columns `[QuestionID]` on the table `BackBodypart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[QuestionID]` on the table `Bodypart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `QuestionID` to the `BackBodypart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QuestionID` to the `Bodypart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_backBodypartId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_bodypartId_fkey";

-- AlterTable
ALTER TABLE "BackBodypart" ADD COLUMN     "QuestionID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Bodypart" ADD COLUMN     "QuestionID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BackBodypart_QuestionID_key" ON "BackBodypart"("QuestionID");

-- CreateIndex
CREATE UNIQUE INDEX "Bodypart_QuestionID_key" ON "Bodypart"("QuestionID");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_bodypartId_fkey" FOREIGN KEY ("bodypartId") REFERENCES "Bodypart"("QuestionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_backBodypartId_fkey" FOREIGN KEY ("backBodypartId") REFERENCES "BackBodypart"("QuestionID") ON DELETE SET NULL ON UPDATE CASCADE;
