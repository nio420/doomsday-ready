import { Router } from "express";
import { createMovie, listMovies, updateMovie, getRewatchOrder } from "./movie.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createMovieSchema, updateMovieSchema, movieIdParamsSchema } from "./movie.validation";

const router: Router = Router();

router.post("/", validateRequest({ body: createMovieSchema }), createMovie);
router.get("/", listMovies);
router.patch("/:id", validateRequest({ params: movieIdParamsSchema, body: updateMovieSchema }), updateMovie);
router.get("/:id/rewatch-order", validateRequest({ params: movieIdParamsSchema }), getRewatchOrder);

export default router;
