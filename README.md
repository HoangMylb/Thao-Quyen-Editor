This project contains:

- Next.js frontend in `src/`
- .NET backend API in `backend/`
- Render deployment config in `render.yaml`

## Getting Started

First, install frontend dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

To run backend locally:

```bash
cd backend
dotnet run
```

Backend health check:

```text
http://localhost:5000/api/health
```

You can start editing the frontend by modifying files under `src/app/`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load local Montserrat variable fonts.

## Environment

Frontend:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Backend:

```bash
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=thaoquyen;Username=postgres;Password=postgres;SSL Mode=Disable
ASPNETCORE_ENVIRONMENT=Development
JwtSettings__SecretKey=REPLACE_WITH_A_RANDOM_SECRET_AT_LEAST_32_CHARS
JwtSettings__Issuer=ThaoQuyenEditor
JwtSettings__Audience=ThaoQuyenEditorClient
Supabase__Url=https://YOUR_PROJECT_REF.supabase.co
Supabase__ServiceRoleKey=YOUR_SUPABASE_SERVICE_ROLE_KEY
Supabase__StorageBucket=videos
```

## Deploy

- Frontend: Vercel
- Backend API: Render via `render.yaml`
- Database: PostgreSQL / Supabase connection string via backend env vars
- Storage: Supabase Storage bucket `videos` must be public for returned URLs to work

Health check:

- `GET /api/health` now includes `Storage` section
- If `Storage.Configured=false`: missing `Supabase__Url`, `Supabase__ServiceRoleKey`, or `Supabase__StorageBucket`
- If `Storage.BucketPublicUrlReachable=false`: bucket may not exist yet or is not public
