// generalQuestions/readGeneralQuestions.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function readGeneralQuestions(req: Request, res: Response) {
    try {
        const generalQuestions = await prisma.question.findMany({
            where: {
                bodypartId: null,
                questionType: "General",
            },
            include: {
                questionChoice: true, // Includes question choices
            },
        });
        res.json(generalQuestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the general questions' });
    }
}
