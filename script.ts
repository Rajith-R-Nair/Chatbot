import { PrismaClient } from '@prisma/client'
import * as fs from "fs";
const prisma = new PrismaClient()

async function main() {
    // Read the JSON file
    const data = fs.readFileSync('questions.json', 'utf8');

    // Parse the data
    const questions: any = JSON.parse(data);

    for (const question of questions) {
        try {
            // Create the question
            const createdQuestion = await prisma.question.create({
                data: {
                    questionTxt: question.questionTxt,
                    questionType: question.questionType,
                    dataType: question.dataType,
                    bodypartId: question.bodypartId,
                },
            });

            // Create the choices
            if (Array.isArray(question.choices)) {
                for (const choice of question.choices) {
                    console.log(`Adding choice: ${JSON.stringify(choice)}`); // Log the choice

                    // If the choice is an array, it contains a follow-up question ID
                    if (Array.isArray(choice)) {
                        const followUpQuestionId = choice[1];

                        // Create the choice with the follow-up question ID
                        try {
                            await prisma.questionChoice.create({
                                data: {
                                    questionId: createdQuestion.id,
                                    choiceTxt: choice[0],
                                    followUpQuestionId: followUpQuestionId,
                                },
                            });
                        } catch (error) {
                            console.error(`Failed to add choice: ${JSON.stringify(choice)}`);
                            console.error(error);
                        }
                    } else {
                        // Create the choice without a follow-up question
                        try {
                            await prisma.questionChoice.create({
                                data: {
                                    questionId: createdQuestion.id,
                                    choiceTxt: choice,
                                },
                            });
                        } catch (error) {
                            console.error(`Failed to add choice: ${JSON.stringify(choice)}`);
                            console.error(error);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(`Question "${question.questionTxt}" already exists in the database.`);
        }
    }
    const question = await prisma.question.findMany()
    console.log(question)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });