import wordRoutes from "./word.routes";
import authRoutes from "./auth.routes";
import { Router } from "express";

const router = Router();

router.use(wordRoutes);
router.use(authRoutes);

export default router;
