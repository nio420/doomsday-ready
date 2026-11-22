import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../utils/appError";

export const globalErrorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = err?.message || "Internal Server Error";
  let code: string | undefined = undefined;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = err as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2002") {
      statusCode = 409;
      message = "Unique constraint violation";
    } else if (prismaError.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(code ? { code } : {}),
  });
};
