import axios from "axios";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  youtubeVideoId: string;
  title: string;
  thumbnail: string;
  order: number;
  durationSeconds: number | null;
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
 * Parse an ISO 8601 duration string (e.g. "PT1H2M30S") into total seconds.
 */
function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours   = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Fetch all videos in a YouTube playlist using the Data API v3.
 * Handles pagination automatically (playlists > 50 videos).
 * Also fetches per-video durations via the videos.list endpoint.
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
  const videos: Array<Omit<YouTubeVideo, "durationSeconds">> = [];
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

  // 3. Batch-fetch contentDetails (duration) — YouTube allows 50 IDs per call
  const videoIds = videos.map((v) => v.youtubeVideoId);
  const durationMap: Record<string, number> = {};

  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const detailsRes = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: "contentDetails",
        id: chunk.join(","),
        key: apiKey,
      },
    });
    for (const item of detailsRes.data.items ?? []) {
      durationMap[item.id] = parseDuration(
        item.contentDetails?.duration ?? ""
      );
    }
  }

  // 4. Attach durations to each video
  const videosWithDuration: YouTubeVideo[] = videos.map((v) => ({
    ...v,
    durationSeconds: durationMap[v.youtubeVideoId] ?? null,
  }));

  return { title, videos: videosWithDuration };
}
