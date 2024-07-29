import { Router } from "express";
import {
  readBackBodyPart,
  readAllBackBodyPart,
} from "./bodyparts/readBodypart";

const router = Router();

router.get("/:id", readBackBodyPart);
router.get("/", readAllBackBodyPart);

export default router;
