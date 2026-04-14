# 🎵 Playlist Tracker

A full-stack web app for tracking your YouTube playlist progress — like a todo list for your learning journey.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React · TypeScript · Vite · Tailwind CSS |
| Backend | Node.js · Express · TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | Better Auth |
| API | YouTube Data API v3 |

## Getting Started

### 1. Clone & setup env

```bash
git clone <repo-url>
cd playlist-pulse
cp .env.example .env
# Fill in your values in .env
```

### 2. Backend

```bash
cd backend
npm install
npm run db:push   # sync Prisma schema to Neon
npm run dev       # starts on http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

## Available Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (ts-node-dev) |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled JS |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Regenerate Prisma client |

### Frontend (`/frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Features

- ✅ Email/password authentication (Better Auth)
- ✅ Add YouTube playlists by URL
- ✅ Todo-style video checklist
- ✅ Progress bars per playlist
- ✅ "Continue Learning" — auto-scroll to next video
- ✅ Multi-playlist management (add, rename, delete)
- ✅ Mobile responsive with collapsible sidebar
- ✅ Dark mode UI

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/*` | Better Auth handlers |
| `POST` | `/api/playlists` | Add playlist |
| `GET` | `/api/playlists` | List user playlists |
| `GET` | `/api/playlists/:id` | Get playlist + videos |
| `PATCH` | `/api/playlists/:id` | Rename playlist |
| `DELETE` | `/api/playlists/:id` | Delete playlist |
| `PATCH` | `/api/videos/:id` | Toggle video completion |

## Environment Variables

See `.env.example` for all required variables.

## Folder Structure

```
playlist-pulse/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── lib/
│       ├── auth.ts
│       └── index.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── services/
│       └── types/
├── .env
├── .env.example
└── README.md
```
