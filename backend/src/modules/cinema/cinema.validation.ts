import { z } from "zod";

export const createCinemaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bundleSizes: z
    .array(z.number().int().min(1).max(500))
    .min(1, "At least one bundle size is required")
    .max(10, "At most 10 bundle sizes are allowed"),
});

export const bookingQuerySchema = z.object({
  groupSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(10000, "groupSize must be between 1 and 10000"),
});
