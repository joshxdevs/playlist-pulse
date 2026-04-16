import { prisma } from "../lib/prisma";

/**
 * Toggle the completed state of a video.
 * Verifies ownership by joining through Playlist → User.
 */
export async function toggleVideoCompletion(
  videoId: string,
  userId: string,
  completed: boolean
) {
  // Ensure the video belongs to this user (via playlist.userId)
  const video = await prisma.video.findFirst({
    where: {
      id: videoId,
      playlist: { userId },
    },
  });

  if (!video) {
    throw new Error("Video not found.");
  }

  return prisma.video.update({
    where: { id: videoId },
    data: { completed },
  });
}
