import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFoundRoute } from "./middleware/notFoundRoute";
import { globalErrorhandler } from "./middleware/globalErrorhandler";
import apiRoutes from "./routes/index";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://doomsday-frontend.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Doomsday Ready API is up and running",
  });
});

app.use("/api", apiRoutes);

app.use(notFoundRoute);
app.use(globalErrorhandler);

export default app;
