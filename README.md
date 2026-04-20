# Playlist Pulse

Playlist Pulse is a comprehensive full-stack web application designed to monitor and manage educational progress through YouTube playlists. It functions as a structured progression tracker for any video-based learning journey, allowing users to import playlists, track individual video completions, and visualize their overall progress.

## Overview

The application provides a seamless experience for managing multiple learning resources. By integrating directly with the YouTube Data API, Playlist Pulse automatically retrieves video details, computes total learning durations, and presents a clean, distraction-free environment for tracking educational milestones.

## Key Features

- **Authentication:** Secure email and password authentication powered by Better Auth.
- **Playlist Management:** Seamlessly import YouTube playlists via URL across multiple concurrent learning paths.
- **Progress Tracking:** Interactive checklist system for individual videos, coupled with visual progress bars for overall playlist completion.
- **Duration Metrics:** Automatic calculation and display of total playlist durations and individual video lengths.
- **Auto-Navigation:** An intelligent "Continue Learning" feature that automatically scrolls to the next unwatched video in the sequence.
- **Responsive Design:** A mobile-optimized user interface featuring a modern dark mode aesthetic and a collapsible navigation sidebar.

## Technology Stack

### Frontend
- **Framework:** React with TypeScript and Vite
- **Styling:** Tailwind CSS

### Backend
- **Framework:** Node.js with Express and TypeScript
- **Database:** PostgreSQL (Hosted on Neon)
- **Object-Relational Mapping:** Prisma
- **Authentication:** Better Auth
- **Integration:** YouTube Data API v3

## Local Development Setup

### 1. Repository Configuration

Clone the repository and configure the environment variables:

```bash
git clone <repo-url>
cd playlist-pulse
cp .env.example .env
```
Ensure all required values in the `.env` file are populated before proceeding.

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

## System Architecture

```text
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
├── frontend/
│   └── src/
│       ├── components/     # Reusable React interface components
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Shared frontend utilities
│       ├── pages/          # Application route views
│       ├── services/       # API client implementations
│       └── types/          # TypeScript interface definitions
├── .env                    # Active environment configuration
├── .env.example            # Environment variable template
└── README.md               # Project documentation
```
