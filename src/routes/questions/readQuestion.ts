// readQuestion.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * paths:
 *   /api/questions/{id}:
 *     get:
 *       summary: Retrieve a specific question
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the question to retrieve
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: The retrieved question
 *           schema:
 *             $ref: '#/definitions/Question'
 */
export async function readQuestion(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const questionId = parseInt(id, 10);

        if (isNaN(questionId)) {
            return res.status(400).json({ error: 'Invalid question ID' });
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
        });

        if (question) {
            console.log(question);
            res.json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the question' });
    }
}

/**
 * @swagger
 * paths:
 *   /api/questions:
 *     get:
 *       summary: Retrieve all questions
 *       responses:
 *         200:
 *           description: A list of questions
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Question'
 */
export async function readAllQuestions(req: Request, res: Response) {
    try {
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the questions' });
    }
}