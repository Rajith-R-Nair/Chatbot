-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bodypart" (
    "id" SERIAL NOT NULL,
    "bodypartname" TEXT NOT NULL,

    CONSTRAINT "Bodypart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackBodypart" (
    "id" SERIAL NOT NULL,
    "bodypartname" TEXT NOT NULL,

    CONSTRAINT "BackBodypart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "bodypartId" INTEGER,
    "backBodypartId" INTEGER,
    "questionTxt" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionType" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "answerTxt" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionChoice" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "choiceTxt" TEXT NOT NULL,
    "followUpQuestionId" INTEGER,

    CONSTRAINT "QuestionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionTxt_key" ON "Question"("questionTxt");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_bodypartId_fkey" FOREIGN KEY ("bodypartId") REFERENCES "Bodypart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_backBodypartId_fkey" FOREIGN KEY ("backBodypartId") REFERENCES "BackBodypart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_followUpQuestionId_fkey" FOREIGN KEY ("followUpQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
