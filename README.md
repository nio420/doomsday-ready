# Doomsday Ready

A full-stack movie watch-list, prerequisite dependency tracker, and cinema/screening planner built with **Next.js (TypeScript)**, **Node.js**, **Prisma**, **PostgreSQL (Neon + Docker)**, and **Docker Compose**.

## Overview

**Doomsday Ready** helps users organize movie watch progress, map out required prerequisite movies before moving forward in a storyline, and plan cinema screenings, bookings, and rewatch schedules. It supports running via Docker Compose connected to a cloud PostgreSQL (Neon) database as well as standalone local development.

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
    CINEMAS ||--o{ SCREENINGS : "hosts"
    SCREENINGS ||--o{ BOOKINGS_AND_WATCH_PLANS : "tracks booking"
    MOVIES ||--o{ BOOKINGS_AND_WATCH_PLANS : "tracks watch/rewatch"
