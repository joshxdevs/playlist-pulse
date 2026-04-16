import axios from "axios";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  youtubeVideoId: string;
  title: string;
  thumbnail: string;
  order: number;
}

export interface YouTubePlaylistInfo {
  title: string;
  videos: YouTubeVideo[];
}

/**
 * Extract a YouTube playlist ID from a URL or raw ID string.
 * Supports: https://youtube.com/playlist?list=PLxxx, https://youtu.be/..., raw PLxxx IDs.
 */
export function extractPlaylistId(input: string): string | null {
  // Try to parse as a URL first
  try {
    const url = new URL(input);
    const listParam = url.searchParams.get("list");
    if (listParam) return listParam;
  } catch {
    // Not a URL — fall through
  }

  // Accept raw playlist IDs (PL, UU, FL, RD, etc. prefixes)
  if (/^(PL|UU|FL|RD|OL)[a-zA-Z0-9_-]+$/i.test(input.trim())) {
    return input.trim();
  }

  return null;
}

/**
 * Fetch all videos in a YouTube playlist using the Data API v3.
 * Handles pagination automatically (playlists > 50 videos).
 */
export async function fetchPlaylistInfo(
  playlistId: string
): Promise<YouTubePlaylistInfo> {
  const apiKey = process.env.YOUTUBE_API_KEY!;

  // 1. Fetch playlist metadata (title)
  const playlistRes = await axios.get(`${YOUTUBE_API_BASE}/playlists`, {
    params: {
      part: "snippet",
      id: playlistId,
      key: apiKey,
    },
  });

  const items = playlistRes.data?.items;
  if (!items || items.length === 0) {
    throw new Error(
      "Playlist not found. It may be private or the ID is incorrect."
    );
  }

  const title: string = items[0].snippet.title;

  // 2. Fetch all playlist items with pagination
  const videos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined;
  let order = 0;

  do {
    const videosRes = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: "snippet",
        maxResults: 50,
        playlistId,
        key: apiKey,
        ...(nextPageToken ? { pageToken: nextPageToken } : {}),
      },
    });

    const data = videosRes.data;
    nextPageToken = data.nextPageToken;

    for (const item of data.items ?? []) {
      const snippet = item.snippet;
      const videoId: string = snippet?.resourceId?.videoId;

      // Skip deleted/private placeholders
      if (
        !videoId ||
        snippet.title === "Deleted video" ||
        snippet.title === "Private video"
      ) {
        continue;
      }

      // Prefer medium thumbnail; fall back to the direct image URL
      const thumbnail: string =
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

      videos.push({
        youtubeVideoId: videoId,
        title: snippet.title,
        thumbnail,
        order: order++,
      });
    }
  } while (nextPageToken);

  if (videos.length === 0) {
    throw new Error("This playlist appears to be empty.");
  }

  return { title, videos };
}
