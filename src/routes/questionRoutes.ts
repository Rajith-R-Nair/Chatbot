import { Router } from 'express';
import { createQuestion } from './questions/createQuestion';
import { readQuestion, readAllQuestions } from "./questions/readQuestion";
import { readGeneralQuestions } from "./generalQuestions/readGeneralQuestions";
import { updateQuestion } from "./questions/updateQuestion";
import { deleteQuestion } from "./questions/deleteQuestion";
import { readQuestionBodypart, readUniqueQuestionBodypart } from "./questions/bodyparts/readQuestionBodypart";

const router = Router();

router.get('/generalquestions', readGeneralQuestions);
router.get('/bodyparts/:bodypartId/id/:id', readUniqueQuestionBodypart);
router.get('/bodyparts/:bodypartId', readQuestionBodypart);
router.post('/', createQuestion);
router.get('/:id', readQuestion);
router.get('/', readAllQuestions);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
