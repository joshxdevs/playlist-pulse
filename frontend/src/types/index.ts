// Shared TypeScript types for the frontend

export interface Video {
  id: string;
  playlistId: string;
  title: string;
  youtubeVideoId: string;
  thumbnail: string;
  order: number;
  completed: boolean;
}

export interface PlaylistVideo {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  thumbnail: string;
}

export interface PlaylistSummary {
  id: string;
  userId: string;
  title: string;
  youtubePlaylistId: string;
  createdAt: string;
  videos: PlaylistVideo[];
  totalVideos: number;
  completedVideos: number;
  nextVideo: PlaylistVideo | null;
  lastWatched: PlaylistVideo | null;
}

export interface PlaylistDetail {
  id: string;
  userId: string;
  title: string;
  youtubePlaylistId: string;
  createdAt: string;
  videos: Video[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}
