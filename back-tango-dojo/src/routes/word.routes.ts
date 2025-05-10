import { Router } from "express";
import { WordController } from "../controllers/word.controller";
import { auth } from "../middlewares/auth";
const router = Router();

// -----------------------------------
// 단어 삽입
// -----------------------------------
router.post("/words", auth, WordController.insertWords);

export default router;
