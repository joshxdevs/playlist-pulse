import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaylist, useToggleVideo } from "../hooks/usePlaylist";
import VideoItem from "../components/video/VideoItem";
import ProgressBar from "../components/video/ProgressBar";
import Button from "../components/ui/Button";
import { formatDuration } from "../lib/utils";
import { PlaylistPageSkeleton } from "../components/ui/Skeletons";

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: playlist, isLoading, error } = usePlaylist(id!);
  const { mutate: toggle, variables, isPending } = useToggleVideo(id!);
  const nextVideoRef = useRef<HTMLDivElement>(null);
  const [highlightNext, setHighlightNext] = useState(false);

  // Auto-scroll to first uncompleted video on mount
  useEffect(() => {
    if (!nextVideoRef.current || !playlist) return;
    const timer = setTimeout(() => {
      nextVideoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
    return () => clearTimeout(timer);
  }, [playlist?.id]);

  function scrollToNext() {
    nextVideoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightNext(true);
    setTimeout(() => setHighlightNext(false), 1500);
  }

  if (isLoading) return <PlaylistPageSkeleton />;


  if (error || !playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
        <p className="text-app-400 mb-4">Playlist not found or failed to load.</p>
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>← Back to Dashboard</Button>
      </div>
    );
  }

  const completedCount = playlist.videos.filter((v) => v.completed).length;
  const totalCount = playlist.videos.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextVideo = playlist.videos.find((v) => !v.completed);

  // Dynamic: sum of durations for videos NOT yet completed = time remaining
  const remainingSeconds = playlist.videos.reduce(
    (sum, v) => (v.completed ? sum : sum + (v.durationSeconds ?? 0)),
    0
  );
  const hasDuration = (playlist.totalDurationSeconds ?? 0) > 0;

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1.5 text-app-500 hover:text-app-200 text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Dashboard
      </button>

      {/* Header card */}
      <div className="bg-app-800 border border-app-700 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-app-50 leading-tight mb-2">
              {playlist.title}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-app-400">
              <span>{completedCount} of {totalCount} videos completed</span>
              {hasDuration && pct < 100 && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-accent font-medium">{formatDuration(remainingSeconds)}</span>
                  <span className="text-app-500">remaining</span>
                </span>
              )}
              {hasDuration && pct === 100 && (
                <span className="text-app-500">
                  Total: {formatDuration(playlist.totalDurationSeconds)}
                </span>
              )}
            </div>
          </div>

          {nextVideo && (
            <Button size="sm" onClick={scrollToNext} className="flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Continue Learning
            </Button>
          )}

          {pct === 100 && (
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold bg-green-900/20 border border-green-800/50 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              All Done!
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <ProgressBar value={pct} showLabel />
        </div>
      </div>

      {/* Video list */}
      <div className="flex flex-col gap-2">
        {playlist.videos.map((video, index) => {
          const isNext = video.id === nextVideo?.id;
          const isToggling = isPending && variables?.id === video.id;

          return (
            <div
              key={video.id}
              ref={isNext ? nextVideoRef : null}
              className={`transition-all duration-300 rounded-xl ${
                isNext && highlightNext
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-app-900"
                  : ""
              }`}
            >
              <VideoItem
                video={video}
                index={index}
                onToggle={(vid, completed) => toggle({ id: vid, completed })}
                isToggling={isToggling}
              />
            </div>
          );
        })}
      </div>

      {totalCount === 0 && (
        <div className="text-center py-12 text-app-500">
          This playlist has no videos.
        </div>
      )}
    </div>
  );
}
