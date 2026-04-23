import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePlaylists } from "../hooks/usePlaylists";
import PlaylistCard from "../components/playlist/PlaylistCard";
import AddPlaylistModal from "../components/playlist/AddPlaylistModal";
import Button from "../components/ui/Button";
import { DashboardSkeleton } from "../components/ui/Skeletons";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: playlists, isLoading, error } = usePlaylists();
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Show skeleton while fetching
  if (isLoading) return <DashboardSkeleton />;

  const filtered = (playlists ?? []).filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const inProgress = filtered.filter(
    (p) => p.completedVideos > 0 && p.completedVideos < p.totalVideos
  );
  const notStarted = filtered.filter((p) => p.completedVideos === 0);
  const completed = filtered.filter(
    (p) => p.totalVideos > 0 && p.completedVideos === p.totalVideos
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-app-50">
            {greeting}, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-app-400 text-sm mt-1">
            {playlists
              ? `${playlists.length} playlist${playlists.length !== 1 ? "s" : ""} · ${
                  playlists.reduce((a, p) => a + p.completedVideos, 0)
                } videos completed`
              : "Your learning journey"}
          </p>
        </div>
        <Button id="add-playlist-btn" onClick={() => setShowAdd(true)} size="md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Playlist
        </Button>
      </div>

      {/* Search */}
      {(playlists?.length ?? 0) > 2 && (
        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-playlists"
            type="text"
            placeholder="Search playlists…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-app-800 border border-app-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-app-100 placeholder-app-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-16 text-app-500">
          <p>Failed to load playlists. Please refresh.</p>
        </div>
      )}

      {/* Empty state */}
      {!error && playlists?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-20 h-20 bg-app-800 rounded-2xl flex items-center justify-center mb-6 border border-app-700">
            <svg className="w-10 h-10 text-app-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-app-200 mb-2">No playlists yet</h2>
          <p className="text-app-500 text-sm max-w-xs mb-6">
            Add a YouTube playlist URL to start tracking your learning progress
          </p>
          <Button onClick={() => setShowAdd(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add your first playlist
          </Button>
        </div>
      )}

      {/* Playlist sections */}
      {!error && (
        <>
          {/* In Progress */}
          {inProgress.length > 0 && (
            <section className="mb-8 animate-fade-in">
              <h2 className="text-xs font-semibold text-app-500 uppercase tracking-wider mb-3">
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {inProgress.map((p) => <PlaylistCard key={p.id} playlist={p} />)}
              </div>
            </section>
          )}

          {/* Not Started */}
          {notStarted.length > 0 && (
            <section className="mb-8 animate-fade-in">
              <h2 className="text-xs font-semibold text-app-500 uppercase tracking-wider mb-3">
                Not Started
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {notStarted.map((p) => <PlaylistCard key={p.id} playlist={p} />)}
              </div>
            </section>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <section className="mb-8 animate-fade-in">
              <h2 className="text-xs font-semibold text-app-500 uppercase tracking-wider mb-3">
                Completed ✓
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 opacity-75">
                {completed.map((p) => <PlaylistCard key={p.id} playlist={p} />)}
              </div>
            </section>
          )}

          {/* No search results */}
          {search && filtered.length === 0 && (
            <div className="text-center py-12 text-app-500">
              No playlists match "{search}"
            </div>
          )}
        </>
      )}

      <AddPlaylistModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
