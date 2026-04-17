import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PlaylistSummary } from "../../types";
import ProgressBar from "../video/ProgressBar";
import RenamePlaylistModal from "./RenamePlaylistModal";
import Button from "../ui/Button";
import { useDeletePlaylist } from "../../hooks/usePlaylists";

interface PlaylistCardProps {
  playlist: PlaylistSummary;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const navigate = useNavigate();
  const [showRename, setShowRename] = useState(false);
  const { mutate: deletePlaylist, isPending: isDeleting } = useDeletePlaylist();

  const pct =
    playlist.totalVideos > 0
      ? Math.round((playlist.completedVideos / playlist.totalVideos) * 100)
      : 0;

  const thumbnailUrl =
    playlist.videos[0]?.thumbnail ||
    `https://img.youtube.com/vi/default/mqdefault.jpg`;

  function handleDelete() {
    if (confirm(`Delete "${playlist.title}"? This cannot be undone.`)) {
      deletePlaylist(playlist.id);
    }
  }

  return (
    <>
      <div className="group relative bg-app-800 border border-app-700 rounded-2xl overflow-hidden hover:border-app-600 transition-all duration-200 hover:shadow-card-hover flex flex-col">
        {/* Thumbnail area */}
        <div
          className="relative h-36 cursor-pointer overflow-hidden"
          onClick={() => navigate(`/playlist/${playlist.id}`)}
        >
          <img
            src={thumbnailUrl}
            alt={playlist.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-app-950/90 via-app-950/30 to-transparent" />

          {/* Completion badge */}
          {pct === 100 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Done
            </div>
          )}

          {/* Video count */}
          <div className="absolute bottom-2 left-3 text-xs text-app-200 font-medium">
            {playlist.totalVideos} videos
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Title */}
          <h3
            className="font-semibold text-app-50 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-accent transition-colors"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            {playlist.title}
          </h3>

          {/* Progress */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-app-400">
                {playlist.completedVideos}/{playlist.totalVideos} completed
              </span>
              <span className={`font-semibold ${pct === 100 ? "text-green-400" : "text-accent"}`}>
                {pct}%
              </span>
            </div>
            <ProgressBar value={pct} />
          </div>

          {/* Last / Next */}
          <div className="flex flex-col gap-1 text-xs">
            {playlist.lastWatched && (
              <div className="flex items-center gap-1.5 text-app-500 line-clamp-1">
                <span className="text-app-600">↩</span>
                <span className="line-clamp-1">{playlist.lastWatched.title}</span>
              </div>
            )}
            {playlist.nextVideo && (
              <div className="flex items-center gap-1.5 text-app-300 line-clamp-1">
                <span className="text-accent">▶</span>
                <span className="line-clamp-1">Up next: {playlist.nextVideo.title}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1 mt-auto">
            {playlist.nextVideo ? (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Continue
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                Review
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowRename(true)}
              aria-label="Rename playlist"
              title="Rename"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleDelete}
              loading={isDeleting}
              aria-label="Delete playlist"
              title="Delete"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <RenamePlaylistModal
        open={showRename}
        onClose={() => setShowRename(false)}
        playlistId={playlist.id}
        currentTitle={playlist.title}
      />
    </>
  );
}
