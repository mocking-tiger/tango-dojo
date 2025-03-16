import wordRoutes from "./word.routes";
import { Router } from "express";

const router = Router();

router.use(wordRoutes);

export default router;
