import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export type ValidationField = "body" | "query" | "params";

type ValidationSchemas = Partial<Record<ValidationField, ZodType>>;

export const validateRequest =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const source = req as unknown as Record<string, unknown>;
      const fields = Object.keys(schemas) as ValidationField[];

      for (const field of fields) {
        const schema = schemas[field];
        if (!schema) {
          continue;
        }
        const parsed = schema.parse(source[field]);
        source[field] = parsed;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
