import api from "./api";

interface AdminMetrics {
  totalUsers: number;
  activeSessions: number;
  totalPlaylists: number;
  userStats: {
    id: string;
    name: string;
    email: string;
    joinedAt: string;
    playlistCount: number;
    playlists: {
      id: string;
      title: string;
      addedAt: string;
      totalVideos: number;
      completedVideos: number;
      completionPct: number;
      totalDurationSeconds: number;
    }[];
  }[];
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const res = await api.get("/api/admin/metrics");
  return res.data;
}
