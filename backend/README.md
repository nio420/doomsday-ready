# Doomsday Ready — Backend API

Node.js, TypeScript, and Express backend service powering the **Doomsday Ready** watch-party catalog, prerequisite-aware rewatch order planner, and cinema group bundle booking engine.

## What Has Been Built

- **Movies Catalog & Prerequisites:** Endpoints to list and create movies with runtime, release year, watch status, and prerequisite dependencies.
- **Optimal Rewatch Order Solver:** Computes a valid rewatch sequence respecting movie prerequisites while tracking watched count and unwatched runtime minutes.
- **Cinema Group Booking Quote Engine:** Manages cinema halls with configured seat bundle sizes and calculates group seat bundle allocations.
- **Request Validation & Error Handling:** Zod-based request schema validation middleware and centralized error responses across routes.
- **Production Deployment:** Configured for TypeScript build and serverless/Node deployment on Vercel.

## Project Structure

backend/
├── src/
│ ├── middleware/
│ │ └── validateRequest.ts
│ ├── modules/
│ │ ├── movies/
│ │ │ ├── movie.controller.ts
│ │ │ ├── movie.routes.ts
│ │ │ └── movie.validation.ts
│ │ └── cinemas/
│ │ ├── cinema.controller.ts
│ │ ├── cinema.routes.ts
│ │ └── cinema.validation.ts
│ └── app.ts / server.ts
├── package.json
└── tsconfig.json

## Getting Started Locally

1. **Install dependencies:**
   pnpm install

2. **Configure environment variables:**
   Create a `.env` file in `backend/` with your required environment variables (e.g., `PORT`, database/connection string if applicable).

3. **Run in development mode:**
   pnpm dev

4. **Build for production:**
   pnpm run build
   pnpm start

## Core API Overview

- `GET /movies` — List all movies with metadata and prerequisites
- `POST /movies` — Create a new movie entry
- `GET /movies/:id/rewatch-order` — Compute prerequisite-respecting rewatch plan and unwatched runtime
- `GET /cinemas` — List cinema halls and their configured bundle sizes
- `POST /cinemas` — Create a cinema hall with bundle sizes
- `GET /cinemas/:id/booking?groupSize=<number>` — Calculate bundle allocation quote for a group

## Deployment

Deployed on **Vercel** (`doomsday-backend1.vercel.app`) with TypeScript compilation (`pnpm run build`). Ensure all environment variables are configured in the Vercel project dashboard before deploying.
