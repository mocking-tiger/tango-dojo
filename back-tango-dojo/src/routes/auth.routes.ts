import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router = Router();

// -----------------------------------
// 로그인 관련
// -----------------------------------
router.post("/sign-in", AuthController.signIn);
router.post("/sign-out", AuthController.signOut);

export default router;
