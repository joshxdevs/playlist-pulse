import api from "./api";
import type { PlaylistSummary, PlaylistDetail } from "../types";

export async function getPlaylists(): Promise<PlaylistSummary[]> {
  const res = await api.get("/api/playlists");
  return res.data;
}

export async function getPlaylist(id: string): Promise<PlaylistDetail> {
  const res = await api.get(`/api/playlists/${id}`);
  return res.data;
}

export async function addPlaylist(url: string): Promise<PlaylistDetail> {
  const res = await api.post("/api/playlists", { url });
  return res.data;
}

export async function renamePlaylist(id: string, title: string): Promise<PlaylistDetail> {
  const res = await api.patch(`/api/playlists/${id}`, { title });
  return res.data;
}

export async function deletePlaylist(id: string): Promise<void> {
  await api.delete(`/api/playlists/${id}`);
}
