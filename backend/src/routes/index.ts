import { Router } from "express";
import movieRouter from "../modules/movie/movie.route";
import cinemaRouter from "../modules/cinema/cinema.route";

const router: Router = Router();

router.use("/movies", movieRouter);
router.use("/cinemas", cinemaRouter);

export default router;
