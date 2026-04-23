import { useQuery } from "@tanstack/react-query";
import { getAdminMetrics } from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminDashboardSkeleton } from "../components/ui/Skeletons";
import { formatDuration } from "../lib/utils";

const ADMIN_EMAIL = "jpgstudying@gmail.com";

export default function AdminDashboardPage() {
  const { user, isPending: authPending } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admins
  useEffect(() => {
    if (!authPending && (!user || user.email !== ADMIN_EMAIL)) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authPending, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getAdminMetrics,
    enabled: !!user && user.email === ADMIN_EMAIL,
    refetchInterval: 30_000,
  });

  if (authPending || isLoading) return <AdminDashboardSkeleton />;

  if (error || !data) {
    return (
      <div className="p-6 text-app-400 text-center py-20">
        Failed to load admin metrics.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-app-50 mb-1">Admin Dashboard</h1>
        <p className="text-sm text-app-400">Platform-wide metrics and user activity</p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Users" value={data.totalUsers} />
        <StatCard label="Active Sessions" value={data.activeSessions} />
        <StatCard label="Total Playlists" value={data.totalPlaylists} />
      </div>

      {/* User breakdown */}
      <div className="flex flex-col gap-6">
        {data.userStats.map((user) => (
          <div
            key={user.id}
            className="bg-app-800 border border-app-700 rounded-2xl overflow-hidden"
          >
            {/* User header */}
            <div className="px-5 py-4 border-b border-app-700 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <p className="font-semibold text-app-50">{user.name}</p>
                <p className="text-xs text-app-400">{user.email}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-app-400">
                <span className="bg-app-700 px-2 py-0.5 rounded-full">
                  {user.playlistCount} {user.playlistCount === 1 ? "playlist" : "playlists"}
                </span>
                <span>
                  Joined {new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
            </div>

            {/* Playlists table */}
            {user.playlists.length === 0 ? (
              <p className="px-5 py-4 text-sm text-app-500">No playlists added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-app-700">
                      <th className="text-left px-5 py-2.5 text-xs font-medium text-app-400 uppercase tracking-wide">Playlist</th>
                      <th className="text-right px-5 py-2.5 text-xs font-medium text-app-400 uppercase tracking-wide">Videos</th>
                      <th className="text-right px-5 py-2.5 text-xs font-medium text-app-400 uppercase tracking-wide">Duration</th>
                      <th className="text-right px-5 py-2.5 text-xs font-medium text-app-400 uppercase tracking-wide">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.playlists.map((p) => (
                      <tr key={p.id} className="border-b border-app-700/50 last:border-0 hover:bg-app-750 transition-colors">
                        <td className="px-5 py-3 text-app-200 font-medium max-w-xs truncate">{p.title}</td>
                        <td className="px-5 py-3 text-app-400 text-right whitespace-nowrap">
                          {p.completedVideos}/{p.totalVideos}
                        </td>
                        <td className="px-5 py-3 text-app-400 text-right whitespace-nowrap">
                          {formatDuration(p.totalDurationSeconds)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-24 h-1.5 bg-app-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-500"
                                style={{ width: `${p.completionPct}%` }}
                              />
                            </div>
                            <span className={`text-xs font-semibold tabular-nums w-9 text-right ${
                              p.completionPct === 100 ? "text-green-400" : "text-accent"
                            }`}>
                              {p.completionPct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-app-800 border border-app-700 rounded-2xl p-5">
      <p className="text-xs text-app-400 uppercase tracking-wide font-medium mb-2">{label}</p>
      <p className="text-3xl font-bold text-app-50 tabular-nums">{value}</p>
    </div>
  );
}
