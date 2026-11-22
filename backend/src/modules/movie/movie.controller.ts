import { Request, Response } from "express";
import { movieService } from "./movie.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createMovie = catchAsync(async (req: Request, res: Response) => {
  const movie = await movieService.createMovie(req.body);
  return sendResponse(res, 201, "Movie created successfully", movie);
});

export const listMovies = catchAsync(async (req: Request, res: Response) => {
  const movies = await movieService.listMovies();
  return sendResponse(res, 200, "Movies fetched successfully", movies);
});

export const updateMovie = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return sendResponse(res, 400, "Movie id is required");
  }
  const movie = await movieService.updateMovie(id, req.body);
  return sendResponse(res, 200, "Movie updated successfully", movie);
});

export const getRewatchOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, "Movie id is required");
    }
    const rewatchOrder = await movieService.getRewatchOrder(id);
    return sendResponse(
      res,
      200,
      "Rewatch order fetched successfully",
      rewatchOrder,
    );
  },
);
