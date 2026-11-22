import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  releaseYear: z.number().int("Release year must be an integer"),
  runtimeMinutes: z
    .number()
    .int()
    .min(1, "Runtime must be at least 1 minute")
    .max(300, "Runtime must be at most 300 minutes"),
  watched: z.boolean().default(false),
  prerequisites: z.array(z.string().min(1)).optional(),
});

export const updateMovieSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  releaseYear: z.number().int().optional(),
  runtimeMinutes: z
    .number()
    .int()
    .min(1, "Runtime must be at least 1 minute")
    .max(300, "Runtime must be at most 300 minutes")
    .optional(),
  watched: z.boolean().optional(),
  prerequisites: z.array(z.string().min(1)).optional(),
});

export const movieIdParamsSchema = z.object({
  id: z.string().min(1, "Movie id is required"),
});
