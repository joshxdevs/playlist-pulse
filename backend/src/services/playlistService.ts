import { prisma } from "../lib/prisma";
import { extractPlaylistId, fetchPlaylistInfo } from "./youtubeService";

/**
 * Fetch + store a YouTube playlist and all its videos for a user.
 */
export async function createPlaylist(userId: string, youtubeUrl: string) {
  const playlistId = extractPlaylistId(youtubeUrl);
  if (!playlistId) {
    throw new Error(
      "Invalid YouTube playlist URL. Make sure the URL contains ?list=..."
    );
  }

  // Prevent duplicate playlists per user
  const existing = await prisma.playlist.findFirst({
    where: { userId, youtubePlaylistId: playlistId },
  });
  if (existing) {
    throw new Error("You already have this playlist in your tracker.");
  }

  const { title, videos } = await fetchPlaylistInfo(playlistId);

  const playlist = await prisma.playlist.create({
    data: {
      userId,
      title,
      youtubePlaylistId: playlistId,
      videos: {
        create: videos.map((v) => ({
          title: v.title,
          youtubeVideoId: v.youtubeVideoId,
          thumbnail: v.thumbnail,
          order: v.order,
          completed: false,
        })),
      },
    },
    include: {
      videos: { orderBy: { order: "asc" } },
    },
  });

  return playlist;
}

/**
 * Return all playlists for a user with computed progress stats.
 */
export async function getUserPlaylists(userId: string) {
  const playlists = await prisma.playlist.findMany({
    where: { userId },
    include: {
      videos: {
        orderBy: { order: "asc" },
        select: { id: true, title: true, completed: true, order: true, thumbnail: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return playlists.map((p) => {
    const completedVideos = p.videos.filter((v) => v.completed).length;
    const totalVideos = p.videos.length;
    const nextVideo = p.videos.find((v) => !v.completed) ?? null;
    const lastWatched =
      [...p.videos].reverse().find((v) => v.completed) ?? null;

    return {
      ...p,
      totalVideos,
      completedVideos,
      nextVideo,
      lastWatched,
    };
  });
}

/**
 * Return a single playlist with full video list.
 */
export async function getPlaylistById(playlistId: string, userId: string) {
  const playlist = await prisma.playlist.findFirst({
    where: { id: playlistId, userId },
    include: { videos: { orderBy: { order: "asc" } } },
  });

  if (!playlist) {
    throw new Error("Playlist not found.");
  }

  return playlist;
}

/**
 * Rename a playlist title.
 */
export async function renamePlaylist(
  playlistId: string,
  userId: string,
  title: string
) {
  const playlist = await prisma.playlist.findFirst({
    where: { id: playlistId, userId },
  });
  if (!playlist) throw new Error("Playlist not found.");

  return prisma.playlist.update({
    where: { id: playlistId },
    data: { title },
  });
}

/**
 * Delete a playlist and cascade its videos.
 */
export async function deletePlaylist(playlistId: string, userId: string) {
  const playlist = await prisma.playlist.findFirst({
    where: { id: playlistId, userId },
  });
  if (!playlist) throw new Error("Playlist not found.");

  await prisma.playlist.delete({ where: { id: playlistId } });
}
