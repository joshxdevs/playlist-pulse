import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

/**
 * GET /api/admin/metrics
 * Returns platform-wide stats for the admin dashboard.
 */
export async function getMetrics(_req: Request, res: Response) {
  try {
    // Total user count
    const totalUsers = await prisma.user.count();

    // Active sessions (session not yet expired)
    const activeSessions = await prisma.session.count({
      where: { expiresAt: { gt: new Date() } },
    });

    // Total playlists across all users
    const totalPlaylists = await prisma.playlist.count();

    // Per-user playlist breakdown with videos for progress %
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        playlists: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            videos: {
              select: { completed: true, durationSeconds: true },
            },
          },
        },
      },
    });

    const userStats = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      joinedAt: user.createdAt,
      playlistCount: user.playlists.length,
      playlists: user.playlists.map((p) => {
        const total = p.videos.length;
        const completed = p.videos.filter((v) => v.completed).length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        const totalSeconds = p.videos.reduce(
          (sum, v) => sum + (v.durationSeconds ?? 0),
          0
        );
        return {
          id: p.id,
          title: p.title,
          addedAt: p.createdAt,
          totalVideos: total,
          completedVideos: completed,
          completionPct: pct,
          totalDurationSeconds: totalSeconds,
        };
      }),
    }));

    res.json({
      totalUsers,
      activeSessions,
      totalPlaylists,
      userStats,
    });
  } catch (err) {
    const error = err as { message?: string };
    res.status(500).json({ error: error.message || "Failed to fetch metrics" });
  }
}
