import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import * as ctrl from "../controllers/playlistController";

const router = Router();

// All playlist routes require authentication
router.use(requireAuth);

router.post("/", ctrl.createPlaylist);
router.get("/", ctrl.getPlaylists);
router.get("/:id", ctrl.getPlaylist);
router.patch("/:id", ctrl.renamePlaylist);
router.delete("/:id", ctrl.deletePlaylist);

export default router;
