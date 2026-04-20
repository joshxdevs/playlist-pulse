<div align="center">
  <h1>Playlist Pulse</h1>
  <p><strong>A structured progression tracker for video-based learning journeys.</strong></p>
  <p>Playlist Pulse connects directly with the YouTube Data API to import educational playlists, track individual video completions, compute total learning durations, and present a distraction-free environment for tracking milestones.</p>
</div>

---

## Overview

**Playlist Pulse** solves the problem of unstructured video learning by providing a comprehensive tracking system. Users can import any public YouTube playlist and convert it into an interactive checklist. The platform features secure authentication, automatic parsing of video lengths, visual progress indicators, and an intelligent navigation system to keep learners focused without getting lost in the noise of related content.

## Key Features

- **Centralized Tracking:** Seamlessly import YouTube playlists via URL to manage multiple concurrent learning paths.
- **Secure Authentication:** Robust email and password authentication flow powered by Better Auth.
- **Duration Metrics:** Automatic extraction and calculation of total playlist durations and individual video lengths directly from YouTube's API.
- **Pacing & Navigation:** Auto-scrolling "Continue Learning" functionality to immediately pick up where you left off.
- **Visual Progress:** Dynamic checklist system bound with interactive progress bars for overall playlist completion status.
- **Modern Interface:** A fully responsive, mobile-optimized dark mode UI with a collapsible navigation sidebar.

## Tech Stack

### Frontend
- **Framework:** React 18 & Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State/Data:** React Hooks

### Backend
- **Environment:** Node.js & Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM:** Prisma
- **Authentication:** Better Auth
- **Third-Party Integrations:** YouTube Data API v3

### Deployment Architecture
- **Database:** Serverless Postgres via Neon
- **Hosting Integration:** Ready for standard Node/React deployment providers (Render, Vercel, etc.)

---

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud-hosted like Neon)
- YouTube Data API v3 Key

### 1. Clone the repository
```bash
git clone https://github.com/joshxdevs/playlist-pulse.git
cd playlist-pulse
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory based on the `.env.example`:
```env
PORT=5000
DATABASE_URL="postgresql://user:pass@localhost:5432/playlist_pulse"
YOUTUBE_API_KEY="your_youtube_api_key"
BETTER_AUTH_SECRET="your_super_secret_key"
```
Run database migrations and start the server:
```bash
npm run db:push
npm run dev
```
The backend server will initialize on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend will launch at `http://localhost:5173` and automatically proxy API requests to your local backend.

---

## Project Structure

```bash
playlist-pulse/
├── backend/
│   ├── prisma/             # Database schema configuration
│   └── src/
│       ├── controllers/    # Request handlers
│       ├── middleware/     # Custom pipeline operations
│       ├── routes/         # Express endpoint definitions
│       ├── services/       # Business logic and external API integrations
│       ├── lib/            # Shared utilities and configurations
│       ├── auth.ts         # Authentication configuration
│       └── index.ts        # Application entry point
└── frontend/
    ├── src/
    │   ├── components/     # Reusable React interface components
    │   ├── context/        # React context providers
    │   ├── hooks/          # Custom React hooks
    │   ├── lib/            # Shared frontend utilities
    │   ├── pages/          # Application route views
    │   ├── services/       # API client implementations
    │   └── types/          # TypeScript interface definitions
    ├── vite.config.ts      # Build & Dev Proxy settings
    └── tailwind.config.js  # Theme styling parameters
```

---

## License
This project is open-source and available under the MIT License.
