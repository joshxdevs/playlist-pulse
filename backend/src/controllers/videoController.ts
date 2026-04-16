import { Request, Response } from "express";
import { z } from "zod";
import * as videoService from "../services/videoService";

const toggleSchema = z.object({
  completed: z.boolean(),
});

export async function toggleVideo(req: Request, res: Response) {
  try {
    const { completed } = toggleSchema.parse(req.body);
    const video = await videoService.toggleVideoCompletion(
      req.params.id,
      req.user!.id,
      completed
    );
    res.json(video);
  } catch (err: unknown) {
    const error = err as { name?: string; errors?: { message: string }[]; message?: string };
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors?.[0]?.message });
    } else {
      res.status(400).json({ error: error.message || "Failed to update video" });
    }
  }
}
