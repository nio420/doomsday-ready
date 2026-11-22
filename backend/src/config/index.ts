import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const port = Number(process.env.PORT) || 5000;
export const databaseUrl = process.env.DATABASE_URL || "";
export const nodeEnv = process.env.NODE_ENV || "development";
