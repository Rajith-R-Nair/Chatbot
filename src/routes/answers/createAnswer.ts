import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function createAnswer(req: Request, res: Response) {
    try {
        const { id, questionId, userId, answerTxt, date } = req.body;

        const answerData: any = {
            id,
            questionId,
            userId,
            answerTxt,
            date,
        };

        const answer = await prisma.answer.create({
            data: answerData,
        });

        console.log(JSON.stringify(req.body, null, 2));
        console.log(answer);
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the answer' });
    }
}