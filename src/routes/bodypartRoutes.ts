import {Router} from "express";
import {readAllBodyparts, readBodypart, readBackBodyPart, readAllBackBodyPart} from "./bodyparts/readBodypart";

const router = Router();

router.get('/:id', readBodypart, readBackBodyPart)
router.get('/', readAllBodyparts, readAllBackBodyPart)
router.get('/:id', readBackBodyPart)
router.get('/', readAllBackBodyPart)

export default router;