# Doomsday Ready

A full-stack movie watch-list, prerequisite dependency tracker, and cinema/screening planner built with **Next.js (TypeScript)**, **Node.js**, **Prisma**, **PostgreSQL (Neon + Docker)**, and **Docker Compose**.

## Overview

**Doomsday Ready** helps users organize movie watch progress, map out required prerequisite movies before moving forward in a storyline, and plan cinema screenings, bookings, and rewatch schedules. It supports local Docker Compose execution connected to a cloud PostgreSQL (Neon) database as well as standalone local development.

## Data Model Diagram (Movies & Cinemas)

The diagram below illustrates how **Movies** (including prerequisite dependencies) and **Cinemas** (along with screenings and booking/watch tracking) are structured and connected:

```mermaid
erDiagram
    MOVIES {
        string id PK
        string title
        string slug
        int releaseYear
        string phaseOrEra
        string posterUrl
        string synopsis
        boolean isWatched
        datetime createdAt
    }

    MOVIE_PREREQUISITES {
        string id PK
        string movieId FK
        string prerequisiteMovieId FK
        boolean isRequired
    }

    CINEMAS {
        string id PK
        string name
        string location
        string screenType
        int totalSeats
        datetime createdAt
    }

    SCREENINGS {
        string id PK
        string movieId FK
        string cinemaId FK
        datetime showtime
        decimal ticketPrice
        int availableSeats
    }

    BOOKINGS_AND_WATCH_PLANS {
        string id PK
        string screeningId FK
        string movieId FK
        string status
        int seatCount
        datetime plannedAt
    }

    MOVIES ||--o{ MOVIE_PREREQUISITES : "has prerequisites"
    MOVIES ||--o{ MOVIE_PREREQUISITES : "acts as prerequisite for"
    MOVIES ||--o{ SCREENINGS : "scheduled in"



How Movies and Cinemas Are Structured
Movies (MOVIES): Stores core movie metadata (id, title, slug, releaseYear, phaseOrEra, posterUrl, synopsis, isWatched, createdAt) and acts as the central catalog across movie lists, rewatch planning, and screenings.

Prerequisites (MOVIE_PREREQUISITES): Links a target movie (movieId) to earlier prerequisite movies (prerequisiteMovieId) with isRequired so users can track what should be watched first.

Cinemas (CINEMAS): Represents theater venues and screening spaces (id, name, location, screenType, totalSeats, createdAt) where screenings take place.

Screenings (SCREENINGS): Connects a movie (movieId) and a cinema (cinemaId) with showtime, ticketPrice, and availableSeats.

Bookings & Watch Plans (BOOKINGS_AND_WATCH_PLANS): Tracks screening bookings and movie watch/rewatch status (status, seatCount, plannedAt).

Project Structure
Plaintext
doomsday-ready/
├── backend/              # Node.js + TypeScript REST API, Prisma schema & config
├── frontend/             # Next.js web application (movies, booking, rewatch-plan)
├── docker-compose.yml    # Multi-container setup for PostgreSQL, backend, and frontend
└── README.md             # Project documentation and data model diagram
Getting Started
1. Environment Variables
Configure environment variables without committing real secrets or .env files to Git (use .env.example templates where provided):

Code snippet
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
PORT=5000
2. Run with Docker Compose
Bash
docker compose up --build
Frontend: http://localhost:3000

Backend API: http://localhost:5000

Database: Configured via DATABASE_URL (Neon cloud PostgreSQL or local PostgreSQL)

3. Local Development Without Docker
Backend: Install dependencies in backend/, configure .env with DATABASE_URL, push/migrate Prisma schema, and run the backend server.

Frontend: Install dependencies in frontend/ and start the Next.js development server.

Git Workflow & Deployment
Repository: https://github.com/nio420/doomsday-ready.git

Clean commits organized by feature, UI, Docker setup, and configuration while keeping .env, node_modules/, and build artifacts ignored.

    CINEMAS ||--o{ SCREENINGS : "hosts"
    SCREENINGS ||--o{ BOOKINGS_AND_WATCH_PLANS : "tracks booking"
    MOVIES ||--o{ BOOKINGS_AND_WATCH_PLANS : "tracks watch/rewatch"
