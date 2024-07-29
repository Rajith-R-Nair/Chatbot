import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function readAnswer(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const answer = await prisma.answer.findUnique({
            where: { id: Number(id) },
        });

        if (answer) {
            console.log(answer);
            res.json(answer);
        } else {
            res.status(404).json({ error: 'Answer not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the answer' });
    }
}
export async function readAllAnswers(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const answer = await prisma.answer.findMany({
            where: { userId:userId },
            include: {
                question: {
                    select: {
                        questionTxt: true
                    }
                }
            }
        });
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the answers' });
    }
}