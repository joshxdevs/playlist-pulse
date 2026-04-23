import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PlaylistPage from "./pages/PlaylistPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LandingPage from "./pages/LandingPage";
import Spinner from "./components/ui/Spinner";

const ADMIN_EMAIL = "jpgstudying@gmail.com";

// Redirects logged-in users to /dashboard, otherwise shows the page
function PublicRoute() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// Requires authentication; redirects to /login otherwise
function ProtectedRoute() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-900">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// Requires admin email; redirects to /dashboard otherwise
function AdminRoute() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-900">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  // Landing page — public, redirects logged-in users to /dashboard
  {
    path: "/",
    element: <LandingPage />,
  },

  // Auth pages — redirected away for authenticated users
  {
    element: <PublicRoute />,
    children: [
      { path: "/login",    element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  // Main authenticated app routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard",      element: <DashboardPage /> },
          { path: "/playlist/:id",   element: <PlaylistPage /> },
        ],
      },
    ],
  },

  // Admin-only route
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/admin", element: <AdminDashboardPage /> },
        ],
      },
    ],
  },
]);
