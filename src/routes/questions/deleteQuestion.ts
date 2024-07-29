import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * paths:
 *   /api/questions/{id}:
 *     delete:
 *       summary: Delete a specific question
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID of the question to delete
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: The deleted question and a success message
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   question:
 *                     $ref: '#/definitions/Question'
 */
export async function deleteQuestion (req: Request, res: Response){
    try {
        const {id} = req.params;

        await prisma.questionChoice.deleteMany({
            where: { questionId: Number(id) },
        });

        const deletedQuestion = await prisma.question.delete({
            where: {id: Number(id)},
        });

        console.log('Deleted question:', deletedQuestion);
        console.log('Delete operation was successful');

        res.json({message: 'Question deleted successfully', question: deletedQuestion});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured while deleting the question'})
    }
}