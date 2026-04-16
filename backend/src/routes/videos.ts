import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import * as ctrl from "../controllers/videoController";

const router = Router();

router.use(requireAuth);

router.patch("/:id", ctrl.toggleVideo);

export default router;
