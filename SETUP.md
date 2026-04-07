# Setup Guide — Online Coding Judge

## Prerequisites
- **Node.js** (v18+) and npm
- **XAMPP** (MySQL running on `localhost:3306`)
- **Docker Desktop** (for code execution engine)
- **Redis** (via Docker Compose)

## Quick Start

### 1. Backend Setup
```bash
cd "c:\Online Coding Judge\backend"
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts    # Seeds demo accounts + sample problems
npm run dev               # Starts on http://localhost:3000
```

### 2. Frontend Setup
```bash
cd "c:\Online Coding Judge\frontend"
npm install
npx ng serve              # Starts on http://localhost:4200
```

### 3. Redis (for execution queue)
```bash
cd "c:\Online Coding Judge"
docker-compose up redis   # Starts Redis on port 6379
```

### 4. Pull Docker Images (for code execution)
```bash
docker pull python:3.10-slim
docker pull gcc:latest
docker pull openjdk:17-slim
docker pull node:18-slim
```

## Demo Accounts

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | admin@codejudge.com    | admin123   |
| User  | john@codejudge.com     | user123    |
| User  | jane@codejudge.com     | user123    |
| User  | alice@codejudge.com    | user123    |

## API Endpoints

| Method | Endpoint                    | Auth    | Description           |
|--------|-----------------------------|---------|-----------------------|
| POST   | /api/auth/register          | Public  | Register new user     |
| POST   | /api/auth/login             | Public  | Login + get JWT       |
| GET    | /api/auth/me                | Bearer  | Get profile           |
| GET    | /api/problems               | Public  | List problems         |
| GET    | /api/problems/:id           | Public  | Get problem detail    |
| POST   | /api/problems               | Admin   | Create problem        |
| PUT    | /api/problems/:id           | Admin   | Update problem        |
| DELETE | /api/problems/:id           | Admin   | Delete problem        |
| POST   | /api/submissions/submit     | Bearer  | Submit solution       |
| POST   | /api/submissions/run        | Bearer  | Run against samples   |
| GET    | /api/submissions/:id        | Bearer  | Get submission        |
| GET    | /api/leaderboard            | Public  | Get leaderboard       |
| GET    | /api/leaderboard/stats      | Bearer  | Get user stats        |

## Architecture

```
[Angular Frontend :4200]
       ↓ REST + WebSocket
[Hono.js API :3000]
       ↓              ↓
[MySQL :3306]    [Redis :6379]
                       ↓
               [BullMQ Worker]
                       ↓
             [Docker Containers]
             (C++/Java/Python/JS)
```
