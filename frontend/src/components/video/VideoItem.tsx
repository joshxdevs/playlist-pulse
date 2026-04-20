import type { Video } from "../../types";
import { formatDuration } from "../../lib/utils";

interface VideoItemProps {
  video: Video;
  index: number;
  onToggle: (id: string, completed: boolean) => void;
  isToggling?: boolean;
}

export default function VideoItem({ video, index, onToggle, isToggling }: VideoItemProps) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeVideoId}`;

  return (
    <div
      id={`video-${video.id}`}
      className={`
        group flex items-start gap-3 p-3 rounded-xl
        border transition-all duration-200
        ${video.completed
          ? "bg-app-900/50 border-app-800 opacity-60"
          : "bg-app-800 border-app-700 hover:border-app-600 hover:bg-app-750"
        }
      `}
    >
      {/* Number badge */}
      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-app-700 text-app-400 text-xs font-mono font-medium mt-0.5">
        {index + 1}
      </span>

      {/* Thumbnail */}
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 relative rounded-lg overflow-hidden"
        tabIndex={-1}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-24 h-14 object-cover"
          loading="lazy"
        />
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </a>

      {/* Title & Duration */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-medium leading-snug transition-colors hover:text-accent
            ${video.completed ? "line-through text-app-500" : "text-app-100"}`}
        >
          <span className="line-clamp-2">{video.title}</span>
        </a>
        {video.durationSeconds != null && (
          <span className="text-xs text-app-400 font-medium">
            {formatDuration(video.durationSeconds)}
          </span>
        )}
      </div>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(video.id, !video.completed)}
        disabled={isToggling}
        aria-label={video.completed ? "Mark as incomplete" : "Mark as complete"}
        className={`
          custom-checkbox flex-shrink-0 mt-0.5 transition-all duration-150
          ${video.completed ? "checked" : ""}
          ${isToggling ? "opacity-50 cursor-not-allowed" : "hover:border-accent"}
        `}
      />
    </div>
  );
}
