import { Router } from "express";
import { WordController } from "../controllers/word.controller";

const router = Router();

//-----------------------------------
//단어 핸들링
//-----------------------------------

router.post("/words", WordController.insertWords);

export default router;
