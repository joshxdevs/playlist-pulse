// Shared skeleton shimmer utility
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-app-700/60 rounded-lg ${className ?? ""}`}
    />
  );
}

// ─── Dashboard skeleton ───────────────────────────────────────────────────────

function PlaylistCardSkeleton() {
  return (
    <div className="bg-app-800 border border-app-700 rounded-2xl overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <Shimmer className="h-36 rounded-none" />
      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
        {/* Progress row */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <Shimmer className="h-2 flex-1" />
          <Shimmer className="h-3 w-8 rounded-full" />
        </div>
        {/* Next video line */}
        <Shimmer className="h-3 w-5/6" />
        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Shimmer className="h-7 flex-1 rounded-full" />
          <Shimmer className="h-7 w-7 rounded-full" />
          <Shimmer className="h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-7 w-56" />
          <Shimmer className="h-4 w-40" />
        </div>
        <Shimmer className="h-9 w-32 rounded-full" />
      </div>

      {/* Section label */}
      <Shimmer className="h-3 w-28 mb-4" />

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <PlaylistCardSkeleton key={i} />
        ))}
      </div>

      {/* Second section label */}
      <Shimmer className="h-3 w-20 mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <PlaylistCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Playlist page skeleton ───────────────────────────────────────────────────

function VideoItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-app-800 border border-app-700">
      {/* Number badge */}
      <Shimmer className="w-7 h-7 rounded-md flex-shrink-0" />
      {/* Thumbnail */}
      <Shimmer className="w-24 h-14 rounded-lg flex-shrink-0" />
      {/* Title + duration */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 pt-0.5">
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3 w-3/4" />
        <Shimmer className="h-3 w-16" />
      </div>
      {/* Checkbox */}
      <Shimmer className="w-5 h-5 rounded flex-shrink-0 mt-0.5" />
    </div>
  );
}

export function PlaylistPageSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <Shimmer className="h-4 w-24 mb-6" />

      {/* Header card */}
      <div className="bg-app-800 border border-app-700 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
          <Shimmer className="h-8 w-36 rounded-full flex-shrink-0" />
        </div>
        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between mb-1.5">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-3 w-8" />
          </div>
          <Shimmer className="h-1.5 w-full rounded-full" />
        </div>
      </div>

      {/* Video list */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
