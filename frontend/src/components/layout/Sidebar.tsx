import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePlaylists } from "../../hooks/usePlaylists";
import ProgressBar from "../video/ProgressBar";
import AddPlaylistModal from "../playlist/AddPlaylistModal";

const ADMIN_EMAIL = "jpgstudying@gmail.com";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: playlists } = usePlaylists();
  const [showAdd, setShowAdd] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-app-950 border-r border-app-800
          flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-app-800">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <span className="font-bold text-app-50 text-sm tracking-wide">Playlist Tracker</span>
          {/* Mobile close */}
          <button
            className="ml-auto lg:hidden text-app-500 hover:text-app-200 p-1"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-2 pt-3">
          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>
          {user?.email === ADMIN_EMAIL && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Divider */}
        <div className="px-4 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-app-600 uppercase tracking-wider">
              Playlists
            </span>
            <button
              onClick={() => setShowAdd(true)}
              className="w-5 h-5 rounded-md flex items-center justify-center text-app-500 hover:text-app-200 hover:bg-app-800 transition-colors"
              title="Add playlist"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Playlist list */}
          <div className="flex flex-col gap-0.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {playlists?.length === 0 && (
              <p className="text-xs text-app-600 px-1 py-2">No playlists yet</p>
            )}
            {playlists?.map((p) => {
              const pct =
                p.totalVideos > 0
                  ? Math.round((p.completedVideos / p.totalVideos) * 100)
                  : 0;
              return (
                <NavLink
                  key={p.id}
                  to={`/playlist/${p.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-link flex-col items-start gap-1 py-2 ${isActive ? "active" : ""}`
                  }
                >
                  <span className="line-clamp-1 text-xs">{p.title}</span>
                  <ProgressBar value={pct} />
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* User footer */}
        <div className="mt-auto border-t border-app-800 p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-app-200 truncate">{user?.name || "User"}</p>
              <p className="text-xs text-app-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="flex-shrink-0 p-1.5 rounded-md text-app-500 hover:text-app-200 hover:bg-app-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <AddPlaylistModal open={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}
