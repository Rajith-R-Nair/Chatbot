import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * definitions:
 *   QuestionChoice:
 *     type: object
 *     properties:
 *       choiceTxt:
 *         type: string
 *   Question:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       bodypartId:
 *         type: integer
 *       questionTxt:
 *         type: string
 *       questionType:
 *         type: string
 *       dataType:
 *         type: string
 *       questionChoice:
 *         type: object
 *         properties:
 *           create:
 *             type: array
 *             items:
 *               $ref: '#/definitions/QuestionChoice'
 * paths:
 *   /api/questions:
 *     post:
 *       summary: Create a new question
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: question
 *           description: The question to create.
 *           schema:
 *             $ref: '#/definitions/Question'
 *       responses:
 *         200:
 *           description: The created question
 *           schema:
 *             $ref: '#/definitions/Question'
 */
export async function createQuestion(req: Request, res: Response) {
    try {
        const { bodypartId, questionTxt, questionType, dataType, questionChoice } = req.body;
        const questionData: any = {
            questionTxt,
            questionType,
            dataType,
        };

        if (bodypartId){
            questionData.bodypartId = bodypartId;
        }

        if (["Radio", "MultiChoice", "Scale"].includes(dataType) && questionChoice){
            questionData.questionChoice = {
                create: questionChoice.create.map((choice: {choiceTxt: string}) => choice),
            };
        }

        const question = await prisma.question.create({
            data: questionData,
        });

        console.log(JSON.stringify(req.body, null, 2));
        console.log(question);
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the question' });
    }
}