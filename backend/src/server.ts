import app from "./app";
import { port } from "./config";

const start = (): void => {
  const server = app.listen(port, () => {
    console.log(`Doomsday Ready API listening on port ${port}`);
  });

  const shutdown = (signal: string): void => {
    server.close(() => {
      console.log(`Doomsday Ready API shut down gracefully (${signal})`);
      process.exit(0);
    });

    
    setTimeout(() => {
      console.log(`Doomsday Ready API forced shutdown (${signal})`);
      process.exit(1);
    }, 10000).unref();
  };

  process.on("SIGTERM", () => shutdown("TERM"));
  process.on("SIGINT", () => shutdown("INT"));
};

start();
