import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router = Router();

// -----------------------------------
// 로그인
// -----------------------------------
router.post("/sign-in", AuthController.signIn);

export default router;
