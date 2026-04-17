import api from "./api";
import type { Video } from "../types";

export async function toggleVideo(id: string, completed: boolean): Promise<Video> {
  const res = await api.patch(`/api/videos/${id}`, { completed });
  return res.data;
}
