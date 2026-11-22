import { Request, Response } from "express";
import { cinemaService } from "./cinema.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createCinema = catchAsync(async (req: Request, res: Response) => {
  const cinema = await cinemaService.createCinemaDB(req.body);
  return sendResponse(res, 201, "Cinema created successfully", cinema);
});

export const listCinemas = catchAsync(async (req: Request, res: Response) => {
  const cinemas = await cinemaService.listCinemasDB();
  return sendResponse(res, 200, "Cinemas fetched successfully", cinemas);
});

export const getBookingQuote = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, "Cinema id is required");
    }

    const groupSize = Number(req.query.groupSize);
    const bookingQuote = await cinemaService.getBookingQuoteDB(id, groupSize);

    return sendResponse(res, 200, "Booking quote generated", bookingQuote);
  },
);
