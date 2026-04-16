import { Request, Response } from "express";
import { z } from "zod";
import * as playlistService from "../services/playlistService";

const createSchema = z.object({
  url: z.string().min(1, "Playlist URL is required"),
});

const renameSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
});

export async function createPlaylist(req: Request, res: Response) {
  try {
    const { url } = createSchema.parse(req.body);
    const playlist = await playlistService.createPlaylist(req.user!.id, url);
    res.status(201).json(playlist);
  } catch (err: unknown) {
    const error = err as { name?: string; errors?: { message: string }[]; message?: string };
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors?.[0]?.message });
    } else {
      res.status(400).json({ error: error.message || "Failed to add playlist" });
    }
  }
}

export async function getPlaylists(req: Request, res: Response) {
  try {
    const playlists = await playlistService.getUserPlaylists(req.user!.id);
    res.json(playlists);
  } catch (err: unknown) {
    const error = err as { message?: string };
    res.status(500).json({ error: error.message || "Failed to fetch playlists" });
  }
}

export async function getPlaylist(req: Request, res: Response) {
  try {
    const playlist = await playlistService.getPlaylistById(
      req.params.id,
      req.user!.id
    );
    res.json(playlist);
  } catch (err: unknown) {
    const error = err as { message?: string };
    res.status(404).json({ error: error.message || "Playlist not found" });
  }
}

export async function renamePlaylist(req: Request, res: Response) {
  try {
    const { title } = renameSchema.parse(req.body);
    const playlist = await playlistService.renamePlaylist(
      req.params.id,
      req.user!.id,
      title
    );
    res.json(playlist);
  } catch (err: unknown) {
    const error = err as { name?: string; errors?: { message: string }[]; message?: string };
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors?.[0]?.message });
    } else {
      res.status(400).json({ error: error.message || "Failed to rename" });
    }
  }
}

export async function deletePlaylist(req: Request, res: Response) {
  try {
    await playlistService.deletePlaylist(req.params.id, req.user!.id);
    res.json({ message: "Playlist deleted successfully" });
  } catch (err: unknown) {
    const error = err as { message?: string };
    res.status(400).json({ error: error.message || "Failed to delete playlist" });
  }
}
