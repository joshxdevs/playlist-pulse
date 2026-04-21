import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { getMetrics } from "../controllers/adminController";

const router = Router();

// All admin routes are protected by requireAdmin
router.get("/metrics", requireAdmin, getMetrics);

export default router;
