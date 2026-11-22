import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
  Movie,
  CreateMovieInput,
  UpdateMovieInput,
  RewatchOrderResponse,
  RewatchOrderMovie,
} from "./movie.interface";

const wouldCreateCycle = async (
  movieId: string,
  prerequisiteIds: string[]
): Promise<boolean> => {
  const visited = new Set<string>();
  const stack: string[] = [...prerequisiteIds];

  while (stack.length > 0) {
    const currentId = stack.pop() as string;

    if (currentId === movieId) {
      return true;
    }

    if (visited.has(currentId)) {
      continue;
    }
    visited.add(currentId);

    const movie = await prisma.movie.findUnique({
      where: { id: currentId },
      include: { prerequisites: true },
    });

    if (movie) {
      for (const prerequisite of movie.prerequisites ?? []) {
        stack.push(prerequisite.id);
      }
    }
  }

  return false;
};

export const movieService = {
  createMovie: async (data: CreateMovieInput): Promise<Movie> => {
    const prerequisiteIds: string[] = data.prerequisites ?? [];

    const createsCycle = await wouldCreateCycle(randomUUID(), prerequisiteIds);
    if (createsCycle) {
      throw new AppError(
        "Movie prerequisite chain contains a circular dependency",
        409,
        "CIRCULAR_DEPENDENCY"
      );
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        releaseYear: data.releaseYear,
        runtimeMinutes: data.runtimeMinutes,
        watched: data.watched ?? false,
      },
      include: { prerequisites: true },
    });

    if (prerequisiteIds.length > 0) {
      await prisma.movie.update({
        where: { id: movie.id },
        data: {
          prerequisites: {
            set: prerequisiteIds.map((id) => ({ id })),
          },
        },
      });
    }

    return movie;
  },

  listMovies: async (): Promise<Movie[]> => {
    return prisma.movie.findMany({
      orderBy: { createdAt: "asc" },
      include: { prerequisites: true },
    });
  },

  updateMovie: async (id: string, data: UpdateMovieInput): Promise<Movie> => {
    const existingMovie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw new AppError("Movie not found", 404);
    }

    if (data.prerequisites) {
      const createsCycle = await wouldCreateCycle(id, data.prerequisites);
      if (createsCycle) {
        throw new AppError(
          "Movie prerequisite chain contains a circular dependency",
          409,
          "CIRCULAR_DEPENDENCY"
        );
      }
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.releaseYear !== undefined ? { releaseYear: data.releaseYear } : {}),
        ...(data.runtimeMinutes !== undefined ? { runtimeMinutes: data.runtimeMinutes } : {}),
        ...(data.watched !== undefined ? { watched: data.watched } : {}),
        ...(data.prerequisites !== undefined
          ? {
              prerequisites: {
                set: data.prerequisites.map((prerequisiteId) => ({ id: prerequisiteId })),
              },
            }
          : {}),
      },
      include: { prerequisites: true },
    });

    return updatedMovie;
  },

  getRewatchOrder: async (id: string): Promise<RewatchOrderResponse> => {
    const targetMovie = await prisma.movie.findUnique({
      where: { id },
      include: { prerequisites: true },
    });

    if (!targetMovie) {
      throw new AppError("Movie not found", 404);
    }

    const visited = new Set<string>();
    const orderedIds: string[] = [];

    const collectPrerequisites = async (movieId: string): Promise<void> => {
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: { prerequisites: true },
      });

      if (!movie) {
        return;
      }

      for (const prerequisite of movie.prerequisites ?? []) {
        if (prerequisite.id === id || visited.has(prerequisite.id)) {
          continue;
        }
        visited.add(prerequisite.id);
        await collectPrerequisites(prerequisite.id);
        orderedIds.push(prerequisite.id);
      }
    };

    await collectPrerequisites(id);

    const rewatchMovies = await prisma.movie.findMany({
      where: { id: { in: orderedIds } },
    });

    const prerequisites: RewatchOrderMovie[] = rewatchMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      runtimeMinutes: movie.runtimeMinutes,
      watched: movie.watched,
    }));

    const watchedCount = prerequisites.filter((movie) => movie.watched).length;
    const unwatchedRuntimeMinutes = prerequisites
      .filter((movie) => !movie.watched)
      .reduce((total, movie) => total + movie.runtimeMinutes, 0);

    return {
      movieId: id,
      prerequisites,
      watchedCount,
      unwatchedRuntimeMinutes,
    };
  },
};
