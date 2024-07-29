import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function readUniqueQuestionBodypart(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { bodypartId } = req.params;

        const question = await prisma.question.findUnique({
            where: { id: Number(id),
                bodypartId: Number(bodypartId) },
            include: {
                questionChoice: true, // includes question choice
            }
        });

        if (question) {
            console.log(question);
            res.json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the question' });
    }
}

export async function readQuestionBodypart(req: Request, res: Response) {
    try {
        const { bodypartId } = req.params;

        const question = await prisma.question.findMany({
            where: { bodypartId: Number(bodypartId) },
            include: {
                questionChoice: true, // includes question choice
            }
        });

        if (question) {
            console.log(question);
            res.json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the question' });
    }
}