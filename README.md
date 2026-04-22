<div align="center">
  <h1>Playlist Pulse</h1>
  <p><strong>A structured progression tracker for video-based learning journeys.</strong></p>
  <p>Playlist Pulse connects directly with the YouTube Data API to import educational playlists, track individual video completions, compute total and remaining learning durations, and present a distraction-free environment for tracking milestones.</p>
</div>

---

## Overview

**Playlist Pulse** solves the problem of unstructured video learning by providing a comprehensive tracking system. Users can import any public YouTube playlist and convert it into an interactive checklist. The platform features secure authentication, automatic parsing of video lengths, dynamic remaining-time tracking that responds in real-time to video completions, visual progress indicators, an intelligent navigation system, an admin panel for platform oversight, and a minimalist landing page for new visitors.

## Key Features

- **Authentication:** Secure email and password authentication powered by Better Auth.
- **Playlist Management:** Seamlessly import YouTube playlists via URL across multiple concurrent learning paths.
- **Progress Tracking:** Interactive checklist system for individual videos, coupled with visual progress bars for overall playlist completion.
- **Dynamic Duration Metrics:** Automatic extraction of total playlist and per-video durations. As videos are marked complete, the displayed remaining watch time updates in real time — keeping motivation high.
- **Auto-Navigation:** An intelligent "Continue Learning" feature that automatically scrolls to the next unwatched video in the sequence.
- **Admin Dashboard:** A gated admin panel that shows platform-wide statistics including total users, active sessions, all tracked playlists, and per-user completion percentages.
- **Minimalist Landing Page:** A Vercel-inspired, typography-focused public homepage with smooth micro-animations and zero visual clutter.
- **Responsive Design:** A mobile-optimized user interface featuring a modern dark mode aesthetic and a collapsible navigation sidebar.

## Technology Stack

### Frontend
- **Framework:** React with TypeScript and Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion

### Backend
- **Framework:** Node.js with Express and TypeScript
- **Database:** PostgreSQL (Hosted on Neon)
- **Object-Relational Mapping:** Prisma
- **Authentication:** Better Auth
- **Integration:** YouTube Data API v3

### Deployment Architecture
- **Database:** Serverless Postgres via Neon
- **Hosting Integration:** Ready for standard Node/React deployment providers (Render, Vercel, etc.)

---

## Local Development Setup

### 1. Repository Configuration

Clone the repository and configure the environment variables:

```bash
git clone https://github.com/joshxdevs/playlist-pulse.git
cd playlist-pulse
cp .env.example .env
```
Ensure all required values in the `.env` file are populated before proceeding. Key variables include `DATABASE_URL`, `YOUTUBE_API_KEY`, `BETTER_AUTH_SECRET`, and `ADMIN_EMAIL`.

### 2. Backend Initialization

Navigate to the backend directory, install dependencies, synchronize the database, and start the development server:

```bash
cd backend
npm install
npm run db:push
npm run dev
```
The backend server will initialize on `http://localhost:5000`.

### 3. Frontend Initialization

In a separate terminal window, navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```
The frontend application will initialize on `http://localhost:5173`.

---

## Routing

| Path | Page | Access |
|------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Login | Public (redirects if authenticated) |
| `/register` | Register | Public (redirects if authenticated) |
| `/dashboard` | User Dashboard | Authenticated |
| `/playlist/:id` | Playlist Detail | Authenticated |
| `/admin` | Admin Dashboard | Admin only |

## Available Scripts

### Backend (/backend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Initialize the development server via ts-node-dev |
| `npm run build` | Compile TypeScript source code |
| `npm run start` | Execute the compiled JavaScript production build |
| `npm run db:push` | Synchronize the Prisma schema with the database |
| `npm run db:studio` | Launch the Prisma Studio database GUI |
| `npm run db:generate` | Regenerate the Prisma client |

### Frontend (/frontend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Initialize the Vite development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Serve the production build for local review |

## API Integration Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/*` | Authentication operations |
| POST | `/api/playlists` | Import a new playlist |
| GET | `/api/playlists` | Retrieve all playlists for the authenticated user |
| GET | `/api/playlists/:id` | Retrieve specific playlist details and video list |
| PATCH | `/api/playlists/:id` | Update playlist metadata |
| DELETE | `/api/playlists/:id` | Remove a playlist from the user profile |
| PATCH | `/api/videos/:id` | Update completion status for a specific video |
| GET | `/api/admin/metrics` | Platform-wide metrics (admin only) |

## System Architecture

```text
playlist-pulse/
├── backend/
│   ├── prisma/             # Database schema configuration
│   └── src/
│       ├── controllers/    # Request handlers (playlist, video, admin)
│       ├── middleware/     # requireAuth & requireAdmin pipeline
│       ├── routes/         # Express endpoint definitions
│       ├── services/       # Business logic and external API integrations
│       ├── lib/            # Shared utilities and configurations
│       ├── auth.ts         # Authentication configuration
│       └── index.ts        # Application entry point
├── frontend/
│   └── src/
│       ├── components/     # Reusable React interface components
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Shared frontend utilities
│       ├── pages/          # Application route views (Landing, Dashboard, Admin)
│       ├── services/       # API client implementations
│       └── types/          # TypeScript interface definitions
├── .env                    # Active environment configuration
├── .env.example            # Environment variable template
└── README.md               # Project documentation
```

---

## License
This project is open-source and available under the MIT License.
