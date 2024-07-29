import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/bodyparts/{id}:
 *   get:
 *     summary: Fetch a bodypart by its ID
 *     description: Returns a single bodypart
 *     tags:
 *       - Bodypart
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the bodypart to fetch
 *     responses:
 *       '200':
 *         description: Bodypart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       '404':
 *         description: Bodypart not found
 *       '500':
 *         description: An error occurred while retrieving the bodypart
 */
export async function readBodypart(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const bodyparts = await prisma.bodypart.findUnique({
            where: { id: Number(id) },
        });

        if (bodyparts) {
            console.log(bodyparts);
            res.json(bodyparts);
        } else {
            res.status(404).json({ error: 'Bodypart not found' });
        }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the bodypart' });
    }
}
export async function readAllBodyparts(req: Request, res: Response) {
    try {
        const bodyparts = await prisma.bodypart.findMany();
        res.json(bodyparts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the bodyparts' });
    }
}

export async function readBackBodyPart(req: Request, res: Response){
    try {
        const {id} = req.params;
        const backBodyParts = await prisma.backBodypart.findUnique({
            where: { id: Number(id)},

        });
        if(backBodyParts) {
            console.log(backBodyParts)
            res.json(backBodyParts)
        } else {
            res.status(404).json({error: 'Back bodypart not found'});
        }
    }
    catch( error) {
        console.error(error)
        res.status(500).json({error: 'An error occurred while retrieving the back bodyparts'})
    }
}

export async function readAllBackBodyPart(req: Request, res: Response) {
    try {
        const backBodyParts = await prisma.backBodypart.findMany();
        res.json(backBodyParts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the bodyparts' });
    }
}