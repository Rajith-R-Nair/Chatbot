import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**
 * @swagger
 * paths:
 *   /api/questions/{id}:
 *     patch:
 *       summary: Update a specific question
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the question to update
 *           schema:
 *             type: integer
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Question'
 *       responses:
 *         200:
 *           description: The updated question
 *           schema:
 *             $ref: '#/definitions/Question'
 */
export async function updateQuestion (req: Request, res: Response){
    try {
        const {id} = req.params;

        const newData = req.body;

        const questionBeforeUpdate = await prisma.question.findUnique({
            where: {id: Number(id)},
        });
        console.log('Before update:', questionBeforeUpdate);

        const updatedQuestion = await prisma.question.update({
            where: {id: Number(id)},
            data: newData,
        });

        console.log('After update:', updatedQuestion);
        res.json(updatedQuestion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured while updating the question'})
    }
}