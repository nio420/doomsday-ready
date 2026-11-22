import { Router } from "express";
import { createCinema, listCinemas, getBookingQuote } from "./cinema.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createCinemaSchema, bookingQuerySchema } from "./cinema.validation";

const router: Router = Router();

router.post("/", validateRequest({ body: createCinemaSchema }), createCinema);
router.get("/", listCinemas);
router.get("/:id/booking", validateRequest({ query: bookingQuerySchema }), getBookingQuote);

export default router;
