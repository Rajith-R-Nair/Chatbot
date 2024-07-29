import {Router} from "express";
import { createAnswer } from "./answers/createAnswer";
import {readAllAnswers, readAnswer} from "./answers/readAnswers";

const router = Router();

router.post('/', createAnswer)
router.get('/:id', readAnswer)
router.get('/', readAllAnswers)

export default router;