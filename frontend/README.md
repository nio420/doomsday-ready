# Doomsday Ready — Frontend

Luxury cinematic Next.js and TypeScript web application for browsing watch-party movies, planning prerequisite-aware rewatch orders, and calculating cinema group seat bundles.

## What Has Been Built

- **Cinematic Luxury UI & Theme:** Dark radial lighting, subtle glow accents, responsive layouts, and Framer Motion transitions across core views.
- **Home View (`HomeView`):** Hero section with smooth animated poster motion (zoom & pan), featured movies synced from the backend, and quick-access navigation cards.
- **Movies Catalog (`MoviesView`):** Searchable and filterable (`All`, `Watched`, `Unwatched`) movie grid with detail modal showing prerequisites and quick actions.
- **Rewatch Plan (`RewatchPlanView`):** Split view with compact left selector list (`small poster — title — watchtime`) and right rewatch sequence breakdown with unwatched runtime summary.
- **Group Booking (`BookingView`):** Cinema hall selector, group size input, animated `Get Quote` result transition, and seat bundle allocation breakdown.
- **Custom Poster System & Splash Loader:** Local poster mapping (`public/posters/` + `src/lib/moviePosters.ts`), `MoviePoster` fallback component, and session-aware `InitialSplashLoader` in `RootLayout`.

## Project Structure

frontend/
├── public/
│ └── posters/
├── src/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── ...
│ ├── components/
│ │ ├── layout/
│ │ └── ui/
│ │ ├── InitialSplashLoader.tsx
│ │ └── MoviePoster.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ └── moviePosters.ts
│ └── types/
├── package.json
└── next.config.\*

## Getting Started Locally

1. **Install dependencies:**
   pnpm install

2. **Configure environment variables:**
   Create a `.env.local` file in `frontend/`:
   NEXT_PUBLIC_API_URL=https://doomsday-backend1.vercel.app
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

3. **Run development server:**
   pnpm dev

4. **Lint and build:**
   pnpm run lint
   pnpm run build

## Deployment

Deployed on **Vercel** (`doomsday-ready-gamma.vercel.app`). Set `NEXT_PUBLIC_API_URL` (and `NEXT_PUBLIC_SITE_URL`) in Vercel Environment Variables and run `vercel --prod` (or push to your connected Git branch).
